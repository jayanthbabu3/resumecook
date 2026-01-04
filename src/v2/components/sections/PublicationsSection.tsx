/**
 * Publications Section Component (V2)
 * 
 * Renders publications, papers, and articles.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { Plus, X, BookOpen, ExternalLink } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  authors?: string[];
  url?: string;
  doi?: string;
  description?: string;
}

interface PublicationsSectionProps {
  items: PublicationItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Publications',
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

  const renderItem = (item: PublicationItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ marginBottom: index < items.length - 1 ? spacing.itemGap : 0 }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
            {editable ? (
              <InlineEditableText
                path={`publications.${index}.title`}
                value={item.title}
                as="h3"
                style={titleStyle}
                placeholder="Publication Title"
              />
            ) : (
              <h3 style={titleStyle}>{item.title}</h3>
            )}
            {!editable && item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          
          {editable ? (
            <InlineEditableText
              path={`publications.${index}.publisher`}
              value={item.publisher}
              style={subtitleStyle}
              placeholder="Publisher / Journal"
            />
          ) : (
            <div style={subtitleStyle}>{item.publisher}</div>
          )}

          {(item.authors?.length > 0 || editable) && (
            <div style={{ ...typography.small, color: typography.small.color, marginTop: '2px' }}>
              {editable ? (
                <InlineEditableText
                  path={`publications.${index}.authors`}
                  value={item.authors?.join(', ') || ''}
                  style={{ ...typography.small, color: typography.small.color }}
                  placeholder="Authors (comma-separated)"
                />
              ) : (
                item.authors?.join(', ')
              )}
            </div>
          )}

          {/* Editable URL */}
          {editable && (
            <div style={{ ...typography.small, color: accent, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
              <InlineEditableText
                path={`publications.${index}.url`}
                value={item.url || ''}
                style={{ ...typography.small, color: accent }}
                placeholder="Publication URL (optional)"
              />
            </div>
          )}
        </div>

        <div style={dateStyle} className="flex-shrink-0">
          {editable ? (
            <InlineEditableDate
              path={`publications.${index}.date`}
              value={item.date}
              style={dateStyle}
              formatDisplay={formatDate}
            />
          ) : (
            formatDate(item.date)
          )}
        </div>
      </div>

      {(item.description || editable) && (
        <div style={{ ...bodyStyle, marginTop: '4px' }}>
          {editable ? (
            <InlineEditableText
              path={`publications.${index}.description`}
              value={item.description || ''}
              style={bodyStyle}
              multiline
              placeholder="Description (optional)..."
            />
          ) : (
            item.description
          )}
        </div>
      )}

      {(item.doi || editable) && (
        <div style={{ ...typography.small, color: typography.small.color, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>DOI:</span>
          {editable ? (
            <InlineEditableText
              path={`publications.${index}.doi`}
              value={item.doi || ''}
              style={{ ...typography.small, color: typography.small.color }}
              placeholder="DOI (optional)"
            />
          ) : (
            item.doi
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
            Add Publication
          </button>
        )}
      </div>
    </section>
  );
};

export default PublicationsSection;
