/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COMPANYS } from '../data/mockData';
import { Sparkles } from 'lucide-react';

export default function Companies() {
  return (
    <section className="py-12 border-y border-slate-200/50 dark:border-white/10 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <p className="text-xs uppercase tracking-widest font-semibold text-slate-400 dark:text-gray-500">
            INTEGRATED WORLDWIDE
          </p>
        </div>
        <p className="text-xs font-light text-slate-500 dark:text-gray-400">
          Trusted by high-performance engineering squads running multi-model agent parameters.
        </p>
      </div>

      {/* Infinite Scrolling Tape */}
      <div className="relative w-full overflow-hidden flex select-none group">
        {/* Shadow overlays on edges to fade inward */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white dark:from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track (Double content for smooth loop) */}
        <div className="flex gap-16 min-w-full animate-marquee py-3 shrink-0">
          {COMPANYS.map((company) => (
            <div
              key={`c1-${company.id}`}
              className="flex items-center gap-2.5 text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 cursor-pointer group"
            >
              {/* Fake aesthetic geometric icon */}
              <div className="w-5 h-5 rounded bg-slate-200 dark:bg-white/5 border border-slate-200/30 dark:border-white/10 p-0.5 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <span className="text-[9px] font-mono font-bold text-slate-600 dark:text-gray-400">
                  {company.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="font-display font-semibold text-sm tracking-wide">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        {/* Repeat Content */}
        <div className="flex gap-16 min-w-full animate-marquee py-3 shrink-0" aria-hidden="true">
          {COMPANYS.map((company) => (
            <div
              key={`c2-${company.id}`}
              className="flex items-center gap-2.5 text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 cursor-pointer group"
            >
              <div className="w-5 h-5 rounded bg-slate-200 dark:bg-white/5 border border-slate-200/30 dark:border-white/10 p-0.5 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <span className="text-[9px] font-mono font-bold text-slate-600 dark:text-gray-400">
                  {company.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="font-display font-semibold text-sm tracking-wide">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
