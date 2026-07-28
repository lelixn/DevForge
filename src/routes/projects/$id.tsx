import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowLeft, Plus, Play } from 'lucide-react';
import {
  ForgeBlueprint,
  ForgeCard,
  ForgeButton,
  ForgeTabs,
  ForgeStatCard,
} from '@/components/forge';
import { PROJECTS, TASKS } from '@/shared/data';

export const Route = createFileRoute('/projects/$id')({ component: ProjectWorkspacePage });

function ProjectWorkspacePage() {
  const { id } = Route.useParams();
  const project = PROJECTS.find((p) => p.id === id) || PROJECTS[0];
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
      {/* Back Link */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-[var(--df-muted-foreground)] hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>BACK TO PROJECTS</span>
      </Link>

      {/* Signature Blueprint Container */}
      <ForgeBlueprint
        title={`${project.name} // ARCHITECTURE GRAPH`}
        systemId={`PROJ_${project.id.toUpperCase()}`}
        revision="v2.4.0"
        status={project.status.toUpperCase()}
        headerActions={
          <div className="flex items-center gap-2">
            <ForgeButton variant="gradient" size="sm" leftIcon={<Play className="h-3.5 w-3.5" />}>
              Run Pipeline
            </ForgeButton>
            <ForgeButton variant="secondary" size="sm" leftIcon={<Plus className="h-3.5 w-3.5" />}>
              New Issue
            </ForgeButton>
          </div>
        }
      >
        <div className="space-y-6">
          {/* Project Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ForgeStatCard
              title="Sprint Progress"
              value={`${project.progress}%`}
              change={12.5}
              changeLabel="this sprint"
              accent
            />
            <ForgeStatCard
              title="Open Issues"
              value={project.issues}
              change={-4}
              changeLabel="resolved"
            />
            <ForgeStatCard title="Total Tasks" value={TASKS.length} />
            <ForgeStatCard title="Team Members" value={project.members.length} />
          </div>

          {/* Navigation Tabs */}
          <ForgeTabs
            tabs={[
              { id: 'overview', label: 'Architecture Overview' },
              { id: 'tasks', label: 'Sprint Tasks', count: TASKS.length },
              { id: 'repository', label: 'Repository Branch' },
              { id: 'deployments', label: 'CI/CD Pipelines' },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          {/* Tab Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <ForgeCard spotlight blueprint className="p-6 space-y-4">
                <h4 className="text-sm font-semibold text-white tracking-tight">
                  System Specification & Scope
                </h4>
                <p className="text-xs font-sans text-[var(--df-muted-foreground)] leading-relaxed">
                  {project.description}
                </p>

                <div className="pt-4 border-t border-[rgba(6,182,212,0.2)] grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[var(--df-muted-foreground)]">PRIMARY LANG:</span>
                    <span className="ml-2 font-bold text-white">{project.language}</span>
                  </div>
                  <div>
                    <span className="text-[var(--df-muted-foreground)]">STABILITY SLA:</span>
                    <span className="ml-2 font-bold text-[#34D399]">99.99%</span>
                  </div>
                </div>
              </ForgeCard>
            </div>

            <div className="space-y-4">
              <ForgeCard spotlight className="p-6 space-y-3 font-mono text-xs">
                <h4 className="text-sm font-semibold text-white tracking-tight font-sans">
                  Active Deployment
                </h4>
                <div className="rounded-xl bg-[#07070A] p-3 border border-[var(--df-border)] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[var(--df-muted-foreground)]">TARGET:</span>
                    <span className="font-bold text-white">AWS US-EAST-1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--df-muted-foreground)]">COMMIT:</span>
                    <span className="text-[var(--df-accent)]">8f2d9a41</span>
                  </div>
                </div>
              </ForgeCard>
            </div>
          </div>
        </div>
      </ForgeBlueprint>
    </div>
  );
}
