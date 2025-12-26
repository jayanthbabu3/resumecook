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
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Courses & Training',
  onAddItem,
  onRemoveItem,
}) => {
  const { typography, spacing, colors } = config;
  const accent = colors.primary;

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

  const renderItem = (item: CourseItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ 
        marginBottom: index < items.length - 1 ? spacing.itemGap : 0,
        // Prevent individual items from breaking across pages
        pageBreakInside: 'avoid',
        breakInside: 'avoid',
      }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
            {editable ? (
              <InlineEditableText
                path={`courses.${index}.name`}
                value={item.name}
                as="h3"
                style={titleStyle}
                placeholder="Course Name"
              />
            ) : (
              <h3 style={titleStyle}>{item.name}</h3>
            )}
            {item.certificate && (
              <span title="Certificate earned">
                <CheckCircle className="w-3.5 h-3.5" style={{ color: '#10b981' }} />
              </span>
            )}
            {!editable && item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
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
        </div>

        <div style={dateStyle} className="flex-shrink-0">
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

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading title={sectionTitle} config={config} editable={editable} accentColor={accent} />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {(items || []).map((item, index) => renderItem(item, index))}
        
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
