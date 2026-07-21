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
  ChevronsUpDown,
  Check,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useSidebarStore, SIDEBAR_WIDTH_COLLAPSED, SIDEBAR_WIDTH_EXPANDED } from '@/stores/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ForgeAvatar } from '@/components/forge/ForgeAvatar';
import { ForgeBadge } from '@/components/forge/ForgeBadge';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  to: string;
  badge?: string | number;
  children?: NavItem[];
}

const WORKSPACES = [
  { name: 'Engineering', plan: 'Pro', active: true },
  { name: 'Design System', plan: 'Free', active: false },
  { name: 'Infrastructure', plan: 'Enterprise', active: false },
];

const NAV_SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Workspace',
    items: [{ label: 'Dashboard', icon: <LayoutDashboard />, to: '/' }],
  },
  {
    title: 'Build',
    items: [
      { label: 'Projects', icon: <FolderKanban />, to: '/projects', badge: 3 },
      { label: 'Teams', icon: <Users />, to: '/teams' },
      { label: 'Tasks', icon: <CheckSquare />, to: '/tasks', badge: 12 },
    ],
  },
  {
    title: 'Platform',
    items: [
      { label: 'AI Workspace', icon: <Sparkles />, to: '/ai', badge: 'New' },
      { label: 'API Workspace', icon: <Code2 />, to: '/api-workspace' },
      { label: 'Documentation', icon: <BookOpen />, to: '/documentation' },
      { label: 'Analytics', icon: <BarChart3 />, to: '/analytics' },
    ],
  },
  {
    title: 'System',
    items: [{ label: 'Settings', icon: <Settings />, to: '/settings' }],
  },
];

