import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type ErrorBoundaryProps = {
  error: Error;
  reset?: () => void;
};

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center p-6">
      <Card className="max-w-md w-full border-destructive/20 shadow-destructive/5 glass-panel">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight text-destructive">
            An error occurred
          </CardTitle>
          <CardDescription>DevForge encountered a problem rendering this page.</CardDescription>
        </CardHeader>
        <CardContent className="bg-muted/50 rounded-lg p-4 border border-border/50 max-h-40 overflow-y-auto">
          <p className="text-xs font-mono text-destructive break-words">
            {error.message || 'Unknown runtime error'}
          </p>
          {error.stack && (
            <pre className="text-[10px] font-mono text-muted-foreground mt-2 overflow-x-auto whitespace-pre">
              {error.stack}
            </pre>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4 pt-6">
          {reset && (
            <Button variant="outline" onClick={reset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          <Button onClick={() => window.location.reload()}>Reload App</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
