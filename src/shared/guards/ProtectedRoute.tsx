import { Navigate, useLocation } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';
import { LoadingFallback } from '@/components/loading-fallback';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requireWorkspace?: boolean;
}

export function ProtectedRoute({ children, requireWorkspace = false }: ProtectedRouteProps) {
  const { isAuthenticated, isInitialized, currentWorkspace } = useAuthStore();
  const location = useLocation();

  if (!isInitialized) {
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" search={{ redirect: location.pathname }} replace />;
  }

  if (requireWorkspace && !currentWorkspace) {
    return <Navigate to="/onboarding/create-workspace" replace />;
  }

  return <>{children}</>;
}

export const RequireAuth = ProtectedRoute;
