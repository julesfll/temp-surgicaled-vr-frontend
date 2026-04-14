import { cn } from "@/lib/utils";

const rootClassName = "flex flex-col gap-4";
const cardClassName = "rounded-card border border-border bg-card p-5 shadow-surface";
const titleClassName = "text-base font-semibold text-foreground";

export function InstitutionAdminDashboardPage() {
  return (
    <div className={cn(rootClassName)}>
      <section className={cn(cardClassName)}>
        <h2 className={cn(titleClassName)}>Institution Admin Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Institution-wide cohort performance, license utilization, and scheduling.
        </p>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className={cn(cardClassName)}>
          <p className="text-xs text-muted-foreground">Active Instructors</p>
          <p className="mt-2 text-kpi">18</p>
        </article>
        <article className={cn(cardClassName)}>
          <p className="text-xs text-muted-foreground">Assigned Modules</p>
          <p className="mt-2 text-kpi">73</p>
        </article>
        <article className={cn(cardClassName)}>
          <p className="text-xs text-muted-foreground">This Week Completion</p>
          <p className="mt-2 text-kpi text-success">+11%</p>
        </article>
      </section>
    </div>
  );
}
