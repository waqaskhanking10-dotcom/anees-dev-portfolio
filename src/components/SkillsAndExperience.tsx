import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, ChevronRight, Award, Trophy, Cpu, Hammer, Zap, BadgeCheck } from 'lucide-react';
import { loadExperiences, loadSkills } from '../data/portfolioData';
import { WorkExperience, Skill } from '../types';

export default function SkillsAndExperience() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Frontend' | 'AI' | 'Tools'>('All');

  useEffect(() => {
    // Load from local storage / Initial Mock Data
    setExperiences(loadExperiences());
    setSkills(loadSkills());

    // Listen to storage update events for immediate CMS reflection!
    const handleStorageChange = () => {
      setExperiences(loadExperiences());
      setSkills(loadSkills());
    };
    window.addEventListener('storage', handleStorageChange);
    // Custom trigger dispatcher inside same window tab
    window.addEventListener('aetheris_cms_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('aetheris_cms_updated', handleStorageChange);
    };
  }, []);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === 'All' || skill.category === activeCategory
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Visual Ambient Fog Backgrounds */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT PANEL: EXPERIENCE TIMELINE (7 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:bg-white/5 dark:text-purple-400 border border-purple-200/30 dark:border-white/10 font-mono mb-4">
                <Briefcase className="w-3.5 h-3.5" />
                <span>DYNAMIC CAREER HISTORY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
                Professional Journey
              </h2>
              <p className="text-sm text-slate-500 dark:text-gray-400 max-w-xl mt-3 font-light leading-relaxed">
                Elite team collaboration, full-scale system integrations, and next-generation UI architectures configured on the edge.
              </p>
            </div>

            {/* Dynamic Timeline Component */}
            <div className="relative border-l border-slate-200 dark:border-white/10 ml-3 pl-8 sm:pl-10 flex flex-col gap-12">
              {experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="relative group">
                  {/* Glowing Timeline Marker Node */}
                  <div className="absolute -left-[45px] sm:-left-[53px] top-1.5 w-[24px] h-[24px] rounded-full bg-slate-50 dark:bg-[#050505] border border-slate-300 dark:border-white/15 flex items-center justify-center group-hover:border-purple-500 transition-colors duration-300 z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-gray-700 group-hover:bg-purple-500 transition-all duration-300 scale-100 group-hover:scale-125" />
                  </div>

                  {/* Date Badge float to top right */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase text-slate-400 dark:text-gray-400 border border-slate-200/60 dark:border-white/5 px-2.5 py-1 bg-slate-100 dark:bg-white/5 rounded-md w-fit">
                      {exp.duration}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500 flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                      SECURE METRICS DOCKED
                    </span>
                  </div>

                  {/* Credentials block */}
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
                    {exp.role}
                    <span className="text-slate-400 dark:text-slate-500 font-light text-base block sm:inline sm:ml-2">
                       @ {exp.company}
                    </span>
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed font-light mt-2 max-w-2xl">
                    {exp.description}
                  </p>

                  {/* Highlights Bulleting */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2.5 border-t border-slate-100 dark:border-white/5 pt-4">
                      {exp.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex gap-2.5 text-xs text-slate-500 dark:text-gray-400">
                          <ChevronRight className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed font-light">{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: TECHNICAL SKILLS (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-700 dark:bg-white/5 dark:text-cyan-400 border border-cyan-200/30 dark:border-white/10 font-mono mb-4">
                <Trophy className="w-3.5 h-3.5" />
                <span>DYNAMIC PROWESS FEED</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
                Skills & Capabilities
              </h2>
              <p className="text-sm text-slate-500 dark:text-gray-400 mt-3 font-light leading-relaxed">
                Dynamic skill categorization calibrated directly from active repository code signatures and prompt orchestration runs.
              </p>
            </div>

            {/* Filter Pill Actions */}
            <div className="flex flex-flow-wrap gap-2 p-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl w-fit">
              {(['All', 'Frontend', 'AI', 'Tools'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-gray-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {cat === 'All' ? 'Complete Deck' : cat}
                </button>
              ))}
            </div>

            {/* Structured bars */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              {filteredSkills.map((skill, sIdx) => (
                <motion.div key={skill.id || sIdx} variants={itemVariants} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-gray-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-wider text-slate-400 dark:text-gray-400 uppercase">
                        {skill.category}
                      </span>
                      <span className="text-xs font-mono font-extrabold text-[#6D28D9] dark:text-[#A78BFA]">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>

                  {/* Beautiful customized progress slider container */}
                  <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Meta Badges */}
            <div className="p-4 rounded-3xl bg-slate-50 dark:bg-white/2 border border-slate-200/50 dark:border-white/5 flex items-center gap-4.5">
              <div className="w-10 h-10 rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED] dark:bg-[#7C3AED]/5 dark:text-[#A78BFA] flex items-center justify-center border border-purple-500/10 shrink-0">
                <Cpu className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="block text-[8px] font-mono tracking-widest text-slate-400 dark:text-gray-500 uppercase">Latest Credential Hash</span>
                <span className="text-[11px] font-mono text-slate-600 dark:text-gray-400 font-semibold truncate leading-none">
                  AETH-SKL-SHA256-V2_4
                </span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
