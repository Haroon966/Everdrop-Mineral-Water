interface MapEmbedProps {
  className?: string;
}

export function MapEmbed({ className }: MapEmbedProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border ${className ?? ""}`}>
      <iframe
        title="Everdrop location — F11/1, Islamabad"
        src="https://maps.google.com/maps?q=F11%2F1%20Islamabad%20Pakistan&output=embed"
        className="h-[40vh] w-full border-0 max-lg:h-[45vh] lg:h-[50vh]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
