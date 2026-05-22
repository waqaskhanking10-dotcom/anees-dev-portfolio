/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Feature, CompanyLogo, PricingPlan, Testimonial, FAQItem, ChatMessage, DashboardMetric } from '../types';

export const COMPANYS: CompanyLogo[] = [
  { id: '1', name: 'Stripe' },
  { id: '2', name: 'Linear' },
  { id: '3', name: 'OpenAI' },
  { id: '4', name: 'Vercel' },
  { id: '5', name: 'Retool' },
  { id: '6', name: 'Figma' },
  { id: '7', name: 'Supabase' },
  { id: '8', name: 'Railway' },
];

export const FEATURES: Feature[] = [
  {
    id: 'f1',
    title: 'Cognitive Workflow Automation',
    description: 'Anees Creative Lab automates deep multi-hop workflows, resolving logic branching and adapting schedules based on visual and conversational inputs.',
    badge: 'Core Engine',
    icon: 'Brain',
    gradient: 'from-purple-500 via-indigo-500 to-blue-500',
    metric: '92%',
    metricLabel: 'Efficiency Boost',
  },
  {
    id: 'f2',
    title: 'Sub-Millisecond Telemetry',
    description: 'Track model latency, system context length usage, token costs, and API state structures in real-time across multiple globally deployed nodes.',
    badge: 'Real-time Analytics',
    icon: 'Activity',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    metric: '< 14ms',
    metricLabel: 'Edge Propagation',
  },
  {
    id: 'f3',
    title: 'Neural Security Guards',
    description: 'Enterprise grade guardrails filtering prompt injection, toxic formats, PII leakage, and context manipulations automatically before hitting LLMs.',
    badge: 'Compliance',
    icon: 'ShieldCheck',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    metric: '99.99%',
    metricLabel: 'Attack Mitigation',
  },
  {
    id: 'f4',
    title: 'Multi-Model Routing Core',
    description: 'Smart routing system that picks the highest accuracy and lowest cost LLM dynamically for each prompt, reducing operating expenses instantly.',
    badge: 'Dynamic Routing',
    icon: 'GitBranch',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    metric: '42%',
    metricLabel: 'Cost Reduction',
  },
  {
    id: 'f5',
    title: 'Autonomous Database Sync',
    description: 'Integrate existing vector databases, relational schemas, or document streams. Core embeddings are synced on every mutation automatically.',
    badge: 'Integration',
    icon: 'Database',
    gradient: 'from-teal-500 via-emerald-500 to-green-500',
    metric: '0-Config',
    metricLabel: 'Database Pipeline',
  },
  {
    id: 'f6',
    title: 'Distributed Vector Memory',
    description: 'Our proprietary long-term contextual memory keeps agent parameters persistent, enabling personalized and coherent experiences across months.',
    badge: 'Session Persistence',
    icon: 'Zap',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    metric: '4M+ Tokens',
    metricLabel: 'Active Context',
  },
];

