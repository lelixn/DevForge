import { cn } from '@/utils/cn';

export type ForgeBadgeVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'cyan'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline'
  | 'default';

export type ForgeBadgeSize = 'sm' | 'md' | 'lg';

export interface ForgeBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ForgeBadgeVariant;
  size?: ForgeBadgeSize;
  dot?: boolean;
  pulse?: boolean;
  mono?: boolean;
}

const ForgeBadge = ({
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  pulse = false,
  mono = false,
  children,
  ...props
}: ForgeBadgeProps) => {
  const variantStyles: Record<ForgeBadgeVariant, string> = {
    primary:
      'bg-[rgba(124,58,237,0.15)] text-[#A78BFA] border border-[rgba(124,58,237,0.3)] shadow-[0_0_10px_rgba(124,58,237,0.15)]',
    secondary:
      'bg-[rgba(255,255,255,0.06)] text-[var(--df-muted-foreground)] border border-[rgba(255,255,255,0.08)]',
    accent: 'bg-[rgba(79,70,229,0.15)] text-[#818CF8] border border-[rgba(79,70,229,0.3)]',
    cyan: 'bg-[rgba(6,182,212,0.15)] text-[#22D3EE] border border-[rgba(6,182,212,0.3)] shadow-[0_0_10px_rgba(6,182,212,0.15)]',
    success: 'bg-[rgba(16,185,129,0.15)] text-[#34D399] border border-[rgba(16,185,129,0.3)]',
    warning: 'bg-[rgba(245,158,11,0.15)] text-[#FBBF24] border border-[rgba(245,158,11,0.3)]',
    danger: 'bg-[rgba(239,68,68,0.15)] text-[#F87171] border border-[rgba(239,68,68,0.3)]',
    outline: 'bg-transparent text-[var(--df-foreground)] border border-[var(--df-border-strong)]',
    default:
      'bg-[var(--df-surface-elevated)] text-[var(--df-muted-foreground)] border border-[var(--df-border)]',
  };

  const sizeStyles: Record<ForgeBadgeSize, string> = {
    sm: 'h-5 px-2 text-[10px]',
    md: 'h-6 px-2.5 text-xs',
    lg: 'h-7 px-3 text-xs tracking-wider uppercase',
  };

  const dotColors: Record<ForgeBadgeVariant, string> = {
    primary: 'bg-[#A78BFA]',
    secondary: 'bg-[var(--df-muted-foreground)]',
    accent: 'bg-[#818CF8]',
    cyan: 'bg-[#22D3EE]',
    success: 'bg-[#34D399]',
    warning: 'bg-[#FBBF24]',
    danger: 'bg-[#F87171]',
    outline: 'bg-white',
    default: 'bg-[var(--df-muted-foreground)]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium transition-all select-none',
        mono && 'font-mono',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                dotColors[variant]
              )}
            />
          )}
          <span className={cn('relative inline-flex h-2 w-2 rounded-full', dotColors[variant])} />
        </span>
      )}
      {children}
    </div>
  );
};

export { ForgeBadge };
