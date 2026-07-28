import type { ReactNode } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/utils/cn';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ForgeDropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'start' | 'center' | 'end';
}

const ForgeDropdown = ({ trigger, items, align = 'end' }: ForgeDropdownProps) => {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align={align}
          sideOffset={6}
          className="z-50 min-w-[200px] overflow-hidden rounded-2xl border border-[var(--df-border-strong)] bg-[#101014] p-1.5 shadow-[var(--df-shadow-elevated)] backdrop-blur-lg animate-in fade-in-0 zoom-in-95"
        >
          {items.map((item) => (
            <DropdownMenuPrimitive.Item
              key={item.id}
              disabled={item.disabled}
              onClick={item.onClick}
              className={cn(
                'relative flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium outline-none transition-colors cursor-pointer select-none',
                item.danger
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-[var(--df-muted-foreground)] hover:bg-[rgba(255,255,255,0.06)] hover:text-white',
                item.disabled && 'pointer-events-none opacity-40'
              )}
            >
              <div className="flex items-center gap-2.5">
                {item.icon && <span className="h-4 w-4 shrink-0 text-current">{item.icon}</span>}
                <span>{item.label}</span>
              </div>
              {item.shortcut && (
                <span className="font-mono text-[10px] text-[var(--df-muted-foreground)] opacity-75">
                  {item.shortcut}
                </span>
              )}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
};

export { ForgeDropdown };
