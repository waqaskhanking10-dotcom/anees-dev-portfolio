import { Project, WorkExperience, Skill, HeroData, BrandingData } from '../types';
import { db, handleFirestoreError, OperationType, auth } from '../firebase';
import { 
  collection, doc, setDoc, deleteDoc, addDoc, onSnapshot, 
  getDocs, Timestamp, writeBatch 
} from 'firebase/firestore';

// ------------------------------------------------------------------------
// Initial Seed Standard Pools
// ------------------------------------------------------------------------
export const INITIAL_EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp-1',
    company: 'Anees Creative Lab',
    role: 'Lead AI Frontend Engineer',
    duration: '2024 - Present',
    description: 'Architecting state-of-the-art developer tools, neural interfaces, and low-latency agent visualizer pipelines.',
    achievements: [
      'Reduced initial prompt compilation and routing latency by 42.8% globally.',
      'Developed real-time token monitor dashboards handling millions of live audits.',
      'Designed and engineered the world-class Cognitive Flow Designer visual composer.'
    ]
  },
  {
    id: 'exp-2',
    company: 'Vercel Ecosystems Node',
    role: 'Senior Frontend Developer',
    duration: '2022 - 2024',
    description: 'Led core component rendering optimizations, edge routing compliance, and unified glassmorphic theme standards.',
    achievements: [
      'Boosted layout load scores to a strict 99% across core telemetry screens.',
      'Standardized production-tier component architectures, trimming bundle footprint by 34%.',
      'Pioneered interactive micro-interactions systems resulting in exceptional user engagement.'
    ]
  },
  {
    id: 'exp-3',
    company: 'Prompt & UI Specialist Lab',
    role: 'Contract Frontend UI & Prompt Engineer',
    duration: '2020 - 2022',
    description: 'Engineered high-contrast web models, real-time reactive nodes, and custom API-backed application setups.',
    achievements: [
      'Successfully shipped 14+ client-ready portfolios and enterprise CMS layouts.',
      'Optimized multi-agent system state orchestration using lightweight React Context and local state systems.',
      'Co-authored custom routing guard algorithms for sanitizing client-side input payloads.'
    ]
  }
];

