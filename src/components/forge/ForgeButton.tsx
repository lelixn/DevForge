import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

type ForgeButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type ForgeButtonSize = 'sm' | 'md' | 'lg';

interface ForgeButtonProps extends HTMLMotionProps<'button'> {
  variant?: ForgeButtonVariant;
  size?: ForgeButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  glow?: boolean;
}

const ForgeButton = forwardRef<HTMLButtonElement, ForgeButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      glow,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none';

    const sizeStyles: Record<ForgeButtonSize, string> = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    const variantStyles: Record<ForgeButtonVariant, string> = {
      primary:
        'bg-[var(--df-gradient-primary)] text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-[var(--df-primary)]',
      secondary:
        'bg-[var(--df-card)] text-[var(--df-foreground)] border border-[var(--df-border)] hover:bg-[rgba(148,163,184,0.08)] hover:border-[var(--df-border-strong)]',
      ghost:
        'text-[var(--df-muted-foreground)] hover:bg-[rgba(148,163,184,0.08)] hover:text-[var(--df-foreground)]',
      outline:
        'border border-[var(--df-border)] text-[var(--df-foreground)] hover:bg-[rgba(148,163,184,0.08)]',
      danger:
        'bg-[var(--df-danger)] text-white hover:bg-opacity-90 shadow-md hover:shadow-lg focus-visible:ring-[var(--df-danger)]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          glow && 'shadow-[var(--df-shadow-glow)]',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>
            {leftIcon && leftIcon}
            {children}
            {rightIcon && rightIcon}
          </>
        )}
      </motion.button>
    );
  }
);

ForgeButton.displayName = 'ForgeButton';

export { ForgeButton };