function WorkspaceSwitcher({ collapsed }: { collapsed: boolean }) {
  const [open, setOpen] = useState(false);
  const active = WORKSPACES.find((w) => w.active)!;

  if (collapsed) {
    return (
      <div className="px-3 pt-4 pb-2 flex justify-center flex-shrink-0">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="icon-box icon-box-md mx-auto border-[var(--df-border)] bg-[var(--df-secondary)] hover:border-[var(--df-border-strong)] hover:bg-[var(--df-subtle)] transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4 text-[var(--df-primary)]" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">{active.name}</TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return (
    <div className="relative px-3 pt-4">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center gap-3 rounded-[var(--df-radius-xl)] border border-[var(--df-border)] bg-[var(--df-secondary)] px-3 py-2.5 text-left transition-all hover:border-[var(--df-border-strong)] hover:bg-[var(--df-subtle)]"
      >
        <span className="icon-box icon-box-sm border-[var(--df-primary)]/20 bg-[var(--df-primary)]/10">
          <Zap className="h-3.5 w-3.5 text-[var(--df-primary)]" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[var(--df-foreground)]">
            {active.name}
          </p>
          <p className="truncate text-caption text-[var(--df-muted-foreground)]">
            {active.plan} plan
          </p>
        </div>
        <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-[var(--df-muted-foreground)]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-3 right-3 top-full z-50 mt-2 overflow-hidden rounded-[var(--df-radius-xl)] border border-[var(--df-border)] bg-[var(--df-card)] shadow-[var(--df-shadow-lg)]"
          >
            {WORKSPACES.map((ws) => (
              <button
                key={ws.name}
                type="button"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-sm transition-colors hover:bg-[var(--df-secondary)]"
              >
                <div className="flex items-center gap-2.5">
                  {ws.active ? (
                    <Check className="h-4 w-4 text-[var(--df-primary)]" />
                  ) : (
                    <span className="h-4 w-4" />
                  )}
                  <span
                    className={cn(
                      'font-medium',
                      ws.active
                        ? 'text-[var(--df-foreground)]'
                        : 'text-[var(--df-muted-foreground)]'
                    )}
                  >
                    {ws.name}
                  </span>
                </div>
                <span className="rounded-full border border-[var(--df-border)] px-2 py-0.5 text-caption">
                  {ws.plan}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface NavItemRowProps {
  item: NavItem;
  collapsed: boolean;
  depth?: number;
}

function NavItemRow({ item, collapsed, depth = 0 }: NavItemRowProps) {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isActive = currentPath === item.to || (item.to !== '/' && currentPath.startsWith(item.to));
  const hasChildren = item.children && item.children.length > 0;
  const [expanded, setExpanded] = useState(isActive);

  const rowContent = (
    <motion.div
      whileHover={{ x: collapsed ? 0 : 4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative w-full"
    >
      <div
        className={cn(
          'relative flex w-full items-center gap-3 rounded-[var(--df-radius-xl)] px-3.5 py-2.5 text-sm transition-all duration-200 select-none cursor-pointer',
          depth > 0 && 'ml-3 text-xs',
          collapsed ? 'justify-center px-2' : 'justify-between',
          isActive
            ? 'font-semibold text-[var(--df-primary)]'
            : 'text-[var(--df-muted-foreground)] hover:bg-[var(--df-secondary)]/50 hover:text-[var(--df-foreground)]'
        )}
        onClick={() => {
          if (hasChildren) setExpanded((p) => !p);
        }}
      >
        {isActive && (
          <motion.span
            layoutId="sidebar-active-indicator"
            className={cn(
              'absolute rounded-[var(--df-radius-xl)] bg-[var(--df-primary)]/10 border-l-2 border-[var(--df-primary)] z-0 pointer-events-none',
              collapsed ? 'inset-1 rounded-xl border-l-0 bg-[var(--df-primary)]/20' : 'inset-0'
            )}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          />
        )}

        <div className={cn('relative z-10 flex items-center', collapsed ? 'gap-0' : 'gap-3')}>
          <span
            className={cn(
              'icon-box icon-box-sm border-transparent bg-transparent [&_svg]:h-4 [&_svg]:w-4',
              isActive
                ? 'text-[var(--df-primary)]'
                : 'text-[var(--df-muted-foreground)] group-hover:text-[var(--df-foreground)]'
            )}
          >
            {item.icon}
          </span>
          {!collapsed && <span className="truncate">{item.label}</span>}
        </div>

        {!collapsed && (
          <div className="relative z-10 flex items-center gap-2">
            {item.badge !== undefined &&
              (typeof item.badge === 'string' ? (
                <ForgeBadge variant="primary" size="sm">
                  {item.badge}
                </ForgeBadge>
              ) : (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--df-subtle)] px-1.5 text-caption font-semibold">
                  {item.badge}
                </span>
              ))}
            {hasChildren && (
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div>
      {hasChildren || item.to === '#' ? (
        rowContent
      ) : (
        <Link
          to={item.to}
          className="block"
          onClick={() => useSidebarStore.getState().setMobileOpen(false)}
        >
          {rowContent}
        </Link>
      )}

      {hasChildren && !collapsed && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {item.children!.map((child) => (
                <NavItemRow key={child.to} item={child} collapsed={false} depth={1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export function Sidebar() {
  const { collapsed, toggle, mobileOpen } = useSidebarStore();
  const width = collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <motion.aside
      animate={{ width }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed left-0 top-0 z-50 flex h-screen flex-shrink-0 flex-col overflow-hidden border-r border-[var(--df-border)] bg-[var(--df-sidebar)]',
        'max-lg:shadow-[var(--df-shadow-lg)]',
        mobileOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'
      )}
    >
      <WorkspaceSwitcher collapsed={collapsed} />

      <ScrollArea className="flex-1 py-2">
        <nav className="flex flex-col gap-0.5 px-2">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="mb-2">
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-1.5 px-3 py-1 text-caption font-semibold uppercase tracking-widest text-[var(--df-muted-foreground)]"
                  >
                    {section.title}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="rounded-[var(--df-radius-xl)] bg-[var(--df-secondary)]/40 p-1">
                {section.items.map((item) =>
                  collapsed ? (
                    <Tooltip key={item.label} delayDuration={0}>
                      <TooltipTrigger asChild>
                        <div>
                          <NavItemRow item={item} collapsed={collapsed} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="flex items-center gap-2">
                        {item.label}
                        {item.badge !== undefined && (
                          <ForgeBadge variant="primary" size="sm">
                            {String(item.badge)}
                          </ForgeBadge>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <NavItemRow key={item.label} item={item} collapsed={collapsed} />
                  )
                )}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      <div className="flex-shrink-0 border-t border-[var(--df-border)] p-3">
        {!collapsed ? (
          <div className="mb-2 flex items-center gap-3 rounded-[var(--df-radius-xl)] border border-[var(--df-border)] bg-[var(--df-secondary)] px-3 py-2.5 transition-colors hover:border-[var(--df-border-strong)]">
            <ForgeAvatar name="John Doe" size="sm" status="online" />
            <div className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-[var(--df-foreground)]">
                John Doe
              </span>
              <span className="block truncate text-caption text-[var(--df-muted-foreground)]">
                john@devforge.io
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-2 flex justify-center py-1">
            <ForgeAvatar name="John Doe" size="md" status="online" />
          </div>
        )}

        <button
          type="button"
          onClick={toggle}
          className={cn(
            'flex w-full items-center gap-2 rounded-[var(--df-radius-xl)] px-3 py-2.5 text-sm text-[var(--df-muted-foreground)] transition-all hover:bg-[var(--df-secondary)] hover:text-[var(--df-foreground)]',
            collapsed ? 'justify-center' : ''
          )}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronsLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
