import { motion } from 'framer-motion';
import { Terminal, Shield, Sparkles } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step: 1 | 2;
  title: string;
  subtitle: string;
}

export function OnboardingLayout({ children, step, title, subtitle }: OnboardingLayoutProps) {
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-screen w-full flex-col bg-[var(--df-background)] text-[var(--df-foreground)] selection:bg-[var(--df-primary)]/30">
      {/* Background Lighting Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full bg-[var(--df-primary)]/15 blur-[160px]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 flex h-20 items-center justify-between border-b border-[var(--df-border)] bg-[var(--df-card)]/40 px-6 backdrop-blur-xl lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--df-gradient-primary)] shadow-md shadow-[var(--df-primary)]/20">
            <Terminal className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">DevForge</span>
        </Link>

        {/* Step Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                step >= 1
                  ? 'bg-[var(--df-primary)] text-white shadow-md shadow-[var(--df-primary)]/30'
                  : 'bg-[var(--df-muted)] text-[var(--df-muted-foreground)]'
              }`}
            >
              1
            </div>
            <span className="hidden text-xs font-medium text-white sm:inline">Workspace</span>
          </div>
          <div className="h-0.5 w-8 rounded bg-[var(--df-border)]" />
          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                step >= 2
                  ? 'bg-[var(--df-primary)] text-white shadow-md shadow-[var(--df-primary)]/30'
                  : 'bg-[var(--df-muted)] text-[var(--df-muted-foreground)]'
              }`}
            >
              2
            </div>
            <span className="hidden text-xs font-medium text-white sm:inline">Invite Team</span>
          </div>
        </div>

        {/* User Info Badge */}
        <div className="flex items-center gap-2.5">
          <div className="hidden flex-col text-right sm:flex">
            <span className="text-xs font-semibold text-white">
              {user?.fullName || 'Developer'}
            </span>
            <span className="text-[10px] text-[var(--df-muted-foreground)]">{user?.email}</span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--df-secondary)] border border-[var(--df-border)] font-semibold text-white text-xs">
            {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          {/* Header text */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--df-primary)]/30 bg-[var(--df-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--df-primary-light)] mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Step {step} of 2 — Multi-Tenant Setup
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-[var(--df-muted-foreground)] max-w-lg mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl border border-[var(--df-border)] bg-[var(--df-card)]/90 p-6 shadow-[var(--df-shadow-elevated)] backdrop-blur-xl sm:p-10">
            {children}
          </div>

          {/* Security badge footer */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--df-muted-foreground)]">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>Isolated tenant schema created with full enterprise role-based permissions</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
