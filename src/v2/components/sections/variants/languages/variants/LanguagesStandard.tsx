/**
 * Languages Standard Variant
 * 
 * Shows languages with proficiency levels and progress bars.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import type { LanguagesVariantProps } from '../types';

const proficiencyLevels: Record<string, { level: number; label: string }> = {
  'Native': { level: 100, label: 'Native speaker' },
  'Fluent': { level: 95, label: 'Fluent' },
  'Professional': { level: 85, label: 'Professional' },
  'Advanced': { level: 75, label: 'Advanced' },
  'Intermediate': { level: 55, label: 'Intermediate' },
  'Basic': { level: 35, label: 'Basic' },
  'Elementary': { level: 20, label: 'Elementary' },
};

const ceferLevels: Record<string, string> = {
  'Native': 'C2',
  'Fluent': 'C2',
  'Professional': 'C1',
  'Advanced': 'B2',
  'Intermediate': 'B1',
  'Basic': 'A2',
  'Elementary': 'A1',
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

  if (!items.length && !editable) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((lang, index) => {
        const profInfo = proficiencyLevels[lang.proficiency] || { level: 50, label: lang.proficiency };
        const cefer = ceferLevels[lang.proficiency] || '';
        
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
            
            {/* Native speaker - no bar */}
            {lang.proficiency === 'Native' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {editable ? (
                  <InlineEditableText
                    path={`languages.${index}.language`}
                    value={lang.language}
                    style={{ fontWeight: 600, color: typography.itemTitle.color }}
                    placeholder="Language"
                  />
                ) : (
                  <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>
                    {lang.language}:
                  </span>
                )}
                <span style={{ color: typography.body.color }}>Native speaker</span>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {editable ? (
                      <>
                        <InlineEditableText
                          path={`languages.${index}.language`}
                          value={lang.language}
                          style={{ fontWeight: 500, color: typography.itemTitle.color }}
                          placeholder="Language"
                        />
                        {lang.certification && (
                          <>
                            <span style={{ color: typography.body.color }}>•</span>
                            <InlineEditableText
                              path={`languages.${index}.certification`}
                              value={lang.certification}
                              style={{ fontSize: '12px', color: typography.body.color }}
                              placeholder="Certification"
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <span style={{ fontWeight: 500, color: typography.itemTitle.color }}>
                        {lang.language}
                        {lang.certification && (
                          <span style={{ fontWeight: 400, color: typography.body.color }}> • {lang.certification}</span>
                        )}
                        :
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {cefer && <span style={{ fontSize: '13px', color: '#6b7280' }}>{cefer}</span>}
                  </div>
                </div>
                
                {/* Progress bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    flex: 1,
                    height: '6px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${profInfo.level}%`,
                      height: '100%',
                      backgroundColor: accentColor,
                      borderRadius: '3px',
                    }} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#9ca3af', minWidth: '100px' }}>
                    {profInfo.label}
                  </span>
                </div>
              </div>
            )}
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

export default LanguagesStandard;
