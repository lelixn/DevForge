import { Navigate } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';
import { LoadingFallback } from '@/components/loading-fallback';

export interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isInitialized, currentWorkspace } = useAuthStore();

  if (!isInitialized) {
    return <LoadingFallback />;
  }

  if (isAuthenticated) {
    if (!currentWorkspace) {
      return <Navigate to="/onboarding/create-workspace" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export const RequireGuest = GuestRoute;
