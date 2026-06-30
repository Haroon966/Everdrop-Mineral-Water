import { getDeliveryAreas, getTestimonials } from "./content";
import type { DeliveryAreaRecord, Testimonial } from "./types";

export function areaToSlug(area: string, region: string): string {
  const areaPart = area
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const regionPart = region.toLowerCase().replace(/\s+/g, "-");
  return `${areaPart}-${regionPart}`;
}

export function getAllDeliveryAreas(): DeliveryAreaRecord[] {
  const { regions } = getDeliveryAreas();
  const areas: DeliveryAreaRecord[] = [];

  for (const region of regions) {
    for (const group of region.groups) {
      for (const area of group.areas) {
        areas.push({
          name: area,
          region: region.name,
          regionDescription: region.description,
          groupLabel: group.label,
          slug: areaToSlug(area, region.name),
        });
      }
    }
  }

  return areas;
}

export function getDeliveryAreaBySlug(slug: string): DeliveryAreaRecord | undefined {
  return getAllDeliveryAreas().find((area) => area.slug === slug);
}

export function getTestimonialsForArea(area: DeliveryAreaRecord): Testimonial[] {
  const testimonials = getTestimonials();
  const areaLower = area.name.toLowerCase();

  const matched = testimonials.filter((item) => {
    const itemArea = item.area.toLowerCase();
    return (
      itemArea.includes(areaLower) ||
      itemArea.startsWith(`${areaLower},`) ||
      itemArea.includes(`${areaLower} `)
    );
  });

  if (matched.length > 0) return matched;

  const regionLower = area.region.toLowerCase();
  return testimonials
    .filter((item) => item.area.toLowerCase().includes(regionLower))
    .slice(0, 3);
}

export function buildAreaWhatsAppMessage(area: DeliveryAreaRecord): string {
  return `Hi Everdrop, I need mineral water delivery in ${area.name}, ${area.region}. My address is: `;
}

export function buildAreaMetaTitle(area: DeliveryAreaRecord): string {
  return `Water Delivery ${area.name} ${area.region} | 19L Mineral Water`;
}

export function buildAreaMetaDescription(area: DeliveryAreaRecord): string {
  return `Everdrop delivers 19L mineral water to ${area.name}, ${area.region}. Fast 24hr doorstep delivery. Order on WhatsApp: 0300-6096599.`;
}

export function buildAreaIntro(area: DeliveryAreaRecord): string {
  return `Everdrop Pure Mineral Water delivers premium 19L dispenser bottles to ${area.name} in ${area.region}. Based in F11/1 Islamabad, we offer fast doorstep delivery for homes, offices, and clinics across the ${area.groupLabel} zone and surrounding neighbourhoods. Most orders arrive within 24 hours — message us on WhatsApp to confirm same-day availability for ${area.name}.`;
}

export function getAreaFaqs(area: DeliveryAreaRecord): { question: string; answer: string }[] {
  return [
    {
      question: `Does Everdrop deliver to ${area.name}?`,
      answer: `Yes. Everdrop delivers premium mineral water to ${area.name} in ${area.region}. Most orders arrive within 24 hours. Contact us on WhatsApp at 0300-6096599 to confirm same-day delivery availability.`,
    },
    {
      question: `How much does 19L water cost in ${area.name}?`,
      answer: `Everdrop 19L dispenser bottles are PKR 650 each with free delivery to ${area.name} for most orders. Bulk and office orders receive priority scheduling.`,
    },
    {
      question: `How do I order water delivery in ${area.name}?`,
      answer: `Message Everdrop on WhatsApp at 0300-6096599 with your ${area.name} address, quantity of 19L bottles, and any accessory needs. We confirm your order and delivery time within minutes.`,
    },
    {
      question: `How fast is delivery to ${area.groupLabel} areas?`,
      answer: `Most ${area.name} orders are delivered within 24 hours. Same-day delivery may be available for select ${area.region} sectors — contact us on WhatsApp to check availability for your exact location.`,
    },
  ];
}
