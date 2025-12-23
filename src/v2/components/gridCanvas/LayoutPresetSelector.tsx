import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GRID_LAYOUT_PRESETS, type GridLayoutPresetId } from "../../config/gridLayouts";

interface LayoutPresetSelectorProps {
  selectedLayoutId?: GridLayoutPresetId;
  onSelectLayout: (id: GridLayoutPresetId) => void;
}

export const LayoutPresetSelector: React.FC<LayoutPresetSelectorProps> = ({
  selectedLayoutId,
  onSelectLayout,
}) => {
  const current = GRID_LAYOUT_PRESETS.find((preset) => preset.id === selectedLayoutId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <span className="hidden sm:inline text-xs">
            Layout: {current ? current.name : "Select"}
          </span>
          <span className="sm:hidden text-xs">Layout</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {GRID_LAYOUT_PRESETS.map((preset) => (
          <DropdownMenuItem
            key={preset.id}
            className="flex flex-col items-start gap-0.5 py-2"
            onClick={() => onSelectLayout(preset.id)}
          >
            <span className="text-xs font-medium text-foreground">{preset.name}</span>
            <span className="text-[11px] text-muted-foreground line-clamp-2">
              {preset.description}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


