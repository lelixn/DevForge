import { Navigate, useLocation } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requireWorkspace?: boolean;
}

export function ProtectedRoute({ children, requireWorkspace = false }: ProtectedRouteProps) {
  const { isAuthenticated, currentWorkspace } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" search={{ redirect: location.pathname }} replace />;
  }

  if (requireWorkspace && !currentWorkspace) {
    return <Navigate to="/onboarding/create-workspace" replace />;
  }

  return <>{children}</>;
}

export const RequireAuth = ProtectedRoute;
