/**
 * Languages Grid Variant
 *
 * Displays languages in a structured grid with visual proficiency indicators.
 * Clean, organized layout ideal for corporate resumes.
 * Responsive: 1 column in sidebar, 2 columns in main content area.
 * Supports inline editing with clickable dots for proficiency selection.
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { LanguagesVariantProps } from '../types';

// Proficiency levels mapped to dot count (1-5)
const proficiencyToDots: Record<string, number> = {
  'Native': 5,
  'Fluent': 5,
  'Professional': 4,
  'Advanced': 4,
  'Intermediate': 3,
  'Basic': 2,
  'Elementary': 1,
};

// Dots to proficiency mapping (for click selection)
const dotsToProficiency: Record<number, string> = {
  1: 'Elementary',
  2: 'Basic',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Native',
};

// All proficiency options for dropdown
const proficiencyOptions = [
  { key: 'Native', dots: 5 },
  { key: 'Fluent', dots: 5 },
  { key: 'Professional', dots: 4 },
  { key: 'Advanced', dots: 4 },
  { key: 'Intermediate', dots: 3 },
  { key: 'Basic', dots: 2 },
  { key: 'Elementary', dots: 1 },
];

export const LanguagesGrid: React.FC<LanguagesVariantProps> = ({
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
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    // Initial measurement
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

  if (!items.length && !editable) return null;

  const handleDotClick = (index: number, dotNumber: number) => {
    if (!editable || !inlineEdit) return;
    const newProficiency = dotsToProficiency[dotNumber];
    inlineEdit.updateField(`languages.${index}.proficiency`, newProficiency);
  };

  const handleProficiencySelect = (index: number, proficiency: string) => {
    if (!inlineEdit) return;
    inlineEdit.updateField(`languages.${index}.proficiency`, proficiency);
    setOpenDropdown(null);
  };

  // Determine layout based on container width
  // Sidebar is typically ~180-220px, main content is 400px+
  // Default to wide (multi-column) when containerWidth is 0 (e.g., in PDF generation)
  const isNarrow = containerWidth > 0 && containerWidth < 280;

  const renderDots = (level: number, index: number) => {
    return (
      <div style={{ display: 'flex', gap: '3px', flexShrink: 0 }}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <button
            key={dot}
            onClick={(e) => {
              e.stopPropagation();
              handleDotClick(index, dot);
            }}
            disabled={!editable}
            className={editable ? 'cursor-pointer hover:scale-125 transition-transform' : 'cursor-default'}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: dot <= level ? accentColor : '#e5e7eb',
              border: 'none',
              padding: 0,
            }}
            title={editable ? `Set to ${dotsToProficiency[dot]}` : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        // Responsive: 1 column for narrow (sidebar), 2 columns for wider areas
        gridTemplateColumns: isNarrow ? '1fr' : 'repeat(2, 1fr)',
        gap: isNarrow ? '6px' : '8px 12px',
      }}
    >
      {items.map((lang, index) => {
        const level = proficiencyToDots[lang.proficiency] || 3;

        return (
          <div
            key={lang.id || index}
            className="group relative"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '8px',
              padding: isNarrow ? '5px 8px' : '6px 10px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #f3f4f6',
              minWidth: 0, // Allow shrinking
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1px',
              minWidth: 0,
              flex: 1,
              overflow: 'hidden',
            }}>
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
              {/* Proficiency text - clickable dropdown in edit mode */}
              {editable ? (
                <div className="relative" ref={openDropdown === index ? dropdownRef : null}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    className="text-left hover:bg-gray-200/50 rounded px-1 -ml-1 transition-colors"
                    style={{ fontSize: '10px', color: '#9ca3af' }}
                  >
                    {lang.proficiency}
                  </button>
                  {openDropdown === index && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1 min-w-[110px]">
                      {proficiencyOptions.map((option) => (
                        <button
                          key={option.key}
                          onClick={() => handleProficiencySelect(index, option.key)}
                          className={`w-full text-left px-2 py-1 text-xs hover:bg-gray-50 transition-colors flex items-center justify-between ${
                            lang.proficiency === option.key ? 'bg-gray-100 font-medium' : ''
                          }`}
                          style={{ color: '#374151' }}
                        >
                          <span>{option.key}</span>
                          <span className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((d) => (
                              <span
                                key={d}
                                style={{
                                  width: '3px',
                                  height: '3px',
                                  borderRadius: '50%',
                                  backgroundColor: d <= option.dots ? accentColor : '#e5e7eb',
                                  display: 'inline-block',
                                }}
                              />
                            ))}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>
                  {lang.proficiency}
                </span>
              )}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
            }}>
              {renderDots(level, index)}

              {editable && onRemoveLanguage && (
                <button
                  onClick={() => onRemoveLanguage(lang.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
                >
                  <X className="w-3 h-3 text-red-500" />
                </button>
              )}
            </div>
          </div>
        );
      })}

      {editable && onAddLanguage && (
        <button
          onClick={onAddLanguage}
          className="flex items-center justify-center gap-1 text-xs font-medium px-2 py-1.5 rounded-md border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add
        </button>
      )}
    </div>
  );
};

export default LanguagesGrid;
