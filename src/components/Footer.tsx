/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 dark:bg-[#050505] border-t border-slate-250/10 dark:border-white/5 pt-20 pb-12 px-6 overflow-hidden">
      {/* Absolute background accent blobs */}
      <div className="absolute top-[80%] left-[80%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Decorative Gradient Divider (Purple -> Blue -> Cyan) */}
      <div className="h-[2px] w-full max-w-7xl mx-auto bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 opacity-20 dark:opacity-30 mb-16 rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 justify-between mb-16">
        {/* Left column: Brand */}
        <div className="md:col-span-5 flex flex-col items-start gap-4">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[1px] flex items-center justify-center overflow-hidden animate-glow-border">
              <div className="w-full h-full rounded-[7px] bg-slate-950 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white">
              Anees
              <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent ml-1 font-extrabold animate-gradient-text-fast"> Creative Lab</span>
            </span>
          </a>
          <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed max-w-sm font-light">
            Designing and engineering premium, low-latency React interfaces, highly optimized AI prompt controls, and robust frontend platforms for web solutions.
          </p>

          {/* Social Icons row */}
          <div className="flex items-center gap-2.5 mt-2">
            <a
              href="https://github.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E0E0E] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white flex items-center justify-center transition-all shadow-sm"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E0E0E] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white flex items-center justify-center transition-all shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:mylifear2026@gmail.com"
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E0E0E] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white flex items-center justify-center transition-all shadow-sm"
              aria-label="Email Coordinates"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Middle column 1: Links */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-[10px] font-bold font-mono tracking-widest text-slate-450 dark:text-gray-500 uppercase">
            Navigation Map
          </h4>
          <div className="flex flex-col gap-2.5">
            <a href="#features" className="text-xs text-slate-500 hover:text-slate-950 dark:text-gray-400 dark:hover:text-white transition-colors font-light">
              Core Expertise
            </a>
            <a href="#portfolio" className="text-xs text-slate-500 hover:text-slate-950 dark:text-gray-400 dark:hover:text-white transition-colors font-light">
              Featured Projects
            </a>
            <a href="#experience" className="text-xs text-slate-500 hover:text-slate-950 dark:text-gray-400 dark:hover:text-white transition-colors font-light">
              Journey & Skills
            </a>
            <a href="#faq" className="text-xs text-slate-500 hover:text-slate-950 dark:text-gray-400 dark:hover:text-white transition-colors font-light">
              Q&A
            </a>
            <a href="#contact" className="text-xs text-slate-500 hover:text-slate-950 dark:text-gray-400 dark:hover:text-white transition-colors font-light">
              Init Consult
            </a>
          </div>
        </div>

        {/* Right column: Interactive Newsletter */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-[10px] font-bold font-mono tracking-widest text-slate-450 dark:text-gray-500 uppercase">
            Development Digest
          </h4>
          <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed font-light">
            Receive modular tips on CSS architectures, React rendering patterns, and AI design practices.
          </p>

          <form onSubmit={handleSubmit} className="relative mt-2 flex items-center">
            <input
              type="email"
              placeholder={subscribed ? "Thanks for subscribing!" : "Enter active email address..."}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribed}
              required
              className="w-full bg-white dark:bg-[#0A0A0A] text-slate-800 dark:text-white text-xs rounded-xl pl-4 pr-12 py-3.5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 disabled:opacity-60 placeholder-slate-400"
            />
            
            <button
              type="submit"
              disabled={subscribed}
              className={`absolute right-1.5 p-2 rounded-lg transition-colors flex items-center justify-center shrink-0 cursor-pointer ${
                subscribed
                  ? 'bg-transparent text-emerald-500'
                  : 'bg-slate-950 dark:bg-white text-white dark:text-black hover:bg-slate-900 dark:hover:bg-slate-200'
              }`}
              aria-label="Subscribe"
            >
              {subscribed ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
          {subscribed && (
            <span className="text-[10px] font-mono font-semibold text-emerald-520 dark:text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
              SUBSCRIPTION RECORD GRADED
            </span>
          )}
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/50 dark:border-white/10 pt-6 gap-4 text-slate-400">
        <p className="text-[11px] font-mono leading-none dark:text-gray-500">
          © {currentYear} Anees Creative Lab. Crafted with absolute precision.
        </p>
        
        <div className="flex items-center gap-5 text-[11px] font-mono dark:text-gray-500">
          <a href="#features" className="hover:text-slate-900 dark:hover:text-cyan-400 transition-colors">EXPERTISE</a>
          <a href="#portfolio" className="hover:text-slate-900 dark:hover:text-cyan-400 transition-colors">PROJECTS</a>
          <a href="#contact" className="hover:text-slate-900 dark:hover:text-cyan-400 transition-colors">CONTACT</a>
        </div>
      </div>
    </footer>
  );
}
