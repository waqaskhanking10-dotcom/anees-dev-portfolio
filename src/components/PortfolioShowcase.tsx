/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, Sparkles, Filter, Plus, Edit2, Trash2, Eye, ExternalLink, 
  Github, Calendar, CheckCircle2, ChevronLeft, ChevronRight, X, Shuffle, 
  Settings, Lock, Key, Check, Info, AlertCircle, Play, Layers, Activity, 
  Shield, Network, Gauge, Terminal, ArrowUpRight, BarChart4, Cpu
} from 'lucide-react';
import { Project } from '../types';
import { loadProjects, saveProjects, INITIAL_PROJECTS } from '../data/portfolioData';

// --- ACTIVE MINI-SIMULATOR COMPONENTS FOR PREMIUM THEMES ---

function EdgeGuardianSimulator() {
  const [logs, setLogs] = useState<Array<{ id: number; text: string; type: 'pass' | 'blocked' | 'warning' }>>([
    { id: 1, text: 'SHIELD_ONLINE: Neural filters configured', type: 'pass' },
  ]);
  const [shieldActive, setShieldActive] = useState(true);
  const [stats, setStats] = useState({ audited: 124, blocked: 8 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const payloads = [
      { text: 'USER_INPUT: "Translate this file"', type: 'pass' },
      { text: 'SYSTEM_AUDIT: No toxic formats in payload', type: 'pass' },
      { text: 'INJECTION_DETECTED: "Ignore prior instructions"', type: 'blocked' },
      { text: 'PII_LEAK_ALERT: Detected Credit Card sequence', type: 'blocked' },
      { text: 'USER_INPUT: "Draft professional contract"', type: 'pass' },
      { text: 'CONTEXT_WARNING: Sequence approaching 4M limits', type: 'warning' },
      { text: 'PROMPT_SPOOF: Fake credentials audit', type: 'blocked' },
    ];

    const interval = setInterval(() => {
      if (!shieldActive) return;
      const index = Math.floor(Math.random() * payloads.length);
      const chosen = payloads[index];
      
      setLogs((prev) => {
        const next = [...prev, { id: Date.now(), ...chosen }].slice(-5);
        return next;
      });

      setStats((prev) => {
        if (chosen.type === 'blocked') {
          return { audited: prev.audited + 1, blocked: prev.blocked + 1 };
        }
        return { audited: prev.audited + 1, blocked: prev.blocked };
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [shieldActive]);

  return (
    <div className="bg-black/80 rounded-2xl p-4 font-mono text-[10px] text-gray-400 border border-white/10 h-48 flex flex-col justify-between overflow-hidden relative">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 shrink-0">
        <span className="flex items-center gap-1.5 text-pink-400 font-bold tracking-wider">
          <Shield className="w-3.5 h-3.5 animate-pulse" />
          EDGE_GUARDIAN_v2.0
        </span>
        <button 
          onClick={() => setShieldActive(!shieldActive)}
          className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wide font-bold transition-all ${
            shieldActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'
          }`}
        >
          {shieldActive ? 'SHIELD ACTIVE' : 'SHIELD MUTED'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 py-1 flex flex-col justify-end">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-1.5 leading-normal animate-slide-in">
            <span className={`shrink-0 font-bold ${
              log.type === 'blocked' ? 'text-red-500' : log.type === 'warning' ? 'text-amber-500' : 'text-emerald-500'
            }`}>
              {log.type === 'blocked' ? '[✗]' : log.type === 'warning' ? '[!]' : '[✓]'}
            </span>
            <span className="break-all">{log.text}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-2 mt-2 shrink-0 text-center">
        <div>
          <span className="block text-[8px] text-gray-500 uppercase tracking-widest">AUDITED</span>
          <span className="text-xs font-bold font-sans text-white">{stats.audited}</span>
        </div>
        <div>
          <span className="block text-[8px] text-gray-500 uppercase tracking-widest">BLOCKED</span>
          <span className="text-xs font-bold font-sans text-red-400">{stats.blocked}</span>
        </div>
      </div>
    </div>
  );
}

function VectorSharderSimulator() {
  const [shards, setShards] = useState([
    { name: 'Shard-Virginia', usage: 64, status: 'Active' },
    { name: 'Shard-Dublin', usage: 48, status: 'Active' },
    { name: 'Shard-Singapore', usage: 72, status: 'Active' },
  ]);
  const [pulse, setPulse] = useState(0);

  const handleManualRebalance = () => {
    setShards((prev) => prev.map(s => ({ ...s, usage: 35 + Math.floor(Math.random() * 45) })));
    setPulse((p) => p + 1);
  };

  return (
    <div className="bg-black/80 rounded-2xl p-4 font-mono text-[10px] text-gray-400 border border-white/10 h-48 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 shrink-0">
        <span className="flex items-center gap-1.5 text-purple-400 font-bold tracking-wider">
          <Network className="w-3.5 h-3.5" />
          NOVA_VECTOR_ROUTER
        </span>
        <button 
          onClick={handleManualRebalance}
          className="px-2 py-0.5 rounded text-[8px] uppercase tracking-wide bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:bg-purple-500/25 transition-all cursor-pointer"
        >
          REBALANCE
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-2.5 my-2">
        {shards.map((shard, idx) => (
          <div key={shard.name} className="space-y-1">
            <div className="flex justify-between text-[9px]">
              <span className="text-gray-300">{shard.name}</span>
              <span className="font-sans text-gray-400 font-semibold">{shard.usage}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden relative">
              <motion.div 
                className={`h-full bg-gradient-to-r from-purple-500 to-indigo-500`}
                initial={{ width: '0%' }}
                animate={{ width: `${shard.usage}%` }}
                transition={{ duration: 1 }}
              />
              {pulse > 0 && (
                <span className="absolute inset-0 bg-white/10 animate-ping pointer-events-none" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[8px] text-gray-500 border-t border-white/10 pt-2 shrink-0">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          DESIRED STATE SYNCED
        </span>
        <span>LATENCY: 0.02ms</span>
      </div>
    </div>
  );
}

function FlowDesignerSimulator() {
  const [activeNode, setActiveNode] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(true);

  const nodes = [
    { title: 'Prompt Ingestion', type: 'Ingest' },
    { title: 'Neural Shield', type: 'Guard' },
    { title: 'Dynamic Router', type: 'Route' },
    { title: 'Vector DB Sync', type: 'Persist' },
  ];

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="bg-black/80 rounded-2xl p-4 font-mono text-[10px] text-gray-400 border border-white/10 h-48 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 shrink-0">
        <span className="flex items-center gap-1.5 text-cyan-400 font-bold tracking-wider">
          <Terminal className="w-3.5 h-3.5" />
          FLOW_PIPELINE_SCHEL
        </span>
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className="text-[9px] text-cyan-300 p-0.5"
        >
          {isRunning ? 'PAUSE' : 'RUN'}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-2 my-2 items-center">
        {nodes.map((node, idx) => {
          const isNodeActive = activeNode === idx && isRunning;
          return (
            <div 
              key={node.title}
              className={`p-2 rounded-xl border text-[9px] transition-all relative ${
                isNodeActive 
                  ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10' 
                  : 'bg-white/5 border-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[7px] text-gray-500 uppercase">{node.type}</span>
                {isNodeActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                )}
              </div>
              <h5 className={`font-semibold mt-0.5 ${isNodeActive ? 'text-cyan-300' : 'text-gray-300'}`}>{node.title}</h5>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center text-[8px] text-gray-500 border-t border-white/10 pt-2 shrink-0">
        <span>STATUS: {isRunning ? 'EXECUTING PIPELINE' : 'HALTED'}</span>
        <span>AGENT EFFICIENCY: +340%</span>
      </div>
    </div>
  );
}

function ComplianceConsoleSimulator() {
  const [load, setLoad] = useState(50);
  const chartHeight = 50;
  const [points, setPoints] = useState<number[]>(Array(15).fill(25));

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => {
        const next = [...prev.slice(1)];
        const variation = (Math.random() - 0.5) * 15;
        const targetValue = Math.min(Math.max((load * 0.5) + variation, 10), 45);
        next.push(targetValue);
        return next;
      });
    }, 450);
    return () => clearInterval(interval);
  }, [load]);

  return (
    <div className="bg-black/80 rounded-2xl p-4 font-mono text-[10px] text-gray-400 border border-white/10 h-48 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 shrink-0">
        <span className="flex items-center gap-1.5 text-amber-500 font-bold tracking-wider">
          <Activity className="w-3.5 h-3.5 text-amber-500" />
          SPECTRA_TELE_LOAD
        </span>
        <span className="font-sans text-[9px] text-amber-400 font-bold">128 SHARDS ACTIVE</span>
      </div>

      {/* Mini graphical panel */}
      <div className="my-2 h-16 flex items-end gap-[3px] border-b border-white/5 pb-1 relative">
        <div className="absolute top-1 left-1 text-[8px] text-gray-600 font-mono tracking-wider">OVERHEAD LATENCY</div>
        {points.map((pt, index) => (
          <div 
            key={index} 
            className="flex-1 rounded-t-sm transition-all duration-300 bg-gradient-to-t from-amber-500/20 to-amber-500"
            style={{ height: `${pt}px` }}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-1 border-t border-white/10 pt-2 shrink-0">
        <div>
          <span className="block text-[7px] text-gray-500 uppercase">SIMULATE LOAD LIMIT</span>
          <input 
            type="range"
            min="10"
            max="100"
            value={load}
            onChange={(e) => setLoad(Number(e.target.value))}
            className="w-full h-1 mt-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
          />
        </div>
        <div className="text-right flex flex-col justify-center">
          <span className="block text-[7px] text-gray-500 uppercase">OVERHEAD</span>
          <span className="text-[11px] text-white font-bold">{Math.round(points[points.length - 1] * 0.42)} ms</span>
        </div>
      </div>
    </div>
  );
}

function DefaultFallbackSimulator({ gradient }: { gradient: string }) {
  return (
    <div className="bg-black/80 rounded-2xl p-4 font-mono text-[10px] text-gray-450 border border-white/10 h-48 flex flex-col justify-between overflow-hidden relative group/fb bg-radial">
      <div className={`absolute -inset-1 bg-gradient-to-tr ${gradient} opacity-5 blur-xl group-hover/fb:opacity-15 transition-opacity duration-500`} />
      <div className="flex items-center justify-between border-b border-white/10 pb-2 z-10">
        <span className="flex items-center gap-1 text-gray-300 font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          SYSTEM_NODE_REPRESENT
        </span>
        <span className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[8px]">ONLINE</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-2 text-center z-10">
        <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mb-1">
          <Cpu className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '12s' }} />
        </div>
        <p className="text-[9px] text-gray-500">Live dynamic simulation metrics executing under system parameters.</p>
      </div>
      <div className="flex justify-between items-center text-[7px] text-gray-600 border-t border-white/5 pt-2 z-10 uppercase font-bold text-center">
        <span>PERSISTENCE: LOCAL_STORE</span>
        <span>LATENCY: ZERO_OVERHEAD</span>
      </div>
    </div>
  );
}

// Map project id to specific interactive simulator widget
function renderLiveSimulator(projectId: string, gradient: string) {
  switch (projectId) {
    case 'edge-guardian':
      return <EdgeGuardianSimulator />;
    case 'vector-db-sharder':
      return <VectorSharderSimulator />;
    case 'flow-designer':
      return <FlowDesignerSimulator />;
    case 'compliance-console':
      return <ComplianceConsoleSimulator />;
    default:
      return <DefaultFallbackSimulator gradient={gradient} />;
  }
}

// --- MAIN PORTFOLIO COMPONENT ---

export default function PortfolioShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Admin and CMS states
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [adminAuthKey, setAdminAuthKey] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  // Project editor form state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formCategory, setFormCategory] = useState<'Frontend' | 'AI Apps' | 'SaaS' | 'Dashboards' | 'Prompt Engineering' | 'UI Systems' | 'Automation'>('AI Apps');
  const [formTechnologies, setFormTechnologies] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formLiveUrl, setFormLiveUrl] = useState('');
  const [formGithubUrl, setFormGithubUrl] = useState('');
  const [formGradient, setFormGradient] = useState('from-purple-500 to-indigo-600');
  const [formStatus, setFormStatus] = useState<'Production Active' | 'Enterprise Beta' | 'Beta Lab' | 'Marketplace Live' | 'Active Live'>('Production Active');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formClient, setFormClient] = useState('');
  const [formScore, setFormScore] = useState(98);
  const [formMetrics, setFormMetrics] = useState<Array<{ label: string; value: string }>>([
    { label: 'Latency Overhead', value: '12ms' },
    { label: 'Success Rate', value: '99%' }
  ]);

  // Image Presets Selector
  const [formThumbnail, setFormThumbnail] = useState('Default Dynamic Widget');

  // Interactive Toast state
  const [toasts, setToasts] = useState<Array<{ id: number; text: string; type: 'success' | 'indigo' | 'destroy' }>>([]);

  const addToast = (text: string, type: 'success' | 'indigo' | 'destroy' = 'success') => {
    setToasts((prev) => [...prev, { id: Date.now(), text, type }]);
  };

  useEffect(() => {
    setProjects(loadProjects());

    const handleStorageChange = () => {
      setProjects(loadProjects());
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('aetheris_cms_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('aetheris_cms_updated', handleStorageChange);
    };
  }, []);

  // Save projects safely on mutations
  const updateProjectsDatabase = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    saveProjects(updatedProjects);
  };

  // Synchronize dynamic filters and sorting
  useEffect(() => {
    if (projects.length === 0) return;

    let result = [...projects];

    // Filter projects by category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Sort projects
    if (sortBy === 'featured') {
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.performanceScore - a.performanceScore;
      });
    } else if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime());
    } else if (sortBy === 'performance') {
      result.sort((a, b) => b.performanceScore - a.performanceScore);
    }

    setFilteredProjects(result);
  }, [selectedCategory, sortBy, projects]);

  // Handle Admin Authorization
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminAuthKey.trim() === 'aetheris2026' || adminAuthKey.trim() === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
      addToast('Secure Dev Session Authenticated', 'indigo');
    } else {
      setAuthError('Unauthorized crypto key handshake failed.');
    }
  };

  // Open Editor for Creating a Project
  const handleOpenCreator = () => {
    setIsNewProject(true);
    setEditingProject(null);
    setFormTitle('');
    setFormDescription('');
    setFormSummary('');
    setFormCategory('AI Apps');
    setFormTechnologies('React, TypeScript, Tailwind');
    setFormTags('AI, Web, Live');
    setFormLiveUrl('#live');
    setFormGithubUrl('https://github.com/anees-creative-lab');
    setFormGradient('from-purple-500 to-indigo-600');
    setFormStatus('Production Active');
    setFormFeatured(false);
    setFormClient('Anees Creative Lab');
    setFormScore(98);
    setFormThumbnail('Default Dynamic Widget');
    setFormMetrics([
      { label: 'Latency Overhead', value: '12ms' },
      { label: 'Performance Score', value: '98%' }
    ]);
    setFormErrors({});
    setShowAdminPanel(true);
  };

  // Open Editor for Editing an Existing Project
  const handleOpenEditor = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsNewProject(false);
    setEditingProject(project);
    setFormTitle(project.title);
    setFormDescription(project.description);
    setFormSummary(project.summary);
    setFormCategory(project.category);
    setFormTechnologies(project.technologies.join(', '));
    setFormTags(project.tags.join(', '));
    setFormLiveUrl(project.liveUrl);
    setFormGithubUrl(project.githubUrl);
    setFormGradient(project.gradient);
    setFormStatus(project.status);
    setFormFeatured(project.featured);
    setFormClient(project.client);
    setFormScore(project.performanceScore);
    setFormThumbnail(project.thumbnail);
    setFormMetrics(project.metrics || [
      { label: 'Latency Overhead', value: '12ms' },
      { label: 'Performance Score', value: '98%' }
    ]);
    setFormErrors({});
    setShowAdminPanel(true);
  };

  // Form Field Validation & Save
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formTitle.trim()) errors.title = 'Project designation title required';
    if (!formDescription.trim()) errors.description = 'A short context parameters required';
    if (!formSummary.trim()) errors.summary = 'Complete cinematic summary parameters required';
    if (!formClient.trim()) errors.client = 'Client or Target context parameter required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      addToast('Save Rejected. Validate all metric entries.', 'destroy');
      return;
    }

    const compiledProject: Project = {
      id: isNewProject ? `usr-proj-${Date.now()}` : (editingProject?.id || ''),
      title: formTitle,
      description: formDescription,
      summary: formSummary,
      category: formCategory,
      technologies: formTechnologies.split(',').map(s => s.trim()).filter(Boolean),
      tags: formTags.split(',').map(s => s.trim()).filter(Boolean),
      liveUrl: formLiveUrl.trim() || '#',
      githubUrl: formGithubUrl.trim() || 'https://github.com/aetheris',
      gradient: formGradient,
      status: formStatus,
      featured: formFeatured,
      client: formClient,
      performanceScore: Number(formScore) || 98,
      thumbnail: formThumbnail,
      screenshots: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
      ],
      completionDate: new Date().toISOString().split('T')[0],
      metrics: formMetrics
    };

    let updatedList;
    if (isNewProject) {
      updatedList = [compiledProject, ...projects];
      addToast(`Core Shard Compiled: ${formTitle}`, 'success');
    } else {
      updatedList = projects.map(p => p.id === compiledProject.id ? compiledProject : p);
      addToast(`Shard Recalibrated: ${formTitle}`, 'success');
    }

    updateProjectsDatabase(updatedList);
    setShowAdminPanel(false);
  };

  // Clear or Restore Original Data Core Presets
  const handleRestorePresets = () => {
    if (confirm('Rebuild index defaults? This will override custom local edits.')) {
      updateProjectsDatabase(INITIAL_PROJECTS);
      addToast('Initial Preset Shards Restored', 'indigo');
    }
  };

  // Form Metric Handlers
  const handleMetricChange = (index: number, field: 'label' | 'value', val: string) => {
    setFormMetrics(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  // Delete Portfolio Shard
  const handleDeleteProject = (projectId: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Decompile portfolio project shard "${title}" permanently?`)) {
      const remaining = projects.filter(p => p.id !== projectId);
      updateProjectsDatabase(remaining);
      addToast(`Shutdown deployment shard: ${title}`, 'destroy');
      if (selectedProject?.id === projectId) setSelectedProject(null);
    }
  };

  // Track next-and-previous navigation indices inside overlay
  const handleNextProject = (currProject: Project) => {
    const idx = filteredProjects.findIndex(p => p.id === currProject.id);
    if (idx !== -1 && idx < filteredProjects.length - 1) {
      setSelectedProject(filteredProjects[idx + 1]);
    } else {
      setSelectedProject(filteredProjects[0]); // Wrap
    }
  };

  const handlePrevProject = (currProject: Project) => {
    const idx = filteredProjects.findIndex(p => p.id === currProject.id);
    if (idx !== -1 && idx > 0) {
      setSelectedProject(filteredProjects[idx - 1]);
    } else {
      setSelectedProject(filteredProjects[filteredProjects.length - 1]); // Wrap
    }
  };

  return (
    <section id="portfolio" className="py-24 px-6 relative overflow-hidden bg-transparent border-t border-slate-200/50 dark:border-white/10">
      {/* Dynamic Background visual vectors blobs */}
      <div className="absolute top-[10%] left-[80%] w-[380px] h-[380px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[85%] w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />

      {/* Embedded Toast List */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              onAnimationComplete={() => {
                setTimeout(() => {
                  setToasts((prev) => prev.filter((item) => item.id !== t.id));
                }, 3000);
              }}
              className={`pointer-events-auto px-4 py-3.5 rounded-xl border flex items-center gap-2.5 shadow-xl font-mono text-[11px] font-semibold tracking-wider ${
                t.type === 'success' 
                  ? 'bg-black text-emerald-400 border-emerald-500/20' 
                  : t.type === 'indigo'
                  ? 'bg-black text-purple-400 border-purple-500/20'
                  : 'bg-black text-rose-400 border-rose-500/20'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                t.type === 'success' 
                  ? 'bg-emerald-400 animate-pulse' 
                  : t.type === 'indigo' 
                  ? 'bg-purple-400 animate-pulse' 
                  : 'bg-rose-400'
              }`} />
              <span>{t.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:bg-white/5 dark:text-purple-400 border border-purple-200/30 dark:border-white/10 font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>QUALIFIED DEPLOYMENTS SHARDS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            The Autonomous Showcase Engine
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed font-light">
            Audit our dynamic high-contrast system architecture. This collection features real automated pipelines, custom cognitive modules, and elite UI workspaces compiled locally.
          </p>

          {/* Admin Toggle Panel */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`px-4 py-2 rounded-full border text-[11px] font-bold font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                isAdminMode 
                  ? 'bg-purple-600/10 text-purple-400 border-purple-500/30' 
                  : 'bg-transparent text-slate-400 hover:text-slate-900 dark:text-gray-500 dark:hover:text-white border-slate-200 dark:border-white/15'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminMode ? 'ACTIVE DEV MODE (🔐)' : 'DEVELOPER CMS PORTAL'}</span>
            </button>
            {isAdminMode && !isAuthenticated && (
              <form onSubmit={handleAdminAuth} className="flex items-center gap-1.5 animate-slide-in">
                <input 
                  type="password"
                  placeholder="Enter Dev Password..."
                  value={adminAuthKey}
                  onChange={(e) => setAdminAuthKey(e.target.value)}
                  className="bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-[10px] font-mono rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-purple-500"
                />
                <button type="submit" className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-500 flex items-center justify-center cursor-pointer">
                  <Key className="w-3 h-3" />
                </button>
              </form>
            )}
            {isAdminMode && isAuthenticated && (
              <div className="flex items-center gap-2 animate-slide-in font-mono text-[10px]">
                <button
                  onClick={handleOpenCreator}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  COMPILE SHARD
                </button>
                <button
                  onClick={handleRestorePresets}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white cursor-pointer"
                  title="Restore Defaults"
                >
                  <Shuffle className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    setIsAuthenticated(false);
                    setIsAdminMode(false);
                    addToast('Admin CMS Session Revoked', 'indigo');
                  }}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                  title="Sign Out"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          {authError && <p className="text-[10px] text-red-500 font-mono mt-1 select-none animate-pulse">{authError}</p>}
        </div>

        {/* Categories Filtering & Sorting Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-slate-200/50 dark:border-white/5 pb-6">
          
          {/* Categories Tab Pillboxes */}
          <div className="flex flex-wrap items-center gap-1.5 max-w-full overflow-x-auto justify-center md:justify-start">
            {['All', 'Frontend', 'AI Apps', 'SaaS', 'Dashboards', 'Prompt Engineering', 'UI Systems', 'Automation'].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-[11px] font-bold font-mono uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer ${
                    active 
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-black shadow-lg scale-102 font-heavy' 
                      : 'bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 dark:bg-transparent dark:hover:bg-white/5 dark:text-gray-450 dark:hover:text-white border border-slate-100 dark:border-transparent'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sorter pillboxes */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] uppercase font-bold font-mono text-slate-400 dark:text-gray-500 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              SORT ARCHITECTURE:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono border border-slate-300 dark:border-white/20 px-3.5 py-1.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer shadow-sm hover:border-slate-400 dark:hover:border-white/30 transition-colors"
            >
              <option value="featured" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Featured First</option>
              <option value="latest" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Latest Milestone</option>
              <option value="performance" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">Highest Performance</option>
            </select>
          </div>
        </div>

        {/* Dynamic Showcase GRID (Bento grid inspiration) */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white/40 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-3xl p-16 text-center max-w-lg mx-auto backdrop-blur-md">
            <AlertCircle className="w-8 h-8 text-purple-400 mx-auto mb-3 animate-bounce" />
            <h4 className="font-bold text-slate-800 dark:text-white font-display mb-1">Deployment index empty</h4>
            <p className="text-xs text-slate-550 dark:text-gray-400">There are no compiled project shards matching "{selectedCategory}" criteria. Switch active filters or add custom CMS deployments.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch"
          >
            {filteredProjects.map((project, index) => {
              // Create bento span dynamics based on indexes
              const isLargeCard = index === 0 || (index === 3 && filteredProjects.length > 4);
              const gridSpan = isLargeCard 
                ? 'lg:col-span-8' 
                : 'lg:col-span-4';

              const isHovered = hoveredProjectId === project.id;

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => setSelectedProject(project)}
                  className={`bg-white/60 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 backdrop-blur-md p-6 rounded-3xl flex flex-col justify-between overflow-hidden relative group/proj transition-all duration-500 hover:shadow-2xl cursor-pointer ${
                    project.featured ? 'border-purple-500/20' : ''
                  } ${gridSpan}`}
                >
                  
                  {/* Subtle Glowing Radial Mouse Spotlight background shadow effect */}
                  <div className={`absolute inset-0 bg-radial transition-opacity duration-700 pointer-events-none ${
                    isHovered ? 'bg-gradient-to-tr opacity-10' : 'opacity-0'
                  } ${project.gradient}`} />

                  {/* Aesthetic project header */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4 z-10 relative">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${
                          project.status.includes('Active') || project.status.includes('Live')
                            ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20'
                            : 'bg-purple-500/5 text-purple-400 border-purple-500/20'
                        }`}>
                          {project.status}
                        </span>
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 text-[8px] font-mono tracking-widest font-bold text-amber-500 uppercase">
                            <Sparkles className="w-2.5 h-2.5 fill-amber-500" />
                            FEATURED
                          </span>
                        )}
                      </div>
                      
                      {/* Admin Editor Buttons floating overlay */}
                      {isAdminMode && isAuthenticated && (
                        <div className="flex items-center gap-1.5 z-20">
                          <button
                            onClick={(e) => handleOpenEditor(project, e)}
                            className="p-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-white border border-purple-500/20 transition-all cursor-pointer"
                            title="Edit metrics"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteProject(project.id, project.title, e)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-all cursor-pointer"
                            title="Shutdown deployment"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display mt-2 group-hover/proj:text-purple-400 transition-colors flex items-center gap-2">
                      {project.title}
                      <span className="text-[9px] font-mono text-slate-400 dark:text-gray-500 border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded font-normal shrink-0">
                        v2.4.1
                      </span>
                    </h3>
                    
                    <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-light mt-2 max-w-xl">
                      {project.description}
                    </p>

                    {/* Client & SLA Metadata Block */}
                    <div className="grid grid-cols-2 gap-2 mt-4 mb-2 p-3 rounded-2xl bg-slate-50/50 dark:bg-white/2 border border-slate-200/50 dark:border-white/5 z-10 relative">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[7.5px] font-mono uppercase tracking-widest text-slate-400 dark:text-gray-500">Client Partner</span>
                        <span className="text-[10px] font-mono text-slate-700 dark:text-gray-300 font-semibold truncate">
                          {project.client}
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[7.5px] font-mono uppercase tracking-widest text-slate-400 dark:text-gray-500">Quality Benchmark</span>
                        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {project.performanceScore}% Core Score
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Screenshot Showcase with elegant zoom effect */}
                  <div className="my-5 z-10 relative rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 bg-slate-100 dark:bg-black/40 h-48 sm:h-52 group/img cursor-pointer">
                    {project.screenshots && project.screenshots[0] ? (
                      <img 
                        src={project.screenshots[0]} 
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/proj:scale-[1.04]"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-tr ${project.gradient || 'from-purple-600 to-indigo-600'} flex items-center justify-center`}>
                        <span className="text-white text-[10px] font-mono font-semibold opacity-40">System Core Layout Specifications</span>
                      </div>
                    )}
                    {/* Dark gradient shadow overlay */}
                    <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    
                    {/* Bottom overlay status */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-mono font-bold uppercase text-white tracking-widest">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Metric Row Footer */}
                  <div className="border-t border-slate-100 dark:border-white/5 pt-4 z-10 relative">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {project.technologies.slice(0, isLargeCard ? 5 : 3).map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 text-[9px] text-slate-600 dark:text-gray-400 font-mono tracking-wide"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > (isLargeCard ? 5 : 3) && (
                          <span className="text-[9px] font-mono text-gray-500 hover:underline">
                            +{project.technologies.length - (isLargeCard ? 5 : 3)} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-purple-500 uppercase tracking-widest leading-none group-hover/proj:translate-x-1.5 transition-transform">
                        <span>VIEW ARCHITECTURE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>

      {/* --- CINEMATIC PROJECT EXPANSION MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-slate-900/60 dark:bg-[#060606] border border-white/10 rounded-3xl w-full max-w-6xl overflow-hidden relative z-50 flex flex-col md:flex-row items-stretch"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Segment: Project Image Showcase & Mockup Frame */}
              <div className="w-full md:w-1/2 bg-black/40 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
                <div className={`absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br ${selectedProject.gradient} opacity-5 blur-3xl pointer-events-none`} />
                
                {/* Meta details */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0 z-10 relative">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      ID: {selectedProject.id.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">
                      LAUNCH: {selectedProject.completionDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wide">SHIPPED TO PRODUCTION</span>
                  </div>
                </div>

                {/* Primary visual area: displays high-fidelity browser viewport frame enclosing screenshot */}
                <div className="flex-1 flex flex-col justify-center my-6 z-10 relative">
                  <div className="w-full rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#0F0F0F] relative flex flex-col">
                    {/* Browser Header Bar */}
                    <div className="bg-[#1A1A1A] px-4 py-3 border-b border-white/5 flex items-center gap-2 shrink-0">
                      {/* Window Controls */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/85" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/85" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/85" />
                      </div>
                      {/* Browser Address Bar */}
                      <div className="flex-1 max-w-sm mx-auto bg-black/40 rounded-lg py-1 px-3 text-[9px] font-mono text-gray-400 truncate text-center border border-white/5">
                        aneescreativelab.dev/showcase/{selectedProject.id}
                      </div>
                    </div>
                    {/* Browser Viewport content */}
                    <div className="relative h-60 sm:h-72 w-full overflow-hidden">
                      {selectedProject.screenshots && selectedProject.screenshots[0] ? (
                        <img 
                          src={selectedProject.screenshots[0]} 
                          alt={selectedProject.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-tr ${selectedProject.gradient} flex items-center justify-center p-6 text-center`}>
                          <span className="text-white text-xs font-mono font-medium opacity-50">Visual Assets Specifications Loaded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Performance HUD Indicators */}
                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4 mt-4 shrink-0 text-center select-none z-10 relative">
                  <div>
                    <span className="block text-[8px] text-gray-500 uppercase tracking-wider font-mono">PRIMARY_VAL</span>
                    <span className="text-sm font-bold font-sans text-white">
                      {selectedProject.metrics?.[0]?.value || '100% OK'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-gray-500 uppercase tracking-wider font-mono">BENCH_MARK</span>
                    <span className="text-sm font-bold font-sans text-purple-400">
                      {selectedProject.performanceScore}%
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-gray-500 uppercase tracking-wider font-mono">DEPLOY_STATE</span>
                    <span className="text-xs font-bold font-mono text-emerald-400 uppercase">
                      {selectedProject.status.split(' ')[0]}
                    </span>
                  </div>
                </div>

              </div>

              {/* Right Segment: Descriptions and Metrics parameters */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
                
                {/* Header elements with exit button */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold font-mono text-purple-500 uppercase tracking-widest">
                        {selectedProject.category}
                      </span>
                      <span className="text-[10px] text-gray-500">•</span>
                      <span className="text-[10px] font-mono text-gray-400">
                        CLIENT: {selectedProject.client}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Long Form Summary description parameters */}
                <div className="my-8 space-y-4">
                  <div>
                    <span className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                      INTEGRATED DESCRIPTION STATE:
                    </span>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                      {selectedProject.summary}
                    </p>
                  </div>

                  <div>
                    <span className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest mb-2">
                      INCLUDED MODULES:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {selectedProject.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 rounded-xl bg-white/5 border border-white/5 text-[10px] text-gray-300 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Core Metrics Cards listed in DB */}
                  <div>
                    <span className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest mb-2">
                      QUALIFIED MEASURED RUNS:
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProject.metrics?.map((metric, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between min-h-[64px]">
                          <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider">{metric.label}</span>
                          <span className="text-sm font-extrabold text-white mt-1">{metric.value}</span>
                        </div>
                      )) || (
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-3 text-center col-span-2 text-gray-400 text-[10px] font-mono">
                          NO SHARD METRICS REGISTERED
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interactive Anchor triggers & Slider carousel index controllers */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-white/10 shrink-0">
                  <div className="flex items-center gap-2">
                    <a
                      href={selectedProject.liveUrl}
                      className="px-4 py-2.5 rounded-xl bg-white text-black hover:bg-gray-100 text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      LIVE EXPERIMENT
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold font-mono tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      SOURCE REPO
                    </a>
                  </div>

                  {/* Navigation toggle */}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handlePrevProject(selectedProject)}
                      className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                      title="Previous Deployment Unit"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[10px] font-mono text-gray-500 uppercase select-none font-bold">
                      SHARDS NAV
                    </span>
                    <button
                      onClick={() => handleNextProject(selectedProject)}
                      className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
                      title="Next Deployment Unit"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CMS PORTAL MODAL SHEET / DRAWER PANEL --- */}
      <AnimatePresence>
        {showAdminPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-end"
            onClick={() => setShowAdminPanel(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="bg-slate-900 border-l border-white/10 w-full max-w-xl h-full flex flex-col justify-between overflow-y-auto relative p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Drawer Title & Close Button */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 shrink-0">
                <div>
                  <h4 className="text-lg font-bold text-white font-display flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
                    {isNewProject ? 'COGNITIVE SHARD BUILDER' : 'RECALIBRATING PORTFOLIO DEPLOYMENT'}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">ANEES CREATIVE LAB DRAFTING PROTOCOL</p>
                </div>
                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Input parameters */}
              <form onSubmit={handleSaveProject} className="flex-1 space-y-5 pr-1 py-1">
                
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                    Project Title / Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Anees Compiler Node"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  {formErrors.title && <p className="text-[10px] text-red-500 font-mono">{formErrors.title}</p>}
                </div>

                {/* Decription */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                    Short Context Parameters (Visible inside Card Index)
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="e.g. Sub-14ms neural firewall auditing prompts, shielding injections..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                  {formErrors.description && <p className="text-[10px] text-red-500 font-mono">{formErrors.description}</p>}
                </div>

                {/* Complete long Summary */}
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                    Milestone Overview Document (Fullscreen Narrative)
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    placeholder="Provides a detailed context of the system layout architecture..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  {formErrors.summary && <p className="text-[10px] text-red-500 font-mono">{formErrors.summary}</p>}
                </div>

                {/* Three row layout: Category, Status, Score */}
                <div className="grid grid-cols-3 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-2 py-3 text-[10px] text-white focus:outline-none"
                    >
                      {['Frontend', 'AI Apps', 'SaaS', 'Dashboards', 'Prompt Engineering', 'UI Systems', 'Automation'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                      Runtime Status
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-2 py-3 text-[10px] text-white focus:outline-none"
                    >
                      {['Production Active', 'Enterprise Beta', 'Beta Lab', 'Marketplace Live', 'Active Live'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                      Inference Score
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={formScore}
                      onChange={(e) => setFormScore(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Target Grafts client & Gradient Accent Color selector */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                      Client / Organization Target
                    </label>
                    <input
                      type="text"
                      required
                      value={formClient}
                      onChange={(e) => setFormClient(e.target.value)}
                      placeholder="e.g. Stripe Integration hub"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                    {formErrors.client && <p className="text-[10px] text-red-500 font-mono">{formErrors.client}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                      Accent Gradient Mesh
                    </label>
                    <select
                      value={formGradient}
                      onChange={(e) => setFormGradient(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-2.5 py-3 text-[10px] text-white focus:outline-none"
                    >
                      <option value="from-pink-500 to-rose-600">Rose Edge (Pink-Rose)</option>
                      <option value="from-purple-500 to-indigo-600">Ethereal cluster (Purple-Indigo)</option>
                      <option value="from-cyan-500 to-blue-600">Deep Ocean (Cyan-Blue)</option>
                      <option value="from-amber-400 to-orange-500">Volcanic Fusion (Amber-Orange)</option>
                      <option value="from-emerald-400 to-teal-500">Green Matrix (Emerald-Teal)</option>
                    </select>
                  </div>
                </div>

                {/* Modules & Tags */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                      Technological Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formTechnologies}
                      onChange={(e) => setFormTechnologies(e.target.value)}
                      placeholder="React, CSS, Node"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                      Tags Descriptor (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="AI, Server"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Interactive Anchor Hyperlinks endpoints */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                      Experiment deployment live URL
                    </label>
                    <input
                      type="text"
                      value={formLiveUrl}
                      onChange={(e) => setFormLiveUrl(e.target.value)}
                      placeholder="#live"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-bold font-mono text-gray-400 uppercase tracking-widest">
                      GitHub repository source URL
                    </label>
                    <input
                      type="text"
                      value={formGithubUrl}
                      onChange={(e) => setFormGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Featured project toggler */}
                <div className="flex items-center gap-3.5 bg-white/5 border border-white/5 p-4 rounded-xl select-none">
                  <input
                    type="checkbox"
                    id="feat-proj"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 bg-black border-white/10 rounded cursor-pointer"
                  />
                  <label htmlFor="feat-proj" className="text-xs text-gray-300 font-mono uppercase tracking-wide cursor-pointer flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    Inject into High Priority Featured Columns Grid?
                  </label>
                </div>

                {/* Performance HUD metrics editing parameters */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-lg">
                    <span className="text-[10px] font-bold font-mono text-gray-400 uppercase">RUN TIME HUD METRICS PARAMETERS</span>
                    <span className="text-[8px] font-mono text-purple-400">DOUBLE ENTRY VALUE</span>
                  </div>
                  
                  {formMetrics.map((met, idx) => (
                    <div key={idx} className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={met.label}
                        onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                        placeholder="e.g. Latency Level"
                        className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={met.value}
                        onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                        placeholder="e.g. 11.4 ms"
                        className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  ))}
                </div>

                {/* CTA Action Bar inside drawers */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowAdminPanel(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider bg-white/5 text-gray-400 hover:text-white border border-white/10 cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider bg-purple-600 text-white hover:bg-purple-500 shadow-xl flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    PUBLISH DESIGNATION
                  </button>
                </div>

              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
