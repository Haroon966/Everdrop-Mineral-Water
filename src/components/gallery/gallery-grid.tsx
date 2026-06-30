import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { GalleryImage } from "@/lib/types";

interface GalleryGridProps {
  images: GalleryImage[];
  limit?: number;
}

export function GalleryGrid({ images, limit }: GalleryGridProps) {
  const display = limit ? images.slice(0, limit) : images;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {display.map((image) => (
        <Card
          key={image.src}
          className="gallery-item group cursor-default overflow-hidden border-border/80 bg-card p-0 shadow-sm transition-colors duration-200 hover:border-primary/40 dark:bg-[#03045e]/85"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-opacity duration-200 group-hover:opacity-90"
              sizes="(max-width:768px) 100vw, 33vw"
            />
          </div>
          <CardContent className="py-4">
            <p className="text-sm font-medium text-foreground">{image.caption}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
