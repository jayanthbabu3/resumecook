/**
 * Resume Builder V2 - Education Section Component
 * 
 * Configurable education section with multiple variants.
 */

import React from 'react';
import type { TemplateConfig, EducationVariant } from '../../types';
import type { EducationItem } from '@/types/resume';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { Plus, X } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface EducationSectionProps {
  items: EducationItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  variantOverride?: EducationVariant;
  onAddEducation?: () => void;
  onRemoveEducation?: (eduId: string) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Education',
  variantOverride,
  onAddEducation,
  onRemoveEducation,
}) => {
  const { typography, colors, spacing, education } = config;
  const variant = variantOverride || education.variant;
  const accent = colors.primary;

  // Get style options for date formatting
  const styleContext = useStyleOptions();
  const formatDate = styleContext?.formatDate || ((date: string) => {
    // Fallback format if context not available
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  });

  // Render single education item
  const renderItem = (item: EducationItem, index: number) => {
    const itemStyle: React.CSSProperties = {
      marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
    };

    const degreeStyle: React.CSSProperties = {
      fontSize: typography.itemTitle.fontSize,
      fontWeight: typography.itemTitle.fontWeight,
      lineHeight: typography.itemTitle.lineHeight,
      color: typography.itemTitle.color,
      margin: 0,
    };

    const schoolStyle: React.CSSProperties = {
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

    const fieldStyle: React.CSSProperties = {
      fontSize: typography.body.fontSize,
      color: typography.body.color,
    };

    // Render dates
    const renderDates = () => {
      if (!education.showDates) return null;
      
      const dateText = `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`;
      
      if (editable) {
        return (
          <div className="flex items-center gap-1" style={dateStyle}>
            <InlineEditableDate
              path={`education.${index}.startDate`}
              value={item.startDate}
              style={dateStyle}
              formatDisplay={formatDate}
            />
            <span>-</span>
            <InlineEditableDate
              path={`education.${index}.endDate`}
              value={item.endDate}
              style={dateStyle}
              formatDisplay={formatDate}
            />
          </div>
        );
      }

      return <span style={dateStyle}>{dateText}</span>;
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
                  <div className="flex items-center gap-1">
                    <InlineEditableDate
                      path={`education.${index}.startDate`}
                      value={item.startDate}
                      style={dateStyle}
                      formatDisplay={formatDate}
                    />
                    <span>-</span>
                    <InlineEditableDate
                      path={`education.${index}.endDate`}
                      value={item.endDate}
                      style={dateStyle}
                      formatDisplay={formatDate}
                    />
                  </div>
                ) : (
                  <div>{`${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</div>
                )}
              </div>
              {item.location && (
                <div style={{ ...typography.small, color: typography.dates.color, marginTop: '2px' }}>
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.location`}
                      value={item.location || 'Location'}
                      style={{ ...typography.small, color: typography.dates.color }}
                    />
                  ) : (
                    item.location
                  )}
                </div>
              )}
            </div>

            {/* Right column - education details */}
            <div className="flex-1 border-l-2 pl-4" style={{ borderColor: colors.border }}>
              {/* Degree */}
              {editable ? (
                <div className="flex items-baseline gap-1 flex-wrap">
                  <InlineEditableText
                    path={`education.${index}.degree`}
                    value={item.degree || 'Degree'}
                    as="h3"
                    style={degreeStyle}
                  />
                  {education.showField && (
                    <>
                      <span style={degreeStyle}></span>
                      <InlineEditableText
                        path={`education.${index}.field`}
                        value={item.field || 'Field of Study'}
                        style={degreeStyle}
                      />
                    </>
                  )}
                </div>
              ) : (
                <h3 style={degreeStyle}>
                  {item.degree}
                  {education.showField && item.field && ` ${item.field}`}
                </h3>
              )}
              
              {/* School */}
              {editable ? (
                <InlineEditableText
                  path={`education.${index}.school`}
                  value={item.school}
                  style={schoolStyle}
                />
              ) : (
                <div style={schoolStyle}>{item.school}</div>
              )}

              {/* GPA */}
              {education.showGPA && (editable || item.gpa) && (
                <div style={{ ...fieldStyle, marginTop: '4px' }} className="flex items-center gap-1">
                  <span>GPA:</span>
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.gpa`}
                      value={item.gpa || ''}
                      style={fieldStyle}
                    />
                  ) : (
                    <span>{item.gpa}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Standard variant
    if (variant === 'standard' || variant === 'detailed') {
      return (
        <div key={item.id} style={itemStyle}>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              {/* Degree */}
              {editable ? (
                <div className="flex items-baseline gap-1 flex-wrap">
                  <InlineEditableText
                    path={`education.${index}.degree`}
                    value={item.degree || 'Degree'}
                    as="h3"
                    style={degreeStyle}
                  />
                  {education.showField && (
                    <>
                      <span style={degreeStyle}>in</span>
                      <InlineEditableText
                        path={`education.${index}.field`}
                        value={item.field || 'Field of Study'}
                        style={degreeStyle}
                      />
                    </>
                  )}
                </div>
              ) : (
                <h3 style={degreeStyle}>
                  {item.degree}
                  {education.showField && item.field && ` in ${item.field}`}
                </h3>
              )}
              
              {/* School */}
              <div className="flex items-center gap-2 mt-0.5">
                {editable ? (
                  <InlineEditableText
                    path={`education.${index}.school`}
                    value={item.school}
                    style={schoolStyle}
                  />
                ) : (
                  <span style={schoolStyle}>{item.school}</span>
                )}
                
                {education.datePosition === 'inline' && (
                  <>
                    <span style={{ color: colors.text.muted }}>•</span>
                    {renderDates()}
                  </>
                )}
                
                {item.location && (
                  <>
                    <span style={{ color: colors.text.muted }}>•</span>
                    <span style={dateStyle}>{item.location}</span>
                  </>
                )}
              </div>
            </div>
            
            {education.datePosition === 'right' && (
              <div className="text-right flex-shrink-0">
                {renderDates()}
              </div>
            )}
          </div>

          {education.datePosition === 'below' && (
            <div style={{ marginTop: '4px' }}>{renderDates()}</div>
          )}

          {/* GPA */}
          {education.showGPA && (editable || item.gpa) && (
            <div style={{ ...fieldStyle, marginTop: '4px' }} className="flex items-center gap-1">
              <span>GPA:</span>
              {editable ? (
                <InlineEditableText
                  path={`education.${index}.gpa`}
                  value={item.gpa || ''}
                  style={fieldStyle}
                />
              ) : (
                <span>{item.gpa}</span>
              )}
            </div>
          )}
        </div>
      );
    }

    // Compact variant
    if (variant === 'compact') {
      return (
        <div key={item.id} className="flex justify-between items-baseline gap-4" style={itemStyle}>
          <div className="flex items-baseline gap-2 flex-wrap">
            {editable ? (
              <InlineEditableText
                path={`education.${index}.degree`}
                value={item.degree || 'Degree'}
                style={degreeStyle}
              />
            ) : (
              <span style={degreeStyle}>{item.degree}</span>
            )}
            {education.showField && (editable || item.field) && (
              editable ? (
                <>
                  <span style={fieldStyle}>in</span>
                  <InlineEditableText
                    path={`education.${index}.field`}
                    value={item.field || 'Field'}
                    style={fieldStyle}
                  />
                </>
              ) : (
                <span style={fieldStyle}>in {item.field}</span>
              )
            )}
            <span style={{ color: colors.text.muted }}>•</span>
            {editable ? (
              <InlineEditableText
                path={`education.${index}.school`}
                value={item.school || 'School'}
                style={schoolStyle}
              />
            ) : (
              <span style={schoolStyle}>{item.school}</span>
            )}
            {(editable || item.location) && (
              <>
                <span style={{ color: colors.text.muted }}>•</span>
                {editable ? (
                  <InlineEditableText
                    path={`education.${index}.location`}
                    value={item.location || 'Location'}
                    style={dateStyle}
                  />
                ) : (
                  <span style={dateStyle}>{item.location}</span>
                )}
              </>
            )}
          </div>
          {renderDates()}
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
              <h3 style={degreeStyle}>
                {item.degree}
                {education.showField && item.field && ` in ${item.field}`}
              </h3>
              <span style={schoolStyle}>{item.school}</span>
            </div>
            <div className="text-right flex-shrink-0">
              {renderDates()}
            </div>
          </div>
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
              <h3 style={degreeStyle}>
                {item.degree}
                {education.showField && item.field && ` in ${item.field}`}
              </h3>
              <span style={schoolStyle}>{item.school}</span>
            </div>
            <div className="text-right flex-shrink-0">
              {renderDates()}
            </div>
          </div>
          
          {education.showGPA && item.gpa && (
            <p style={{ ...fieldStyle, marginTop: '8px' }}>GPA: {item.gpa}</p>
          )}
        </div>
      );
    }

    // Minimal variant
    return (
      <div key={item.id} style={itemStyle}>
        <h3 style={degreeStyle}>{item.degree}</h3>
        <span style={schoolStyle}>{item.school}</span>
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
            {editable && onRemoveEducation && (
              <button
                onClick={() => onRemoveEducation(item.id)}
                className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
                title="Remove education"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            )}
          </div>
        ))}
        
        {/* Add Education Button */}
        {editable && onAddEducation && (
          <button
            onClick={onAddEducation}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accent, borderColor: accent }}
          >
            <Plus className="h-3 w-3" />
            Add Education
          </button>
        )}
      </div>
    </section>
  );
};

export default EducationSection;
