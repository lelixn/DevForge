import { RoleRoute } from './RoleRoute';

export interface AdminRouteProps {
  children: React.ReactNode;
  fallbackTo?: string;
}

export function AdminRoute({ children, fallbackTo = '/unauthorized' }: AdminRouteProps) {
  return (
    <RoleRoute role={['owner', 'admin']} fallbackTo={fallbackTo}>
      {children}
    </RoleRoute>
  );
}
