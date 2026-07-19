import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  Activity,
  GitCommit,
  CheckCircle2,
  AlertCircle,
  Users,
  FolderKanban,
  Zap,
  ArrowRight,
  GitBranch,
  Circle,
  Plus,
  MoreHorizontal,
  Code2,
  Sparkles,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/shared/page-container';
import { StatCard } from '@/components/shared/stat-card';
import { GlassCard } from '@/components/shared/glass-card';
import { GradientButton } from '@/components/shared/gradient-button';
import { IconButton } from '@/components/shared/icon-button';
import { MetricCard } from '@/components/shared/metric-card';
import { Badge } from '@/components/shared/badge';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

// ── Fake Data ─────────────────────────────────────────────────
const STAT_CARDS = [
  {
    title: 'Active Projects',
    value: '14',
    change: 16.7,
    icon: <FolderKanban className="h-4 w-4" />,
    accent: true,
  },
  { title: 'Open Tasks', value: '247', change: -3.2, icon: <CheckCircle2 className="h-4 w-4" /> },
  { title: 'Team Members', value: '38', change: 5.6, icon: <Users className="h-4 w-4" /> },
  {
    title: 'AI Queries Today',
    value: '1.2k',
    change: 42.0,
    icon: <Sparkles className="h-4 w-4" />,
  },
];

const ACTIVITY_ITEMS = [
  {
    type: 'commit',
    user: 'Sarah K.',
    msg: 'feat: add real-time collaboration layer',
    repo: 'devforge-ui',
    time: '4m ago',
    avatar: 'SK',
  },
  {
    type: 'deploy',
    user: 'CI Pipeline',
    msg: 'Deployment to production succeeded',
    repo: 'api-gateway',
    time: '12m ago',
    avatar: 'CI',
  },
  {
    type: 'issue',
    user: 'Alex M.',
    msg: 'Fixed: race condition in sprint resolver',
    repo: 'backend',
    time: '28m ago',
    avatar: 'AM',
  },
  {
    type: 'pr',
    user: 'You',
    msg: 'Opened PR: Auth token refresh flow',
    repo: 'auth-service',
    time: '1h ago',
    avatar: 'JD',
  },
  {
    type: 'issue',
    user: 'Priya N.',
    msg: 'Closed: dashboard render bottleneck',
    repo: 'devforge-ui',
    time: '2h ago',
    avatar: 'PN',
  },
];

const PROJECT_CARDS = [
  {
    name: 'DevForge UI',
    lang: 'TypeScript',
    progress: 68,
    issues: 12,
    status: 'active',
    color: 'bg-[var(--df-primary)]',
  },
  {
    name: 'API Gateway',
    lang: 'Go',
    progress: 82,
    issues: 4,
    status: 'active',
    color: 'bg-[var(--df-success)]',
  },
  {
    name: 'Auth Service',
    lang: 'Rust',
    progress: 45,
    issues: 8,
    status: 'in-review',
    color: 'bg-[var(--df-warning)]',
  },
  {
    name: 'ML Pipeline',
    lang: 'Python',
    progress: 20,
    issues: 21,
    status: 'backlog',
    color: 'bg-[var(--df-info)]',
  },
];

const QUICK_ACTIONS = [
  { icon: <Plus className="h-4 w-4" />, label: 'New Task', shortcut: 'C T' },
  { icon: <GitBranch className="h-4 w-4" />, label: 'New Branch', shortcut: 'C B' },
  { icon: <Terminal className="h-4 w-4" />, label: 'Open Terminal', shortcut: '⌃`' },
  { icon: <Sparkles className="h-4 w-4" />, label: 'Ask AI', shortcut: 'C I' },
];

const RECENT_DEPLOYMENTS = [
  {
    env: 'Production',
    version: 'v1.2.4',
    status: 'success',
    time: '2m ago',
    commit: 'feat: collab layer',
    by: 'SK',
  },
  {
    env: 'Staging',
    version: 'v1.2.5-rc',
    status: 'running',
    time: '5m ago',
    commit: 'fix: auth redirect',
    by: 'AM',
  },
  {
    env: 'Preview',
    version: 'v1.2.5-prev',
    status: 'success',
    time: '12m ago',
    commit: 'style: sidebar tokens',
    by: 'SK',
  },
];

