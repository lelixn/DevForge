import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Command,
  ChevronRight,
  Settings,
  LogOut,
  User,
  ChevronsUpDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useTheme } from '@/hooks/use-theme';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IconButton } from '@/components/shared/icon-button';
import { Separator } from '@/components/ui/separator';

// ---- Breadcrumb ----
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <div key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-[var(--df-muted-fg)]/50" />}
            <span
              className={cn(
                'font-medium',
                isLast
                  ? 'text-[var(--df-fg)]'
                  : 'text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] transition-colors cursor-pointer'
              )}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}

// ---- Notification Panel ----
const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'Deployment successful',
    body: 'devforge-ui@v1.2.4 deployed to production',
    time: '2m ago',
    read: false,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Sprint deadline approaching',
    body: 'Sprint #12 ends in 2 days — 4 tasks remaining',
    time: '1h ago',
    read: false,
  },
  {
    id: 3,
    type: 'info',
    title: 'New team member',
    body: 'Sarah Kim joined the Engineering workspace',
    time: '3h ago',
    read: true,
  },
  {
    id: 4,
    type: 'error',
    title: 'Build failed',
    body: 'CI pipeline on branch feat/ai-suggestions failed',
    time: '5h ago',
    read: true,
  },
];

const typeConfig = {
  success: { icon: <CheckCircle2 className="h-4 w-4" />, color: 'text-[var(--df-success)]' },
  warning: { icon: <AlertCircle className="h-4 w-4" />, color: 'text-[var(--df-warning)]' },
  info: { icon: <Clock className="h-4 w-4" />, color: 'text-[var(--df-muted-fg)]' },
  error: { icon: <AlertCircle className="h-4 w-4" />, color: 'text-[var(--df-danger)]' },
};

function NotificationPanel({ onClose }: { onClose: () => void }) {
  const unread = SAMPLE_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] shadow-[var(--shadow-float)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--df-border)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--df-fg)]">Notifications</span>
          {unread > 0 && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--df-primary)] text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="max-h-72 overflow-y-auto">
        {SAMPLE_NOTIFICATIONS.map((n) => {
          const cfg = typeConfig[n.type as keyof typeof typeConfig];
          return (
            <div
              key={n.id}
              className={cn(
                'flex gap-3 border-b border-[var(--df-border)] px-4 py-3 last:border-0 transition-colors hover:bg-[var(--df-secondary)]/50 cursor-pointer',
                !n.read && 'bg-[var(--df-primary)]/5'
              )}
            >
              <span className={cn('mt-0.5 flex-shrink-0', cfg.color)}>{cfg.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-semibold text-[var(--df-fg)]">{n.title}</p>
                  {!n.read && (
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--df-primary)]" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-[var(--df-muted-fg)]">{n.body}</p>
                <p className="mt-1 text-[10px] text-[var(--df-muted-fg)]/60">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-[var(--df-border)] px-4 py-2.5">
        <button className="text-xs font-medium text-[var(--df-primary)] hover:underline">
          Mark all as read
        </button>
      </div>
    </motion.div>
  );
}

// ---- Profile Menu ----
function ProfileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] shadow-[var(--shadow-float)]"
    >
      <div className="border-b border-[var(--df-border)] px-4 py-3">
        <p className="text-sm font-semibold text-[var(--df-fg)]">John Doe</p>
        <p className="text-xs text-[var(--df-muted-fg)]">john@devforge.io</p>
      </div>
      {[
        { icon: <User className="h-4 w-4" />, label: 'Profile' },
        { icon: <Settings className="h-4 w-4" />, label: 'Settings' },
      ].map((item) => (
        <button
          key={item.label}
          onClick={onClose}
          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--df-muted-fg)] transition-colors hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]"
        >
          {item.icon}
          {item.label}
        </button>
      ))}
      <div className="border-t border-[var(--df-border)]">
        <button className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[var(--df-danger)] transition-colors hover:bg-[var(--df-danger)]/10">
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </motion.div>
  );
}

// ---- Workspace Switcher ----
const WORKSPACES = [
  { name: 'Engineering', plan: 'Pro', active: true },
  { name: 'Design System', plan: 'Free', active: false },
  { name: 'Infrastructure', plan: 'Enterprise', active: false },
];

