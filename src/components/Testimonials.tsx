/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="reviews" className="py-24 px-6 relative overflow-hidden bg-transparent border-t border-slate-200/50 dark:border-white/10">
      {/* Decorative Blur elements */}
      <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[250px] h-[250px] rounded-full bg-cyan-500/5 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:bg-white/5 dark:text-purple-400 border border-purple-200/30 dark:border-white/10 font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GLOBAL DEVELOPER SATISFACTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Vouched by Engineering Pioneers
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed font-light">
            Read what tech leads and model architects say about routing overhead, neural compliance validation, and operating context persisting securely under production volume load.
          </p>
        </div>

        {/* Carousel Visual Area */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12">
          <div className="relative rounded-3xl bg-white/60 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 p-8 md:p-12 shadow-xl backdrop-blur-xl min-h-[300px] flex flex-col justify-between">
            {/* Elegant Background Quote Mark */}
            <Quote className="absolute top-6 right-8 w-24 h-24 text-slate-100 dark:text-white/5 -z-10 select-none pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                {/* Review Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Content Quote */}
                <blockquote className="text-base sm:text-xl text-slate-800 dark:text-slate-200 italic font-light leading-relaxed">
                  "{current.content}"
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-slate-200 dark:bg-white/10 my-1" />

                {/* Profile row */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar ring */}
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 p-[1.5px] shadow-sm overflow-hidden shrink-0">
                      <img
                        src={current.avatar}
                        alt={current.name}
                        className="w-full h-full object-cover rounded-full bg-slate-800"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white font-display">
                        {current.name}
                      </span>
                      <span className="block text-[11px] text-slate-400 font-medium font-mono">
                        {current.role} • <span className="text-purple-400">{current.company}</span>
                      </span>
                    </div>
                  </div>

                  {/* Indicator slide dots */}
                  <div className="flex items-center gap-1.5">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentIndex
                            ? 'bg-purple-500 w-6'
                            : 'bg-slate-300 dark:bg-[#202020]'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Manual controls buttons absolute sides */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white bg-white/70 dark:bg-black/80 hover:bg-white dark:hover:bg-white/10 shadow-md backdrop-blur-md cursor-pointer transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6">
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white bg-white/70 dark:bg-black/80 hover:bg-white dark:hover:bg-white/10 shadow-md backdrop-blur-md cursor-pointer transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