const UPCOMING_TASKS = [
  {
    id: 't1',
    title: 'Implement OAuth2 PKCE flow',
    priority: 'High',
    assignee: 'AM',
    label: 'Auth',
  },
  {
    id: 't2',
    title: 'Design token migration to CSS vars',
    priority: 'Medium',
    assignee: 'SK',
    label: 'Frontend',
  },
  { id: 't3', title: 'Write API rate limit specs', priority: 'Low', assignee: 'JD', label: 'Docs' },
];

const SYSTEM_HEALTH = [
  { name: 'API Gateway', status: 'healthy', uptime: '99.99%', latency: '24ms' },
  { name: 'Auth Service', status: 'healthy', uptime: '99.98%', latency: '12ms' },
  { name: 'Database Cluster', status: 'healthy', uptime: '100%', latency: '2ms' },
];

const activityIconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  commit: { icon: <GitCommit className="h-3.5 w-3.5" />, color: 'text-[var(--df-primary)]' },
  deploy: { icon: <CheckCircle2 className="h-3.5 w-3.5" />, color: 'text-[var(--df-success)]' },
  issue: { icon: <AlertCircle className="h-3.5 w-3.5" />, color: 'text-[var(--df-warning)]' },
  pr: { icon: <GitBranch className="h-3.5 w-3.5" />, color: 'text-[var(--df-info)]' },
};

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: {
    label: 'Active',
    color: 'text-[var(--df-success)] bg-[var(--df-success)]/10',
    dot: 'bg-[var(--df-success)]',
  },
  'in-review': {
    label: 'In Review',
    color: 'text-[var(--df-warning)] bg-[var(--df-warning)]/10',
    dot: 'bg-[var(--df-warning)]',
  },
  backlog: {
    label: 'Backlog',
    color: 'text-[var(--df-muted-fg)] bg-[var(--df-secondary)]',
    dot: 'bg-[var(--df-muted-fg)]',
  },
};

