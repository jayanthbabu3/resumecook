/**
 * Languages Bars Variant
 *
 * Displays languages with horizontal proficiency bars.
 * Clean, visual representation of language skills.
 * Supports inline editing for both language name and proficiency level.
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import type { LanguagesVariantProps } from '../types';

const proficiencyLevels: { key: string; level: number; label: string }[] = [
  { key: 'Native', level: 100, label: 'Native' },
  { key: 'Fluent', level: 95, label: 'Fluent' },
  { key: 'Professional', level: 85, label: 'Professional' },
  { key: 'Advanced', level: 75, label: 'Advanced' },
  { key: 'Intermediate', level: 55, label: 'Intermediate' },
  { key: 'Basic', level: 35, label: 'Basic' },
  { key: 'Elementary', level: 20, label: 'Elementary' },
];

const proficiencyMap: Record<string, { level: number; label: string }> = {
  'Native': { level: 100, label: 'Native' },
  'Fluent': { level: 95, label: 'Fluent' },
  'Professional': { level: 85, label: 'Professional' },
  'Advanced': { level: 75, label: 'Advanced' },
  'Intermediate': { level: 55, label: 'Intermediate' },
  'Basic': { level: 35, label: 'Basic' },
  'Elementary': { level: 20, label: 'Elementary' },
};

export const LanguagesBars: React.FC<LanguagesVariantProps> = ({
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

  if (!items.length && !editable) return null;

  const handleProficiencyChange = (index: number, newProficiency: string) => {
    if (inlineEdit) {
      inlineEdit.updateField(`languages.${index}.proficiency`, newProficiency);
    }
    setOpenDropdown(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((lang, index) => {
        const profInfo = proficiencyMap[lang.proficiency] || { level: 50, label: lang.proficiency };

        return (
          <div key={lang.id || index} className="group relative">
            {editable && onRemoveLanguage && (
              <button
                onClick={() => onRemoveLanguage(lang.id)}
                className="absolute -right-2 -top-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 bg-red-100 hover:bg-red-200 rounded-full z-10"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px', gap: '8px' }}>
              {editable ? (
                <InlineEditableText
                  path={`languages.${index}.language`}
                  value={lang.language}
                  style={{
                    fontWeight: 600,
                    color: typography.itemTitle.color,
                    fontSize: scaleFontSize(typography.body.fontSize),
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    minWidth: 0,
                    flex: 1,
                  }}
                  placeholder="Language"
                />
              ) : (
                <span style={{
                  fontWeight: 600,
                  color: typography.itemTitle.color,
                  fontSize: scaleFontSize(typography.body.fontSize),
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minWidth: 0,
                  flex: 1,
                }}>
                  {lang.language}
                </span>
              )}

              {/* Proficiency selector */}
              {editable ? (
                <div className="relative flex-shrink-0" ref={openDropdown === index ? dropdownRef : null}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-gray-100 transition-colors"
                    style={{ fontSize: scaleFontSize(typography.dates.fontSize), color: '#6b7280' }}
                  >
                    {profInfo.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {openDropdown === index && (
                    <div
                      className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1 min-w-[110px]"
                    >
                      {proficiencyLevels.map((level) => (
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
                <span style={{ fontSize: scaleFontSize(typography.dates.fontSize), color: '#6b7280', flexShrink: 0 }}>
                  {profInfo.label}
                </span>
              )}
            </div>

            {/* Progress bar */}
            <div style={{
              width: '100%',
              height: '4px',
              backgroundColor: '#e5e7eb',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${profInfo.level}%`,
                height: '100%',
                backgroundColor: accentColor,
                borderRadius: '2px',
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        );
      })}

      {editable && onAddLanguage && (
        <button
          onClick={onAddLanguage}
          className="mt-2 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors w-fit"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-3 w-3" />
          Add Language
        </button>
      )}
    </div>
  );
};

export default LanguagesBars;
