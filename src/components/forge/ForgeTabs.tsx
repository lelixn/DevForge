import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  count?: number | string;
  badge?: string;
}

export interface ForgeTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'pill' | 'underline';
  className?: string;
}

const ForgeTabs = ({ tabs, activeTab, onChange, variant = 'pill', className }: ForgeTabsProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 overflow-x-auto p-1 select-none',
        variant === 'pill' && 'rounded-xl border border-[var(--df-border)] bg-[var(--df-surface)]',
        variant === 'underline' && 'border-b border-[var(--df-border)] gap-6 p-0 rounded-none',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer',
              variant === 'pill' && 'rounded-lg',
              isActive ? 'text-white' : 'text-[var(--df-muted-foreground)] hover:text-white'
            )}
          >
            {isActive && variant === 'pill' && (
              <motion.div
                layoutId="forge-tab-pill"
                className="absolute inset-0 rounded-lg bg-[var(--df-surface-elevated)] border border-[var(--df-border-strong)] shadow-sm z-0"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}

            {isActive && variant === 'underline' && (
              <motion.div
                layoutId="forge-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--df-primary)] z-0"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}

            <span className="relative z-10">{tab.label}</span>

            {tab.count !== undefined && (
              <span
                className={cn(
                  'relative z-10 rounded-full px-1.5 py-0.2 text-[10px] font-mono',
                  isActive
                    ? 'bg-[rgba(124,58,237,0.25)] text-[#A78BFA]'
                    : 'bg-[rgba(255,255,255,0.06)] text-[var(--df-muted-foreground)]'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export { ForgeTabs };
