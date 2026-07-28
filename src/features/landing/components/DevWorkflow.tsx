import { motion } from 'framer-motion';
import { GitCommit, ShieldCheck, CheckCircle2, Rocket, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: GitCommit,
    title: 'Developer Commits Code',
    description:
      'Pushes code to GitHub or GitLab. DevForge webhooks automatically parse issue keys (DF-104) and link code commits to sprint backlog items.',
  },
  {
    step: '02',
    icon: ShieldCheck,
    title: 'AI Code & Security Audit',
    description:
      'DevForge AI context engine checks for breaking schema changes, RBAC leaks, and security compliance in real time.',
  },
  {
    step: '03',
    icon: CheckCircle2,
    title: 'Automated Sprint Sync',
    description:
      'Task state transitions from "In Review" to "Done" automatically upon PR merge. Sprint velocity metrics update live.',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Multi-Tenant Deployment',
    description:
      'Triggers Spring Boot CI/CD deployment pipelines with zero-downtime tenant migration checks.',
  },
];

export function DevWorkflow() {
  return (
    <section
      id="workflow"
      className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-800/60"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-3">
          Automated Development Lifecycle
        </h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How DevForge accelerates your team workflow
        </h3>
        <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
          From first commit to production deployment, every step is synchronized across your team
          with zero manual record-keeping.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {STEPS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black font-mono text-indigo-400/40 group-hover:text-indigo-400 transition-colors">
                    {item.step}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>

              {idx < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
