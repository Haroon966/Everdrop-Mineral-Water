import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { AnimateOnScroll } from "@/components/animations";
import { SectionHeading } from "@/components/section-heading";

export function AboutStory() {
  return (
    <section className="section-pad bg-background">
      <div className="section-shell-wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <AnimateOnScroll>
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="Born in F11/1, Built on Trust"
                description="A local water delivery service with a simple promise — pure water, delivered with care."
              />
              <div className="mt-8 flex flex-col gap-4 text-base leading-relaxed text-[#035a8a]/85 dark:text-[#90e0ef]/85">
                <p>
                  Everdrop Pure Mineral Water was founded with a simple mission: deliver
                  genuinely pure, naturally balanced mineral water to homes and offices
                  across Islamabad and Rawalpindi.
                </p>
                <p>
                  Based in F11/1, we combine premium quality with fast, reliable doorstep
                  service — something national brands can&apos;t match. We know your
                  neighbourhood, your schedule, and what your family or office needs.
                </p>
                <p>
                  Whether you need a 19L dispenser bottle for your home or office,
                  Everdrop is your trusted partner for hydration.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-3xl border border-[#90e0ef]/60 bg-gradient-to-br from-[#caf0f8]/80 to-white shadow-lg dark:border-[#00b4d8]/20 dark:from-[#0077b6]/20 dark:to-[#03045e]/60">
              <div className="flex items-end justify-center px-8 pt-10 pb-4">
                <Image
                  src={withBasePath("/everdrop-water-bottle.png")}
                  alt="Everdrop 19L mineral water bottle"
                  width={320}
                  height={400}
                  className="h-auto w-full max-w-[280px] object-contain drop-shadow-xl md:max-w-[320px]"
                />
              </div>
              <div className="border-t border-[#90e0ef]/40 bg-white/60 px-6 py-5 backdrop-blur-sm dark:border-[#00b4d8]/15 dark:bg-[#03045e]/40">
                <p className="font-heading text-lg font-semibold text-[#03045e] dark:text-white">
                  Every Drop, Pure Trust
                </p>
                <p className="mt-1 text-sm text-[#035a8a]/80 dark:text-[#90e0ef]/80">
                  Premium mineral water · Islamabad & Rawalpindi
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
