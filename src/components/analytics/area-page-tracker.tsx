"use client";

import { useEffect } from "react";
import { trackAreaPageView } from "@/lib/analytics";

interface AreaPageTrackerProps {
  areaSlug: string;
  areaName: string;
}

export function AreaPageTracker({ areaSlug, areaName }: AreaPageTrackerProps) {
  useEffect(() => {
    trackAreaPageView(areaSlug, areaName);
  }, [areaSlug, areaName]);

  return null;
}
