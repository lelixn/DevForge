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
  Plus,
  Zap,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useSidebarStore } from '@/stores/sidebar';
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

const NAV_SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Workspace',
    items: [{ label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, to: '/' }],
  },
  {
    title: 'Build',
    items: [
      {
        label: 'Projects',
        icon: <FolderKanban className="h-4 w-4" />,
        to: '/projects',
        badge: 3,
      },
      { label: 'Teams', icon: <Users className="h-4 w-4" />, to: '/teams' },
      { label: 'Tasks', icon: <CheckSquare className="h-4 w-4" />, to: '/tasks', badge: 12 },
    ],
  },
  {
    title: 'Platform',
    items: [
      { label: 'AI Workspace', icon: <Sparkles className="h-4 w-4" />, to: '/ai', badge: 'New' },
      { label: 'API Workspace', icon: <Code2 className="h-4 w-4" />, to: '/api-workspace' },
      { label: 'Documentation', icon: <BookOpen className="h-4 w-4" />, to: '/documentation' },
      { label: 'Analytics', icon: <BarChart3 className="h-4 w-4" />, to: '/analytics' },
    ],
  },
  {
    title: 'System',
    items: [{ label: 'Settings', icon: <Settings className="h-4 w-4" />, to: '/settings' }],
  },
];

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
      transition={{ duration: 0.12 }}
      className="relative w-full"
    >
      {isActive && !collapsed && (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[var(--df-primary)]" />
      )}
      <div
        className={cn(
          'relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all select-none',
          depth > 0 && 'ml-4 w-[calc(100%-16px)] text-xs',
          collapsed ? 'justify-center' : 'justify-between',
          isActive
            ? 'bg-[var(--df-primary)]/10 text-[var(--df-primary)] font-medium'
            : 'text-[var(--df-muted-foreground)] hover:bg-[rgba(148,163,184,0.06)] hover:text-[var(--df-foreground)]',
        )}
        onClick={() => {
          if (hasChildren) setExpanded(p => !p);
        }}
      >
        <div className={cn('flex items-center', collapsed ? 'gap-0' : 'gap-3')}>
          <span
            className={cn(
              'flex-shrink-0 transition-colors',
              isActive ? 'text-[var(--df-primary)]' : '',
            )}
          >
            {item.icon}
          </span>
          {!collapsed && <span className="truncate">{item.label}</span>}
        </div>

        {!collapsed && (
          <div className="flex items-center gap-2">
            {item.badge !== undefined && (
              typeof item.badge === 'string' ? (
                <ForgeBadge variant="primary" size="sm">
                  {item.badge}
                </ForgeBadge>
              ) : (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[rgba(148,163,184,0.12)] px-1 text-[10px] font-semibold text-[var(--df-muted-foreground)]">
                  {item.badge}
                </span>
              )
            )}
            {hasChildren && (
              <ChevronDown
                className={cn('h-3.5 w-3.5 transition-transform duration-200', expanded && 'rotate-180')}
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
        <Link to={item.to} className="block">
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
              {item.children!.map(child => (
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
  const { collapsed, toggle } = useSidebarStore();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-screen flex-shrink-0 flex-col overflow-hidden border-r border-[var(--df-border)] bg-[var(--df-sidebar)]"
    >
      {/* Top Logo / Workspace */}
      <div
        className={cn(
          'flex h-16 flex-shrink-0 items-center border-b border-[var(--df-border)] px-4',
          collapsed ? 'justify-center' : 'justify-between gap-2',
        )}
      >
        {/* Logo mark */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--df-gradient-primary)] shadow-[var(--df-shadow-glow)]">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap text-lg font-bold tracking-tight text-[var(--df-foreground)]"
              >
                DevForge
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="flex flex-col gap-1 px-2">
          {NAV_SECTIONS.map(section => (
            <div key={section.title} className="mb-3">
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--df-muted-foreground)]"
                  >
                    {section.title}
                  </motion.p>
                )}
              </AnimatePresence>

              {section.items.map(item =>
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
                        typeof item.badge === 'string' ? (
                          <ForgeBadge variant="primary" size="sm">
                            {item.badge}
                          </ForgeBadge>
                        ) : (
                          <span className="rounded-full bg-[var(--df-primary)] px-1.5 py-0.5 text-[10px] text-white">
                            {item.badge}
                          </span>
                        )
                      )}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <NavItemRow key={item.label} item={item} collapsed={collapsed} />
                ),
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom: User + Collapse */}
      <div className="flex-shrink-0 border-t border-[var(--df-border)] p-3">
        {/* User row */}
        {!collapsed ? (
          <div className="mb-2 flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-[rgba(148,163,184,0.06)] cursor-pointer">
            <ForgeAvatar name="John Doe" size="sm" status="online" />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-[var(--df-foreground)]">
                John Doe
              </span>
              <span className="truncate text-[10px] text-[var(--df-muted-foreground)]">
                john@devforge.io
              </span>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl text-[var(--df-muted-foreground)] hover:bg-[rgba(148,163,184,0.08)] hover:text-[var(--df-foreground)] transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="mb-2 flex justify-center py-1">
            <ForgeAvatar name="John Doe" size="md" status="online" />
          </div>
        )}

        {/* Collapse button */}
        <button
          onClick={toggle}
          className={cn(
            'flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm text-[var(--df-muted-foreground)] transition-all hover:bg-[rgba(148,163,184,0.06)] hover:text-[var(--df-foreground)]',
            collapsed ? 'justify-center' : '',
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
