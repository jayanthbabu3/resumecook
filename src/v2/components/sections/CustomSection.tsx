/**
 * Resume Builder V2 - Custom Section Component
 * 
 * Flexible section for custom content like Strengths, Achievements, etc.
 * Supports both paragraph content and list items.
 */

import React from 'react';
import { X, Plus } from 'lucide-react';
import type { TemplateConfig } from '../../types';
import type { CustomSection as CustomSectionType } from '@/types/resume';
import { SectionHeading } from './SectionHeading';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableSectionItems } from '@/components/resume/InlineEditableSectionItems';

interface CustomSectionProps {
  section: CustomSectionType;
  sectionIndex: number;
  config: TemplateConfig;
  editable?: boolean;
  /** Show as list items with icons */
  showAsCards?: boolean;
  /** Custom icon component */
  icon?: React.ReactNode;
  /** Callback for adding items (optional, uses context if not provided) */
  onAddItem?: () => void;
  /** Callback for removing items (optional, uses context if not provided) */
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

  // Parse items from content if items array is empty
  const items = section.items?.length 
    ? section.items 
    : section.content?.split('\n').filter(line => line.trim()) || [];

  // Check if content is a quote (has attribution)
  const isQuote = section.content?.includes('—') || section.content?.includes('–');

  // Render content based on type
  const renderContent = () => {
    // If it's a quote/philosophy section
    if (isQuote && !section.items?.length) {
      const lines = section.content?.split('\n').filter(line => line.trim()) || [];
      const quote = lines[0] || '';
      const attribution = lines.find(line => line.startsWith('—') || line.startsWith('–')) || '';
      
      return (
        <div>
          <p
            style={{
              ...textStyle,
              fontStyle: 'italic',
              color: accent,
              marginBottom: '8px',
            }}
          >
            {quote}
          </p>
          {attribution && (
            <p style={{ ...textStyle, fontSize: typography.small.fontSize }}>
              {attribution}
            </p>
          )}
        </div>
      );
    }

    // If showing as cards with icons (like Strengths section)
    // Use InlineEditableSectionItems for consistency and add/remove functionality
    if (showAsCards) {
      return (
        <div className="space-y-3">
          {items.length > 0 && items.map((item, index) => {
            // Parse item: "Title - Description" format
            const parts = item.split(' - ');
            const title = parts[0] || item;
            const description = parts.slice(1).join(' - ');

            return (
              <div key={index} className="group flex gap-3 items-start">
                {icon && (
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${accent}15` }}
                  >
                    <span style={{ color: accent }}>{icon}</span>
                  </div>
                )}
                <div className="flex-1">
                  {editable ? (
                    <div className="flex items-start gap-2">
                      <InlineEditableText
                        path={`sections.${sectionIndex}.items.${index}`}
                        value={item}
                        style={textStyle}
                        className="flex-1"
                      />
                      {onRemoveItem && (
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-red-500 hover:bg-red-50"
                          title="Remove item"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      {description ? (
                        <>
                          <h4 style={titleStyle}>{title}</h4>
                          <p style={{ ...textStyle, marginTop: '2px' }}>{description}</p>
                        </>
                      ) : (
                        <p style={textStyle}>{item}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
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
      );
    }

    // Default: Use InlineEditableSectionItems for list content (like Achievements)
    // This component handles add/remove via context, so we don't need callbacks here
    if (!showAsCards && (items.length > 0 || editable)) {
      const sectionItems = section.items || [];
      console.log('[CustomSection] Rendering InlineEditableSectionItems', {
        sectionIndex,
        sectionId: section.id,
        sectionTitle: section.title,
        itemsLength: items.length,
        sectionItemsLength: sectionItems.length,
        items,
        sectionItems,
        sectionData: section,
        editable
      });
      
      return (
        <InlineEditableSectionItems
          key={`${section.id}-${sectionItems.length}`} // Force re-render when items change
          sectionIndex={sectionIndex}
          items={sectionItems}
          content={section.content || ''}
          editable={editable}
          itemStyle={textStyle}
          addButtonLabel="Add Item"
          placeholder="Click to add item..."
          accentColor={accent}
          showBullets={false}
        />
      );
    }

    // Plain text content
    if (section.content) {
      return (
        <div>
          {editable ? (
            <InlineEditableText
              path={`sections.${sectionIndex}.content`}
              value={section.content}
              as="p"
              style={textStyle}
              multiline
            />
          ) : (
            <p style={textStyle}>{section.content}</p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <section style={{ marginBottom: spacing.sectionGap }}>
      <SectionHeading
        title={section.title}
        editPath={editable ? `sections.${sectionIndex}.title` : undefined}
        config={config}
        editable={editable}
        accentColor={accent}
      />
      
      <div style={{ marginTop: spacing.headingToContent }}>
        {renderContent()}
      </div>
    </section>
  );
};

export default CustomSection;
