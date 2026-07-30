import React, { Suspense, lazy, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sparkles, User as UserIcon } from 'lucide-react';
import { NovaBackground } from '@shared/components/NovaBackground';
import { Sidebar } from '@shared/components/Sidebar';
import { Header } from '@shared/components/Header';
import { ToastContainer } from '@shared/components/ToastContainer';
import { Footer } from '@shared/components/Footer';
import { UniversalSearch } from '@features/search/components/UniversalSearch';
import { AIAssistantPanel } from '@features/ai/components/AIAssistantPanel';
import { AuthModal } from '@features/auth/components/AuthModal';
import { ErrorBoundary } from '@shared/components/ErrorBoundary';
import { SyncManager } from '@shared/services/syncManager';
import { useUIStore, useSettingsStore, useAuthStore } from '@store/index';
import type { NavView } from '@shared/types';

// Lazy load feature pages
const DashboardPage = lazy(() =>
  import('@features/hero/components/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const TodoPage = lazy(() =>
  import('@features/todo/components/TodoPage').then((m) => ({ default: m.TodoPage }))
);
const PomodoroPage = lazy(() =>
  import('@features/pomodoro/components/PomodoroPage').then((m) => ({ default: m.PomodoroPage }))
);
const GitHubPage = lazy(() =>
  import('@features/github/components/GitHubPage').then((m) => ({ default: m.GitHubPage }))
);
const LeetCodePage = lazy(() =>
  import('@features/leetcode/components/LeetCodePage').then((m) => ({ default: m.LeetCodePage }))
);
const TerminalPage = lazy(() =>
  import('@features/terminal/components/TerminalPage').then((m) => ({ default: m.TerminalPage }))
);
const BookmarksPage = lazy(() =>
  import('@features/bookmarks/components/BookmarksPage').then((m) => ({ default: m.BookmarksPage }))
);
const SettingsPage = lazy(() =>
  import('@features/settings/components/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);

// QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// ============================================
// Page Loader
// ============================================
const PageLoader: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh', gap: 12 }}>
    <motion.div
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--nova-purple)',
        boxShadow: '0 0 10px var(--nova-purple)',
      }}
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
      Loading...
    </span>
  </div>
);

// ============================================
// View Router
// ============================================
const ViewRouter: React.FC<{ view: NavView }> = ({ view }) => {
  switch (view) {
    case 'dashboard':
      return <DashboardPage />;
    case 'search':
      return (
        <div style={{ padding: '40px 0' }}>
          <h2 className="font-pixel" style={{ fontSize: '1.2rem', color: 'var(--nova-blue)', marginBottom: 12 }}>UNIVERSAL SEARCH</h2>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', fontSize: '0.8rem' }}>
            Press <kbd style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glow)', borderRadius: 4, padding: '2px 8px', color: 'var(--nova-purple)' }}>Ctrl+K</kbd> to open the search panel anywhere.
          </p>
        </div>
      );
    case 'tasks':
      return <TodoPage />;
    case 'pomodoro':
      return <PomodoroPage />;
    case 'github':
      return <GitHubPage />;
    case 'leetcode':
      return <LeetCodePage />;
    case 'terminal':
      return <TerminalPage />;
    case 'bookmarks':
      return <BookmarksPage />;
    case 'settings':
      return <SettingsPage />;
    case 'profile':
      return <SettingsPage />;
    default:
      return <DashboardPage />;
  }
};

// ============================================
// App Component
// ============================================
const App: React.FC = () => {
  const { activeView, focusMode } = useUIStore();
  const { settings } = useSettingsStore();
  const { isAuthenticated } = useAuthStore();

  const [aiOpen, setAiOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    SyncManager.init();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {/* Background */}
        {settings.showBackground && (
          <NovaBackground showParticles={settings.showParticles} />
        )}

        {/* Universal Search Overlay */}
        <UniversalSearch />

        {/* AI Assistant Panel */}
        <AIAssistantPanel isOpen={aiOpen} onClose={() => setAiOpen(false)} />

        {/* Auth Modal */}
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

        {/* Toast Notifications */}
        <ToastContainer />

        {/* Floating AI & Auth Triggers */}
        {!focusMode && (
          <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 90, display: 'flex', gap: 10 }}>
            {!isAuthenticated && (
              <motion.button
                onClick={() => setAuthModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nova-btn nova-btn-ghost"
                style={{ borderRadius: 30, padding: '8px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border-glow)', gap: 6, backdropFilter: 'blur(10px)' }}
              >
                <UserIcon size={14} style={{ color: 'var(--nova-purple)' }} />
                <span className="font-pixel" style={{ fontSize: '0.7rem' }}>LOGIN / SYNC</span>
              </motion.button>
            )}

            <motion.button
              onClick={() => setAiOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168,85,247,0.5)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--nova-purple), var(--nova-cyan))',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 0 15px rgba(168,85,247,0.3)',
              }}
              title="Open AI Assistant"
            >
              <Sparkles size={20} />
            </motion.button>
          </div>
        )}

        {/* Main Layout */}
        <div
          className="nova-layout"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Sidebar */}
          <AnimatePresence>
            {!focusMode && <Sidebar />}
          </AnimatePresence>

          {/* Main Area */}
          <main className="nova-main">
            {/* Header */}
            {!focusMode && <Header />}

            {/* Content */}
            <div className="nova-content nova-scroll">
              <Suspense fallback={<PageLoader />}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <ViewRouter view={activeView} />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            </div>

            {/* Footer */}
            {!focusMode && <Footer />}
          </main>
        </div>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
