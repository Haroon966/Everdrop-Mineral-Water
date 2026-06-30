import Image from "next/image";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  priority?: boolean;
}

export function SiteLogo({ className, priority }: SiteLogoProps) {
  return (
    <Image
      src="/everdrop-logo.png"
      alt="Everdrop Pure Mineral Water"
      width={903}
      height={903}
      priority={priority}
      className={cn("h-9 w-auto object-contain", className)}
    />
  );
}
