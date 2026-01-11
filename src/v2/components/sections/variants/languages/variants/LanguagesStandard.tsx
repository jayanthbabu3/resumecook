/**
 * Languages Standard Variant
 *
 * Responsive layout: 2-3 per row in main content, 1 per row in sidebar.
 * Shows language name with proficiency level (no progress bars).
 * Supports inline editing for language name and proficiency level.
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { LanguagesVariantProps } from '../types';

const proficiencyOptions: { key: string; label: string }[] = [
  { key: 'Native', label: 'Native' },
  { key: 'Fluent', label: 'Fluent' },
  { key: 'Professional', label: 'Professional' },
  { key: 'Advanced', label: 'Advanced' },
  { key: 'Intermediate', label: 'Intermediate' },
  { key: 'Basic', label: 'Basic' },
  { key: 'Elementary', label: 'Elementary' },
];

const proficiencyLabels: Record<string, string> = {
  'Native': 'Native',
  'Fluent': 'Fluent',
  'Professional': 'Professional',
  'Advanced': 'Advanced',
  'Intermediate': 'Intermediate',
  'Basic': 'Basic',
  'Elementary': 'Elementary',
};

export const LanguagesStandard: React.FC<LanguagesVariantProps> = ({
  items,
  config,
  accentColor,
  editable = false,
  onAddLanguage,
  onRemoveLanguage,
}) => {
  const { typography } = config;
  const inlineEdit = useInlineEdit();
  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Measure container width for responsive layout
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(container);
    setContainerWidth(container.offsetWidth);

    return () => resizeObserver.disconnect();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProficiencyChange = (index: number, newProficiency: string) => {
    if (inlineEdit) {
      inlineEdit.updateField(`languages.${index}.proficiency`, newProficiency);
    }
    setOpenDropdown(null);
  };

  if (!items.length && !editable) return null;

  // Responsive: 1 column for narrow (sidebar), 2-3 columns for wider (main content)
  const isNarrow = containerWidth < 280;
  const isMedium = containerWidth >= 280 && containerWidth < 450;
  const columns = isNarrow ? 1 : isMedium ? 2 : 3;

  return (
    <div ref={containerRef}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: isNarrow ? '8px' : '10px 16px',
      }}>
        {items.map((lang, index) => {
          const profLabel = proficiencyLabels[lang.proficiency] || lang.proficiency;

          return (
            <div
              key={lang.id || index}
              className="group relative"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                padding: '6px 8px',
                backgroundColor: `${accentColor}08`,
                borderRadius: '6px',
                border: `1px solid ${accentColor}15`,
                minWidth: 0,
              }}
            >
              {editable && onRemoveLanguage && (
                <button
                  onClick={() => onRemoveLanguage(lang.id)}
                  className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
                >
                  <X className="w-3 h-3 text-red-600" />
                </button>
              )}

              {/* Language name */}
              {editable ? (
                <InlineEditableText
                  path={`languages.${index}.language`}
                  value={lang.language}
                  style={{
                    fontWeight: 600,
                    color: typography.itemTitle.color,
                    fontSize: scaleFontSize('12px'),
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  placeholder="Language"
                />
              ) : (
                <span style={{
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                  fontSize: scaleFontSize('12px'),
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {lang.language}
                </span>
              )}

              {/* Proficiency level */}
              {editable ? (
                <div className="relative" ref={openDropdown === index ? dropdownRef : null}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 -ml-1 transition-colors"
                    style={{
                      fontSize: scaleFontSize('10px'),
                      color: accentColor,
                      fontWeight: 500,
                    }}
                  >
                    {profLabel}
                    <ChevronDown className="w-2.5 h-2.5" />
                  </button>
                  {openDropdown === index && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1 min-w-[100px]">
                      {proficiencyOptions.map((level) => (
                        <button
                          key={level.key}
                          onClick={() => handleProficiencyChange(index, level.key)}
                          className={`w-full text-left px-2 py-1 text-xs hover:bg-gray-50 transition-colors ${
                            lang.proficiency === level.key ? 'bg-gray-100 font-medium' : ''
                          }`}
                          style={{ color: '#374151' }}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span style={{
                  fontSize: scaleFontSize('10px'),
                  color: accentColor,
                  fontWeight: 500,
                }}>
                  {profLabel}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {editable && onAddLanguage && (
        <button
          onClick={onAddLanguage}
          className="mt-2 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor, fontSize: '11px' }}
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      )}
    </div>
  );
};

export default LanguagesStandard;
