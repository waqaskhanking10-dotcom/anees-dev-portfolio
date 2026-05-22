/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq1'); // Default open first item

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 px-6 relative overflow-hidden bg-transparent border-t border-slate-200/50 dark:border-white/10">
      {/* Decorative Blob */}
      <div className="absolute top-[40%] left-[5%] w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-700 dark:bg-white/5 dark:text-cyan-400 border border-cyan-200/30 dark:border-white/10 font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Inquiry Interpretations
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed font-light">
            Quickly audit details about compliance limits, customized training exclusions, pipeline latencies, and self-hosted open source models.
          </p>
        </div>

        {/* Accordion List container */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = faq.id === openId;
            return (
              <div
                key={faq.id}
                className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-[#0A0A0A] shadow-sm backdrop-blur-md overflow-hidden transition-colors"
                id={faq.id}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 font-display">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 transition-transform duration-300 text-slate-500 dark:text-slate-400 ${
                    isOpen ? 'rotate-180' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Inner Collapsed content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-slate-100 dark:border-white/10 text-xs sm:text-sm text-slate-500 dark:text-gray-450 font-light leading-relaxed">
                        <p className="mb-2">{faq.answer}</p>
                        
                        <div className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-mono font-semibold text-purple-500 uppercase tracking-widest">
                          <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
                          <span>CORE_VERIFIED_PROTOCOL_OK</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
