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

interface MonthYearPickerProps {
  value?: string; // Format: "YYYY-MM" or "YYYY-MM-DD"
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  allowClear?: boolean;
  minYear?: number;
  maxYear?: number;
  displayFormat?: 'short' | 'long'; // "Jan 2024" vs "January 2024"
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => {
    if (value) {
      const year = parseInt(value.split('-')[0]);
      return isNaN(year) ? new Date().getFullYear() : year;
    }
    return new Date().getFullYear();
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse current value
  const parseValue = () => {
    if (!value) return { month: null, year: null };
    const parts = value.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // 0-indexed
    return {
      month: isNaN(month) ? null : month,
      year: isNaN(year) ? null : year,
    };
  };

  const { month: selectedMonth, year: selectedYear } = parseValue();

  // Format display value
  const formatDisplayValue = () => {
    if (selectedMonth === null || selectedYear === null) return '';
    const monthNames = displayFormat === 'long' ? MONTHS_FULL : MONTHS;
    return `${monthNames[selectedMonth]} ${selectedYear}`;
  };

  // Handle month selection
  const handleMonthSelect = (monthIndex: number) => {
    const newValue = `${viewYear}-${String(monthIndex + 1).padStart(2, '0')}`;
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

  const displayValue = formatDisplayValue();

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm",
          "border rounded-lg bg-white transition-all duration-150",
          "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
          disabled && "opacity-50 cursor-not-allowed bg-gray-50",
          isOpen && "border-blue-500 ring-2 ring-blue-500/20",
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
        <div className="absolute z-50 mt-1 w-full min-w-[280px] bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
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
                        ? "bg-blue-600 text-white shadow-sm"
                        : isCurrent
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
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
                const newValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
                onChange(newValue);
                setIsOpen(false);
              }}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
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
