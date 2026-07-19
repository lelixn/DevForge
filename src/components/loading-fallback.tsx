export function LoadingFallback() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 p-8">
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin" />
        <div className="h-6 w-6 rounded-full border-4 border-muted border-b-primary animate-pulse" />
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Forging workspace...
      </p>
    </div>
  );
}
