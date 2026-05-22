/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { METRICS } from '../data/mockData';
import { Activity, ShieldCheck, ArrowUpRight, ArrowDownRight, RefreshCw, Cpu, Database, Server, Terminal, Sparkles } from 'lucide-react';

interface EventLog {
  id: string;
  timestamp: string;
  type: 'INFO' | 'SECURE' | 'WARN';
  message: string;
}

export default function DashboardPreview() {
  const [workflows, setWorkflows] = useState(4821940);
  const [activeSystemLoad, setActiveSystemLoad] = useState(62);
  const [logs, setLogs] = useState<EventLog[]>([
    { id: '1', timestamp: '09:08:42', type: 'INFO', message: 'Core Multi-Model router booted successfully on edge nodes.' },
    { id: '2', timestamp: '09:08:45', type: 'SECURE', message: 'Shield isolated query parameter containing visual SQL escape vectors.' },
    { id: '3', timestamp: '09:08:48', type: 'INFO', message: 'Workspace vector sync completed. Synced 4,120 parameter files.' },
  ]);

  // Simulate active counters ticking up
  useEffect(() => {
    const counterInterval = setInterval(() => {
      setWorkflows((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 1800);

    const systemLoadInterval = setInterval(() => {
      setActiveSystemLoad((prev) => {
        const delta = Math.floor(Math.random() * 11) - 5;
        const target = prev + delta;
        return Math.max(30, Math.min(95, target));
      });
    }, 4000);

    return () => {
      clearInterval(counterInterval);
      clearInterval(systemLoadInterval);
    };
  }, []);

  // Simulate incoming real-time logging events
  useEffect(() => {
    const logPool = [
      { type: 'INFO' as const, message: 'Dynamic weight calibration resolved: routed prompt to deep-flash-1.5' },
      { type: 'SECURE' as const, message: 'Prompt injection query intercepted. Guard neutralized pattern [INJ_V3]' },
      { type: 'INFO' as const, message: 'Decentralized vector persistence check: embeddings matched 100% coherence' },
      { type: 'INFO' as const, message: 'Cloud Run edge instance recycled. Warm-start latency resolved in 12ms' },
      { type: 'WARN' as const, message: 'Secondary fallback triggered: primary model latency exceeded SLA limit (50ms)' },
    ];

    const logInterval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      
      const newLog: EventLog = {
        id: Math.random().toString(),
        timestamp: timeStr,
        type: randomLog.type,
        message: randomLog.message,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    }, 6000);

    return () => clearInterval(logInterval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <section id="dashboard" className="py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Glow dot overlay */}
      <div className="absolute bottom-[20%] left-[8%] w-[250px] h-[250px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Intro elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400 border border-purple-200/30 dark:border-purple-500/35">
              <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
              <span>LIVE TELEMETRY PANEL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display">
              Enterprise Dashboard Preview
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-gray-400 max-w-2xl font-light leading-relaxed">
              Observe system accuracy and agent execution frequencies in real-time. This live visual console receives coordinates from edge router clusters and firewall nodes instantaneously.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-slate-600 dark:text-gray-400">
                ACTIVE PIPELINE METRICS
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Grid View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Metrics and Event Feeds */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Workflows Executed card */}
            <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-500 dark:text-gray-450 uppercase tracking-wider font-mono">
                  Live Workflows Processed
                </span>
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white tabular-nums tracking-tight">
                  {formatNumber(workflows)}
                </span>
                <span className="ml-2 font-mono text-xs font-semibold text-emerald-500 inline-flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  +24.6%
                </span>
              </div>
              {/* Sparkline Visual */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 dark:text-gray-500">LIVE VECTOR FREQUENCY SHARD</span>
                <div className="w-20 h-5">
                  <svg viewBox="0 0 100 20" className="w-full h-full">
                    <path
                      d="M 0,10 Q 15,18 30,5 T 60,15 T 85,2 T 100,12"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Metrics Loop from mockData */}
            {METRICS.map((metric, idx) => (
              <div
                key={metric.title}
                className="p-5 rounded-3xl bg-white/60 dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 dark:text-gray-450 uppercase tracking-wider font-mono">
                    {metric.title}
                  </span>
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                    idx === 0 ? 'bg-cyan-500/10' : 'bg-rose-500/10'
                  }`}>
                    {idx === 0 ? (
                      <Server className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    ) : (
                      <Database className="w-3.5 h-3.5 text-rose-600 dark:text-rose-450" />
                    )}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    {metric.value}
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-500 inline-flex items-center gap-0.5">
                    {metric.isPositive ? (
                      <ArrowDownRight className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3 text-rose-500" />
                    )}
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Interactive Event Stream Console & Node Graph Mockup */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex-1 rounded-3xl bg-slate-900 dark:bg-black text-slate-100 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col min-h-[380px]">
              {/* Console header */}
              <div className="px-5 py-4 bg-slate-950 dark:bg-[#0A0A0A] border-b border-slate-800 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono tracking-wider font-semibold">
                    EDGE_ROUTING_FEED.sh
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    SYNCCONTROLLER: {activeSystemLoad}% LOAD
                  </span>
                </div>
              </div>

              {/* Live Logging Rows */}
              <div className="p-5 flex-1 font-mono text-xs flex flex-col gap-4 overflow-y-auto max-h-[180px]">
                <AnimatePresence mode="popLayout">
                  {logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-3 leading-relaxed border-b border-slate-800/40 dark:border-white/5 pb-2 items-start"
                    >
                      <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                      
                      {log.type === 'SECURE' ? (
                        <span className="text-rose-400 font-bold bg-rose-500/10 px-1 py-0.5 rounded shrink-0 text-[10px]">
                          SHIELD_BLOCKED
                        </span>
                      ) : log.type === 'WARN' ? (
                        <span className="text-amber-400 font-bold bg-amber-500/10 px-1 py-0.5 rounded shrink-0 text-[10px]">
                          FAILOVER_RETRY
                        </span>
                      ) : (
                        <span className="text-emerald-500 font-bold bg-emerald-500/10 px-1 py-0.5 rounded shrink-0 text-[10px]">
                          ROUTED_OK
                        </span>
                      )}

                      <span className="text-slate-200 select-all">{log.message}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Graphic active visualization (Grid layout node indicators) */}
              <div className="p-5 border-t border-slate-800/60 dark:border-white/10 bg-slate-950/40 dark:bg-white/5 flex flex-col gap-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">
                  Cluster Node Load maps (Decentralized regions)
                </span>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { node: 'US-East (Virginia)', latency: '12ms', load: '32%', color: 'from-purple-500 to-indigo-500' },
                    { node: 'EU-West (Dublin)', latency: '18ms', load: '48%', color: 'from-blue-500 to-cyan-500' },
                    { node: 'AP-East (Singapore)', latency: '6ms', load: '65%', color: 'from-cyan-500 to-teal-500' },
                    { node: 'GLOBAL-ROUTER', latency: '0.02ms', load: '14%', color: 'from-pink-500 to-rose-500' },
                  ].map((region) => (
                    <div
                      key={region.node}
                      className="p-3 bg-slate-900 dark:bg-[#0A0A0A] border border-slate-800 dark:border-white/10 rounded-2xl flex flex-col justify-between gap-1 group/node cursor-pointer hover:border-slate-705 dark:hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300">{region.node}</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      
                      <div className="flex items-baseline justify-between pt-1">
                        <span className="font-mono text-[10px] text-slate-500">{region.latency}</span>
                        <span className="font-mono text-[10px] font-bold text-slate-400">{region.load}</span>
                      </div>

                      {/* Spark line bar */}
                      <div className="h-1 w-full bg-slate-800 dark:bg-white/5 rounded-full overflow-hidden mt-1.5">
                        <div
                          style={{ width: region.load }}
                          className={`h-full bg-gradient-to-r ${region.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
