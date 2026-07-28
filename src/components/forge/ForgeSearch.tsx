import { useState } from 'react';
import { Search, Command, X } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ForgeSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onCommandOpen?: () => void;
  className?: string;
}

const ForgeSearch = ({
  placeholder = 'Search projects, tasks, services... (⌘K)',
  onSearch,
  onCommandOpen,
  className,
}: ForgeSearchProps) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (onSearch) onSearch(val);
  };

  const handleClear = () => {
    setValue('');
    if (onSearch) onSearch('');
  };

  return (
    <div
      onClick={onCommandOpen}
      className={cn(
        'group relative flex h-10 w-full max-w-md items-center rounded-xl border border-[var(--df-border)] bg-[var(--df-surface)] px-3.5 transition-all duration-200 hover:border-[var(--df-border-strong)] focus-within:border-[var(--df-primary)] focus-within:ring-2 focus-within:ring-[var(--df-primary)]/20 cursor-pointer',
        className
      )}
    >
      <Search className="h-4 w-4 text-[var(--df-muted-foreground)] group-hover:text-white transition-colors shrink-0" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-full w-full bg-transparent px-2.5 text-xs text-white placeholder-[var(--df-muted-foreground)] focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
          className="text-[var(--df-muted-foreground)] hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : (
        <div className="flex items-center gap-1 rounded bg-[var(--df-surface-elevated)] border border-[var(--df-border)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--df-muted-foreground)] shrink-0">
          <Command className="h-3 w-3" />
          <span>K</span>
        </div>
      )}
    </div>
  );
};

export { ForgeSearch };
