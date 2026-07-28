import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  ArrowRight,
  FolderKanban,
  Terminal,
  Sparkles,
  Code2,
  Users,
  Settings,
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export interface ForgeCommandProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_ACTIONS = [
  { id: 'projects', label: 'Go to Projects', icon: FolderKanban, path: '/projects' },
  { id: 'ai', label: 'Launch AI Workspace', icon: Sparkles, path: '/ai' },
  { id: 'api', label: 'API Workspace & Graph', icon: Code2, path: '/api-workspace' },
  { id: 'tasks', label: 'View Tasks & Backlog', icon: Terminal, path: '/tasks' },
  { id: 'teams', label: 'Manage Team Members', icon: Users, path: '/teams' },
  { id: 'settings', label: 'Workspace Settings', icon: Settings, path: '/settings' },
];

const ForgeCommand = ({ isOpen, onClose }: ForgeCommandProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          /* open handled by parent or toggle */
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredActions = QUICK_ACTIONS.filter((act) =>
    act.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate({ to: path as any });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            className="relative w-full max-w-xl rounded-2xl border border-[var(--df-border-strong)] bg-[#101014] shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden z-10"
          >
            {/* Search Header */}
            <div className="flex items-center px-4 border-b border-[var(--df-border)]">
              <Search className="h-4 w-4 text-[var(--df-accent)] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search workspace..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 w-full bg-transparent px-3 text-sm text-white placeholder-[var(--df-muted-foreground)] focus:outline-none font-sans"
              />
              <span className="rounded bg-[var(--df-surface-elevated)] border border-[var(--df-border)] px-2 py-0.5 text-[10px] font-mono text-[var(--df-muted-foreground)] shrink-0">
                ESC
              </span>
            </div>

            {/* Suggestions / Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--df-muted-foreground)]">
                Quick Commands
              </div>

              {filteredActions.length > 0 ? (
                filteredActions.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => handleSelect(act.path)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-[var(--df-muted-foreground)] hover:bg-[rgba(124,58,237,0.12)] hover:text-white transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <act.icon className="h-4 w-4 text-[var(--df-primary-light)] group-hover:text-[var(--df-accent)]" />
                      <span className="font-medium">{act.label}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--df-accent)]" />
                  </button>
                ))
              ) : (
                <div className="px-3 py-6 text-center text-xs font-mono text-[var(--df-muted-foreground)]">
                  No commands found matching "{query}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--df-surface)] border-t border-[var(--df-border)] text-[10px] font-mono text-[var(--df-muted-foreground)]">
              <div className="flex items-center gap-2">
                <Command className="h-3 w-3 text-[var(--df-primary)]" />
                <span>FORGE COMMAND PALETTE</span>
              </div>
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export { ForgeCommand };
