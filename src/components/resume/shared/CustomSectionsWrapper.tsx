/**
 * CustomSectionsWrapper - Flexible custom sections component
 * 
 * This component handles ALL the functionality:
 * - Add/remove sections
 * - Add/remove items within sections
 * - Editable section titles and content
 * - Backward compatibility with content field
 * 
 * But it lets YOU control the visual style via render props.
 * 
 * Usage Examples:
 * 
 * 1. Simple usage (default styling):
 * ```tsx
 * <CustomSectionsWrapper
 *   sections={resumeData.sections}
 *   editable={editable}
 *   accentColor={themeColor}
 * />
 * ```
 * 
 * 2. Custom section header:
 * ```tsx
 * <CustomSectionsWrapper
 *   sections={resumeData.sections}
 *   editable={editable}
 *   renderSectionHeader={(title, index, { EditableText }) => (
 *     <div className="flex items-center gap-2 border-b-2 border-red-500">
 *       <span className="text-red-500">★</span>
 *       <EditableText className="text-xl font-bold" />
 *     </div>
 *   )}
 * />
 * ```
 * 
 * 3. Custom item rendering:
 * ```tsx
 * <CustomSectionsWrapper
 *   sections={resumeData.sections}
 *   editable={editable}
 *   renderItem={(item, itemIndex, sectionIndex, { EditableText, remove }) => (
 *     <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
 *       <span>•</span>
 *       <EditableText className="flex-1" />
 *       {editable && <button onClick={remove}>×</button>}
 *     </div>
 *   )}
 * />
 * ```
 */

import React from 'react';
import { CustomSection } from '@/types/resume';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableSectionItems } from '@/components/resume/InlineEditableSectionItems';
import { useTemplateEditor } from '@/hooks/useTemplateEditor';
import { useInlineEdit } from '@/contexts/InlineEditContext';
import { SINGLE_COLUMN_CONFIG, PDFStyleConfig } from '@/lib/pdfStyles';
import { useStyleOptionsWithDefaults } from '@/contexts/StyleOptionsContext';
import { Plus, X } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface CustomSectionsWrapperProps {
  /** Custom sections array */
  sections: CustomSection[];
  /** Whether editing is enabled */
  editable?: boolean;
  /** Theme/accent color */
  accentColor?: string;
  /** Style config */
  styles?: PDFStyleConfig;
  /** Container className */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
  /** Whether to show bullets for items */
  showBullets?: boolean;
  /** Whether to show "Add Section" button */
  showAddSection?: boolean;
  
  // ============ RENDER PROPS FOR CUSTOMIZATION ============
  
  /** Custom section container renderer */
  renderSection?: (
    section: CustomSection,
    index: number,
    helpers: SectionHelpers
  ) => React.ReactNode;
  
  /** Custom section header renderer */
  renderSectionHeader?: (
    title: string,
    index: number,
    helpers: SectionHeaderHelpers
  ) => React.ReactNode;
  
  /** Custom item renderer */
  renderItem?: (
    item: string,
    itemIndex: number,
    sectionIndex: number,
    helpers: ItemHelpers
  ) => React.ReactNode;
  
  /** Custom "Add Section" button renderer */
  renderAddSectionButton?: (onClick: () => void) => React.ReactNode;
  
  /** Custom "Add Item" button renderer */
  renderAddItemButton?: (onClick: () => void, sectionIndex: number) => React.ReactNode;
  
  // ============ STYLE CUSTOMIZATION ============
  
  /** Section container style */
  sectionStyle?: React.CSSProperties;
  /** Section title style */
  titleStyle?: React.CSSProperties;
  /** Item style */
  itemStyle?: React.CSSProperties;
}

export interface SectionHelpers {
  /** Default content renderer (handles items or content) */
  DefaultContent: React.FC<{ className?: string; style?: React.CSSProperties }>;
  /** Section header component */
  Header: React.FC<{ className?: string; style?: React.CSSProperties }>;
  /** Remove this section */
  remove: () => void;
  /** Is editing enabled */
  isEditable: boolean;
  /** Section index */
  index: number;
}

