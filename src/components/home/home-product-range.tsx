import { AnimateOnScroll, BatchReveal } from "@/components/animations";
import { HomeProductCard } from "@/components/home/home-product-card";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import type { Product } from "@/lib/types";

const homeExcludedSlugs = new Set(["gravity-dispenser"]);

interface HomeProductRangeProps {
  products: Product[];
  className?: string;
}

export function HomeProductRange({ products, className }: HomeProductRangeProps) {
  const homeProducts = products.filter((product) => !homeExcludedSlugs.has(product.slug));

  return (
    <section className={`section-pad bg-background ${className ?? ""}`}>
      <div className="section-shell-wide">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Products"
            title="Shop Our Range"
            description="19L mineral water and dispenser accessories — order on WhatsApp for fast delivery."
          />
        </AnimateOnScroll>

        <p className="mt-4 text-center text-xs text-muted-foreground md:hidden">
          Swipe to see more →
        </p>

        <BatchReveal className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:mt-10 md:grid md:grid-cols-2 md:snap-none md:overflow-visible md:pb-0 md:gap-5 xl:grid xl:grid-cols-4 xl:snap-none xl:overflow-visible xl:pb-0 [&::-webkit-scrollbar]:hidden">
          {homeProducts.map((product) => (
            <HomeProductCard key={product.slug} product={product} />
          ))}
        </BatchReveal>

        <AnimateOnScroll className="mt-10 flex justify-center">
          <ButtonLink href="/products/" size="lg" className="cursor-pointer">
            View All Products
          </ButtonLink>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
