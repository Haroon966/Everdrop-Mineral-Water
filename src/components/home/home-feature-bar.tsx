import { Award, Leaf, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimateOnScroll } from "@/components/animations";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

type Feature =
  | { icon: LucideIcon; title: string; desc: string }
  | { whatsapp: true; title: string; desc: string };

const features: Feature[] = [
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Within 24 hours",
  },
  {
    whatsapp: true,
    title: "WhatsApp Order",
    desc: "Quick & easy",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    desc: "100% pure & safe",
  },
  {
    icon: Leaf,
    title: "Eco Friendly",
    desc: "Sustainable packaging",
  },
] as const;

export function HomeFeatureBar() {
  return (
    <div className="feature-bar-overlap relative z-40">
      <div className="section-shell">
        <AnimateOnScroll>
          <div className="grid gap-6 rounded-3xl bg-[#03045e] px-6 py-8 text-white shadow-xl shadow-[#03045e]/20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:px-10 lg:py-10">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-4 lg:justify-center lg:border-l lg:border-white/15 lg:first:border-l-0 lg:px-4"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#00b4d8]/40 bg-[#0077b6]/30">
                  {"whatsapp" in feature ? (
                    <span className="whatsapp-icon-badge size-10 border-0 bg-[#25d366]/20">
                      <WhatsAppIcon className="size-6" />
                    </span>
                  ) : (
                    <feature.icon className="size-5 text-[#90e0ef]" aria-hidden />
                  )}
                </span>
                <div>
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-sm text-[#90e0ef]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
