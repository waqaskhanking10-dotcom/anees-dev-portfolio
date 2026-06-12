/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Github, Linkedin, ArrowRight, MessageSquare, ChevronDown, Monitor } from 'lucide-react';
import { loadHero } from '../data/portfolioData';
import { HeroData } from '../types';

export default function Hero() {
  const [hero, setHero] = useState<HeroData>(() => loadHero());

  useEffect(() => {
    const handleHeroUpdate = () => {
      setHero(loadHero());
    };
    window.addEventListener('aetheris_cms_updated', handleHeroUpdate);
    return () => {
      window.removeEventListener('aetheris_cms_updated', handleHeroUpdate);
    };
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  return (
    <section className="relative min-h-screen pt-36 pb-20 px-6 overflow-hidden flex flex-col justify-center items-center">
      {/* Absolute Ambient Background Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft glowing purple/blue/cyan background gradients */}
        <div className="absolute top-[8%] left-[15%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-purple-500/15 dark:bg-purple-600/15 blur-[80px] sm:blur-[140px]" />
        <div className="absolute bottom-[15%] right-[15%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-cyan-500/15 dark:bg-cyan-500/15 blur-[80px] sm:blur-[140px]" />
        <div className="absolute top-[40%] right-[30%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-blue-500/10 dark:bg-blue-650/10 blur-[80px] sm:blur-[120px]" />
        {/* Overlay grid lines */}
        <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark opacity-30 dark:opacity-50" />
        {/* Radial shield overlay to fade boundaries of grid */}
        <div className="absolute inset-0 bg-radial-gradient-light dark:bg-radial-gradient-dark" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Heading and action text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start gap-6 text-left order-2 lg:order-1"
        >
          {/* Availability Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/5 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-550/20 backdrop-blur-md font-mono"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Freelance Work</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-display"
          >
            <span className="dark:glow-text-purple transition-all duration-300">
              {hero.name}
            </span> <br />
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-text-fast">
              {hero.title}<br />
              <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-slate-800 dark:text-gray-300 dark:glow-text-cyan">{hero.subtitle}</span>
            </span>
          </motion.h1>

          {/* Subheading Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-slate-750 dark:text-gray-300 max-w-xl leading-relaxed font-light"
          >
            {hero.tagline}
          </motion.p>

          {/* Actions CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2"
          >
            <a
              href={hero.ctaLinkPrimary}
              className="relative group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-white bg-slate-950 dark:bg-white dark:text-slate-950 shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors">{hero.ctaTextPrimary}</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:text-white transition-colors" />
            </a>

            <a
              href={hero.ctaLinkSecondary}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-slate-900 dark:text-white bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-[1.03] glass-panel-custom cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{hero.ctaTextSecondary}</span>
            </a>
          </motion.div>

          {/* Social Icons Links row */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 pt-6 border-t border-slate-200 dark:border-white/10 w-full"
          >
            <span className="text-xs font-mono tracking-wider text-slate-400 uppercase font-bold">Connect:</span>
            <div className="flex items-center gap-3">
              {hero.githubUrl && (
                <a
                  href={hero.githubUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 hover:text-slate-950 dark:text-gray-400 dark:hover:text-white bg-white/50 dark:bg-white/2 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {hero.linkedinUrl && (
                <a
                  href={hero.linkedinUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 hover:text-slate-950 dark:text-gray-400 dark:hover:text-white bg-white/50 dark:bg-white/2 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {hero.fiverrUrl && (
                <a
                  href={hero.fiverrUrl}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 hover:text-slate-950 dark:text-gray-400 dark:hover:text-white bg-white/50 dark:bg-white/2 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-xs font-mono font-black"
                  title="Fiverr Portfolio"
                >
                  Fi.
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Premium Profile Portrait display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="lg:col-span-5 relative w-full flex items-center justify-center order-1 lg:order-2"
        >
          {/* Glow backdrop ring */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 opacity-20 dark:opacity-30 blur-3xl z-0 scale-95" />

          {/* Profile Picture Frame with circular layout */}
          <motion.div 
            animate={{ 
              y: [0, -10, 0] 
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full p-[3px] bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-400 shadow-2xl flex items-center justify-center overflow-hidden"
          >
            {/* Overlay grid lines/grows specifically inside the circle frame */}
            <div className="w-full h-full rounded-full bg-slate-100 dark:bg-[#0A0A0A] overflow-hidden relative group">
              <img 
                src={hero.profileImage}
                alt={`${hero.name} Professional Portrait`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay glass glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/15 via-transparent to-cyan-500/10 pointer-events-none" />
            </div>
          </motion.div>

          {/* Tiny companion chips floating around */}
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-10 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#0A0A0A]/70 shadow-lg backdrop-blur-md text-[10px] tracking-wider uppercase font-bold font-mono text-purple-600 dark:text-purple-400 whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3 text-purple-500" />
            <span>AI Orchestration</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#0A0A0A]/70 shadow-lg backdrop-blur-md text-[10px] tracking-wider uppercase font-bold font-mono text-cyan-600 dark:text-cyan-400 whitespace-nowrap"
          >
            <Monitor className="w-3 h-3 text-cyan-500" />
            <span>React Frontend</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant Scroll Down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 cursor-pointer select-none">
        <span className="text-[10px] uppercase font-mono tracking-widest">Explore</span>
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-purple-500" />
        </motion.div>
      </div>
    </section>
  );
}
