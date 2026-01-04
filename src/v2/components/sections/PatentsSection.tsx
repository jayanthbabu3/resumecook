/**
 * Patents Section Component (V2)
 * 
 * Renders patents and intellectual property.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { Plus, X, FileText, ExternalLink } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface PatentItem {
  id: string;
  title: string;
  patentNumber: string;
  date: string;
  status: 'Pending' | 'Granted' | 'Published';
  inventors?: string[];
  description?: string;
  url?: string;
}

interface PatentsSectionProps {
  items: PatentItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
}

export const PatentsSection: React.FC<PatentsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Patents',
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

  const statusColors: Record<string, string> = {
    Pending: '#f59e0b',
    Granted: '#10b981',
    Published: '#3b82f6',
  };

  const renderItem = (item: PatentItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ marginBottom: index < items.length - 1 ? spacing.itemGap : 0 }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
            {editable ? (
              <InlineEditableText
                path={`patents.${index}.title`}
                value={item.title}
                as="h3"
                style={titleStyle}
                placeholder="Patent Title"
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
          
          <div className="flex items-center gap-2 mt-1">
            {editable ? (
              <InlineEditableText
                path={`patents.${index}.patentNumber`}
                value={item.patentNumber || ''}
                style={{ ...typography.small, color: typography.small.color }}
                placeholder="Patent Number"
              />
            ) : (
              <span style={{ ...typography.small, color: typography.small.color }}>
                {item.patentNumber}
              </span>
            )}
            {editable ? (
              <InlineEditableText
                path={`patents.${index}.status`}
                value={item.status || 'Pending'}
                style={{
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  backgroundColor: `${statusColors[item.status] || '#f59e0b'}20`,
                  color: statusColors[item.status] || '#f59e0b',
                  fontWeight: 500,
                }}
                placeholder="Status"
              />
            ) : (
              <span
                style={{
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  backgroundColor: `${statusColors[item.status]}20`,
                  color: statusColors[item.status],
                  fontWeight: 500,
                }}
              >
                {item.status}
              </span>
            )}
          </div>

          {(item.inventors?.length > 0 || editable) && (
            <div style={{ ...typography.small, color: typography.small.color, marginTop: '2px' }}>
              <span>Inventors: </span>
              {editable ? (
                <InlineEditableText
                  path={`patents.${index}.inventors`}
                  value={item.inventors?.join(', ') || ''}
                  style={{ ...typography.small, color: typography.small.color }}
                  placeholder="Inventor names (comma-separated)"
                />
              ) : (
                item.inventors?.join(', ')
              )}
            </div>
          )}

          {/* Editable URL */}
          {editable && (
            <div className="flex items-center gap-1" style={{ ...typography.small, color: accent, marginTop: '2px' }}>
              <ExternalLink className="w-3 h-3" />
              <InlineEditableText
                path={`patents.${index}.url`}
                value={item.url || ''}
                style={{ ...typography.small, color: accent }}
                placeholder="Patent URL (optional)"
              />
            </div>
          )}
        </div>

        <div style={dateStyle} className="flex-shrink-0">
          {editable ? (
            <InlineEditableDate
              path={`patents.${index}.date`}
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
              path={`patents.${index}.description`}
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
            Add Patent
          </button>
        )}
      </div>
    </section>
  );
};

export default PatentsSection;
