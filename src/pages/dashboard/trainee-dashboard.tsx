import { Activity, Clock3, Layers3, Search, Target } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type KpiCard = {
  change?: string;
  icon: ReactNode;
  label: string;
  value: string;
};

type SessionModule = {
  count: number;
  label: string;
  tone: string;
};

type RecentSession = {
  accuracy: number;
  id: string;
  module: string;
  score: number;
  time: string;
  when: string;
};

const kpis: KpiCard[] = [
  {
    change: "+12%",
    icon: <Activity className="size-4 text-primary" />,
    label: "Total Sessions",
    value: "50",
  },
  {
    change: "+4.2%",
    icon: <Target className="size-4 text-success" />,
    label: "Average Score",
    value: "82.5%",
  },
  {
    icon: <Clock3 className="size-4 text-violet-500" />,
    label: "Total Training Time",
    value: "25 hrs",
  },
  {
    icon: <Layers3 className="size-4 text-indigo-500" />,
    label: "Modules Completed",
    value: "8 / 12",
  },
];

const moduleDistribution: SessionModule[] = [
  { count: 22, label: "Sling Surgery", tone: "bg-primary" },
  { count: 15, label: "Knee Arthroscopy", tone: "bg-chart-2" },
  { count: 8, label: "Laparoscopic Chole", tone: "bg-chart-3" },
  { count: 5, label: "Other", tone: "bg-muted-foreground/40" },
];

const recentSessions: RecentSession[] = [
  {
    accuracy: 92,
    id: "sess_1",
    module: "Sling Surgery Level 3",
    score: 89,
    time: "20m 00s",
    when: "Mar 26, 2026",
  },
  {
    accuracy: 98,
    id: "sess_2",
    module: "Knee Arthroscopy",
    score: 94,
    time: "25m 30s",
    when: "Mar 25, 2026",
  },
  {
    accuracy: 82,
    id: "sess_3",
    module: "Sling Surgery Level 2",
    score: 78,
    time: "18m 15s",
    when: "Mar 22, 2026",
  },
];

const trendPoints = [
  { x: 2, y: 68 },
  { x: 12, y: 72 },
  { x: 22, y: 70 },
  { x: 32, y: 67 },
  { x: 42, y: 69 },
  { x: 52, y: 90 },
  { x: 62, y: 84 },
  { x: 72, y: 78 },
  { x: 82, y: 88 },
  { x: 92, y: 82 },
];

const rootClassName = "flex flex-col gap-5";
const sectionCardClassName = "rounded-card border border-border bg-card shadow-surface";
const kpiCardClassName = "rounded-card border border-border bg-card px-4 py-3.5 shadow-surface";
const sectionTitleClassName = "text-base font-semibold text-foreground";
const sectionSubTitleClassName = "mt-0.5 text-xs text-muted-foreground";

function scoreTone(score: number): string {
  if (score >= 90) return "bg-success/15 text-success";
  if (score >= 80) return "bg-primary/12 text-primary";
  return "bg-warning/15 text-warning";
}

function polylinePoints() {
  return trendPoints
    .map((point) => {
      const y = 100 - point.y;
      return `${point.x},${y}`;
    })
    .join(" ");
}

export function TraineeDashboardPage() {
  return (
    <div className={cn(rootClassName)}>
      <section className="grid grid-cols-1 gap-3 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <article key={kpi.label} className={cn(kpiCardClassName)}>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <span className="rounded-full bg-secondary p-1.5">{kpi.icon}</span>
            </div>
            <div className="mt-3 flex items-end gap-2">
              <p className="text-kpi">{kpi.value}</p>
              {kpi.change && (
                <span className="pb-1 text-xs font-semibold text-success">{kpi.change}</span>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr_1fr]">
        <article className={cn(sectionCardClassName, "p-4")}>
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className={cn(sectionTitleClassName)}>Performance Trend</h2>
              <p className={cn(sectionSubTitleClassName)}>
                Overall score progression across all modules
              </p>
            </div>
            <button
              type="button"
              className="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
            >
              Last 30 Days
            </button>
          </div>
          <div className="relative h-64 rounded-lg border border-border bg-secondary/35 p-3">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_24%,rgba(148,163,184,0.15)_25%,transparent_26%)] bg-size-[100%_20%]" />
            <svg
              className="relative z-10 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <title>Performance trend over 30 days</title>
              <defs>
                <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(47 111 238 / 30%)" />
                  <stop offset="100%" stopColor="rgb(47 111 238 / 4%)" />
                </linearGradient>
              </defs>
              <polyline
                fill="none"
                stroke="rgb(47 111 238)"
                strokeWidth="0.5"
                points={polylinePoints()}
              />
              <polygon
                fill="url(#trend-fill)"
                points={`${polylinePoints()} 92,100 2,100`}
                stroke="none"
              />
              {trendPoints.map((point) => (
                <circle
                  key={point.x}
                  cx={point.x}
                  cy={100 - point.y}
                  r="0.9"
                  fill="#ffffff"
                  stroke="#2f6fee"
                  strokeWidth="0.45"
                />
              ))}
            </svg>
          </div>
        </article>

        <article className={cn(sectionCardClassName, "p-4")}>
          <h2 className={cn(sectionTitleClassName)}>Sessions by Module</h2>
          <p className={cn(sectionSubTitleClassName)}>Distribution of training focus</p>
          <div className="mx-auto mt-4 size-44 rounded-full bg-[conic-gradient(var(--color-primary)_0_44%,var(--color-chart-2)_44%_74%,var(--color-chart-3)_74%_90%,rgb(203_213_225)_90%_100%)] p-4">
            <div className="size-full rounded-full bg-card" />
          </div>
          <ul className="mt-4 space-y-2 text-xs">
            {moduleDistribution.map((item) => (
              <li key={item.label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className={cn("size-2 rounded-full", item.tone)} />
                  {item.label}
                </span>
                <span className="font-semibold text-foreground">{item.count}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className={cn(sectionCardClassName, "p-4")}>
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className={cn(sectionTitleClassName)}>Recent Sessions</h2>
            <p className={cn(sectionSubTitleClassName)}>
              Detailed history of your training activities
            </p>
          </div>
          <label className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-tertiary" />
            <input
              className="h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 text-xs text-foreground outline-none ring-ring focus-visible:ring-2 sm:w-56"
              placeholder="Search sessions..."
              type="text"
            />
          </label>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/65 text-muted-foreground">
              <tr>
                <th className="px-3 py-2.5 font-medium">Module</th>
                <th className="px-3 py-2.5 font-medium">Score</th>
                <th className="px-3 py-2.5 font-medium">Time</th>
                <th className="px-3 py-2.5 font-medium">Accuracy</th>
                <th className="px-3 py-2.5 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSessions.map((session) => (
                <tr key={session.id} className="border-t border-border bg-card">
                  <td className="px-3 py-2.5 font-medium text-foreground">{session.module}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 font-semibold",
                        scoreTone(session.score),
                      )}
                    >
                      {session.score}%
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">{session.time}</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${session.accuracy}%` }}
                        />
                      </div>
                      <span className="font-medium text-foreground">{session.accuracy}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">{session.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
