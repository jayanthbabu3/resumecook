/**
 * Resume Builder V2 - Experience Section Component
 * 
 * Configurable experience section with multiple variants:
 * - standard: Full details with bullets
 * - compact: Condensed layout
 * - timeline: Visual timeline on left
 * - card: Card-style entries
 * - minimal: Essential info only
 */

import React from 'react';
import type { TemplateConfig, ExperienceVariant } from '../../types';
import type { ExperienceItem } from '@/types/resume';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { Plus, X } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface ExperienceSectionProps {
  items: ExperienceItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  variantOverride?: ExperienceVariant;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  onAddExperience?: () => void;
  onRemoveExperience?: (expId: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Experience',
  variantOverride,
  onAddBulletPoint,
  onRemoveBulletPoint,
  onAddExperience,
  onRemoveExperience,
}) => {
  const { typography, colors, spacing, experience } = config;
  const variant = variantOverride || experience.variant;
  const accent = colors.primary;
  
  // Get style options
  const styleContext = useStyleOptions();
  const bulletChar = styleContext?.styleOptions?.bulletStyle || '•';
  
  // Use formatDate from StyleOptionsContext for consistency
  const formatDate = styleContext?.formatDate || ((date: string) => {
    // Fallback format if context not available
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  });
  
  // Get bullet character
  const getBulletCharacter = () => {
    if (bulletChar === 'none') return '';
    return bulletChar;
  };

  // Render single experience item
  const renderItem = (item: ExperienceItem, index: number) => {
    const itemStyle: React.CSSProperties = {
      marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: typography.itemTitle.fontSize,
      fontWeight: typography.itemTitle.fontWeight,
      lineHeight: typography.itemTitle.lineHeight,
      color: typography.itemTitle.color,
      margin: 0,
    };

    const subtitleStyle: React.CSSProperties = {
      fontSize: typography.itemSubtitle.fontSize,
      fontWeight: typography.itemSubtitle.fontWeight,
      lineHeight: typography.itemSubtitle.lineHeight,
      color: accent,
      margin: 0,
    };

    const dateStyle: React.CSSProperties = {
      fontSize: typography.dates.fontSize,
      fontWeight: typography.dates.fontWeight,
      lineHeight: typography.dates.lineHeight,
      color: typography.dates.color,
    };

    const bodyStyle: React.CSSProperties = {
      fontSize: typography.body.fontSize,
      fontWeight: typography.body.fontWeight,
      lineHeight: typography.body.lineHeight,
      color: typography.body.color,
    };

    // Map bullet character to list-style-type
    const getListStyleType = () => {
      switch (bulletChar) {
        case '•': return 'disc';
        case '◦': return 'circle';
        case '▪': return 'square';
        case '–': return 'none'; // Use custom marker
        case '▸': return 'none'; // Use custom marker
        case 'none': return 'none';
        default: return 'disc';
      }
    };
    
    const bulletListStyle: React.CSSProperties = {
      ...bodyStyle,
      listStyleType: getListStyleType(),
      paddingLeft: bulletChar === 'none' ? 0 : '20px',
      margin: 0,
    };

    // Render date range
    const renderDates = () => {
      const dateText = `${formatDate(item.startDate)} - ${item.current ? 'Present' : formatDate(item.endDate)}`;
      
      if (editable) {
        return (
          <div className="flex items-center gap-1" style={dateStyle}>
            <InlineEditableDate
              path={`experience.${index}.startDate`}
              value={item.startDate}
              style={dateStyle}
              formatDisplay={formatDate}
            />
            <span>-</span>
            {item.current ? (
              <span>Present</span>
            ) : (
              <InlineEditableDate
                path={`experience.${index}.endDate`}
                value={item.endDate}
                style={dateStyle}
                formatDisplay={formatDate}
              />
            )}
          </div>
        );
      }

      return <span style={dateStyle}>{dateText}</span>;
    };

    // Render bullet points
    const renderBullets = () => {
      if (!item.bulletPoints?.length && !editable) return null;

      if (editable) {
        return (
          <div style={{ marginTop: '8px' }}>
            <ul style={bulletListStyle}>
              {(item.bulletPoints || []).map((bullet, bulletIndex) => (
                <li key={bulletIndex} style={{ marginBottom: spacing.bulletGap }} className="group relative">
                  <InlineEditableText
                    path={`experience.${index}.bulletPoints.${bulletIndex}`}
                    value={bullet}
                    style={bodyStyle}
                    multiline
                  />
                  {onRemoveBulletPoint && (
                    <button
                      onClick={() => onRemoveBulletPoint(item.id, bulletIndex)}
                      className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {onAddBulletPoint && (
              <button
                onClick={() => onAddBulletPoint(item.id)}
                className="mt-2 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
                style={{ color: accent, borderColor: accent }}
              >
                <Plus className="h-3 w-3" />
                Add bullet point
              </button>
            )}
          </div>
        );
      }

      return (
        <ul style={bulletListStyle}>
          {item.bulletPoints?.map((bullet, bulletIndex) => (
            <li key={bulletIndex} style={{ marginBottom: spacing.bulletGap }}>
              {bullet}
            </li>
          ))}
        </ul>
      );
    };

    // Two-column-dates variant (dates/location on left, content on right)
    if (variant === 'two-column-dates') {
      const leftColumnStyle: React.CSSProperties = {
        width: '120px',
        flexShrink: 0,
        paddingRight: '16px',
      };

      return (
        <div key={item.id} style={itemStyle}>
          <div className="flex">
            {/* Left column - dates and location */}
            <div style={leftColumnStyle}>
              <div style={dateStyle}>
                {editable ? (
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <InlineEditableDate
                        path={`experience.${index}.startDate`}
                        value={item.startDate}
                        style={dateStyle}
                        formatDisplay={formatDate}
                      />
                      <span>-</span>
                      {item.current ? (
                        <span>Present</span>
                      ) : (
                        <InlineEditableDate
                          path={`experience.${index}.endDate`}
                          value={item.endDate}
                          style={dateStyle}
                          formatDisplay={formatDate}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div>{`${formatDate(item.startDate)} - ${item.current ? 'Present' : formatDate(item.endDate)}`}</div>
                )}
              </div>
              {experience.showLocation && (
                <div style={{ ...typography.small, color: typography.dates.color, marginTop: '2px' }}>
                  San Francisco, CA
                </div>
              )}
            </div>

            {/* Right column - job details */}
            <div className="flex-1 border-l-2 pl-4" style={{ borderColor: colors.border }}>
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.position`}
                  value={item.position}
                  as="h3"
                  style={titleStyle}
                />
              ) : (
                <h3 style={titleStyle}>{item.position}</h3>
              )}
              
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.company`}
                  value={item.company}
                  style={subtitleStyle}
                />
              ) : (
                <div style={subtitleStyle}>{item.company}</div>
              )}

              {/* Bullet points */}
              {renderBullets()}
            </div>
          </div>
        </div>
      );
    }

    // Standard variant
    if (variant === 'standard' || variant === 'minimal') {
      return (
        <div key={item.id} style={itemStyle}>
          {/* Header row */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.position`}
                  value={item.position}
                  as="h3"
                  style={titleStyle}
                />
              ) : (
                <h3 style={titleStyle}>{item.position}</h3>
              )}
              
              <div className="flex items-center gap-2 mt-0.5">
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.company`}
                    value={item.company}
                    style={subtitleStyle}
                  />
                ) : (
                  <span style={subtitleStyle}>{item.company}</span>
                )}
                
                {experience.datePosition === 'inline' && (
                  <>
                    <span style={{ color: colors.text.muted }}>•</span>
                    {renderDates()}
                  </>
                )}
              </div>
            </div>
            
            {experience.datePosition === 'right' && (
              <div className="text-right flex-shrink-0">
                {renderDates()}
              </div>
            )}
          </div>

          {experience.datePosition === 'below' && (
            <div style={{ marginTop: '4px' }}>{renderDates()}</div>
          )}

          {/* Description */}
          {item.description && variant !== 'minimal' && (
            <p style={{ ...bodyStyle, marginTop: '6px', marginBottom: '4px' }}>
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.description`}
                  value={item.description}
                  style={bodyStyle}
                />
              ) : (
                item.description
              )}
            </p>
          )}

          {/* Bullet points */}
          {variant !== 'minimal' && renderBullets()}
        </div>
      );
    }

    // Timeline variant
    if (variant === 'timeline') {
      return (
        <div key={item.id} className="relative pl-6" style={itemStyle}>
          {/* Timeline dot */}
          <div
            className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          {/* Timeline line */}
          {index < items.length - 1 && (
            <div
              className="absolute left-[4px] top-4 w-0.5 h-full"
              style={{ backgroundColor: colors.border }}
            />
          )}
          
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.position`}
                  value={item.position}
                  as="h3"
                  style={titleStyle}
                />
              ) : (
                <h3 style={titleStyle}>{item.position}</h3>
              )}
              
              <span style={subtitleStyle}>{item.company}</span>
            </div>
            
            <div className="text-right flex-shrink-0">
              {renderDates()}
            </div>
          </div>

          {item.description && (
            <p style={{ ...bodyStyle, marginTop: '6px', marginBottom: '4px' }}>
              {item.description}
            </p>
          )}

          {renderBullets()}
        </div>
      );
    }

    // Card variant
    if (variant === 'card') {
      return (
        <div
          key={item.id}
          className="p-4 rounded-lg border"
          style={{
            ...itemStyle,
            borderColor: colors.border,
            backgroundColor: colors.background.section,
          }}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 style={titleStyle}>{item.position}</h3>
              <span style={subtitleStyle}>{item.company}</span>
            </div>
            <div className="text-right flex-shrink-0">
              {renderDates()}
            </div>
          </div>

          {item.description && (
            <p style={{ ...bodyStyle, marginTop: '8px' }}>{item.description}</p>
          )}

          {renderBullets()}
        </div>
      );
    }

    // Compact variant
    return (
      <div key={item.id} style={itemStyle}>
        <div className="flex justify-between items-baseline gap-4">
          <div className="flex items-baseline gap-2">
            <span style={titleStyle}>{item.position}</span>
            <span style={{ color: colors.text.muted }}>at</span>
            <span style={subtitleStyle}>{item.company}</span>
          </div>
          {renderDates()}
        </div>
        {renderBullets()}
      </div>
    );
  };

  if (!items.length && !editable) return null;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={sectionTitle}
        config={config}
        editable={editable}
        accentColor={accent}
      />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {items.map((item, index) => (
          <div key={item.id} className="group relative">
            {renderItem(item, index)}
            {editable && onRemoveExperience && (
              <button
                onClick={() => onRemoveExperience(item.id)}
                className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
                title="Remove experience"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}
          </div>
        ))}
        
        {/* Add Experience Button */}
        {editable && onAddExperience && (
          <button
            onClick={onAddExperience}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accent, borderColor: accent }}
          >
            <Plus className="h-3 w-3" />
            Add Experience
          </button>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
