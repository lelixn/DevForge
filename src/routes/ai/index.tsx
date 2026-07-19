import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Send,
  Wand2,
  FileCode,
  Bug,
  GitBranch,
  BookOpen,
  Cpu,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Zap,
  ChevronDown,
  Plus,
  Clock,
} from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/shared/page-container';
import { GradientButton } from '@/components/shared/gradient-button';
import { IconButton } from '@/components/shared/icon-button';
import { GlassCard } from '@/components/shared/glass-card';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/ai/')({ component: AIWorkspacePage });

const RECENT_SESSIONS = [
  { id: '1', title: 'Auth service architecture review', time: '2h ago', messages: 12 },
  { id: '2', title: 'Generate API docs for gateway', time: 'Yesterday', messages: 8 },
  { id: '3', title: 'Bug analysis: race condition', time: '2 days ago', messages: 24 },
  { id: '4', title: 'Code review: database pool refactor', time: '3 days ago', messages: 6 },
];

const AI_ACTIONS = [
  {
    icon: <Wand2 className="h-5 w-5" />,
    label: 'Generate Code',
    desc: 'Write functions, components, or modules',
    color: '#7C3AED',
  },
  {
    icon: <FileCode className="h-5 w-5" />,
    label: 'Generate API Docs',
    desc: 'Auto-document your endpoints',
    color: '#10B981',
  },
  {
    icon: <Bug className="h-5 w-5" />,
    label: 'Bug Analysis',
    desc: 'Diagnose and suggest fixes',
    color: '#EF4444',
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    label: 'Code Review',
    desc: 'Review PRs and suggest improvements',
    color: '#F59E0B',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: 'Generate Docs',
    desc: 'Create README, wikis, and guides',
    color: '#3B82F6',
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    label: 'Architecture Review',
    desc: 'Analyze system design decisions',
    color: '#8B5CF6',
  },
];

const MESSAGES = [
  {
    role: 'user',
    content:
      'Review this authentication middleware and identify potential security vulnerabilities.',
  },
  {
    role: 'ai',
    content: `I've analyzed the authentication middleware. Here are the key findings:\n\n**🔴 Critical Issues:**\n- JWT secret is hardcoded in the source — should be loaded from environment variables\n- No token expiry validation — tokens never expire\n\n**🟡 Medium Priority:**\n- Missing rate limiting on auth endpoints\n- No refresh token rotation implemented\n\n**✅ Good Practices Found:**\n- bcrypt password hashing is correctly configured\n- CORS headers are properly set\n\nWould you like me to generate a secure implementation?`,
  },
  { role: 'user', content: 'Yes, generate the secure implementation with proper token rotation.' },
];

function ChatMessage({ msg, index }: { msg: (typeof MESSAGES)[0]; index: number }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      <div
        className={cn(
          'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold',
          isUser
            ? 'bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)] text-white'
            : 'bg-[var(--df-secondary)] text-[var(--df-primary)]'
        )}
      >
        {isUser ? 'JD' : <Sparkles className="h-3.5 w-3.5" />}
      </div>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-[var(--df-primary)] text-white'
            : 'bg-[var(--df-card)] border border-[var(--df-border)] text-[var(--df-fg)]'
        )}
      >
        {msg.content.split('\n').map((line, i) => (
          <span key={i}>
            {line.startsWith('**') && line.endsWith('**') ? (
              <strong>{line.slice(2, -2)}</strong>
            ) : (
              line
            )}
            {i < msg.content.split('\n').length - 1 && <br />}
          </span>
        ))}
        {!isUser && (
          <div className="mt-3 flex items-center gap-1.5 border-t border-[var(--df-border)] pt-2">
            <IconButton icon={<Copy className="h-3.5 w-3.5" />} size="xs" label="Copy" />
            <IconButton icon={<RotateCcw className="h-3.5 w-3.5" />} size="xs" label="Regenerate" />
            <IconButton icon={<ThumbsUp className="h-3.5 w-3.5" />} size="xs" label="Good" />
            <IconButton icon={<ThumbsDown className="h-3.5 w-3.5" />} size="xs" label="Bad" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function AIWorkspacePage() {
  const [input, setInput] = useState('');
  const [activeSession, setActiveSession] = useState('1');

  return (
    <PageContainer className="h-[calc(100vh-56px)] overflow-hidden">
      <PageHeader
        title="AI Workspace"
        description="Your intelligent engineering co-pilot powered by DevForge AI"
      >
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--df-fg)]">
            <Zap className="h-3.5 w-3.5 text-[var(--df-primary)]" />
            DevForge AI Pro
            <ChevronDown className="h-3 w-3 text-[var(--df-muted-fg)]" />
          </button>
          <GradientButton icon={<Plus className="h-4 w-4" />} size="sm">
            New Session
          </GradientButton>
        </div>
      </PageHeader>

      <div className="flex gap-4 flex-1 overflow-hidden" style={{ height: 'calc(100vh - 220px)' }}>
        {/* Left sidebar */}
        <div className="flex w-64 flex-shrink-0 flex-col gap-3">
          {/* AI Actions */}
          <GlassCard className="flex-shrink-0 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--df-muted-fg)]">
              Quick Actions
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {AI_ACTIONS.map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-start gap-1.5 rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)] p-2 text-left transition-all hover:border-[var(--df-border-strong)]"
                >
                  <span style={{ color: action.color }}>{action.icon}</span>
                  <span className="text-[10px] font-semibold leading-tight text-[var(--df-fg)]">
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </GlassCard>

          {/* Recent sessions */}
          <GlassCard className="flex-1 overflow-hidden p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--df-muted-fg)]">
              Recent Sessions
            </p>
            <div className="flex flex-col gap-1 overflow-y-auto">
              {RECENT_SESSIONS.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setActiveSession(session.id)}
                  className={cn(
                    'flex flex-col items-start rounded-lg px-2.5 py-2 text-left transition-all',
                    activeSession === session.id
                      ? 'bg-[var(--df-primary)]/10 text-[var(--df-primary)]'
                      : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]'
                  )}
                >
                  <span className="line-clamp-1 text-xs font-medium">{session.title}</span>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[10px] opacity-70">
                    <Clock className="h-3 w-3" />
                    {session.time}
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Chat panel */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)]">
          {/* Chat header */}
          <div className="flex items-center gap-3 border-b border-[var(--df-border)] px-5 py-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)]">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--df-fg)]">
                Auth service architecture review
              </p>
              <p className="text-[10px] text-[var(--df-muted-fg)]">
                Session • 2h ago • 12 messages
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-5">
            {MESSAGES.map((msg, i) => (
              <ChatMessage key={i} msg={msg} index={i} />
            ))}
            {/* Typing indicator */}
            <div className="flex gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--df-secondary)] text-[var(--df-primary)]">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="flex items-center gap-1.5 rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[var(--df-primary)]"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[var(--df-border)] p-4">
            <div className="flex items-end gap-3 rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/50 px-4 py-3 focus-within:border-[var(--df-border-focus)]">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask DevForge AI anything about your code, architecture, or team..."
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm text-[var(--df-fg)] placeholder:text-[var(--df-muted-fg)] focus:outline-none"
              />
              <GradientButton
                icon={<Send className="h-4 w-4" />}
                size="sm"
                disabled={!input.trim()}
              >
                Send
              </GradientButton>
            </div>
            <p className="mt-2 text-center text-[10px] text-[var(--df-muted-fg)]">
              DevForge AI may make mistakes. Review important outputs.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
