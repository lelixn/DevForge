import { Link } from '@tanstack/react-router';
import { Compass, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="h-10 w-10 animate-bounce" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">404</h1>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
        Workspace Not Found
      </h2>
      <p className="mt-4 max-w-md text-base text-muted-foreground">
        The coordinates you requested do not point to any active module in DevForge. Check the URL
        or return home.
      </p>
      <div className="mt-8">
        <Button asChild className="gap-2">
          <Link to="/">
            <Home className="h-4 w-4" />
            Go to Console
          </Link>
        </Button>
      </div>
    </div>
  );
}
