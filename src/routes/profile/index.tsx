import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  GitBranch,
  CheckSquare,
  Star,
  Zap,
  Award,
  Code2,
  Calendar,
  MapPin,
  Globe,
  ExternalLink,
  AtSign,
} from 'lucide-react';
import { PageContainer } from '@/components/shared/page-container';
import { GlassCard } from '@/components/shared/glass-card';
import { Badge } from '@/components/shared/badge';
import { PROJECTS } from '@/shared/data';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/profile/')({ component: ProfilePage });

const ACHIEVEMENTS = [
  { icon: '🔥', label: '30-day Streak', desc: 'Committed code for 30 consecutive days' },
  { icon: '🚀', label: 'First Deploy', desc: 'Deployed your first project to production' },
  { icon: '⭐', label: 'Code Master', desc: 'Reviewed 100+ pull requests' },
  { icon: '🤖', label: 'AI Pioneer', desc: 'Used AI Workspace for 50+ sessions' },
  { icon: '🏆', label: 'Team Player', desc: 'Invited 10 members to your workspace' },
  { icon: '📚', label: 'Doc Writer', desc: 'Authored 20+ documentation pages' },
];

const ACTIVITY_GRAPH = Array.from({ length: 52 * 7 }, (_, i) => ({
  week: Math.floor(i / 7),
  day: i % 7,
  count: Math.random() > 0.4 ? Math.floor(Math.random() * 5) : 0,
}));

const STATS = [
  { label: 'Commits', val: '1,284', icon: <GitBranch className="h-4 w-4" /> },
  { label: 'PRs Merged', val: '248', icon: <Code2 className="h-4 w-4" /> },
  { label: 'Tasks Done', val: '832', icon: <CheckSquare className="h-4 w-4" /> },
  { label: 'Reviews', val: '421', icon: <Star className="h-4 w-4" /> },
];

function ActivityGraph() {
  const intensityColors = [
    'bg-[var(--df-secondary)]',
    'bg-[var(--df-primary)]/20',
    'bg-[var(--df-primary)]/40',
    'bg-[var(--df-primary)]/70',
    'bg-[var(--df-primary)]',
  ];
  return (
    <div className="flex gap-1 overflow-x-auto pb-2">
      {Array.from({ length: 52 }, (_, week) => (
        <div key={week} className="flex flex-col gap-1">
          {Array.from({ length: 7 }, (_, day) => {
            const cell = ACTIVITY_GRAPH[week * 7 + day];
            return (
              <div
                key={day}
                title={`${cell.count} contributions`}
                className={cn(
                  'h-3 w-3 flex-shrink-0 rounded-sm transition-all hover:scale-125',
                  intensityColors[Math.min(cell.count, 4)]
                )}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function ProfilePage() {
  return (
    <PageContainer>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <GlassCard className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)] text-2xl font-bold text-white">
              JD
            </div>
            <h1 className="text-lg font-bold text-[var(--df-fg)]">John Doe</h1>
            <p className="text-sm text-[var(--df-muted-fg)]">Product Manager</p>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[var(--df-muted-fg)]">
              <Badge variant="primary" size="xs">
                <Zap className="h-2.5 w-2.5" />
                Pro
              </Badge>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                San Francisco, CA
              </span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a
                href="#"
                className="text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] transition-colors"
              >
                <AtSign className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-[var(--df-muted-fg)] hover:text-[var(--df-fg)] transition-colors"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </GlassCard>

          {/* Stats */}
          <GlassCard>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col gap-1.5 rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/40 p-3"
                >
                  <span className="text-[var(--df-primary)]">{s.icon}</span>
                  <p className="text-lg font-bold text-[var(--df-fg)]">{s.val}</p>
                  <p className="text-[10px] text-[var(--df-muted-fg)]">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Projects */}
          <GlassCard>
            <h2 className="mb-3 text-sm font-semibold text-[var(--df-fg)]">Active Projects</h2>
            <div className="flex flex-col gap-2">
              {PROJECTS.slice(0, 3).map((p) => (
                <div key={p.id} className="flex items-center gap-2.5 text-xs">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="flex-1 truncate text-[var(--df-fg)]">{p.name}</span>
                  <span className="text-[var(--df-muted-fg)]">{p.progress}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right panel */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {/* Activity Graph */}
          <GlassCard>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[var(--df-fg)]">Contribution Activity</h2>
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--df-muted-fg)]">
                <span>Less</span>
                {[
                  'bg-[var(--df-secondary)]',
                  'bg-[var(--df-primary)]/20',
                  'bg-[var(--df-primary)]/40',
                  'bg-[var(--df-primary)]',
                ].map((c) => (
                  <span key={c} className={cn('h-3 w-3 rounded-sm', c)} />
                ))}
                <span>More</span>
              </div>
            </div>
            <ActivityGraph />
          </GlassCard>

          {/* Achievements */}
          <GlassCard>
            <h2 className="mb-4 text-sm font-semibold text-[var(--df-fg)]">Achievements</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {ACHIEVEMENTS.map((achievement, i) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -2 }}
                  className="flex flex-col items-center gap-2 rounded-xl border border-[var(--df-border)] bg-[var(--df-secondary)]/40 p-3 text-center transition-all hover:border-[var(--df-border-strong)]"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <p className="text-xs font-semibold text-[var(--df-fg)]">{achievement.label}</p>
                  <p className="text-[10px] leading-tight text-[var(--df-muted-fg)]">
                    {achievement.desc}
                  </p>
                  <Badge variant="success" size="xs">
                    <Award className="h-2.5 w-2.5" />
                    Earned
                  </Badge>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Recent activity timeline */}
          <GlassCard>
            <h2 className="mb-4 text-sm font-semibold text-[var(--df-fg)]">Recent Activity</h2>
            <div className="relative ml-3 flex flex-col gap-0 border-l border-[var(--df-border)] pl-4">
              {[
                {
                  icon: '📝',
                  msg: 'Opened PR: Real-time collaboration layer',
                  time: '4m ago',
                  type: 'pr',
                },
                { icon: '✅', msg: 'Closed 3 tasks in Sprint #12', time: '1h ago', type: 'task' },
                {
                  icon: '💬',
                  msg: 'Reviewed auth middleware changes',
                  time: '2h ago',
                  type: 'review',
                },
                { icon: '🚀', msg: 'Deployed devforge-ui@v1.2.4', time: '1d ago', type: 'deploy' },
                { icon: '📊', msg: 'Created Analytics dashboard', time: '2d ago', type: 'project' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pb-4 last:pb-0"
                >
                  <span className="absolute -left-6 top-0 text-sm">{item.icon}</span>
                  <p className="text-xs text-[var(--df-fg)]">{item.msg}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[var(--df-muted-fg)]">
                    <Calendar className="h-3 w-3" />
                    {item.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageContainer>
  );
}
