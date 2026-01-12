import React from "react";
import type { ResumeData, ExperienceItem } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

type ExperienceLayout = "stacked" | "compact";

export interface InlineExperienceSectionProps {
  /**
   * Experience items to render. Typically resumeData.experience.
   */
  items: ExperienceItem[];
  /**
   * Root path in ResumeData. Defaults to "experience".
   */
  path?: keyof ResumeData;
  /**
   * Section title label (e.g. "Experience", "Internship Experience").
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
   * Layout hint so templates can pick a visual density.
   */
  layout?: ExperienceLayout;
  /**
   * Optional className overrides for container.
   */
  className?: string;
  /**
   * Optional custom renderer for experience items
   */
  renderItem?: (exp: ExperienceItem, index: number, isEditable: boolean) => React.ReactNode;
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

export const InlineExperienceSection: React.FC<InlineExperienceSectionProps> = ({
  items,
  path = "experience",
  title = "Experience",
  editable = false,
  accentColor,
  layout = "stacked",
  className = "",
  renderItem,
  renderHeader,
  titleStyle,
}) => {
  const inlineEdit = useInlineEdit();

  // If we're not inside an InlineEditProvider, fall back to read-only rendering.
  const hasContext = Boolean(inlineEdit);

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

    const textColor = SINGLE_COLUMN_CONFIG.colors.text.primary;

    return (
      <div className={className}>
        {renderTitle()}
        <div className={layout === "compact" ? "space-y-3" : "space-y-5"}>
          {items.map((exp, index) => {
            if (renderItem) {
              return <React.Fragment key={exp.id}>{renderItem(exp, index, false)}</React.Fragment>;
            }

            const bulletPoints =
              exp.bulletPoints && exp.bulletPoints.length > 0
                ? exp.bulletPoints
                : (exp.description || "")
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean);

            return (
              <div key={exp.id} className="group">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-[13px] font-semibold truncate"
                      style={{ color: textColor }}
                    >
                      {exp.position}
                    </h3>
                    {exp.company && (
                      <p
                        className="text-[12px] truncate"
                        style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}
                      >
                        {exp.company}
                      </p>
                    )}
                  </div>
                  <div
                    className="ml-3 text-[11px] whitespace-nowrap"
                    style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}
                  >
                    {formatMonthYear(exp.startDate)}{" "}
                    {" - "}
                    {exp.current ? "Present" : formatMonthYear(exp.endDate)}
                  </div>
                </div>
                {bulletPoints.length > 0 && (
                  <ul
                    className="ml-4 list-disc space-y-1 text-[12px] leading-relaxed"
                    style={{
                      color: SINGLE_COLUMN_CONFIG.itemDescription.color,
                      lineHeight: SINGLE_COLUMN_CONFIG.itemDescription.lineHeight,
                    }}
                  >
                    {bulletPoints.map((bp, i) => (
                      <li key={i}>{bp}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!editable || !hasContext) {
    return renderReadOnly();
  }

  const { addBulletPoint, removeBulletPoint } = inlineEdit!;
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className={className}>
      {renderTitle()}
      <InlineEditableList
        path={path as string}
        items={safeItems}
        defaultItem={{
          id: Date.now().toString(),
          company: "Company Name",
          position: "Position Title",
          startDate: "2023-01",
          endDate: "2023-12",
          description: "",
          bulletPoints: ["Achievement or responsibility"],
          current: false,
        }}
        addButtonLabel="Add Experience"
        renderItem={(exp, index) => {
          if (renderItem) {
            return renderItem(exp, index, true);
          }

          const hasBullets = Array.isArray(exp.bulletPoints) && exp.bulletPoints.length > 0;

          return (
            <div className={layout === "compact" ? "space-y-1.5" : "space-y-2"}>
              <div className="flex justify-between items-baseline">
                <div className="flex-1 min-w-0">
                  <InlineEditableText
                    path={`${path}[${index}].position`}
                    value={exp.position}
                    className="text-[13px] font-semibold block"
                    as="h3"
                    style={{ color: SINGLE_COLUMN_CONFIG.itemTitle.color }}
                  />
                  <InlineEditableText
                    path={`${path}[${index}].company`}
                    value={exp.company}
                    className="text-[12px] block"
                    as="p"
                    style={{ color: accentColor ?? SINGLE_COLUMN_CONFIG.colors.primary }}
                  />
                </div>
                <div
                  className="ml-3 text-[11px] flex items-center gap-1"
                  style={{ color: SINGLE_COLUMN_CONFIG.colors.text.secondary }}
                >
                  <InlineEditableDate
                    path={`${path}[${index}].startDate`}
                    value={exp.startDate}
                    className="inline-block"
                  />
                  <span>-</span>
                  {exp.current ? (
                    <span>Present</span>
                  ) : (
                    <InlineEditableDate
                      path={`${path}[${index}].endDate`}
                      value={exp.endDate}
                      className="inline-block"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                {hasBullets ? (
                  exp.bulletPoints!.map((bullet: string, bulletIndex: number) => (
                    <div key={bulletIndex} className="flex items-start gap-2 group">
                      <span className="text-gray-400 mt-1">•</span>
                      <InlineEditableText
                        path={`${path}[${index}].bulletPoints[${bulletIndex}]`}
                        value={bullet || ""}
                        className="text-[12px] text-gray-700 leading-relaxed flex-1 min-h-[1.1rem] border border-dashed border-gray-300 rounded px-1"
                        placeholder="Click to add achievement..."
                        multiline
                        as="span"
                      />
                      <button
                        type="button"
                        onClick={() => removeBulletPoint?.(exp.id, bulletIndex)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded text-red-500"
                        disabled={exp.bulletPoints!.length <= 1}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-[12px] text-gray-500 italic">No bullet points yet.</div>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addBulletPoint?.(exp.id);
                  }}
                  className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium"
                >
                  <Plus className="h-3 w-3" />
                  Add Achievement
                </button>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default InlineExperienceSection;

