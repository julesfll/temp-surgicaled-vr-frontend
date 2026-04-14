import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const featureCards = [
  {
    description: "Standardize simulation programs across institutions with shared templates and role-based workflows.",
    icon: <Users className="size-4" />,
    title: "Multi-role workspace",
  },
  {
    description: "Track completion, competency trends, and resident progress with clear, operational analytics.",
    icon: <Sparkles className="size-4" />,
    title: "Actionable insights",
  },
  {
    description: "Enterprise-ready controls with auditability, permission boundaries, and secure access defaults.",
    icon: <ShieldCheck className="size-4" />,
    title: "Built for compliance",
  },
];

const bullets = [
  "Launch cohorts faster with reusable modules",
  "Monitor outcomes by program, instructor, and learner",
  "Keep teams aligned with one source of truth",
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/80 bg-card/60">
        <div className="mx-auto flex w-full max-w-[1080px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </span>
            <span className="text-base font-semibold">SurgicalEd</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1080px] gap-10 px-6 pt-16 pb-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-label text-primary">VR Training Management Platform</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
            Manage surgical simulation programs with confidence
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground">
            SurgicalEd gives institutions and instructors a single, modern workspace to coordinate
            VR training, track performance, and scale competency development.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link to="/login">
                Get started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/dashboard">View dashboard</Link>
            </Button>
          </div>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            {bullets.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-card border border-border bg-card p-6 shadow-surface">
          <p className="text-label text-muted-foreground">Trusted by training teams</p>
          <div className="mt-4 space-y-4">
            {featureCards.map((card) => (
              <article key={card.title} className="rounded-lg border border-border bg-secondary/50 p-4">
                <div className="flex items-center gap-2 text-primary">
                  {card.icon}
                  <h2 className="text-sm font-semibold text-foreground">{card.title}</h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
