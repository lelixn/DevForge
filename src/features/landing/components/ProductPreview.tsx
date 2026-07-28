import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Kanban, Code2, Bot, GitBranch, Activity } from 'lucide-react';

const TABS = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
  { id: 'sprints', label: 'Sprint & Kanban Board', icon: Kanban },
  { id: 'api', label: 'API Workspace', icon: Code2 },
  { id: 'ai', label: 'AI Context Copilot', icon: Bot },
];

export function ProductPreview() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <section className="relative py-12 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Mockup Frame Wrapper */}
      <div className="relative rounded-3xl border border-slate-800 bg-[#090d16] p-2.5 shadow-[0_0_100px_rgba(99,102,241,0.15)]">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3 bg-[#030712] rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-[11px] text-slate-500">
              devforge.app/engineering/dashboard
            </span>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Demo
            </span>
          </div>
        </div>

        {/* Dynamic Display Area based on Tab */}
        <div className="p-6 bg-[#030712] rounded-b-2xl min-h-[480px] overflow-hidden">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {/* Top Metric Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs text-slate-400">ACTIVE PROJECTS</span>
                  <p className="text-2xl font-bold text-white mt-1">14</p>
                  <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                    +16.7% vs last month
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs text-slate-400">OPEN TASKS</span>
                  <p className="text-2xl font-bold text-white mt-1">247</p>
                  <span className="text-[11px] text-rose-400 font-semibold mt-1 block">
                    -3.2% vs last month
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs text-slate-400">TEAM MEMBERS</span>
                  <p className="text-2xl font-bold text-white mt-1">38</p>
                  <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                    +5.6% vs last month
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs text-slate-400">AI QUERIES TODAY</span>
                  <p className="text-2xl font-bold text-white mt-1">1.2k</p>
                  <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                    +42% vs last month
                  </span>
                </div>
              </div>

              {/* Main Content split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Activity className="h-4 w-4 text-indigo-400" />
                      Sprint Telemetry & CI Status
                    </h4>
                    <span className="text-xs text-slate-400">Sprint #12 (4 days remaining)</span>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        title: 'feat/spring-boot-jwt-auth',
                        status: 'Passed CI',
                        time: '4m ago',
                        author: 'Alex R.',
                      },
                      {
                        title: 'fix/multi-tenant-tenant-id-leak',
                        status: 'Passed CI',
                        time: '18m ago',
                        author: 'Sarah K.',
                      },
                      {
                        title: 'refactor/workspace-rbac-guard',
                        status: 'Running CI',
                        time: 'Now',
                        author: 'DevForge AI',
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-800/80 bg-slate-950/60"
                      >
                        <div className="flex items-center gap-3">
                          <GitBranch className="h-4 w-4 text-indigo-400" />
                          <div>
                            <p className="text-xs font-mono font-semibold text-white">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-slate-400">by {item.author}</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-400">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Assistant Quick Widget */}
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-2">
                      <Bot className="h-4 w-4 text-indigo-400" />
                      AI Context Synthesis
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      &ldquo;Analyzing 12 commits on sprint #12. High probability of release
                      readiness. No breaking changes detected in API contracts.&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-indigo-500/20 flex items-center justify-between text-[11px] text-slate-400">
                    <span>99.4% confidence score</span>
                    <span className="text-indigo-400 font-semibold">Generate Summary →</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'sprints' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-3 gap-4"
            >
              {['IN PROGRESS', 'REVIEW', 'DONE'].map((col, idx) => (
                <div key={col} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                  <div className="text-xs font-semibold text-slate-400 mb-3 flex items-center justify-between">
                    <span>{col}</span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      {idx === 0 ? 3 : idx === 1 ? 2 : 5}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                      <span className="text-[10px] font-semibold text-indigo-400">DF-104</span>
                      <p className="text-xs font-semibold text-white mt-1">
                        Implement Spring Boot JWT Token Refresh Handler
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                      <span className="text-[10px] font-semibold text-sky-400">DF-109</span>
                      <p className="text-xs font-semibold text-white mt-1">
                        Workspace Tenant Separation Integration Tests
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'api' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300"
            >
              <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  POST
                </span>
                <span className="text-white">/api/v1/auth/login</span>
              </div>
              <pre className="text-indigo-300 bg-slate-900/80 p-4 rounded-xl">
                {`{
  "email": "developer@devforge.io",
  "password": "••••••••••••",
  "workspaceId": "ws_engineering_1"
}`}
              </pre>
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  AI
                </div>
                <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-200">
                  I reviewed your pull request for RBAC permission guards. All permissions map 1:1
                  with Spring Boot security roles.
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
