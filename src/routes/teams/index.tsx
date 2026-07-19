import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Users, Plus, Mail, MoreHorizontal, Shield, Code2, Cpu, TestTube } from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/shared/page-container';
import { GradientButton } from '@/components/shared/gradient-button';
import { IconButton } from '@/components/shared/icon-button';
import { Badge } from '@/components/shared/badge';
import { MEMBERS } from '@/shared/data';

export const Route = createFileRoute('/teams/')({ component: TeamsPage });

const TEAMS = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Core platform development team',
    members: ['SK', 'AM', 'PN'],
    color: '#7C3AED',
    icon: <Code2 className="h-5 w-5" />,
    count: 12,
    projects: 4,
  },
  {
    id: '2',
    name: 'AI & ML',
    description: 'Machine learning and AI features',
    members: ['LZ', 'AM'],
    color: '#10B981',
    icon: <Cpu className="h-5 w-5" />,
    count: 5,
    projects: 2,
  },
  {
    id: '3',
    name: 'Quality Assurance',
    description: 'Testing and reliability engineering',
    members: ['CR', 'PN'],
    color: '#F59E0B',
    icon: <TestTube className="h-5 w-5" />,
    count: 4,
    projects: 6,
  },
  {
    id: '4',
    name: 'Platform Infra',
    description: 'Infrastructure and DevOps',
    members: ['PN', 'AM'],
    color: '#3B82F6',
    icon: <Shield className="h-5 w-5" />,
    count: 6,
    projects: 3,
  },
];

const ROLE_COLORS: Record<string, string> = {
  'Frontend Lead': 'primary',
  'Backend Engineer': 'success',
  'DevOps Engineer': 'warning',
  'Product Manager': 'default',
  'AI Engineer': 'primary',
  'QA Engineer': 'danger',
};

function MemberRow({ member, index }: { member: (typeof MEMBERS)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] px-4 py-3 transition-all hover:border-[var(--df-border-strong)]"
    >
      <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)] text-sm font-bold text-white">
        {member.avatar}
        {member.online && (
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--df-card)] bg-[var(--df-success)]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--df-fg)]">{member.name}</p>
        <p className="text-xs text-[var(--df-muted-fg)]">{member.role}</p>
      </div>
      <Badge
        variant={
          (ROLE_COLORS[member.role] as 'primary' | 'success' | 'warning' | 'danger' | 'default') ??
          'default'
        }
        size="xs"
      >
        {member.role}
      </Badge>
      <IconButton icon={<Mail className="h-3.5 w-3.5" />} size="xs" label="Send message" />
      <IconButton icon={<MoreHorizontal className="h-3.5 w-3.5" />} size="xs" />
    </motion.div>
  );
}

function TeamCard({ team, index }: { team: (typeof TEAMS)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className="relative overflow-hidden rounded-2xl border border-[var(--df-border)] bg-[var(--df-card)] p-5 transition-all hover:border-[var(--df-border-strong)] hover:shadow-[var(--shadow-elevated)]"
    >
      <div
        className="absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-10 blur-xl"
        style={{ backgroundColor: team.color }}
      />
      <div className="flex items-start justify-between mb-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${team.color}20`, color: team.color }}
        >
          {team.icon}
        </div>
        <IconButton icon={<MoreHorizontal className="h-4 w-4" />} size="xs" />
      </div>
      <h3 className="mb-1 text-sm font-bold text-[var(--df-fg)]">{team.name}</h3>
      <p className="mb-4 text-xs text-[var(--df-muted-fg)]">{team.description}</p>
      <div className="flex items-center justify-between border-t border-[var(--df-border)] pt-3">
        <div className="flex items-center gap-1.5">
          {team.members.map((av, i) => (
            <div
              key={i}
              style={{ marginLeft: i === 0 ? 0 : -8, zIndex: team.members.length - i }}
              className="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--df-card)] bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)] text-[9px] font-bold text-white"
            >
              {av}
            </div>
          ))}
          <span className="ml-1 text-xs text-[var(--df-muted-fg)]">
            +{team.count - team.members.length} more
          </span>
        </div>
        <span className="text-xs text-[var(--df-muted-fg)]">{team.projects} projects</span>
      </div>
    </motion.div>
  );
}

function TeamsPage() {
  return (
    <PageContainer>
      <PageHeader title="Teams" description="Manage your organization's teams and members">
        <GradientButton icon={<Plus className="h-4 w-4" />} size="sm">
          Invite Member
        </GradientButton>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TEAMS.map((team, i) => (
          <TeamCard key={team.id} team={team} index={i} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--df-fg)]">
          All Members{' '}
          <span className="ml-1.5 rounded-full bg-[var(--df-secondary)] px-2 py-0.5 text-[10px] text-[var(--df-muted-fg)]">
            {MEMBERS.length}
          </span>
        </h2>
        <button className="flex items-center gap-2 rounded-lg border border-dashed border-[var(--df-border)] px-3 py-1.5 text-xs font-medium text-[var(--df-muted-fg)] hover:border-[var(--df-border-strong)] hover:text-[var(--df-fg)] transition-all">
          <Users className="h-3.5 w-3.5" /> Invite with link
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {MEMBERS.map((member, i) => (
          <MemberRow key={member.id} member={member} index={i} />
        ))}
      </div>
    </PageContainer>
  );
}
