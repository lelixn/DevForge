import type { ReactNode } from 'react';
import { Terminal, Server, Cloud, Sparkles, FolderKanban } from 'lucide-react';
import { ForgeButton } from './ForgeButton';
import { cn } from '@/utils/cn';

export type ForgeEmptyTheme = 'developer' | 'infrastructure' | 'cloud' | 'ai' | 'general';

export interface ForgeEmptyProps {
  theme?: ForgeEmptyTheme;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}

const themeIcons: Record<ForgeEmptyTheme, ReactNode> = {
  developer: <Terminal className="h-8 w-8 text-[var(--df-primary-light)]" />,
  infrastructure: <Server className="h-8 w-8 text-[var(--df-accent)]" />,
  cloud: <Cloud className="h-8 w-8 text-[#38BDF8]" />,
  ai: <Sparkles className="h-8 w-8 text-[#A78BFA]" />,
  general: <FolderKanban className="h-8 w-8 text-[var(--df-muted-foreground)]" />,
};

const ForgeEmpty = ({
  theme = 'general',
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
}: ForgeEmptyProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[24px] border border-dashed border-[var(--df-border-strong)] bg-[var(--df-surface)]/50 p-12 text-center select-none',
        className
      )}
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--df-surface-elevated)] border border-[var(--df-border)] shadow-[var(--df-shadow-sm)] mb-4">
        {icon || themeIcons[theme]}
      </div>

      <h4 className="text-base font-semibold text-white tracking-tight">{title}</h4>
      {description && (
        <p className="mt-1.5 max-w-sm text-xs text-[var(--df-muted-foreground)] font-sans leading-relaxed">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <div className="mt-6">
          <ForgeButton variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </ForgeButton>
        </div>
      )}
    </div>
  );
};

export { ForgeEmpty };
