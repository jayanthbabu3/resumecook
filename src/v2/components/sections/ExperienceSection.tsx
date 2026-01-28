/**
 * Resume Builder V2 - Experience Section Component
 * 
 * Configurable experience section with multiple variants:
 * - standard: Full details with bullets
 * - compact: Condensed layout
 * - timeline: Visual timeline on left
 * - card: Card-style entries
 * - minimal: Essential info only
 * - two-column-dates: Dates/location on left column
 * - accent-card: Lined header with accent strip
 * - accent-side: Left-accent column with stacked header rows
 */

import React from 'react';
import type { TemplateConfig, ExperienceVariant, ExperienceItem } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { Plus, X } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';
import { ExperienceVariantRenderer } from './variants/experience/ExperienceVariantRenderer';

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
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);

  // Use formatDate from StyleOptionsContext for consistency
  const formatDate = styleContext?.formatDate || ((date: string) => {
    // Fallback format if context not available
    if (!date) return '';
    // Handle year-only format (e.g., "2024")
    if (/^\d{4}$/.test(date)) {
      return `Jan ${date}`;
    }
    // Handle YYYY-MM format
    const [year, month] = date.split('-');
    if (!month) return date;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = parseInt(month) - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      return `${monthNames[monthIndex]} ${year}`;
    }
    return date;
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
      // Prevent individual items from breaking across pages
      pageBreakInside: 'avoid',
      breakInside: 'avoid',
    };

    const titleStyle: React.CSSProperties = {
      fontSize: scaleFontSize(typography.itemTitle.fontSize),
      fontWeight: typography.itemTitle.fontWeight,
      lineHeight: typography.itemTitle.lineHeight,
      color: typography.itemTitle.color,
      margin: 0,
    };

    const subtitleStyle: React.CSSProperties = {
      fontSize: scaleFontSize(typography.itemSubtitle.fontSize),
      fontWeight: typography.itemSubtitle.fontWeight,
      lineHeight: typography.itemSubtitle.lineHeight,
      color: accent,
      margin: 0,
    };

    const dateStyle: React.CSSProperties = {
      fontSize: scaleFontSize(typography.dates.fontSize),
      fontWeight: typography.dates.fontWeight,
      lineHeight: typography.dates.lineHeight,
      color: typography.dates.color,
    };

    const bodyStyle: React.CSSProperties = {
      fontSize: scaleFontSize(typography.body.fontSize),
      fontWeight: typography.body.fontWeight,
      lineHeight: typography.body.lineHeight,
      color: typography.body.color,
      textAlign: 'justify',
    };

    // Map bullet character to list-style-type
    const getListStyleType = () => {
      if (bulletChar === 'numbered') return 'decimal';
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
      paddingLeft: (bulletChar === 'none' || bulletChar === 'numbered') ? '20px' : '20px',
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

    // Accent side variant with left accent bar and stacked header rows
    if (variant === 'accent-side') {
      const locationText = item.location || 'Location';

      return (
        <div
          key={item.id}
          style={{
            marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
            paddingLeft: '14px',
            borderLeft: `4px solid ${accent}`,
          }}
        >
          <div
            style={{
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '14px 14px 12px',
              backgroundColor: colors.background.section,
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
            }}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.position`}
                    value={item.position}
                    as="h3"
                    style={{ ...titleStyle, marginBottom: '2px' }}
                  />
                ) : (
                  <h3 style={{ ...titleStyle, marginBottom: '2px' }}>{item.position}</h3>
                )}

                <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: colors.text.muted }}>
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.company`}
                      value={item.company}
                      style={subtitleStyle}
                    />
                  ) : (
                    <span style={subtitleStyle}>{item.company}</span>
                  )}

                  {experience.showLocation && (
                    <>
                      <span style={{ color: colors.text.muted }}>•</span>
                      {editable ? (
                        <InlineEditableText
                          path={`experience.${index}.location`}
                          value={item.location || ''}
                          placeholder="Location"
                          style={{ ...typography.small, color: typography.dates.color }}
                        />
                      ) : (
                        <span style={{ ...typography.small, color: typography.dates.color }}>{locationText}</span>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="text-right flex-shrink-0" style={{ paddingTop: '2px' }}>
                {renderDates()}
              </div>
            </div>

            {item.description && (
              <p style={{ ...bodyStyle, marginTop: '8px', marginBottom: '6px' }}>
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

            {renderBullets()}
          </div>
        </div>
      );
    }

    // Accent card variant with lined header and bordered body
    if (variant === 'accent-card') {
      const locationText = item.location || 'Location';

      return (
        <div
          key={item.id}
          style={{
            marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
            border: `1px solid ${colors.border}`,
            borderRadius: '10px',
            padding: '14px',
            backgroundColor: colors.background.section,
            boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: accent,
            }}
          />

          <div className="flex justify-between items-start gap-4" style={{ paddingTop: '6px' }}>
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

              <div className="flex flex-wrap items-center gap-2 mt-1">
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.company`}
                    value={item.company}
                    style={subtitleStyle}
                  />
                ) : (
                  <span style={subtitleStyle}>{item.company}</span>
                )}

                {experience.showLocation && (
                  <>
                    <span style={{ color: colors.text.muted }}>•</span>
                    {editable ? (
                      <InlineEditableText
                        path={`experience.${index}.location`}
                        value={item.location || ''}
                        placeholder="Location"
                        style={{ ...typography.small, color: typography.dates.color }}
                      />
                    ) : (
                      <span style={{ ...typography.small, color: typography.dates.color }}>{locationText}</span>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="text-right flex-shrink-0" style={{ paddingTop: '2px' }}>
              {renderDates()}
            </div>
          </div>

          {item.description && (
            <p style={{ ...bodyStyle, marginTop: '8px', marginBottom: '6px' }}>
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

          {renderBullets()}
        </div>
      );
    }

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
          {/* Entry Header - keep together for PDF page breaks */}
          <div data-entry-header="true" className="flex">
            {/* Left column - dates and location */}
            <div style={leftColumnStyle}>
              <div style={{ ...dateStyle, whiteSpace: 'nowrap' }}>
                {editable ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                    <InlineEditableDate
                      path={`experience.${index}.startDate`}
                      value={item.startDate}
                      style={{ ...dateStyle, whiteSpace: 'nowrap' }}
                      formatDisplay={formatDate}
                    />
                    <span>-</span>
                    {item.current ? (
                      <span>Present</span>
                    ) : (
                      <InlineEditableDate
                        path={`experience.${index}.endDate`}
                        value={item.endDate}
                        style={{ ...dateStyle, whiteSpace: 'nowrap' }}
                        formatDisplay={formatDate}
                      />
                    )}
                  </div>
                ) : (
                  <span>{formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}</span>
                )}
              </div>
              {experience.showLocation && item.location && (
                <div style={{ ...typography.small, color: typography.dates.color, marginTop: '4px' }}>
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.location`}
                      value={item.location}
                      style={{ ...typography.small, color: typography.dates.color }}
                      placeholder="Location"
                    />
                  ) : (
                    item.location
                  )}
                </div>
              )}
            </div>

            {/* Right column - job title and company (header part) */}
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
            </div>
          </div>
          {/* End Entry Header */}

          {/* Bullet points - can break across pages */}
          <div className="flex">
            {/* Empty left column spacer to align with header */}
            <div style={{ ...leftColumnStyle, visibility: 'hidden' }} aria-hidden="true" />
            {/* Right column - bullets */}
            <div className="flex-1 border-l-2 pl-4" style={{ borderColor: colors.border }}>
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
                {experience.showLocation && item.location && (
                  <>
                    <span style={{ color: colors.text.muted }}>•</span>
                    {editable ? (
                      <InlineEditableText
                        path={`experience.${index}.location`}
                        value={item.location}
                        style={{ ...typography.small, color: typography.dates.color }}
                        placeholder="Location"
                      />
                    ) : (
                      <span style={{ ...typography.small, color: typography.dates.color }}>{item.location}</span>
                    )}
                  </>
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

              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.company`}
                  value={item.company}
                  style={subtitleStyle}
                />
              ) : (
                <span style={subtitleStyle}>{item.company}</span>
              )}

              {experience.showLocation && (editable || item.location) && (
                <div style={{ ...typography.small, color: typography.dates.color, marginTop: '2px' }}>
                  {editable ? (
                    <InlineEditableText
                      path={`experience.${index}.location`}
                      value={item.location || ''}
                      style={{ ...typography.small, color: typography.dates.color }}
                      placeholder="Location"
                    />
                  ) : (
                    item.location
                  )}
                </div>
              )}
            </div>

            <div className="text-right flex-shrink-0">
              {renderDates()}
            </div>
          </div>

          {(item.description || editable) && (
            <p style={{ ...bodyStyle, marginTop: '6px', marginBottom: '4px' }}>
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.description`}
                  value={item.description || ''}
                  style={bodyStyle}
                  multiline
                  placeholder="Description (optional)..."
                />
              ) : (
                item.description
              )}
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

                {experience.showLocation && (editable || item.location) && (
                  <>
                    <span style={{ color: colors.text.muted }}>•</span>
                    {editable ? (
                      <InlineEditableText
                        path={`experience.${index}.location`}
                        value={item.location || ''}
                        style={{ ...typography.small, color: typography.dates.color }}
                        placeholder="Location"
                      />
                    ) : (
                      <span style={{ ...typography.small, color: typography.dates.color }}>{item.location}</span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              {renderDates()}
            </div>
          </div>

          {(item.description || editable) && (
            <p style={{ ...bodyStyle, marginTop: '8px' }}>
              {editable ? (
                <InlineEditableText
                  path={`experience.${index}.description`}
                  value={item.description || ''}
                  style={bodyStyle}
                  multiline
                  placeholder="Description (optional)..."
                />
              ) : (
                item.description
              )}
            </p>
          )}

          {renderBullets()}
        </div>
      );
    }

    // Compact variant
    return (
      <div key={item.id} style={itemStyle}>
        <div className="flex justify-between items-baseline gap-4">
          <div className="flex items-baseline gap-2 flex-wrap">
            {editable ? (
              <InlineEditableText
                path={`experience.${index}.position`}
                value={item.position}
                style={titleStyle}
              />
            ) : (
              <span style={titleStyle}>{item.position}</span>
            )}
            <span style={{ color: colors.text.muted }}>at</span>
            {editable ? (
              <InlineEditableText
                path={`experience.${index}.company`}
                value={item.company}
                style={subtitleStyle}
              />
            ) : (
              <span style={subtitleStyle}>{item.company}</span>
            )}
            {experience.showLocation && (editable || item.location) && (
              <>
                <span style={{ color: colors.text.muted }}>•</span>
                {editable ? (
                  <InlineEditableText
                    path={`experience.${index}.location`}
                    value={item.location || ''}
                    style={{ ...typography.small, color: typography.dates.color }}
                    placeholder="Location"
                  />
                ) : (
                  <span style={{ ...typography.small, color: typography.dates.color }}>{item.location}</span>
                )}
              </>
            )}
          </div>
          {renderDates()}
        </div>
        {renderBullets()}
      </div>
    );
  };

  // Use ExperienceVariantRenderer for supported variants
  const variantRendererVariants: ExperienceVariant[] = [
    'timeline',
    'cards',
    'standard',
    'compact',
    'modern',
    'minimal',
    'detailed',
    'left-border',
    'dates-left',
    'dates-right',
    'icon-accent',
    'icon-clean',
    'timeline-pro',
    'dots-timeline',
    'elegant-timeline',
    'clean-stacked',
    'enhanced',
    'premium',
  ];

  // If variant is specified and supported, use ExperienceVariantRenderer
  if (variant && variantRendererVariants.includes(variant)) {
    return (
      <section style={{ marginBottom: spacing.sectionGap }}>
        <SectionHeading
          title={sectionTitle}
          config={config}
          editable={editable}
          accentColor={accent}
        />
        <div style={{ marginTop: spacing.headingToContent }}>
          <ExperienceVariantRenderer
            variant={variant}
            items={items}
            config={config}
            accentColor={accent}
            editable={editable}
            onAddBulletPoint={onAddBulletPoint}
            onRemoveBulletPoint={onRemoveBulletPoint}
            onAddExperience={onAddExperience}
            onRemoveExperience={onRemoveExperience}
            formatDate={formatDate}
          />
        </div>
      </section>
    );
  }

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
          <div
            key={item.id}
            className="group relative pdf-experience-entry"
            data-experience-entry="true"
            data-entry-index={index}
          >
            {renderItem(item, index)}
            {editable && onRemoveExperience && (
              <button
                onClick={() => onRemoveExperience(item.id)}
                className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
                title="Remove experience"
              >
                <X className="w-3 h-3" style={{ color: '#dc2626' }} />
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
