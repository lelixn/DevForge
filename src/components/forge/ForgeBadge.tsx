import { cn } from '@/utils/cn';

type ForgeBadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
type ForgeBadgeSize = 'sm' | 'md';

interface ForgeBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ForgeBadgeVariant;
  size?: ForgeBadgeSize;
  dot?: boolean;
}

const ForgeBadge = ({
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  ...props
}: ForgeBadgeProps) => {
  const variantStyles: Record<ForgeBadgeVariant, string> = {
    primary: 'bg-[var(--df-primary)]/15 text-[var(--df-primary-light)]',
    secondary: 'bg-[var(--df-muted)] text-[var(--df-muted-foreground)]',
    success: 'bg-[var(--df-success)]/15 text-[var(--df-success)]',
    warning: 'bg-[var(--df-warning)]/15 text-[var(--df-warning)]',
    danger: 'bg-[var(--df-danger)]/15 text-[var(--df-danger)]',
    default: 'bg-[var(--df-muted)] text-[var(--df-muted-foreground)]',
  };

  const sizeStyles: Record<ForgeBadgeSize, string> = {
    sm: 'h-5 px-2 text-[10px]',
    md: 'h-6 px-2.5 text-xs',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium transition-all',
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'primary' && 'bg-[var(--df-primary)]',
            variant === 'success' && 'bg-[var(--df-success)]',
            variant === 'warning' && 'bg-[var(--df-warning)]',
            variant === 'danger' && 'bg-[var(--df-danger)]',
            (variant === 'default' || variant === 'secondary') && 'bg-[var(--df-muted-foreground)]',
          )}
        />
      )}
      {props.children}
    </div>
  );
};

export { ForgeBadge };
