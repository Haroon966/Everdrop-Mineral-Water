"use client";

import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

export function WhatsAppFab() {
  return (
    <Link
      href="https://wa.me/923006096599"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="whatsapp-fab fab-pulse fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-50 flex size-14 items-center justify-center rounded-full cursor-pointer max-lg:bottom-20 lg:bottom-6 lg:right-6"
    >
      <WhatsAppIcon className="size-8" />
    </Link>
  );
}
