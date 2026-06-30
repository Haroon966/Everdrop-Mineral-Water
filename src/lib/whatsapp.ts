import type { Product } from "./types";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/923006096599?text=${encodeURIComponent(message)}`;
}

export function buildProductOrderUrl(product: Product, area?: string): string {
  const message = area
    ? `${product.whatsappMessage}${area}`
    : product.whatsappMessage;
  return buildWhatsAppUrl(message);
}

export function buildContactWhatsAppUrl(
  name: string,
  phone: string,
  message: string
): string {
  return buildWhatsAppUrl(
    `Hi Everdrop, I'm ${name} (${phone}). ${message}`
  );
}

export function buildNewsletterWhatsAppUrl(email: string): string {
  return buildWhatsAppUrl(
    `Hi Everdrop, I'd like to subscribe to updates. My email: ${email}`
  );
}
