/**
 * Languages Grid Variant
 *
 * Displays languages in a structured grid with visual proficiency indicators.
 * Clean, organized layout ideal for corporate resumes.
 * Supports inline editing with clickable dots for proficiency selection.
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
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
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const renderDots = (level: number, index: number) => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
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
              width: '8px',
              height: '8px',
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
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px 24px',
    }}>
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
              padding: '8px 12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #f3f4f6',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {editable ? (
                <InlineEditableText
                  path={`languages.${index}.language`}
                  value={lang.language}
                  style={{ fontWeight: 600, color: typography.itemTitle.color, fontSize: typography.body.fontSize }}
                  placeholder="Language"
                />
              ) : (
                <span style={{ fontWeight: 600, color: typography.itemTitle.color, fontSize: typography.body.fontSize }}>
                  {lang.language}
                </span>
              )}
              {/* Proficiency text - clickable dropdown in edit mode */}
              {editable ? (
                <div className="relative" ref={openDropdown === index ? dropdownRef : null}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    className="text-left hover:bg-gray-200/50 rounded px-1 -ml-1 transition-colors"
                    style={{ fontSize: '11px', color: '#9ca3af' }}
                  >
                    {lang.proficiency}
                  </button>
                  {openDropdown === index && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1 min-w-[120px]">
                      {proficiencyOptions.map((option) => (
                        <button
                          key={option.key}
                          onClick={() => handleProficiencySelect(index, option.key)}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors flex items-center justify-between ${
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
                                  width: '4px',
                                  height: '4px',
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
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                  {lang.proficiency}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
          className="flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Language
        </button>
      )}
    </div>
  );
};

export default LanguagesGrid;
