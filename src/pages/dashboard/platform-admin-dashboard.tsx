import { cn, cva } from "@/lib/utils";

const rootVariants = cva("flex flex-col gap-4");
const cardVariants = cva("rounded-card border border-border bg-card p-5 shadow-surface");
const titleVariants = cva("text-base font-semibold text-foreground");

export function PlatformAdminDashboardPage() {
  return (
    <div className={cn(rootVariants())}>
      <section className={cn(cardVariants())}>
        <h2 className={cn(titleVariants())}>Platform Admin Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Cross-institution KPIs, user growth, and global compliance metrics.
        </p>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className={cn(cardVariants())}>
          <p className="text-xs text-muted-foreground">Total Institutions</p>
          <p className="mt-2 text-kpi">42</p>
        </article>
        <article className={cn(cardVariants())}>
          <p className="text-xs text-muted-foreground">Monthly Active Trainees</p>
          <p className="mt-2 text-kpi">1,284</p>
        </article>
        <article className={cn(cardVariants())}>
          <p className="text-xs text-muted-foreground">Global Completion Rate</p>
          <p className="mt-2 text-kpi text-success">86%</p>
        </article>
      </section>
    </div>
  );
}
