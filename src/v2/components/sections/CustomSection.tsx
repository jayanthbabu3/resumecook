/**
 * Resume Builder V2 - Custom Section Component
 * 
 * Flexible section for custom content.
 * V2 CustomSection uses items: CustomSectionItem[] where each item has:
 * { id, title?, content, date?, url? }
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import type { TemplateConfig, CustomSection as CustomSectionType, CustomSectionItem } from '../../types';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';

interface CustomSectionProps {
  section: CustomSectionType;
  sectionIndex: number;
  config: TemplateConfig;
  editable?: boolean;
  /** Show as list items with icons */
  showAsCards?: boolean;
  /** Custom icon component */
  icon?: React.ReactNode;
  /** Callback for adding items */
  onAddItem?: () => void;
  /** Callback for removing items */
  onRemoveItem?: (itemIndex: number) => void;
}

export const CustomSection: React.FC<CustomSectionProps> = ({
  section,
  sectionIndex,
  config,
  editable = false,
  showAsCards = false,
  icon,
  onAddItem,
  onRemoveItem,
}) => {
  const { typography, colors, spacing } = config;
  const accent = colors.primary;

  const textStyle: React.CSSProperties = {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
    lineHeight: typography.body.lineHeight,
    color: typography.body.color,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: typography.itemTitle.fontSize,
    fontWeight: typography.itemTitle.fontWeight,
    lineHeight: typography.itemTitle.lineHeight,
    color: typography.itemTitle.color,
    margin: 0,
  };

  const items = section.items || [];

  if (!items.length && !editable) return null;

  const renderItem = (item: CustomSectionItem, index: number) => (
    <div
      key={item.id}
      className="group relative"
      style={{ marginBottom: index < items.length - 1 ? spacing.itemGap : 0 }}
    >
      <div className="flex gap-3 items-start">
        {showAsCards && icon && (
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accent}15` }}
          >
            <span style={{ color: accent }}>{icon}</span>
          </div>
        )}
        <div className="flex-1">
          {item.title && (
            editable ? (
              <InlineEditableText
                path={`customSections.${sectionIndex}.items.${index}.title`}
                value={item.title}
                as="h4"
                style={titleStyle}
                placeholder="Title"
              />
            ) : (
              <h4 style={titleStyle}>{item.title}</h4>
            )
          )}
          
          {editable ? (
            <InlineEditableText
              path={`customSections.${sectionIndex}.items.${index}.content`}
              value={item.content}
              style={{ ...textStyle, marginTop: item.title ? '2px' : 0 }}
              multiline
              placeholder="Content..."
            />
          ) : (
            <p style={{ ...textStyle, marginTop: item.title ? '2px' : 0, margin: 0 }}>
              {item.content}
            </p>
          )}

          {item.date && (
            <div style={{ ...typography.small, color: typography.dates.color, marginTop: '4px' }}>
              {item.date}
            </div>
          )}
        </div>
      </div>

      {editable && onRemoveItem && (
        <button
          onClick={() => onRemoveItem(index)}
          className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-100 hover:bg-red-200 rounded-full"
        >
          <X className="w-3 h-3 text-red-600" />
        </button>
      )}
    </div>
  );

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={section.title}
        editPath={editable ? `customSections.${sectionIndex}.title` : undefined}
        config={config}
        editable={editable}
        accentColor={accent}
      />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {items.map((item, index) => renderItem(item, index))}
        
        {editable && onAddItem && (
          <button
            onClick={onAddItem}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accent, borderColor: accent }}
          >
            <Plus className="h-3 w-3" />
            Add Item
          </button>
        )}
      </div>
    </section>
  );
};

export default CustomSection;
