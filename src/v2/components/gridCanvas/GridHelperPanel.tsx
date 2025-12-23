import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllSections } from "../../registry/sectionRegistry";
import type { V2SectionType } from "../../types/resumeData";
import type { VariantDefinition } from "../../registry/sectionRegistry";

interface GridHelperPanelProps {
  onSectionClick: (sectionType: V2SectionType) => void;
}

export const GridHelperPanel: React.FC<GridHelperPanelProps> = ({ onSectionClick }) => {
  const sections = React.useMemo(() => getAllSections(), []);

  return (
    <Card className="h-full border-border/60 shadow-sm">
      <div className="p-3 border-b border-border/40">
        <h2 className="text-xs font-semibold text-foreground">Sections</h2>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Click a section to add it to the grid.
        </p>
      </div>
      <ScrollArea className="h-[520px]">
        <div className="p-2 space-y-2">
          {sections.map((section) => (
            <button
              key={section.type}
              type="button"
              className="w-full text-left px-2.5 py-2 rounded-md border border-border/30 bg-card hover:bg-accent hover:border-primary/40 transition-colors text-xs flex items-center justify-between gap-2"
              onClick={() => onSectionClick(section.type)}
            >
              <span className="font-medium text-foreground truncate">{section.defaultTitle}</span>
              <span className="text-[10px] text-muted-foreground shrink-0">
                {section.variants.length} variants
              </span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};


