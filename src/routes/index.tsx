import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  CheckCircle2,
  Users,
  Sparkles,
  Zap,
  GitBranch,
  Terminal,
  Plus,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import {
  ForgeCard,
  ForgeButton,
  ForgeBadge,
  ForgeStatCard,
  ForgeChartCard,
  ForgePanel,
  ForgeActivity,
} from '@/components/forge';
import type { TimelineItem } from '@/components/forge/ForgeTimeline';

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

const ACTIVITY_ITEMS: TimelineItem[] = [
  {
    id: 1,
    type: 'commit',
    user: 'Sarah K.',
    title: 'feat: add real-time collaboration layer',
    repo: 'devforge-ui',
    timestamp: '4m ago',
    avatar: '',
  },
  {
    id: 2,
    type: 'deploy',
    user: 'CI Pipeline',
    title: 'Deployment to production succeeded (v1.2.4)',
    repo: 'api-gateway',
    timestamp: '12m ago',
  },
  {
    id: 3,
    type: 'issue',
    user: 'Alex M.',
    title: 'Fixed: race condition in sprint resolver',
    repo: 'backend',
    timestamp: '28m ago',
  },
  {
    id: 4,
    type: 'pr',
    user: 'Alex Mercer',
    title: 'Opened PR: Auth token refresh flow',
    repo: 'auth-service',
    timestamp: '1h ago',
  },
];

const PROJECT_CARDS = [
  {
    name: 'DevForge UI',
    lang: 'TypeScript',
    progress: 68,
    issues: 12,
    status: 'active',
    version: 'v2.4.0',
    color: 'bg-[var(--df-primary)]',
  },
  {
    name: 'API Gateway',
    lang: 'Go',
    progress: 82,
    issues: 4,
    status: 'active',
    version: 'v1.8.1',
    color: 'bg-[var(--df-success)]',
  },
  {
    name: 'Auth Service',
    lang: 'Rust',
    progress: 45,
    issues: 8,
    status: 'in-review',
    version: 'v0.9.4',
    color: 'bg-[var(--df-warning)]',
  },
  {
    name: 'ML Pipeline',
    lang: 'Python',
    progress: 20,
    issues: 21,
    status: 'backlog',
    version: 'v0.1.0',
    color: 'bg-[var(--df-muted-foreground)]',
  },
];

const AI_SUGGESTIONS = [
  {
    id: 1,
    title: 'Optimize API Gateway Latency',
    desc: 'High p99 latency observed in /auth/verify endpoint. Suggested caching policy update.',
    tag: 'PERFORMANCE',
    impact: '+34% SPEED',
  },
  {
    id: 2,
    title: 'Automate Sprint Retrospective',
    desc: '14 tasks completed ahead of schedule. Generate automated release summary for Sprint #12.',
    tag: 'AUTOMATION',
    impact: 'SAVED 2 HRS',
  },
];

const RECENT_DEPLOYMENTS = [
  { env: 'Production', version: 'v1.2.4', status: 'success', time: '2m ago', commit: '8f2d9a' },
  {
    env: 'Staging',
    version: 'v1.2.5-rc1',
    status: 'building',
    time: 'In progress',
    commit: '3c71e0',
  },
  {
    env: 'Development',
    version: 'v1.3.0-alpha',
    status: 'success',
    time: '1h ago',
    commit: '9a4b12',
  },
];