export const INITIAL_SKILLS: Skill[] = [
  { id: 'sk-1', name: 'React', category: 'Frontend', proficiency: 98 },
  { id: 'sk-2', name: 'Next.js', category: 'Frontend', proficiency: 95 },
  { id: 'sk-3', name: 'Tailwind CSS', category: 'Frontend', proficiency: 99 },
  { id: 'sk-4', name: 'TypeScript', category: 'Frontend', proficiency: 96 },
  { id: 'sk-5', name: 'Framer Motion', category: 'Frontend', proficiency: 92 },
  
  { id: 'sk-6', name: 'Prompt Engineering', category: 'AI', proficiency: 97 },
  { id: 'sk-7', name: 'AI UI Systems', category: 'AI', proficiency: 94 },
  { id: 'sk-8', name: 'LLM Integrations', category: 'AI', proficiency: 92 },
  { id: 'sk-9', name: 'Vector Sharding', category: 'AI', proficiency: 88 },
  
  { id: 'sk-10', name: 'Git & Deployment', category: 'Tools', proficiency: 94 },
  { id: 'sk-11', name: 'Dev Tools & APIs', category: 'Tools', proficiency: 95 },
  { id: 'sk-12', name: 'WebAssembly & Edge Workers', category: 'Tools', proficiency: 86 }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'edge-guardian',
    title: 'Anees Edge Guardian',
    description: 'Sub-14ms neural firewall routing prompts, shielding injections and identifying PII leaks at scale.',
    summary: 'Anees Edge Guardian represents state-of-the-art compliance architecture. Running globally on edge containers, it intercepts downstream prompts to isolate and neutralize injection sequences, PII disclosure, and context length overflow before hitting LLMs. Its intuitive telemetry records audit trails seamlessly under heavy concurrent spikes.',
    technologies: ['TypeScript', 'Next.js', 'WebAssembly', 'Cloudflare Workers', 'Tailwind CSS'],
    category: 'AI Apps',
    liveUrl: '#live-guardian',
    githubUrl: 'https://github.com/anees-creative-lab/edge-guardian',
    screenshots: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'from-pink-500 to-rose-600',
    completionDate: '2026-03-15',
    status: 'Production Active',
    featured: true,
    tags: ['Security', 'Real-time', 'Firewall', 'Edge'],
    gradient: 'from-pink-500 to-rose-600',
    metrics: [
      { label: 'Latency Overhead', value: '11.4 ms' },
      { label: 'Attack Block Rate', value: '99.98%' },
      { label: 'Daily Audits', value: '4.2 Million' }
    ],
    client: 'Stripe Security Team',
    performanceScore: 99
  },
  {
    id: 'vector-db-sharder',
    title: 'Nova Vector DB Sharder',
    description: 'High-availability routing coordinator that clusters and replicates relational embedding snapshots.',
    summary: 'An elite clustering gateway built to solve multi-tenant cold starts. By orchestrating distributed relational vector snapshots and mirroring active embeddings across nodes, the Sharder guarantees sub-millisecond retrieval states while preserving exact search semantic distances globally.',
    technologies: ['Rust', 'Go', 'gRPC', 'React', 'D3.js', 'Tailwind CSS'],
    category: 'Dashboards',
    liveUrl: '#live-sharder',
    githubUrl: 'https://github.com/anees-creative-lab/vector-db-sharder',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'from-purple-500 to-indigo-600',
    completionDate: '2026-01-20',
    status: 'Marketplace Live',
    featured: true,
    tags: ['Clustering', 'Infrastructure', 'gRPC', 'Database'],
    gradient: 'from-purple-500 to-indigo-600',
    metrics: [
      { label: 'Database Sync', value: '0.02 ms' },
      { label: 'Search Throughput', value: '18,500 qps' },
      { label: 'Data Redundancy', value: '3x Active' }
    ],
    client: 'Supabase Inc.',
    performanceScore: 98
  },
  {
    id: 'flow-designer',
    title: 'Cognitive Flow Designer',
    description: 'Hierarchical multi-hop agent composer featuring a visual state machine and compliance testbed.',
    summary: 'A gorgeous visual designer tailored for engineering complex multi-agent sequences. It lets designers compile logical loops, configure condition-based prompts, inject custom state variables, and run interactive parallel mock audits in real-time within a fluid, responsive bento-grid workplace.',
    technologies: ['React Flow', 'Zustand', 'Vite', 'Gemini Pro', 'Tailwind CSS'],
    category: 'UI Systems',
    liveUrl: '#live-flow',
    githubUrl: 'https://github.com/anees-creative-lab/flow-composer',
    screenshots: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'from-cyan-500 to-blue-600',
    completionDate: '2025-11-12',
    status: 'Active Live',
    featured: true,
    tags: ['Workflow', 'Visual', 'Agent Composer', 'State Machine'],
    gradient: 'from-cyan-500 to-blue-600',
    metrics: [
      { label: 'Workflow Efficiency', value: '+340%' },
      { label: 'Compiler Executions', value: '1.2 Million' },
      { label: 'Node Connections', value: 'Infinite' }
    ],
    client: 'Linear Ecosystems',
    performanceScore: 97
  },
  {
    id: 'compliance-console',
    title: 'Spectra Telemetry Dashboard',
    description: 'High-contrast real-time analytics panel for federated LLM compliance and latency metrics.',
    summary: 'A dark, polished, and extremely optimized analytical console designed for compliance officers. It aggregates telemetry parameters, records prompt tokens, plots latencies across multi-tenant servers, and generates audit reports automatically for regulatory validation constraints.',
    technologies: ['React', 'Recharts', 'Express', 'Tailwind CSS', 'PostgreSQL'],
    category: 'Dashboards',
    liveUrl: '#live-spectra',
    githubUrl: 'https://github.com/anees-creative-lab/spectra-telemetry',
    screenshots: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85'
    ],
    thumbnail: 'from-amber-400 to-orange-500',
    completionDate: '2025-08-30',
    status: 'Enterprise Beta',
    featured: false,
    tags: ['Analytics', 'Compliance', 'Metrics', 'Live Reporting'],
    gradient: 'from-amber-400 to-orange-500',
    metrics: [
      { label: 'Aggregation Latency', value: '0.1 ms' },
      { label: 'SLA Observance', value: '99.999%' },
      { label: 'Connected Shards', value: '128 Regions' }
    ],
    client: 'OpenAI Enterprise Hub',
    performanceScore: 96
  }
];

export const INITIAL_HERO: HeroData = {
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  name: 'Anees',
  title: 'Lead Frontend Developer & AI Architect',
  subtitle: 'Design & Neural Frontends',
  tagline: 'Building modern, high-performance web experiences with React, Next.js & AI systems. Merging premium minimalist layout aesthetic with optimized client integration.',
  ctaTextPrimary: 'View My Projects',
  ctaLinkPrimary: '#portfolio',
  ctaTextSecondary: 'Contact Me',
  ctaLinkSecondary: '#contact',
  fiverrUrl: 'https://fiverr.com',
  githubUrl: 'https://github.com/anees-creative-lab',
  linkedinUrl: 'https://linkedin.com',
  bioText: 'Lead AI Frontend Engineer deeply obsessed with high-fidelity components, modular states, and lightning-fast browser execution systems.',
  experienceSummary: '3+ years crafting bespoke digital interfaces for leading tech, compliance, and multi-agent SaaS hubs.',
  shortIntroduction: 'Hello and welcome! I leverage cutting-edge Web technology and generative AI techniques to compose fluid user interfaces, dynamic dashboards, and high-performance client ecosystems.'
};

