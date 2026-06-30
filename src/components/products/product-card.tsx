import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Badge } from "@/components/ui/badge";
import { buildProductOrderUrl } from "@/lib/whatsapp";
import { getProductCardImage } from "@/lib/product-card-image";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

function displayTitle(product: Product) {
  return product.cardTitle ?? product.name;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const whatsappUrl = buildProductOrderUrl(product);
  const isFeatured = featured || product.popular;
  const imageConfig = getProductCardImage(product);
  const isPhoto = imageConfig.variant === "photo";

  return (
    <article
      className={cn(
        "batch-item group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/85 backdrop-blur-md transition-[border-color,box-shadow] duration-200 dark:bg-[#03045e]/85",
        isFeatured
          ? "border-[#00b4d8]/60 shadow-lg shadow-[#00b4d8]/15 lg:flex-row lg:items-stretch"
          : "border-[#90e0ef]/70 shadow-sm hover:border-[#0077b6]/45 hover:shadow-md dark:border-[#00b4d8]/20"
      )}
    >
      {isFeatured && (
        <Badge className="absolute right-4 top-4 z-10 flex items-center gap-1 bg-[#00b4d8] px-3 py-1 text-xs font-semibold text-[#03045e]">
          <Sparkles className="size-3" aria-hidden />
          Most Popular
        </Badge>
      )}

      <div
        className={cn(
          "relative flex overflow-hidden",
          isPhoto ? "items-center justify-center bg-[#e8f7fc] dark:bg-[#0077b6]/20" : "items-end justify-center bg-gradient-to-b from-[#caf0f8]/80 to-white dark:from-[#0077b6]/20 dark:to-[#03045e]/40",
          isFeatured ? "lg:w-[42%] lg:min-h-[320px]" : "aspect-[4/3]"
        )}
      >
        <Image
          src={imageConfig.src}
          alt={product.name}
          width={imageConfig.width}
          height={imageConfig.height}
          className={cn(
            "transition-opacity duration-200 group-hover:opacity-90",
            isPhoto
              ? "h-full w-full object-cover object-center"
              : cn(
                  "object-contain object-bottom",
                  isFeatured ? "h-56 w-auto md:h-64 lg:h-72" : "h-44 w-auto md:h-48"
                )
          )}
        />
      </div>

      <div className={cn("flex flex-1 flex-col p-6", isFeatured && "lg:justify-center lg:p-8 lg:pl-6")}>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#0077b6] dark:text-[#00b4d8]">
          {product.size}
        </p>
        <h2 className="mt-1 font-heading text-xl font-bold text-[#03045e] dark:text-white md:text-2xl">
          {displayTitle(product)}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#035a8a]/80 dark:text-[#90e0ef]/85">
          {product.tagline ?? product.description}
        </p>

        <div className="mt-5 flex items-baseline gap-1">
          <span className="font-heading text-3xl font-bold text-[#0077b6] dark:text-[#00b4d8] md:text-4xl">
            {product.currency} {product.price}
          </span>
          <span className="text-sm text-[#035a8a]/70 dark:text-[#90e0ef]/70">
            / {product.priceLabel ?? "bottle"}
          </span>
        </div>

        <ul className="mt-5 flex flex-col gap-2">
          {product.features.slice(0, isFeatured ? 4 : 3).map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-[#035a8a] dark:text-[#90e0ef]"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-[#00b4d8]" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn inline-flex min-h-11 flex-1 items-center justify-center px-4 text-sm font-semibold"
          >
            <WhatsAppIcon data-icon="inline-start" className="size-5" />
            Order Now
          </Link>
          <Link
            href={`/products/${product.slug}/`}
            className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#0077b6]/30 bg-transparent px-4 text-sm font-semibold text-[#03045e] transition-colors duration-200 hover:border-[#0077b6] hover:bg-[#caf0f8]/50 dark:border-[#00b4d8]/35 dark:text-white dark:hover:bg-[#0077b6]/20"
          >
            Details
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
