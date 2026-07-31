import { createFileRoute, Navigate } from '@tanstack/react-router';
import { ProtectedRoute } from '@/shared/guards/ProtectedRoute';

export const Route = createFileRoute('/dashboard')({
  component: () => (
    <ProtectedRoute>
      <Navigate to="/" replace />
    </ProtectedRoute>
  ),
});
