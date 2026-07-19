import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  GitBranch,
  Clock,
  Flag,
  CheckSquare,
  ChevronDown,
} from 'lucide-react';
import { PageContainer, PageHeader } from '@/components/shared/page-container';
import { GradientButton } from '@/components/shared/gradient-button';
import { IconButton } from '@/components/shared/icon-button';
import { TASKS, PRIORITY_CONFIG } from '@/shared/data';
import { cn } from '@/utils/cn';

export const Route = createFileRoute('/tasks/')({ component: TasksPage });

const COLUMNS = [
  {
    id: 'todo' as const,
    label: 'To Do',
    dotColor: 'bg-[var(--df-muted-fg)]',
    textColor: 'text-[var(--df-muted-fg)]',
  },
  {
    id: 'inprogress' as const,
    label: 'In Progress',
    dotColor: 'bg-[var(--df-primary)]',
    textColor: 'text-[var(--df-primary)]',
  },
  {
    id: 'review' as const,
    label: 'In Review',
    dotColor: 'bg-[var(--df-warning)]',
    textColor: 'text-[var(--df-warning)]',
  },
  {
    id: 'done' as const,
    label: 'Done',
    dotColor: 'bg-[var(--df-success)]',
    textColor: 'text-[var(--df-success)]',
  },
];

const LABEL_COLORS: Record<string, string> = {
  Auth: 'text-[var(--df-primary)] bg-[var(--df-primary)]/10',
  Frontend: 'text-blue-400 bg-blue-400/10',
  Backend: 'text-[var(--df-success)] bg-[var(--df-success)]/10',
  Infra: 'text-[var(--df-warning)] bg-[var(--df-warning)]/10',
  Docs: 'text-[var(--df-muted-fg)] bg-[var(--df-secondary)]',
  QA: 'text-[var(--df-danger)] bg-[var(--df-danger)]/10',
  Review: 'text-[var(--df-warning)] bg-[var(--df-warning)]/10',
};

function TaskCard({ task, index }: { task: (typeof TASKS)[0]; index: number }) {
  const priority = PRIORITY_CONFIG[task.priority];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      className="group cursor-grab rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] p-3.5 transition-all active:cursor-grabbing hover:border-[var(--df-border-strong)]"
    >
      <div className="mb-2.5 flex items-start justify-between gap-2">
        <span
          className={cn(
            'inline-flex rounded px-1.5 py-0.5 text-[10px] font-medium',
            LABEL_COLORS[task.label] ?? 'text-[var(--df-muted-fg)] bg-[var(--df-secondary)]'
          )}
        >
          {task.label}
        </span>
        <IconButton
          icon={<MoreHorizontal className="h-3.5 w-3.5" />}
          size="xs"
          className="opacity-0 group-hover:opacity-100"
        />
      </div>
      <p className="mb-3 text-sm font-medium leading-snug text-[var(--df-fg)]">{task.title}</p>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-[10px] font-semibold',
              priority.color
            )}
          >
            <Flag className="h-2.5 w-2.5" />
            {task.priority}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-[var(--df-muted-fg)]">
            <CheckSquare className="h-3 w-3" />
            {task.points}pts
          </span>
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[var(--df-primary)] to-[var(--df-accent)] text-[8px] font-bold text-white">
          {task.assignee}
        </div>
      </div>
    </motion.div>
  );
}

function KanbanColumn({ column }: { column: (typeof COLUMNS)[0] }) {
  const tasks = TASKS.filter((t) => t.status === column.id);
  return (
    <div className="flex w-72 flex-shrink-0 flex-col gap-3">
      <div className="flex items-center justify-between rounded-xl border border-[var(--df-border)] bg-[var(--df-card)] px-3.5 py-2.5">
        <div className="flex items-center gap-2">
          <span className={cn('h-2 w-2 rounded-full', column.dotColor)} />
          <span className={cn('text-sm font-semibold', column.textColor)}>{column.label}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--df-secondary)] text-[10px] font-semibold text-[var(--df-muted-fg)]">
            {tasks.length}
          </span>
        </div>
        <IconButton icon={<Plus className="h-3.5 w-3.5" />} size="xs" />
      </div>
      <div className="flex flex-col gap-2.5">
        {tasks.map((task, i) => (
          <TaskCard key={task.id} task={task} index={i} />
        ))}
        <button className="flex items-center gap-2 rounded-xl border border-dashed border-[var(--df-border)] bg-[var(--df-card)] px-3.5 py-3 text-xs font-medium text-[var(--df-muted-fg)] transition-all hover:border-[var(--df-border-strong)] hover:bg-[var(--df-secondary)] hover:text-[var(--df-fg)]">
          <Plus className="h-3.5 w-3.5" /> Add task
        </button>
      </div>
    </div>
  );
}

function TasksPage() {
  return (
    <PageContainer>
      <PageHeader title="Task Manager" description={`${TASKS.length} tasks across all sprints`}>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-[var(--df-border)] bg-[var(--df-secondary)] px-3 py-1.5 text-xs font-medium text-[var(--df-fg)]">
            Sprint #12 <ChevronDown className="h-3.5 w-3.5 text-[var(--df-muted-fg)]" />
          </button>
          <GradientButton icon={<Plus className="h-4 w-4" />} size="sm">
            New Task
          </GradientButton>
        </div>
      </PageHeader>
      <div className="flex items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--df-muted-fg)]" />
          <input
            placeholder="Search tasks..."
            className="h-8 w-full rounded-lg border border-[var(--df-border)] bg-[var(--df-input)] pl-8 pr-3 text-xs text-[var(--df-fg)] placeholder:text-[var(--df-muted-fg)] focus:outline-none focus:border-[var(--df-border-focus)]"
          />
        </div>
        <IconButton
          icon={<Filter className="h-4 w-4" />}
          label="Filter"
          size="sm"
          variant="outline"
        />
        <span className="flex items-center gap-1.5 text-xs text-[var(--df-muted-fg)]">
          <GitBranch className="h-3.5 w-3.5" />
          DevForge UI
        </span>
        <span className="flex items-center gap-1.5 text-xs text-[var(--df-muted-fg)]">
          <Clock className="h-3.5 w-3.5" />
          Ends in 3 days
        </span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <KanbanColumn key={col.id} column={col} />
        ))}
      </div>
    </PageContainer>
  );
}
