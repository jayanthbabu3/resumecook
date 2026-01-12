import React from "react";
import { Button } from "@/components/ui/button";
import { GripVertical, Copy, Lock, Trash2, Maximize2 } from "lucide-react";
import type { GridBasedSection } from "../../types/gridBuilder";

interface SectionControlsProps {
  section: GridBasedSection;
  onOpenWidth: () => void;
  onDuplicate?: () => void;
  onToggleLock?: () => void;
  onDelete?: () => void;
}

export const SectionControls: React.FC<SectionControlsProps> = ({
  section,
  onOpenWidth,
  onDuplicate,
  onToggleLock,
  onDelete,
}) => {
  return (
    <div className="absolute -top-9 left-0 right-0 h-8 flex items-center justify-between px-2 rounded-t-md border border-border/60 bg-background/95 shadow-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-20">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {/* Drag handle - used by react-grid-layout via draggableHandle */}
        <GripVertical className="h-3.5 w-3.5 cursor-move grid-drag-handle" />
        <span className="font-medium capitalize">{section.type}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          type="button"
          onClick={onOpenWidth}
          aria-label="Width"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </Button>
        {onDuplicate && (
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            type="button"
            onClick={onDuplicate}
            aria-label="Duplicate"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        )}
        {onToggleLock && (
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            type="button"
            onClick={onToggleLock}
            aria-label={section.constraints?.locked ? "Unlock" : "Lock"}
          >
            <Lock className="h-3.5 w-3.5" />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            type="button"
            onClick={onDelete}
            aria-label="Delete"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
};


