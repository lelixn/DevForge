import { Navigate } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth';
import type { UserRole, Permission } from '@/shared/types/auth.types';

interface RequireRoleProps {
  children: React.ReactNode;
  role?: UserRole | UserRole[];
  permission?: Permission | Permission[];
  fallbackTo?: string;
}

export function RequireRole({
  children,
  role,
  permission,
  fallbackTo = '/unauthorized',
}: RequireRoleProps) {
  const { hasRole, hasPermission } = useAuthStore();

  let isAuthorized = true;

  if (role) {
    isAuthorized = hasRole(role);
  }

  if (isAuthorized && permission) {
    if (Array.isArray(permission)) {
      isAuthorized = permission.every((p) => hasPermission(p));
    } else {
      isAuthorized = hasPermission(permission);
    }
  }

  if (!isAuthorized) {
    return <Navigate to={fallbackTo as any} replace />;
  }

  return <>{children}</>;
}
