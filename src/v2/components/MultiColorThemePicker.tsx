/**
 * Multi-Color Theme Picker Component
 * 
 * Displays 1-2 color pickers based on template's color slots.
 * Shows only color circles for intuitive visual feedback.
 * Maximum 2 colors: Primary (accent) + Secondary (sidebar/background)
 */

import React from 'react';
import type { ColorSlot } from '../types';
import { cn } from '@/lib/utils';

interface MultiColorThemePickerProps {
  /** Color slots defined by the template (max 2) */
  colorSlots: ColorSlot[];
  /** Current color values */
  colors: {
    primary?: string;
    secondary?: string;
  };
  /** Callback when colors change */
  onColorsChange: (colors: { primary?: string; secondary?: string }) => void;
  /** Compact mode - just circles */
  compact?: boolean;
}

export const MultiColorThemePicker: React.FC<MultiColorThemePickerProps> = ({
  colorSlots,
  colors,
  onColorsChange,
  compact = false,
}) => {
  // Limit to max 2 color slots
  const limitedSlots = colorSlots.slice(0, 2);
  
  const handleColorChange = (slotName: 'primary' | 'secondary', color: string) => {
    onColorsChange({
      ...colors,
      [slotName]: color,
    });
  };

  // Both modes now show just color circles (no labels in header)
  return (
    <div className={cn("flex items-center", compact ? "gap-1.5" : "gap-2")}>
      {limitedSlots.map((slot) => (
        <div key={slot.name} className="relative group">
          <label className="block cursor-pointer">
            <input
              type="color"
              value={colors[slot.name as 'primary' | 'secondary'] || slot.defaultColor}
              onChange={(e) => handleColorChange(slot.name as 'primary' | 'secondary', e.target.value)}
              className="sr-only"
            />
            <div 
              className={cn(
                "rounded-full cursor-pointer border-2 border-white shadow-md hover:scale-110 transition-all hover:shadow-lg",
                compact ? "w-7 h-7" : "w-8 h-8"
              )}
              style={{ backgroundColor: colors[slot.name as 'primary' | 'secondary'] || slot.defaultColor }}
            />
          </label>
          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            {slot.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultiColorThemePicker;
