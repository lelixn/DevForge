import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/utils/cn';

interface LoadingSkeletonProps {
  variant?: 'page' | 'card' | 'list' | 'table' | 'stat';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ variant = 'card', count = 1, className }: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (variant === 'stat') {
    return (
      <div className={cn('grid grid-cols-2 gap-4 lg:grid-cols-4', className)}>
        {items.map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] p-5"
          >
            <Skeleton className="mb-3 h-3 w-24 shimmer" />
            <Skeleton className="mb-2 h-7 w-32 shimmer" />
            <Skeleton className="h-3 w-16 shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {items.map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] p-3"
          >
            <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full shimmer" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-3/5 shimmer" />
              <Skeleton className="h-2.5 w-2/5 shimmer" />
            </div>
            <Skeleton className="h-5 w-14 rounded-full shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div
        className={cn(
          'rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] overflow-hidden',
          className
        )}
      >
        <div className="border-b border-[var(--df-border)] bg-[var(--df-secondary)]/50 p-4">
          <div className="flex gap-4">
            {[40, 25, 20, 15].map((w, i) => (
              <Skeleton key={i} className={`h-3 shimmer`} style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        {items.map((_, i) => (
          <div key={i} className="border-b border-[var(--df-border)] p-4 last:border-0">
            <div className="flex items-center gap-4">
              {[40, 25, 20, 15].map((w, j) => (
                <Skeleton key={j} className="h-3 shimmer" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'page') {
    return (
      <div className={cn('flex flex-col gap-6 p-6', className)}>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="mb-2 h-6 w-48 shimmer" />
            <Skeleton className="h-4 w-72 shimmer" />
          </div>
          <Skeleton className="h-9 w-28 rounded-xl shimmer" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] p-5"
            >
              <Skeleton className="mb-3 h-3 w-24 shimmer" />
              <Skeleton className="h-7 w-32 shimmer" />
            </div>
          ))}
        </div>
        <Skeleton className="h-64 w-full rounded-2xl shimmer" />
      </div>
    );
  }

  // default: card
  return (
    <div className={cn('grid gap-4', className)}>
      {items.map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] p-5"
        >
          <div className="mb-4 flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl shimmer" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-3/5 shimmer" />
              <Skeleton className="h-3 w-2/5 shimmer" />
            </div>
          </div>
          <Skeleton className="mb-2 h-3 w-full shimmer" />
          <Skeleton className="h-3 w-4/5 shimmer" />
        </div>
      ))}
    </div>
  );
}
