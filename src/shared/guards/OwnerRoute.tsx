import { RoleRoute } from './RoleRoute';

export interface OwnerRouteProps {
  children: React.ReactNode;
  fallbackTo?: string;
}

export function OwnerRoute({ children, fallbackTo = '/unauthorized' }: OwnerRouteProps) {
  return (
    <RoleRoute role="owner" fallbackTo={fallbackTo}>
      {children}
    </RoleRoute>
  );
}
