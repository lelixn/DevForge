import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Bot, Zap, Code2, Users2 } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Multi-Tenant RBAC Architecture',
    description:
      'Isolated workspace schemas with fine-grained Owner, Admin, Developer, and Viewer permission roles. Ready for Spring Boot Security context.',
  },
  {
    icon: Bot,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
    title: 'AI Code Context Engine',
    description:
      'Deep repository indexing that links sprint backlog items directly to code commits, pull requests, and architecture design docs.',
  },
  {
    icon: Code2,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
    title: 'Unified API Workspace',
    description:
      'Test, document, and mock REST and GraphQL endpoints inline without leaving your sprint board or context switcher.',
  },
  {
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    title: 'CI/CD Telemetry Sync',
    description:
      'Real-time build pipeline metrics, deployment health checks, and automatic sprint task state transitions upon Git push.',
  },
  {
    icon: Layers,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    title: 'Sprint & Kanban Analytics',
    description:
      'Velocity tracking, burndown charts, cycle-time telemetry, and bottleneck AI recommendations for engineering managers.',
  },
  {
    icon: Users2,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
    title: 'Instant Team Onboarding',
    description:
      'Invite developers by email with automated tokenized onboarding flows, predefined roles, and single sign-on (SSO) options.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">
          Built For Modern Tech Organizations
        </h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Everything your engineering team needs in one platform
        </h3>
        <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
          Stop context-switching across 6 fragmented tools. DevForge brings software lifecycle
          management into a single, high-performance interface.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 hover:border-slate-700 hover:bg-slate-900/80 transition-all shadow-xl overflow-hidden"
            >
              {/* Subtle card lighting on hover */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${feature.bg} ${feature.color} mb-6 transition-transform group-hover:scale-110`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
