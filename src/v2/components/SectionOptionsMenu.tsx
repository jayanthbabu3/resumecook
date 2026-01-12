/**
 * Section Options Menu Component
 *
 * Dropdown menu for section-level actions: delete, change variant, move to column.
 */

import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2, Palette, ArrowRight, Check } from 'lucide-react';

interface VariantOption {
  id: string;
  name: string;
  description: string;
}

interface SectionOptionsMenuProps {
  sectionId: string;
  sectionType: string;
  currentVariant?: string;
  variants?: VariantOption[];
  onDelete?: () => void;
  onChangeVariant?: (variantId: string) => void;
  onMoveToColumn?: (column: 'main' | 'sidebar') => void;
  currentColumn?: 'main' | 'sidebar';
  showColumnOption?: boolean;
  themeColor?: string;
}

export const SectionOptionsMenu: React.FC<SectionOptionsMenuProps> = ({
  sectionId,
  sectionType,
  currentVariant,
  variants = [],
  onDelete,
  onChangeVariant,
  onMoveToColumn,
  currentColumn,
  showColumnOption = false,
  themeColor = '#0891b2',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showVariants, setShowVariants] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowVariants(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleVariantChange = (variantId: string) => {
    onChangeVariant?.(variantId);
    setIsOpen(false);
    setShowVariants(false);
  };

  const handleDelete = () => {
    onDelete?.();
    setIsOpen(false);
  };

  const handleMoveToColumn = (column: 'main' | 'sidebar') => {
    onMoveToColumn?.(column);
    setIsOpen(false);
  };

  // Don't show menu if there are no actions available
  const hasActions = onDelete || (onChangeVariant && variants.length > 0) || (onMoveToColumn && showColumnOption);
  if (!hasActions) return null;

  return (
    <div ref={menuRef} className="relative print:hidden">
      {/* Trigger Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
          setShowVariants(false);
        }}
        className="p-1.5 rounded-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
        title="Section options"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
          style={{ minWidth: '180px' }}
        >
          {/* Change Variant Option */}
          {onChangeVariant && variants.length > 0 && (
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVariants(!showVariants);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowRight className={`w-4 h-4 transition-transform rotate-180 ${showVariants ? '-rotate-90' : ''}`} />
                <span className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Change Style
                </span>
              </button>

              {/* Variants Submenu - positioned to the left to avoid overflow */}
              {showVariants && (
                <div className="absolute right-full top-0 mr-1 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVariantChange(variant.id);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                        currentVariant === variant.id
                          ? 'bg-gray-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">{variant.name}</div>
                        <div className="text-xs text-gray-500">{variant.description}</div>
                      </div>
                      {currentVariant === variant.id && (
                        <Check className="w-4 h-4 ml-2" style={{ color: themeColor }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Move to Column Option (for two-column layouts) */}
          {onMoveToColumn && showColumnOption && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMoveToColumn(currentColumn === 'main' ? 'sidebar' : 'main');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              Move to {currentColumn === 'main' ? 'Sidebar' : 'Main Column'}
            </button>
          )}

          {/* Divider */}
          {onDelete && ((onChangeVariant && variants.length > 0) || (onMoveToColumn && showColumnOption)) && (
            <div className="border-t border-gray-100 my-1" />
          )}

          {/* Delete Option */}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Section
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionOptionsMenu;