export const INITIAL_BRANDING: BrandingData = {
  logoText: 'Anees',
  logoSubtext: 'Creative Lab',
  logoImage: '',
  siteName: 'Anees Creative Lab',
  themePreset: 'dual'
};

// ------------------------------------------------------------------------
// Real-time caches with LocalStorage fallbacks for instant initial layout paint
// ------------------------------------------------------------------------
let cachedProjects: Project[] = (() => {
  const local = localStorage.getItem('aetheris_projects');
  return local ? JSON.parse(local) : INITIAL_PROJECTS;
})();

let cachedExperiences: WorkExperience[] = (() => {
  const local = localStorage.getItem('aetheris_experiences');
  return local ? JSON.parse(local) : INITIAL_EXPERIENCES;
})();

let cachedSkills: Skill[] = (() => {
  const local = localStorage.getItem('aetheris_skills');
  return local ? JSON.parse(local) : INITIAL_SKILLS;
})();

let cachedHero: HeroData = (() => {
  const local = localStorage.getItem('aetheris_hero');
  return local ? { ...INITIAL_HERO, ...JSON.parse(local) } : INITIAL_HERO;
})();

let cachedBranding: BrandingData = (() => {
  const local = localStorage.getItem('aetheris_branding');
  return local ? { ...INITIAL_BRANDING, ...JSON.parse(local) } : INITIAL_BRANDING;
})();

let cachedContactMessages: any[] = [];

// Helper to notify all React listeners
const notifyCmsListeners = () => {
  window.dispatchEvent(new Event('aetheris_cms_updated'));
};

// ------------------------------------------------------------------------
// Real-time Firestore Live Snapshots Integration
// ------------------------------------------------------------------------

// Bind projects snapshots
onSnapshot(collection(db, 'projects'), (snapshot) => {
  if (!snapshot.empty) {
    const list: Project[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as Project);
    });
    cachedProjects = list;
    localStorage.setItem('aetheris_projects', JSON.stringify(list));
    notifyCmsListeners();
  }
}, (error) => {
  console.warn('Projects onSnapshot restricted or offline: ', error.message);
});

// Bind experience snapshots
onSnapshot(collection(db, 'experience'), (snapshot) => {
  if (!snapshot.empty) {
    const list: WorkExperience[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as WorkExperience);
    });
    // Optional sort by company or order ID if we want
    cachedExperiences = list;
    localStorage.setItem('aetheris_experiences', JSON.stringify(list));
    notifyCmsListeners();
  }
}, (error) => {
  console.warn('Experience onSnapshot restricted or offline: ', error.message);
});

// Bind skills snapshots
onSnapshot(collection(db, 'skills'), (snapshot) => {
  if (!snapshot.empty) {
    const list: Skill[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as Skill);
    });
    cachedSkills = list;
    localStorage.setItem('aetheris_skills', JSON.stringify(list));
    notifyCmsListeners();
  }
}, (error) => {
  console.warn('Skills onSnapshot restricted or offline: ', error.message);
});

// Bind CMS / Hero snapshot
onSnapshot(doc(db, 'cms', 'hero'), (docSnap) => {
  if (docSnap.exists()) {
    const data = docSnap.data() as HeroData;
    cachedHero = { ...INITIAL_HERO, ...data };
    localStorage.setItem('aetheris_hero', JSON.stringify(cachedHero));
    notifyCmsListeners();
  }
}, (error) => {
  console.warn('Hero doc onSnapshot restricted or offline: ', error.message);
});

// Bind CMS / Branding snapshot
onSnapshot(doc(db, 'cms', 'branding'), (docSnap) => {
  if (docSnap.exists()) {
    const data = docSnap.data() as BrandingData;
    cachedBranding = { ...INITIAL_BRANDING, ...data };
    localStorage.setItem('aetheris_branding', JSON.stringify(cachedBranding));
    notifyCmsListeners();
  }
}, (error) => {
  console.warn('Branding doc onSnapshot restricted or offline: ', error.message);
});

