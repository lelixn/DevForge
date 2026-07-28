import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ForgeSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ForgeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: ForgeSelectOption[];
  label?: string;
  error?: string;
  mono?: boolean;
}

const ForgeSelect = forwardRef<HTMLSelectElement, ForgeSelectProps>(
  ({ className, options, label, error, mono = false, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-[var(--df-muted-foreground)]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={cn(
              'h-10 w-full appearance-none rounded-xl border border-[var(--df-border)] bg-[var(--df-surface)] px-4 pr-10 text-sm text-[var(--df-foreground)] transition-all duration-200 focus:border-[var(--df-primary)] focus:bg-[var(--df-surface-elevated)] focus:outline-none focus:ring-2 focus:ring-[var(--df-primary)]/20 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer',
              mono && 'font-mono text-xs',
              error && 'border-[var(--df-danger)]',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className="bg-[#101014] text-[var(--df-foreground)] py-2"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--df-muted-foreground)]">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-[var(--df-danger)]">{error}</p>}
      </div>
    );
  }
);

ForgeSelect.displayName = 'ForgeSelect';

export { ForgeSelect };
