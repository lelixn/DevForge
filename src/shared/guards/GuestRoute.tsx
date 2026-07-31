import { Navigate } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';

export interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, currentWorkspace } = useAuthStore();

  if (isAuthenticated) {
    if (!currentWorkspace) {
      return <Navigate to="/onboarding/create-workspace" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export const RequireGuest = GuestRoute;
