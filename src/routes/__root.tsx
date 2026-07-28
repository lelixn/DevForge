import { createRootRouteWithContext, Outlet, useLocation } from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { NotFound } from '@/components/not-found';
import { ErrorBoundary } from '@/components/error-boundary';
import { LoadingFallback } from '@/components/loading-fallback';
import { Toaster } from '@/components/ui/sonner';
import { AppShell } from '@/layouts/app-shell';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ({ error, reset }) => <ErrorBoundary error={error} reset={reset} />,
  pendingComponent: LoadingFallback,
});

// Routes that manage their own standalone layout (Landing, Auth, Onboarding, Errors)
const STANDALONE_ROUTES = [
  '/landing',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/onboarding/create-workspace',
  '/onboarding/invite-members',
  '/unauthorized',
  '/session-expired',
];

function RootComponent() {
  const location = useLocation();
  const isStandalone = STANDALONE_ROUTES.some(
    (path) => location.pathname === path || location.pathname.startsWith(path + '/')
  );

  return (
    <>
      {isStandalone ? <Outlet /> : <AppShell />}
      <Toaster position="bottom-right" closeButton />
    </>
  );
}
