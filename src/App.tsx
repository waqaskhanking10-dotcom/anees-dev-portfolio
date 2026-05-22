/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Companies from './components/Companies';
import About from './components/About';
import Features from './components/Features';
import PortfolioShowcase from './components/PortfolioShowcase';
import SkillsAndExperience from './components/SkillsAndExperience';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function MainLayout() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Debounced or direct updates for premium smoothness
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-x-hidden ${
      theme === 'dark' 
        ? 'bg-[#050505] text-[#F9FAFB] selection:bg-purple-500/30' 
        : 'bg-slate-50 text-slate-900 selection:bg-purple-200'
    }`}>
      {/* Premium Cinematic Spotlight follows the cursor softly */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 max-h-screen overflow-hidden hidden md:block"
        style={{
          background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.045), transparent 80%)`
        }}
      />
      
      {/* Structural sections */}
      <Navbar />
      <main className="relative">
        {/* Theme prescribed ambient glows */}
        {theme === 'dark' && (
          <div className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none min-h-full z-0">
            <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-purple-600/25 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[5%] right-[-5%] w-[600px] h-[600px] bg-cyan-600/12 rounded-full blur-[150px]"></div>
            <div className="absolute top-[35%] right-[10%] w-[400px] h-[400px] bg-blue-600/18 rounded-full blur-[110px]"></div>
          </div>
        )}
        <Hero />
        <Companies />
        <About />
        <Features />
        <PortfolioShowcase />
        <SkillsAndExperience />
        <Contact />
        <AdminPanel />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}
