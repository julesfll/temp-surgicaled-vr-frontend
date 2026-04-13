import { cn, cva } from "@/lib/utils";

const rootVariants = cva("flex flex-col gap-4");
const cardVariants = cva("rounded-card border border-border bg-card p-5 shadow-surface");
const titleVariants = cva("text-base font-semibold text-foreground");

export function InstitutionAdminDashboardPage() {
  return (
    <div className={cn(rootVariants())}>
      <section className={cn(cardVariants())}>
        <h2 className={cn(titleVariants())}>Institution Admin Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Institution-wide cohort performance, license utilization, and scheduling.
        </p>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className={cn(cardVariants())}>
          <p className="text-xs text-muted-foreground">Active Instructors</p>
          <p className="mt-2 text-kpi">18</p>
        </article>
        <article className={cn(cardVariants())}>
          <p className="text-xs text-muted-foreground">Assigned Modules</p>
          <p className="mt-2 text-kpi">73</p>
        </article>
        <article className={cn(cardVariants())}>
          <p className="text-xs text-muted-foreground">This Week Completion</p>
          <p className="mt-2 text-kpi text-success">+11%</p>
        </article>
      </section>
    </div>
  );
}
