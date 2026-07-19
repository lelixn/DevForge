import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowRight,
  FolderKanban,
  CheckSquare,
  Users,
  Sparkles,
  Code2,
  BarChart3,
  Settings,
  Hash,
  Clock,
  Command,
} from 'lucide-react';
import { PROJECTS, TASKS } from '@/shared/data';

export const Route = createFileRoute('/search/')({ component: SearchPage });

const QUICK_LINKS = [
  { icon: <FolderKanban className="h-4 w-4" />, label: 'Projects', count: 14 },
  { icon: <CheckSquare className="h-4 w-4" />, label: 'Tasks', count: 247 },
  { icon: <Users className="h-4 w-4" />, label: 'Teams', count: 4 },
  { icon: <Sparkles className="h-4 w-4" />, label: 'AI Sessions', count: 28 },
  { icon: <Code2 className="h-4 w-4" />, label: 'API Collections', count: 3 },
  { icon: <BarChart3 className="h-4 w-4" />, label: 'Analytics', count: null },
  { icon: <Settings className="h-4 w-4" />, label: 'Settings', count: null },
];

const RECENT_SEARCHES = [
  'auth middleware refactor',
  'sprint #12 velocity',
  'api gateway endpoints',
  'database pool fix',
];

type Result = { type: 'project' | 'task' | 'page'; label: string; sub?: string; color?: string };

function buildResults(q: string): Result[] {
  if (!q) return [];
  const results: Result[] = [];

  PROJECTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).forEach((p) => {
    results.push({ type: 'project', label: p.name, sub: p.description, color: p.color });
  });

  TASKS.filter((t) => t.title.toLowerCase().includes(q.toLowerCase())).forEach((t) => {
    results.push({ type: 'task', label: t.title, sub: `${t.status} · ${t.priority} priority` });
  });

  QUICK_LINKS.filter((l) => l.label.toLowerCase().includes(q.toLowerCase())).forEach((l) => {
    results.push({ type: 'page', label: l.label, sub: 'Navigation' });
  });

  return results;
}

const TYPE_ICON: Record<string, React.ReactNode> = {
  project: <FolderKanban className="h-4 w-4 text-[var(--df-primary)]" />,
  task: <CheckSquare className="h-4 w-4 text-[var(--df-success)]" />,
  page: <Hash className="h-4 w-4 text-[var(--df-muted-fg)]" />,
};

function SearchPage() {
  const [query, setQuery] = useState('');
  const results = buildResults(query);

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col items-center overflow-y-auto bg-[var(--df-bg)] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Headline */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[var(--df-fg)]">Search DevForge</h1>
          <p className="mt-2 text-sm text-[var(--df-muted-fg)]">
            Find projects, tasks, docs, and anything across your workspace
          </p>
        </div>

        {/* Search box */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--df-muted-fg)]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search..."
            className="h-14 w-full rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] pl-12 pr-14 text-base text-[var(--df-fg)] placeholder:text-[var(--df-muted-fg)] focus:border-[var(--df-border-focus)] focus:outline-none focus:ring-2 focus:ring-[var(--df-primary)]/20 shadow-[var(--shadow-elevated)]"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)] px-2 py-1 text-[11px] font-medium text-[var(--df-muted-fg)]">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {query ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="overflow-hidden rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] shadow-[var(--shadow-float)]"
            >
              {results.length > 0 ? (
                <>
                  <div className="border-b border-[var(--df-border)] px-4 py-2.5">
                    <span className="text-xs text-[var(--df-muted-fg)]">
                      {results.length} results for &ldquo;{query}&rdquo;
                    </span>
                  </div>
                  {results.map((r, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex w-full items-center gap-3 border-b border-[var(--df-border)] px-4 py-3.5 text-left last:border-0 transition-colors hover:bg-[var(--df-secondary)]/50"
                    >
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)]">
                        {TYPE_ICON[r.type]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--df-fg)]">{r.label}</p>
                        {r.sub && <p className="text-xs text-[var(--df-muted-fg)]">{r.sub}</p>}
                      </div>
                      <span className="flex-shrink-0 rounded-full border border-[var(--df-border)] bg-[var(--df-secondary)] px-2 py-0.5 text-[10px] text-[var(--df-muted-fg)] capitalize">
                        {r.type}
                      </span>
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-[var(--df-muted-fg)]" />
                    </motion.button>
                  ))}
                </>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm font-semibold text-[var(--df-fg)]">No results found</p>
                  <p className="mt-1 text-xs text-[var(--df-muted-fg)]">
                    Try different keywords or browse categories
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6"
            >
              {/* Quick links */}
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {QUICK_LINKS.map((link) => (
                  <motion.button
                    key={link.label}
                    whileHover={{ y: -2 }}
                    className="flex flex-col items-center gap-2.5 rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] p-4 text-center transition-all hover:border-[var(--df-border-strong)]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)] text-[var(--df-muted-fg)]">
                      {link.icon}
                    </span>
                    <span className="text-xs font-medium text-[var(--df-fg)]">{link.label}</span>
                    {link.count !== null && (
                      <span className="text-[10px] text-[var(--df-muted-fg)]">
                        {link.count} items
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Recent */}
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--df-muted-fg)]">
                  <Clock className="h-3.5 w-3.5" />
                  Recent Searches
                </p>
                <div className="overflow-hidden rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)]">
                  {RECENT_SEARCHES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="flex w-full items-center gap-3 border-b border-[var(--df-border)] px-4 py-3 text-left text-sm text-[var(--df-muted-fg)] last:border-0 transition-colors hover:bg-[var(--df-secondary)]/50 hover:text-[var(--df-fg)]"
                    >
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
