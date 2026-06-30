import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@/lib/types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:scroll-px-6 [&::-webkit-scrollbar]:hidden"
        aria-label="Customer testimonials"
      >
        {testimonials.map((item) => (
          <Card
            key={item.name}
            className="batch-item w-[85vw] shrink-0 snap-center border-border/80 bg-card shadow-sm transition-colors duration-200 sm:w-[360px]"
          >
            <CardContent className="flex flex-col gap-4 pt-6">
              <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" aria-hidden />
                ))}
              </div>
              <blockquote className="text-base italic leading-relaxed text-foreground/85">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.area}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground md:hidden">
        Swipe to read more reviews
      </p>
    </div>
  );
}
