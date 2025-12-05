/**
 * TemplateEducation - Standardized education section for all templates
 * 
 * This component handles:
 * - Education items display
 * - GPA, coursework, honors
 * - Editable/non-editable modes
 * - Consistent styling via config
 */

import React from 'react';
import { EducationItem } from '@/types/resume';
import { InlineEditableText } from '@/components/resume/InlineEditableText';
import { InlineEditableDate } from '@/components/resume/InlineEditableDate';
import { InlineEditableList } from '@/components/resume/InlineEditableList';
import { PDFStyleConfig } from '@/lib/pdfStyles';
import { SectionConfig } from '@/lib/templateConfig';

export interface TemplateEducationProps {
  /** Education items */
  education: EducationItem[];
  /** Whether the section is editable */
  editable?: boolean;
  /** Theme/accent color */
  accentColor?: string;
  /** PDF style configuration */
  styles: PDFStyleConfig;
  /** Section configuration */
  sectionConfig?: SectionConfig;
  /** Section title override */
  title?: string;
  /** Whether to show GPA */
  showGpa?: boolean;
  /** Whether to show field of study */
  showField?: boolean;
  /** Custom className */
  className?: string;
}

const DEFAULT_SECTION_CONFIG: SectionConfig = {
  enabled: true,
  order: 3,
  title: 'Education',
  titleCase: 'uppercase',
};

export const TemplateEducation: React.FC<TemplateEducationProps> = ({
  education,
  editable = false,
  accentColor = '#2563eb',
  styles,
  sectionConfig = DEFAULT_SECTION_CONFIG,
  title,
  showGpa = true,
  showField = true,
  className = '',
}) => {
  if (!education || education.length === 0) {
    if (!editable) return null;
  }

  const sectionTitle = title || sectionConfig.title || 'Education';
  const titleStyle: React.CSSProperties = {
    fontSize: styles.sectionHeading.size,
    fontWeight: styles.sectionHeading.weight,
    color: accentColor,
    marginBottom: '12px',
    textTransform: sectionConfig.titleCase === 'uppercase' ? 'uppercase' : 
                   sectionConfig.titleCase === 'capitalize' ? 'capitalize' : 'none',
    letterSpacing: sectionConfig.titleCase === 'uppercase' ? '0.05em' : undefined,
  };

  const renderEducationItem = (edu: EducationItem, index: number) => {
    const degreeText = showField && edu.field 
      ? `${edu.degree} in ${edu.field}` 
      : edu.degree;

    return (
      <div key={edu.id} style={{ marginBottom: styles.spacing.itemGap }}>
        <div className="flex justify-between items-start">
          <div>
            {editable ? (
              <>
                <InlineEditableText
                  path={`education[${index}].degree`}
                  value={degreeText}
                  className="block"
                  style={{
                    fontSize: styles.itemTitle.size,
                    fontWeight: styles.itemTitle.weight,
                    color: styles.itemTitle.color,
                  }}
                  as="h3"
                />
                <InlineEditableText
                  path={`education[${index}].school`}
                  value={edu.school}
                  className="block"
                  style={{
                    fontSize: styles.itemSubtitle.size,
                    color: styles.colors.text.secondary,
                  }}
                  as="p"
                />
                {showGpa && edu.gpa && (
                  <InlineEditableText
                    path={`education[${index}].gpa`}
                    value={`Grade: ${edu.gpa}`}
                    className="block"
                    style={{
                      fontSize: styles.itemDate.size,
                      color: styles.colors.text.secondary,
                    }}
                    as="p"
                  />
                )}
              </>
            ) : (
              <>
                <h3 style={{
                  fontSize: styles.itemTitle.size,
                  fontWeight: styles.itemTitle.weight,
                  color: styles.itemTitle.color,
                }}>
                  {degreeText}
                </h3>
                <p style={{ 
                  fontSize: styles.itemSubtitle.size, 
                  color: styles.colors.text.secondary 
                }}>
                  {edu.school}
                </p>
                {showGpa && edu.gpa && (
                  <p style={{ 
                    fontSize: styles.itemDate.size, 
                    color: styles.colors.text.secondary 
                  }}>
                    Grade: {edu.gpa}
                  </p>
                )}
              </>
            )}
          </div>
          
          {/* Date */}
          <div 
            className="text-right"
            style={{ 
              fontSize: styles.itemDate.size, 
              color: styles.colors.text.secondary 
            }}
          >
            {editable ? (
              <div className="flex items-center gap-1">
                <InlineEditableDate
                  path={`education[${index}].startDate`}
                  value={edu.startDate}
                  className="inline-block"
                />
                <span> - </span>
                <InlineEditableDate
                  path={`education[${index}].endDate`}
                  value={edu.endDate}
                  className="inline-block"
                />
              </div>
            ) : (
              <span>{edu.startDate} - {edu.endDate}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={className} 
      data-section="education"
      style={{ 
        marginBottom: styles.spacing.sectionGap,
        lineHeight: 1.8,
      }}
    >
      <h2 className="tracking-wide" style={titleStyle}>
        {sectionTitle}
      </h2>
      
      {editable ? (
        <InlineEditableList
          path="education"
          items={education}
          defaultItem={{
            id: Date.now().toString(),
            school: 'School Name',
            degree: 'Degree',
            field: 'Field of Study',
            startDate: '2019-09',
            endDate: '2023-05',
          }}
          addButtonLabel="Add Education"
          renderItem={(edu, index) => renderEducationItem(edu, index)}
        />
      ) : (
        education.map((edu, index) => renderEducationItem(edu, index))
      )}
    </div>
  );
};

export default TemplateEducation;
