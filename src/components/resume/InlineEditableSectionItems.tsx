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
  const effectiveItems = React.useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }
    if (content && content.trim()) {
      // Split content by newlines to create items
      return content.split('\n').filter(line => line.trim());
    }
    return [];
  }, [items, content]);

  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!updateField) return;
    
    const newItems = [...effectiveItems, ""];
    updateField(`sections[${sectionIndex}].items`, newItems);
    // Clear content when switching to items mode
    updateField(`sections[${sectionIndex}].content`, "");
  };

  const handleRemoveItem = (e: React.MouseEvent, itemIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!updateField) return;
    
    const newItems = effectiveItems.filter((_, idx) => idx !== itemIndex);
    updateField(`sections[${sectionIndex}].items`, newItems);
  };

  // For non-editable mode, just render the items
  if (!editable) {
    if (effectiveItems.length === 0) return null;
    
    return (
      <div style={containerStyle} className={className}>
        {effectiveItems.map((item, index) => (
          item && (
            <div key={index} style={{ marginBottom: "8px", ...itemStyle }}>
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
                path={`sections[${sectionIndex}].items[${itemIndex}]`}
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

      {/* Add Item Button */}
      <button
        onClick={handleAddItem}
        className="mt-2 flex items-center gap-1 text-xs font-medium"
        style={{ color: accentColor }}
      >
        <Plus className="h-3 w-3" />
        {addButtonLabel}
      </button>
    </div>
  );
};

export default InlineEditableSectionItems;
