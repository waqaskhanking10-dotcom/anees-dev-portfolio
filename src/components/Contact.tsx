/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { saveContactMessage } from '../data/portfolioData';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Save contact submission directly to Firebase Firestore
      await saveContactMessage({
        name: formName,
        email: formEmail,
        subject: formSubject,
        message: formMessage
      });

      setIsSubmitting(false);
      setSubmitStatus('success');

      // Reset fields
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormMessage('');

      // Fade out success notification after 5s
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (err) {
      console.error('Contact submit error: ', err);
      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-transparent border-t border-slate-100 dark:border-white/5">
      {/* Background blobs overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-blue-500/5 dark:bg-blue-600/5 blur-[90px]" />
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-purple-500/5 dark:bg-purple-600/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:bg-white/5 dark:text-purple-300 border border-purple-200/30 dark:border-white/10 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-pulse" />
            <span>Init Connection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Let's Collaborate On <br />
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Your Next Big Launch
            </span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed font-light">
            Have a specialized React concept, Next.js optimization sprint, or custom AI orchestration workflow? Get in touch to schedule a direct architecture consultation.
          </p>
        </div>

        {/* Form and Contact details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Contact Info Block */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 p-8 rounded-3xl bg-white/50 dark:bg-[#0A0A0A]/55 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">Contact Coordinates</h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 font-light leading-relaxed">
                Reach out dynamically or explore existing socials. I respond standardly within 12-24 operating hours.
              </p>

              <div className="space-y-5 pt-4">
                {/* Email item */}
                <a 
                  href="mailto:hello@aneescreativelab.com"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2 hover:border-purple-500/30 dark:hover:border-purple-500/30 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-wider font-mono font-bold">Email Message</span>
                    <span className="text-xs text-slate-700 dark:text-gray-300 font-semibold group-hover:text-purple-500 transition-colors">hello@aneescreativelab.com</span>
                  </div>
                </a>

                {/* Location item */}
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-mono shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-wider font-mono font-bold">Location Coordinates</span>
                    <span className="text-xs text-slate-700 dark:text-gray-300 font-semibold">Available Globally / Remote Agent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer socials */}
            <div className="pt-6 border-t border-slate-150 dark:border-white/10 space-y-3">
              <span className="block text-[10px] text-slate-400 dark:text-gray-400 uppercase tracking-widest font-mono font-bold">Digital Channels</span>
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-white flex items-center justify-center transition-all shadow-sm"
                  title="Github Code Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-white flex items-center justify-center transition-all shadow-sm"
                  title="LinkedIn Network Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://fiverr.com" 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-white flex items-center justify-center font-mono font-extrabold text-[11px] transition-all shadow-sm"
                  title="Fiverr Freelance Page"
                >
                  Fi.
                </a>
              </div>
            </div>
          </div>

          {/* Right: Glassmorphism Contact Form card */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white/50 dark:bg-[#0A0A0A]/55 border border-slate-200 dark:border-white/10 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact_name" className="text-[10px] font-mono tracking-wider text-slate-400 dark:text-gray-500 uppercase font-bold">Your Name *</label>
                  <input
                    id="contact_name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="bg-slate-50/50 dark:bg-black/40 text-slate-900 dark:text-white text-xs rounded-xl p-3.5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-500/80 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact_email" className="text-[10px] font-mono tracking-wider text-slate-400 dark:text-gray-400 uppercase font-bold">Email Address *</label>
                  <input
                    id="contact_email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="bg-slate-50/50 dark:bg-black/40 text-slate-900 dark:text-white text-xs rounded-xl p-3.5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-500/80 transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact_subject" className="text-[10px] font-mono tracking-wider text-slate-400 dark:text-gray-400 uppercase font-bold">Subject Goal</label>
                <input
                  id="contact_subject"
                  type="text"
                  placeholder="e.g. Next.js SaaS Web App Concept"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  className="bg-slate-50/50 dark:bg-black/40 text-slate-900 dark:text-white text-xs rounded-xl p-3.5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-500/80 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact_message" className="text-[10px] font-mono tracking-wider text-slate-400 dark:text-gray-400 uppercase font-bold">Your Message Payload *</label>
                <textarea
                  id="contact_message"
                  required
                  rows={5}
                  placeholder="Tell me about your tech layout goals, scope, and requested speed metrics..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  className="bg-slate-50/50 dark:bg-black/40 text-slate-900 dark:text-white text-xs rounded-xl p-3.5 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-500/80 transition-colors resize-none"
                />
              </div>

              {/* Submitting Status feedback elements */}
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-semibold"
                  >
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span>Message transmission succeeded! I will reach back to you shortly.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-400 text-xs font-semibold"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>Incomplete fields. Please satisfy all required inputs.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full sm:w-auto self-start px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-950 dark:bg-white dark:text-slate-950 shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors">
                  {isSubmitting ? 'Transmitting...' : 'Send Message'}
                </span>
                <Send className="w-3.5 h-3.5 relative z-10 group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
