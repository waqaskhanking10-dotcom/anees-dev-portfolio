/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, Sparkles, HelpCircle, Lock } from 'lucide-react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Absolute Background Accent Blob */}
      <div className="absolute top-[20%] left-[25%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:bg-white/5 dark:text-emerald-400 border border-emerald-200/30 dark:border-white/10 font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>TRANSPARENT VALUE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Symmetric Plan Structures
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed font-light">
            Whether you are testing personal agent frameworks or orchestrating regulated bank transactions, we provide granular access limits to meet your compliance and load vectors standardly.
          </p>

          {/* Toggle Switch */}
          <div className="mt-8 inline-flex items-center gap-4 bg-slate-105 dark:bg-[#0A0A0A] p-1 rounded-full border border-slate-200/20 dark:border-white/10">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                !isYearly
                  ? 'bg-white dark:bg-white/10 text-slate-950 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                isYearly
                  ? 'bg-white dark:bg-white/10 text-slate-950 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <span>Yearly billing</span>
              <span className="text-[9px] bg-purple-500 text-white px-2 py-0.5 rounded-full font-bold">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl bg-white/60 dark:bg-[#0A0A0A] p-8 flex flex-col justify-between transition-all duration-300 border backdrop-blur-md overflow-hidden ${
                  plan.popular
                    ? 'border-purple-500/50 dark:border-purple-500/40 shadow-xl shadow-purple-500/5 scale-102 z-10'
                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Visual Popular banner glow background */}
                {plan.popular && (
                  <div className="absolute -top-[15%] -right-[15%] w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                )}

                {/* Card Top Information */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                    
                    {plan.popular && (
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest text-purple-700 bg-purple-500/10 dark:text-purple-300 dark:bg-purple-500/15 px-2.5 py-1 rounded-full border border-purple-500/20">
                        <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                        RECOMMENDED
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-gray-450 min-h-[48px] leading-relaxed font-light mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-display text-slate-900 dark:text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-450 font-mono">
                      / month
                    </span>
                    {isYearly && price > 0 && (
                      <span className="block text-[10px] text-purple-500 font-semibold font-mono ml-2">
                        (Billed annually)
                      </span>
                    )}
                  </div>

                  {/* Feature Checklists */}
                  <div className="space-y-3.5 mb-8">
                    <span className="block text-[10px] uppercase font-semibold font-mono tracking-widest text-slate-400 dark:text-gray-505 mb-2">
                      INCLUDED CAPABILITIES:
                    </span>
                    
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-gray-300 leading-relaxed font-light">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.popular ? 'bg-purple-500/10 text-purple-500' : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                        }`}>
                          <Check className="w-3 h-3" />
                         </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA element */}
                <div className="mt-auto">
                  <a
                    href="#console"
                    className={`group w-full py-4.5 rounded-xl text-center text-xs font-semibold tracking-wider uppercase block border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                      plan.popular
                        ? 'bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 border-transparent shadow-lg text-xs'
                        : 'bg-transparent text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                  </a>
                  
                  <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-slate-400 font-mono">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Cancel or modify memberships instantly</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
