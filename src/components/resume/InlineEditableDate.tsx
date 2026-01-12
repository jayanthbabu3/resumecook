import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

interface DropdownPosition {
  top: number;
  left: number;
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
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Use a wrapper span that we control, since dynamic Component doesn't forward refs
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track mount state for SSR safety
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

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

  // Calculate dropdown position using fixed positioning (viewport-relative)
  const updatePosition = useCallback(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const dropdownWidth = 260;
    const dropdownHeight = 280;

    // Calculate centered position relative to viewport (fixed positioning)
    let left = rect.left + rect.width / 2 - dropdownWidth / 2;
    let top = rect.bottom + 4;

    // Ensure dropdown stays within viewport horizontally
    if (left < 10) left = 10;
    if (left + dropdownWidth > window.innerWidth - 10) {
      left = window.innerWidth - dropdownWidth - 10;
    }

    // If dropdown would go below viewport, show it above the trigger
    if (top + dropdownHeight > window.innerHeight - 10) {
      top = rect.top - dropdownHeight - 4;
      if (top < 10) top = 10;
    }

    setDropdownPosition({ top, left });
  }, []);

  // Update position when opening and on scroll/resize
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    // Initial position calculation
    updatePosition();

    const handleScrollOrResize = () => updatePosition();

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen, isMounted, updatePosition]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideWrapper = !wrapperRef.current?.contains(target);
      const isOutsideDropdown = !dropdownRef.current?.contains(target);

      if (isOutsideWrapper && isOutsideDropdown) {
        setIsOpen(false);
      }
    };

    // Small delay to prevent immediate close on the click that opened it
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
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
    e.preventDefault();
    if (resolvedPath) {
      updateField(resolvedPath, '');
    }
    setIsOpen(false);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    if (!canEdit) return;
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(prev => !prev);
  };

  const getDisplayText = () => {
    if (!resolvedValue) return placeholder;
    if (formatDisplay) return formatDisplay(resolvedValue);
    if (selectedMonth !== null && selectedYear !== null) {
      return `${MONTHS[selectedMonth]} ${selectedYear}`;
    }
    return placeholder;
  };

  // Render the dropdown via portal to document.body
  const renderDropdown = () => {
    if (!canEdit || !isOpen || !isMounted) return null;

    return createPortal(
      <div
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          minWidth: '260px',
          zIndex: 999999,
        }}
        className="bg-white rounded-xl border border-gray-200 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Year Navigation */}
        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100 rounded-t-xl">
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); setViewYear(v => v - 1); }}
            className="p-1 hover:bg-white rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-sm font-semibold text-gray-700">{viewYear}</span>
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); setViewYear(v => v + 1); }}
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
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleMonthSelect(index); }}
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
        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-t border-gray-100 rounded-b-xl">
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={handleClear}
            className="text-[10px] font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
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
      </div>,
      document.body
    );
  };

  return (
    <span
      ref={wrapperRef}
      onClick={handleTriggerClick}
      onMouseEnter={() => canEdit && setIsFocused(true)}
      onMouseLeave={() => canEdit && setIsFocused(false)}
      style={{ display: 'inline' }}
    >
      <Component
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
      {renderDropdown()}
    </span>
  );
};
