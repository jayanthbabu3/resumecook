import { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

// Use centralized PDF config for consistent styling
const styles = SINGLE_COLUMN_CONFIG;

interface PremiumUniversalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

const normalizeHex = (color?: string) => {
  if (!color || !color.startsWith("#")) return undefined;
  if (color.length === 4) {
    const [_, r, g, b] = color;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return color.slice(0, 7);
};

const withOpacity = (color: string | undefined, alpha: string) => {
  const normalized = normalizeHex(color);
  if (!normalized) return color;
  return `${normalized}${alpha}`;
};

export const PremiumUniversalTemplate = ({
  resumeData,
  themeColor = "#2563eb",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: PremiumUniversalTemplateProps) => {
  console.log('🔴 PremiumUniversalTemplate rendered:', {
    editable,
    hasAddBulletPoint: !!onAddBulletPoint,
    hasRemoveBulletPoint: !!onRemoveBulletPoint,
    experienceCount: resumeData.experience?.length || 0,
    educationCount: resumeData.education?.length || 0,
    experienceData: resumeData.experience?.map(e => ({ 
      id: e.id, 
      position: e.position, 
      bulletPoints: e.bulletPoints,
      hasBulletPoints: !!(e.bulletPoints && e.bulletPoints.length > 0)
    })),
    educationData: resumeData.education?.map(e => ({ 
      id: e.id, 
      school: e.school, 
      degree: e.degree,
      gpa: e.gpa,
      hasGpa: !!e.gpa
    }))
  });
  
  const accent = normalizeHex(themeColor) ?? "#2563eb";
  const accentBorder = withOpacity(accent, "33") ?? "#c7d2fe";
  return (
    <div 
      className="w-full h-full bg-white text-gray-900 leading-relaxed"
      style={{ 
        padding: '40px 48px',
        fontSize: styles.itemDescription.size,
        lineHeight: styles.spacing.lineHeight,
        fontFamily: styles.fonts.primary,
        color: styles.colors.text.primary,
      }}
    >
      {/* Header */}
      <div style={{ 
        marginBottom: styles.spacing.sectionGap, 
        paddingBottom: '20px', 
        borderBottom: `1px solid ${accent}`,
      }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="block mb-2"
            style={{ 
              fontSize: styles.header.name.size,
              fontWeight: styles.header.name.weight,
              lineHeight: styles.header.name.lineHeight,
              letterSpacing: styles.header.name.letterSpacing,
              color: accent,
            }}
            as="h1"
          />
        ) : (
          <h1 className="mb-2" style={{ 
            fontSize: styles.header.name.size,
            fontWeight: styles.header.name.weight,
            lineHeight: styles.header.name.lineHeight,
            letterSpacing: styles.header.name.letterSpacing,
            color: accent,
          }}>
            {resumeData.personalInfo.fullName}
          </h1>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-1" style={{ fontSize: styles.header.contact.size, color: styles.colors.text.secondary }}>
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2 }} />
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.email}</span>
              )}
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2 }} />
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.phone}</span>
              )}
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2 }} />
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.location}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div style={{ marginBottom: styles.spacing.sectionGap }}>
          <h2 className="uppercase tracking-wide" style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: accent,
            marginBottom: '12px',
          }}>
            Professional Summary
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="block"
              style={{
                fontSize: styles.itemDescription.size,
                color: styles.colors.text.secondary,
                lineHeight: styles.itemDescription.lineHeight,
              }}
              multiline
              as="p"
            />
          ) : (
            <p style={{
              fontSize: styles.itemDescription.size,
              color: styles.colors.text.secondary,
              lineHeight: styles.itemDescription.lineHeight,
            }}>
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div style={{ marginBottom: styles.spacing.sectionGap }}>
          <h2 className="uppercase tracking-wide" style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: accent,
            marginBottom: '12px',
          }}>
            Professional Experience
          </h2>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={resumeData.experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Company Name",
                position: "Position Title",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Job description here",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div style={{ marginBottom: styles.spacing.itemGap }}>
                  <div className="flex justify-between items-start" style={{ marginBottom: '8px' }}>
                    <div>
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="block"
                        style={{
                          fontSize: styles.itemTitle.size,
                          fontWeight: styles.itemTitle.weight,
                          color: styles.colors.text.primary,
                        }}
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="block"
                        style={{
                          fontSize: styles.itemSubtitle.size,
                          fontWeight: styles.itemSubtitle.weight,
                          color: styles.colors.text.secondary,
                        }}
                        as="p"
                      />
                    </div>
                    <div className="text-right" style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
                      <p>
                        <div className="flex items-center gap-1">
                          <InlineEditableDate
                            path={`experience[${index}].startDate`}
                            value={exp.startDate}
                            className="inline-block"
                          />
                          <span> - </span>
                          {exp.current ? (
                            <span>Present</span>
                          ) : (
                            <InlineEditableDate
                              path={`experience[${index}].endDate`}
                              value={exp.endDate}
                              className="inline-block"
                            />
                          )}
                        </div>
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <InlineEditableText
                      path={`experience[${index}].description`}
                      value={exp.description}
                      className="block"
                      style={{
                        fontSize: styles.itemDescription.size,
                        color: styles.colors.text.secondary,
                        lineHeight: styles.itemDescription.lineHeight,
                      }}
                      multiline
                      as="div"
                    />
                  )}
                  {/* Bullet Points - Editable Mode */}
                  {(!exp.bulletPoints || exp.bulletPoints.length === 0) && onAddBulletPoint && exp.id && (
                    <div style={{ marginTop: '12px' }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (onAddBulletPoint && exp.id) {
                            onAddBulletPoint(exp.id);
                          }
                        }}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <Plus className="h-3 w-3" />
                        Add Achievement
                      </button>
                    </div>
                  )}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <ul className="ml-5 space-y-1" style={{ fontSize: styles.itemDescription.size, color: styles.colors.text.secondary, lineHeight: styles.itemDescription.lineHeight, listStyleType: 'disc', paddingLeft: '20px' }}>
                        {exp.bulletPoints.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="group" style={{ display: 'list-item' }}>
                            <div className="flex items-center gap-2">
                              <InlineEditableText
                                path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                value={bullet || ""}
                                placeholder="Click to add achievement..."
                                className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                style={{
                                  fontSize: styles.itemDescription.size,
                                  color: styles.colors.text.secondary,
                                  lineHeight: styles.itemDescription.lineHeight,
                                }}
                                multiline
                                as="span"
                              />
                              {onRemoveBulletPoint && (
                                <button
                                  onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                                >
                                  <X className="h-3 w-3 text-red-500" />
                                </button>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                      {onAddBulletPoint && exp.id && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onAddBulletPoint && exp.id) {
                              onAddBulletPoint(exp.id);
                            }
                          }}
                          className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <Plus className="h-3 w-3" />
                          Add Achievement
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            />
          ) : (
            resumeData.experience.map((exp, index) => (
              <div key={exp.id} style={{ marginBottom: styles.spacing.itemGap }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '8px' }}>
                  <div>
                    <h3 style={{
                      fontSize: styles.itemTitle.size,
                      fontWeight: styles.itemTitle.weight,
                      color: styles.colors.text.primary,
                    }}>
                      {exp.position}
                    </h3>
                    <p style={{
                      fontSize: styles.itemSubtitle.size,
                      fontWeight: styles.itemSubtitle.weight,
                      color: styles.colors.text.secondary,
                    }}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right" style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                
                {/* Bullet Points - Non-Editable Mode */}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                  <ul className="ml-5 list-disc space-y-1" style={{ marginTop: '12px', fontSize: styles.itemDescription.size, color: styles.colors.text.secondary, lineHeight: styles.itemDescription.lineHeight }}>
                    {exp.bulletPoints.map((bullet, bulletIndex) => (
                      bullet && (
                        <li key={bulletIndex}>{bullet}</li>
                      )
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div style={{ marginBottom: styles.spacing.sectionGap }}>
          <h2 className="uppercase tracking-wide" style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: accent,
            marginBottom: '12px',
          }}>
            Education
          </h2>
          {editable ? (
            <InlineEditableList
              path="education"
              items={resumeData.education}
              defaultItem={{
                id: Date.now().toString(),
                school: "School Name",
                degree: "Degree",
                field: "Field of Study",
                startDate: "2019-09",
                endDate: "2023-05",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div style={{ marginBottom: styles.spacing.itemGap }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                        className="block"
                        style={{
                          fontSize: styles.itemTitle.size,
                          fontWeight: styles.itemTitle.weight,
                          color: styles.colors.text.primary,
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
                      {edu.gpa && (
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
                    </div>
                    <div className="text-right" style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
                      <p>
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            />
          ) : (
            resumeData.education.map((edu, index) => (
              <div key={edu.id} style={{ marginBottom: styles.spacing.itemGap }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 style={{
                      fontSize: styles.itemTitle.size,
                      fontWeight: styles.itemTitle.weight,
                      color: styles.colors.text.primary,
                    }}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p style={{ fontSize: styles.itemSubtitle.size, color: styles.colors.text.secondary }}>
                      {edu.school}
                    </p>
                    {edu.gpa && (
                      <p style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
                        Grade: {edu.gpa}
                      </p>
                    )}
                  </div>
                  <div className="text-right" style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
                    <p>
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div style={{ marginBottom: styles.spacing.sectionGap }}>
          <h2 className="uppercase tracking-wide" style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: accent,
            marginBottom: '12px',
          }}>
            Skills
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill, index) => (
                <span
                  className="font-medium rounded"
                  style={{
                    padding: styles.skills.tag.padding,
                    fontSize: styles.skills.tag.size,
                    color: styles.colors.text.primary,
                    border: `1px solid ${accentBorder}`,
                  }}
                >
                  {skill.name}
                </span>
              )}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="font-medium rounded"
                    style={{
                      padding: styles.skills.tag.padding,
                      fontSize: styles.skills.tag.size,
                      color: styles.colors.text.primary,
                      border: `1px solid ${accentBorder}`,
                    }}
                  >
                    {skill.name}
                  </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      <PremiumUniversalCustomSections 
        sections={resumeData.sections}
        editable={editable}
        accent={accent}
        styles={styles}
      />
    </div>
  );
};

// Separate component for Custom Sections to use hooks
const PremiumUniversalCustomSections = ({ 
  sections, 
  editable, 
  accent,
  styles
}: { 
  sections: ResumeData['sections']; 
  editable: boolean; 
  accent: string;
  styles: typeof SINGLE_COLUMN_CONFIG;
}) => {
  const inlineEditContext = useInlineEdit();
  const addArrayItem = inlineEditContext?.addArrayItem;
  const removeArrayItem = inlineEditContext?.removeArrayItem;

  const handleAddSection = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!addArrayItem) return;
    addArrayItem('sections', {
      id: Date.now().toString(),
      title: 'New Section',
      content: '',
      items: ['Sample item 1', 'Sample item 2'],
    });
  };

  const handleRemoveSection = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!removeArrayItem) return;
    removeArrayItem('sections', index);
  };

  return (
    <>
      {sections && sections.map((section, sectionIndex) => (
        <div key={section.id || sectionIndex} style={{ marginBottom: styles.spacing.sectionGap, pageBreakInside: 'avoid' }} className="group/section">
          <div className="flex items-center gap-2">
            <h2 className="uppercase tracking-wide flex-1" style={{
              fontSize: styles.sectionHeading.size,
              fontWeight: styles.sectionHeading.weight,
              color: accent,
              marginBottom: '12px',
            }}>
              {editable ? (
                <InlineEditableText
                  path={`sections[${sectionIndex}].title`}
                  value={section.title}
                  className="inline-block"
                />
              ) : section.title}
            </h2>
            {editable && (
              <button
                onClick={(e) => handleRemoveSection(e, sectionIndex)}
                className="opacity-0 group-hover/section:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                style={{ color: '#ef4444' }}
                title="Remove Section"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Use InlineEditableSectionItems for dynamic content */}
          <InlineEditableSectionItems
            sectionIndex={sectionIndex}
            items={section.items || []}
            content={section.content || ""}
            editable={editable}
            itemStyle={{
              fontSize: styles.itemDescription.size,
              color: styles.colors.text.secondary,
              lineHeight: styles.itemDescription.lineHeight,
            }}
            addButtonLabel="Add Item"
            placeholder="Click to add item..."
            accentColor={accent}
            showBullets={false}
          />
        </div>
      ))}

      {/* Add Section Button */}
      {editable && (
        <button
          onClick={handleAddSection}
          className="mt-4 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border-2 border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accent, borderColor: accent }}
        >
          <Plus className="h-4 w-4" />
          Add Section
        </button>
      )}
    </>
  );
};
