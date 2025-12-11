/**
 * Resume Builder V2 - Languages Section Component
 * 
 * Displays language proficiency with inline editing support
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import type { LanguageItem } from '@/types/resume';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { Plus, X } from 'lucide-react';

interface LanguagesSectionProps {
  items: LanguageItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddLanguage?: () => void;
  onRemoveLanguage?: (langId: string) => void;
  onUpdateLanguage?: (langId: string, field: string, value: string) => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Languages',
  onAddLanguage,
  onRemoveLanguage,
  onUpdateLanguage,
}) => {
  const { typography, colors, spacing } = config;
  const accent = colors.primary;

  // Map proficiency to level code
  const getProficiencyCode = (proficiency: string): string => {
    const map: Record<string, string> = {
      'Native': 'Native speaker',
      'Fluent': 'C2',
      'Professional': 'C1',
      'Intermediate': 'B2',
      'Basic': 'A2',
    };
    return map[proficiency] || proficiency;
  };

  const getProficiencyLabel = (proficiency: string): string => {
    const map: Record<string, string> = {
      'Native': 'Native speaker',
      'Fluent': 'Proficient',
      'Professional': 'Professional',
      'Intermediate': 'Upper-intermediate',
      'Basic': 'Basic',
    };
    return map[proficiency] || proficiency;
  };

  // Get proficiency percentage for progress bar
  const getProficiencyPercentage = (proficiency: string): string => {
    const map: Record<string, string> = {
      'Native': '100%',
      'Fluent': '100%',
      'Professional': '80%',
      'Intermediate': '60%',
      'Basic': '40%',
    };
    return map[proficiency] || '50%';
  };

  if (!items.length && !editable) return null;

  // Find native language
  const nativeLanguage = items.find(l => l.proficiency === 'Native');
  const otherLanguages = items.filter(l => l.proficiency !== 'Native');

  const renderLanguageItem = (lang: LanguageItem, index: number) => {
    const isNative = lang.proficiency === 'Native';
    
    return (
      <div key={lang.id || index} className="group relative">
        <div 
          style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: typography.body.fontSize,
            color: typography.body.color,
          }}
        >
          {editable ? (
            <InlineEditableText
              path={`languages.${index}.language`}
              value={lang.language}
              style={{ fontSize: typography.body.fontSize, color: typography.body.color }}
              onCustomUpdate={(value) => onUpdateLanguage?.(lang.id, 'language', value)}
            />
          ) : (
            <span>{lang.language}:</span>
          )}
          <span style={{ fontWeight: 500, color: accent }}>
            {getProficiencyCode(lang.proficiency)}
          </span>
        </div>
        
        {/* Progress bar */}
        <div 
          style={{ 
            height: '3px',
            backgroundColor: colors.border,
            marginTop: '4px',
          }}
        >
          <div 
            style={{ 
              height: '100%',
              backgroundColor: accent,
              width: getProficiencyPercentage(lang.proficiency),
            }}
          />
        </div>
        <div 
          style={{ 
            fontSize: typography.small.fontSize,
            color: typography.small.color,
            marginTop: '2px',
          }}
        >
          {getProficiencyLabel(lang.proficiency)}
        </div>
        
        {/* Remove button */}
        {editable && onRemoveLanguage && (
          <button
            onClick={() => onRemoveLanguage(lang.id)}
            className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
            title="Remove language"
          >
            <X className="w-3 h-3 text-red-600" />
          </button>
        )}
      </div>
    );
  };

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={accent}
      />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {/* Native language displayed differently */}
        {nativeLanguage && (
          <div style={{ marginBottom: '12px' }} className="group relative">
            <span style={{ 
              fontWeight: 600, 
              fontSize: typography.body.fontSize,
              color: typography.body.color,
            }}>
              {editable ? (
                <InlineEditableText
                  path={`languages.0.language`}
                  value={nativeLanguage.language}
                  style={{ fontWeight: 600, fontSize: typography.body.fontSize, color: typography.body.color }}
                  onCustomUpdate={(value) => onUpdateLanguage?.(nativeLanguage.id, 'language', value)}
                />
              ) : (
                nativeLanguage.language
              )}
              :
            </span>
            <span style={{ 
              fontSize: typography.body.fontSize,
              color: typography.body.color,
              marginLeft: '4px',
            }}>
              {getProficiencyLabel(nativeLanguage.proficiency)}
            </span>
            
            {/* Remove button for native */}
            {editable && onRemoveLanguage && (
              <button
                onClick={() => onRemoveLanguage(nativeLanguage.id)}
                className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
                title="Remove language"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}
          </div>
        )}

        {/* Other languages in a grid */}
        {otherLanguages.length > 0 && (
          <div 
            style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px 24px',
            }}
          >
            {otherLanguages.map((lang, index) => renderLanguageItem(
              lang, 
              nativeLanguage ? index + 1 : index
            ))}
          </div>
        )}
        
        {/* Add Language Button */}
        {editable && onAddLanguage && (
          <button
            onClick={onAddLanguage}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accent, borderColor: accent }}
          >
            <Plus className="h-3 w-3" />
            Add Language
          </button>
        )}
      </div>
    </section>
  );
};

export default LanguagesSection;
