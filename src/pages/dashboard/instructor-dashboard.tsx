import { Search } from "lucide-react";
import { cn, cva } from "@/lib/utils";

const modules = [
  {
    est: "90m",
    focus: "Spatial Awareness",
    id: "PROC-1042",
    level: "Level 2",
    title: "Cholecystectomy Basics: Gallbladder Dissection",
  },
  {
    est: "45m",
    focus: "Critical Decision Making",
    id: "PROC-3015",
    level: "Level 3",
    title: "Emergency Thoracotomy: Rapid Access Protocol",
  },
  {
    est: "120m",
    focus: "Fine Motor Control",
    id: "PROC-2089",
    level: "Level 3",
    title: "Vascular Anastomosis: Continuous Suture",
  },
  {
    est: "30m",
    focus: "Triangulation",
    id: "PROC-0982",
    level: "Level 1",
    title: "Basic Laparoscopy: Peg Transfer Drills",
  },
];

const workloadSeries = [
  { id: "jenkins", load: 60, name: "Jenkins" },
  { id: "patel", load: 40, name: "Patel" },
  { id: "ross", load: 90, name: "Ross" },
  { id: "kim", load: 20, name: "Kim" },
  { id: "lee", load: 55, name: "Lee" },
];

const rootVariants = cva("flex flex-col gap-6");
const sectionCard = cva("rounded-card border border-border bg-card p-6 shadow-surface");
const sectionTitle = cva("text-lg font-semibold text-foreground");
const filterControl = cva(
  "h-11 rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none ring-ring focus-visible:ring-2",
);

export function InstructorDashboardPage() {
  return (
    <div className={cn(rootVariants())}>
      <section className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px_180px]">
        <label className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className={cn(filterControl(), "pl-9")}
            placeholder="Search procedure name or ID..."
          />
        </label>
        <select className={cn(filterControl())} defaultValue="all">
          <option value="all">All Procedures</option>
          <option value="general">General Surgery</option>
          <option value="vascular">Vascular</option>
          <option value="ortho">Orthopedic</option>
        </select>
        <select className={cn(filterControl())} defaultValue="difficulty-all">
          <option value="difficulty-all">Difficulty: All</option>
          <option value="level-1">Level 1 (Basic)</option>
          <option value="level-2">Level 2 (Intermediate)</option>
          <option value="level-3">Level 3 (Advanced)</option>
        </select>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="flex flex-col gap-6 xl:col-span-8">
          <div className="flex items-center justify-between">
            <h2 className={cn(sectionTitle())}>Module Library</h2>
            <span className="text-sm text-muted-foreground">14 available</span>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {modules.map((module) => (
              <article
                key={module.id}
                className="rounded-xl border border-border bg-card p-5 shadow-surface transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                <p className="text-xs font-semibold text-tertiary">{module.id}</p>
                <h3 className="mt-1 min-h-12 text-[15px] font-semibold text-foreground">
                  {module.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Est. Time: {module.est} • Focus: {module.focus}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span
                    className={cn(
                      "rounded-md px-2 py-1 text-[11px] font-semibold",
                      module.level === "Level 3"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {module.level}
                  </span>
                  <button
                    type="button"
                    className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Assign Trainee
                  </button>
                </div>
              </article>
            ))}
          </div>

          <section className={cn(sectionCard())}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className={cn(sectionTitle())}>Assignment Calendar</h3>
              <button type="button" className="text-sm font-medium text-primary hover:underline">
                Full Calendar
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/45 p-3">
                <div className="w-12 border-r border-border pr-3 text-center">
                  <p className="text-xs font-bold text-primary">OCT</p>
                  <p className="text-sm font-semibold">12</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Evaluation: Dr. Jenkins</p>
                  <p className="text-xs text-muted-foreground">
                    Laparoscopic Appendectomy • VR-Station-03
                  </p>
                </div>
                <span className="rounded-md bg-accent px-2 py-1 text-xs font-semibold text-primary">
                  09:00 AM
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/45 p-3">
                <div className="w-12 border-r border-border pr-3 text-center">
                  <p className="text-xs font-bold text-primary">OCT</p>
                  <p className="text-sm font-semibold">14</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Deadline: Resident Group B</p>
                  <p className="text-xs text-muted-foreground">
                    Module PROC-1042 Completion Required
                  </p>
                </div>
                <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-muted-foreground">
                  EOD
                </span>
              </div>
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-6 xl:col-span-4">
          <section className={cn(sectionCard())}>
            <h3 className={cn(sectionTitle())}>Trainee Workload</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Active modules per resident (Current Week)
            </p>
            <div className="mt-4 flex h-44 items-end gap-3">
              {workloadSeries.map((item) => (
                <div key={item.id} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative h-full w-full rounded-md bg-accent">
                    <div
                      className="absolute inset-x-0 bottom-0 rounded-b-md bg-primary"
                      style={{ height: `${item.load}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Avg. Sim Load</span>
                <span className="font-semibold">12.4 hrs/wk</span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-muted-foreground">Completion Rate</span>
                <span className="font-semibold text-success">+14% vs LY</span>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
