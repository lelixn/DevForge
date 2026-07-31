import { Navigate } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';
import type { UserRole, Permission } from '@/shared/types/auth.types';

export interface RoleRouteProps {
  children: React.ReactNode;
  role?: UserRole | UserRole[];
  permission?: Permission | Permission[];
  fallbackTo?: string;
}

export function RoleRoute({
  children,
  role,
  permission,
  fallbackTo = '/unauthorized',
}: RoleRouteProps) {
  const { isAuthenticated, hasRole, hasPermission } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  let isAuthorized = true;

  if (role) {
    isAuthorized = hasRole(role);
  }

  if (isAuthorized && permission) {
    isAuthorized = hasPermission(permission);
  }

  if (!isAuthorized) {
    return <Navigate to={fallbackTo as string} replace />;
  }

  return <>{children}</>;
}

export const RequireRole = RoleRoute;
