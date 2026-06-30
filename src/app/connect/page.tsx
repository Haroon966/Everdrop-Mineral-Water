import type { Metadata } from "next";
import { ConnectLinks } from "@/components/connect/connect-links";
import { createMetadata } from "@/lib/metadata";
import { CONNECT_PAGE_PATH } from "@/lib/connect-url";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Connect with Everdrop",
    description:
      "All Everdrop links in one place — WhatsApp ordering, phone, email, social media, products, and delivery areas.",
    path: CONNECT_PAGE_PATH,
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConnectPage() {
  return (
    <section className="water-gradient min-h-[calc(100vh-6rem)] py-12 md:py-16">
      <ConnectLinks />
    </section>
  );
}