function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#07070A] p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto">
      {/* ── 1. MISSION OVERVIEW HEADLINE ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-[24px] border border-[var(--df-border)] bg-[var(--df-surface)] p-6 lg:p-8 aurora-bg"
      >
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <ForgeBadge variant="cyan" size="sm" dot pulse mono>
                DEVFORGE PLATFORM ONLINE
              </ForgeBadge>
              <span className="text-xs font-mono text-[var(--df-muted-foreground)]">
                BUILD #8492 // REGION: US-EAST-1
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-sans">
              Welcome back, <span className="text-[var(--df-primary-light)]">Alex Mercer</span>
            </h1>

            <p className="text-xs lg:text-sm text-[var(--df-muted-foreground)] leading-relaxed font-sans">
              Engineering metrics are healthy across 4 active microservices. 2 deployments completed
              today with 99.98% uptime SLA.
            </p>
          </div>

          {/* Primary Quick Launch Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <ForgeButton
              variant="gradient"
              size="md"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => (window.location.href = '/projects')}
            >
              New Project
            </ForgeButton>
            <ForgeButton
              variant="secondary"
              size="md"
              leftIcon={<Sparkles className="h-4 w-4 text-[var(--df-accent)]" />}
              onClick={() => (window.location.href = '/ai')}
            >
              Ask AI Workspace
            </ForgeButton>
          </div>
        </div>
      </motion.div>

      {/* ── 2. ENGINEERING METRICS ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CARDS.map((card) => (
          <ForgeStatCard
            key={card.title}
            title={card.title}
            value={card.value}
            change={card.change}
            changeLabel="vs last week"
            icon={card.icon}
            accent={card.accent}
          />
        ))}
      </div>

      {/* ── 3. MAIN DASHBOARD CONTENT GRID ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols wide on Desktop) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Projects Grid */}
          <ForgeChartCard
            title="Active Engineering Projects"
            subtitle="Real-time repository health & progress metrics"
            statusBadge="4 SYNCED"
            action={
              <ForgeButton
                variant="ghost"
                size="xs"
                rightIcon={<ChevronRight className="h-3.5 w-3.5" />}
                onClick={() => (window.location.href = '/projects')}
              >
                View All
              </ForgeButton>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECT_CARDS.map((proj) => (
                <ForgeCard
                  key={proj.name}
                  hoverable
                  spotlight
                  className="p-5 bg-[var(--df-surface-elevated)] border-[var(--df-border)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${proj.color}`} />
                        <h4 className="text-sm font-semibold text-white tracking-tight">
                          {proj.name}
                        </h4>
                      </div>
                      <ForgeBadge variant="default" size="sm" mono>
                        {proj.version}
                      </ForgeBadge>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-xs font-mono text-[var(--df-muted-foreground)]">
                      <span>LANG: {proj.lang}</span>
                      <span>ISSUES: {proj.issues}</span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[var(--df-muted-foreground)]">SPRINT PROGRESS</span>
                      <span className="text-white font-bold">{proj.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#07070A] rounded-full overflow-hidden border border-[var(--df-border)]">
                      <div
                        className="h-full bg-[var(--df-gradient-accent)]"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>
                </ForgeCard>
              ))}
            </div>
          </ForgeChartCard>

          {/* Forge AI Suggestions Panel */}
          <ForgePanel
            title="FORGE AI SUGGESTIONS"
            tagline="Automated code & system optimization insights"
            headerAction={
              <ForgeBadge variant="cyan" size="sm" dot mono>
                2 NEW INSIGHTS
              </ForgeBadge>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AI_SUGGESTIONS.map((sug) => (
                <ForgeCard
                  key={sug.id}
                  blueprint
                  className="p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <ForgeBadge variant="primary" size="sm" mono>
                        {sug.tag}
                      </ForgeBadge>
                      <span className="text-xs font-mono font-bold text-[#34D399]">
                        {sug.impact}
                      </span>
                    </div>
                    <h5 className="text-sm font-semibold text-white tracking-tight">{sug.title}</h5>
                    <p className="text-xs font-sans text-[var(--df-muted-foreground)] leading-relaxed">
                      {sug.desc}
                    </p>
                  </div>

                  <ForgeButton
                    variant="secondary"
                    size="xs"
                    rightIcon={<ArrowRight className="h-3 w-3" />}
                  >
                    Apply Recommendation
                  </ForgeButton>
                </ForgeCard>
              ))}
            </div>
          </ForgePanel>
        </div>

        {/* Right Column (1 Col wide on Desktop) */}
        <div className="space-y-8">
          {/* Recent Activity Feed */}
          <ForgeActivity title="Engineering Activity Feed" items={ACTIVITY_ITEMS} />

          {/* Deployment Health Widget */}
          <ForgeCard spotlight className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--df-border)] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--df-success)]" />
                <h4 className="text-sm font-semibold text-white tracking-tight">
                  Deployment Pipeline
                </h4>
              </div>
              <ForgeBadge variant="success" size="sm" mono>
                99.98% Succeeded
              </ForgeBadge>
            </div>

            <div className="space-y-3">
              {RECENT_DEPLOYMENTS.map((dep) => (
                <div
                  key={dep.env}
                  className="flex items-center justify-between rounded-xl bg-[var(--df-surface-elevated)] p-3 border border-[var(--df-border)] text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{dep.env}</span>
                      <span className="font-mono text-[10px] text-[var(--df-muted-foreground)]">
                        {dep.commit}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--df-muted-foreground)]">
                      {dep.version}
                    </span>
                  </div>

                  <ForgeBadge
                    variant={dep.status === 'success' ? 'success' : 'warning'}
                    size="sm"
                    mono
                  >
                    {dep.status}
                  </ForgeBadge>
                </div>
              ))}
            </div>
          </ForgeCard>

          {/* Quick Toolbar */}
          <ForgePanel title="QUICK TOOLBAR" tagline="Command shortcuts">
            <div className="grid grid-cols-2 gap-2">
              <ForgeButton
                variant="command"
                size="sm"
                leftIcon={<GitBranch className="h-3.5 w-3.5" />}
                onClick={() => (window.location.href = '/projects')}
              >
                Create Branch
              </ForgeButton>
              <ForgeButton
                variant="command"
                size="sm"
                leftIcon={<Terminal className="h-3.5 w-3.5" />}
                onClick={() => (window.location.href = '/tasks')}
              >
                Backlog
              </ForgeButton>
              <ForgeButton
                variant="command"
                size="sm"
                leftIcon={<Sparkles className="h-3.5 w-3.5" />}
                onClick={() => (window.location.href = '/ai')}
              >
                AI Audit
              </ForgeButton>
              <ForgeButton
                variant="command"
                size="sm"
                leftIcon={<Zap className="h-3.5 w-3.5" />}
                onClick={() => (window.location.href = '/analytics')}
              >
                Analytics
              </ForgeButton>
            </div>
          </ForgePanel>
        </div>
      </div>
    </div>
  );
}
