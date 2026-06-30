import Link from "next/link";
import { ArrowRight, MessageCircle, MapPin, Package } from "lucide-react";
import { AnimateOnScroll } from "@/components/animations";
import { SectionHeading } from "@/components/section-heading";
import { getSiteConfig } from "@/lib/content";

const steps = [
  {
    icon: MessageCircle,
    title: "Message us on WhatsApp",
    description: "Save 0300-6096599 and send your area, address, bottle size, and quantity.",
  },
  {
    icon: Package,
    title: "Confirm your order",
    description: "We reply within minutes with pricing, delivery time, and payment options.",
  },
  {
    icon: MapPin,
    title: "Receive at your door",
    description: "Most Islamabad and Rawalpindi orders arrive within 24 hours.",
  },
];

export function HomeHowToOrder() {
  const site = getSiteConfig();

  return (
    <section className="section-pad bg-background">
      <div className="section-shell">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="How to Order"
            title="Order Mineral Water in 3 Simple Steps"
            description="Fast doorstep delivery across Islamabad and Rawalpindi — no app required."
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="glass-card rounded-2xl p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-bold text-primary">
                  {index + 1}
                </span>
                <step.icon className="mt-4 size-6 text-primary" aria-hidden />
                <h3 className="mt-3 font-heading text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href={site.social.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-whatsapp min-h-11 cursor-pointer"
            >
              Start on WhatsApp
            </Link>
            <Link
              href="/delivery/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors duration-200 hover:underline cursor-pointer"
            >
              Check delivery areas
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
