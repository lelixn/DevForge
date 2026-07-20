import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  FolderKanban,
  Users,
  CheckSquare,
  Sparkles,
  Code2,
  BookOpen,
  BarChart3,
  Settings,
  ArrowRight,
  FileText,
  GitBranch,
  Zap,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const COMMANDS = [
  {
    category: 'Navigation',
    icon: <LayoutDashboard className="h-4 w-4" />,
    label: 'Go to Dashboard',
    shortcut: 'G D',
  },
  {
    category: 'Navigation',
    icon: <FolderKanban className="h-4 w-4" />,
    label: 'Go to Projects',
    shortcut: 'G P',
  },
  {
    category: 'Navigation',
    icon: <CheckSquare className="h-4 w-4" />,
    label: 'Go to Tasks',
    shortcut: 'G T',
  },
  {
    category: 'Navigation',
    icon: <Users className="h-4 w-4" />,
    label: 'Go to Teams',
    shortcut: 'G M',
  },
  {
    category: 'Navigation',
    icon: <BarChart3 className="h-4 w-4" />,
    label: 'Go to Analytics',
    shortcut: 'G A',
  },
  {
    category: 'Navigation',
    icon: <Sparkles className="h-4 w-4" />,
    label: 'Go to AI Workspace',
    shortcut: 'G I',
  },
  {
    category: 'Navigation',
    icon: <Code2 className="h-4 w-4" />,
    label: 'Go to API Workspace',
    shortcut: 'G W',
  },
  {
    category: 'Navigation',
    icon: <BookOpen className="h-4 w-4" />,
    label: 'Go to Documentation',
    shortcut: 'G O',
  },
  {
    category: 'Navigation',
    icon: <Settings className="h-4 w-4" />,
    label: 'Open Settings',
    shortcut: 'G S',
  },
  {
    category: 'Actions',
    icon: <FileText className="h-4 w-4" />,
    label: 'Create new task',
    shortcut: 'C T',
  },
  {
    category: 'Actions',
    icon: <GitBranch className="h-4 w-4" />,
    label: 'Create new project',
    shortcut: 'C P',
  },
  {
    category: 'Actions',
    icon: <Zap className="h-4 w-4" />,
    label: 'Start AI session',
    shortcut: 'C A',
  },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Memoize filtered array
  const filtered = useMemo(() => {
    return query
      ? COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
      : COMMANDS;
  }, [query]);

  // Memoize grouped commands
  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, typeof COMMANDS>>((acc, cmd) => {
      acc[cmd.category] = acc[cmd.category] || [];
      acc[cmd.category].push(cmd);
      return acc;
    }, {});
  }, [filtered]);

  // Reset selected index when query changes
  const currentSelectedIndex = useMemo(() => {
    return Math.min(selectedIndex, Math.max(0, filtered.length - 1));
  }, [filtered.length, selectedIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        setSelectedIndex((p) => Math.min(p + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        setSelectedIndex((p) => Math.max(p - 1, 0));
      }
    },
    [open, onClose, filtered.length]
  );

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
    return undefined;
  }, [handleKeyDown, open]);

  // Reset selected index when query or filtered changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(0);
  }, [filtered]);

  // Reset query when closed
  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery('');
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-[15%] z-50 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-[var(--df-border-strong)] bg-[var(--df-card)] shadow-[var(--shadow-float)]"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-[var(--df-border)] px-4 py-3">
              <Search className="h-4 w-4 flex-shrink-0 text-[var(--df-muted-fg)]" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-[var(--df-fg)] placeholder:text-[var(--df-muted-fg)] focus:outline-none"
              />
              <kbd className="rounded-md border border-[var(--df-border)] bg-[var(--df-secondary)] px-1.5 py-0.5 text-[10px] text-[var(--df-muted-fg)]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto py-2">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[var(--df-muted-fg)]/60">
                    {category}
                  </p>
                  {items.map((cmd, i) => {
                    const globalIdx = filtered.indexOf(cmd);
                    const isSelected = globalIdx === currentSelectedIndex;
                    return (
                      <button
                        key={i}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        onClick={onClose}
                        className={cn(
                          'flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                          isSelected
                            ? 'bg-[var(--df-primary)]/10 text-[var(--df-fg)]'
                            : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]'
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)]',
                            isSelected &&
                              'border-[var(--df-primary)]/30 bg-[var(--df-primary)]/10 text-[var(--df-primary)]'
                          )}
                        >
                          {cmd.icon}
                        </span>
                        <span className="flex-1 text-left font-medium">{cmd.label}</span>
                        <div className="flex items-center gap-1">
                          {cmd.shortcut.split(' ').map((k, ki) => (
                            <kbd
                              key={ki}
                              className="rounded border border-[var(--df-border)] bg-[var(--df-secondary)] px-1.5 py-0.5 text-[10px] text-[var(--df-muted-fg)]"
                            >
                              {k}
                            </kbd>
                          ))}
                        </div>
                        {isSelected && (
                          <ArrowRight className="h-3.5 w-3.5 text-[var(--df-primary)]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-10 text-center text-sm text-[var(--df-muted-fg)]">
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[var(--df-border)] px-4 py-2">
              <p className="text-[10px] text-[var(--df-muted-fg)]/60">{filtered.length} commands</p>
              <div className="flex items-center gap-3 text-[10px] text-[var(--df-muted-fg)]/60">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-[var(--df-border)] bg-[var(--df-secondary)] px-1 py-0.5">
                    ↑↓
                  </kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-[var(--df-border)] bg-[var(--df-secondary)] px-1 py-0.5">
                    ↵
                  </kbd>
                  select
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
