import { Fragment, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { templateMetaMap } from "@/constants/templateMeta";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  className?: string;
  extraItems?: BreadcrumbItem[];
  items?: BreadcrumbItem[];
}

export const Breadcrumbs = ({ className, extraItems, items: itemsOverride }: BreadcrumbsProps) => {
  const location = useLocation();

  const baseItems = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return [];

    let currentPath = "";
    const crumbs: Array<{ label: string; path?: string }> = [];

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      let label: string;
      let overridePath: string | undefined | null;

      if (segment === "editor") {
        label = "Templates";
        const templateId = segments[index + 1];
        const categorySlug = templateId ? templateMetaMap[templateId]?.categorySlug : undefined;
        const slug = categorySlug || "software";
        overridePath = `/dashboard?focus=templates&category=${slug}`;
      } else {
        label = templateMetaMap[segment]?.name
          ?? segment
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");
        overridePath = undefined;
      }

      const resolvedPath = overridePath === undefined ? currentPath : overridePath;

      crumbs.push({ label, path: isLast ? undefined : resolvedPath || undefined });
    });

    return crumbs;
  }, [location.pathname]);

  const items = useMemo(() => {
    if (itemsOverride?.length) {
      return itemsOverride;
    }

    if (!extraItems?.length) {
      return baseItems;
    }

    const updatedBase = baseItems.length
      ? baseItems.map((item, index) =>
          index === baseItems.length - 1
            ? { ...item, path: item.path ?? location.pathname }
            : item
        )
      : [];

    return [...updatedBase, ...extraItems];
  }, [baseItems, extraItems, itemsOverride, location.pathname]);

  if (items.length === 0) return null;

  return (
    <nav className={cn("flex items-center text-xs sm:text-sm text-muted-foreground gap-1", className)} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <Fragment key={`${item.label}-${index}`}>
          {index > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
          {item.path ? (
            <Link to={item.path} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
};
