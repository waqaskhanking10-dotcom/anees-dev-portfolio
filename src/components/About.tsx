import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Sparkles, Award, ShieldCheck, Cpu } from 'lucide-react';
import { loadHero } from '../data/portfolioData';
import { HeroData } from '../types';

export default function About() {
  const [hero, setHero] = useState<HeroData>(() => loadHero());

  useEffect(() => {
    const handleUpdate = () => {
      setHero(loadHero());
    };
    window.addEventListener('aetheris_cms_updated', handleUpdate);
    return () => {
      window.removeEventListener('aetheris_cms_updated', handleUpdate);
    };
  }, []);

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden bg-transparent border-t border-slate-200/45 dark:border-white/5">
      {/* Glow backgrounds */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[60%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Bento-Card Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-white/40 dark:bg-white/2 border border-slate-200/50 dark:border-white/5 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-bl-full" />
              <Cpu className="w-8 h-8 text-purple-500 mb-4" />
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">99%</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">Core Performance</div>
            </div>

            <div className="p-6 rounded-3xl bg-white/40 dark:bg-white/2 border border-slate-200/50 dark:border-white/5 backdrop-blur-md relative overflow-hidden mt-6 group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-bl-full" />
              <ShieldCheck className="w-8 h-8 text-cyan-500 mb-4" />
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">Secured</div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-1">Audit Safeguarded</div>
            </div>

            <div className="p-6 rounded-3xl bg-white/40 dark:bg-white/2 border border-slate-200/50 dark:border-white/5 backdrop-blur-md relative overflow-hidden group col-span-2">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-bl-full" />
              <Award className="w-8 h-8 text-blue-500 mb-3" />
              <div className="text-xs font-mono font-bold text-slate-500 dark:text-gray-400 tracking-wide uppercase">CMS Control Node</div>
              <p className="text-xs text-slate-600 dark:text-gray-350 leading-relaxed font-light mt-1.5">
                Every paragraph, image, name, title, badge, link, and portfolio metric is fully driven by live local-storage state structures.
              </p>
            </div>
          </div>

          {/* Right Text Editorial & Bio Fields */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:bg-white/5 dark:text-purple-400 border border-purple-200/30 dark:border-white/10 font-mono w-fit">
              <User className="w-3.5 h-3.5" />
              <span>BIOGRAPHY & OUTLOOK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
              {hero.shortIntroduction || "Designing Next-Generation User Paths"}
            </h2>

            <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />

            <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              {hero.bioText || "A passionate Frontend Architect designing optimized telemetry screens, responsive control panels, and highly interactive software setups for clients worldwide."}
            </p>

            <div className="p-6 rounded-2xl bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 font-mono text-xs text-slate-600 dark:text-gray-400 mt-2">
              <span className="text-purple-600 dark:text-purple-400 font-bold block mb-1">STATION DIRECTIVE:</span>
              {hero.experienceSummary || "Coordinating sub-millisecond edge routines and publishing lightweight content engines designed to persist and stream in container runtimes."}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
