import { Navigate } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';

interface RequireGuestProps {
  children: React.ReactNode;
}

export function RequireGuest({ children }: RequireGuestProps) {
  const { isAuthenticated, currentWorkspace } = useAuthStore();

  if (isAuthenticated) {
    if (!currentWorkspace) {
      return <Navigate to="/onboarding/create-workspace" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
