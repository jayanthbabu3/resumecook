/**
 * Courses Section Component (V2)
 * 
 * Renders courses and training.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { Plus, X, GraduationCap, ExternalLink, CheckCircle } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface CourseItem {
  id: string;
  name: string;
  provider: string;
  date: string;
  url?: string;
  certificate?: boolean;
  description?: string;
}

interface CoursesSectionProps {
  items: CourseItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Courses & Training',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { typography, spacing, colors } = config;
  const accent = colors.primary;
  
  // Map variant IDs
  const mapVariantId = (variantId: string | undefined): string => {
    if (!variantId) return 'classic';
    const variantMap: Record<string, string> = {
      'course-classic': 'classic',
      'course-compact': 'compact',
      'course-minimal': 'minimal',
    };
    return variantMap[variantId] || variantId;
  };
  
  const variant = mapVariantId(variantOverride || (config as any).courses?.variant);

  const styleContext = useStyleOptions();
  const formatDate = styleContext?.formatDate || ((date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  });

  if (!items?.length && !editable) return null;

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
    color: accent,
  };

  const dateStyle: React.CSSProperties = {
    fontSize: typography.dates.fontSize,
    fontWeight: typography.dates.fontWeight,
    color: typography.dates.color,
  };

  const bodyStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
  };

  // Compact variant - clean layout for sidebars, no inline icon
  const renderCompactItem = (item: CourseItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ 
        marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {editable ? (
            <InlineEditableText
              path={`courses.${index}.name`}
              value={item.name}
              as="h3"
              style={titleStyle}
              placeholder="Course Name"
            />
          ) : (
            <h3 style={titleStyle}>
              {item.name}
              {item.certificate && (
                <CheckCircle className="w-3 h-3 inline ml-1.5" style={{ color: '#10b981' }} />
              )}
            </h3>
          )}
        </div>
        
        <div style={{ ...dateStyle, flexShrink: 0 }}>
          {editable ? (
            <InlineEditableDate
              path={`courses.${index}.date`}
              value={item.date}
              style={dateStyle}
              formatDisplay={formatDate}
            />
          ) : (
            formatDate(item.date)
          )}
        </div>
      </div>
      
      {editable ? (
        <InlineEditableText
          path={`courses.${index}.provider`}
          value={item.provider}
          style={subtitleStyle}
          placeholder="Provider"
        />
      ) : (
        <div style={subtitleStyle}>{item.provider}</div>
      )}

      {item.description && (
        <div style={{ ...bodyStyle, marginTop: '4px' }}>
          {editable ? (
            <InlineEditableText
              path={`courses.${index}.description`}
              value={item.description}
              style={bodyStyle}
              multiline
              placeholder="Description..."
            />
          ) : (
            item.description
          )}
        </div>
      )}

      {editable && onRemoveItem && (
        <button
          onClick={() => onRemoveItem(item.id)}
          className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
        >
          <X className="w-3 h-3 text-red-600" />
        </button>
      )}
    </div>
  );

  // Default/Classic variant - with icon in separate column for proper alignment
  const renderItem = (item: CourseItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ 
        marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      <div className="flex gap-3">
        {/* Icon column - fixed width for alignment */}
        <div className="flex-shrink-0 pt-0.5">
          <GraduationCap className="w-4 h-4" style={{ color: accent }} />
        </div>
        
        {/* Content column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {editable ? (
                <InlineEditableText
                  path={`courses.${index}.name`}
                  value={item.name}
                  as="h3"
                  style={titleStyle}
                  placeholder="Course Name"
                />
              ) : (
                <h3 style={titleStyle}>
                  {item.name}
                  {item.certificate && (
                    <CheckCircle className="w-3 h-3 inline ml-1.5" style={{ color: '#10b981' }} />
                  )}
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: accent, marginLeft: '6px' }}>
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  )}
                </h3>
              )}
            </div>
            
            <div style={{ ...dateStyle, flexShrink: 0 }}>
              {editable ? (
                <InlineEditableDate
                  path={`courses.${index}.date`}
                  value={item.date}
                  style={dateStyle}
                  formatDisplay={formatDate}
                />
              ) : (
                formatDate(item.date)
              )}
            </div>
          </div>
          
          {editable ? (
            <InlineEditableText
              path={`courses.${index}.provider`}
              value={item.provider}
              style={subtitleStyle}
              placeholder="Provider (e.g., Coursera, Udemy)"
            />
          ) : (
            <div style={subtitleStyle}>{item.provider}</div>
          )}

          {item.description && (
            <div style={{ ...bodyStyle, marginTop: '4px' }}>
              {editable ? (
                <InlineEditableText
                  path={`courses.${index}.description`}
                  value={item.description}
                  style={bodyStyle}
                  multiline
                  placeholder="Description..."
                />
              ) : (
                item.description
              )}
            </div>
          )}
        </div>
      </div>

      {editable && onRemoveItem && (
        <button
          onClick={() => onRemoveItem(item.id)}
          className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
        >
          <X className="w-3 h-3 text-red-600" />
        </button>
      )}
    </div>
  );

  // Choose render function based on variant
  const renderFunction = variant === 'compact' || variant === 'minimal' ? renderCompactItem : renderItem;

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {(items || []).map((item, index) => renderFunction(item, index))}
        
        {editable && onAddItem && (
          <button
            onClick={onAddItem}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accent, borderColor: accent }}
          >
            <Plus className="h-3 w-3" />
            Add Course
          </button>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
