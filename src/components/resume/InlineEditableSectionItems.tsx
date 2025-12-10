import React from "react";
import { Plus, X } from "lucide-react";
import { InlineEditableText } from "./InlineEditableText";
import { useInlineEdit } from "@/contexts/InlineEditContext";

interface InlineEditableSectionItemsProps {
  sectionIndex: number;
  items: string[];
  content?: string; // Fallback content for backward compatibility
  editable?: boolean;
  itemStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  addButtonLabel?: string;
  placeholder?: string;
  accentColor?: string;
  showBullets?: boolean;
  className?: string;
}

/**
 * A reusable component for rendering editable list items within custom sections.
 * Similar to experience bullet points but without bullet symbols by default.
 * Can be used for certifications, achievements, or any list-style content.
 * 
 * Supports backward compatibility:
 * - If items array exists and has content, use items
 * - If items is empty but content exists, parse content by newlines
 * - In edit mode, always use items array approach
 */
export const InlineEditableSectionItems: React.FC<InlineEditableSectionItemsProps> = ({
  sectionIndex,
  items = [],
  content = "",
  editable = false,
  itemStyle = {},
  containerStyle = {},
  addButtonLabel = "Add Item",
  placeholder = "Click to add item...",
  accentColor = "#2563eb",
  showBullets = false,
  className = "",
}) => {
  const inlineEditContext = useInlineEdit();
  const updateField = inlineEditContext?.updateField;

  // Parse content into items if items array is empty but content exists
  // Also handle case where items might be objects instead of strings
  const effectiveItems = React.useMemo(() => {
    console.log('[InlineEditableSectionItems] Computing effectiveItems', {
      sectionIndex,
      itemsLength: items?.length,
      items,
      content,
      contentLength: content?.length
    });
    
    if (items && items.length > 0) {
      // Ensure all items are strings
      const result = items.map(item => 
        typeof item === 'string' ? item : (item as any)?.text || String(item || '')
      );
      console.log('[InlineEditableSectionItems] Using items array', { resultLength: result.length, result });
      return result;
    }
    if (content && content.trim()) {
      // Split content by newlines to create items
      const result = content.split('\n').filter(line => line.trim());
      console.log('[InlineEditableSectionItems] Using content (split by newlines)', { resultLength: result.length, result });
      return result;
    }
    console.log('[InlineEditableSectionItems] No items or content, returning empty array');
    return [];
  }, [items, content, sectionIndex]);

  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('[InlineEditableSectionItems] handleAddItem called', {
      sectionIndex,
      effectiveItems,
      updateFieldAvailable: !!updateField,
      inlineEditContext: inlineEditContext ? 'available' : 'null/undefined'
    });
    
    if (!updateField) {
      console.error('[InlineEditableSectionItems] updateField not available - make sure InlineEditProvider is wrapping this component');
      console.error('[InlineEditableSectionItems] inlineEditContext:', inlineEditContext);
      return;
    }
    
    const newItems = [...effectiveItems, ""];
    // Use dot notation for path: sections.0.items
    const itemsPath = `sections.${sectionIndex}.items`;
    const contentPath = `sections.${sectionIndex}.content`;
    
    console.log('[InlineEditableSectionItems] Calling updateField for items', {
      itemsPath,
      newItems,
      newItemsLength: newItems.length
    });
    
    try {
      // Update items first
      updateField(itemsPath, newItems);
      console.log('[InlineEditableSectionItems] Items updated successfully');
      
      // Clear content when switching to items mode
      // The functional update pattern ensures this uses the latest state
      updateField(contentPath, "");
      console.log('[InlineEditableSectionItems] Content cleared');
    } catch (error) {
      console.error('[InlineEditableSectionItems] Error in updateField:', error);
    }
  };

  const handleRemoveItem = (e: React.MouseEvent, itemIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!updateField) {
      console.warn('[InlineEditableSectionItems] updateField not available - make sure InlineEditProvider is wrapping this component');
      return;
    }
    
    const newItems = effectiveItems.filter((_, idx) => idx !== itemIndex);
    // Use dot notation for path: sections.0.items
    const path = `sections.${sectionIndex}.items`;
    updateField(path, newItems);
  };

  // For non-editable mode, just render the items
  if (!editable) {
    if (effectiveItems.length === 0) return null;
    
    return (
      <div style={containerStyle} className={className}>
        {effectiveItems.map((item, index) => (
          item && (
            <div 
              key={index} 
              style={{ 
                marginBottom: "6px", 
                fontSize: "13px",
                color: "#1a1a1a",
                lineHeight: "1.6",
                ...itemStyle 
              }}
            >
              {showBullets && <span style={{ marginRight: "8px" }}>•</span>}
              {item}
            </div>
          )
        ))}
      </div>
    );
  }

  // Editable mode
  return (
    <div style={containerStyle} className={className}>
      {/* Render existing items */}
      {effectiveItems.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {effectiveItems.map((item, itemIndex) => (
            <div key={itemIndex} className="group flex items-start gap-2">
              {showBullets && <span style={{ marginRight: "4px", marginTop: "2px" }}>•</span>}
              <InlineEditableText
                path={`sections.${sectionIndex}.items.${itemIndex}`}
                value={item || ""}
                placeholder={placeholder}
                className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                style={itemStyle}
                multiline
                as="span"
              />
              <button
                onClick={(e) => handleRemoveItem(e, itemIndex)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
                style={{ color: "#ef4444" }}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Item Button - Always at the bottom */}
      <button
        onClick={handleAddItem}
        className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
        style={{ color: accentColor, borderColor: accentColor }}
      >
        <Plus className="h-3 w-3" />
        {addButtonLabel}
      </button>
    </div>
  );
};

export default InlineEditableSectionItems;
