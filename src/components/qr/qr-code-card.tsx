"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QrCodeCardProps {
  url: string;
  label?: string;
  size?: number;
  mobileSize?: number;
  downloadFileName?: string;
  className?: string;
  showDownload?: boolean;
  downloadLabel?: string;
  caption?: string;
}

function useIsLgUp() {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(min-width: 1024px)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => true
  );
}

export function QrCodeCard({
  url,
  label = "Scan to connect with Everdrop",
  size = 168,
  mobileSize,
  downloadFileName = "everdrop-connect-qr.png",
  className,
  showDownload = true,
  downloadLabel = "Download QR Code",
  caption,
}: QrCodeCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const isLgUp = useIsLgUp();
  const renderedSize = mobileSize != null && !isLgUp ? mobileSize : size;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    QRCode.toCanvas(canvas, url, {
      width: renderedSize,
      margin: 2,
      color: {
        dark: "#023047",
        light: "#ffffff",
      },
    })
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url, renderedSize]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = downloadFileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className={cn("flex flex-col items-start gap-4", className)}>
      <div className="rounded-2xl bg-white p-3 shadow-lg ring-1 ring-black/5">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={label}
          className="block size-auto max-w-full"
        />
      </div>

      {caption ? (
        <p className="max-w-[12rem] text-sm leading-snug text-inherit opacity-90">{caption}</p>
      ) : null}

      {showDownload ? (
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={!ready}
          onClick={handleDownload}
          className="min-h-11 cursor-pointer border-white/50 bg-white/10 text-inherit hover:bg-white/20 hover:text-inherit"
        >
          <Download data-icon="inline-start" />
          {downloadLabel}
        </Button>
      ) : null}
    </div>
  );
}
