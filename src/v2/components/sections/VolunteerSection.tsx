/**
 * Volunteer Section Component (V2)
 * 
 * Renders volunteer experience.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { Plus, X, Heart } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  highlights?: string[];
}

interface VolunteerSectionProps {
  items: VolunteerItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Volunteer Experience',
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

  const renderItem = (item: VolunteerItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ marginBottom: index < items.length - 1 ? spacing.itemGap : 0 }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
            {editable ? (
              <InlineEditableText
                path={`volunteer.${index}.role`}
                value={item.role}
                as="h3"
                style={titleStyle}
                placeholder="Role"
              />
            ) : (
              <h3 style={titleStyle}>{item.role}</h3>
            )}
          </div>
          
          {editable ? (
            <InlineEditableText
              path={`volunteer.${index}.organization`}
              value={item.organization}
              style={subtitleStyle}
              placeholder="Organization"
            />
          ) : (
            <div style={subtitleStyle}>{item.organization}</div>
          )}

          {(item.location || editable) && (
            <div style={{ ...typography.small, color: typography.small.color }}>
              {editable ? (
                <InlineEditableText
                  path={`volunteer.${index}.location`}
                  value={item.location || ''}
                  style={{ ...typography.small, color: typography.small.color }}
                  placeholder="Location (optional)"
                />
              ) : (
                item.location
              )}
            </div>
          )}
        </div>

        <div style={dateStyle} className="flex-shrink-0">
          {editable ? (
            <div className="flex items-center gap-1">
              <InlineEditableDate
                path={`volunteer.${index}.startDate`}
                value={item.startDate}
                style={dateStyle}
                formatDisplay={formatDate}
              />
              <span>-</span>
              {item.current ? (
                <span>Present</span>
              ) : (
                <InlineEditableDate
                  path={`volunteer.${index}.endDate`}
                  value={item.endDate}
                  style={dateStyle}
                  formatDisplay={formatDate}
                />
              )}
            </div>
          ) : (
            <span>
              {formatDate(item.startDate)} - {item.current ? 'Present' : formatDate(item.endDate)}
            </span>
          )}
        </div>
      </div>

      {(item.description || editable) && (
        <div style={{ ...bodyStyle, marginTop: '6px' }}>
          {editable ? (
            <InlineEditableText
              path={`volunteer.${index}.description`}
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

      {item.highlights?.length > 0 && (
        <ul style={{ ...bodyStyle, marginTop: '6px', paddingLeft: '20px', margin: 0 }}>
          {item.highlights.map((highlight, hIndex) => (
            <li key={hIndex} style={{ marginBottom: spacing.bulletGap }}>
              {editable ? (
                <InlineEditableText
                  path={`volunteer.${index}.highlights.${hIndex}`}
                  value={highlight}
                  style={bodyStyle}
                />
              ) : (
                highlight
              )}
            </li>
          ))}
        </ul>
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
            Add Volunteer Experience
          </button>
        )}
      </div>
    </section>
  );
};

export default VolunteerSection;
