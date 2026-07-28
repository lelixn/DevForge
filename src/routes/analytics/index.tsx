import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ForgeBlueprint,
  ForgeCard,
  ForgeBadge,
  ForgeStatCard,
  ForgeChartCard,
  ForgeTabs,
} from '@/components/forge';

export const Route = createFileRoute('/analytics/')({ component: AnalyticsPage });

const VELOCITY_DATA = [32, 45, 38, 62, 55, 78, 65, 82, 70, 91, 85, 100];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_ENDPOINTS = [
  { path: '/auth/login', calls: '12.4k', p95: '48ms', errors: '0.2%', status: 'NOMINAL' },
  { path: '/projects', calls: '8.1k', p95: '62ms', errors: '0.0%', status: 'NOMINAL' },
  { path: '/tasks', calls: '21.3k', p95: '35ms', errors: '0.4%', status: 'NOMINAL' },
  { path: '/ai/generate', calls: '4.2k', p95: '820ms', errors: '1.1%', status: 'OPTIMIZING' },
];

function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-6">
      <ForgeBlueprint
        title="SYSTEM METRICS & ANALYTICS CONTROL"
        systemId="SYS_METRICS_01"
        revision="v1.9.4"
        status="HEALTHY"
        headerActions={
          <ForgeTabs
            tabs={[
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: '90d', label: 'Quarterly' },
            ]}
            activeTab={timeRange}
            onChange={setTimeRange}
          />
        }
      >
        <div className="space-y-6">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ForgeStatCard
              title="Average Latency p95"
              value="42 ms"
              change={-14.2}
              changeLabel="faster"
              accent
            />
            <ForgeStatCard
              title="System Uptime SLA"
              value="99.98%"
              change={0.02}
              changeLabel="uptime"
            />
            <ForgeStatCard
              title="Sprint Velocity"
              value="100 pts"
              change={22.4}
              changeLabel="increase"
            />
            <ForgeStatCard title="API Invocations" value="46.0k" change={18.1} />
          </div>

          {/* Velocity Chart Card */}
          <ForgeChartCard
            title="Engineering Velocity Trend"
            subtitle="Monthly story points completed across all teams"
            statusBadge="PEAK VELOCITY"
            blueprint
          >
            <div className="h-44 flex items-end gap-2 pt-6">
              {VELOCITY_DATA.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.5, delay: i * 0.03 }}
                    className="w-full rounded-t-lg bg-[var(--df-gradient-accent)] opacity-80 group-hover:opacity-100 transition-opacity relative"
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block rounded bg-[#101014] border border-[rgba(6,182,212,0.3)] px-1.5 py-0.5 text-[10px] font-mono text-white">
                      {val} pts
                    </div>
                  </motion.div>
                  <span className="text-[10px] font-mono text-[var(--df-muted-foreground)]">
                    {MONTHS[i]}
                  </span>
                </div>
              ))}
            </div>
          </ForgeChartCard>

          {/* API Endpoints Performance Table */}
          <ForgeCard spotlight className="p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[var(--df-border)] pb-3">
              <h4 className="text-sm font-semibold text-white font-sans tracking-tight">
                API Endpoint Telemetry
              </h4>
              <ForgeBadge variant="cyan" size="sm" mono>
                LIVE METRICS
              </ForgeBadge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-[var(--df-muted-foreground)] uppercase border-b border-[var(--df-border)]">
                    <th className="pb-2">Endpoint Path</th>
                    <th className="pb-2">Total Invocations</th>
                    <th className="pb-2">p95 Latency</th>
                    <th className="pb-2">Error Rate</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--df-border)]">
                  {API_ENDPOINTS.map((ep) => (
                    <tr key={ep.path} className="hover:bg-[rgba(255,255,255,0.02)]">
                      <td className="py-3 font-bold text-white">{ep.path}</td>
                      <td className="py-3 text-[var(--df-muted-foreground)]">{ep.calls}</td>
                      <td className="py-3 text-[#34D399] font-bold">{ep.p95}</td>
                      <td className="py-3 text-[var(--df-muted-foreground)]">{ep.errors}</td>
                      <td className="py-3 text-right">
                        <ForgeBadge
                          variant={ep.status === 'NOMINAL' ? 'success' : 'warning'}
                          size="sm"
                          mono
                        >
                          {ep.status}
                        </ForgeBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ForgeCard>
        </div>
      </ForgeBlueprint>
    </div>
  );
}
