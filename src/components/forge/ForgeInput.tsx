import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ForgeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  mono?: boolean;
}

const ForgeInput = forwardRef<HTMLInputElement, ForgeInputProps>(
  ({ className, leftIcon, rightIcon, error, mono = false, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[var(--df-muted-foreground)]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={cn(
              'h-10 w-full rounded-xl border border-[var(--df-border)] bg-[var(--df-surface)] px-4 text-sm text-[var(--df-foreground)] placeholder-[var(--df-muted-foreground)] transition-all duration-200 focus:border-[var(--df-primary)] focus:bg-[var(--df-surface-elevated)] focus:outline-none focus:ring-2 focus:ring-[var(--df-primary)]/20 disabled:cursor-not-allowed disabled:opacity-40',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              mono && 'font-mono text-xs',
              error && 'border-[var(--df-danger)] focus:ring-[var(--df-danger)]/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[var(--df-muted-foreground)]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-[var(--df-danger)] font-medium">{error}</p>}
      </div>
    );
  }
);

ForgeInput.displayName = 'ForgeInput';

export { ForgeInput };