export const METRICS: DashboardMetric[] = [
  {
    title: 'Total AI Workflows executed',
    value: '4,821,940',
    change: '+24.6%',
    isPositive: true,
    sparkline: [30, 40, 35, 50, 49, 60, 70, 91, 85, 95, 110, 125],
  },
  {
    title: 'Average Latency Over Nodes',
    value: '48.2 ms',
    change: '-12.4%',
    isPositive: true, // Decreasing latency is positive
    sparkline: [95, 88, 80, 75, 76, 60, 55, 50, 52, 48, 49, 48],
  },
  {
    title: 'API Cost (Token Optimized)',
    value: '$1,208.54',
    change: '-38.2%',
    isPositive: true, // Cost reduction is positive
    sparkline: [220, 210, 195, 170, 160, 145, 140, 132, 128, 122, 121, 120],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'p1',
    name: 'Starter',
    description: 'Perfect for local agent prototyping and standard API proxying during early stage development.',
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      'Up to 100,000 monthly target routing runs',
      'Integration for 2 data streams',
      'Standard model routing (3 popular models)',
      'Community analytics & dashboard',
      'Standard 48-hour response support',
    ],
    ctaText: 'Start Building Free',
    popular: false,
    gradient: 'from-slate-700 to-slate-900',
  },
  {
    id: 'p2',
    name: 'Growth Pro',
    description: 'For scaling projects requiring real-time compliance shields, multi-agent vector memory sync, and telemetry.',
    priceMonthly: 79,
    priceYearly: 65,
    features: [
      'Unlimited custom routing pipelines',
      'Neural compliance shields active',
      'Multi-model fallback & cost routing optimization',
      'Long-term distributed vector memory sync',
      'Real-time sub-millisecond telemetry board',
      'Priority Slack & Email support (Under 2 hrs)',
    ],
    ctaText: 'Access Professional Suite',
    popular: true,
    gradient: 'from-purple-600 via-indigo-600 to-blue-600',
  },
  {
    id: 'p3',
    name: 'Enterprise Core',
    description: 'Tailored for regulated compliance levels, dedicated tenant clusters, custom models, and specialized SLA guarantees.',
    priceMonthly: 299,
    priceYearly: 249,
    features: [
      'Dedicated multi-region hosting clusters',
      'Custom fine-tuning & specialized weights sync',
      'SOC-2, HIPAA Compliance ready firewalls',
      'Sub-14ms custom routing SLAs',
      '24/7/365 Dedicated Solutions Architect',
      'Custom billing and volume discounts',
    ],
    ctaText: 'Initiate Enterprise Demo',
    popular: false,
    gradient: 'from-blue-600 to-cyan-500',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus Vance',
    role: 'VP of Engineering',
    company: 'Stripe Scaling Division',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    content: 'Migrating our distributed agent pipelines to Anees Creative Lab was an absolute turning point. Our dynamic cost optimization routes sliced over $110,000 off our monthly GPT-4 operations while trimming latency parameters by almost 55%.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Elena Rostova',
    role: 'Principal Agent Architect',
    company: 'Linear Ecosystems',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    content: 'The user experience of the telemetry dashboard and the seamless multi-model routing represents visual and structural gold. Our teams now ship autonomous logic modules with total confidence in our vector memories.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Kenji Takahashi',
    role: 'Director of AI Safety',
    company: 'Supabase Inc.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    content: 'The neural compliance shield alone saved us twice. Prompt injection attempts are caught and neutralised dynamically. If you are operating multi-agent suites in production, Anees Creative Lab is not optional: it is base level.',
    rating: 5,
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How does Anees Creative Lab dynamically optimize routing costs and latency?',
    answer: 'Anees Creative Lab operates a real-time weight classifier at our CDN edge. When a prompt is submitted, the cognitive parser analyzes system requirements (e.g. strict JSON schema, deep translation context, code generation vs basic greeting). It then maps coordinates to the most cost-effective LLM that satisfies the capability limits, falling back automatically if timeout limits are crossed.',
  },
  {
    id: 'faq2',
    question: 'Is my data stored or accessible to training arrays?',
    answer: 'Absolutely not. All Anees Creative Lab workflows adhere strictly to SOC-2 and EU data firewalls. Prompts, contexts, or embeddings routed through our architecture are processed in-memory under isolated tenants. We do not persist, read, or pass any dataset to model training engines. Your weights and contexts remain solely yours.',
  },
  {
    id: 'faq3',
    question: 'Can I integrate self-hosted or open-source models inside the dashboard?',
    answer: 'Yes! Anees Creative Lab is fully model-agnostic. Inside the routing panel, you can configure secure custom HTTP/gRPC endpoints (such as vLLM, Ollama, HuggingFace servers, or Amazon Bedrock clusters) with custom API headers. The telemetry graphs and compliance shields will immediately apply to those streams standardly.',
  },
  {
    id: 'faq4',
    question: 'What is the implementation overhead for existing applications?',
    answer: 'Minimal. Our TypeScript and Python SDKs are designed with "drop-in replacement" capabilities. By mutating your model endpoint path to our edge gateway URL, you gain fully functional compliance shielding, routing optimization, and telemetry capture within 4 lines of config adjustments.',
  },
  {
    id: 'faq5',
    question: 'How do standard vector memory persistent syncing layers operate?',
    answer: 'Anees Creative Lab implements long-term session persistence using global state snapshots. When an agent updates its local memory parameters, our background synchronization workers write embeddings to distributed vector partitions. This allows agents to seamlessly resume context lengths on standard connection restarts.',
  },
];

// High fidelity preset conversation flow to showcase UI capabilities
export const CHAT_BOT_FLOW = {
  initial: 'Greetings! I am the Anees Creative Lab Core Intelligence suite. I supervise active telemetry flows, agent vector memories, and multi-model dynamic routing pipelines. What system metrics should we prioritize exploring?',
  options: [
    { key: 'latency', label: 'Explain Telemetry Latency optimization', response: 'Our Edge Propagation latency measures <14ms. By utilizing decentralized gateway clusters, routing metadata is calculated during stream handshakes. This prevents traditional middleware overhead, streamlining prompt delivery routes.' },
    { key: 'shield', label: 'How does the Neural Guard work?', response: 'The Neural Compliance Shield processes visual inputs and text characters through an isolated vector classifier. It blocks prompt injection patterns, PII leakage, or unsafe responses. The system updates the firewall metrics on your dashboard in real-time.' },
    { key: 'pricing', label: 'Suggest appropriate subscription plan', response: 'If you are building prototype agents, the Free tier is fully complete. For active systems with custom compliance bounds and telemetry needs, our Growth Pro ($79/mo) plan represents the optimal balance, saving teams ~40% in cost.' },
    { key: 'demo', label: 'Trigger automated performance audit', response: 'Initiating system diagnostics... [SUCCESS] Core Routing optimized: Latency reduced by 12.4%, model security guard state is 100% SECURE, database embeddings are fully synchronized.' }
  ]
};
