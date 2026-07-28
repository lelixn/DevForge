import { createFileRoute, Link } from '@tanstack/react-router';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { ForgeButton } from '@/components/forge/ForgeButton';
import { useAuthStore } from '@/stores/auth';

export const Route = createFileRoute('/unauthorized')({
  component: UnauthorizedPage,
});

function UnauthorizedPage() {
  const { user, currentWorkspace } = useAuthStore();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[var(--df-background)] p-6 text-center text-white">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-400 border border-red-500/20 mb-6 shadow-2xl animate-fadeIn">
        <ShieldAlert className="h-10 w-10" />
      </div>

      <span className="text-xs font-mono font-semibold text-red-400 uppercase tracking-widest mb-2">
        403 Forbidden Access
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
        Access Denied by Role Policy
      </h1>

      <p className="mt-3 text-xs sm:text-sm text-[var(--df-muted-foreground)] max-w-md leading-relaxed">
        Your current role (
        <span className="font-semibold text-white uppercase">
          {user?.workspaceRole || user?.role || 'Guest'}
        </span>
        ) in workspace{' '}
        <span className="font-semibold text-white">{currentWorkspace?.name || 'DevForge'}</span>{' '}
        does not have permissions to access this page or resource.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link to="/">
          <ForgeButton variant="primary" size="md" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Return to Dashboard
          </ForgeButton>
        </Link>
        <Link to="/login">
          <ForgeButton variant="outline" size="md">
            Switch Account
          </ForgeButton>
        </Link>
      </div>
    </div>
  );
}
