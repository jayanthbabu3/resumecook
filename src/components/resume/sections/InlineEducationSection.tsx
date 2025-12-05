import React from "react";
import type { EducationItem } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

export interface InlineEducationSectionProps {
  /**
   * Education items to render. Typically resumeData.education.
   */
  items: EducationItem[];
  /**
   * Root path in ResumeData. Defaults to "education".
   */
  path?: string;
  /**
   * Section title label (e.g. "Education").
   */
  title?: string;
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
  className?: string;
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
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatMonthYear = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthIndex = parseInt(month || "0", 10) - 1;
  if (Number.isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) {
    return date;
  }
  return `${monthNames[monthIndex]} ${year}`;
};

export const InlineEducationSection: React.FC<InlineEducationSectionProps> = ({
  items,
  path = "education",
  title = "Education",
  editable = false,
  accentColor,
  className = "",
  renderItem,
  renderHeader,
  titleStyle,
}) => {
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
      <div className={className}>
        {renderTitle()}
        <div className="space-y-4" data-section="education">
          {items.map((edu, index) => {
            if (renderItem) {
              return <React.Fragment key={edu.id}>{renderItem(edu, index, false)}</React.Fragment>;
            }

            return (
              <div key={edu.id} style={{ lineHeight: 1.8 }}>
                <h3
                  className="text-[13px] font-semibold"
                  style={{ color: SINGLE_COLUMN_CONFIG.itemTitle.color }}
                >
                  {edu.degree}
                </h3>
                {edu.field && (
                  <p
                    className="text-[12px]"
                    style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}
                  >
                    {edu.field}
                  </p>
                )}
                <p
                  className="text-[12px] font-medium"
                  style={{ color: accentColor ?? SINGLE_COLUMN_CONFIG.colors.primary }}
                >
                  {edu.school}
                </p>
                <div
                  className="text-[11px]"
                  style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}
                >
                  {formatMonthYear(edu.startDate)} - {formatMonthYear(edu.endDate)}
                  {edu.gpa && ` • ${edu.gpa}`}
                </div>
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
    <div className={className}>
      {renderTitle()}
      <InlineEditableList
        path={path}
        items={safeItems}
        defaultItem={{
          id: Date.now().toString(),
          school: "University Name",
          degree: "Degree",
          field: "Field of Study",
          startDate: "2019-09",
          endDate: "2023-05",
          gpa: "",
        }}
        addButtonLabel="Add Education"
        renderItem={(edu, index) => {
          if (renderItem) {
            return renderItem(edu, index, true);
          }

          return (
            <div style={{ lineHeight: 1.8 }} data-section="education">
              <InlineEditableText
                path={`${path}[${index}].degree`}
                value={edu.degree}
                className="text-[13px] font-semibold block"
                as="h3"
                style={{ color: SINGLE_COLUMN_CONFIG.itemTitle.color }}
              />
              {edu.field && (
                <InlineEditableText
                  path={`${path}[${index}].field`}
                  value={edu.field}
                  className="text-[12px] block"
                  as="p"
                  style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}
                />
              )}
              <InlineEditableText
                path={`${path}[${index}].school`}
                value={edu.school}
                className="text-[12px] font-medium block"
                as="p"
                style={{ color: accentColor ?? SINGLE_COLUMN_CONFIG.colors.primary }}
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
                <span>•</span>
                <InlineEditableText
                  path={`${path}[${index}].gpa`}
                  value={edu.gpa ? `GPA: ${edu.gpa}` : ""}
                  placeholder="GPA/Grade"
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

