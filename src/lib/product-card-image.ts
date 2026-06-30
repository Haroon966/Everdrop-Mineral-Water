import { withBasePath } from "@/lib/base-path";
import type { Product } from "@/lib/types";

export type ProductCardImageVariant = "tall" | "medium" | "small" | "photo";

export interface ProductCardImageConfig {
  src: string;
  variant: ProductCardImageVariant;
  width: number;
  height: number;
}

const variantBySlug: Record<string, Omit<ProductCardImageConfig, "src">> = {
  "19l": { variant: "photo", width: 280, height: 200 },
  "manual-pump-dispenser": { variant: "photo", width: 280, height: 200 },
  "gravity-dispenser": { variant: "photo", width: 280, height: 200 },
  "bottle-stand": { variant: "photo", width: 280, height: 200 },
  "home-office-setup": { variant: "photo", width: 280, height: 200 },
};

const srcOverrideBySlug: Partial<Record<string, string>> = {};

export function getProductCardImage(product: Product): ProductCardImageConfig {
  const preset = variantBySlug[product.slug] ?? {
    variant: "medium" as const,
    width: 130,
    height: 160,
  };

  const src = srcOverrideBySlug[product.slug] ?? product.image;

  return {
    src: withBasePath(src),
    ...preset,
  };
}
