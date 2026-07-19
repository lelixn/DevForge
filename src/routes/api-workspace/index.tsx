import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  ChevronRight,
  Folder,
  FolderOpen,
  Plus,
  Send,
  ChevronDown,
  Globe,
  Lock,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { GradientButton } from '@/components/shared/gradient-button';
import { IconButton } from '@/components/shared/icon-button';
import { Badge } from '@/components/shared/badge';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/api-workspace/')({ component: APIWorkspacePage });

const COLLECTIONS = [
  {
    id: '1',
    name: 'Auth Service',
    requests: [
      { id: 'r1', method: 'POST', path: '/auth/login', name: 'Login' },
      { id: 'r2', method: 'POST', path: '/auth/register', name: 'Register' },
      { id: 'r3', method: 'POST', path: '/auth/refresh', name: 'Refresh Token' },
      { id: 'r4', method: 'DELETE', path: '/auth/logout', name: 'Logout' },
    ],
  },
  {
    id: '2',
    name: 'API Gateway',
    requests: [
      { id: 'r5', method: 'GET', path: '/health', name: 'Health Check' },
      { id: 'r6', method: 'GET', path: '/metrics', name: 'Metrics' },
      { id: 'r7', method: 'POST', path: '/rate-limit/config', name: 'Set Rate Limit' },
    ],
  },
  {
    id: '3',
    name: 'Projects API',
    requests: [
      { id: 'r8', method: 'GET', path: '/projects', name: 'List Projects' },
      { id: 'r9', method: 'POST', path: '/projects', name: 'Create Project' },
      { id: 'r10', method: 'GET', path: '/projects/:id', name: 'Get Project' },
    ],
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: 'text-[var(--df-success)] bg-[var(--df-success)]/10',
  POST: 'text-[var(--df-primary)] bg-[var(--df-primary)]/10',
  PUT: 'text-[var(--df-warning)] bg-[var(--df-warning)]/10',
  PATCH: 'text-[var(--df-warning)] bg-[var(--df-warning)]/10',
  DELETE: 'text-[var(--df-danger)] bg-[var(--df-danger)]/10',
};

const RESPONSE_BODY = `{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4...",
    "expires_in": 3600,
    "user": {
      "id": "usr_01HXKZMQB4P9FDK7NM8VY3CWJ",
      "email": "john@devforge.io",
      "name": "John Doe",
      "role": "admin"
    }
  }
}`;

function APIWorkspacePage() {
  const [activeRequest, setActiveRequest] = useState('r1');
  const [activeMethod, setActiveMethod] = useState('POST');
  const [activeTab, setActiveTab] = useState('body');
  const [expandedCols, setExpandedCols] = useState(['1']);

  const toggleCollection = (id: string) => {
    setExpandedCols((p) => (p.includes(id) ? p.filter((c) => c !== id) : [...p, id]));
  };

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Left sidebar — collections */}
      <div className="flex w-64 flex-shrink-0 flex-col border-r border-[var(--df-border)] bg-[var(--df-sidebar)]">
        <div className="flex items-center justify-between border-b border-[var(--df-border)] px-4 py-3">
          <span className="text-xs font-semibold text-[var(--df-fg)]">Collections</span>
          <IconButton icon={<Plus className="h-3.5 w-3.5" />} size="xs" label="New collection" />
        </div>

        {/* Environments */}
        <div className="flex items-center gap-2 border-b border-[var(--df-border)] px-4 py-2.5">
          <Globe className="h-3.5 w-3.5 text-[var(--df-muted-fg)]" />
          <span className="flex-1 text-xs text-[var(--df-muted-fg)]">Environment</span>
          <button className="flex items-center gap-1 rounded-md border border-[var(--df-border)] bg-[var(--df-secondary)] px-2 py-0.5 text-[10px] font-medium text-[var(--df-fg)]">
            Development <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        {/* Collections list */}
        <div className="flex-1 overflow-y-auto py-2">
          {COLLECTIONS.map((col) => {
            const expanded = expandedCols.includes(col.id);
            return (
              <div key={col.id}>
                <button
                  onClick={() => toggleCollection(col.id)}
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-medium text-[var(--df-fg)] hover:bg-[var(--df-secondary)] transition-colors"
                >
                  <ChevronRight
                    className={cn(
                      'h-3.5 w-3.5 text-[var(--df-muted-fg)] transition-transform',
                      expanded && 'rotate-90'
                    )}
                  />
                  {expanded ? (
                    <FolderOpen className="h-3.5 w-3.5 text-[var(--df-warning)]" />
                  ) : (
                    <Folder className="h-3.5 w-3.5 text-[var(--df-muted-fg)]" />
                  )}
                  {col.name}
                </button>
                {expanded && (
                  <div className="ml-4 border-l border-[var(--df-border)] pl-3">
                    {col.requests.map((req) => (
                      <button
                        key={req.id}
                        onClick={() => {
                          setActiveRequest(req.id);
                          setActiveMethod(req.method);
                        }}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-r-lg px-2 py-1.5 text-left text-xs transition-colors',
                          activeRequest === req.id
                            ? 'bg-[var(--df-primary)]/10 text-[var(--df-primary)]'
                            : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]'
                        )}
                      >
                        <span
                          className={cn(
                            'rounded px-1.5 py-0.5 text-[9px] font-bold',
                            METHOD_COLORS[req.method] ?? 'text-[var(--df-muted-fg)]'
                          )}
                        >
                          {req.method}
                        </span>
                        <span className="truncate">{req.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main request/response area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* URL bar */}
        <div className="flex items-center gap-3 border-b border-[var(--df-border)] bg-[var(--df-sidebar)] px-5 py-3">
          <select
            value={activeMethod}
            onChange={(e) => setActiveMethod(e.target.value)}
            className={cn(
              'rounded-lg border border-[var(--df-border)] px-3 py-1.5 text-xs font-bold focus:outline-none bg-[var(--df-secondary)]',
              METHOD_COLORS[activeMethod]
            )}
          >
            {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-[var(--df-border)] bg-[var(--df-input)] px-3 py-1.5">
            <Lock className="h-3.5 w-3.5 flex-shrink-0 text-[var(--df-muted-fg)]" />
            <span className="text-xs text-[var(--df-muted-fg)]">{'{{baseUrl}}'}</span>
            <span className="text-xs text-[var(--df-fg)]">/auth/login</span>
          </div>
          <GradientButton icon={<Send className="h-4 w-4" />} size="sm">
            Send
          </GradientButton>
        </div>

        {/* Request / Response split */}
        <div className="flex flex-1 overflow-hidden">
          {/* Request panel */}
          <div className="flex w-1/2 flex-col border-r border-[var(--df-border)]">
            <div className="flex border-b border-[var(--df-border)] px-1">
              {['body', 'headers', 'params', 'auth'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-4 py-2.5 text-xs font-medium capitalize transition-colors',
                    activeTab === tab
                      ? 'border-b-2 border-[var(--df-primary)] text-[var(--df-primary)]'
                      : 'text-[var(--df-muted-fg)] hover:text-[var(--df-fg)]'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-auto bg-[var(--df-sidebar)] p-4">
              <pre className="font-mono text-xs leading-relaxed text-[var(--df-fg)]">{`{\n  "email": "john@devforge.io",\n  "password": "••••••••••",\n  "remember_me": true\n}`}</pre>
            </div>
          </div>

          {/* Response panel */}
          <div className="flex w-1/2 flex-col">
            <div className="flex items-center justify-between border-b border-[var(--df-border)] px-4 py-2.5">
              <div className="flex items-center gap-3">
                <Badge variant="success" size="xs">
                  <CheckCircle2 className="h-3 w-3" /> 200 OK
                </Badge>
                <span className="text-xs text-[var(--df-muted-fg)]">248ms</span>
                <span className="text-xs text-[var(--df-muted-fg)]">1.2 KB</span>
              </div>
              <IconButton icon={<Copy className="h-3.5 w-3.5" />} size="xs" label="Copy response" />
            </div>
            <div className="flex-1 overflow-auto bg-[var(--df-sidebar)] p-4">
              <pre className="font-mono text-xs leading-relaxed">
                {RESPONSE_BODY.split('\n').map((line, i) => (
                  <span
                    key={i}
                    className={cn(
                      line.includes('"status"') || line.includes('"token"')
                        ? 'text-[var(--df-success)]'
                        : line.includes(':')
                          ? 'text-[var(--df-primary)]'
                          : 'text-[var(--df-fg)]'
                    )}
                  >
                    {line}
                    {'\n'}
                  </span>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
