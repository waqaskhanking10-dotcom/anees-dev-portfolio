/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHAT_BOT_FLOW } from '../data/mockData';
import { ChatMessage } from '../types';
import { Send, Cpu, ShieldCheck, Database, Terminal, User, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface AgentSystem {
  id: string;
  name: string;
  role: string;
  icon: any;
  color: string;
  initialMessage: string;
}

const AGENTS: AgentSystem[] = [
  {
    id: 'a1',
    name: 'Unified Routing Core',
    role: 'Active Edge Supervisor',
    icon: Cpu,
    color: 'from-purple-500 to-indigo-500',
    initialMessage: 'Greetings! I am the Anees Creative Lab Assistant. I direct high-fidelity UI visual components and prompts to optimal design outcomes. Ask me about custom frontend or system capabilities.',
  },
  {
    id: 'a2',
    name: 'Neural Sentinel',
    role: 'Guardrail Specialist',
    icon: ShieldCheck,
    color: 'from-pink-500 to-rose-600',
    initialMessage: 'Sentinel Firewall active. Direct cognitive streams under vector scrutiny. Ready to validate shield rules or isolate hypothetical prompt injections. What prompt parameters are under investigation?',
  },
  {
    id: 'a3',
    name: 'Coherent Snapshot Sync',
    role: 'Context Shard Sync',
    icon: Database,
    color: 'from-cyan-400 to-blue-500',
    initialMessage: 'Distributed agent memory snapshot synced. Embeddings verified across global indices. Prompt me to explore vector parameter decay rates, context snapshot size, or long-term session persistence.',
  },
];

export default function ChatInterface() {
  const [selectedAgentId, setSelectedAgentId] = useState('a1');
  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>({
    a1: [{ id: '1', role: 'assistant', content: AGENTS[0].initialMessage, timestamp: '09:09:05' }],
    a2: [{ id: '1', role: 'assistant', content: AGENTS[1].initialMessage, timestamp: '09:09:05' }],
    a3: [{ id: '1', role: 'assistant', content: AGENTS[2].initialMessage, timestamp: '09:09:05' }],
  });
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const activeAgent = AGENTS.find((a) => a.id === selectedAgentId) || AGENTS[0];
  const activeMessages = conversations[selectedAgentId] || [];

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      content: textToSend,
      timestamp: timeStr,
    };

    // Append User Message
    setConversations((prev) => ({
      ...prev,
      [selectedAgentId]: [...(prev[selectedAgentId] || []), userMsg],
    }));

    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let replyContent = `Understood. Processing request through ${activeAgent.name}. Node resolved with 100% coherence metrics in 21ms. Prompt weightings safely integrated into active context shards.`;

      // Match custom keyword questions to make dialogue highly tailored and realistic
      const lowercase = textToSend.toLowerCase();
      if (lowercase.includes('latency') || lowercase.includes('slow') || lowercase.includes('performance')) {
        replyContent = 'Our active edge propagation has stabilized under <14ms. Dynamic multiplex routers route requests to intermediate flash engines when main-host SLA targets are crossed.';
      } else if (lowercase.includes('shield') || lowercase.includes('inject') || lowercase.includes('safe') || lowercase.includes('security')) {
        replyContent = 'Neural Sentinel filters all input arrays dynamically. By validating character encoding sequences and running lightweight vector projections, prompt hijackings or context manipulation vectors are neutralized instantly.';
      } else if (lowercase.includes('pricing') || lowercase.includes('cost') || lowercase.includes('plan')) {
        replyContent = 'I recommend exploring our "Growth Pro" plan. At $79/mo, it unlocks priority SLA guarantees, persistent decentralized memory buffers, and active Sentinel firewall safeguards.';
      } else if (lowercase.includes('database') || lowercase.includes('vector') || lowercase.includes('memory') || lowercase.includes('sync')) {
        replyContent = 'Vector snapshots sync seamlessly on every write mutation down to distributed partitions. This allows autonomous systems to maintain precise knowledge coherence across connection drops.';
      }

      const aiMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toTimeString().split(' ')[0],
      };

      setConversations((prev) => ({
        ...prev,
        [selectedAgentId]: [...(prev[selectedAgentId] || []), aiMsg],
      }));

      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputText);
    }
  };

  return (
    <section id="console" className="py-24 px-6 relative overflow-hidden bg-transparent border-t border-slate-200/50 dark:border-white/10">
      {/* Visual glowing blob */}
      <div className="absolute top-[30%] right-[15%] w-[350px] h-[350px] rounded-full bg-purple-500/10 dark:bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Title / Description */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-700 dark:bg-white/5 dark:text-cyan-400 border border-indigo-200/30 dark:border-white/10 font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERACTIVE AI PLAYGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
            Anees Creative Lab Console Live
          </h2>
          <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed font-light">
            Communicate with the Anees Creative Lab virtual assistant core. Switch between agent specialists in the sidebar panel to test creative design layouts, secure styling sanitization, and visual component options.
          </p>
        </div>

        {/* Console Box Outer Shell: Glassmorphism layout */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-black/80 shadow-2xl backdrop-blur-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* LEFT SIDEBAR: Agent Selector (Col spans 4) */}
          <div className="md:col-span-4 border-r border-slate-200 dark:border-white/10 bg-slate-50/45 dark:bg-[#0A0A0A]/60 p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-gray-500 font-mono">
                Command Shards
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-mono font-semibold">
                3 STABLE
              </span>
            </div>

            {/* Agent Button Maps */}
            <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto gap-3 pb-3 md:pb-0 shrink-0">
              {AGENTS.map((agent) => {
                const AgentIcon = agent.icon;
                const isSelected = agent.id === selectedAgentId;

                return (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`flex items-center gap-3.5 p-3.5 rounded-xl text-left border cursor-pointer transition-all duration-300 shrink-0 md:shrink select-none ${
                      isSelected
                        ? 'bg-white dark:bg-[#0A0A0A] border-slate-300 dark:border-white/10 shadow-sm'
                        : 'bg-transparent border-transparent hover:bg-slate-100/60 dark:hover:bg-white/5 text-slate-600 dark:text-gray-400'
                    }`}
                  >
                    {/* Icon container */}
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${agent.color} p-[1px]`}>
                      <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center">
                        <AgentIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="hidden sm:block">
                      <span className={`block text-xs font-bold font-display ${
                        isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-gray-300'
                      }`}>
                        {agent.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium font-mono">
                        {agent.role}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer metadata visual */}
            <div className="mt-auto hidden md:flex flex-col gap-2.5 p-3.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-slate-100/30 dark:bg-white/5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-gray-500 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-500" />
                Edge Gateway status
              </span>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-gray-400">
                <span>API Connection:</span>
                <span className="text-emerald-500 font-semibold">SECURE HTTPS</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-gray-400">
                <span>Active Region:</span>
                <span className="text-slate-300 dark:text-gray-400 font-semibold">asia-southeast1</span>
              </div>
            </div>
          </div>

          {/* RIGHT CHAT AREA: Workspace Panel (Col spans 8) */}
          <div className="md:col-span-8 flex flex-col justify-between h-[480px] md:h-auto bg-white/40 dark:bg-black/30 relative">
            {/* active agent indicator */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-white/40 dark:bg-[#0A0A0A]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${activeAgent.color} animate-pulse`} />
                <div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
                    {activeAgent.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ACTIVE PARAMETER FOCUS
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400">
                  EST_LATENCY: <span className="text-cyan-400 font-bold">&lt;14ms</span>
                </span>
              </div>
            </div>

            {/* Conversation Feed */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 flex flex-col">
              <AnimatePresence initial={false}>
                {activeMessages.map((msg) => {
                  const isAI = msg.role === 'assistant';
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3.5 max-w-[85%] ${!isAI ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isAI
                          ? 'bg-slate-900 border-slate-800 dark:border-white/10'
                          : 'bg-gradient-to-tr from-purple-500 to-cyan-400 border-transparent'
                      }`}>
                        {isAI ? (
                          <Cpu className="w-4 h-4 text-purple-400" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>

                      {/* Content Card Bubble */}
                      <div className={`rounded-2xl p-4 shadow-sm relative overflow-hidden ${
                        isAI
                          ? 'bg-slate-100/80 dark:bg-[#0A0A0A] text-slate-800 dark:text-slate-100 border border-slate-200/50 dark:border-white/10'
                          : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950'
                      }`}>
                        <p className="text-xs sm:text-sm leading-relaxed font-light">
                          {msg.content}
                        </p>
                        <span className={`block text-[8px] mt-2 font-mono ${
                          isAI ? 'text-slate-400 dark:text-gray-500' : 'text-slate-400 dark:text-slate-600'
                        }`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* simulated AI typing feedback bubble */}
              {isTyping && (
                <div className="flex gap-3.5 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 dark:border-white/10 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                  </div>
                  <div className="rounded-2xl p-4 bg-slate-100/80 dark:bg-[#0A0A0A] text-slate-500 border border-slate-200/50 dark:border-white/10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Precooked Quick Prompts to guide visitors */}
            <div className="px-6 py-2.5 border-t border-slate-200/50 dark:border-white/10 flex items-center gap-3 overflow-x-auto select-none shrink-0 scrollbar-none">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-gray-500 shrink-0">
                Quick Prompts:
              </span>
              {[
                'Optimize routing latency',
                'Test neural shield guard',
                'How does memory snapshot sync?',
              ].map((phrase) => (
                <button
                  key={phrase}
                  onClick={() => handleSendMessage(phrase)}
                  disabled={isTyping}
                  className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wide bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-gray-300 border border-slate-200/40 dark:border-white/10 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {phrase}
                </button>
              ))}
            </div>

            {/* Text input Container bar */}
            <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white/40 dark:bg-black/45 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Ask ${activeAgent.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                className="flex-1 bg-slate-100 dark:bg-[#0A0A0A] text-xs sm:text-sm text-slate-800 dark:text-white rounded-xl px-4 py-3 border border-slate-200 dark:border-white/10 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 disabled:opacity-60"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || isTyping}
                className="p-3 rounded-xl bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
