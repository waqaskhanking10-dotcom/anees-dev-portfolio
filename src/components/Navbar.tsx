/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon, Menu, X, Cpu, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { loadBranding } from '../data/portfolioData';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [branding, setBranding] = useState(() => loadBranding());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);

    const handleBrandingUpdate = () => {
      setBranding(loadBranding());
    };
    window.addEventListener('aetheris_cms_updated', handleBrandingUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('aetheris_cms_updated', handleBrandingUpdate);
    };
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '#features' },
    { name: 'Projects', href: '#portfolio' },
    { name: 'Journey & Skills', href: '#experience' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
    { name: 'CMS Admin', href: '#admin' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-4 shadow-lg backdrop-blur-md bg-white/70 dark:bg-black/80 border-b border-black/5 dark:border-white/10'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/15 flex items-center justify-center overflow-hidden animate-glow-border">
              {/* Rotating glowing aura inside the border */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" style={{ animationDuration: '10s' }} />
              <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center relative z-10 transition-colors group-hover:bg-slate-900/40 overflow-hidden">
                {branding.logoImage ? (
                  <img src={branding.logoImage} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-5.5 h-5.5 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white flex items-center">
              {branding.logoText || 'Anees'}
              <span className="relative ml-1.5 font-extrabold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent opacity-100 animate-gradient-text-fast">
                {branding.logoSubtext || 'Creative Lab'}
              </span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/10"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-indigo-600" />
              )}
            </button>

            {/* Launch App CTA */}
            <a
              href="#admin"
              className="group relative inline-flex items-center gap-1 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-white bg-slate-950 dark:bg-white dark:text-slate-950 overflow-hidden shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 group-hover:text-white transition-colors">Secure CMS</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </a>
          </div>

          {/* Mobile Actions Container */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
              aria-label="Toggle theme mobile"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Hamburger Open button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[73px] z-40 p-6 bg-white dark:bg-[#0A0A0A] border-b border-slate-200 dark:border-white/10 shadow-xl flex flex-col gap-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="h-px bg-slate-200 dark:bg-white/10 my-1" />
            <a
              href="#admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3.5 px-4 rounded-xl text-center text-sm font-semibold text-white bg-slate-950 dark:bg-white dark:text-slate-950 shadow-md flex items-center justify-center gap-2"
            >
              <span>Secure CMS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
