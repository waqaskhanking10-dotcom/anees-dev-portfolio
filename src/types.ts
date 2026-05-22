/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Feature {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: string; // Lucide icon name
  gradient: string; // Tailwind gradient classes
  metric: string; // e.g. "99.9%", "< 50ms"
  metricLabel: string;
}

export interface CompanyLogo {
  id: string;
  name: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  ctaText: string;
  popular: boolean;
  gradient: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  sparkline: number[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  summary: string;
  technologies: string[];
  category: 'Frontend' | 'AI Apps' | 'SaaS' | 'Dashboards' | 'Prompt Engineering' | 'UI Systems' | 'Automation';
  liveUrl: string;
  githubUrl: string;
  screenshots: string[]; // Fallback image URLs
  thumbnail: string; // Thumbnail color/gradient name or direct URL
  completionDate: string;
  status: 'Production Active' | 'Enterprise Beta' | 'Beta Lab' | 'Marketplace Live' | 'Active Live';
  featured: boolean;
  tags: string[];
  gradient: string;
  metrics: { label: string; value: string }[];
  client: string;
  performanceScore: number;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'AI' | 'Tools';
  proficiency: number; // 0 to 100
}

export interface HeroData {
  profileImage: string;
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  ctaTextPrimary: string;
  ctaLinkPrimary: string;
  ctaTextSecondary: string;
  ctaLinkSecondary: string;
  fiverrUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  bioText: string;
  experienceSummary: string;
  shortIntroduction: string;
}

export interface BrandingData {
  logoText: string;
  logoSubtext: string;
  logoImage?: string;
  siteName: string;
  themePreset?: 'dark' | 'light' | 'dual';
}


