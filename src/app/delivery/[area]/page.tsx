import { DeliveryAreaTemplate } from "@/components/delivery/delivery-area-template";
import { JsonLd } from "@/components/seo/json-ld";
import {
  buildAreaMetaDescription,
  buildAreaMetaTitle,
  getAllDeliveryAreas,
  getDeliveryAreaBySlug,
  getAreaFaqs,
} from "@/lib/areas";
import { createMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  deliveryServiceSchema,
  faqPageSchema,
} from "@/lib/schema";
import { absoluteUrl } from "@/lib/site-url";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ area: string }>;
}

export async function generateStaticParams() {
  return getAllDeliveryAreas().map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { area: slug } = await params;
  const area = getDeliveryAreaBySlug(slug);
  if (!area) return {};

  return createMetadata({
    title: buildAreaMetaTitle(area),
    description: buildAreaMetaDescription(area),
    path: `/delivery/${area.slug}/`,
    keywords: [
      `water delivery ${area.name}`,
      `19L water delivery ${area.name}`,
      `mineral water ${area.region}`,
      "Everdrop water",
    ],
    image: "/og/default.jpg",
  });
}

export default async function DeliveryAreaPage({ params }: PageProps) {
  const { area: slug } = await params;
  const area = getDeliveryAreaBySlug(slug);
  if (!area) notFound();

  const faqs = getAreaFaqs(area);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Delivery", url: absoluteUrl("/delivery/") },
            { name: area.name, url: absoluteUrl(`/delivery/${area.slug}/`) },
          ]),
          faqPageSchema(faqs),
          deliveryServiceSchema(area.name, area.region),
        ]}
      />
      <DeliveryAreaTemplate area={area} />
    </>
  );
}