export interface SectionHeaderHelpers {
  /** Editable text for title */
  EditableText: React.FC<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  /** Remove section button/handler */
  remove: () => void;
  /** Is editing enabled */
  isEditable: boolean;
}

export interface ItemHelpers {
  /** Editable text for this item */
  EditableText: React.FC<{
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
  }>;
  /** Remove this item */
  remove: () => void;
  /** Is editing enabled */
  isEditable: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const CustomSectionsWrapper: React.FC<CustomSectionsWrapperProps> = ({
  sections,
  editable = false,
  accentColor = '#2563eb',
  styles = SINGLE_COLUMN_CONFIG,
  className = '',
  style = {},
  showBullets = false,
  showAddSection = true,
  renderSection,
  renderSectionHeader,
  renderItem,
  renderAddSectionButton,
  renderAddItemButton,
  sectionStyle,
  titleStyle,
  itemStyle,
}) => {
  const { isEditable, addSection, removeSection, updateField, context } = useTemplateEditor({ editable });

  const handleAddSection = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    addSection();
  };

  const handleRemoveSection = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    removeSection(index);
  };

  // Create helpers for section header
  const createHeaderHelpers = (section: CustomSection, index: number): SectionHeaderHelpers => ({
    EditableText: ({ className: cn, style: s }) => (
      isEditable ? (
        <InlineEditableText
          path={`sections[${index}].title`}
          value={section.title}
          className={cn}
          style={s}
        />
      ) : (
        <span className={cn} style={s}>{section.title}</span>
      )
    ),
    remove: () => removeSection(index),
    isEditable,
  });

  // Create helpers for items
  const createItemHelpers = (item: string, itemIndex: number, sectionIndex: number): ItemHelpers => ({
    EditableText: ({ className: cn, style: s, placeholder }) => (
      isEditable ? (
        <InlineEditableText
          path={`sections[${sectionIndex}].items[${itemIndex}]`}
          value={item || ''}
          placeholder={placeholder || 'Click to add item...'}
          className={cn || 'flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1'}
          style={s}
          multiline
          as="span"
        />
      ) : (
        <span className={cn} style={s}>{item}</span>
      )
    ),
    remove: () => {
      if (!isEditable) return;
      const section = sections[sectionIndex];
      const newItems = (section.items || []).filter((_, idx) => idx !== itemIndex);
      updateField(`sections[${sectionIndex}].items`, newItems);
    },
    isEditable,
  });

  // Create section helpers
  const createSectionHelpers = (section: CustomSection, index: number): SectionHelpers => ({
    DefaultContent: ({ className: cn, style: s }) => (
      <InlineEditableSectionItems
        sectionIndex={index}
        items={section.items || []}
        content={section.content || ''}
        editable={isEditable}
        itemStyle={{
          fontSize: styles.itemDescription.size,
          color: styles.colors.text.secondary,
          lineHeight: styles.itemDescription.lineHeight,
          ...itemStyle,
          ...s,
        }}
        className={cn}
        addButtonLabel="Add Item"
        placeholder="Click to add item..."
        accentColor={accentColor}
        showBullets={showBullets}
      />
    ),
    Header: ({ className: cn, style: s }) => (
      <DefaultSectionHeader
        section={section}
        index={index}
        isEditable={isEditable}
        accentColor={accentColor}
        styles={styles}
        titleStyle={{ ...titleStyle, ...s }}
        className={cn}
        onRemove={(e) => handleRemoveSection(e, index)}
        renderSectionHeader={renderSectionHeader}
        createHeaderHelpers={createHeaderHelpers}
        updateField={updateField}
      />
    ),
    remove: () => removeSection(index),
    isEditable,
    index,
  });

  // Default section renderer
  const defaultRenderSection = (section: CustomSection, index: number) => {
    const helpers = createSectionHelpers(section, index);
    const hasItems = section.items && section.items.length > 0;
    const hasContent = section.content && section.content.trim();

    // Skip empty sections in read-only mode
    if (!isEditable && !hasItems && !hasContent) return null;

    return (
      <div 
        key={section.id || index}
        className="group/section"
        style={{ 
          marginBottom: styles.spacing.sectionGap, 
          pageBreakInside: 'avoid',
          ...sectionStyle,
        }}
      >
        <helpers.Header />
        
        {/* Content - either custom items or default */}
        {renderItem ? (
          <CustomItemsRenderer
            section={section}
            sectionIndex={index}
            isEditable={isEditable}
            accentColor={accentColor}
            styles={styles}
            itemStyle={itemStyle}
            showBullets={showBullets}
            renderItem={renderItem}
            renderAddItemButton={renderAddItemButton}
            createItemHelpers={createItemHelpers}
            updateField={updateField}
            context={context}
          />
        ) : (
          <helpers.DefaultContent />
        )}
      </div>
    );
  };

  return (
    <div className={className} style={style}>
      {/* Render all existing sections */}
      {sections && sections.map((section, index) => 
        renderSection 
          ? renderSection(section, index, createSectionHelpers(section, index))
          : defaultRenderSection(section, index)
      )}

      {/* Add Section Button - Always at the bottom */}
      {isEditable && showAddSection && (
        <div className="mt-4">
          {renderAddSectionButton ? (
            renderAddSectionButton(handleAddSection)
          ) : (
            <button
              onClick={handleAddSection}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border-2 border-dashed hover:bg-gray-50 transition-colors w-full justify-center"
              style={{ color: accentColor, borderColor: accentColor }}
            >
              <Plus className="h-4 w-4" />
              Add Section
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

interface DefaultSectionHeaderProps {
  section: CustomSection;
  index: number;
  isEditable: boolean;
  accentColor: string;
  styles: PDFStyleConfig;
  titleStyle?: React.CSSProperties;
  className?: string;
  onRemove: (e: React.MouseEvent) => void;
  renderSectionHeader?: CustomSectionsWrapperProps['renderSectionHeader'];
  createHeaderHelpers: (section: CustomSection, index: number) => SectionHeaderHelpers;
}

const DefaultSectionHeader: React.FC<DefaultSectionHeaderProps & { updateField: (path: string, value: any) => void }> = ({
  section,
  index,
  isEditable,
  accentColor,
  styles,
  titleStyle,
  className,
  onRemove,
  renderSectionHeader,
  createHeaderHelpers,
  updateField,
}) => {
  const helpers = createHeaderHelpers(section, index);
  const styleOptions = useStyleOptionsWithDefaults();

  if (renderSectionHeader) {
    return <>{renderSectionHeader(section.title, index, helpers)}</>;
  }

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <h2 
        className="uppercase tracking-wide flex-1"
        style={{
          fontSize: styles.sectionHeading.size,
          fontWeight: styles.sectionHeading.weight,
          color: accentColor,
          marginBottom: '12px',
          letterSpacing: '0.05em',
          ...titleStyle,
        }}
      >
        {isEditable ? (
          <InlineEditableText
            path={`sections[${index}].title`}
            value={styleOptions.formatHeader(section.title)}
            className="inline-block"
            onCustomUpdate={(newValue) => {
              // Format the value when saving to ensure consistency with style options
              const formatted = styleOptions.formatHeader(newValue);
              updateField(`sections[${index}].title`, formatted);
            }}
          />
        ) : (
          styleOptions.formatHeader(section.title)
        )}
      </h2>
      {isEditable && (
        <button
          onClick={onRemove}
          className="opacity-0 group-hover/section:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
          style={{ color: '#ef4444' }}
          title="Remove Section"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

interface CustomItemsRendererProps {
  section: CustomSection;
  sectionIndex: number;
  isEditable: boolean;
  accentColor: string;
  styles: PDFStyleConfig;
  itemStyle?: React.CSSProperties;
  showBullets: boolean;
  renderItem: CustomSectionsWrapperProps['renderItem'];
  renderAddItemButton?: CustomSectionsWrapperProps['renderAddItemButton'];
  createItemHelpers: (item: string, itemIndex: number, sectionIndex: number) => ItemHelpers;
  updateField: (path: string, value: any) => void;
  context?: ReturnType<typeof useInlineEdit>;
}

const CustomItemsRenderer: React.FC<CustomItemsRendererProps> = ({
  section,
  sectionIndex,
  isEditable,
  accentColor,
  styles,
  itemStyle,
  showBullets,
  renderItem,
  renderAddItemButton,
  createItemHelpers,
  updateField,
  context,
}) => {
  // Parse items from content if needed
  const effectiveItems = React.useMemo(() => {
    if (section.items && section.items.length > 0) {
      // Ensure all items are strings
      return section.items.map(item => typeof item === 'string' ? item : String(item || ''));
    }
    if (section.content && section.content.trim()) {
      return section.content.split('\n').filter(line => line.trim());
    }
    return [];
  }, [section.items, section.content]);

  const handleAddItem = () => {
    if (!isEditable || !context) return;
    
    console.log('[CustomItemsRenderer] handleAddItem called', {
      sectionIndex,
      section: JSON.parse(JSON.stringify(section)),
      effectiveItems: JSON.parse(JSON.stringify(effectiveItems)),
    });
    
    // Get the latest resumeData from context to avoid stale state issues
    const latestResumeData = context.resumeData;
    const latestSection = latestResumeData?.sections?.[sectionIndex] || section;
    
    // Always get current items from the latest section data
    // Ensure we preserve all existing items as strings
    const currentItems = latestSection.items && Array.isArray(latestSection.items) && latestSection.items.length > 0
      ? latestSection.items.map((item: any) => typeof item === 'string' ? item : String(item || ''))
      : (latestSection.content && latestSection.content.trim()
          ? latestSection.content.split('\n').filter((line: string) => line.trim())
          : []);
    
    console.log('[CustomItemsRenderer] currentItems computed from latest data:', currentItems);
    
    // Add new empty item
    const newItems = [...currentItems, ''];
    
    console.log('[CustomItemsRenderer] newItems to set:', newItems);
    
    // CRITICAL FIX: Update both items and content in a single updateField call
    // by creating a new section object with both fields updated
    // We'll update items first, then immediately update content in the same data structure
    const newData = JSON.parse(JSON.stringify(latestResumeData));
    const targetSection = newData.sections[sectionIndex];
    
    if (targetSection) {
      // Set the new items array
      targetSection.items = newItems;
      
      // Clear content only if we had content and no items before
      const shouldClearContent = latestSection.content && (!latestSection.items || latestSection.items.length === 0);
      if (shouldClearContent) {
        targetSection.content = '';
        console.log('[CustomItemsRenderer] Will clear content in same update');
      }
      
      // Update the entire section at once to avoid race conditions
      // This ensures both items and content are updated atomically
      console.log('[CustomItemsRenderer] Updating entire section atomically');
      updateField(`sections[${sectionIndex}]`, targetSection);
    } else {
      // Fallback: just update items
    updateField(`sections[${sectionIndex}].items`, newItems);
    }
  };

  if (effectiveItems.length === 0 && !isEditable) return null;

  return (
    <div>
      {effectiveItems.map((item, itemIndex) => (
        <div key={itemIndex} style={{ marginBottom: '6px' }}>
          {renderItem!(
            item,
            itemIndex,
            sectionIndex,
            createItemHelpers(item, itemIndex, sectionIndex)
          )}
        </div>
      ))}
      
      {isEditable && (
        renderAddItemButton ? (
          renderAddItemButton(handleAddItem, sectionIndex)
        ) : (
          <button
            onClick={handleAddItem}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            <Plus className="h-3 w-3" />
            Add Item
          </button>
        )
      )}
    </div>
  );
};

export default CustomSectionsWrapper;
