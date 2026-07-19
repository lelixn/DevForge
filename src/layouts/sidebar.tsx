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
  GitBranch,
  Layers,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useSidebarStore } from '@/stores/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
        children: [
          { label: 'DevForge UI', icon: <GitBranch className="h-3.5 w-3.5" />, to: '/projects/1' },
          { label: 'API Gateway', icon: <GitBranch className="h-3.5 w-3.5" />, to: '/projects/2' },
          { label: 'Auth Service', icon: <GitBranch className="h-3.5 w-3.5" />, to: '/projects/3' },
        ],
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
      whileHover={{ x: collapsed ? 0 : 2 }}
      transition={{ duration: 0.12 }}
      className="relative w-full"
    >
      {isActive && !collapsed && <span className="nav-active-indicator" />}
      <div
        className={cn(
          'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-all duration-150 no-select',
          depth > 0 && 'ml-2 w-[calc(100%-8px)] pl-2 text-xs',
          collapsed ? 'justify-center' : 'justify-between',
          isActive
            ? 'bg-[var(--df-primary)]/10 text-[var(--df-accent)] font-medium'
            : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]'
        )}
        onClick={() => {
          if (hasChildren) setExpanded((p) => !p);
        }}
      >
        <div className={cn('flex items-center', collapsed ? 'gap-0' : 'gap-2.5')}>
          <span
            className={cn(
              'flex-shrink-0 transition-colors',
              isActive ? 'text-[var(--df-primary)]' : ''
            )}
          >
            {item.icon}
          </span>
          {!collapsed && <span className="truncate">{item.label}</span>}
        </div>

        {!collapsed && (
          <div className="flex items-center gap-1.5">
            {item.badge !== undefined && (
              <span
                className={cn(
                  'flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold',
                  typeof item.badge === 'string'
                    ? 'bg-[var(--df-primary)] text-white'
                    : 'bg-[var(--df-secondary)] text-[var(--df-muted-fg)]'
                )}
              >
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
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
              <div className="ml-4 mt-0.5 border-l border-[var(--df-border)] pl-2">
                {item.children!.map((child) => (
                  <NavItemRow key={child.to} item={child} collapsed={false} depth={1} />
                ))}
              </div>
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
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-screen flex-shrink-0 flex-col overflow-hidden border-r border-[var(--df-border)] bg-[var(--df-sidebar)]"
    >
      {/* Top Logo / Workspace */}
      <div
        className={cn(
          'flex h-14 flex-shrink-0 items-center border-b border-[var(--df-border)] px-3',
          collapsed ? 'justify-center' : 'justify-between gap-2'
        )}
      >
        {/* Logo mark */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)] shadow-[var(--shadow-glow-sm)]">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap text-sm font-bold tracking-tight text-[var(--df-fg)]"
              >
                DevForge
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Workspace switcher dropdown hint */}
        {!collapsed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-[var(--df-muted-fg)] transition-colors hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]">
                <Layers className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Switch Workspace</TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Navigation */}
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
                    className="mb-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--df-muted-fg)]/60"
                  >
                    {section.title}
                  </motion.p>
                )}
              </AnimatePresence>
              {collapsed && <div className="my-1 h-px bg-[var(--df-border)]" />}

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
                        <span className="rounded-full bg-[var(--df-primary)] px-1.5 py-0.5 text-[10px] text-white">
                          {item.badge}
                        </span>
                      )}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <NavItemRow key={item.label} item={item} collapsed={collapsed} />
                )
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom: User + Collapse */}
      <div className="flex-shrink-0 border-t border-[var(--df-border)] p-2">
        {/* User row */}
        {!collapsed ? (
          <div className="mb-1 flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors hover:bg-[var(--df-secondary)] cursor-pointer">
            <Avatar className="h-6 w-6 flex-shrink-0">
              <AvatarImage src="" />
              <AvatarFallback className="text-[10px]">JD</AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-xs font-medium text-[var(--df-fg)]">John Doe</span>
              <span className="truncate text-[10px] text-[var(--df-muted-fg)]">
                john@devforge.io
              </span>
            </div>
            <Plus className="h-3.5 w-3.5 flex-shrink-0 text-[var(--df-muted-fg)]" />
          </div>
        ) : (
          <div className="mb-1 flex justify-center py-1">
            <Avatar className="h-7 w-7 cursor-pointer">
              <AvatarImage src="" />
              <AvatarFallback className="text-[10px]">JD</AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Collapse button */}
        <button
          onClick={toggle}
          className={cn(
            'flex w-full cursor-pointer items-center rounded-lg px-2.5 py-2 text-xs text-[var(--df-muted-fg)] transition-colors hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]',
            collapsed ? 'justify-center' : 'gap-2'
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