function WorkspaceSwitcher() {
  const [open, setOpen] = useState(false);
  const active = WORKSPACES.find((w) => w.active)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex h-7 items-center gap-1.5 rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)] px-2.5 text-xs font-medium text-[var(--df-fg)] transition-all hover:border-[var(--df-border-strong)] hover:bg-[var(--df-subtle)]"
      >
        <span className="h-2 w-2 rounded-full bg-[var(--df-success)]" />
        {active.name}
        <ChevronsUpDown className="h-3 w-3 text-[var(--df-muted-fg)]" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-1.5 w-52 overflow-hidden rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] shadow-[var(--shadow-elevated)]"
          >
            {WORKSPACES.map((ws) => (
              <button
                key={ws.name}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-xs transition-colors hover:bg-[var(--df-secondary)]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      ws.active ? 'bg-[var(--df-success)]' : 'bg-[var(--df-border-strong)]'
                    )}
                  />
                  <span
                    className={cn(
                      'font-medium',
                      ws.active ? 'text-[var(--df-fg)]' : 'text-[var(--df-muted-fg)]'
                    )}
                  >
                    {ws.name}
                  </span>
                </div>
                <span className="rounded-full border border-[var(--df-border)] px-1.5 py-0.5 text-[10px] text-[var(--df-muted-fg)]">
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

// ---- Main Header ----
interface HeaderProps {
  breadcrumb?: BreadcrumbItem[];
}

export function Header({ breadcrumb = [{ label: 'Dashboard' }] }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const unreadCount = SAMPLE_NOTIFICATIONS.filter((n) => !n.read).length;

  const closeAll = () => {
    setShowNotifications(false);
    setShowProfile(false);
  };

  return (
    <header className="glass-strong sticky top-0 z-40 flex h-14 w-full flex-shrink-0 items-center gap-3 border-b border-[var(--df-border)] px-4">
      {/* Left: Breadcrumb */}
      <div className="flex flex-1 items-center gap-3 min-w-0">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-xs">
        <button
          className="flex w-full items-center gap-2 rounded-xl border border-[var(--df-border)] bg-[var(--df-input)] px-3 py-1.5 text-sm text-[var(--df-muted-fg)] transition-all hover:border-[var(--df-border-strong)] hover:bg-[var(--df-secondary)]"
          onClick={() => {}}
        >
          <Search className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="flex-1 text-left text-xs">Search anything...</span>
          <kbd className="flex items-center gap-0.5 rounded border border-[var(--df-border)] bg-[var(--df-secondary)] px-1.5 py-0.5 text-[10px] font-medium">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </button>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-shrink-0 items-center gap-1.5">
        {/* Workspace switcher */}
        <div className="hidden sm:block">
          <WorkspaceSwitcher />
        </div>

        <Separator orientation="vertical" className="mx-1 h-5" />

        {/* Search (mobile) */}
        <IconButton
          icon={<Search className="h-4 w-4" />}
          label="Search (⌘K)"
          className="md:hidden"
        />

        {/* Theme toggle */}
        <IconButton
          icon={theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />

        {/* Notifications */}
        <div className="relative">
          <IconButton
            icon={<Bell className="h-4 w-4" />}
            label="Notifications"
            active={showNotifications}
            onClick={() => {
              setShowNotifications((p) => !p);
              setShowProfile(false);
            }}
          />
          {unreadCount > 0 && !showNotifications && (
            <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--df-primary)] text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
          <AnimatePresence>
            {showNotifications && <NotificationPanel onClose={closeAll} />}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative ml-1">
          <button
            onClick={() => {
              setShowProfile((p) => !p);
              setShowNotifications(false);
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ring-2 ring-transparent transition-all hover:ring-[var(--df-primary)]/40"
          >
            <Avatar className="h-7 w-7">
              <AvatarImage src="" />
              <AvatarFallback className="text-[10px]">JD</AvatarFallback>
            </Avatar>
          </button>
          <AnimatePresence>{showProfile && <ProfileMenu onClose={closeAll} />}</AnimatePresence>
        </div>
      </div>
    </header>
  );
}
