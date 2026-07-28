import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Send, Wand2, FileCode, Bug, GitBranch, BookOpen, Cpu, Plus } from 'lucide-react';
import { ForgeBlueprint, ForgeButton, ForgeAvatar, ForgeInput } from '@/components/forge';
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
    icon: <Wand2 className="h-5 w-5 text-[var(--df-primary-light)]" />,
    label: 'Generate Code',
    desc: 'Write functions, components, or modules',
  },
  {
    icon: <FileCode className="h-5 w-5 text-[var(--df-success)]" />,
    label: 'Generate API Docs',
    desc: 'Auto-document your endpoints',
  },
  {
    icon: <Bug className="h-5 w-5 text-[var(--df-danger)]" />,
    label: 'Bug Analysis',
    desc: 'Diagnose and suggest fixes',
  },
  {
    icon: <GitBranch className="h-5 w-5 text-[var(--df-warning)]" />,
    label: 'Code Review',
    desc: 'Review PRs and suggest improvements',
  },
  {
    icon: <BookOpen className="h-5 w-5 text-[var(--df-accent)]" />,
    label: 'Generate Docs',
    desc: 'Create README, wikis, and guides',
  },
  {
    icon: <Cpu className="h-5 w-5 text-[#A78BFA]" />,
    label: 'Architecture Review',
    desc: 'Analyze system design decisions',
  },
];

const MESSAGES = [
  {
    role: 'user',
    content:
      'Review this authentication middleware and identify potential security vulnerabilities.',
    time: '10:42 AM',
  },
  {
    role: 'assistant',
    content: `I've analyzed your authentication middleware. Here are the key findings:

1. **Token Invalidation**: Missing revocation check against Redis blacklist on logout.
2. **Timing Attack Vulnerability**: String comparison for signature verification should use \`crypto.timingSafeEqual()\`.
3. **Rate Limiting**: Auth route lacks request throttling, vulnerable to brute force.

Here is the proposed fix:`,
    codeSnippet: `// Fixed timing-safe verification
import crypto from 'crypto';

export function verifySignature(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}`,
    time: '10:43 AM',
  },
];

function AIWorkspacePage() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
      <ForgeBlueprint
        title="AI ARCHITECTURE & REASONING WORKSPACE"
        systemId="AI_ENGINE_01"
        revision="v4.5.0"
        status="ACTIVE"
        headerActions={
          <ForgeButton variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            New AI Session
          </ForgeButton>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[680px]">
          {/* Left Session History Sidebar */}
          <div className="space-y-4 border-r border-[rgba(6,182,212,0.15)] pr-4 hidden lg:block">
            <h4 className="text-xs font-mono text-[var(--df-accent)] uppercase tracking-wider">
              [PAST REASONING SESSIONS]
            </h4>

            <div className="space-y-2">
              {RECENT_SESSIONS.map((ses) => (
                <div
                  key={ses.id}
                  className="rounded-xl border border-[var(--df-border)] bg-[var(--df-surface-elevated)] p-3 text-xs transition-colors hover:border-[var(--df-accent)] cursor-pointer"
                >
                  <p className="font-medium text-white truncate">{ses.title}</p>
                  <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-[var(--df-muted-foreground)]">
                    <span>{ses.messages} msgs</span>
                    <span>{ses.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main AI Chat & Code Area */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-6">
            {/* Action Cards Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AI_ACTIONS.slice(0, 3).map((act) => (
                <button
                  key={act.label}
                  type="button"
                  className="flex items-center gap-3 rounded-xl border border-[var(--df-border)] bg-[var(--df-surface)] p-3 text-left transition-all hover:border-[var(--df-accent)] hover:bg-[var(--df-surface-elevated)] cursor-pointer"
                >
                  {act.icon}
                  <div>
                    <p className="text-xs font-semibold text-white">{act.label}</p>
                    <p className="text-[10px] font-mono text-[var(--df-muted-foreground)] truncate">
                      {act.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Conversation Feed */}
            <div className="flex-1 space-y-4 overflow-y-auto max-h-[420px] pr-2">
              {MESSAGES.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex gap-3 rounded-2xl p-4 text-xs font-sans border',
                    msg.role === 'user'
                      ? 'bg-[var(--df-surface-elevated)] border-[var(--df-border-strong)] ml-auto max-w-xl'
                      : 'bg-[#101014] border-[rgba(6,182,212,0.3)] shadow-[0_0_20px_rgba(6,182,212,0.05)]'
                  )}
                >
                  <ForgeAvatar
                    name={msg.role === 'user' ? 'Alex M.' : 'Forge AI'}
                    size="sm"
                    glow={msg.role === 'assistant'}
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between font-mono text-[10px] text-[var(--df-muted-foreground)]">
                      <span className="font-bold text-white uppercase">{msg.role}</span>
                      <span>{msg.time}</span>
                    </div>

                    <p className="text-white whitespace-pre-wrap leading-relaxed">{msg.content}</p>

                    {msg.codeSnippet && (
                      <div className="rounded-xl border border-[var(--df-border)] bg-[#07070A] p-3 font-mono text-[11px] text-[#34D399] overflow-x-auto">
                        <pre>{msg.codeSnippet}</pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Prompt Input Box */}
            <div className="relative flex items-center">
              <ForgeInput
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask Forge AI to analyze architecture, review PRs, or refactor code..."
                mono
                rightIcon={
                  <ForgeButton
                    variant="gradient"
                    size="xs"
                    leftIcon={<Send className="h-3.5 w-3.5" />}
                  >
                    Send
                  </ForgeButton>
                }
              />
            </div>
          </div>
        </div>
      </ForgeBlueprint>
    </div>
  );
}
