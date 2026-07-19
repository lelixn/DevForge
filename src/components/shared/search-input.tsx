import * as React from 'react';
import { cn } from '@/utils/cn';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  shortcut?: string;
  wrapperClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, icon, shortcut, wrapperClassName, placeholder = 'Search...', ...props }, ref) => {
    return (
      <div className={cn('relative flex items-center', wrapperClassName)}>
        {icon && (
          <span className="pointer-events-none absolute left-3 flex items-center text-[var(--df-muted-fg)] [&_svg]:h-4 [&_svg]:w-4">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-xl border border-[var(--df-border)] bg-[var(--df-input)] py-2 text-sm text-[var(--df-fg)] placeholder:text-[var(--df-muted-fg)] transition-all duration-150',
            'focus:border-[var(--df-border-focus)] focus:bg-[var(--df-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--df-primary)]/20',
            'hover:border-[var(--df-border-strong)]',
            icon ? 'pl-9' : 'pl-3',
            shortcut ? 'pr-14' : 'pr-3',
            className
          )}
          {...props}
        />
        {shortcut && (
          <kbd className="pointer-events-none absolute right-2.5 flex items-center gap-0.5 rounded-md border border-[var(--df-border)] bg-[var(--df-secondary)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--df-muted-fg)]">
            {shortcut}
          </kbd>
        )}
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';
