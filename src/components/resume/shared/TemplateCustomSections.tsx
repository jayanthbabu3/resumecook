/**
 * TemplateCustomSections - Standardized custom sections for all templates
 * 
 * This component handles:
 * - Custom sections (Certifications, Awards, Projects, etc.)
 * - Add/remove section functionality
 * - Item-based content with add/remove
 * - Editable/non-editable modes
 * - Consistent styling via config
 */

import React from 'react';
import { CustomSection } from '@/types/resume';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableSectionItems } from '@/components/resume/InlineEditableSectionItems';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { PDFStyleConfig } from '@/lib/pdfStyles';
import { Plus, X } from 'lucide-react';

// Define types locally since they don't exist in templateConfig
export interface CustomSectionsConfig {
  showBullets?: boolean;
  enableItemEditing?: boolean;
  enableAddSection?: boolean;
}

export interface SectionConfig {
  enabled?: boolean;
  order?: number;
  titleCase?: 'uppercase' | 'capitalize' | 'lowercase';
}

export interface TemplateCustomSectionsProps {
  /** Custom sections */
  sections: CustomSection[];
  /** Whether the section is editable */
  editable?: boolean;
  /** Theme/accent color */
  accentColor?: string;
  /** PDF style configuration */
  styles: PDFStyleConfig;
  /** Custom sections configuration */
  config?: CustomSectionsConfig;
  /** Section configuration */
  sectionConfig?: SectionConfig;
  /** Custom className */
  className?: string;
}

const DEFAULT_CONFIG: CustomSectionsConfig = {
  showBullets: false,
  enableItemEditing: true,
  enableAddSection: true,
};

const DEFAULT_SECTION_CONFIG: SectionConfig = {
  enabled: true,
  order: 5,
  titleCase: 'uppercase',
};

export const TemplateCustomSections: React.FC<TemplateCustomSectionsProps> = ({
  sections,
  editable = false,
  accentColor = '#2563eb',
  styles,
  config = DEFAULT_CONFIG,
  sectionConfig = DEFAULT_SECTION_CONFIG,
  className = '',
}) => {
  const inlineEditContext = useInlineEdit();
  const addArrayItem = inlineEditContext?.addArrayItem;
  const removeArrayItem = inlineEditContext?.removeArrayItem;

  const handleAddSection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!addArrayItem) return;
    addArrayItem('sections', {
      id: Date.now().toString(),
      title: 'New Section',
      content: '',
      items: ['Sample item 1', 'Sample item 2'],
    });
  };

  const handleRemoveSection = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!removeArrayItem) return;
    removeArrayItem('sections', index);
  };

  const titleStyle: React.CSSProperties = {
    fontSize: styles.sectionHeading.size,
    fontWeight: styles.sectionHeading.weight,
    color: accentColor,
    marginBottom: '12px',
    textTransform: sectionConfig.titleCase === 'uppercase' ? 'uppercase' : 
                   sectionConfig.titleCase === 'capitalize' ? 'capitalize' : 'none',
    letterSpacing: sectionConfig.titleCase === 'uppercase' ? '0.05em' : undefined,
  };

  const renderSection = (section: CustomSection, sectionIndex: number) => {
    const hasItems = section.items && section.items.length > 0;
    const hasContent = section.content && section.content.trim();

    // Skip empty sections in read-only mode
    if (!editable && !hasItems && !hasContent) return null;

    return (
      <div 
        key={section.id || sectionIndex} 
        className={`group/section ${className}`}
        style={{ 
          marginBottom: styles.spacing.sectionGap, 
          pageBreakInside: 'avoid' 
        }}
      >
        <div className="flex items-center gap-2">
          <h2 className="tracking-wide flex-1" style={titleStyle}>
            {editable ? (
              <InlineEditableText
                path={`sections[${sectionIndex}].title`}
                value={section.title}
                className="inline-block"
              />
            ) : (
              section.title
            )}
          </h2>
          {editable && (
            <button
              onClick={(e) => handleRemoveSection(e, sectionIndex)}
              className="opacity-0 group-hover/section:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
              style={{ color: '#ef4444' }}
              title="Remove Section"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Content rendering */}
        {config.enableItemEditing ? (
          <InlineEditableSectionItems
            sectionIndex={sectionIndex}
            items={section.items || []}
            content={section.content || ''}
            editable={editable}
            itemStyle={{
              fontSize: styles.itemDescription.size,
              color: styles.colors.text.secondary,
              lineHeight: styles.itemDescription.lineHeight,
            }}
            addButtonLabel="Add Item"
            placeholder="Click to add item..."
            accentColor={accentColor}
            showBullets={config.showBullets}
          />
        ) : hasContent ? (
          editable ? (
            <InlineEditableText
              path={`sections[${sectionIndex}].content`}
              value={section.content}
              className="block whitespace-pre-line"
              style={{
                fontSize: styles.itemDescription.size,
                color: styles.colors.text.secondary,
                lineHeight: styles.itemDescription.lineHeight,
              }}
              multiline
              as="div"
            />
          ) : (
            <div 
              className="whitespace-pre-line"
              style={{
                fontSize: styles.itemDescription.size,
                color: styles.colors.text.secondary,
                lineHeight: styles.itemDescription.lineHeight,
              }}
            >
              {section.content}
            </div>
          )
        ) : editable ? (
          <div className="text-xs italic" style={{ color: '#9ca3af' }}>
            No content yet. Add items above.
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      {sections && sections.map((section, index) => renderSection(section, index))}

      {/* Add Section Button */}
      {editable && config.enableAddSection && (
        <button
          onClick={handleAddSection}
          className="mt-4 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border-2 border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-4 w-4" />
          Add Section
        </button>
      )}
    </>
  );
};

export default TemplateCustomSections;
