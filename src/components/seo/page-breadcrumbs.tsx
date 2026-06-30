import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden>/</span>}
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors duration-200 hover:text-primary cursor-pointer">
                  {item.name}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-foreground" : undefined} aria-current={isLast ? "page" : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
