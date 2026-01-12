/**
 * Languages Compact Variant
 *
 * Clean horizontal layout with language names and proficiency levels.
 * Format: ENGLISH (Native)   HINDI (Professional)   etc.
 * This is the standard default layout for languages across all templates.
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

export const LanguagesCompact: React.FC<LanguagesVariantProps> = ({
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

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
      {items.map((lang, index) => (
        <div
          key={lang.id || index}
          className="group relative"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {editable ? (
            <InlineEditableText
              path={`languages.${index}.language`}
              value={lang.language}
              style={{
                fontWeight: 600,
                color: typography.itemTitle.color,
                textTransform: 'uppercase',
                fontSize: scaleFontSize(typography.body?.fontSize || '13px'),
                letterSpacing: '0.02em',
              }}
              placeholder="Language"
            />
          ) : (
            <span
              style={{
                fontWeight: 600,
                color: typography.itemTitle.color,
                textTransform: 'uppercase',
                fontSize: scaleFontSize(typography.body?.fontSize || '13px'),
                letterSpacing: '0.02em',
              }}
            >
              {lang.language}
            </span>
          )}

          {/* Proficiency in parentheses */}
          {editable ? (
            <div className="relative" ref={openDropdown === index ? dropdownRef : null}>
              <button
                onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                className="flex items-center gap-0.5 hover:bg-gray-100 rounded px-1 py-0.5 transition-colors"
                style={{
                  color: typography.body?.color || '#6b7280',
                  fontSize: scaleFontSize(typography.body?.fontSize || '13px'),
                }}
              >
                ({lang.proficiency})
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
              {openDropdown === index && (
                <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1 min-w-[130px]">
                  {proficiencyOptions.map((level) => (
                    <button
                      key={level.key}
                      onClick={() => handleProficiencyChange(index, level.key)}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors ${
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
            <span
              style={{
                color: typography.body?.color || '#6b7280',
                fontSize: scaleFontSize(typography.body?.fontSize || '13px'),
              }}
            >
              ({lang.proficiency})
            </span>
          )}

          {editable && onRemoveLanguage && (
            <button
              onClick={() => onRemoveLanguage(lang.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
            >
              <X className="w-3 h-3 text-red-500" />
            </button>
          )}
        </div>
      ))}

      {editable && onAddLanguage && (
        <button
          onClick={onAddLanguage}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default LanguagesCompact;
