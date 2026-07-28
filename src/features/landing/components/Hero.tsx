import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { Sparkles, ArrowRight, ShieldCheck, Play, Zap, Terminal } from 'lucide-react';
import { ForgeButton } from '@/components/forge/ForgeButton';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-tr from-[var(--df-primary)]/20 via-sky-500/10 to-indigo-600/20 blur-[160px] pointer-events-none" />
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,1) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 text-center">
        {/* Release Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>DevForge v3.0 Released</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300 flex items-center gap-1">
            AI Sprint Context Engine <Zap className="h-3 w-3 text-amber-400 fill-amber-400" />
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]"
        >
          The Engineering Workspace for{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent">
            High-Velocity SaaS Teams
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          Combine project management, API workspaces, CI/CD telemetry, and intelligent code context
          in one unified, multi-tenant platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/register" className="w-full sm:w-auto">
            <ForgeButton
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-base font-semibold px-8 py-3.5 shadow-2xl shadow-indigo-500/40"
              leftIcon={<Sparkles className="h-5 w-5" />}
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Start Free 14-Day Trial
            </ForgeButton>
          </Link>

          <Link to="/login" className="w-full sm:w-auto">
            <ForgeButton
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-base font-medium px-6 py-3.5 border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-white"
              leftIcon={<Play className="h-4 w-4 fill-white" />}
            >
              Explore Interactive Demo
            </ForgeButton>
          </Link>
        </motion.div>

        {/* Trust micro details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> SOC2 Type II Certified
          </span>
          <span className="flex items-center gap-1.5">
            <Terminal className="h-4 w-4 text-indigo-400" /> Spring Boot & JWT Integration Ready
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-amber-400" /> Instant Setup in 2 Minutes
          </span>
        </motion.div>
      </div>
    </section>
  );
}
