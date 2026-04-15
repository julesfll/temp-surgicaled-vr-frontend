import {
  ArrowRight,
  BarChart3,
  Brain,
  Building2,
  ChevronDown,
  Crosshair,
  GraduationCap,
  Headset,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.3);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-sm font-medium tracking-wider text-primary uppercase">
      <span className="font-mono text-tertiary">{number}</span>
      <span className="h-px w-8 bg-primary/30" />
      <span>{title}</span>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}) {
  const { ref, visible } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="group rounded-xl border border-border bg-card p-8 shadow-surface transition-all duration-700 hover:shadow-elevated"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-heading">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="flex animate-bounce flex-col items-center gap-2 text-tertiary">
      <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
      <ChevronDown className="size-4" />
    </div>
  );
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(16px)" : "none",
        backgroundColor: scrolled ? "rgba(245, 247, 251, 0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Crosshair className="size-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-heading">SurgicalEdVR</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/login">Get started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

const stats = [
  { label: "Training sessions", suffix: "+", value: 50000 },
  { label: "Institutions", suffix: "+", value: 120 },
  { label: "VR procedures", suffix: "", value: 45 },
  { label: "Skill improvement", suffix: "%", value: 94 },
] as const;

const features = [
  {
    description:
      "High-fidelity surgical environments with haptic feedback, replicating real OR conditions for risk-free practice.",
    icon: Headset,
    title: "Immersive VR Simulations",
  },
  {
    description:
      "Granular metrics on precision, timing, and decision-making — tracked across every session and procedure.",
    icon: BarChart3,
    title: "Performance Analytics",
  },
  {
    description:
      "Real-time session monitoring, cohort management, and customizable assessment rubrics for educators.",
    icon: GraduationCap,
    title: "Instructor Oversight",
  },
  {
    description:
      "AI-driven difficulty scaling that adjusts to each trainee's skill level and learning trajectory.",
    icon: Brain,
    title: "Adaptive Learning",
  },
] as const;

const roles = [
  {
    description:
      "Full platform control with user management, institution oversight, and system-wide analytics.",
    icon: ShieldCheck,
    title: "Administrators",
  },
  {
    description:
      "Monitor trainees, review session recordings, assign procedures, and evaluate performance.",
    icon: Users,
    title: "Instructors",
  },
  {
    description:
      "Onboard cohorts, manage licenses, and benchmark training outcomes across departments.",
    icon: Building2,
    title: "Institutions",
  },
] as const;

export function LandingPage() {
  const missionSection = useInView(0.15);
  const statsSection = useInView(0.2);
  const ctaSection = useInView(0.2);

  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <NavBar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,111,238,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/4 blur-3xl" />

        <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-surface">
            <span className="size-1.5 animate-pulse rounded-full bg-success" />
            Now in beta — accepting institutions
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-heading sm:text-6xl lg:text-7xl">
            The future of
            <br />
            <span className="bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              surgical training.
            </span>
          </h1>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Immersive VR simulations, real-time analytics, and structured curricula — built for the
            next generation of surgeons.
          </p>

          <div className="flex items-center gap-4">
            <Button size="lg" className="px-8" asChild>
              <Link to="/login">
                Start training
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <a href="#mission">Learn more</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── 001 / Our Mission ── */}
      <section id="mission" className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <div
            ref={missionSection.ref}
            className="transition-all duration-1000"
            style={{
              opacity: missionSection.visible ? 1 : 0,
              transform: missionSection.visible ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <SectionLabel number="001" title="Our mission" />
            <h2 className="mb-8 max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-heading sm:text-5xl">
              From textbook learning to hands-on mastery.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Traditional surgical training relies on observation and limited cadaver access.
              SurgicalEdVR bridges the gap with repeatable, measurable, and immersive practice — so
              every trainee is OR-ready.
            </p>
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-3">
            {roles.map((role, i) => (
              <FeatureCard
                key={role.title}
                icon={role.icon}
                title={role.title}
                description={role.description}
                delay={i * 120}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-y border-border bg-card px-6 py-20">
        <div
          ref={statsSection.ref}
          className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center transition-all duration-700"
              style={{
                opacity: statsSection.visible ? 1 : 0,
                transform: statsSection.visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <span className="mb-2 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm font-medium text-tertiary">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 002 / Platform ── */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel number="002" title="Platform" />
          <h2 className="mb-16 max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-heading sm:text-5xl">
            Built for precision. Designed for scale.
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={i * 120}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 003 / Get Started ── */}
      <section className="px-6 pb-32 pt-16">
        <div
          ref={ctaSection.ref}
          className="mx-auto max-w-6xl transition-all duration-1000"
          style={{
            opacity: ctaSection.visible ? 1 : 0,
            transform: ctaSection.visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <SectionLabel number="003" title="Get started" />
          <h2 className="mb-6 max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-heading sm:text-5xl">
            Onboard in minutes. Train anytime.
          </h2>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Set up your institution, invite trainees, and launch your first VR surgical session —
            all from a single dashboard.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="px-8" asChild>
              <Link to="/login">
                Request access
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary">
              <Crosshair className="size-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-heading">SurgicalEdVR</span>
          </div>
          <p className="text-xs text-tertiary">
            &copy; {new Date().getFullYear()} SurgicalEdVR. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
