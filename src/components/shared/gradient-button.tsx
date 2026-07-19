import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface GradientButtonProps {
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, size = 'md', icon, iconRight, isLoading, disabled, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 px-3.5 text-xs gap-1.5',
      md: 'h-9 px-4 text-sm gap-2',
      lg: 'h-11 px-6 text-sm gap-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
        className={cn(
          'relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-xl font-medium text-white transition-all duration-200',
          'bg-gradient-to-r from-[var(--df-primary)] to-[var(--df-accent)]',
          'shadow-[0_4px_16px_0_rgba(124,58,237,0.3)] hover:shadow-[0_4px_24px_0_rgba(124,58,237,0.45)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--df-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--df-bg)]',
          sizes[size],
          className
        )}
        onClick={props.onClick}
        type={props.type ?? 'button'}
        disabled={disabled || isLoading}
      >
        {/* Shimmer overlay on hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
        {isLoading ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          <>
            {icon && <span className="relative flex-shrink-0 [&_svg]:h-4 [&_svg]:w-4">{icon}</span>}
            <span className="relative">{children}</span>
            {iconRight && (
              <span className="relative flex-shrink-0 [&_svg]:h-4 [&_svg]:w-4">{iconRight}</span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);
GradientButton.displayName = 'GradientButton';