// Bind contactMessages snapshots
onSnapshot(collection(db, 'contactMessages'), (snapshot) => {
  const list: any[] = [];
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    list.push({
      id: docSnap.id,
      ...data,
      // Map firestore timestamps to ISO strings for exact model compatibility
      date: data.createdAt && typeof data.createdAt.toDate === 'function' 
        ? data.createdAt.toDate().toISOString() 
        : new Date().toISOString()
    });
  });
  // Sort descending by date
  list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  cachedContactMessages = list;
  notifyCmsListeners();
}, (error) => {
  console.warn('ContactMessages snapshots restricted (this is normal for unauthenticated users): ', error.message);
});

// ------------------------------------------------------------------------
// Getters (synchronous returns of current caches for latency-free renders)
// ------------------------------------------------------------------------
export const loadProjects = (): Project[] => cachedProjects;
export const loadExperiences = (): WorkExperience[] => cachedExperiences;
export const loadSkills = (): Skill[] => cachedSkills;
export const loadHero = (): HeroData => cachedHero;
export const loadBranding = (): BrandingData => cachedBranding;
export const loadContactMessages = (): any[] => cachedContactMessages;

// ------------------------------------------------------------------------
// Database Setters (Writes directly to Firestore and updates globally)
// ------------------------------------------------------------------------

