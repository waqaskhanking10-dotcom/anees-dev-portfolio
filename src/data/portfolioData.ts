import { Project, WorkExperience, Skill, HeroData, BrandingData } from '../types';

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

export const loadProjects = (): Project[] => {
  const data = localStorage.getItem('aetheris_projects');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing projects data', e);
    }
  }
  return INITIAL_PROJECTS;
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem('aetheris_projects', JSON.stringify(projects));
};

export const loadExperiences = (): WorkExperience[] => {
  const data = localStorage.getItem('aetheris_experiences');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing experiences data', e);
    }
  }
  return INITIAL_EXPERIENCES;
};

export const saveExperiences = (experiences: WorkExperience[]) => {
  localStorage.setItem('aetheris_experiences', JSON.stringify(experiences));
};

export const loadSkills = (): Skill[] => {
  const data = localStorage.getItem('aetheris_skills');
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing skills data', e);
    }
  }
  return INITIAL_SKILLS;
};

export const saveSkills = (skills: Skill[]) => {
  localStorage.setItem('aetheris_skills', JSON.stringify(skills));
};

export const INITIAL_HERO: HeroData = {
  profileImage: '/src/assets/images/profile_picture_1779447957937.png',
  name: 'Anees',
  title: 'Frontend Developer & AI Prompt Engineer',
  subtitle: 'Design & Frontend Engineering',
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

export const loadHero = (): HeroData => {
  const data = localStorage.getItem('aetheris_hero');
  if (data) {
    try {
      return { ...INITIAL_HERO, ...JSON.parse(data) };
    } catch (e) {
      console.error('Error parsing hero data', e);
    }
  }
  return INITIAL_HERO;
};

export const saveHero = (hero: HeroData) => {
  localStorage.setItem('aetheris_hero', JSON.stringify(hero));
};

export const loadBranding = (): BrandingData => {
  const data = localStorage.getItem('aetheris_branding');
  if (data) {
    try {
      return { ...INITIAL_BRANDING, ...JSON.parse(data) };
    } catch (e) {
      console.error('Error parsing branding data', e);
    }
  }
  return INITIAL_BRANDING;
};

export const saveBranding = (branding: BrandingData) => {
  localStorage.setItem('aetheris_branding', JSON.stringify(branding));
};

