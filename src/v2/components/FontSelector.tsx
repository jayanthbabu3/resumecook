/**
 * Font Selector Component
 *
 * Elegant dropdown for selecting professional resume fonts.
 * Features live preview of each font option.
 */

import React, { useState } from 'react';
import { Check, ChevronDown, Type } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export interface FontOption {
  id: string;
  name: string;
  family: string;
  category: 'sans-serif' | 'serif';
  description: string;
}

export const RESUME_FONTS: FontOption[] = [
  {
    id: 'inter',
    name: 'Inter',
    family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'sans-serif',
    description: 'Modern, clean, highly readable',
  },
  {
    id: 'lato',
    name: 'Lato',
    family: "'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'sans-serif',
    description: 'Professional, friendly, widely used',
  },
  {
    id: 'roboto',
    name: 'Roboto',
    family: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    category: 'sans-serif',
    description: 'Clean, modern, excellent legibility',
  },
  {
    id: 'open-sans',
    name: 'Open Sans',
    family: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'sans-serif',
    description: 'Humanist, professional, very readable',
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'sans-serif',
    description: 'Geometric, modern, strong personality',
  },
  {
    id: 'raleway',
    name: 'Raleway',
    family: "'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'sans-serif',
    description: 'Elegant, sophisticated, unique',
  },
  {
    id: 'nunito',
    name: 'Nunito',
    family: "'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'sans-serif',
    description: 'Rounded, friendly yet professional',
  },
  {
    id: 'work-sans',
    name: 'Work Sans',
    family: "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'sans-serif',
    description: 'Optimized for screen, clean',
  },
  {
    id: 'poppins',
    name: 'Poppins',
    family: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    category: 'sans-serif',
    description: 'Geometric, modern, unique',
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    family: "'Merriweather', Georgia, 'Times New Roman', serif",
    category: 'serif',
    description: 'Traditional, professional serif',
  },
];

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (fontFamily: string) => void;
  className?: string;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  onFontChange,
  className,
}) => {
  const [open, setOpen] = useState(false);

  // Find the current font option
  const currentFont = RESUME_FONTS.find(
    font => font.family === selectedFont
  ) || RESUME_FONTS[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-9 px-3 border-border/60 hover:border-border hover:bg-transparent transition-all",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <Type className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span className="text-sm font-medium" style={{ fontFamily: currentFont.family }}>
              {currentFont.name}
            </span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0 shadow-xl border-border/50" align="start">
        <div className="py-1 max-h-[360px] overflow-y-auto">
          {RESUME_FONTS.map((font) => {
            const isSelected = font.family === selectedFont;
            return (
              <button
                key={font.id}
                onClick={() => {
                  onFontChange(font.family);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left px-2.5 py-2 hover:bg-accent/50 transition-all duration-200 flex items-center gap-2 group relative",
                  isSelected && "bg-primary/8"
                )}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary rounded-r-full" />
                )}
                <div className="flex-1 min-w-0 ml-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[13px] font-medium text-foreground leading-tight"
                      style={{ fontFamily: font.family }}
                    >
                      {font.name}
                    </span>
                    {isSelected && (
                      <Check className="h-3 w-3 text-primary flex-shrink-0" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FontSelector;
