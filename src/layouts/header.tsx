import { useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { Bell, Sun, Moon, Settings, LogOut, User, Menu, Sparkles, Terminal } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useSidebarStore } from '@/stores/sidebar';
import { ForgeAvatar } from '@/components/forge/ForgeAvatar';
import { ForgeBadge } from '@/components/forge/ForgeBadge';
import { ForgeButton } from '@/components/forge/ForgeButton';
import { ForgeSearch } from '@/components/forge/ForgeSearch';
import { ForgeCommand } from '@/components/forge/ForgeCommand';
import { ForgeDropdown } from '@/components/forge/ForgeDropdown';

const PATH_MAP: Record<string, string> = {
  '/': 'Dashboard Overview',
  '/projects': 'Projects & Workflows',
  '/teams': 'Team Management',
  '/tasks': 'Engineering Backlog',
  '/ai': 'Forge AI Intelligence',
  '/api-workspace': 'API Workspace & Graph',
  '/documentation': 'System Documentation',
  '/analytics': 'Performance Analytics',
  '/settings': 'Workspace Settings',
  '/notifications': 'Notification Center',
  '/profile': 'Engineer Profile',
};

export function Header() {
  const [commandOpen, setCommandOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { setMobileOpen } = useSidebarStore();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const pageTitle = PATH_MAP[currentPath] || 'Engineering Workspace';

  const profileMenuItems = [
    {
      id: 'profile',
      label: 'Engineer Profile',
      icon: <User className="h-4 w-4" />,
      onClick: () => (window.location.href = '/profile'),
    },
    {
      id: 'settings',
      label: 'Workspace Settings',
      icon: <Settings className="h-4 w-4" />,
      onClick: () => (window.location.href = '/settings'),
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: <LogOut className="h-4 w-4" />,
      danger: true,
      onClick: () => (window.location.href = '/login'),
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 flex h-[72px] w-full items-center justify-between border-b border-[var(--df-border)] bg-[#07070A]/85 px-6 backdrop-blur-md transition-all">
        {/* Left: Mobile Toggle & Route Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--df-border)] bg-[var(--df-surface)] text-[var(--df-muted-foreground)] hover:text-white lg:hidden cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--df-muted-foreground)]">DEVFORGE /</span>
            <h1 className="text-sm font-semibold text-white tracking-tight font-sans">
              {pageTitle}
            </h1>
            <ForgeBadge variant="cyan" size="sm" mono className="hidden sm:inline-flex">
              LIVE
            </ForgeBadge>
          </div>
        </div>

        {/* Center: Command Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <ForgeSearch onCommandOpen={() => setCommandOpen(true)} />
        </div>

        {/* Right: Quick Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick AI Trigger */}
          <ForgeButton
            variant="gradient"
            size="sm"
            leftIcon={<Sparkles className="h-3.5 w-3.5" />}
            onClick={() => (window.location.href = '/ai')}
            className="hidden sm:inline-flex"
          >
            Forge AI
          </ForgeButton>

          {/* Quick Command Trigger Button */}
          <button
            onClick={() => setCommandOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--df-border)] bg-[var(--df-surface)] text-[var(--df-muted-foreground)] hover:border-[var(--df-border-strong)] hover:text-white transition-colors cursor-pointer md:hidden"
          >
            <Terminal className="h-4 w-4" />
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => (window.location.href = '/notifications')}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--df-border)] bg-[var(--df-surface)] text-[var(--df-muted-foreground)] hover:border-[var(--df-border-strong)] hover:text-white transition-colors cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[var(--df-accent)] shadow-[0_0_8px_#06B6D4]" />
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--df-border)] bg-[var(--df-surface)] text-[var(--df-muted-foreground)] hover:border-[var(--df-border-strong)] hover:text-white transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <div className="h-5 w-px bg-[var(--df-border)] mx-1" />

          {/* Profile Dropdown */}
          <ForgeDropdown
            trigger={
              <button className="flex items-center gap-2 cursor-pointer outline-none">
                <ForgeAvatar name="Alex Mercer" status="online" size="sm" glow />
              </button>
            }
            items={profileMenuItems}
          />
        </div>
      </header>

      {/* Command Palette Modal */}
      <ForgeCommand isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}

export const ForgeNavbar = Header;
