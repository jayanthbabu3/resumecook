/**
 * Speaking Section Component (V2)
 * 
 * Renders speaking engagements and conferences.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { Plus, X, Mic, ExternalLink, MapPin } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface SpeakingItem {
  id: string;
  event: string;
  topic: string;
  date: string;
  location?: string;
  url?: string;
  description?: string;
}

type SpeakingVariant = 'standard' | 'cards' | 'compact';

interface SpeakingSectionProps {
  items: SpeakingItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const SpeakingSection: React.FC<SpeakingSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Speaking',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const variant: SpeakingVariant = (variantOverride as SpeakingVariant) || 'standard';
  const { typography, spacing, colors } = config;
  const accent = colors.primary;

  const styleContext = useStyleOptions();
  const scaleFontSize = styleContext?.scaleFontSize || ((s: string) => s);
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

  // Standard variant - full layout with icons
  const renderStandardItem = (item: SpeakingItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ marginBottom: index < items.length - 1 ? spacing.itemGap : 0 }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
            {editable ? (
              <InlineEditableText
                path={`speaking.${index}.topic`}
                value={item.topic}
                as="h3"
                style={titleStyle}
                placeholder="Talk Topic"
              />
            ) : (
              <h3 style={titleStyle}>{item.topic}</h3>
            )}
            {!editable && item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {editable ? (
            <InlineEditableText
              path={`speaking.${index}.event`}
              value={item.event}
              style={subtitleStyle}
              placeholder="Event / Conference"
            />
          ) : (
            <div style={subtitleStyle}>{item.event}</div>
          )}

          {(item.location || editable) && (
            <div className="flex items-center gap-1" style={{ ...typography.small, color: typography.small.color }}>
              <MapPin className="w-3 h-3" />
              {editable ? (
                <InlineEditableText
                  path={`speaking.${index}.location`}
                  value={item.location || ''}
                  style={{ ...typography.small, color: typography.small.color }}
                  placeholder="Location (optional)"
                />
              ) : (
                item.location
              )}
            </div>
          )}

          {/* Editable URL */}
          {editable && (
            <div className="flex items-center gap-1" style={{ ...typography.small, color: accent, marginTop: '2px' }}>
              <ExternalLink className="w-3 h-3" />
              <InlineEditableText
                path={`speaking.${index}.url`}
                value={item.url || ''}
                style={{ ...typography.small, color: accent }}
                placeholder="Event URL (optional)"
              />
            </div>
          )}
        </div>

        <div style={dateStyle} className="flex-shrink-0">
          {editable ? (
            <InlineEditableDate
              path={`speaking.${index}.date`}
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
              path={`speaking.${index}.description`}
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

  // Compact variant - single line per item
  const renderCompactItem = (item: SpeakingItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        marginBottom: index < items.length - 1 ? spacing.bulletGap : 0,
        fontSize: typography.body.fontSize,
      }}
    >
      <span style={{ color: accent, fontWeight: 600 }}>•</span>
      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'baseline' }}>
        {editable ? (
          <InlineEditableText
            path={`speaking.${index}.topic`}
            value={item.topic}
            style={{ fontWeight: 600, color: typography.itemTitle.color }}
            placeholder="Topic"
          />
        ) : (
          <span style={{ fontWeight: 600, color: typography.itemTitle.color }}>{item.topic}</span>
        )}
        <span style={{ color: typography.body.color }}>—</span>
        {editable ? (
          <InlineEditableText
            path={`speaking.${index}.event`}
            value={item.event}
            style={{ color: accent }}
            placeholder="Event"
          />
        ) : (
          <span style={{ color: accent }}>{item.event}</span>
        )}
        {item.location && (
          <span style={{ color: typography.dates.color }}>({item.location})</span>
        )}
      </div>
      <div style={{ ...dateStyle, flexShrink: 0 }}>
        {editable ? (
          <InlineEditableDate
            path={`speaking.${index}.date`}
            value={item.date}
            formatDisplay={formatDate}
          />
        ) : (
          formatDate(item.date)
        )}
      </div>
      {editable && onRemoveItem && (
        <button
          onClick={() => onRemoveItem(item.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-100 rounded"
        >
          <X className="w-3 h-3 text-red-500" />
        </button>
      )}
    </div>
  );

  // Cards variant - card-based layout
  const renderCardsItem = (item: SpeakingItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e5e7eb',
        marginBottom: index < items.length - 1 ? '12px' : 0,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: `${accent}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Mic className="w-4 h-4" style={{ color: accent }} />
        </div>
        <div style={{ flex: 1 }}>
          {editable ? (
            <InlineEditableText
              path={`speaking.${index}.topic`}
              value={item.topic}
              as="h3"
              style={{ ...titleStyle, marginBottom: '2px' }}
              placeholder="Talk Topic"
            />
          ) : (
            <h3 style={{ ...titleStyle, marginBottom: '2px' }}>{item.topic}</h3>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {editable ? (
              <InlineEditableText
                path={`speaking.${index}.event`}
                value={item.event}
                style={{ ...subtitleStyle, fontSize: '13px' }}
                placeholder="Event"
              />
            ) : (
              <span style={{ ...subtitleStyle, fontSize: '13px' }}>{item.event}</span>
            )}
            <span style={{ ...dateStyle, fontSize: scaleFontSize(typography.dates.fontSize) }}>
              {editable ? (
                <InlineEditableDate
                  path={`speaking.${index}.date`}
                  value={item.date}
                  formatDisplay={formatDate}
                />
              ) : (
                formatDate(item.date)
              )}
            </span>
          </div>
          {item.location && (
            <div className="flex items-center gap-1 mt-1" style={{ fontSize: scaleFontSize(typography.dates.fontSize), color: typography.body.color }}>
              <MapPin className="w-3 h-3" />
              {editable ? (
                <InlineEditableText
                  path={`speaking.${index}.location`}
                  value={item.location}
                  style={{ fontSize: scaleFontSize(typography.dates.fontSize), color: typography.body.color }}
                  placeholder="Location"
                />
              ) : (
                item.location
              )}
            </div>
          )}
          {item.description && (
            <div style={{ ...bodyStyle, fontSize: '13px', marginTop: '8px' }}>
              {editable ? (
                <InlineEditableText
                  path={`speaking.${index}.description`}
                  value={item.description}
                  style={{ ...bodyStyle, fontSize: '13px' }}
                  multiline
                  placeholder="Description"
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
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
        >
          <X className="w-3 h-3 text-red-600" />
        </button>
      )}
    </div>
  );

  // Choose render function based on variant
  const renderItem = variant === 'cards' ? renderCardsItem : variant === 'compact' ? renderCompactItem : renderStandardItem;

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
            Add Speaking Engagement
          </button>
        )}
      </div>
    </section>
  );
};

export default SpeakingSection;
