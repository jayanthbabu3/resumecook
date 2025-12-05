import React from "react";
import type { CustomSection } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

export interface InlineCustomSectionsProps {
  sections: CustomSection[];
  editable?: boolean;
  accentColor?: string;
  /**
   * Typography / spacing tuning for list items.
   */
  itemStyle?: React.CSSProperties;
  containerClassName?: string;
}

export const InlineCustomSections: React.FC<InlineCustomSectionsProps> = ({
  sections,
  editable = false,
  accentColor,
  itemStyle,
  containerClassName = "",
}) => {
  const safeSections = Array.isArray(sections) ? sections : [];

  if (!editable) {
    if (!safeSections.length) return null;
    return (
      <div className={containerClassName}>
        {safeSections.map((section, index) => (
          <div key={section.id || index} className="mb-6 last:mb-0">
            <h2
              className="text-[14px] font-semibold mb-3 uppercase tracking-wide"
              style={{
                color: accentColor ?? SINGLE_COLUMN_CONFIG.colors.primary,
                fontSize: SINGLE_COLUMN_CONFIG.sectionHeading.size,
                letterSpacing: SINGLE_COLUMN_CONFIG.sectionHeading.letterSpacing,
              }}
            >
              {section.title}
            </h2>
            <InlineEditableSectionItems
              sectionIndex={index}
              items={section.items || []}
              content={section.content || ""}
              editable={false}
              itemStyle={
                itemStyle ?? {
                  fontSize: SINGLE_COLUMN_CONFIG.itemDescription.size,
                  color: SINGLE_COLUMN_CONFIG.itemDescription.color,
                  lineHeight: SINGLE_COLUMN_CONFIG.itemDescription.lineHeight,
                }
              }
              showBullets={true}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <InlineEditableList
        path="sections"
        items={safeSections}
        defaultItem={{
          id: Date.now().toString(),
          title: "New Section",
          content: "",
          items: ["New item"],
        }}
        addButtonLabel="Add Section"
        renderItem={(section, index) => (
          <div key={section.id || index} className="mb-6 last:mb-0">
            <InlineEditableText
              path={`sections[${index}].title`}
              value={section.title}
              className="text-[14px] font-semibold mb-3 uppercase tracking-wide block"
              style={{
                color: accentColor ?? SINGLE_COLUMN_CONFIG.colors.primary,
                fontSize: SINGLE_COLUMN_CONFIG.sectionHeading.size,
                letterSpacing: SINGLE_COLUMN_CONFIG.sectionHeading.letterSpacing,
              }}
              as="h2"
            />
            <InlineEditableSectionItems
              sectionIndex={index}
              items={section.items || []}
              content={section.content || ""}
              editable={true}
              itemStyle={
                itemStyle ?? {
                  fontSize: SINGLE_COLUMN_CONFIG.itemDescription.size,
                  color: SINGLE_COLUMN_CONFIG.itemDescription.color,
                  lineHeight: SINGLE_COLUMN_CONFIG.itemDescription.lineHeight,
                }
              }
              addButtonLabel="Add Item"
              placeholder="Click to add item..."
              accentColor={accentColor}
              showBullets={true}
            />
          </div>
        )}
      />
    </div>
  );
};

export default InlineCustomSections;


