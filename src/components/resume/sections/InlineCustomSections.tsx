import React from "react";
import type { CustomSection } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

export interface InlineCustomSectionsProps {
  /**
   * Custom sections to render. Typically resumeData.sections.
   */
  sections: CustomSection[];
  /**
   * Whether the section is editable (live editor / form editor).
   */
  editable?: boolean;
  /**
   * Accent color used for headings / emphasis.
   */
  accentColor?: string;
  /**
   * Optional className overrides for container.
   */
  containerClassName?: string;
  /**
   * Optional inline styles for section items
   */
  itemStyle?: React.CSSProperties;
  /**
   * Optional custom renderer for section header
   */
  renderHeader?: (title: string) => React.ReactNode;
}

export const InlineCustomSections: React.FC<InlineCustomSectionsProps> = ({
  sections,
  editable = false,
  accentColor,
  containerClassName = "",
  itemStyle = {},
  renderHeader,
}) => {
  if (!sections || sections.length === 0) return null;

  const defaultItemStyle: React.CSSProperties = {
    fontSize: SINGLE_COLUMN_CONFIG.itemDescription.size,
    lineHeight: SINGLE_COLUMN_CONFIG.itemDescription.lineHeight,
    color: SINGLE_COLUMN_CONFIG.itemDescription.color,
    ...itemStyle,
  };

  const renderSectionTitle = (title: string) => {
    if (renderHeader) return renderHeader(title);
    return (
      <h2
        className="text-[14px] font-semibold mb-3 uppercase tracking-wide"
        style={{
          color: accentColor ?? SINGLE_COLUMN_CONFIG.colors.primary,
          fontSize: SINGLE_COLUMN_CONFIG.sectionHeading.size,
          letterSpacing: SINGLE_COLUMN_CONFIG.sectionHeading.letterSpacing,
        }}
      >
        {title}
      </h2>
    );
  };

  return (
    <div className={containerClassName}>
      {sections.map((section, sectionIndex) => {
        const hasItems = section.items && section.items.length > 0;
        const hasContent = section.content && section.content.trim();

        // Skip empty sections in read-only mode
        if (!editable && !hasItems && !hasContent) return null;

        return (
          <div key={section.id} className="mb-6">
            {editable ? (
              <InlineEditableText
                path={`sections[${sectionIndex}].title`}
                value={section.title}
                className="text-[14px] font-semibold mb-3 uppercase tracking-wide block"
                as="h2"
                style={{
                  color: accentColor ?? SINGLE_COLUMN_CONFIG.colors.primary,
                  fontSize: SINGLE_COLUMN_CONFIG.sectionHeading.size,
                  letterSpacing: SINGLE_COLUMN_CONFIG.sectionHeading.letterSpacing,
                }}
              />
            ) : (
              renderSectionTitle(section.title)
            )}

            {/* Render items if available, otherwise fall back to content */}
            {hasItems ? (
              <InlineEditableSectionItems
                sectionIndex={sectionIndex}
                items={section.items!}
                content={section.content}
                editable={editable}
                itemStyle={defaultItemStyle}
                accentColor={accentColor}
                showBullets={false}
              />
            ) : hasContent ? (
              editable ? (
                <InlineEditableText
                  path={`sections[${sectionIndex}].content`}
                  value={section.content}
                  className="text-[13px] leading-relaxed whitespace-pre-line block"
                  style={defaultItemStyle}
                  multiline
                  as="div"
                />
              ) : (
                <div className="text-[13px] leading-relaxed whitespace-pre-line" style={defaultItemStyle}>
                  {section.content}
                </div>
              )
            ) : editable ? (
              <div className="text-[12px] text-gray-400 italic">
                No content yet. Add items or content above.
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default InlineCustomSections;

