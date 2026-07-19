import { cn } from '@/utils/cn';

interface DataTableContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function DataTableContainer({ children, className }: DataTableContainerProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)]',
        className
      )}
    >
      {children}
    </div>
  );
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <div
      className={cn(
        'border-b border-[var(--df-border)] bg-[var(--df-secondary)]/40 px-4 py-3',
        className
      )}
    >
      {children}
    </div>
  );
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={cn(
        'border-b border-[var(--df-border)] px-4 py-3 last:border-0 transition-colors duration-100',
        onClick && 'cursor-pointer hover:bg-[var(--df-secondary)]/40',
        className
      )}
    >
      {children}
    </div>
  );
}
