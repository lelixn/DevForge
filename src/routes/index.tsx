import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useState } from 'react';
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
  Plus,
  MoreHorizontal,
  Code2,
  Sparkles,
  Terminal,
  ShieldCheck,
  Search,
  Grid,
  List,
  RefreshCw,
  Calendar,
  Filter,
} from 'lucide-react';
import { PageContainer } from '@/components/shared/page-container';
import { StatCard } from '@/components/shared/stat-card';
import { IconButton } from '@/components/shared/icon-button';
import { MetricCard } from '@/components/shared/metric-card';
import { ForgeCard } from '@/components/forge/ForgeCard';
import { ForgeButton } from '@/components/forge/ForgeButton';
import { ForgeBadge } from '@/components/forge/ForgeBadge';
import { ForgeAvatar } from '@/components/forge/ForgeAvatar';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

// ── Mock Data ─────────────────────────────────────────────────
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
    color: 'bg-[var(--df-muted-foreground)]',
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
  {
    id: 't3',
    title: 'Write API rate limit specs',
    priority: 'Low',
    assignee: 'JD',
    label: 'Docs',
  },
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
  pr: { icon: <GitBranch className="h-3.5 w-3.5" />, color: 'text-[var(--df-accent)]' },
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
    color: 'text-[var(--df-muted-foreground)] bg-[var(--df-card)]',
    dot: 'bg-[var(--df-muted-foreground)]',
  },
};

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

function DashboardPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <PageContainer>
      {/* ── TOP SECTION: Greeting & Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Banner */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-[24px] border border-[var(--df-primary)]/20 bg-gradient-to-br from-[var(--df-primary)]/15 via-[var(--df-card)] to-[var(--df-card)] p-6 shadow-md">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--df-primary)]/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[var(--df-accent)]/5 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col justify-between h-full min-h-[140px]">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[var(--df-success)] animate-pulse" />
                <span className="text-caption font-semibold tracking-wider text-[var(--df-primary)] uppercase">
                  Engineering Workspace
                </span>
              </div>
              <h1 className="text-display mt-2">Good morning, John 👋</h1>
              <p className="text-body text-muted mt-2 max-w-lg leading-relaxed">
                Welcome back to DevForge! All services are running optimally. Your team pushed 12
                commits and resolved 3 major alerts today.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <ForgeBadge variant="primary" size="sm">
                Sprint #12: 4 days remaining
              </ForgeBadge>
              <span className="text-caption text-muted">•</span>
              <span className="text-caption text-muted">Last sync: 2 minutes ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <ForgeCard className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-h3 font-bold text-[var(--df-foreground)]">Quick Actions</h2>
              <span className="text-caption text-muted">Press Ctrl+K for Palette</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="flex flex-col items-start gap-2.5 rounded-[16px] border border-[var(--df-border)] bg-[var(--df-secondary)]/30 p-3 text-left transition-all hover:border-[var(--df-border-strong)] hover:bg-[var(--df-subtle)]/50 group cursor-pointer"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--df-primary)]/10 text-[var(--df-primary)] group-hover:scale-105 transition-all">
                    {action.icon}
                  </span>
                  <div>
                    <p className="text-caption font-semibold text-[var(--df-foreground)]">
                      {action.label}
                    </p>
                    <kbd className="text-[9px] text-[var(--df-muted-fg)] uppercase">
                      {action.shortcut}
                    </kbd>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ForgeCard>
      </div>

      {/* ── TOOLBAR SECTION: Filtering & Views ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[var(--df-border)] py-4 my-2">
        {/* Left Search input */}
        <div className="relative flex-1 max-w-sm min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--df-muted-fg)] pointer-events-none" />
          <input
            type="text"
            placeholder="Filter metrics, projects, tasks..."
            className="w-full rounded-xl border border-[var(--df-border)] bg-[var(--df-input)] py-2 pl-9 pr-4 text-xs text-[var(--df-fg)] placeholder:text-[var(--df-muted-fg)] focus:border-[var(--df-border-strong)] focus:outline-none transition-all"
          />
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Last sync / Refresh */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--df-border)] bg-[var(--df-card)] px-3 py-1.5 text-xs text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] hover:bg-[var(--df-secondary)] transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3 w-3 animate-spin-slow" />
            <span>Refreshed</span>
          </button>

          {/* Timeframe selector */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--df-border)] bg-[var(--df-card)] px-3 py-1.5 text-xs text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] hover:bg-[var(--df-secondary)] transition-colors cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>This Month</span>
          </button>

          {/* Filter dropdown trigger */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-[var(--df-border)] bg-[var(--df-card)] px-3 py-1.5 text-xs text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] hover:bg-[var(--df-secondary)] transition-colors cursor-pointer"
          >
            <Filter className="h-3.5 w-3.5" />
            <span>Filters</span>
          </button>

          <div className="h-4 w-px bg-[var(--df-border)]" />

          {/* View selector buttons */}
          <div className="flex items-center rounded-lg border border-[var(--df-border)] p-0.5 bg-[var(--df-card)]">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={cn(
                'rounded p-1 cursor-pointer transition-all',
                viewMode === 'grid'
                  ? 'bg-[var(--df-primary)]/15 text-[var(--df-primary)]'
                  : 'text-[var(--df-muted-fg)] hover:text-[var(--df-fg)]'
              )}
            >
              <Grid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={cn(
                'rounded p-1 cursor-pointer transition-all',
                viewMode === 'list'
                  ? 'bg-[var(--df-primary)]/15 text-[var(--df-primary)]'
                  : 'text-[var(--df-muted-fg)] hover:text-[var(--df-fg)]'
              )}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── MIDDLE SECTION: Metrics & Projects & Activity ── */}
      <div className="flex flex-col gap-6">
        {/* KPI metrics row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STAT_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <StatCard {...card} />
            </motion.div>
          ))}
        </div>

        {/* Projects list & Activity feed side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Active Projects */}
          <div className="lg:col-span-3">
            <ForgeCard className="h-full flex flex-col justify-between" gradientBorder>
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-h3 font-bold text-[var(--df-foreground)]">
                      Active Projects
                    </h2>
                    <p className="text-caption text-muted mt-0.5">
                      Tracking project progress and current alerts.
                    </p>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-semibold text-[var(--df-primary)] hover:underline cursor-pointer">
                    View all <ArrowRight className="h-3.5 w-3.5" />
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
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ x: 3 }}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/20 p-3.5 transition-all hover:border-[var(--df-border-strong)] hover:bg-[var(--df-secondary)]/40"
                      >
                        {/* Status tag color */}
                        <div className={cn('h-8 w-1 flex-shrink-0 rounded-full', proj.color)} />

                        {/* Info details */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-[var(--df-foreground)]">
                              {proj.name}
                            </p>
                            <ForgeBadge
                              variant={
                                proj.status === 'active'
                                  ? 'success'
                                  : proj.status === 'in-review'
                                    ? 'warning'
                                    : 'default'
                              }
                              size="sm"
                              dot
                            >
                              {status.label}
                            </ForgeBadge>
                          </div>
                          <div className="mt-2 flex items-center gap-3">
                            {/* Progress bar container */}
                            <div className="flex flex-1 items-center gap-2">
                              <div className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--df-border)]">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${proj.progress}%` }}
                                  transition={{
                                    duration: 0.8,
                                    delay: i * 0.05 + 0.1,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  className={cn('h-full rounded-full', proj.color)}
                                />
                              </div>
                              <span className="flex-shrink-0 text-[10px] font-semibold text-[var(--df-muted-fg)]">
                                {proj.progress}%
                              </span>
                            </div>
                            {/* Metadata */}
                            <div className="flex items-center gap-2 text-[10px] font-medium text-[var(--df-muted-fg)]">
                              <span className="flex items-center gap-0.5">
                                <Code2 className="h-3 w-3" /> {proj.lang}
                              </span>
                              <span className="flex items-center gap-0.5">
                                <AlertCircle className="h-3 w-3 text-[var(--df-danger)]" />{' '}
                                {proj.issues}
                              </span>
                            </div>
                          </div>
                        </div>

                        <IconButton icon={<MoreHorizontal className="h-4 w-4" />} size="xs" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </ForgeCard>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <ForgeCard className="h-full">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-h3 font-bold text-[var(--df-foreground)]">Recent Activity</h2>
                  <p className="text-caption text-muted mt-0.5">
                    Recent system events and pull requests.
                  </p>
                </div>
                <IconButton icon={<Activity className="h-4 w-4" />} label="View log" size="xs" />
              </div>
              <div className="flex flex-col gap-0">
                {ACTIVITY_ITEMS.map((item, i) => {
                  const meta = activityIconMap[item.type];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      className={cn(
                        'flex items-start gap-3 py-3',
                        i < ACTIVITY_ITEMS.length - 1 && 'border-b border-[var(--df-border)]'
                      )}
                    >
                      <ForgeAvatar name={item.avatar} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-[var(--df-foreground)] leading-normal">
                          <span className="text-[var(--df-muted-fg)] font-normal">{item.user}</span>{' '}
                          — {item.msg}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className={cn(
                              'flex items-center gap-0.5 text-[9px] font-semibold uppercase tracking-wider',
                              meta.color
                            )}
                          >
                            {meta.icon}
                            {item.repo}
                          </span>
                          <span className="text-[9px] text-[var(--df-muted-fg)]/60 font-medium">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </ForgeCard>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SECTION: Charts & Timeline & Updates ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Charts - 2 Columns */}
        <div className="lg:col-span-2">
          <ForgeCard gradientBorder className="h-full">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-h3 font-bold text-[var(--df-foreground)]">Velocity Trends</h2>
                <p className="text-caption text-muted mt-0.5">
                  Completed story points per development cycle.
                </p>
              </div>
              <div className="flex items-center gap-1">
                {['1W', '1M', '3M', '1Y'].map((p, i) => (
                  <button
                    key={p}
                    type="button"
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer',
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

            {/* Custom SVG Bar Chart */}
            <div className="relative mt-4">
              {/* Guides */}
              <div className="absolute inset-0 flex flex-col justify-between pb-8 pt-2 pointer-events-none">
                {[100, 75, 50, 25, 0].map((v) => (
                  <div key={v} className="flex items-center gap-2">
                    <span className="w-6 flex-shrink-0 text-right text-[10px] font-mono text-[var(--df-muted-fg)]/50">
                      {v}
                    </span>
                    <div className="h-px flex-1 bg-[var(--df-border)]/55" />
                  </div>
                ))}
              </div>

              {/* Bars container */}
              <div className="ml-8 flex items-end gap-2 pb-8 pt-2" style={{ height: 180 }}>
                {CHART_DATA.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${v}%` }}
                    transition={{ duration: 0.6, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex flex-1 cursor-pointer flex-col items-center justify-end"
                    style={{ height: '100%' }}
                  >
                    <div
                      className="w-full rounded-t-[4px] bg-gradient-to-t from-[var(--df-primary)] to-[var(--df-accent)] opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.3)] transition-all duration-150"
                      style={{ height: `${v}%` }}
                    />
                    {/* Hover tooltip */}
                    <div className="absolute -top-8 hidden rounded-lg border border-[var(--df-border)] bg-[var(--df-card)] px-2 py-1 text-[10px] font-mono font-bold text-[var(--df-foreground)] shadow-lg group-hover:block z-10 pointer-events-none">
                      {v}pts
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Labels */}
              <div className="ml-8 flex gap-2">
                {CHART_LABELS.map((l) => (
                  <span
                    key={l}
                    className="flex-1 text-center text-[10px] font-semibold text-[var(--df-muted-fg)]/60"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary statistics */}
            <div className="mt-5 flex items-center gap-6 border-t border-[var(--df-border)] pt-4">
              {[
                { label: 'Avg velocity', value: '73 pts' },
                { label: 'Best sprint', value: '100 pts' },
                { label: 'Trend', value: '+18%', positive: true },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-caption text-muted">{s.label}</p>
                  <p
                    className={cn(
                      'mt-0.5 text-sm font-bold',
                      s.positive ? 'text-[var(--df-success)]' : 'text-[var(--df-foreground)]'
                    )}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </ForgeCard>
        </div>

        {/* Timeline / Recent Deployments */}
        <div className="lg:col-span-1">
          <ForgeCard className="h-full flex flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-h3 font-bold text-[var(--df-foreground)]">Deployments</h2>
                  <p className="text-caption text-muted mt-0.5">Timeline of release stages.</p>
                </div>
                <ForgeButton variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg">
                  <Plus className="h-4 w-4" />
                </ForgeButton>
              </div>

              <div className="relative border-l border-[var(--df-border)] ml-2.5 pl-5 flex flex-col gap-5">
                {RECENT_DEPLOYMENTS.map((d, i) => (
                  <div key={i} className="relative">
                    {/* Circle dot timeline */}
                    <span
                      className={cn(
                        'absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center rounded-full ring-4 ring-[var(--df-card)]',
                        d.status === 'success'
                          ? 'bg-[var(--df-success)]'
                          : 'bg-[var(--df-warning)] animate-pulse'
                      )}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[var(--df-foreground)]">
                          {d.env}
                        </span>
                        <ForgeBadge
                          variant={d.status === 'success' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {d.version}
                        </ForgeBadge>
                      </div>
                      <p className="mt-1 text-caption text-muted leading-snug">{d.commit}</p>
                      <p className="mt-1 text-[10px] font-medium text-[var(--df-muted-fg)]/60">
                        {d.time} • by {d.by}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ForgeCard>
        </div>
      </div>

      {/* ── RECENT UPDATES SECTION: Tasks & Health & Coverage ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        {/* Upcoming Tasks */}
        <ForgeCard>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-h3 font-bold text-[var(--df-foreground)]">Upcoming Tasks</h2>
              <p className="text-caption text-muted mt-0.5">High-priority items on deck.</p>
            </div>
            <button className="text-xs font-semibold text-[var(--df-primary)] hover:underline cursor-pointer">
              Kanban
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {UPCOMING_TASKS.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/10 p-3 hover:border-[var(--df-border-strong)] transition-all"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[var(--df-primary)]/10 px-1.5 py-0.5 text-[10px] font-bold text-[var(--df-primary)]">
                      {t.label}
                    </span>
                    <span className="truncate text-xs font-semibold text-[var(--df-foreground)]">
                      {t.title}
                    </span>
                  </div>
                </div>
                <div className="ml-3 flex items-center gap-2 flex-shrink-0">
                  <ForgeBadge
                    variant={
                      t.priority === 'High'
                        ? 'danger'
                        : t.priority === 'Medium'
                          ? 'warning'
                          : 'success'
                    }
                    size="sm"
                  >
                    {t.priority}
                  </ForgeBadge>
                  <ForgeAvatar name={t.assignee} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </ForgeCard>

        {/* System Health */}
        <ForgeCard>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-h3 font-bold text-[var(--df-foreground)]">System Health</h2>
              <p className="text-caption text-muted mt-0.5">Operational status of services.</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--df-success)] uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" /> Normal
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {SYSTEM_HEALTH.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-[var(--df-border)]/60 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-xs font-bold text-[var(--df-foreground)]">{s.name}</p>
                  <p className="text-[10px] text-muted mt-0.5">Uptime: {s.uptime}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[var(--df-success)]">
                    {s.latency}
                  </span>
                  <p className="text-[9px] text-muted">Latency</p>
                </div>
              </div>
            ))}
          </div>
        </ForgeCard>

        {/* Quick Analytics Summary */}
        <ForgeCard className="flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h2 className="text-h3 font-bold text-[var(--df-foreground)]">Quick Metrics</h2>
              <p className="text-caption text-muted mt-0.5">Live sprint stats indicators.</p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: 'Sprint Burndown',
                  value: '67%',
                  progress: 67,
                  color: 'text-[var(--df-primary)]',
                  bg: 'bg-[var(--df-primary)]',
                },
                {
                  label: 'Code Coverage',
                  value: '84%',
                  progress: 84,
                  color: 'text-[var(--df-success)]',
                  bg: 'bg-[var(--df-success)]',
                },
                {
                  label: 'Bug Rate / Sprint',
                  value: '3.2%',
                  progress: 32,
                  color: 'text-[var(--df-warning)]',
                  bg: 'bg-[var(--df-warning)]',
                },
              ].map((m, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[var(--df-muted-fg)]">{m.label}</span>
                    <span className={m.color}>{m.value}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[var(--df-secondary)] overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', m.bg)}
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ForgeCard>
      </div>

      {/* ── METRIC PROGRESS ROW ── */}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 mt-2">
        <MetricCard label="Sprint Burndown" value="67" unit="%" progress={67} color="primary" />
        <MetricCard label="Code Coverage" value="84" unit="%" progress={84} color="success" />
        <MetricCard label="Bug Rate" value="3.2" unit="/week" progress={32} color="warning" />
        <MetricCard label="Deploy Success" value="98" unit="%" progress={98} color="success" />
      </div>

      {/* ── FOOTER SECTION ── */}
      <footer className="mt-12 border-t border-[var(--df-border)] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-[var(--df-primary)]" />
          <span className="text-xs font-bold tracking-wider text-[var(--df-foreground)]">
            DEVFORGE
          </span>
          <span className="text-[10px] text-muted font-medium">• © 2026. All Rights Reserved.</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[var(--df-muted-fg)]">
          <a href="#" className="hover:text-[var(--df-foreground)] transition-colors">
            Documentation
          </a>
          <a href="#" className="hover:text-[var(--df-foreground)] transition-colors">
            Status Page
          </a>
          <a href="#" className="hover:text-[var(--df-foreground)] transition-colors">
            Support
          </a>
        </div>
      </footer>
    </PageContainer>
  );
}
