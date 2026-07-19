import { cn } from '@/utils/cn';

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

export function Toolbar({ children, className }: ToolbarProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] px-3 py-2',
        className
      )}
    >
      {children}
    </div>
  );
}

interface ToolbarDividerProps {
  className?: string;
}
export function ToolbarDivider({ className }: ToolbarDividerProps) {
  return <div className={cn('h-4 w-px bg-[var(--df-border)]', className)} />;
}
