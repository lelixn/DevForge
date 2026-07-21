import { useState, useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { CommandPalette } from './command-palette';
import { useSidebarStore, SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_EXPANDED } from '@/stores/sidebar';

interface AppShellProps {
  breadcrumb?: { label: string; href?: string }[];
}

export function AppShell({ breadcrumb }: AppShellProps) {
  const [commandOpen, setCommandOpen] = useState(false);
  const { collapsed, mobileOpen, setMobileOpen } = useSidebarStore();

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

  const sidebarWidth = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  useEffect(() => {
    document.documentElement.style.setProperty('--df-sidebar-offset', `${sidebarWidth}px`);
  }, [sidebarWidth]);

  return (
    <TooltipProvider delayDuration={300}>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-[var(--df-background)]">
        {mobileOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <Sidebar />

        <div className="app-main flex min-h-screen min-w-0 flex-col">
          <Header breadcrumb={breadcrumb} onOpenCommand={() => setCommandOpen(true)} />

          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <Outlet />
          </main>
        </div>

        <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      </div>
    </TooltipProvider>
  );
}
