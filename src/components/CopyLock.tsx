import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, AlertCircle, Sparkles, Files, X } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function CopyLock() {
  const { theme } = useTheme();
  const [showWarning, setShowWarning] = useState(false);
  const [warningType, setWarningType] = useState<'rightclick' | 'copy'>('copy');
  const [copiedTextHint, setCopiedTextHint] = useState('');

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      // Prevent standard browser right click
      e.preventDefault();
      setWarningType('rightclick');
      setShowWarning(true);
      triggerAudioBeep();
    };

    const handleCopy = (e: ClipboardEvent) => {
      // Prevent selection copy
      e.preventDefault();
      
      const selection = window.getSelection()?.toString() || '';
      if (selection.length > 0) {
        setCopiedTextHint(selection.substring(0, 35) + (selection.length > 35 ? '...' : ''));
      } else {
        setCopiedTextHint('Site Assets / Source Codes');
      }

      setWarningType('copy');
      setShowWarning(true);
      triggerAudioBeep();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C / Cmd+C
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        setWarningType('copy');
        setShowWarning(true);
        triggerAudioBeep();
      }
      // Prevent Ctrl+Shift+I / Cmd+Opt+I (Developer tools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i') {
        e.preventDefault();
        setWarningType('rightclick');
        setShowWarning(true);
        triggerAudioBeep();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Soft sci-fi synthetic click synth sound
  const triggerAudioBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(650, audioCtx.currentTime); // high pure sci-fi beep
      oscillator.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.15); // slide down

      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.16);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.16);
    } catch (e) {
      // AudioCtx unsupported or blocked by browser gesture
    }
  };

  return (
    <>
      {/* Absolute Select Lock CSS Rule injected into body dynamically */}
      <style>{`
        /* Copy lock styling */
        body {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        /* Except for form inputs in admin panels */
        input, textarea, [contenteditable="true"] {
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
          user-select: text !important;
        }
      `}</style>

      {/* Floating security badge indicator on bottom right corner (High design glassmorphism) */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-white/20 dark:bg-black/60 backdrop-blur-md shadow-lg select-none text-[9px] font-mono tracking-widest text-[#a855f7] dark:text-[#c084fc] font-bold"
        >
          <div className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a855f7]/60 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#a855f7]"></span>
          </div>
          <Lock className="w-3 h-3 text-purple-500 animate-pulse" />
          <span>AETHERIS COPY-LOCK ACTIVE</span>
        </motion.div>
      </div>

      {/* Exquisite warning overlay with glassmorphism and custom particle animation */}
      <AnimatePresence>
        {showWarning && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Blurry dark backing */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWarning(false)}
              className="absolute inset-0 bg-black/65 backdrop-blur-[6px]"
            />

            {/* Glowing orb center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />

            {/* Glass Box Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.45 }}
              className="relative max-w-sm w-full p-[1px] bg-gradient-to-tr from-purple-500/30 via-[#06b6d4]/20 to-purple-500/30 rounded-3xl overflow-hidden shadow-2xl z-50"
            >
              {/* Internal elements */}
              <div className="bg-slate-900/90 dark:bg-[#060608]/95 backdrop-blur-3xl p-8 rounded-[23px] text-center flex flex-col items-center gap-5">
                
                {/* Visual Header Icon Block */}
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-2 rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 blur-md"
                  />
                  <div className="relative w-14 h-14 rounded-full bg-slate-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold shadow-inner">
                    {warningType === 'rightclick' ? (
                      <Shield className="w-6 h-6 text-purple-400" />
                    ) : (
                      <Files className="w-5 h-5 text-purple-400" />
                    )}
                  </div>
                </div>

                {/* Heading */}
                <div>
                  <h3 className="text-sm font-extrabold font-mono tracking-widest text-[#a855f7] dark:text-[#c084fc] uppercase">
                    {warningType === 'rightclick' ? 'Secure Node Guard' : 'Copy Protection Engaged'}
                  </h3>
                  <h2 className="text-xl font-bold tracking-tight text-white font-display mt-1">
                    Portfolio is Secured
                  </h2>
                </div>

                {/* Detail content text block in Urdu / Roman script & English */}
                <div className="space-y-3 px-1">
                  <p className="text-[12.5px] text-slate-300 leading-relaxed font-light">
                    {warningType === 'rightclick' 
                      ? "Aetheris Secure CMS right-click menu dynamic locking active hai. Code and layout details real-time protected hain." 
                      : "Source code blocks aur textual designs copy karna strictly disabled hai."
                    }
                  </p>
                  
                  {warningType === 'copy' && copiedTextHint && (
                    <div className="bg-slate-950/80 rounded-xl p-2.5 border border-white/5 font-mono text-[10px] text-purple-400 text-left overflow-hidden text-ellipsis">
                      <span className="text-gray-500 block text-[8px] uppercase tracking-wider font-bold mb-1">Blocked string excerpt:</span>
                      "{copiedTextHint}"
                    </div>
                  )}

                  <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 leading-normal pt-1 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>Design Assets proprietary strictly</span>
                  </p>
                </div>

                {/* Dismiss button */}
                <button
                  onClick={() => setShowWarning(false)}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold font-mono uppercase tracking-widest cursor-pointer transition-all duration-300 transform active:scale-[0.98] shadow-md hover:scale-[1.02]"
                >
                  Return to Dashboard
                </button>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
