import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export type ForgeButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'danger'
  | 'gradient'
  | 'icon'
  | 'floating'
  | 'command';

export type ForgeButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

export interface ForgeButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ForgeButtonVariant;
  size?: ForgeButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  glow?: boolean;
  badge?: string | number;
  children?: React.ReactNode;
}

const ForgeButton = forwardRef<HTMLButtonElement, ForgeButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      glow = false,
      badge,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--df-primary)] disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer overflow-hidden';

    const sizeStyles: Record<ForgeButtonSize, string> = {
      xs: 'h-7 px-2.5 text-xs rounded-lg',
      sm: 'h-8 px-3 text-xs rounded-lg',
      md: 'h-10 px-4 text-sm rounded-xl',
      lg: 'h-12 px-6 text-base rounded-xl',
      icon: 'h-10 w-10 p-0 rounded-xl',
    };

    const variantStyles: Record<ForgeButtonVariant, string> = {
      primary:
        'bg-[var(--df-primary)] text-[var(--df-primary-foreground)] shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:bg-[var(--df-primary-light)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] border border-[rgba(255,255,255,0.15)]',
      secondary:
        'bg-[var(--df-surface-elevated)] text-[var(--df-foreground)] border border-[var(--df-border)] hover:border-[var(--df-border-strong)] hover:bg-[rgba(255,255,255,0.06)] shadow-sm',
      ghost:
        'text-[var(--df-muted-foreground)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--df-foreground)]',
      outline:
        'border border-[var(--df-border-strong)] bg-transparent text-[var(--df-foreground)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[var(--df-primary)]',
      danger:
        'bg-[var(--df-danger)] text-white hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)] border border-[rgba(255,255,255,0.1)]',
      gradient:
        'bg-[var(--df-gradient-accent)] text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:brightness-110 border border-[rgba(255,255,255,0.2)]',
      icon: 'bg-[var(--df-surface)] text-[var(--df-muted-foreground)] border border-[var(--df-border)] hover:text-[var(--df-foreground)] hover:border-[var(--df-border-strong)] hover:bg-[var(--df-surface-elevated)]',
      floating:
        'bg-[var(--df-surface-elevated)] text-[var(--df-foreground)] border border-[rgba(255,255,255,0.12)] shadow-[var(--df-shadow-elevated)] backdrop-blur-md hover:border-[var(--df-primary)]',
      command:
        'bg-[var(--df-surface)] text-[var(--df-foreground)] border border-[var(--df-border)] hover:border-[var(--df-accent)] justify-between text-xs font-mono text-[var(--df-muted-foreground)]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          glow && 'shadow-[var(--df-shadow-glow)] border-[var(--df-primary)]',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children && <span>{children}</span>}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
            {badge !== undefined && (
              <span className="ml-1.5 rounded-full bg-[rgba(255,255,255,0.15)] px-1.5 py-0.5 text-[10px] font-mono text-current">
                {badge}
              </span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

ForgeButton.displayName = 'ForgeButton';

export { ForgeButton };
