import React from "react";
import type { ResumeData, EducationItem } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { formatMonthYear } from "./InlineExperienceSection";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

export interface InlineEducationSectionProps {
  items: EducationItem[];
  path?: keyof ResumeData;
  title?: string;
  editable?: boolean;
  accentColor?: string;
  /**
   * Whether to enforce universal/fresher line-height standard (1.8).
   */
  universalLineHeight?: boolean;
  /**
   * Optional custom renderer for education items
   */
  renderItem?: (edu: EducationItem, index: number, isEditable: boolean) => React.ReactNode;
  /**
   * Optional custom renderer for section header
   */
  renderHeader?: (title: string) => React.ReactNode;
  /**
   * Optional inline styles for the title
   */
  titleStyle?: React.CSSProperties;
  className?: string;
}

export const InlineEducationSection: React.FC<InlineEducationSectionProps> = ({
  items,
  path = "education",
  title = "Education",
  editable = false,
  accentColor,
  universalLineHeight = true,
  className = "",
  renderItem: customRenderItem,
  renderHeader,
  titleStyle,
}) => {
  const wrapperStyle: React.CSSProperties = universalLineHeight
    ? { lineHeight: 1.8 }
    : {};

  const renderTitle = () => {
    if (!title) return null;
    if (renderHeader) return renderHeader(title);
    return (
      <h2
        className="text-[14px] font-semibold mb-3 uppercase tracking-wide"
        style={{
          color: accentColor ?? SINGLE_COLUMN_CONFIG.colors.primary,
          fontSize: SINGLE_COLUMN_CONFIG.sectionHeading.size,
          letterSpacing: SINGLE_COLUMN_CONFIG.sectionHeading.letterSpacing,
          ...titleStyle,
        }}
      >
        {title}
      </h2>
    );
  };

  const renderReadOnly = () => {
    if (!items || items.length === 0) return null;
    return (
      <div
        className={className}
        data-section="education"
        style={wrapperStyle}
      >
        {renderTitle()}
        <div className="space-y-3 text-[12px]">
          {items.map((edu, index) => {
            if (customRenderItem) {
              return <React.Fragment key={edu.id}>{customRenderItem(edu, index, false)}</React.Fragment>;
            }
            return (
              <div key={edu.id} className="space-y-0.5">
                <h3
                  className="font-semibold"
                  style={{ color: SINGLE_COLUMN_CONFIG.itemTitle.color }}
                >
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                {edu.school && (
                  <p style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}>
                    {edu.school}
                  </p>
                )}
                <p
                  className="text-[11px]"
                  style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}
                >
                  {formatMonthYear(edu.startDate)} - {formatMonthYear(edu.endDate)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!editable) {
    return renderReadOnly();
  }

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div
      className={className}
      data-section="education"
      style={wrapperStyle}
    >
      {renderTitle()}

      <InlineEditableList
        path={path as string}
        items={safeItems}
        defaultItem={{
          id: Date.now().toString(),
          school: "School Name",
          degree: "Degree",
          field: "Field of Study",
          startDate: "2019-09",
          endDate: "2023-05",
        }}
        addButtonLabel="Add Education"
        renderItem={(edu, index) => {
          if (customRenderItem) {
            return customRenderItem(edu, index, true);
          }
          return (
            <div className="mb-3 last:mb-0 text-[12px] space-y-0.5">
              <InlineEditableText
                path={`${path}[${index}].degree`}
                value={edu.degree}
                className="font-semibold block"
                as="h3"
                style={{ color: SINGLE_COLUMN_CONFIG.itemTitle.color }}
              />
              <InlineEditableText
                path={`${path}[${index}].field`}
                value={edu.field}
                className="block"
                as="p"
                style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}
              />
              <InlineEditableText
                path={`${path}[${index}].school`}
                value={edu.school}
                className="italic block"
                as="p"
                style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}
              />
              <div
                className="text-[11px] flex items-center gap-1"
                style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}
              >
                <InlineEditableDate
                  path={`${path}[${index}].startDate`}
                  value={edu.startDate}
                  className="inline-block"
                />
                <span>-</span>
                <InlineEditableDate
                  path={`${path}[${index}].endDate`}
                  value={edu.endDate}
                  className="inline-block"
                />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default InlineEducationSection;
