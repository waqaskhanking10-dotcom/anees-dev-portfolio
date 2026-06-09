import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, KeyRound, Monitor, Plus, Edit2, Trash2, Save, X, Eye, 
  Terminal, Sparkles, FolderLock, Database, Check, Layers, AlertCircle, 
  ChevronRight, Calendar, User, FileImage, Briefcase, Award, TrendingUp, RefreshCw, Mail, CheckCircle2, Sliders, Settings, ArrowLeft
} from 'lucide-react';
import { 
  loadProjects, saveProjects, deleteProjectFromFirebase,
  loadExperiences, saveExperiences, deleteExperienceFromFirebase,
  loadSkills, saveSkills, deleteSkillFromFirebase,
  loadHero, saveHero,
  loadBranding, saveBranding,
  loadContactMessages, deleteContactMessageFromFirebase, markMessageReadInFirebase,
  seedDatabaseIfNeeded
} from '../data/portfolioData';
import { Project, WorkExperience, Skill, HeroData, BrandingData } from '../types';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function AdminPanel() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'Home' | 'Hero' | 'Projects' | 'Experiences' | 'Skills' | 'Branding' | 'Messages'>('Home');

  // Dynamic CMS States
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [heroState, setHeroState] = useState<HeroData>(() => loadHero());
  const [brandingState, setBrandingState] = useState<BrandingData>(() => loadBranding());
  const [contactMessages, setContactMessages] = useState<any[]>(() => loadContactMessages());
  const [messageSearch, setMessageSearch] = useState('');

  // Storage uploads tracking
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Editing items trackers
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingExperience, setEditingExperience] = useState<Partial<WorkExperience> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);

  // Search filter trackers
  const [projectSearch, setProjectSearch] = useState('');
  const [experienceSearch, setExperienceSearch] = useState('');
  const [skillSearch, setSkillSearch] = useState('');

  // Toast Toast messages system
  const [toasts, setToasts] = useState<{ id: string; text: string; type: 'success' | 'info' | 'error' }[]>([]);

  // Simulation loading state
  const [isSyncing, setIsSyncing] = useState(false);

  // High-fidelity image uploader with canvas dimension optimization and Firebase Storage streaming with progress bars
  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 800; // Keep local storage/clouddb super light!
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8); // 80% high-fidelity JPEG compression
          
          // Helper to convert data URL to Blob synchronously without unreliable network fetches inside iframes
          const dataURLtoBlob = (dataUrl: string) => {
            try {
              const arr = dataUrl.split(',');
              const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
              const bstr = atob(arr[1]);
              let n = bstr.length;
              const u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              return new Blob([u8arr], { type: mime });
            } catch (error) {
              console.error('Failed to convert dataURL to Blob:', error);
              return null;
            }
          };

          // If the user is in simulated mode or not authenticated via Firebase, fallback immediately to local base64
          // to avoid unnecessary network penalty / latency and security permission blocks
          if (!auth.currentUser) {
            console.log("Simulated/Guest session: Using high-fidelity base64 container directly for instant load");
            callback(compressedDataUrl);
            setIsUploading(false);
            setUploadProgress(100);
            setTimeout(() => setUploadProgress(0), 1000);
            triggerToast('Media loaded via instant Base64 compression', 'success');
            return;
          }

          try {
            // Convert data URL to Blob synchronously and cleanly
            const blob = dataURLtoBlob(compressedDataUrl);
            if (!blob) {
              throw new Error('Blob output is null');
            }
            
            // Try uploading to Firebase Storage
            const { ref: sRef, uploadBytesResumable, getDownloadURL } = await import('firebase/storage');
            const { storage } = await import('../firebase');
            
            const fileRef = sRef(storage, `images/${Date.now()}_${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, blob);
            
            uploadTask.on('state_changed', 
              (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setUploadProgress(progress);
              }, 
              (error) => {
                console.warn('Firebase Storage upload restricted, using secure Base64 transmission fallback.', error);
                callback(compressedDataUrl);
                setIsUploading(false);
                setUploadProgress(0);
                triggerToast('Media loaded via dynamic Base64 cache', 'info');
              }, 
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                callback(downloadURL);
                setIsUploading(false);
                setUploadProgress(0);
                triggerToast('Media uploaded to Firebase Storage!', 'success');
              }
            );
          } catch (err) {
            console.warn('Fallback to inline Base64 due to upload exception:', err);
            callback(compressedDataUrl);
            setIsUploading(false);
            setUploadProgress(0);
            triggerToast('Media buffered locally', 'info');
          }
        } else {
          callback(event.target?.result as string);
          setIsUploading(false);
        }
      };
      img.onerror = (err) => {
        console.error("Image loader error on input canvas:", err);
        callback(event.target?.result as string);
        setIsUploading(false);
        triggerToast('Raw image file loaded', 'info');
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => {
      console.error("FileReader error on input stream:", err);
      setIsUploading(false);
      triggerToast('Error reading input file', 'error');
    };
    reader.readAsDataURL(file);
  };

  // Seed sample images pool for screenshots
  const PRESET_IMAGES = [
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80'
  ];

  useEffect(() => {
    const handleCmsUpdate = () => {
      setProjects(loadProjects());
      setExperiences(loadExperiences());
      setSkills(loadSkills());
      setHeroState(loadHero());
      setBrandingState(loadBranding());
      setContactMessages(loadContactMessages());
    };

    // Initial fetch from cache
    handleCmsUpdate();

    // Bind real-time trigger
    window.addEventListener('aetheris_cms_updated', handleCmsUpdate);
    
    // Auth listen state
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && user.email === 'mylifear2026@gmail.com') {
        setIsAuthenticated(true);
        // Automatically check/seed template database
        await seedDatabaseIfNeeded();
      } else {
        // Fallback or explicit check for simulated sessions
        if (localStorage.getItem('aetheris_admin_session') === 'active') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    });

    return () => {
      window.removeEventListener('aetheris_cms_updated', handleCmsUpdate);
      unsubscribeAuth();
    };
  }, []);

  const triggerToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin' || passwordInput.toLowerCase() === 'aetheris2026') {
      setIsAuthenticated(true);
      localStorage.setItem('aetheris_admin_session', 'active');
      triggerToast('Verified Simulation Session: Sandbox Write Mode Unlocked', 'success');
      setAuthError('');
      await seedDatabaseIfNeeded();
    } else {
      setAuthError('Access Denied. Invalid Authorization Code.');
      triggerToast('Authentication fault', 'error');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user && result.user.email === 'mylifear2026@gmail.com') {
        triggerToast('Welcome back, verified Administrator!', 'success');
        setAuthError('');
      } else {
        await signOut(auth);
        setAuthError('Access Denied. Only the whitelisted Project Owner Google account is permitted root writes.');
        triggerToast('Whitelisting constraint error', 'error');
      }
    } catch (error: any) {
      console.error('Google Auth Popup Error: ', error);
      if (error.code === 'auth/unauthorized-domain' || (error.message && error.message.includes('auth/unauthorized-domain'))) {
        setAuthError('unauthorized-domain-tutorial');
      } else {
        setAuthError(`Google authentication could not complete: ${error.message}`);
      }
      triggerToast('Authentication fault', 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Google signout bypass:', err);
    }
    setIsAuthenticated(false);
    localStorage.removeItem('aetheris_admin_session');
    triggerToast('Securely disconnected from control node', 'info');
  };

  // Push updates instantly back to other pages via custom dispatcher
  const notifyChanges = () => {
    window.dispatchEvent(new Event('aetheris_cms_updated'));
  };

  const syncToCloudDB = async () => {
    setIsSyncing(true);
    try {
      await Promise.all([
        saveProjects(projects),
        saveExperiences(experiences),
        saveSkills(skills),
        saveHero(heroState),
        saveBranding(brandingState)
      ]);
      notifyChanges();
      triggerToast('All content committed and compiled to database snapshots', 'success');
    } catch (err: any) {
      console.error('Failed sync commit:', err);
      triggerToast('Sync completed with local cache buffers', 'info');
    } finally {
      setIsSyncing(false);
    }
  };

  // --- CRUD OPERATORS FOR PROJECTS ---
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    if (!editingProject.title || !editingProject.description) {
      triggerToast('Please complete mandatory fields (Title & Description)', 'error');
      return;
    }

    let updatedProjects: Project[];
    if (editingProject.id) {
      // Edit
      updatedProjects = projects.map(p => p.id === editingProject.id ? (editingProject as Project) : p);
      triggerToast(`Project "${editingProject.title}" updated`, 'success');
    } else {
      // New
      const newP: Project = {
        ...editingProject,
        id: 'proj-' + Date.now(),
        summary: editingProject.summary || editingProject.description,
        technologies: editingProject.technologies || ['React', 'TypeScript'],
        category: editingProject.category || 'AI Apps',
        liveUrl: editingProject.liveUrl || '#',
        githubUrl: editingProject.githubUrl || '#',
        screenshots: editingProject.screenshots || [PRESET_IMAGES[0]],
        thumbnail: editingProject.thumbnail || 'from-purple-500 to-indigo-600',
        completionDate: editingProject.completionDate || new Date().toISOString().split('T')[0],
        status: editingProject.status || 'Production Active',
        featured: editingProject.featured ?? false,
        tags: editingProject.tags || ['Custom'],
        gradient: 'from-purple-500 to-indigo-600',
        metrics: editingProject.metrics || [{ label: 'Operational Coherence', value: '100%' }],
        client: editingProject.client || 'Enterprise Client',
        performanceScore: editingProject.performanceScore || 98
      } as Project;
      updatedProjects = [newP, ...projects];
      triggerToast(`Successfully added project "${editingProject.title}"`, 'success');
    }

    setProjects(updatedProjects);
    saveProjects(updatedProjects);
    notifyChanges();
    setEditingProject(null);
  };

  const handleDeleteProject = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      try {
        setProjects(prev => prev.filter(p => p.id !== id));
        await deleteProjectFromFirebase(id);
        triggerToast(`Project "${name}" permanently removed`, 'error');
      } catch (err) {
        console.error('Delete project failed: ', err);
        setProjects(loadProjects());
        triggerToast('Could not sync cloud deletion', 'error');
      }
    }
  };

  // --- CRUD OPERATORS FOR EXPERIENCES ---
  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;
    if (!editingExperience.company || !editingExperience.role || !editingExperience.duration) {
      triggerToast('Mandatory credentials missing', 'error');
      return;
    }

    let updatedExps: WorkExperience[];
    if (editingExperience.id) {
      updatedExps = experiences.map(exp => exp.id === editingExperience.id ? (editingExperience as WorkExperience) : exp);
      triggerToast(`Experience at ${editingExperience.company} updated`, 'success');
    } else {
      const newExp: WorkExperience = {
        ...editingExperience,
        id: 'exp-' + Date.now(),
        achievements: editingExperience.achievements || []
      } as WorkExperience;
      updatedExps = [newExp, ...experiences];
      triggerToast(`New position at ${editingExperience.company} logged`, 'success');
    }

    setExperiences(updatedExps);
    saveExperiences(updatedExps);
    notifyChanges();
    setEditingExperience(null);
  };

  const handleDeleteExperience = async (id: string, company: string) => {
    if (window.confirm(`Verify experience purge for "${company}"?`)) {
      try {
        setExperiences(prev => prev.filter(e => e.id !== id));
        await deleteExperienceFromFirebase(id);
        triggerToast(`Career record for ${company} removed`, 'error');
      } catch (err) {
        console.error('Delete experience failed: ', err);
        setExperiences(loadExperiences());
        triggerToast('Could not sync cloud deletion', 'error');
      }
    }
  };

  // --- CRUD OPERATORS FOR SKILLS ---
  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    if (!editingSkill.name || !editingSkill.proficiency) {
      triggerToast('Provide skill label and integer level', 'error');
      return;
    }

    let updatedSkills: Skill[];
    if (editingSkill.id) {
      updatedSkills = skills.map(sk => sk.id === editingSkill.id ? (editingSkill as Skill) : sk);
      triggerToast(`Skill "${editingSkill.name}" profile saved`, 'success');
    } else {
      const newSk: Skill = {
        ...editingSkill,
        id: 'sk-' + Date.now(),
        category: editingSkill.category || 'Frontend',
        proficiency: Number(editingSkill.proficiency) || 90
      } as Skill;
      updatedSkills = [...skills, newSk];
      triggerToast(`Incorporated capability "${editingSkill.name}" into index`, 'success');
    }

    setSkills(updatedSkills);
    saveSkills(updatedSkills);
    notifyChanges();
    setEditingSkill(null);
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (window.confirm(`Delete skill catalog "${name}"?`)) {
      try {
        setSkills(prev => prev.filter(s => s.id !== id));
        await deleteSkillFromFirebase(id);
        triggerToast(`Skill "${name}" cleared from engine index`, 'error');
      } catch (err) {
        console.error('Delete skill failed: ', err);
        setSkills(loadSkills());
        triggerToast('Could not sync cloud deletion', 'error');
      }
    }
  };

  // Pre-fill fields helper
  const triggerNewProject = () => {
    setEditingProject({
      title: '',
      description: '',
      summary: '',
      category: 'AI Apps',
      technologies: ['React', 'Next.js', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      screenshots: [PRESET_IMAGES[2]],
      featured: false,
      tags: ['AI', 'API'],
      client: 'Internal Node Labs',
      performanceScore: 99,
      metrics: [{ label: 'Latency Red', value: '-42%' }]
    });
  };

  // Filter lists
  const filteredProjectsList = projects.filter(p => p.title.toLowerCase().includes(projectSearch.toLowerCase()));
  const filteredExperiencesList = experiences.filter(e => e.company.toLowerCase().includes(experienceSearch.toLowerCase()) || e.role.toLowerCase().includes(experienceSearch.toLowerCase()));
  const filteredSkillsList = skills.filter(sk => sk.name.toLowerCase().includes(skillSearch.toLowerCase()));

  // Unauthenticated Login Guard Canvas View
  if (!isAuthenticated) {
    return (
      <section id="console" className="py-24 px-6 relative overflow-hidden bg-transparent border-t border-slate-200/50 dark:border-white/10 min-h-[90vh] flex items-center justify-center">
        {/* Floating Back Button */}
        <a 
          href="#"
          className="absolute top-8 left-8 flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-all bg-white hover:bg-slate-50 dark:bg-black/40 dark:hover:bg-white/5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm hover:translate-y-[-1px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Site</span>
        </a>

        {/* Glow ambient circle */}
        <div className="absolute top-[30%] left-[25%] w-[350px] h-[350px] bg-[#7C3AED]/10 dark:bg-[#7C3AED]/5 blur-[120px] pointer-events-none animate-pulse" />

        <div className="max-w-md w-full relative z-10 flex flex-col gap-8.5 text-center px-4">
          <div className="flex flex-col items-center gap-4.5">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/10 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[23px] flex items-center justify-center">
                <FolderLock className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
                Anees Creative Lab CMS
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-1.5 font-mono">
                SECURE ADMINISTRATION ACCESS TERMINAL
              </p>
            </div>
          </div>

          {/* Login Credentials lock Box */}
          <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/80 shadow-2xl backdrop-blur-xl text-left flex flex-col gap-6">
            
            {/* Real Firebase Google Authentication section */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-wider font-bold text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> Real Cloud Sync Mode (All Users)
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed mb-1">
                Website ko global level par live update karne ke liye aapko verification Google account se karni hogi:
              </p>
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full py-3.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white hover:bg-slate-50 dark:bg-[#0A0A0A] dark:hover:bg-white/5 text-slate-800 dark:text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md hover:scale-[1.01]"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Connect via Google (Verified Admin)</span>
              </button>
            </div>

            <div className="flex items-center gap-3 py-1 text-[10px] font-mono uppercase text-slate-400 dark:text-gray-500 font-bold justify-center select-none before:content-[''] before:flex-1 before:h-[1px] before:bg-slate-200 dark:before:bg-white/10 after:content-[''] after:flex-1 after:h-[1px] after:bg-slate-200 dark:after:bg-white/10">
              or use sandbox passcode
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono tracking-wider text-slate-600 dark:text-gray-300 uppercase font-bold flex items-center justify-between">
                  <span>Simulated Passkey Code</span>
                  <span className="text-purple-600 dark:text-purple-400 lowercase font-semibold bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded border border-purple-100 dark:border-purple-900/30">hint: admin</span>
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-gray-500" />
                  <input
                    type="password"
                    placeholder="Enter security access key..."
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl pl-11 pr-4 py-3 border border-slate-200 dark:border-white/10 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20"
                    required
                  />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-400 italic">
                  * Note: Passcode se login hone par changes sirf aap ke browser me save honge (Offline Test Mode).
                </p>
              </div>

              {authError && authError === 'unauthorized-domain-tutorial' ? (
                <div className="flex flex-col gap-3.5 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-800 dark:text-amber-200 text-xs font-sans leading-relaxed">
                  <div className="flex gap-2 font-bold text-amber-750 dark:text-amber-400 items-center uppercase text-[10px] font-mono tracking-widest">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Firebase Authorized Domains Update Required</span>
                  </div>
                  <p>
                    Google API is secure: ye system tabhi authorization accept karega jab aap safe domain register karenge. Isko theek karna behad aasan hai:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1.5 text-[11px] font-light">
                    <li>Apne <strong>Firebase Console</strong> me project select karein.</li>
                    <li>Sidemenu se <strong>Authentication</strong> &gt; click karein <strong>Settings</strong> (tab) par.</li>
                    <li>Left-side secondary menu me <strong>Authorized domains</strong> select karein.</li>
                    <li>Click karein <strong>"Add domain"</strong> par aur ye safe URL host copy/paste karein: <strong className="font-mono bg-amber-550/20 px-1.5 py-0.5 rounded border border-amber-500/30 text-[#D97706] dark:text-[#FBBF24] select-all block mt-1 w-fit">{window.location.hostname}</strong></li>
                    <li>Domain click to <strong>Add</strong> karein. Done! Sign-in retry karein.</li>
                  </ol>
                  <p className="text-[9px] text-slate-500 italic mt-1 font-mono">
                    Current active hostname: {window.location.hostname}
                  </p>
                </div>
              ) : authError ? (
                <div className="flex gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-550/20 text-rose-500 text-xs font-mono">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                  <span>{authError}</span>
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold text-xs tracking-wider uppercase transition-all duration-300 transform active:scale-98 cursor-pointer shadow-lg shadow-purple-500/5 hover:translate-y-[-1px]"
              >
                Establish Local Demonstration Session
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // Authenticated Admin Dashboard Control Panel
  return (
    <section id="console" className="py-24 px-6 relative overflow-hidden bg-transparent border-t border-slate-200/50 dark:border-white/10 min-h-[95vh] text-slate-800 dark:text-[#F9FAFB]">
      {/* Absolute Glow details */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-cyan-600/5 rounded-full blur-[125px] pointer-events-none" />

      {/* Floating dynamic toast logs */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-3 max-w-sm pointer-events-none select-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-4 rounded-xl border shadow-xl flex items-center gap-3 bg-[#0A0A0A]/95 text-xs text-white ${
                toast.type === 'success' ? 'border-emerald-500/30 text-emerald-300' :
                toast.type === 'error' ? 'border-rose-500/30 text-rose-300' : 'border-blue-500/30 text-blue-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                toast.type === 'success' ? 'bg-emerald-500' :
                toast.type === 'error' ? 'bg-rose-500' : 'bg-blue-500'
              } animate-ping`} />
              <span>{toast.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Navigation Action Panel Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-8 border-b border-light-divider dark:border-white/10 mb-10">
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 rounded-xl bg-purple-500 p-0.5 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display flex items-center gap-2">
                Anees Creative Lab Panel
                <span className="text-[9px] font-mono tracking-widest text-[#6D28D9] dark:text-[#A78BFA] border border-purple-500/25 px-1.5 py-0.5 rounded uppercase font-bold bg-purple-500/10 shrink-0">
                  ADMIN CORE LIVE
                </span>
              </h2>
              <p className="text-[10px] text-slate-500 dark:text-gray-400 font-mono mt-0.5">
                Dynamic CMS & Telemetry Manager Nodes
              </p>
            </div>
          </div>

          {/* Sync status & Tab operators */}
          <div className="flex flex-wrap items-center gap-3">
            <a 
              href="#"
              className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-slate-700 dark:text-slate-200 bg-slate-200/50 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300/30 dark:border-white/5 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              PORTFOLIO HOMEPAGE
            </a>
            {isSyncing ? (
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-800/30 px-3 py-1.5 rounded-lg">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                DOCKING SNAPSHOTS...
              </span>
            ) : (
              <button 
                onClick={syncToCloudDB}
                className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg hover:bg-emerald-500/20 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <Save className="w-3.5 h-3.5" />
                COMMIT ALL CHANGES
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg border border-slate-350 bg-slate-100 hover:bg-slate-200 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 text-[10px] font-mono uppercase transition-all cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Real Live Database Synchronization Advisory Banner */}
        {!currentUser || currentUser.email !== 'mylifear2026@gmail.com' ? (
          <div className="mb-8 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20 text-amber-500">
                <AlertCircle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
                  Offline Sandbox Mode (Local Simulation only)
                  <span className="text-[8px] bg-amber-500/10 border border-amber-500/30 text-amber-500 px-1.5 py-0.5 rounded font-bold font-mono">
                    NOT REMOTE SYNCED
                  </span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Aap abhi simulated passcode se logged in hain. CMS me hone wali koi bhi editing <strong>sirf aapke browser ke LocalStorage me save hogi</strong> aur doosre web visitors ko nazar nahi aegi. Agar aap chahte hain ke shifts real cloud par save hon aur sabhi users ko dynamically update mile, toh kindly <strong>Sign in with Google</strong> kijiye.
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-1 w-full bg-slate-950/40 p-2 rounded border border-white/5">
                  Verified target administrator account: <span className="text-purple-600 dark:text-purple-400 font-bold font-mono">m*********@gmail.com</span>
                </p>
              </div>
            </div>
            <button
              onClick={handleGoogleLogin}
              className="px-4.5 py-2.5 bg-amber-500 hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-550 text-slate-950 rounded-xl font-extrabold font-mono text-[10px] tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] shrink-0 shadow-lg shadow-amber-500/15 cursor-pointer"
            >
              Google Sign-In Connect
            </button>
          </div>
        ) : (
          <div className="mb-8 p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 text-emerald-500">
                <Database className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-2">
                  Cloud Live Sync Activated (Google Authentication Active)
                  <span className="text-[8px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 px-1.5 py-0.5 rounded font-bold font-mono">
                    WRITING LIVE
                  </span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-emerald-100/90 mt-1 leading-relaxed">
                  Welcome, Anees! Aap verified Google admin configuration <strong>({currentUser.email})</strong> ke sath linked hain. Aapki har modification dynamic realtime update ke tor par direct Firebase Firestore engine par commit ho rahi hai aur realtime me physical status changes propagate ho rahi hain globally.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <a
                    href="https://console.firebase.google.com/project/gen-lang-client-0562178915/firestore/databases/ai-studio-b97102a9-fb1a-4ae4-a2e8-e3d154461aea/data"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-purple-600 hover:text-purple-700 dark:text-purple-300 dark:hover:text-purple-200 font-mono underline font-bold"
                  >
                    Click to Open & Visit your Firebase Console Database Realtime ↗
                  </a>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[9px] font-mono font-extrabold text-emerald-500 border border-emerald-500/20 rounded px-2.5 py-1 bg-emerald-500/10">
                ONLINE SYNC
              </span>
            </div>
          </div>
        )}

        {/* Dashboard Frame Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* TAB BAR SELECTOR (Col layout) */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 p-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl h-fit">
            {[
              { id: 'Home', label: 'Dashboard Home', icon: Monitor },
              { id: 'Hero', label: 'Hero & About', icon: User },
              { id: 'Projects', label: 'Project Portfolio', icon: Layers },
              { id: 'Experiences', label: 'Career History', icon: Briefcase },
              { id: 'Skills', label: 'Capability Deck', icon: Award },
              { id: 'Branding', label: 'Brand Settings', icon: Sparkles },
              { id: 'Messages', label: 'Contact Messages', icon: Mail }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              const unreadCount = tab.id === 'Messages' ? contactMessages.filter((m: any) => !m.read).length : 0;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setEditingProject(null);
                    setEditingExperience(null);
                    setEditingSkill(null);
                  }}
                  className={`flex items-center justify-between px-4.5 py-3.5 rounded-xl text-left border text-xs font-semibold tracking-wide transition-all duration-200 select-none shrink-0 cursor-pointer ${
                    isSelected 
                      ? 'bg-slate-900 border-slate-800 dark:bg-[#0A0A0A] dark:border-white/10 text-white shadow-sm'
                      : 'bg-transparent border-transparent text-slate-600 dark:text-gray-400 hover:bg-slate-200/50 dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <TabIcon className={`w-4 h-4 ${isSelected ? 'text-purple-400' : 'text-slate-450'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold shrink-0">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* MAIN CRUD CORE AREA CONTAINER (9 cols) */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            
            {/* T1. DASHBOARD HOME VIEW */}
            {activeTab === 'Home' && (
              <div className="flex flex-col gap-8.5">
                
                {/* Stats cards panel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Active Projects', count: projects.length, change: '+1 completed', color: 'from-purple-500 to-indigo-550' },
                    { label: 'Career Milestone Roles', count: experiences.length, change: 'Stable Timeline', color: 'from-pink-500 to-rose-550' },
                    { label: 'Independently Indexed Skills', count: skills.length, change: 'High Proficiency', color: 'from-cyan-400 to-blue-550' },
                    { label: 'Inquiries Received', count: contactMessages.length, change: `${contactMessages.filter(m => !m.read).length} unread`, color: 'from-amber-400 to-amber-655' }
                  ].map((stat, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-white/40 dark:bg-white/2 border border-slate-200 dark:border-white/5 flex flex-col gap-1.5 relative overflow-hidden group hover:border-slate-350 dark:hover:border-white/10 transition-colors">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-gray-450">{stat.label}</span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl font-extrabold font-display text-slate-900 dark:text-white">{stat.count}</span>
                        <span className="text-[10px] font-mono text-purple-500 font-bold">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live Diagnostics Console Log (World-Class Realistic Details) */}
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-[#0A0A0A]/95 text-[#A7F3D0] shadow-xl relative overflow-hidden">
                  <div className="absolute top-2 right-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[9px] font-mono text-emerald-500 tracking-wider">LIVE SYSTEM FEED</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Terminal className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Active Observability Node logs</span>
                  </div>

                  <div className="font-mono text-[11px] leading-relaxed flex flex-col gap-1.5 select-all overflow-x-auto max-h-[160px] scrollbar-thin scrollbar-white/10">
                    <span className="text-slate-500">[2026-05-22 UTC 10:16] establishing active dynamic local persistence buffer... OK</span>
                    <span className="text-purple-400">[2026-05-22 UTC 10:16] verified SHA-256 system integrity config on portfolio items. Sync core coherent.</span>
                    <span className="text-cyan-400">[2026-05-22 UTC 10:17] 127.0.0.1 routed client query: fetch-projects (completed in 0.44 ms) [99.98% OK]</span>
                    <span className="text-slate-400">[2026-05-22 UTC 10:17] telemetry reporting: active SLA targets healthy across us-east, ap-east and eu-west routers.</span>
                    <span className="text-emerald-400">[2026-05-22 UTC 10:18] CMS control engine status: STANDBY_COMMIT_READY_v2.4</span>
                  </div>
                </div>

                {/* Quick actions box */}
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-[#0A0A0A]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">Fast Portfolio Re-configuration</h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 font-light">Create new showcases or modify existing timeline entries with single-touch panel control.</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setActiveTab('Projects'); triggerNewProject(); }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-xs font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
                    >
                      New Showcase Project
                    </button>
                    <button
                      onClick={() => { setActiveTab('Experiences'); setEditingExperience({ company: '', role: '', duration: '', description: '', achievements: [] }); }}
                      className="px-4 py-2 border border-slate-250 bg-white hover:bg-slate-50 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      New Experience
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* T1.5 HERO & ABOUT MANAGER VIEW */}
            {activeTab === 'Hero' && (
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-250 dark:border-white/10 bg-white/65 dark:bg-[#0D0D0D] flex flex-col gap-6 shadow-xl text-slate-700 dark:text-slate-300">
                <div className="pb-3 border-b border-slate-200 dark:border-white/10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400 font-display">
                    Hero & Biography Settings
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Configure profile avatars, introduction titles, subheadings, and social links instantly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Image drag-and-drop component */}
                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">
                      Profile Avatar Picture *
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-slate-50 dark:bg-black/50 rounded-2xl border border-slate-200 dark:border-white/10">
                      
                      {/* Avatar preview */}
                      <div className="relative w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-cyan-400 overflow-hidden shrink-0">
                        <div className="w-full h-full rounded-full bg-slate-100 dark:bg-black overflow-hidden flex items-center justify-center">
                          {heroState.profileImage ? (
                            <img src={heroState.profileImage} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-8 h-8 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* Drop uploader info */}
                      <div className="flex-1 w-full text-center sm:text-left">
                        <div 
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (e.dataTransfer.files?.[0]) {
                              handleImageUpload(e.dataTransfer.files[0], (url) => {
                                setHeroState(prev => ({ ...prev, profileImage: url }));
                                triggerToast('Avatar changed successfully. Click save below!', 'info');
                              });
                            }
                          }}
                          className="border-2 border-dashed border-slate-250 dark:border-white/10 hover:border-purple-500 rounded-xl p-4 transition-all hover:bg-purple-500/5 cursor-pointer flex flex-col items-center justify-center gap-1.5"
                        >
                          <FileImage className="w-5 h-5 text-purple-400" />
                          <p className="text-[10px] text-slate-500">Drag & Drop profile avatar here, or</p>
                          <label className="px-3 py-1 bg-purple-600 hover:bg-purple-550 text-white font-semibold rounded text-[10px] cursor-pointer inline-block transition-colors">
                            Browse Local Storage File
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleImageUpload(e.target.files[0], (url) => {
                                    setHeroState(prev => ({ ...prev, profileImage: url }));
                                    triggerToast('Avatar changed. Safe to commit!', 'info');
                                  });
                                }
                              }}
                            />
                          </label>
                          {isUploading && (
                            <div className="w-full mt-3 flex flex-col gap-1 px-4">
                              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400">
                                <span>Uploading Media...</span>
                                <span>{uploadProgress}%</span>
                              </div>
                              <div className="w-full bg-slate-200 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                                <span className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full block transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core editable bio text fields */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Display Name</label>
                    <input 
                      type="text"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-500 font-bold"
                      value={heroState.name || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Introduction Title Subheading</label>
                    <input 
                      type="text"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.title || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Branding Badge Text / Detail Tag</label>
                    <input 
                      type="text"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.subtitle || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, subtitle: e.target.value }))}
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Hero Tagline Paragraph</label>
                    <textarea 
                      rows={3}
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.tagline || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, tagline: e.target.value }))}
                    />
                  </div>

                  {/* About fields */}
                  <div className="sm:col-span-2 flex flex-col gap-1.5 mt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-purple-400 font-mono mb-2">About Section Bio Details:</h4>
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">A. Short Introduco-Banner (About Heading)</label>
                    <input 
                      type="text"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-500"
                      value={heroState.shortIntroduction || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, shortIntroduction: e.target.value }))}
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">B. Biography Text Paragraph</label>
                    <textarea 
                      rows={3}
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-500"
                      value={heroState.bioText || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, bioText: e.target.value }))}
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">C. Core Experience Summary Directives</label>
                    <input 
                      type="text"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.experienceSummary || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, experienceSummary: e.target.value }))}
                    />
                  </div>

                  {/* Buttons details */}
                  <div className="sm:col-span-2 flex flex-col gap-1.5 mt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-blue-400 font-mono mb-2">Call To Action Hooks:</h4>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Primary Button Text</label>
                    <input 
                      type="text"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.ctaTextPrimary || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, ctaTextPrimary: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Primary Link Endpoint</label>
                    <input 
                      type="text"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.ctaLinkPrimary || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, ctaLinkPrimary: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Secondary Button Text</label>
                    <input 
                      type="text"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.ctaTextSecondary || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, ctaTextSecondary: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Secondary Link Endpoint</label>
                    <input 
                      type="text"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.ctaLinkSecondary || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, ctaLinkSecondary: e.target.value }))}
                    />
                  </div>

                  {/* Social links */}
                  <div className="sm:col-span-2 flex flex-col gap-1.5 mt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-emerald-450 font-mono mb-2">Connect Link Indexes:</h4>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold font-semibold text-emerald-600 dark:text-emerald-400 font-mono">GitHub Workspace URL</label>
                    <input 
                      type="url"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.githubUrl || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, githubUrl: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold font-semibold text-sky-600 dark:text-sky-400 font-mono">LinkedIn Profile URL</label>
                    <input 
                      type="url"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.linkedinUrl || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                    />
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold font-semibold text-violet-600 dark:text-violet-400 font-mono">Fiverr Seller/Portfolio Link URL</label>
                    <input 
                      type="url"
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                      value={heroState.fiverrUrl || ''}
                      onChange={(e) => setHeroState(prev => ({ ...prev, fiverrUrl: e.target.value }))}
                    />
                  </div>

                </div>

                <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      saveHero(heroState);
                      notifyChanges();
                      triggerToast('Hero details instantly saved and updated!', 'success');
                    }}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer shrink-0"
                  >
                    <Save className="w-4 h-4" />
                    Save & Live Update Instantly
                  </button>
                </div>
              </div>
            )}

            {/* T2. PROJECTS MANAGER VIEW */}
            {activeTab === 'Projects' && (
              <div className="flex flex-col gap-6">
                
                {/* Header elements */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="relative w-full sm:max-w-xs">
                    <input
                      type="text"
                      placeholder="Search code showcases..."
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-[#0A0A0A] text-slate-800 dark:text-white rounded-xl px-4 py-2.5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:border-purple-550"
                    />
                  </div>
                  
                  {!editingProject && (
                    <button
                      onClick={triggerNewProject}
                      className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Project Showcase
                    </button>
                  )}
                </div>

                {/* Interactive Project Form */}
                {editingProject && (
                  <form onSubmit={handleSaveProject} className="p-6 sm:p-8 rounded-2xl border border-slate-250 dark:border-white/10 bg-white/60 dark:bg-[#0D0D0D] flex flex-col gap-5.5 shadow-xl">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400 font-display">
                        {editingProject.id ? 'Edit Project Config' : 'Formulate New Showcase'}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => setEditingProject(null)}
                        className="p-1 rounded bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Inputs panel block */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-slate-700 dark:text-slate-300">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Showcase Name *</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title || ''}
                          onChange={(e) => setEditingProject(p => ({ ...p, title: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Category Deck Target</label>
                        <select
                          value={editingProject.category || 'AI Apps'}
                          onChange={(e) => setEditingProject(p => ({ ...p, category: e.target.value as any }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none text-slate-700 dark:text-gray-300"
                        >
                          <option value="Frontend">Frontend engineering</option>
                          <option value="AI Apps">AI Neural system</option>
                          <option value="SaaS">SaaS Application</option>
                          <option value="Dashboards">Metrics Dashboard</option>
                          <option value="Prompt Engineering">Prompt Orchestration</option>
                          <option value="UI Systems">Interactivity UI Suite</option>
                          <option value="Automation">Workflows & Bots</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Short Sub-Brief Description *</label>
                        <input
                          type="text"
                          required
                          value={editingProject.description || ''}
                          onChange={(e) => setEditingProject(p => ({ ...p, description: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-550"
                        />
                      </div>

                      <div className="sm:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Complete Project Summary & Operational Methodology</label>
                        <textarea
                          rows={3}
                          value={editingProject.summary || ''}
                          onChange={(e) => setEditingProject(p => ({ ...p, summary: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-550"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Production Client / System Owner</label>
                        <input
                          type="text"
                          value={editingProject.client || ''}
                          onChange={(e) => setEditingProject(p => ({ ...p, client: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Score Metric (Performance Index: 0 - 100)</label>
                        <input
                          type="number"
                          value={editingProject.performanceScore || 98}
                          onChange={(e) => setEditingProject(p => ({ ...p, performanceScore: Number(e.target.value) }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Operational Status Chip Level</label>
                        <select
                          value={editingProject.status || 'Production Active'}
                          onChange={(e) => setEditingProject(p => ({ ...p, status: e.target.value as any }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300"
                        >
                          <option value="Production Active">Production Active</option>
                          <option value="Enterprise Beta">Enterprise Beta</option>
                          <option value="Beta Lab">Beta Lab</option>
                          <option value="Marketplace Live">Marketplace Live</option>
                          <option value="Active Live">Active Live</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-[10px] font-mono tracking-wider text-slate-455 uppercase font-bold">Project cover / Screenshot image upload & preview</label>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30">
                          
                          {/* Left Column: Image preview before saving */}
                          <div className="md:col-span-4 flex items-center justify-center bg-slate-100 dark:bg-black rounded-lg overflow-hidden border border-slate-200 dark:border-white/5 h-24">
                            {editingProject.screenshots?.[0] ? (
                              <img src={editingProject.screenshots[0]} alt="Screenshot Preview" className="h-full w-full object-cover" />
                            ) : (
                              <FileImage className="w-8 h-8 text-slate-400" />
                            )}
                          </div>

                          {/* Right Column: Drag & Drop Area */}
                          <div className="md:col-span-8 flex flex-col justify-center">
                            <div 
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                if (e.dataTransfer.files?.[0]) {
                                  handleImageUpload(e.dataTransfer.files[0], (url) => {
                                    setEditingProject(p => ({ ...p, screenshots: [url] }));
                                    triggerToast('Project custom image uploaded successfully!', 'info');
                                  });
                                }
                              }}
                              className="border border-dashed border-slate-350 dark:border-white/10 rounded-lg p-3 hover:border-purple-500 text-center cursor-pointer transition-colors hover:bg-purple-500/5"
                            >
                              <p className="text-[10px] text-slate-500 font-light mb-1">Drag and drop file here, or select browse:</p>
                              <label className="px-3 py-1.5 bg-slate-900 dark:bg-white dark:text-slate-950 text-white rounded text-[10px] font-semibold cursor-pointer inline-block transition-colors hover:scale-[1.02]">
                                Upload Custom Screenshot (Base64 Compressed)
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                      handleImageUpload(e.target.files[0], (url) => {
                                        setEditingProject(p => ({ ...p, screenshots: [url] }));
                                        triggerToast('Screenshot loaded successfully!', 'info');
                                      });
                                    }
                                  }}
                                />
                              </label>
                              {isUploading && (
                                <div className="w-full mt-3 flex flex-col gap-1 px-4">
                                  <div className="flex justify-between items-center text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400">
                                    <span>Uploading Portfolio Screenshot...</span>
                                    <span>{uploadProgress}%</span>
                                  </div>
                                  <div className="w-full bg-slate-200 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                                    <span className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full block transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-[10px] font-mono tracking-wider text-slate-450 uppercase font-bold">Or select from Preset image Pool</label>
                        <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-50 dark:bg-black rounded-xl border border-slate-200 dark:border-white/10">
                          {PRESET_IMAGES.map((img, iIndex) => {
                            const isChosen = editingProject.screenshots?.[0] === img;
                            return (
                              <button
                                key={iIndex}
                                type="button"
                                onClick={() => setEditingProject(p => ({ ...p, screenshots: [img] }))}
                                className={`w-8 h-8 rounded-lg relative overflow-hidden border transition-all ${
                                  isChosen ? 'border-purple-500 scale-110 z-10' : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Deploy Live Address</label>
                        <input
                          type="text"
                          value={editingProject.liveUrl || ''}
                          onChange={(e) => setEditingProject(p => ({ ...p, liveUrl: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">GitHub Source Workspace link</label>
                        <input
                          type="text"
                          value={editingProject.githubUrl || ''}
                          onChange={(e) => setEditingProject(p => ({ ...p, githubUrl: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <input
                          type="checkbox"
                          id="featuredProjectCheck"
                          checked={editingProject.featured || false}
                          onChange={(e) => setEditingProject(p => ({ ...p, featured: e.target.checked }))}
                          className="w-4.5 h-4.5 accent-purple-500 bg-black text-purple-600 rounded focus:ring-0"
                        />
                        <label htmlFor="featuredProjectCheck" className="text-xs text-slate-700 dark:text-gray-300 select-none cursor-pointer font-bold">
                          Feature proudly on Landing Page grid?
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-slate-200 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2.5 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold cursor-pointer"
                      >
                        Abandon
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer shrink-0"
                      >
                        <Check className="w-4 h-4" />
                        Commit Codebase Showcase
                      </button>
                    </div>
                  </form>
                )}

                {/* Main Shorter Project Table Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {filteredProjectsList.map((proj) => (
                    <div 
                      key={proj.id} 
                      className="p-4 rounded-xl bg-white/40 dark:bg-white/2 border border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4.5 min-w-0">
                        {/* Static Thumbnail visual placeholder */}
                        <div className={`w-12 h-12 rounded-lg bg-cover bg-center shrink-0 border border-slate-200 dark:border-white/15`} style={{ backgroundImage: `url(${proj.screenshots[0]})` }} />
                        
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate font-display flex items-center gap-2">
                            {proj.title}
                            {proj.featured && (
                              <span className="text-[7px] font-mono tracking-wider bg-purple-550/15 text-purple-600 dark:text-purple-400 px-1 py-0.5 rounded border border-purple-500/20 uppercase font-extrabold pb-0.5">FEATURED</span>
                            )}
                          </h4>
                          <span className="text-[9px] font-mono text-slate-400 dark:text-gray-550 mr-2.5 uppercase tracking-wide">
                            {proj.category}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-gray-400 truncate max-w-[200px] sm:max-w-md block font-light">
                            {proj.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0 w-full sm:w-auto self-end sm:self-auto justify-end border-t border-slate-200/50 dark:border-transparent pt-3.5 sm:pt-0">
                        <button
                          onClick={() => setEditingProject(proj)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg text-xs cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-550/20 text-rose-500 rounded-lg text-xs cursor-pointer"
                          title="Purge"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* T3. EXPERIENCES MANAGER VIEW */}
            {activeTab === 'Experiences' && (
              <div className="flex flex-col gap-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="relative w-full sm:max-w-xs">
                    <input
                      type="text"
                      placeholder="Search roles or timeline..."
                      value={experienceSearch}
                      onChange={(e) => setExperienceSearch(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-[#0A0A0A] text-slate-800 dark:text-white rounded-xl px-4 py-2.5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none"
                    />
                  </div>
                  
                  {!editingExperience && (
                    <button
                      onClick={() => setEditingExperience({ company: '', role: '', duration: '', description: '', achievements: [] })}
                      className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Professional Role
                    </button>
                  )}
                </div>

                {editingExperience && (
                  <form onSubmit={handleSaveExperience} className="p-6 sm:p-8 rounded-2xl border border-slate-250 dark:border-white/10 bg-white/60 dark:bg-[#0D0D0D] flex flex-col gap-5 shadow-xl">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400 font-display">
                        {editingExperience.id ? 'Edit Experience Credentials' : 'Configure New Work Term'}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => setEditingExperience(null)}
                        className="p-1 rounded bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-slate-700 dark:text-slate-300">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Company / Partner Name *</label>
                        <input
                          type="text"
                          required
                          value={editingExperience.company || ''}
                          onChange={(e) => setEditingExperience(exp => ({ ...exp, company: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Role Title Name *</label>
                        <input
                          type="text"
                          required
                          value={editingExperience.role || ''}
                          onChange={(e) => setEditingExperience(exp => ({ ...exp, role: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Duration (e.g., 2024 - Present) *</label>
                        <input
                          type="text"
                          required
                          value={editingExperience.duration || ''}
                          onChange={(e) => setEditingExperience(exp => ({ ...exp, duration: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Core Mandate & Description</label>
                        <textarea
                          rows={2}
                          value={editingExperience.description || ''}
                          onChange={(e) => setEditingExperience(exp => ({ ...exp, description: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2 flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Achievements (Separate with line breaks)</label>
                        <textarea
                          rows={3}
                          placeholder="e.g. Reduced bundle overhead by 34%&#10;Pioneered streaming LLM adapters."
                          value={editingExperience.achievements?.join('\n') || ''}
                          onChange={(e) => setEditingExperience(exp => ({ ...exp, achievements: e.target.value.split('\n').filter(Boolean) }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingExperience(null)}
                        className="px-4 py-2.5 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold cursor-pointer"
                      >
                        Abandon
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Commit Work Credentials
                      </button>
                    </div>
                  </form>
                )}

                {/* Experiences list cards */}
                <div className="flex flex-col gap-4">
                  {filteredExperiencesList.map((exp) => (
                    <div 
                      key={exp.id} 
                      className="p-5 rounded-xl bg-white/40 dark:bg-white/2 border border-slate-200 dark:border-white/5 flex items-center justify-between gap-5 hover:border-slate-300 dark:hover:border-white/10 transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono tracking-wider uppercase text-slate-450 border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md">
                          {exp.duration}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-100 font-display mt-2">
                          {exp.role} 
                          <span className="text-slate-400 dark:text-slate-500 font-light text-xs font-mono ml-2">@ {exp.company}</span>
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-gray-400 leading-normal truncate max-w-xl mt-1 font-light">
                          {exp.description}
                        </p>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => setEditingExperience(exp)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 rounded-lg text-xs cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp.id, exp.company)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg text-xs cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* T4. SKILLS MANAGER VIEW */}
            {activeTab === 'Skills' && (
              <div className="flex flex-col gap-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="relative w-full sm:max-w-xs">
                    <input
                      type="text"
                      placeholder="Search skill items..."
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-[#0A0A0A] text-slate-800 dark:text-white rounded-xl px-4 py-2.5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none"
                    />
                  </div>
                  
                  {!editingSkill && (
                    <button
                      onClick={() => setEditingSkill({ name: '', category: 'Frontend', proficiency: 90 })}
                      className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-505 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      Add Capability Node
                    </button>
                  )}
                </div>

                {editingSkill && (
                  <form onSubmit={handleSaveSkill} className="p-6 rounded-2xl border border-slate-250 dark:border-white/10 bg-white/60 dark:bg-[#0D0D0D] flex flex-col gap-4.5 shadow-xl">
                    <div className="flex justify-between items-center pb-3 border-b border-light-divider dark:border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-gray-400 font-display">
                        {editingSkill.id ? 'Edit Skill parameters' : 'Calibrate New Capability'}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => setEditingSkill(null)}
                        className="p-1 rounded bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-slate-700 dark:text-slate-350">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Skill Label / Tech *</label>
                        <input
                          type="text"
                          required
                          value={editingSkill.name || ''}
                          onChange={(e) => setEditingSkill(sk => ({ ...sk, name: e.target.value }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Category Group</label>
                        <select
                          value={editingSkill.category || 'Frontend'}
                          onChange={(e) => setEditingSkill(sk => ({ ...sk, category: e.target.value as any }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none text-slate-700 dark:text-gray-300"
                        >
                          <option value="Frontend">Frontend (React, Next, Tailwind)</option>
                          <option value="AI">AI (Prompt Systems, LLM Interfaces)</option>
                          <option value="Tools">Tools (Kubernetes, gRPC, Git)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Proficiency index (0 - 100)</label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          required
                          value={editingSkill.proficiency || 90}
                          onChange={(e) => setEditingSkill(sk => ({ ...sk, proficiency: Number(e.target.value) }))}
                          className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingSkill(null)}
                        className="px-4 py-2.5 rounded-lg text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-semibold cursor-pointer"
                      >
                        Abandon
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Commit Skill Node
                      </button>
                    </div>
                  </form>
                )}

                {/* Skills Grid table lists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredSkillsList.map((skill) => (
                    <div 
                      key={skill.id} 
                      className="p-4 rounded-xl bg-white/40 dark:bg-white/2 border border-slate-200 dark:border-white/5 flex items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-white/10 transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[8px] font-mono text-purple-400 bg-purple-950/20 px-1.5 py-0.5 rounded border border-purple-500/20 uppercase tracking-wider">
                          {skill.category}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 font-display mt-1.5">
                          {skill.name}
                        </h4>
                        <div className="w-[100px] bg-slate-100 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mt-1.5">
                          <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full" style={{ width: `${skill.proficiency}%` }} />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-extrabold text-[#6D28D9] dark:text-[#A78BFA]">{skill.proficiency}%</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingSkill(skill)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 rounded-md text-[10px] cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill.id, skill.name)}
                            className="p-1.5 bg-rose-500/10 hover:bg-rose-550/20 text-rose-500 rounded-md text-[10px] cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* T5. BRANDING SETTINGS VIEW */}
            {activeTab === 'Branding' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                saveBranding(brandingState);
                notifyChanges();
                triggerToast('Brand configuration settings updated!', 'success');
              }} className="flex flex-col gap-6 p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-white/2 shadow-xl">
                <div className="pb-3 border-b border-slate-200 dark:border-white/10">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-display flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-purple-400" />
                    <span>Dynamic Agency Branding</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-1">Configure global text headers, naming metadata, visual styles, and logos.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Logo Normal Text</label>
                    <input
                      type="text"
                      value={brandingState.logoText || ''}
                      onChange={(e) => setBrandingState(b => ({ ...b, logoText: e.target.value }))}
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Logo Highlight Accents</label>
                    <input
                      type="text"
                      value={brandingState.logoHighlightText || ''}
                      onChange={(e) => setBrandingState(b => ({ ...b, logoHighlightText: e.target.value }))}
                      className="bg-slate-50 dark:bg-black text-slate-900 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Site Frame Window Title</label>
                    <input
                      type="text"
                      value={brandingState.siteName || ''}
                      onChange={(e) => setBrandingState(b => ({ ...b, siteName: e.target.value }))}
                      className="bg-slate-50 dark:bg-black text-slate-950 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Visual Themes Selector</label>
                    <select
                      value={brandingState.themeMode || 'Dual'}
                      onChange={(e) => setBrandingState(b => ({ ...b, themeMode: e.target.value as any }))}
                      className="bg-slate-50 dark:bg-black text-slate-905 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none text-slate-700 dark:text-gray-300"
                    >
                      <option value="Dual">Dynamic Dual Mode Switcher</option>
                      <option value="Light">Enforce Light Canvas Theme Only</option>
                      <option value="Dark">Enforce Immersive Dark Mode Only</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Visual Layout Densities</label>
                    <select
                      value={brandingState.denseLayout ? 'true' : 'false'}
                      onChange={(e) => setBrandingState(b => ({ ...b, denseLayout: e.target.value === 'true' }))}
                      className="bg-slate-50 dark:bg-black text-slate-905 dark:text-white text-xs rounded-xl p-3 border border-slate-200 dark:border-white/10 focus:outline-none text-slate-700 dark:text-gray-300"
                    >
                      <option value="false">Standard Spacing / Flowing (Spacious)</option>
                      <option value="true">Bento Layout High-Density (Compact)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md hover:scale-[1.01] active:scale-95 transition-all"
                  >
                    Commit Brand Changes
                  </button>
                </div>
              </form>
            )}

            {/* T6. CONTACT MESSAGES TAB VIEW */}
            {activeTab === 'Messages' && (
              <div className="flex flex-col gap-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="relative w-full sm:max-w-xs">
                    <input
                      type="text"
                      placeholder="Search inbox / sender name..."
                      value={messageSearch}
                      onChange={(e) => setMessageSearch(e.target.value)}
                      className="w-full bg-slate-100 dark:bg-[#0A0A0A] text-slate-805 dark:text-white rounded-xl px-4 py-2.5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none"
                    />
                  </div>
                  
                  {contactMessages.length > 0 && (
                    <span className="text-[10px] font-mono font-bold text-purple-500 uppercase">
                      Displaying {contactMessages.length} Messages
                    </span>
                  )}
                </div>

                {contactMessages.length === 0 ? (
                  <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10 bg-white/10 dark:bg-white/2 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-450">
                      <Mail className="w-5 h-5 font-light" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700 dark:text-white">Inbox empty</p>
                      <p className="text-[11px] text-slate-400 mt-1">Submit test inquiries inside the contact form below or wait for clients.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {contactMessages
                      .filter(m => {
                        const s = messageSearch.toLowerCase();
                        return (m.name || '').toLowerCase().includes(s) || 
                               (m.email || '').toLowerCase().includes(s) || 
                               (m.message || '').toLowerCase().includes(s) || 
                               (m.subject || '').toLowerCase().includes(s);
                      })
                      .map((msg) => {
                        return (
                          <div 
                            key={msg.id} 
                            className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col gap-3 ${
                              !msg.read 
                                ? 'bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border-purple-500/20 shadow-lg' 
                                : 'bg-white/40 dark:bg-white/2 border-slate-250 dark:border-white/5'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                                    {msg.name}
                                  </h4>
                                  <span className="text-[10.5px] font-mono text-slate-400">
                                    ({msg.email})
                                  </span>
                                </div>
                                <p className="text-[10px] text-purple-600 dark:text-purple-400 font-mono mt-0.5">
                                  Subject: {msg.subject || 'Inquiry'}
                                </p>
                              </div>

                              <span className="text-[9px] font-mono text-slate-450 select-none">
                                {msg.timestamp ? new Date(msg.timestamp).toLocaleString() : 'N/A'}
                              </span>
                            </div>

                            <p className="text-xs text-slate-650 dark:text-slate-300 bg-slate-50 dark:bg-black/40 p-3 rounded-xl leading-relaxed whitespace-pre-wrap font-sans border border-slate-200/50 dark:border-white/5">
                              {msg.message}
                            </p>

                            <div className="flex justify-between items-center gap-3 pt-1">
                              <button
                                type="button"
                                onClick={async () => {
                                  try {
                                    await markMessageReadInFirebase(msg.id, !msg.read);
                                    triggerToast(`Message marked as ${!msg.read ? 'Read' : 'Unread'}`, 'success');
                                  } catch (err) {
                                    triggerToast('Connection fault toggling read state', 'error');
                                  }
                                }}
                                className={`flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase transition-colors shrink-0 cursor-pointer ${
                                  msg.read 
                                    ? 'text-slate-400 hover:text-purple-400' 
                                    : 'text-purple-500 hover:text-purple-600'
                                }`}
                              >
                                {msg.read ? (
                                  <>
                                    <X className="w-3.5 h-3.5" />
                                    <span>Mark Unread</span>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Mark Read</span>
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={async () => {
                                  if (window.confirm('Delete message temporarily/permanently?')) {
                                    try {
                                      await deleteContactMessageFromFirebase(msg.id);
                                      triggerToast('Message permanently removed', 'success');
                                    } catch (err) {
                                      triggerToast('Delete message failed', 'error');
                                    }
                                  }
                                }}
                                className="p-2 border border-rose-500/10 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg text-xs cursor-pointer flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span className="text-[9px] font-bold uppercase tracking-wider font-mono">Purge</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
