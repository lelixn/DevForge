import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'DevForge completely streamlined our multi-tenant SaaS architecture rollout. The RBAC permission structure saved us weeks of Spring Boot security wiring.',
    name: 'Marcus Vance',
    role: 'CTO at CloudForge',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    stars: 5,
    tag: 'Fintech SaaS',
  },
  {
    quote:
      'The AI context engine is genuinely remarkable. It parses sprint tickets directly alongside our Git commits and API workspace definitions.',
    name: 'Elena Rostova',
    role: 'Lead Architect at NexaScale',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    stars: 5,
    tag: 'Enterprise DevTools',
  },
  {
    quote:
      'Having sprint management, API client, and deployment telemetry inside one single web app is a game-changer for developer productivity.',
    name: 'David Kalu',
    role: 'VP Engineering at DataPulse',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    stars: 5,
    tag: 'Healthcare Tech',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-800/60">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
          Trusted By Engineering Leaders
        </h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Loved by developers, trusted by CTOs
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 flex flex-col justify-between hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300">
                  {item.tag}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
              <img
                src={item.avatar}
                alt={item.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <h5 className="text-xs font-bold text-white">{item.name}</h5>
                <p className="text-[11px] text-slate-400">{item.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
