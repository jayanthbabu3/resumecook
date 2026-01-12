import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Maximize2 } from "lucide-react";

interface WidthControlProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (span: number) => void;
}

const PRESETS: { label: string; span: number }[] = [
  { label: "Full", span: 12 },
  { label: "Wide", span: 10 },
  { label: "Normal", span: 8 },
  { label: "Half", span: 6 },
  { label: "Third", span: 4 },
];

export const WidthControl: React.FC<WidthControlProps> = ({ value, min = 4, max = 12, onChange }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          type="button"
          aria-label="Width"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 space-y-3" align="end">
        <div className="text-xs font-medium text-muted-foreground mb-1">
          Section width ({value} / 12 columns)
        </div>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset) => (
            <Button
              key={preset.label}
              variant={preset.span === value ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs justify-start"
              type="button"
              onClick={() => {
                onChange(preset.span);
                setOpen(false);
              }}
            >
              {preset.label}
            </Button>
          ))}
        </div>
        <div className="pt-1">
          <Slider
            min={min}
            max={max}
            step={1}
            value={[value]}
            onValueChange={([span]) => onChange(span)}
          />
          <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
            <span>Custom</span>
            <span>{value} columns</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};


