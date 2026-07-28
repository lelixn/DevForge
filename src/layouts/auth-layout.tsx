import { motion } from 'framer-motion';
import { Sparkles, Terminal, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackToHome?: boolean;
}

export function AuthLayout({ children, title, subtitle, showBackToHome = true }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-[var(--df-background)] text-[var(--df-foreground)] selection:bg-[var(--df-primary)]/30 selection:text-white">
      {/* Left Column: Branding Showcase (Hidden on Mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-[var(--df-border)] bg-[#030712] p-12 lg:flex">
        {/* Glowing Background Gradients */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[var(--df-primary)]/20 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[var(--df-accent)]/15 blur-[120px]" />
        <div className="absolute left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[100px]" />

        {/* Dynamic Grid Effect */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Header Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/landing" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--df-gradient-primary)] shadow-lg shadow-[var(--df-primary)]/25 transition-transform group-hover:scale-105">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">DevForge</span>
              <span className="text-[10px] font-semibold text-[var(--df-primary-light)] uppercase tracking-wider">
                Engineering Platform
              </span>
            </div>
          </Link>

          {showBackToHome && (
            <Link
              to="/landing"
              className="flex items-center gap-1.5 rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--df-muted-foreground)] transition-colors hover:border-[var(--df-border-strong)] hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to website
            </Link>
          )}
        </div>

        {/* Middle Feature Showcase */}
        <div className="relative z-10 my-auto py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--df-primary)]/30 bg-[var(--df-primary)]/10 px-3.5 py-1 text-xs font-medium text-[var(--df-primary-light)] w-fit backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[var(--df-primary-light)]" />
              <span>Next-Gen Engineering Platform</span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white xl:text-4xl">
              Ship software{' '}
              <span className="bg-gradient-to-r from-[var(--df-primary-light)] via-sky-400 to-indigo-300 bg-clip-text text-transparent">
                10x faster
              </span>{' '}
              with AI workflows.
            </h2>

            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              Combine sprint management, API workspace, CI/CD observability, and real-time AI
              context engineering in a single unified operating system.
            </p>

            {/* Feature Highlights Grid */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-3.5 backdrop-blur-md">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Multi-Tenant Workspaces</h4>
                  <p className="text-[11px] text-slate-400">Isolated teams & RBAC permissions</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-3.5 backdrop-blur-md">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Enterprise Security</h4>
                  <p className="text-[11px] text-slate-400">SOC2 & Spring Boot JWT ready</p>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="mt-6 border-t border-slate-800/60 pt-6">
              <p className="text-xs italic text-slate-300">
                &ldquo;DevForge replaced 5 different dev tools for our 40-person engineering team.
                The AI context engine is unmatched.&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  alt="Sarah Chen"
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-[var(--df-primary)]/40"
                />
                <div>
                  <p className="text-xs font-medium text-white">Sarah Chen</p>
                  <p className="text-[10px] text-slate-400">VP of Engineering, CloudScale</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-500 flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} DevForge, Inc.</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </span>
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-10 lg:p-12 min-h-screen">
        {/* Mobile Header Logo */}
        <div className="flex items-center justify-between lg:hidden mb-8">
          <Link to="/landing" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--df-gradient-primary)]">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-white">DevForge</span>
          </Link>
          <Link
            to="/landing"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)] px-2.5 py-1 text-xs text-[var(--df-muted-foreground)] hover:text-white"
          >
            <ArrowLeft className="h-3 w-3" /> Home
          </Link>
        </div>

        {/* Center Auth Form */}
        <div className="my-auto mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-sm text-[var(--df-muted-foreground)]">{subtitle}</p>
              )}
            </div>

            {children}
          </motion.div>
        </div>

        {/* Footer links */}
        <div className="mt-8 text-center text-xs text-[var(--df-muted-foreground)]">
          By continuing, you agree to DevForge&apos;s{' '}
          <a href="#" className="underline hover:text-white">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-white">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  );
}
