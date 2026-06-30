import type { ComponentPropsWithoutRef } from "react";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

type WhatsAppIconProps = ComponentPropsWithoutRef<"img">;

export function WhatsAppIcon({ className, alt = "", ...props }: WhatsAppIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBasePath("/whatsapp-icon.png")}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      className={cn("size-6 shrink-0 object-contain", className)}
      {...props}
    />
  );
}
