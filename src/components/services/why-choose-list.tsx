import { Check } from "lucide-react";
import { BatchReveal } from "@/components/animations";

interface WhyChooseListProps {
  items: string[];
}

export function WhyChooseList({ items }: WhyChooseListProps) {
  return (
    <BatchReveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item}
          className="batch-item glass-card flex list-none items-start gap-3 rounded-2xl p-5"
        >
          <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </BatchReveal>
  );
}
