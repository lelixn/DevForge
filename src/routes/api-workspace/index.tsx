import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { FolderOpen, Plus, Send } from 'lucide-react';
import { ForgeBlueprint, ForgeCard, ForgeButton, ForgeInput, ForgeTabs } from '@/components/forge';
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
  GET: 'text-[#34D399] bg-[rgba(16,185,129,0.15)] border-[rgba(16,185,129,0.3)]',
  POST: 'text-[#A78BFA] bg-[rgba(124,58,237,0.15)] border-[rgba(124,58,237,0.3)]',
  PUT: 'text-[#FBBF24] bg-[rgba(245,158,11,0.15)] border-[rgba(245,158,11,0.3)]',
  DELETE: 'text-[#F87171] bg-[rgba(239,68,68,0.15)] border-[rgba(239,68,68,0.3)]',
};

function APIWorkspacePage() {
  const [selectedReq, setSelectedReq] = useState(COLLECTIONS[0].requests[0]);
  const [activeTab, setActiveTab] = useState('params');

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-6">
      <ForgeBlueprint
        title="API ENDPOINT ARCHITECTURE WORKSPACE"
        systemId="API_GW_01"
        revision="v2.4.0"
        status="ONLINE"
        headerActions={
          <ForgeButton variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
            New Endpoint
          </ForgeButton>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[620px]">
          {/* Left Collections Sidebar */}
          <div className="space-y-4 border-r border-[rgba(6,182,212,0.15)] pr-4">
            <h4 className="text-xs font-mono text-[var(--df-accent)] uppercase tracking-wider">
              [COLLECTIONS & ENDPOINTS]
            </h4>

            <div className="space-y-4">
              {COLLECTIONS.map((col) => (
                <div key={col.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white font-mono">
                    <FolderOpen className="h-3.5 w-3.5 text-[var(--df-accent)]" />
                    <span>{col.name}</span>
                  </div>

                  <div className="space-y-1 pl-4">
                    {col.requests.map((req) => (
                      <button
                        key={req.id}
                        onClick={() => setSelectedReq(req)}
                        className={cn(
                          'flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-mono transition-colors cursor-pointer',
                          selectedReq.id === req.id
                            ? 'bg-[rgba(6,182,212,0.15)] text-white border border-[rgba(6,182,212,0.3)]'
                            : 'text-[var(--df-muted-foreground)] hover:bg-[rgba(255,255,255,0.04)] hover:text-white'
                        )}
                      >
                        <span className="truncate">{req.name}</span>
                        <span
                          className={cn(
                            'rounded px-1 py-0.5 text-[9px] font-bold border',
                            METHOD_COLORS[req.method]
                          )}
                        >
                          {req.method}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Endpoint Tester */}
          <div className="lg:col-span-3 space-y-6">
            {/* Request Bar */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'rounded-xl px-3 py-2 text-xs font-mono font-bold border shrink-0',
                  METHOD_COLORS[selectedReq.method]
                )}
              >
                {selectedReq.method}
              </span>
              <ForgeInput
                value={`https://api.devforge.io/v1${selectedReq.path}`}
                readOnly
                mono
                rightIcon={
                  <ForgeButton
                    variant="gradient"
                    size="xs"
                    leftIcon={<Send className="h-3.5 w-3.5" />}
                  >
                    Execute
                  </ForgeButton>
                }
              />
            </div>

            {/* Request Tabs */}
            <ForgeTabs
              tabs={[
                { id: 'params', label: 'Query Params' },
                { id: 'headers', label: 'Headers', count: 3 },
                { id: 'body', label: 'Request Body' },
                { id: 'auth', label: 'Auth Token' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {/* Response Console */}
            <ForgeCard blueprint spotlight className="p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[rgba(6,182,212,0.2)] pb-2 text-[11px] text-[var(--df-muted-foreground)]">
                <span className="text-[#34D399] font-bold">STATUS: 200 OK</span>
                <span>TIME: 42ms</span>
                <span>SIZE: 1.2 KB</span>
              </div>

              <div className="rounded-xl bg-[#07070A] p-4 text-[#34D399] overflow-x-auto border border-[var(--df-border)]">
                <pre>{`{
  "status": "success",
  "code": 200,
  "data": {
    "endpoint": "${selectedReq.path}",
    "method": "${selectedReq.method}",
    "timestamp": "${new Date().toISOString()}",
    "latency": "42ms"
  }
}`}</pre>
              </div>
            </ForgeCard>
          </div>
        </div>
      </ForgeBlueprint>
    </div>
  );
}
