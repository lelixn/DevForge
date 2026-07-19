import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Rocket, Clock } from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/shared/page-container';
import { GlassCard } from '@/components/shared/glass-card';
import { MetricCard } from '@/components/shared/metric-card';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/analytics/')({ component: AnalyticsPage });

const VELOCITY_DATA = [32, 45, 38, 62, 55, 78, 65, 82, 70, 91, 85, 100];
const BURNDOWN_DATA = [100, 88, 76, 68, 55, 48, 40, 34, 22, 14, 6, 0];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DEPLOY_STATS = [
  { env: 'Production', count: 18, success: 17, failed: 1 },
  { env: 'Staging', count: 34, success: 31, failed: 3 },
  { env: 'Preview', count: 92, success: 89, failed: 3 },
];

const API_ENDPOINTS = [
  { path: '/auth/login', calls: '12.4k', p95: '48ms', errors: '0.2%' },
  { path: '/projects', calls: '8.1k', p95: '62ms', errors: '0.0%' },
  { path: '/tasks', calls: '21.3k', p95: '35ms', errors: '0.4%' },
  { path: '/ai/generate', calls: '4.2k', p95: '820ms', errors: '1.1%' },
];

function BarChart({
  data,
  label,
  color = '#7C3AED',
}: {
  data: number[];
  label: string;
  color?: string;
}) {
  const max = Math.max(...data);
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-xs font-medium text-[var(--df-muted-fg)]">{label}</span>
      </div>
      <div className="flex items-end gap-1" style={{ height: 120 }}>
        {data.map((v, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${(v / max) * 100}%` }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex-1 cursor-pointer rounded-t-md opacity-70 hover:opacity-100 transition-opacity"
            style={{ backgroundColor: color }}
          >
            <div className="absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded border border-[var(--df-border)] bg-[var(--df-card)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--df-fg)] group-hover:block">
              {v}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-1 flex gap-1">
        {MONTHS.map((m) => (
          <span key={m} className="flex-1 text-center text-[9px] text-[var(--df-muted-fg)]/50">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPage() {
  const [period, setPeriod] = useState('3M');
  return (
    <PageContainer>
      <PageHeader title="Analytics" description="Performance metrics and engineering intelligence">
        <div className="flex items-center gap-1">
          {['1W', '1M', '3M', '1Y'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                period === p
                  ? 'bg-[var(--df-primary)]/15 text-[var(--df-primary)]'
                  : 'text-[var(--df-muted-fg)] hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </PageHeader>

      {/* Top metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Sprint Velocity" value="85" unit="pts" progress={85} color="primary" />
        <MetricCard label="Code Coverage" value="84" unit="%" progress={84} color="success" />
        <MetricCard label="Deploy Success" value="98" unit="%" progress={98} color="success" />
        <MetricCard label="Bug Rate" value="3.2" unit="/wk" progress={32} color="warning" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[var(--df-fg)]">Sprint Velocity</h2>
              <p className="text-xs text-[var(--df-muted-fg)]">Story points completed per sprint</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[var(--df-success)]">
              <TrendingUp className="h-3.5 w-3.5" />
              +18% vs prev period
            </div>
          </div>
          <BarChart data={VELOCITY_DATA} label="Story Points" />
        </GlassCard>

        <GlassCard>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-[var(--df-fg)]">Sprint Burndown</h2>
              <p className="text-xs text-[var(--df-muted-fg)]">Remaining work over sprint days</p>
            </div>
          </div>
          <BarChart data={BURNDOWN_DATA} label="Remaining Points" color="#EF4444" />
        </GlassCard>
      </div>

      {/* Deployments & API */}
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <h2 className="mb-4 text-sm font-semibold text-[var(--df-fg)]">Deployment Summary</h2>
          <div className="flex flex-col gap-3">
            {DEPLOY_STATS.map((d) => (
              <div key={d.env} className="flex items-center gap-4">
                <span className="w-20 flex-shrink-0 text-xs font-medium text-[var(--df-fg)]">
                  {d.env}
                </span>
                <div
                  className="flex flex-1 overflow-hidden rounded-full bg-[var(--df-secondary)]"
                  style={{ height: 8 }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(d.success / d.count) * 100}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-[var(--df-success)] rounded-l-full"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(d.failed / d.count) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-[var(--df-danger)]"
                  />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[var(--df-muted-fg)]">
                  <span className="text-[var(--df-success)]">✓{d.success}</span>
                  <span className="text-[var(--df-danger)]">✗{d.failed}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-[var(--df-muted-fg)]">
            <span className="flex items-center gap-1.5">
              <Rocket className="h-3.5 w-3.5 text-[var(--df-primary)]" />
              144 total deployments
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Avg deploy: 3.2 min
            </span>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-sm font-semibold text-[var(--df-fg)]">API Usage</h2>
          <div className="mb-2 grid grid-cols-4 gap-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--df-muted-fg)]">
            <span>Endpoint</span>
            <span className="text-right">Calls</span>
            <span className="text-right">P95</span>
            <span className="text-right">Errors</span>
          </div>
          {API_ENDPOINTS.map((e, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-2 border-t border-[var(--df-border)] py-2.5 text-xs"
            >
              <span className="truncate font-mono text-[var(--df-primary)]">{e.path}</span>
              <span className="text-right text-[var(--df-fg)]">{e.calls}</span>
              <span className="text-right text-[var(--df-muted-fg)]">{e.p95}</span>
              <span
                className={cn(
                  'text-right font-medium',
                  parseFloat(e.errors) > 0.5
                    ? 'text-[var(--df-danger)]'
                    : 'text-[var(--df-success)]'
                )}
              >
                {e.errors}
              </span>
            </div>
          ))}
        </GlassCard>
      </div>

      {/* Team metrics */}
      <GlassCard>
        <h2 className="mb-4 text-sm font-semibold text-[var(--df-fg)]">Team Performance</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              label: 'PRs Merged',
              val: '142',
              sub: 'this month',
              icon: <Activity className="h-4 w-4" />,
              color: 'text-[var(--df-primary)]',
            },
            {
              label: 'Code Reviews',
              val: '89',
              sub: 'completed',
              icon: <BarChart3 className="h-4 w-4" />,
              color: 'text-[var(--df-success)]',
            },
            {
              label: 'Avg PR Cycle',
              val: '4.2h',
              sub: 'from open to merge',
              icon: <Clock className="h-4 w-4" />,
              color: 'text-[var(--df-warning)]',
            },
            {
              label: 'Bug Fix Rate',
              val: '94%',
              sub: 'within SLA',
              icon: <TrendingUp className="h-4 w-4" />,
              color: 'text-[var(--df-success)]',
            },
          ].map((m) => (
            <div
              key={m.label}
              className="flex flex-col gap-2 rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/40 p-4"
            >
              <span className={m.color}>{m.icon}</span>
              <p className="text-xl font-bold text-[var(--df-fg)]">{m.val}</p>
              <div>
                <p className="text-xs font-medium text-[var(--df-fg)]">{m.label}</p>
                <p className="text-[10px] text-[var(--df-muted-fg)]">{m.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </PageContainer>
  );
}