export const saveProjects = async (projects: Project[]): Promise<void> => {
  const path = 'projects';
  cachedProjects = projects;
  localStorage.setItem('aetheris_projects', JSON.stringify(projects));
  notifyCmsListeners();

  try {
    for (const project of projects) {
      await setDoc(doc(db, 'projects', project.id), project);
    }
  } catch (error) {
    console.warn('Firestore cloud write failed, using local caching:', error);
    const isSimulated = localStorage.getItem('aetheris_admin_session') === 'active';
    if (!auth.currentUser && isSimulated) {
      return;
    }
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const deleteProjectFromFirebase = async (projectId: string): Promise<void> => {
  const path = `projects/${projectId}`;
  cachedProjects = cachedProjects.filter(p => p.id !== projectId);
  localStorage.setItem('aetheris_projects', JSON.stringify(cachedProjects));
  notifyCmsListeners();

  try {
    await deleteDoc(doc(db, 'projects', projectId));
  } catch (error) {
    console.warn('Firestore cloud deletion failed, local copy removed:', error);
    const isSimulated = localStorage.getItem('aetheris_admin_session') === 'active';
    if (!auth.currentUser && isSimulated) {
      return;
    }
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

export const saveExperiences = async (experiences: WorkExperience[]): Promise<void> => {
  const path = 'experience';
  cachedExperiences = experiences;
  localStorage.setItem('aetheris_experiences', JSON.stringify(experiences));
  notifyCmsListeners();

  try {
    for (const exp of experiences) {
      await setDoc(doc(db, 'experience', exp.id), exp);
    }
  } catch (error) {
    console.warn('Firestore cloud write failed, using local caching:', error);
    const isSimulated = localStorage.getItem('aetheris_admin_session') === 'active';
    if (!auth.currentUser && isSimulated) {
      return;
    }
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const deleteExperienceFromFirebase = async (expId: string): Promise<void> => {
  const path = `experience/${expId}`;
  cachedExperiences = cachedExperiences.filter(e => e.id !== expId);
  localStorage.setItem('aetheris_experiences', JSON.stringify(cachedExperiences));
  notifyCmsListeners();

  try {
    await deleteDoc(doc(db, 'experience', expId));
  } catch (error) {
    console.warn('Firestore cloud deletion failed, local copy removed:', error);
    const isSimulated = localStorage.getItem('aetheris_admin_session') === 'active';
    if (!auth.currentUser && isSimulated) {
      return;
    }
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

export const saveSkills = async (skills: Skill[]): Promise<void> => {
  const path = 'skills';
  cachedSkills = skills;
  localStorage.setItem('aetheris_skills', JSON.stringify(skills));
  notifyCmsListeners();

  try {
    for (const skill of skills) {
      await setDoc(doc(db, 'skills', skill.id), skill);
    }
  } catch (error) {
    console.warn('Firestore cloud write failed, using local caching:', error);
    const isSimulated = localStorage.getItem('aetheris_admin_session') === 'active';
    if (!auth.currentUser && isSimulated) {
      return;
    }
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const deleteSkillFromFirebase = async (skillId: string): Promise<void> => {
  const path = `skills/${skillId}`;
  cachedSkills = cachedSkills.filter(s => s.id !== skillId);
  localStorage.setItem('aetheris_skills', JSON.stringify(cachedSkills));
  notifyCmsListeners();

  try {
    await deleteDoc(doc(db, 'skills', skillId));
  } catch (error) {
    console.warn('Firestore cloud deletion failed, local copy removed:', error);
    const isSimulated = localStorage.getItem('aetheris_admin_session') === 'active';
    if (!auth.currentUser && isSimulated) {
      return;
    }
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

export const saveHero = async (hero: HeroData): Promise<void> => {
  const path = 'cms/hero';
  cachedHero = hero;
  localStorage.setItem('aetheris_hero', JSON.stringify(hero));
  notifyCmsListeners();

  try {
    await setDoc(doc(db, 'cms', 'hero'), hero);
  } catch (error) {
    console.warn('Firestore cloud write failed, using local caching:', error);
    const isSimulated = localStorage.getItem('aetheris_admin_session') === 'active';
    if (!auth.currentUser && isSimulated) {
      return;
    }
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const saveBranding = async (branding: BrandingData): Promise<void> => {
  const path = 'cms/branding';
  cachedBranding = branding;
  localStorage.setItem('aetheris_branding', JSON.stringify(branding));
  notifyCmsListeners();

  try {
    await setDoc(doc(db, 'cms', 'branding'), branding);
  } catch (error) {
    console.warn('Firestore cloud write failed, using local caching:', error);
    const isSimulated = localStorage.getItem('aetheris_admin_session') === 'active';
    if (!auth.currentUser && isSimulated) {
      return;
    }
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

// ------------------------------------------------------------------------
// Contact Messages Operations
// ------------------------------------------------------------------------
export const saveContactMessage = async (msg: { 
  name: string; 
  email: string; 
  subject?: string; 
  message: string; 
}): Promise<string> => {
  const path = 'contactMessages';
  try {
    const id = `msg-${Date.now()}`;
    const data = {
      name: msg.name,
      email: msg.email,
      subject: msg.subject || 'Direct Inquiry',
      message: msg.message,
      createdAt: Timestamp.now(),
      read: false
    };
    await setDoc(doc(db, 'contactMessages', id), data);
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const deleteContactMessageFromFirebase = async (msgId: string): Promise<void> => {
  const path = `contactMessages/${msgId}`;
  try {
    await deleteDoc(doc(db, 'contactMessages', msgId));
    cachedContactMessages = cachedContactMessages.filter(m => m.id !== msgId);
    notifyCmsListeners();
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

export const markMessageReadInFirebase = async (msgId: string, read: boolean): Promise<void> => {
  const path = `contactMessages/${msgId}`;
  try {
    const targetRef = doc(db, 'contactMessages', msgId);
    await setDoc(targetRef, { read }, { merge: true });
    cachedContactMessages = cachedContactMessages.map(m => m.id === msgId ? { ...m, read } : m);
    notifyCmsListeners();
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

// ------------------------------------------------------------------------
// Auto-Seeding Database Bootstrap
// ------------------------------------------------------------------------
export const seedDatabaseIfNeeded = async (): Promise<boolean> => {
  try {
    // Check if projects exists in db
    const projQuery = await getDocs(collection(db, 'projects'));
    if (projQuery.empty) {
      console.log('Seeding initial projects pool to Firestore...');
      for (const p of INITIAL_PROJECTS) {
        await setDoc(doc(db, 'projects', p.id), p);
      }
    }

    // Check experience
    const expQuery = await getDocs(collection(db, 'experience'));
    if (expQuery.empty) {
      console.log('Seeding initial experiences to Firestore...');
      for (const e of INITIAL_EXPERIENCES) {
        await setDoc(doc(db, 'experience', e.id), e);
      }
    }

    // Check skills
    const skillQuery = await getDocs(collection(db, 'skills'));
    if (skillQuery.empty) {
      console.log('Seeding initial skills to Firestore...');
      for (const s of INITIAL_SKILLS) {
        await setDoc(doc(db, 'skills', s.id), s);
      }
    }

    // Check hero
    const heroSnap = await getDocs(collection(db, 'cms'));
    let hasHero = false;
    let hasBranding = false;
    heroSnap.forEach(snap => {
      if (snap.id === 'hero') hasHero = true;
      if (snap.id === 'branding') hasBranding = true;
    });

    if (!hasHero) {
      console.log('Seeding default hero data...');
      await setDoc(doc(db, 'cms', 'hero'), INITIAL_HERO);
    }
    if (!hasBranding) {
      console.log('Seeding default branding specifications...');
      await setDoc(doc(db, 'cms', 'branding'), INITIAL_BRANDING);
    }

    return true;
  } catch (err) {
    console.warn('Seeding skipped or lacked permissions: ', err);
    return false;
  }
};
