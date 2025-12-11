/**
 * Resume Builder V2 - Languages Section Component
 * 
 * Displays language proficiency in various formats
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import type { LanguageItem } from '@/types/resume';
import { SectionHeading } from './SectionHeading';

interface LanguagesSectionProps {
  items: LanguageItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Languages',
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

  if (!items.length && !editable) return null;

  // Find native language
  const nativeLanguage = items.find(l => l.proficiency === 'Native');
  const otherLanguages = items.filter(l => l.proficiency !== 'Native');

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
          <div style={{ marginBottom: '8px' }}>
            <span style={{ 
              fontWeight: 600, 
              fontSize: typography.body.fontSize,
              color: typography.body.color,
            }}>
              {nativeLanguage.language}:
            </span>
            <span style={{ 
              fontSize: typography.body.fontSize,
              color: typography.body.color,
              marginLeft: '4px',
            }}>
              {getProficiencyLabel(nativeLanguage.proficiency)}
            </span>
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
            {otherLanguages.map((lang, index) => (
              <div key={lang.id || index}>
                <div 
                  style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: typography.body.fontSize,
                    color: typography.body.color,
                  }}
                >
                  <span>{lang.language}:</span>
                  <span style={{ 
                    fontWeight: 500,
                    color: accent,
                  }}>
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
                      width: lang.proficiency === 'Fluent' ? '100%' :
                             lang.proficiency === 'Professional' ? '80%' :
                             lang.proficiency === 'Intermediate' ? '60%' :
                             lang.proficiency === 'Basic' ? '40%' : '100%',
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LanguagesSection;
