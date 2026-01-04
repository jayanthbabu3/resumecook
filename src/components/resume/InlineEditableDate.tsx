import { useState, useRef, useEffect } from "react";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface InlineEditableDateProps {
  path?: string;
  field?: string; // legacy prop name
  value?: string;
  date?: string; // legacy prop name
  className?: string;
  placeholder?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  formatDisplay?: (date: string) => string;
  editable?: boolean;
}

export const InlineEditableDate = ({
  path,
  field,
  value,
  date,
  className,
  placeholder = "Select date",
  as: Component = "span",
  style,
  formatDisplay,
  editable = true,
}: InlineEditableDateProps) => {
  const resolvedPath = (path ?? field)?.replace(/^resumeData\./, "");
  const resolvedValue = value ?? date ?? "";
  const canEdit = editable && Boolean(resolvedPath);
  const { updateField } = useInlineEdit();

  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse value to get current year for picker
  const parseValue = () => {
    if (!resolvedValue) return { month: null, year: new Date().getFullYear() };
    const parts = resolvedValue.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    return {
      month: isNaN(month) ? null : month,
      year: isNaN(year) ? new Date().getFullYear() : year,
    };
  };

  const { month: selectedMonth, year: selectedYear } = parseValue();
  const [viewYear, setViewYear] = useState(selectedYear || new Date().getFullYear());

  // Sync viewYear when value changes
  useEffect(() => {
    if (selectedYear !== null) {
      setViewYear(selectedYear);
    }
  }, [selectedYear]);

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

  const handleMonthSelect = (monthIndex: number) => {
    const newValue = `${viewYear}-${String(monthIndex + 1).padStart(2, '0')}`;
    if (resolvedPath) {
      updateField(resolvedPath, newValue);
    }
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (resolvedPath) {
      updateField(resolvedPath, '');
    }
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!canEdit) return;
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const displayValue = formatDisplay ? formatDisplay(resolvedValue) : resolvedValue;

  // Format display value if not using custom formatter
  const getDisplayText = () => {
    if (!resolvedValue) return placeholder;
    if (formatDisplay) return formatDisplay(resolvedValue);
    if (selectedMonth !== null && selectedYear !== null) {
      return `${MONTHS[selectedMonth]} ${selectedYear}`;
    }
    return placeholder;
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Display Text */}
      <Component
        onClick={handleClick}
        onMouseEnter={() => canEdit && setIsFocused(true)}
        onMouseLeave={() => canEdit && setIsFocused(false)}
        className={cn(
          canEdit ? "cursor-pointer" : "cursor-default",
          "transition-all rounded px-1 inline-flex items-center gap-1",
          canEdit && isFocused && "bg-blue-50 outline outline-1 outline-blue-300",
          canEdit && isOpen && "bg-blue-50 outline outline-2 outline-blue-400",
          !resolvedValue && "text-gray-400 italic",
          className
        )}
        style={style}
        title={canEdit ? "Click to edit date" : undefined}
      >
        {getDisplayText()}
      </Component>

      {/* Inline Picker Dropdown */}
      {canEdit && isOpen && (
        <div
          className="absolute z-50 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150"
          style={{ minWidth: '260px', left: '50%', transform: 'translateX(-50%)' }}
        >
          {/* Year Navigation */}
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setViewYear(v => v - 1); }}
              className="p-1 hover:bg-white rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <span className="text-sm font-semibold text-gray-700">{viewYear}</span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setViewYear(v => v + 1); }}
              className="p-1 hover:bg-white rounded transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Month Grid */}
          <div className="p-2">
            <div className="grid grid-cols-4 gap-1">
              {MONTHS.map((month, index) => {
                const isSelected = selectedMonth === index && selectedYear === viewYear;
                const isCurrent = new Date().getMonth() === index && new Date().getFullYear() === viewYear;

                return (
                  <button
                    key={month}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleMonthSelect(index); }}
                    className={cn(
                      "py-2 px-1.5 text-xs font-medium rounded-lg transition-all",
                      isSelected
                        ? "bg-blue-600 text-white"
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
              onClick={handleClear}
              className="text-[10px] font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const now = new Date();
                const newValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
                if (resolvedPath) {
                  updateField(resolvedPath, newValue);
                }
                setIsOpen(false);
              }}
              className="text-[10px] font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              This month
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
