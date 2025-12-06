import React from "react";
import type { EducationItem } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { SINGLE_COLUMN_CONFIG, EducationVariant, getEducationStyle, EDUCATION_STYLES } from "@/lib/pdfStyles";

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
  /**
   * Display variant for education section
   */
  variant?: EducationVariant;
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
  variant = "standard",
}) => {
  const variantStyle = getEducationStyle(variant);
  const hasTimelineIndicator = 'hasTimelineIndicator' in variantStyle && variantStyle.hasTimelineIndicator;
  const hasCardStyle = 'hasCardStyle' in variantStyle && variantStyle.hasCardStyle;

  const renderTitle = () => {
    if (!title) return null;
    if (renderHeader) return <div className="mb-2">{renderHeader(title)}</div>;
    return (
      <h2
        className="text-[13px] font-semibold mb-2 uppercase tracking-wide"
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

  // Render date based on variant's datePosition
  const renderDates = (edu: EducationItem, index: number, isEditable: boolean) => {
    if (!variantStyle.showDates) return null;
    
    const dateStyle = { 
      fontSize: variantStyle.dateSize, 
      color: '#6b7280' 
    };

    if (isEditable) {
      return (
        <div className="flex items-center gap-1" style={dateStyle}>
          <InlineEditableDate
            path={`${path}[${index}].startDate`}
            value={edu.startDate}
            className="inline-block"
          />
          <span>—</span>
          <InlineEditableDate
            path={`${path}[${index}].endDate`}
            value={edu.endDate}
            className="inline-block"
          />
        </div>
      );
    }

    return (
      <div style={dateStyle}>
        {formatMonthYear(edu.startDate)} — {formatMonthYear(edu.endDate)}
      </div>
    );
  };

  // Render GPA if enabled
  const renderGPA = (edu: EducationItem, index: number, isEditable: boolean) => {
    if (!variantStyle.showGPA) return null;

    const gpaStyle = { fontSize: variantStyle.gpaSize, color: '#6b7280' };

    if (isEditable) {
      return (
        <InlineEditableText
          path={`${path}[${index}].gpa`}
          value={edu.gpa || ""}
          placeholder="GPA/Grade"
          className="inline-block"
          style={gpaStyle}
        />
      );
    }

    return edu.gpa ? <span style={gpaStyle}>GPA: {edu.gpa}</span> : null;
  };

  // Render a single education item based on variant
  const renderEducationItem = (edu: EducationItem, index: number, isEditable: boolean) => {
    if (renderItem) {
      return renderItem(edu, index, isEditable);
    }

    const degreeStyle = { fontSize: variantStyle.degreeSize, color: '#000000' };
    const schoolStyle = { fontSize: variantStyle.schoolSize, color: '#1a1a1a' };
    const fieldStyle = { fontSize: variantStyle.fieldSize, color: '#6b7280' };

    // Timeline indicator
    const timelineIndicator = hasTimelineIndicator ? (
      <span
        className="absolute left-0 top-1.5 block h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: accentColor || '#2563eb' }}
      />
    ) : null;

    // Card style wrapper
    const cardStyles = hasCardStyle ? {
      borderColor: `${accentColor}30` || '#e5e7eb',
      backgroundColor: `${accentColor}05` || '#fafafa',
    } : {};

    // Compact variant - single line
    if (variant === 'compact') {
      return (
        <div className={variantStyle.itemClass} style={cardStyles}>
          <div className="flex items-baseline gap-2">
            <span className={variantStyle.degreeClass} style={degreeStyle}>
              {isEditable ? (
                <InlineEditableText
                  path={`${path}[${index}].degree`}
                  value={edu.degree}
                  as="span"
                />
              ) : edu.degree}
            </span>
            {variantStyle.showSchool && (
              <>
                <span style={{ color: '#9ca3af' }}>•</span>
                <span className={variantStyle.schoolClass} style={schoolStyle}>
                  {isEditable ? (
                    <InlineEditableText
                      path={`${path}[${index}].school`}
                      value={edu.school}
                      as="span"
                    />
                  ) : edu.school}
                </span>
              </>
            )}
          </div>
          {renderDates(edu, index, isEditable)}
        </div>
      );
    }

    // Standard, detailed, timeline, card, minimal variants
    return (
      <div className={variantStyle.itemClass} style={cardStyles}>
        {timelineIndicator}
        
        {/* Header row with degree and dates (for right-aligned dates) */}
        {variantStyle.datePosition === 'right' ? (
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className={variantStyle.degreeClass} style={degreeStyle}>
              {isEditable ? (
                <InlineEditableText
                  path={`${path}[${index}].degree`}
                  value={edu.degree}
                  as="span"
                />
              ) : edu.degree}
            </span>
            {renderDates(edu, index, isEditable)}
          </div>
        ) : (
          <div className={variantStyle.degreeClass} style={degreeStyle}>
            {isEditable ? (
              <InlineEditableText
                path={`${path}[${index}].degree`}
                value={edu.degree}
                as="span"
              />
            ) : edu.degree}
          </div>
        )}

        {/* School */}
        {variantStyle.showSchool && (
          <div className={variantStyle.schoolClass} style={schoolStyle}>
            {isEditable ? (
              <InlineEditableText
                path={`${path}[${index}].school`}
                value={edu.school}
                as="span"
              />
            ) : edu.school}
          </div>
        )}

        {/* Field of study */}
        {variantStyle.showField && edu.field && (
          <div style={fieldStyle}>
            {isEditable ? (
              <InlineEditableText
                path={`${path}[${index}].field`}
                value={edu.field}
                as="span"
              />
            ) : edu.field}
          </div>
        )}

        {/* Dates (inline or below) */}
        {variantStyle.datePosition !== 'right' && variantStyle.showDates && (
          <div className="flex items-center gap-2">
            {renderDates(edu, index, isEditable)}
            {variantStyle.showGPA && renderGPA(edu, index, isEditable)}
          </div>
        )}

        {/* GPA for right-aligned dates */}
        {variantStyle.datePosition === 'right' && variantStyle.showGPA && (
          <div>{renderGPA(edu, index, isEditable)}</div>
        )}
      </div>
    );
  };

  const renderReadOnly = () => {
    if (!items || items.length === 0) return null;

    return (
      <div className={className}>
        {renderTitle()}
        <div className={variantStyle.containerClass} data-section="education">
          {items.map((edu, index) => (
            <React.Fragment key={edu.id}>
              {renderEducationItem(edu, index, false)}
            </React.Fragment>
          ))}
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
        renderItem={(edu, index) => renderEducationItem(edu, index, true)}
      />
    </div>
  );
};

export default InlineEducationSection;

