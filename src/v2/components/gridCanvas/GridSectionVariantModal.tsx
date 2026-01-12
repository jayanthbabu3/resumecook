import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { V2SectionType } from "../../types/resumeData";
import { getSectionDefinition } from "../../registry/sectionRegistry";

interface GridSectionVariantModalProps {
  open: boolean;
  sectionType: V2SectionType | null;
  onClose: () => void;
  onSelectVariant: (variantId: string) => void;
}

export const GridSectionVariantModal: React.FC<GridSectionVariantModalProps> = ({
  open,
  sectionType,
  onClose,
  onSelectVariant,
}) => {
  if (!sectionType) return null;

  const definition = getSectionDefinition(sectionType);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-sm">
            Choose a variant for <span className="font-semibold">{definition.defaultTitle}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {definition.variants.map((variant) => (
            <Button
              key={variant.id}
              variant="outline"
              type="button"
              className="h-auto py-3 px-3 flex flex-col items-start gap-1.5 text-left"
              onClick={() => onSelectVariant(variant.id)}
            >
              <span className="text-xs font-semibold text-foreground">{variant.name}</span>
              <span className="text-[11px] text-muted-foreground line-clamp-2">
                {variant.description}
              </span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};


