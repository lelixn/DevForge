import { createRootRouteWithContext } from '@tanstack/react-router';
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

function RootComponent() {
  return (
    <>
      <AppShell />
      <Toaster position="bottom-right" closeButton />
    </>
  );
}
