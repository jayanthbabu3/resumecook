/**
 * Languages Pills Variant
 *
 * Displays languages as stylish pill badges with proficiency levels.
 * Modern, clean look perfect for tech and creative resumes.
 * Uses theme accent color for styling.
 */

import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, ChevronDown } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { useInlineEdit } from '@/contexts/InlineEditContext';
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

// Helper to convert hex to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Generate theme-based colors with varying opacity based on proficiency level
const getProficiencyColors = (accentColor: string, proficiency: string): { bg: string; text: string; border: string } => {
  const rgb = hexToRgb(accentColor);
  if (!rgb) {
    return { bg: `${accentColor}15`, text: accentColor, border: `${accentColor}40` };
  }

  // Different opacity levels based on proficiency
  const opacityMap: Record<string, number> = {
    'Native': 0.20,
    'Fluent': 0.18,
    'Professional': 0.16,
    'Advanced': 0.14,
    'Intermediate': 0.12,
    'Basic': 0.10,
    'Elementary': 0.08,
  };

  const opacity = opacityMap[proficiency] || 0.12;

  return {
    bg: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`,
    text: accentColor,
    border: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity + 0.20})`,
  };
};

export const LanguagesPills: React.FC<LanguagesVariantProps> = ({
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

  const handleProficiencyChange = (index: number, newProficiency: string) => {
    if (inlineEdit) {
      inlineEdit.updateField(`languages.${index}.proficiency`, newProficiency);
    }
    setOpenDropdown(null);
  };

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
      {items.map((lang, index) => {
        const colors = getProficiencyColors(accentColor, lang.proficiency);

        return (
          <div
            key={lang.id || index}
            className="group relative"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '20px',
              fontSize: typography.body.fontSize,
            }}
          >
            {editable ? (
              <InlineEditableText
                path={`languages.${index}.language`}
                value={lang.language}
                style={{ fontWeight: 600, color: colors.text }}
                placeholder="Language"
              />
            ) : (
              <span style={{ fontWeight: 600, color: colors.text }}>
                {lang.language}
              </span>
            )}

            {/* Proficiency with dropdown in edit mode */}
            {editable ? (
              <div className="relative" ref={openDropdown === index ? dropdownRef : null}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                  className="flex items-center gap-0.5 hover:opacity-70 transition-opacity"
                  style={{
                    fontSize: '11px',
                    color: colors.text,
                    opacity: 0.8,
                  }}
                >
                  {lang.proficiency}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {openDropdown === index && (
                  <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 py-1 min-w-[120px]">
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
              <span style={{
                fontSize: '11px',
                color: colors.text,
                opacity: 0.8,
              }}>
                {lang.proficiency}
              </span>
            )}

            {editable && onRemoveLanguage && (
              <button
                onClick={() => onRemoveLanguage(lang.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded-full ml-1"
              >
                <X className="w-3 h-3 text-red-500" />
              </button>
            )}
          </div>
        );
      })}

      {editable && onAddLanguage && (
        <button
          onClick={onAddLanguage}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      )}
    </div>
  );
};

export default LanguagesPills;
