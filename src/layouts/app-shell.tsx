import { useState, useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { CommandPalette } from './command-palette';

interface AppShellProps {
  breadcrumb?: { label: string; href?: string }[];
}

export function AppShell({ breadcrumb }: AppShellProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  // Global keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((p) => !p);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-screen w-full overflow-hidden bg-[var(--df-bg)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <Header breadcrumb={breadcrumb} />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>

        {/* Command Palette — global overlay */}
        <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      </div>
    </TooltipProvider>
  );
}
