import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary' | 'outline';
  size?: 'xs' | 'sm';
  className?: string;
  dot?: boolean;
}

const variants = {
  default: 'bg-[var(--df-secondary)] text-[var(--df-muted-fg)] border border-[var(--df-border)]',
  success:
    'bg-[var(--df-success)]/10 text-[var(--df-success)] border border-[var(--df-success)]/20',
  warning:
    'bg-[var(--df-warning)]/10 text-[var(--df-warning)] border border-[var(--df-warning)]/20',
  danger: 'bg-[var(--df-danger)]/10 text-[var(--df-danger)] border border-[var(--df-danger)]/20',
  primary:
    'bg-[var(--df-primary)]/10 text-[var(--df-primary)] border border-[var(--df-primary)]/20',
  outline: 'bg-transparent text-[var(--df-muted-fg)] border border-[var(--df-border)]',
};

const dotColors = {
  default: 'bg-[var(--df-muted-fg)]',
  success: 'bg-[var(--df-success)]',
  warning: 'bg-[var(--df-warning)]',
  danger: 'bg-[var(--df-danger)]',
  primary: 'bg-[var(--df-primary)]',
  outline: 'bg-[var(--df-muted-fg)]',
};

export function Badge({ children, variant = 'default', size = 'sm', className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs',
        variants[variant],
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
}

export function AvatarStack({ avatars, max = 4 }: { avatars: string[]; max?: number }) {
  const shown = avatars.slice(0, max);
  const extra = avatars.length - max;
  return (
    <div className="flex items-center">
      {shown.map((av, i) => (
        <div
          key={i}
          style={{ marginLeft: i === 0 ? 0 : -8, zIndex: shown.length - i }}
          className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--df-card)] bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)] text-[9px] font-bold text-white"
        >
          {av}
        </div>
      ))}
      {extra > 0 && (
        <div
          style={{ marginLeft: -8 }}
          className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--df-card)] bg-[var(--df-secondary)] text-[9px] font-medium text-[var(--df-muted-fg)]"
        >
          +{extra}
        </div>
      )}
    </div>
  );
}
