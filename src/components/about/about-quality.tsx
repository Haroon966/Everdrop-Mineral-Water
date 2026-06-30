import { AnimateOnScroll } from "@/components/animations";
import { SectionHeading } from "@/components/section-heading";
import { ShieldCheck, FlaskConical, Truck } from "lucide-react";

const qualityPoints = [
  {
    icon: FlaskConical,
    title: "Naturally Balanced Minerals",
    description:
      "Our water is sourced and bottled to preserve essential minerals — delivering a crisp, refreshing taste without artificial additives.",
  },
  {
    icon: ShieldCheck,
    title: "Strict Quality Standards",
    description:
      "Every batch is tested for purity and safety before it reaches your home or office. We meet rigorous quality benchmarks on every delivery.",
  },
  {
    icon: Truck,
    title: "Local Expertise Since F11/1",
    description:
      "As a locally based service — not a national franchise — we know Islamabad and Rawalpindi neighbourhoods, traffic patterns, and what your sector needs.",
  },
];

export function AboutQuality() {
  return (
    <section className="section-pad water-gradient">
      <div className="section-shell-wide">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Quality & Trust"
            title="Our Bottling & Quality Promise"
            description="Experience, expertise, and transparency — the foundation of every Everdrop delivery."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {qualityPoints.map((point) => (
              <article key={point.title} className="glass-card rounded-2xl p-6">
                <point.icon className="size-8 text-primary" aria-hidden />
                <h3 className="mt-4 font-heading text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Everdrop was built by a team that lives and works in Islamabad. We personally oversee
            sourcing, bottling, and delivery — so when you order from F-11, Bahria Town, or DHA,
            you are getting water from people who know your area and stand behind every bottle.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