// ── Fake chart bar data ────────────────────────────────────────
const CHART_DATA = [40, 65, 48, 80, 55, 90, 72, 88, 60, 95, 78, 100];
const CHART_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// ── Component ─────────────────────────────────────────────────
function DashboardPage() {
  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="Good morning, John 👋"
        description="Here's what's happening in your workspace today."
      >
        <GradientButton icon={<Zap className="h-4 w-4" />} size="sm">
          Quick action
        </GradientButton>
      </PageHeader>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Chart placeholder — 2 cols */}
        <div className="lg:col-span-2">
          <GlassCard className="h-full">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-[var(--df-fg)]">Velocity Trends</h2>
                <p className="mt-0.5 text-xs text-[var(--df-muted-fg)]">
                  Story points completed per sprint
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {['1W', '1M', '3M', '1Y'].map((p, i) => (
                  <button
                    key={p}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-medium transition-colors',
                      i === 2
                        ? 'bg-[var(--df-primary)]/15 text-[var(--df-primary)]'
                        : 'text-[var(--df-muted-fg)] hover:text-[var(--df-fg)]'
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar chart placeholder */}
            <div className="relative">
              {/* Y-axis guide lines */}
              <div className="absolute inset-0 flex flex-col justify-between pb-8 pt-2 pointer-events-none">
                {[100, 75, 50, 25, 0].map((v) => (
                  <div key={v} className="flex items-center gap-2">
                    <span className="w-6 flex-shrink-0 text-right text-[10px] text-[var(--df-muted-fg)]/50">
                      {v}
                    </span>
                    <div className="h-px flex-1 bg-[var(--df-border)]/60" />
                  </div>
                ))}
              </div>

              {/* Bars */}
              <div className="ml-8 flex items-end gap-1.5 pb-8 pt-2" style={{ height: 180 }}>
                {CHART_DATA.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${v}%` }}
                    transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex flex-1 cursor-pointer flex-col items-center justify-end"
                    style={{ height: '100%' }}
                  >
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-[var(--df-primary)] to-[var(--df-accent)] opacity-70 group-hover:opacity-100 transition-opacity duration-150"
                      style={{ height: `${v}%` }}
                    />
                    {/* Tooltip */}
                    <div className="absolute -top-7 hidden rounded-lg border border-[var(--df-border)] bg-[var(--df-card)] px-2 py-1 text-[10px] font-medium text-[var(--df-fg)] shadow-lg group-hover:block">
                      {v}pts
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* X-axis labels */}
              <div className="ml-8 flex gap-1.5">
                {CHART_LABELS.map((l) => (
                  <span
                    key={l}
                    className="flex-1 text-center text-[10px] text-[var(--df-muted-fg)]/60"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary row */}
            <div className="mt-5 flex items-center gap-6 border-t border-[var(--df-border)] pt-4">
              {[
                { label: 'Avg velocity', value: '73 pts' },
                { label: 'Best sprint', value: '100 pts' },
                { label: 'Trend', value: '+18%', positive: true },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xs text-[var(--df-muted-fg)]">{s.label}</p>
                  <p
                    className={cn(
                      'mt-0.5 text-sm font-semibold',
                      s.positive ? 'text-[var(--df-success)]' : 'text-[var(--df-fg)]'
                    )}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions & AI Insight — 1 col */}
        <div className="flex flex-col gap-4">
          {/* Quick Actions */}
          <GlassCard>
            <h2 className="mb-4 text-sm font-semibold text-[var(--df-fg)]">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="flex flex-col items-start gap-2 rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)] p-3 text-left transition-colors hover:border-[var(--df-border-strong)] hover:bg-[var(--df-subtle)]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--df-primary)]/10 text-[var(--df-primary)]">
                    {action.icon}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-[var(--df-fg)]">{action.label}</p>
                    <kbd className="text-[10px] text-[var(--df-muted-fg)]">{action.shortcut}</kbd>
                  </div>
                </motion.button>
              ))}
            </div>
          </GlassCard>

          {/* AI Insight card */}
          <div className="relative overflow-hidden rounded-2xl border border-[var(--df-primary)]/20 bg-gradient-to-br from-[var(--df-primary)]/10 via-[var(--df-card)] to-[var(--df-card)] p-5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--df-primary)]/10 blur-2xl" />
            <div className="relative">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--df-primary)]/20 text-[var(--df-primary)]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-[var(--df-primary)]">AI Insight</span>
              </div>
              <p className="text-xs leading-relaxed text-[var(--df-muted-fg)]">
                Based on sprint velocity, your team will likely miss the Q3 deadline by{' '}
                <span className="text-[var(--df-warning)] font-medium">3 days</span>. Consider
                descoping 2 lower-priority issues.
              </p>
              <button className="mt-3 flex items-center gap-1 text-xs font-medium text-[var(--df-primary)] hover:underline">
                View full report <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row — Recent Activity & Projects */}
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <GlassCard className="h-full">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[var(--df-fg)]">Recent Activity</h2>
              <IconButton icon={<Activity className="h-4 w-4" />} label="View all" size="xs" />
            </div>
            <div className="flex flex-col gap-0">
              {ACTIVITY_ITEMS.map((item, i) => {
                const meta = activityIconMap[item.type];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                    className={cn(
                      'flex items-start gap-3 py-2.5',
                      i < ACTIVITY_ITEMS.length - 1 && 'border-b border-[var(--df-border)]'
                    )}
                  >
                    {/* Avatar */}
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)] text-[9px] font-bold text-white">
                      {item.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-[var(--df-fg)]">
                        <span className="text-[var(--df-muted-fg)]">{item.user}</span> — {item.msg}
                      </p>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span
                          className={cn(
                            'flex items-center gap-0.5 text-[10px] font-medium',
                            meta.color
                          )}
                        >
                          {meta.icon}
                          {item.repo}
                        </span>
                        <span className="text-[10px] text-[var(--df-muted-fg)]/60">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Projects */}
        <div className="lg:col-span-3">
          <GlassCard className="h-full">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[var(--df-fg)]">Active Projects</h2>
              <button className="flex items-center gap-1 text-xs font-medium text-[var(--df-primary)] hover:underline">
                View all <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {PROJECT_CARDS.map((proj, i) => {
                const status = statusConfig[proj.status];
                return (
                  <motion.div
                    key={proj.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ x: 2 }}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/50 p-3 transition-all hover:border-[var(--df-border-strong)] hover:bg-[var(--df-secondary)]"
                  >
                    {/* Color dot */}
                    <div className={cn('h-8 w-1 flex-shrink-0 rounded-full', proj.color)} />

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-[var(--df-fg)]">{proj.name}</p>
                        <span
                          className={cn(
                            'flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium',
                            status.color
                          )}
                        >
                          <Circle className={cn('h-1.5 w-1.5 fill-current', status.dot)} />
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3">
                        {/* Progress bar */}
                        <div className="flex flex-1 items-center gap-2">
                          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--df-subtle)]">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${proj.progress}%` }}
                              transition={{
                                duration: 0.8,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className={cn('h-full rounded-full', proj.color)}
                            />
                          </div>
                          <span className="flex-shrink-0 text-[10px] text-[var(--df-muted-fg)]">
                            {proj.progress}%
                          </span>
                        </div>
                        {/* Meta */}
                        <div className="flex items-center gap-2 text-[10px] text-[var(--df-muted-fg)]">
                          <span className="flex items-center gap-0.5">
                            <Code2 className="h-3 w-3" /> {proj.lang}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <AlertCircle className="h-3 w-3" /> {proj.issues}
                          </span>
                        </div>
                      </div>
                    </div>

                    <IconButton icon={<MoreHorizontal className="h-4 w-4" />} size="xs" />
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* New Section: Deployments, Upcoming Tasks, and System Health */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Deployments */}
        <GlassCard>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--df-fg)]">Recent Deployments</h2>
            <IconButton icon={<Plus className="h-4 w-4" />} size="xs" />
          </div>
          <div className="flex flex-col gap-3">
            {RECENT_DEPLOYMENTS.map((d, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-[var(--df-border)]/60 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--df-fg)]">{d.env}</span>
                    <Badge variant={d.status === 'success' ? 'success' : 'warning'} size="xs">
                      {d.status === 'success' ? 'Success' : 'Running'}
                    </Badge>
                  </div>
                  <p className="mt-1 text-[10px] text-[var(--df-muted-fg)]">{d.commit}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-[var(--df-primary)]">{d.version}</span>
                  <p className="text-[9px] text-[var(--df-muted-fg)]">{d.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Upcoming Tasks */}
        <GlassCard>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--df-fg)]">Upcoming Tasks</h2>
            <button className="text-xs font-medium text-[var(--df-primary)] hover:underline">
              View Kanban
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {UPCOMING_TASKS.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/30 p-3 hover:border-[var(--df-border-strong)] transition-all"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex rounded bg-[var(--df-primary)]/10 px-1.5 py-0.5 text-[9px] font-medium text-[var(--df-primary)]">
                      {t.label}
                    </span>
                    <span className="truncate text-xs font-medium text-[var(--df-fg)]">
                      {t.title}
                    </span>
                  </div>
                </div>
                <div className="ml-3 flex items-center gap-2 flex-shrink-0">
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-[9px] font-semibold border',
                      t.priority === 'High'
                        ? 'text-[var(--df-danger)] bg-[var(--df-danger)]/10 border-[var(--df-danger)]/20'
                        : t.priority === 'Medium'
                          ? 'text-[var(--df-warning)] bg-[var(--df-warning)]/10 border-[var(--df-warning)]/20'
                          : 'text-[var(--df-success)] bg-[var(--df-success)]/10 border-[var(--df-success)]/20'
                    )}
                  >
                    {t.priority}
                  </span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)] text-[9px] font-bold text-white">
                    {t.assignee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* System Health */}
        <GlassCard>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--df-fg)]">System Health</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--df-success)]">
              <ShieldCheck className="h-3.5 w-3.5" /> All systems operational
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {SYSTEM_HEALTH.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-[var(--df-border)]/60 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-xs font-semibold text-[var(--df-fg)]">{s.name}</p>
                  <p className="text-[9px] text-[var(--df-muted-fg)]">Uptime: {s.uptime}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[var(--df-success)]">{s.latency}</span>
                  <p className="text-[9px] text-[var(--df-muted-fg)]">Response time</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Metric Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard label="Sprint Burndown" value="67" unit="%" progress={67} color="primary" />
        <MetricCard label="Code Coverage" value="84" unit="%" progress={84} color="success" />
        <MetricCard label="Bug Rate" value="3.2" unit="/week" progress={32} color="warning" />
        <MetricCard label="Deploy Success" value="98" unit="%" progress={98} color="success" />
      </div>

      {/* Footer pad */}
      <div className="h-4" />
    </PageContainer>
  );
}
