/**
 * Resume Builder V2 - Education Section Component
 * 
 * Configurable education section with multiple variants.
 */

import React from 'react';
import type { TemplateConfig, EducationVariant, EducationItem } from '../../types';
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
  
  // Map variant IDs from sectionVariants.ts to internal variant names
  const mapVariantId = (variantId: string | undefined): EducationVariant => {
    if (!variantId) return education.variant;
    const variantMap: Record<string, EducationVariant> = {
      // Legacy prefixed variant IDs (from old system)
      'education-classic': 'standard',
      'education-modern': 'card',
      'education-minimal': 'minimal',
      'education-detailed': 'detailed',
      'education-timeline': 'timeline',
      'education-compact': 'compact',
      'education-honors': 'detailed',
      'education-boxed': 'card',
      'education-two-column': 'standard',
      'education-achievement': 'detailed',
      'education-sidebar-minimal': 'sidebar-minimal',
      // Simple variant IDs (from CORE_SECTIONS)
      'standard': 'standard',
      'compact': 'compact',
      'detailed': 'detailed',
      'timeline': 'timeline',
      'card': 'card',
      'minimal': 'minimal',
    };
    return variantMap[variantId] || education.variant;
  };
  
  const variant = mapVariantId(variantOverride);
  const accent = colors.primary;

  // Get style options for date formatting and font scaling
  const styleContext = useStyleOptions();
  const formatDate = styleContext?.formatDate || ((date: string) => {
    // Fallback format if context not available
    if (!date) return '';
    // Handle year-only format (e.g., "2024")
    if (/^\d{4}$/.test(date)) {
      return `Jan ${date}`;
    }
    // Handle YYYY-MM format
    const [year, month] = date.split('-');
    if (!month) return date; // Return as-is if no month
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = parseInt(month) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${monthNames[monthIndex]} ${year}`;
    }
    return date;
  });
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  // Render single education item
  const renderItem = (item: EducationItem, index: number) => {
    const itemStyle: React.CSSProperties = {
      marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
      // Prevent individual items from breaking across pages
      pageBreakInside: 'avoid',
      breakInside: 'avoid',
    };

    const degreeStyle: React.CSSProperties = {
      fontSize: scaleFontSize(typography.itemTitle.fontSize),
      fontWeight: typography.itemTitle.fontWeight,
      lineHeight: typography.itemTitle.lineHeight,
      color: typography.itemTitle.color,
      margin: 0,
    };

    const schoolStyle: React.CSSProperties = {
      fontSize: scaleFontSize(typography.itemSubtitle.fontSize),
      fontWeight: typography.itemSubtitle.fontWeight,
      lineHeight: typography.itemSubtitle.lineHeight,
      color: colors.text.secondary,
      margin: 0,
    };

    const dateStyle: React.CSSProperties = {
      fontSize: scaleFontSize(typography.dates.fontSize),
      fontWeight: typography.dates.fontWeight,
      lineHeight: typography.dates.lineHeight,
      color: typography.dates.color,
    };

    const fieldStyle: React.CSSProperties = {
      fontSize: scaleFontSize(typography.body.fontSize),
      color: typography.body.color,
    };

    // Render dates
    const renderDates = () => {
      if (!education.showDates) return null;
      
      const dateText = `${formatDate(item.startDate)} - ${formatDate(item.endDate)}`;
      
      if (editable) {
        return (
          <div 
            className="flex items-center gap-1" 
            style={{
              ...dateStyle,
              whiteSpace: 'nowrap',
              display: 'flex',
              flexWrap: 'nowrap',
            }}
          >
            <InlineEditableDate
              path={`education.${index}.startDate`}
              value={item.startDate}
              style={{ ...dateStyle, whiteSpace: 'nowrap' }}
              formatDisplay={formatDate}
            />
            <span style={{ whiteSpace: 'nowrap' }}>-</span>
            <InlineEditableDate
              path={`education.${index}.endDate`}
              value={item.endDate}
              style={{ ...dateStyle, whiteSpace: 'nowrap' }}
              formatDisplay={formatDate}
            />
          </div>
        );
      }

      return (
        <span style={{ ...dateStyle, whiteSpace: 'nowrap', display: 'inline-block' }}>
          {dateText}
        </span>
      );
    };

    // Two-column-dates variant (dates/location on left, content on right)
    if (variant === 'two-column-dates') {
      const leftColumnStyle: React.CSSProperties = {
        width: '130px',
        minWidth: '130px',
        flexShrink: 0,
        paddingRight: '16px',
        textAlign: 'right',
      };

      return (
        <div key={item.id} style={itemStyle}>
          <div className="flex">
            {/* Left column - dates and location */}
            <div style={leftColumnStyle}>
              <div style={{ ...dateStyle, whiteSpace: 'nowrap' }}>
                {editable ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                    <InlineEditableDate
                      path={`education.${index}.startDate`}
                      value={item.startDate}
                      style={{ ...dateStyle, whiteSpace: 'nowrap' }}
                      formatDisplay={formatDate}
                    />
                    <span>-</span>
                    <InlineEditableDate
                      path={`education.${index}.endDate`}
                      value={item.endDate}
                      style={{ ...dateStyle, whiteSpace: 'nowrap' }}
                      formatDisplay={formatDate}
                    />
                  </div>
                ) : (
                  <span>{formatDate(item.startDate)} - {formatDate(item.endDate)}</span>
                )}
              </div>
              {item.location && (
                <div style={{ ...typography.small, color: typography.dates.color, marginTop: '4px' }}>
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

    // Compact variant - Clean two-line format
    // Line 1: Degree in Field                                    Dates
    // Line 2: School • Location
    if (variant === 'compact') {
      // Build degree text with field inline
      const renderDegreeWithField = () => {
        if (editable) {
          return (
            <div className="flex items-baseline gap-1 flex-wrap">
              <InlineEditableText
                path={`education.${index}.degree`}
                value={item.degree || 'Degree'}
                style={degreeStyle}
              />
              {education.showField && (
                <>
                  <span style={degreeStyle}>in</span>
                  <InlineEditableText
                    path={`education.${index}.field`}
                    value={item.field || 'Field'}
                    style={degreeStyle}
                  />
                </>
              )}
            </div>
          );
        }

        // Non-editable: combine degree and field
        let degreeText = item.degree || '';
        if (education.showField && item.field) {
          degreeText += ` in ${item.field}`;
        }
        return <span style={degreeStyle}>{degreeText}</span>;
      };

      // Build school with location inline
      const renderSchoolWithLocation = () => {
        if (editable) {
          return (
            <div className="flex items-baseline gap-2 flex-wrap">
              <InlineEditableText
                path={`education.${index}.school`}
                value={item.school || 'School'}
                style={schoolStyle}
              />
              {item.location && (
                <>
                  <span style={{ color: colors.text.muted }}>•</span>
                  <InlineEditableText
                    path={`education.${index}.location`}
                    value={item.location}
                    style={schoolStyle}
                  />
                </>
              )}
            </div>
          );
        }

        // Non-editable: combine school and location
        let schoolText = item.school || '';
        if (item.location) {
          schoolText += ` • ${item.location}`;
        }
        return <span style={schoolStyle}>{schoolText}</span>;
      };

      // Add separator line between entries (not before first entry)
      const showSeparator = index > 0;

      return (
        <div key={item.id} style={itemStyle}>
          {/* Subtle separator line between entries */}
          {showSeparator && (
            <div
              style={{
                borderTop: `1px solid ${colors.border}`,
                marginBottom: '10px',
                opacity: 0.5,
              }}
            />
          )}
          {/* First row: Degree in Field + Dates */}
          <div className="flex justify-between items-baseline gap-4">
            {renderDegreeWithField()}
            {renderDates()}
          </div>
          {/* Second row: School • Location */}
          <div style={{ marginTop: '2px' }}>
            {renderSchoolWithLocation()}
          </div>
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

              {editable ? (
                <InlineEditableText
                  path={`education.${index}.school`}
                  value={item.school}
                  style={schoolStyle}
                />
              ) : (
                <span style={schoolStyle}>{item.school}</span>
              )}

              {(editable || item.location) && (
                <div style={{ ...typography.small, color: typography.dates.color, marginTop: '2px' }}>
                  {editable ? (
                    <InlineEditableText
                      path={`education.${index}.location`}
                      value={item.location || ''}
                      style={{ ...typography.small, color: typography.dates.color }}
                      placeholder="Location"
                    />
                  ) : (
                    item.location
                  )}
                </div>
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

                {(editable || item.location) && (
                  <>
                    <span style={{ color: colors.text.muted }}>•</span>
                    {editable ? (
                      <InlineEditableText
                        path={`education.${index}.location`}
                        value={item.location || ''}
                        style={dateStyle}
                        placeholder="Location"
                      />
                    ) : (
                      <span style={dateStyle}>{item.location}</span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              {renderDates()}
            </div>
          </div>

          {education.showGPA && (editable || item.gpa) && (
            <div style={{ ...fieldStyle, marginTop: '8px' }} className="flex items-center gap-1">
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

    // Sidebar-minimal variant - Clean, space-efficient for sidebars
    // Line 1: Degree • Year
    // Line 2: Institution (smaller)
    if (variant === 'sidebar-minimal') {
      // Extract just the year from dates
      const getYear = (dateStr: string) => {
        if (!dateStr) return '';
        const [year] = dateStr.split('-');
        return year;
      };

      const startYear = getYear(item.startDate);
      const endYear = getYear(item.endDate);
      const yearDisplay = startYear === endYear ? startYear : `${startYear} - ${endYear}`;

      // Compact degree style
      const compactDegreeStyle: React.CSSProperties = {
        fontSize: scaleFontSize('12px'),
        fontWeight: 600,
        lineHeight: 1.3,
        color: typography.itemTitle.color,
        margin: 0,
      };

      // Compact school style (smaller, muted)
      const compactSchoolStyle: React.CSSProperties = {
        fontSize: scaleFontSize('11px'),
        fontWeight: 400,
        lineHeight: 1.3,
        color: colors.text.muted,
        margin: 0,
      };

      // Year style
      const yearStyle: React.CSSProperties = {
        fontSize: scaleFontSize('10px'),
        fontWeight: 500,
        color: colors.text.muted,
        whiteSpace: 'nowrap',
      };

      return (
        <div key={item.id} style={{ ...itemStyle, marginBottom: index < items.length - 1 ? '10px' : 0 }}>
          {/* Line 1: Degree • Year */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
            {editable ? (
              <InlineEditableText
                path={`education.${index}.degree`}
                value={item.degree || 'Degree'}
                style={compactDegreeStyle}
              />
            ) : (
              <span style={compactDegreeStyle}>{item.degree}</span>
            )}
            {education.showDates && (
              <span style={yearStyle}>{yearDisplay}</span>
            )}
          </div>
          {/* Line 2: Institution */}
          <div style={{ marginTop: '2px' }}>
            {editable ? (
              <InlineEditableText
                path={`education.${index}.school`}
                value={item.school}
                style={compactSchoolStyle}
              />
            ) : (
              <span style={compactSchoolStyle}>{item.school}</span>
            )}
          </div>
        </div>
      );
    }

    // Minimal variant
    return (
      <div key={item.id} style={itemStyle}>
        {editable ? (
          <InlineEditableText
            path={`education.${index}.degree`}
            value={item.degree || 'Degree'}
            as="h3"
            style={degreeStyle}
          />
        ) : (
          <h3 style={degreeStyle}>{item.degree}</h3>
        )}
        {editable ? (
          <InlineEditableText
            path={`education.${index}.school`}
            value={item.school}
            style={schoolStyle}
          />
        ) : (
          <span style={schoolStyle}>{item.school}</span>
        )}
        {renderDates()}
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
