import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CheckSquare,
  Sparkles,
  Code2,
  BookOpen,
  BarChart3,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  Zap,
  Check,
  Cpu,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useSidebarStore, SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_EXPANDED } from '@/stores/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ForgeTooltip } from '@/components/forge/ForgeTooltip';
import { ForgeBadge } from '@/components/forge/ForgeBadge';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  to: string;
  badge?: string | number;
  badgeVariant?: 'primary' | 'cyan' | 'success';
}

const WORKSPACES = [
  { name: 'Engineering Core', plan: 'Enterprise', active: true },
  { name: 'Design System', plan: 'Pro', active: false },
  { name: 'Infra Cluster A', plan: 'Internal', active: false },
];

const NAV_SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: 'OVERVIEW',
    items: [{ label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, to: '/' }],
  },
  {
    title: 'ENGINEERING',
    items: [
      {
        label: 'Projects',
        icon: <FolderKanban className="h-4 w-4" />,
        to: '/projects',
        badge: 14,
        badgeVariant: 'primary',
      },
      { label: 'Teams', icon: <Users className="h-4 w-4" />, to: '/teams' },
      { label: 'Tasks', icon: <CheckSquare className="h-4 w-4" />, to: '/tasks', badge: 247 },
    ],
  },
  {
    title: 'INTELLIGENCE & API',
    items: [
      {
        label: 'AI Workspace',
        icon: <Sparkles className="h-4 w-4" />,
        to: '/ai',
        badge: 'AI',
        badgeVariant: 'cyan',
      },
      { label: 'API Workspace', icon: <Code2 className="h-4 w-4" />, to: '/api-workspace' },
      { label: 'Documentation', icon: <BookOpen className="h-4 w-4" />, to: '/documentation' },
      { label: 'Analytics', icon: <BarChart3 className="h-4 w-4" />, to: '/analytics' },
    ],
  },
  {
    title: 'SYSTEM',
    items: [{ label: 'Settings', icon: <Settings className="h-4 w-4" />, to: '/settings' }],
  },
];

function WorkspaceSwitcher({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false);
  const active = WORKSPACES.find((w) => w.active)!;

  if (collapsed) {
    return (
      <div className="px-3 pt-4 pb-2 flex justify-center shrink-0">
        <ForgeTooltip content={`Workspace: ${active.name}`} side="right">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(124,58,237,0.4)] bg-[rgba(124,58,237,0.15)] shadow-[0_0_20px_rgba(124,58,237,0.25)] hover:scale-105 transition-all cursor-pointer"
          >
            <Zap className="h-5 w-5 text-[var(--df-accent)]" />
          </button>
        </ForgeTooltip>
      </div>
    );
  }

  return (
    <div className="relative px-4 pt-4">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between rounded-2xl border border-[var(--df-border)] bg-[var(--df-surface)] p-3 text-left transition-all hover:border-[var(--df-border-strong)] hover:bg-[var(--df-surface-elevated)] group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] text-[var(--df-accent)] shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-tight leading-none">
                {active.name}
              </span>
              <ForgeBadge variant="cyan" size="sm" mono className="text-[9px] py-0 px-1.5 h-4">
                {active.plan}
              </ForgeBadge>
            </div>
            <span className="text-[10px] font-mono text-[var(--df-muted-foreground)]">
              DEVFORGE // SYS_01
            </span>
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-[var(--df-muted-foreground)] group-hover:text-white transition-transform" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-4 right-4 top-full z-50 mt-2 rounded-2xl border border-[var(--df-border-strong)] bg-[#101014] p-1.5 shadow-[var(--df-shadow-elevated)] backdrop-blur-md"
          >
            {WORKSPACES.map((w) => (
              <button
                key={w.name}
                type="button"
                onClick={() => setOpen(false)}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer',
                  w.active
                    ? 'bg-[rgba(124,58,237,0.15)] text-white'
                    : 'text-[var(--df-muted-foreground)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
                )}
              >
                <span>{w.name}</span>
                {w.active && <Check className="h-3.5 w-3.5 text-[var(--df-accent)]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar() {
  const { collapsed, mobileOpen, toggle, setMobileOpen } = useSidebarStore();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        style={{
          width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        }}
        className={cn(
          'fixed bottom-0 top-0 left-0 z-40 flex flex-col border-r border-[var(--df-border)] bg-[#07070A] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-[72px] items-center justify-between px-4 border-b border-[var(--df-border)] shrink-0">
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--df-gradient-primary)] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] shrink-0">
              <Cpu className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-white tracking-wide font-sans">
                  DEV<span className="text-[var(--df-accent)]">FORGE</span>
                </span>
                <span className="text-[9px] font-mono text-[var(--df-muted-foreground)] tracking-widest uppercase">
                  ENGINEERING OS
                </span>
              </div>
            )}
          </Link>

          {!collapsed && (
            <button
              onClick={toggle}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--df-muted-foreground)] hover:bg-[rgba(255,255,255,0.06)] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Workspace Switcher */}
        <WorkspaceSwitcher collapsed={collapsed} />

        {/* Navigation Sections */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-6">
            {NAV_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-1">
                {!collapsed && (
                  <h4 className="px-3 text-[10px] font-mono font-semibold tracking-wider text-[var(--df-muted-foreground)] uppercase mb-2">
                    {section.title}
                  </h4>
                )}

                {section.items.map((item) => {
                  const isActive =
                    item.to === '/' ? currentPath === '/' : currentPath.startsWith(item.to);

                  const content = (
                    <Link
                      key={item.to}
                      to={item.to as any}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer group',
                        collapsed && 'justify-center px-0 py-3',
                        isActive
                          ? 'text-white bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.3)] shadow-[0_0_20px_rgba(124,58,237,0.15)] font-semibold'
                          : 'text-[var(--df-muted-foreground)] hover:bg-[rgba(255,255,255,0.05)] hover:text-white'
                      )}
                    >
                      {/* Active Indicator Glow Bar */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-indicator"
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[var(--df-accent)] shadow-[0_0_10px_#06B6D4]"
                        />
                      )}

                      <span
                        className={cn(
                          'transition-colors',
                          isActive
                            ? 'text-[var(--df-accent)]'
                            : 'group-hover:text-[var(--df-primary-light)]'
                        )}
                      >
                        {item.icon}
                      </span>

                      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}

                      {!collapsed && item.badge !== undefined && (
                        <ForgeBadge variant={item.badgeVariant || 'default'} size="sm" mono>
                          {item.badge}
                        </ForgeBadge>
                      )}
                    </Link>
                  );

                  if (collapsed) {
                    return (
                      <ForgeTooltip key={item.to} content={item.label} side="right">
                        {content}
                      </ForgeTooltip>
                    );
                  }

                  return content;
                })}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Collapsed Expand Toggle Footer */}
        {collapsed && (
          <div className="p-3 border-t border-[var(--df-border)] flex justify-center">
            <button
              onClick={toggle}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--df-muted-foreground)] hover:bg-[rgba(255,255,255,0.06)] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export const ForgeSidebar = Sidebar;
