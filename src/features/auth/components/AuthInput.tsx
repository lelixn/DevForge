import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex w-full flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor={inputId} className="text-xs font-semibold text-slate-200 tracking-wide">
            {label}
          </label>
          {error && (
            <span className="text-[11px] font-medium text-[var(--df-danger)] animate-fadeIn">
              {error}
            </span>
          )}
        </div>

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3.5 text-[var(--df-muted-foreground)] pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'h-11 w-full rounded-xl border bg-[var(--df-input)] px-4 py-2 text-sm text-[var(--df-foreground)] placeholder-[var(--df-muted-foreground)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--df-ring)] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error
                ? 'border-[var(--df-danger)] focus-visible:ring-[var(--df-danger)]'
                : 'border-[var(--df-border)] hover:border-[var(--df-border-strong)]',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3.5 text-[var(--df-muted-foreground)]">
              {rightIcon}
            </span>
          )}
        </div>

        {helperText && !error && (
          <p className="text-[11px] text-[var(--df-muted-foreground)]">{helperText}</p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';
