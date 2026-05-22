/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Code2, Cpu, Database, Layout, Sparkles, Terminal, Zap } from 'lucide-react';

interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  metric: string;
  metricLabel: string;
}

const EXPERTISE_SERVICES: ExpertiseItem[] = [
  {
    id: 'exp-web',
    title: 'Modern React & Next.js Architectures',
    description: 'Engineering responsive, fluid, and pixel-perfect layouts using React, Next.js, and TypeScript. Fully optimized for high Core Web Vitals, optimal cumulative layout shifts, and modular reuse.',
    badge: 'Core Frontend',
    icon: Code2,
    metric: '99/100',
    metricLabel: 'Lighthouse Performance',
  },
  {
    id: 'exp-ai',
    title: 'AI Tooling & Prompt Engineering',
    description: 'Orchestrating state-of-the-art LLMs with secure server-side proxy routes. Integrating modern AI APIs like Gemini using structured output schemas, streaming token streams, and local embedding models.',
    badge: 'Neural Integration',
    icon: Cpu,
    metric: '< 14ms',
    metricLabel: 'Typical Routing Overhead',
  },
  {
    id: 'exp-state',
    title: 'Advanced State & Local Caching',
    description: 'Designing highly robust local storage persistence layers, React Redux/Zustand systems, and active cache synchronizers to support continuous, lag-free user experiences in all environments.',
    badge: 'Data Orchestration',
    icon: Database,
    metric: '100% Client',
    metricLabel: 'Offline-First Coherence',
  },
  {
    id: 'exp-cards',
    title: 'High-End Bento Grid & UI Kits',
    description: 'Crafting immersive visual dashboards inspired by Stripe, Vercel, and Linear. Utilizing rich aesthetic borders, glassmorphism overlays, and highly customizable UI cards.',
    badge: 'Crafted Design',
    icon: Layout,
    metric: '4K Ready',
    metricLabel: 'Fluid Density Scaling',
  },
  {
    id: 'exp-motion',
    title: 'Cinematic Motion & Micro-interactions',
    description: 'Adhering to Framer Motion principles to trigger elegant entrance transitions, gestural tracking, staggered grids, and smooth state transitions without causing component overhead or stutter.',
    badge: 'Intense Polish',
    icon: Zap,
    metric: '60 FPS',
    metricLabel: 'Silky Visual Feedback',
  },
  {
    id: 'exp-terminal',
    title: 'Secure Full-Stack & Secure CMS',
    description: 'Developing standalone Node/Express server gateways with robust JWT and cookie configurations. Creating responsive content management portals to enable real-time dynamic additions.',
    badge: 'Full-Stack Edge',
    icon: Terminal,
    metric: 'Zero-Config',
    metricLabel: 'Dynamic CMS Sync',
  },
];

export default function Features() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 120 },
    },
  };

  return (
    <section id="features" className="py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Decorative Elegant Blur Dot */}
      <div className="absolute top-[30%] right-[5%] w-[300px] h-[300px] rounded-full bg-purple-500/10 dark:bg-purple-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[250px] h-[250px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header Elements */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:bg-white/5 dark:text-purple-300 border border-purple-200/30 dark:border-white/10 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>Developer Core Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Aesthetic Visuals Paired With <br />
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Engineered Performance
            </span>
          </h2>
          <p className="text-base text-slate-600 dark:text-gray-400 leading-relaxed font-light">
            I build responsive web solutions with pristine visual structure, reliable state architectures, and dynamic integrations that give clients a reliable competitive advantage.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {EXPERTISE_SERVICES.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="group relative rounded-3xl bg-white/50 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm hover:shadow-xl p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-md overflow-hidden"
              >
                {/* Visual hover background accent gradient */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Card Top Block */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    {/* Icon container */}
                    <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200/50 dark:border-white/10 group-hover:scale-110 transition-transform duration-300 relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      <IconComponent className="w-5 h-5 text-slate-700 dark:text-gray-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors" />
                    </div>

                    {/* Feature Badge element */}
                    <span className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-500 dark:text-gray-400 px-2 py-0.5 rounded bg-slate-100/55 dark:bg-white/5 border border-slate-200/30 dark:border-white/5">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & description */}
                  <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white font-display">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom: Metric Showcase */}
                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase font-mono tracking-widest text-slate-400 dark:text-gray-500">
                      {item.metricLabel}
                    </span>
                    <span className="font-display font-extrabold text-lg bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
                      {item.metric}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
