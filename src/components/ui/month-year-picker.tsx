/**
 * Month Year Picker Component
 *
 * A clean, user-friendly date picker for selecting month and year.
 * Perfect for resume dates like employment periods, education dates, etc.
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const MONTHS_FULL = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Parse value - supports "Mon YYYY", "YYYY-MM", and "YYYY" formats
const parseValueStatic = (value?: string): { month: number | null; year: number | null } => {
  if (!value) return { month: null, year: null };

  // Try "Mon YYYY" format first (e.g., "Jan 2024", "January 2024")
  const displayMatch = value.match(/^([A-Za-z]+)\s*(\d{4})$/);
  if (displayMatch) {
    const monthStr = displayMatch[1].toLowerCase();
    let monthIndex = MONTHS.findIndex(m => m.toLowerCase() === monthStr.slice(0, 3));
    if (monthIndex === -1) {
      monthIndex = MONTHS_FULL.findIndex(m => m.toLowerCase() === monthStr);
    }
    if (monthIndex !== -1) {
      return { month: monthIndex, year: parseInt(displayMatch[2]) };
    }
  }

  // Try "YYYY-MM" format (e.g., "2024-01")
  const isoMatch = value.match(/^(\d{4})-(\d{2})$/);
  if (isoMatch) {
    const month = parseInt(isoMatch[2]) - 1;
    const year = parseInt(isoMatch[1]);
    if (month >= 0 && month < 12) {
      return { month, year };
    }
  }

  // Try year-only format (e.g., "2024") - default to January
  const yearOnlyMatch = value.match(/^(\d{4})$/);
  if (yearOnlyMatch) {
    return { month: 0, year: parseInt(yearOnlyMatch[1]) };
  }

  return { month: null, year: null };
};

interface MonthYearPickerProps {
  value?: string; // Format: "Mon YYYY" (e.g., "Jan 2024") or "YYYY-MM"
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  allowClear?: boolean;
  minYear?: number;
  maxYear?: number;
  displayFormat?: 'short' | 'long'; // "Jan 2024" vs "January 2024"
  outputFormat?: 'display' | 'iso'; // "Jan 2024" vs "2024-01"
  id?: string;
}

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  className,
  allowClear = true,
  minYear = 1970,
  maxYear = new Date().getFullYear() + 10,
  displayFormat = 'short',
  outputFormat = 'display',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAbove, setOpenAbove] = useState(false);
  const [viewYear, setViewYear] = useState(() => {
    const parsed = parseValueStatic(value);
    return parsed.year ?? new Date().getFullYear();
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Parse current value - supports both "Mon YYYY" and "YYYY-MM" formats
  const parseValue = () => parseValueStatic(value);

  const { month: selectedMonth, year: selectedYear } = parseValue();

  // Format display value
  const formatDisplayValue = () => {
    if (selectedMonth === null || selectedYear === null) return '';
    const monthNames = displayFormat === 'long' ? MONTHS_FULL : MONTHS;
    return `${monthNames[selectedMonth]} ${selectedYear}`;
  };

  // Handle month selection
  const handleMonthSelect = (monthIndex: number) => {
    let newValue: string;
    if (outputFormat === 'iso') {
      newValue = `${viewYear}-${String(monthIndex + 1).padStart(2, '0')}`;
    } else {
      // Display format: "Jan 2024"
      newValue = `${MONTHS[monthIndex]} ${viewYear}`;
    }
    onChange(newValue);
    setIsOpen(false);
  };

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Sync viewYear when value changes
  useEffect(() => {
    if (selectedYear !== null) {
      setViewYear(selectedYear);
    }
  }, [selectedYear]);

  // Calculate if dropdown should open above or below
  const handleOpen = () => {
    if (disabled) return;

    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 320; // Approximate height of dropdown

      // Open above if not enough space below
      setOpenAbove(spaceBelow < dropdownHeight && rect.top > dropdownHeight);
    }

    setIsOpen(!isOpen);
  };

  const displayValue = formatDisplayValue();

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        id={id}
        onClick={handleOpen}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm",
          "border rounded-lg bg-white transition-all duration-150",
          "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
          disabled && "opacity-50 cursor-not-allowed bg-gray-50",
          isOpen && "border-primary ring-2 ring-primary/20",
          !isOpen && "border-gray-200"
        )}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className={cn(
            "truncate",
            displayValue ? "text-gray-900" : "text-gray-400"
          )}>
            {displayValue || placeholder}
          </span>
        </div>

        {allowClear && displayValue && !disabled ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-0.5 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
          </button>
        ) : (
          <ChevronRight className={cn(
            "w-4 h-4 text-gray-400 transition-transform",
            isOpen && "rotate-90"
          )} />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className={cn(
          "absolute z-50 w-full min-w-[280px] bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150",
          openAbove ? "bottom-full mb-1" : "top-full mt-1"
        )}>
          {/* Year Navigation */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50 border-b border-gray-100">
            <button
              type="button"
              onClick={() => setViewYear(v => Math.max(minYear, v - 1))}
              disabled={viewYear <= minYear}
              className="p-1.5 hover:bg-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewYear(v => Math.max(minYear, v - 1))}
                className="px-2 py-1 text-sm font-semibold text-gray-700 hover:bg-white rounded transition-colors"
              >
                {viewYear}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setViewYear(v => Math.min(maxYear, v + 1))}
              disabled={viewYear >= maxYear}
              className="p-1.5 hover:bg-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Month Grid */}
          <div className="p-3">
            <div className="grid grid-cols-4 gap-1.5">
              {MONTHS.map((month, index) => {
                const isSelected = selectedMonth === index && selectedYear === viewYear;
                const isCurrent = new Date().getMonth() === index && new Date().getFullYear() === viewYear;

                return (
                  <button
                    key={month}
                    type="button"
                    onClick={() => handleMonthSelect(index)}
                    className={cn(
                      "py-2.5 px-2 text-sm font-medium rounded-lg transition-all duration-150",
                      isSelected
                        ? "bg-primary text-white shadow-sm"
                        : isCurrent
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {month}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                let newValue: string;
                if (outputFormat === 'iso') {
                  newValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
                } else {
                  newValue = `${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
                }
                onChange(newValue);
                setIsOpen(false);
              }}
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              This month
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthYearPicker;
