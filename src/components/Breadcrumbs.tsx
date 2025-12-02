import { Fragment, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { templateMetaMap } from "@/constants/templateMeta";
import { getCategoryById } from "@/constants/professionCategories";

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

    // Track if we're in a nested dashboard route
    const isDashboardRoute = segments[0] === "dashboard";
    const professionIdIndex = isDashboardRoute && segments.length > 1 ? 1 : -1;
    const editorIndex = segments.indexOf("editor");
    const liveEditorIndex = segments.indexOf("live-editor");
    const isNestedEditor = isDashboardRoute && (editorIndex > 1 || liveEditorIndex > 1);

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      let label: string;
      let overridePath: string | undefined | null;
      let skipSegment = false;

      // Handle different segment types
      if (segment === "dashboard") {
        label = "Dashboard";
        overridePath = "/dashboard";
      } else if (index === professionIdIndex) {
        // This is a profession ID in /dashboard/:professionId
        const category = getCategoryById(segment);
        label = category?.name || segment
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ");
        overridePath = `/dashboard/${segment}`;
      } else if (segment === "editor" || segment === "live-editor") {
        // Skip the "editor" or "live-editor" segment itself
        skipSegment = true;
      } else if ((index === editorIndex + 1 || index === liveEditorIndex + 1) && index > 0) {
        // This is a template ID after editor/live-editor
        const templateMeta = templateMetaMap[segment];
        label = templateMeta?.name || segment;

        // For old routes (/editor/:templateId), link back to profession templates
        // For new routes (/dashboard/:professionId/editor/:templateId), don't override
        if (!isNestedEditor && templateMeta?.categorySlug) {
          overridePath = null; // Current path for template
        } else {
          overridePath = undefined; // Use default behavior
        }
      } else {
        // Default handling for other segments
        label = templateMetaMap[segment]?.name
          ?? segment
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");
        overridePath = undefined;
      }

      if (!skipSegment) {
        const resolvedPath = overridePath === undefined ? currentPath : overridePath;
        crumbs.push({ label, path: isLast ? undefined : resolvedPath || undefined });
      }
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
