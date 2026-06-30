import Link from "next/link";
import { getAllDeliveryAreas } from "@/lib/areas";
import type { DeliveryAreaRecord } from "@/lib/types";

interface AreaBadgeLinkProps {
  area: DeliveryAreaRecord;
}

export function AreaBadgeLink({ area }: AreaBadgeLinkProps) {
  return (
    <Link
      href={`/delivery/${area.slug}/`}
      className="inline-flex min-h-11 items-center rounded-full border border-transparent bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors duration-200 hover:border-primary/30 hover:bg-primary/10 hover:text-primary cursor-pointer"
    >
      {area.name}
    </Link>
  );
}

export function getAreaRecord(name: string, region: string): DeliveryAreaRecord | undefined {
  return getAllDeliveryAreas().find((area) => area.name === name && area.region === region);
}
