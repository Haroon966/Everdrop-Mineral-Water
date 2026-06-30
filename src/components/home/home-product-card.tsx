"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getProductCardImage } from "@/lib/product-card-image";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

function cardTitle(product: Product) {
  return product.cardTitle ?? `${product.size} Water`;
}

interface HomeProductCardProps {
  product: Product;
}

export function HomeProductCard({ product }: HomeProductCardProps) {
  const imageConfig = getProductCardImage(product);
  const isPhoto = imageConfig.variant === "photo";

  return (
    <Link
      href={`/products/${product.slug}/`}
      aria-label={`View ${product.name} — ${product.currency} ${product.price}`}
      className={cn(
        "batch-item range-product-card group",
        product.popular && "range-product-card--popular"
      )}
    >
      <div
        className={cn(
          "range-product-card__visual",
          isPhoto ? "range-product-card__visual--photo" : "range-product-card__visual--product"
        )}
      >
        {product.popular && (
          <span className="range-product-card__flag">
            <Sparkles className="size-3" aria-hidden />
            Bestseller
          </span>
        )}
        <Image
          src={imageConfig.src}
          alt={`${product.name} — ${product.currency} ${product.price}`}
          width={imageConfig.width}
          height={imageConfig.height}
          className={cn(
            "range-product-card__image",
            isPhoto ? "range-product-card__image--photo" : "range-product-card__image--product"
          )}
        />
      </div>

      <div className="range-product-card__content">
        <span className="range-product-card__label">{product.size}</span>
        <h3 className="range-product-card__title">{cardTitle(product)}</h3>

        <div className="range-product-card__footer">
          <div className="range-product-card__price-wrap">
            <p className="range-product-card__price">
              <span className="range-product-card__currency">{product.currency}</span>{" "}
              {product.price}
            </p>
            <p className="range-product-card__unit">/ {product.priceLabel ?? "bottle"}</p>
          </div>
          <span className="range-product-card__cta" aria-hidden>
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
