import { createFileRoute, Link } from '@tanstack/react-router';
import { Clock, LogIn, Shield } from 'lucide-react';
import { ForgeButton } from '@/components/forge/ForgeButton';

export const Route = createFileRoute('/session-expired')({
  component: SessionExpiredPage,
});

function SessionExpiredPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[var(--df-background)] p-6 text-center text-white">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6 shadow-2xl animate-fadeIn">
        <Clock className="h-10 w-10" />
      </div>

      <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-widest mb-2">
        401 Session Timeout
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
        Your Session Has Expired
      </h1>

      <p className="mt-3 text-xs sm:text-sm text-[var(--df-muted-foreground)] max-w-md leading-relaxed">
        For your security, your session was automatically invalidated after inactivity. Please sign
        in again to resume your work.
      </p>

      <div className="mt-8">
        <Link to="/login">
          <ForgeButton variant="primary" size="lg" leftIcon={<LogIn className="h-4 w-4" />}>
            Sign In to Resume Session
          </ForgeButton>
        </Link>
      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-[var(--df-muted-foreground)]">
        <Shield className="h-3.5 w-3.5 text-emerald-400" />
        <span>Protected by Spring Boot OAuth2 / JWT Security Policy</span>
      </div>
    </div>
  );
}
