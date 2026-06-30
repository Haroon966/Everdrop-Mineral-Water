import Link from "next/link";
import { AnimateOnScroll } from "@/components/animations";
import { SectionHeading } from "@/components/section-heading";
import type { Product } from "@/lib/types";

const useCaseMap: Record<string, string> = {
  "19L": "Homes & offices with dispensers",
  Accessory: "Dispenser setup & pumps",
};

interface ProductsComparisonProps {
  products: Product[];
}

export function ProductsComparison({ products }: ProductsComparisonProps) {
  return (
    <section className="section-pad bg-muted/40">
      <div className="section-shell">
        <AnimateOnScroll>
          <SectionHeading
            eyebrow="Compare"
            title="Find the Right Product"
            description="Quick comparison to help you choose 19L bottles or dispenser accessories for home and office."
          />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="mt-10 hidden overflow-hidden rounded-2xl border border-[#90e0ef]/60 bg-white/85 backdrop-blur-md dark:border-[#00b4d8]/20 dark:bg-[#03045e]/85 md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#90e0ef]/50 bg-[#caf0f8]/40 dark:border-[#00b4d8]/15 dark:bg-[#0077b6]/15">
                  <th className="px-6 py-4 font-semibold text-[#03045e] dark:text-white">Product</th>
                  <th className="px-6 py-4 font-semibold text-[#03045e] dark:text-white">Size</th>
                  <th className="px-6 py-4 font-semibold text-[#03045e] dark:text-white">Price</th>
                  <th className="px-6 py-4 font-semibold text-[#03045e] dark:text-white">Best For</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.slug}
                    className={
                      index % 2 === 0
                        ? "border-b border-[#90e0ef]/30 last:border-0 dark:border-[#00b4d8]/10"
                        : "border-b border-[#90e0ef]/30 bg-[#f8fafc]/80 last:border-0 dark:border-[#00b4d8]/10 dark:bg-[#03045e]/50"
                    }
                  >
                    <td className="px-6 py-4 font-medium text-[#03045e] dark:text-white">
                      <Link href={`/products/${product.slug}/`} className="hover:text-primary hover:underline cursor-pointer">
                        {product.cardTitle ?? product.name}
                      </Link>
                      {product.popular && (
                        <span className="ml-2 rounded-full bg-[#00b4d8]/20 px-2 py-0.5 text-xs font-semibold text-[#0077b6] dark:text-[#00b4d8]">
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#035a8a] dark:text-[#90e0ef]">{product.size}</td>
                    <td className="px-6 py-4 font-semibold text-[#0077b6] dark:text-[#00b4d8]">
                      {product.currency} {product.price}
                    </td>
                    <td className="px-6 py-4 text-[#035a8a] dark:text-[#90e0ef]">
                      {useCaseMap[product.size] ?? product.tagline}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-col gap-4 md:hidden">
            {products.map((product) => (
              <div
                key={product.slug}
                className="glass-card rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-lg font-semibold text-[#03045e] dark:text-white">
                      <Link href={`/products/${product.slug}/`} className="hover:text-primary cursor-pointer">
                        {product.cardTitle ?? product.name}
                      </Link>
                    </p>
                    <p className="mt-1 text-sm text-[#035a8a] dark:text-[#90e0ef]">{product.size}</p>
                  </div>
                  <p className="shrink-0 font-heading text-lg font-bold text-[#0077b6] dark:text-[#00b4d8]">
                    {product.currency} {product.price}
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {useCaseMap[product.size] ?? product.tagline}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
