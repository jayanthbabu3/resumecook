/**
 * Awards Section Component (V2)
 * 
 * Renders awards and honors.
 */

import React from 'react';
import type { TemplateConfig } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { Plus, X, Award } from 'lucide-react';
import { useStyleOptions } from '@/contexts/StyleOptionsContext';

interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

interface AwardsSectionProps {
  items: AwardItem[];
  config: TemplateConfig;
  editable?: boolean;
  sectionTitle?: string;
  onAddItem?: () => void;
  onRemoveItem?: (id: string) => void;
  variantOverride?: string;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({
  items,
  config,
  editable = false,
  sectionTitle = 'Awards',
  onAddItem,
  onRemoveItem,
  variantOverride,
}) => {
  const { typography, spacing, colors } = config;
  const accent = colors.primary;
  
  // Map variant IDs from sectionVariants.ts to internal variant names
  const mapVariantId = (variantId: string | undefined): string => {
    if (!variantId) return 'classic';
    const variantMap: Record<string, string> = {
      'awards-classic': 'classic',
      'awards-modern': 'modern',
      'awards-icon': 'icon',
      'awards-timeline': 'timeline',
      'awards-minimal': 'minimal',
      'awards-detailed': 'detailed',
      'awards-compact': 'compact',
      'awards-boxed': 'boxed',
      'awards-two-column': 'two-column',
      'awards-highlight': 'highlight',
    };
    return variantMap[variantId] || 'classic';
  };
  
  const variant = mapVariantId(variantOverride);

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

  const renderItem = (item: AwardItem, index: number) => (
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
            <Award className="w-4 h-4 flex-shrink-0" style={{ color: accent }} />
            {editable ? (
              <InlineEditableText
                path={`awards.${index}.title`}
                value={item.title}
                as="h3"
                style={titleStyle}
                placeholder="Award Title"
              />
            ) : (
              <h3 style={titleStyle}>{item.title}</h3>
            )}
          </div>
          
          {editable ? (
            <InlineEditableText
              path={`awards.${index}.issuer`}
              value={item.issuer}
              style={subtitleStyle}
              placeholder="Issuing Organization"
            />
          ) : (
            <div style={subtitleStyle}>{item.issuer}</div>
          )}
        </div>

        <div style={dateStyle} className="flex-shrink-0">
          {editable ? (
            <InlineEditableDate
              path={`awards.${index}.date`}
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
              path={`awards.${index}.description`}
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
            Add Award
          </button>
        )}
      </div>
    </section>
  );
};

export default AwardsSection;
