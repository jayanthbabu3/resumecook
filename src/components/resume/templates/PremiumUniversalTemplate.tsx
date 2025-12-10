import { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { TemplateContactInfo, TemplateSocialLinks, SectionHeader } from "@/components/resume/shared/TemplateBase";
import { CustomSectionsWrapper } from "@/components/resume/shared/CustomSectionsWrapper";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfstandards";

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
  const styleOptions = useStyleOptionsWithDefaults();
  const accent = normalizeHex(themeColor) ?? "#2563eb";
  const accentBorder = withOpacity(accent, "33") ?? "#c7d2fe";
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return styleOptions.formatDate(dateString);
  };
  
  return (
    <StyleOptionsWrapper>
    <div 
      className="w-full h-full bg-white text-gray-900 leading-relaxed"
      style={{ 
        padding: '40px 48px',
          fontSize: '13px',
          lineHeight: 1.5,
        fontFamily: styles.fonts.primary,
          color: '#1a1a1a',
      }}
    >
      {/* Header */}
      <div style={{ 
        marginBottom: styles.spacing.sectionGap, 
        paddingBottom: '20px', 
        borderBottom: `1px solid ${accent}`,
      }}>
        {editable ? (
          <>
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="block mb-2"
            style={{ 
                fontSize: '27px',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              color: accent,
            }}
            as="h1"
          />
            {(editable || resumeData.personalInfo.title) && (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title || ""}
                className="block mb-4"
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#1a1a1a',
                }}
                as="p"
                placeholder="Professional Title"
              />
            )}
          </>
        ) : (
          <>
          <h1 className="mb-2" style={{ 
              fontSize: '27px',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            color: accent,
          }}>
            {resumeData.personalInfo.fullName}
          </h1>
            {resumeData.personalInfo.title && (
              <p className="mb-4" style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#1a1a1a',
              }}>
                {resumeData.personalInfo.title}
              </p>
              )}
          </>
          )}
        <div className="mt-4" style={{ fontSize: '13px', color: '#1a1a1a' }}>
          <TemplateContactInfo
            resumeData={resumeData}
            editable={editable}
            themeColor={accent}
            layout="horizontal"
          />
        </div>
      </div>

      {/* Professional Summary */}
      {(resumeData.personalInfo.summary || editable) && (
        <div style={{ marginBottom: '28px' }} data-section="summary">
          <SectionHeader 
            title="Professional Summary" 
            themeColor={accent}
            className="mb-3"
            paddingBottom="8px"
            style={{ marginBottom: '12px' }}
          />
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary || ""}
              className="block"
              style={{
                fontSize: '13px',
                color: '#1a1a1a',
                lineHeight: 1.5,
              }}
              multiline
              as="p"
              placeholder="Professional summary..."
            />
          ) : (
            <p style={{
              fontSize: '13px',
              color: '#1a1a1a',
              lineHeight: 1.5,
            }}>
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Social Links */}
      {resumeData.includeSocialLinks && (
        <div className="mb-8" data-section="social">
          <SectionHeader 
            title="Connect With Me" 
            themeColor={accent}
            className="mb-3"
            paddingBottom="8px"
            style={{ marginBottom: '12px' }}
          />
          <TemplateSocialLinks
            resumeData={resumeData}
            editable={editable}
            themeColor={accent}
            variant="horizontal"
          />
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div style={{ marginBottom: '28px' }} data-section="experience">
          <SectionHeader 
            title="Professional Experience" 
            themeColor={accent}
            className="mb-3"
            paddingBottom="8px"
            style={{ marginBottom: '12px' }}
          />
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
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#1a1a1a',
                        }}
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="block"
                        style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          color: '#1a1a1a',
                        }}
                        as="p"
                      />
                    </div>
                    <div className="text-right flex items-center gap-1" style={{ fontSize: '13px', color: '#525252' }}>
                          <InlineEditableDate
                            path={`experience[${index}].startDate`}
                            value={exp.startDate}
                        formatDisplay={formatDate}
                            className="inline-block"
                          />
                          <span> - </span>
                          {exp.current ? (
                            <span>Present</span>
                          ) : (
                            <InlineEditableDate
                              path={`experience[${index}].endDate`}
                              value={exp.endDate}
                          formatDisplay={formatDate}
                              className="inline-block"
                            />
                          )}
                    </div>
                  </div>
                  {exp.description && (
                    <InlineEditableText
                      path={`experience[${index}].description`}
                      value={exp.description}
                      className="block"
                      style={{
                        fontSize: '13px',
                        color: '#1a1a1a',
                        lineHeight: 1.5,
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
                        className="flex items-center gap-1 text-xs font-medium"
                        style={{ color: accent }}
                      >
                        <Plus className="h-3 w-3" />
                        Add Achievement
                      </button>
                    </div>
                  )}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <ul className="space-y-2">
                        {exp.bulletPoints.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start gap-3 group">
                            <span style={{ color: '#1a1a1a', marginTop: '4px' }}>
                              {styleOptions.getBulletChar()}
                            </span>
                            <div className="flex-1 flex items-center gap-2">
                              <InlineEditableText
                                path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                value={bullet || ""}
                                placeholder="Click to add achievement..."
                                className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                style={{
                                  fontSize: '13px',
                                  color: '#1a1a1a',
                                  lineHeight: 1.5,
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
                          className="mt-2 flex items-center gap-1 text-xs font-medium"
                          style={{ color: accent }}
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
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#1a1a1a',
                    }}>
                      {exp.position}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#1a1a1a',
                    }}>
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right" style={{ fontSize: '13px', color: '#525252' }}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </div>
                </div>
                
                {/* Bullet Points - Non-Editable Mode */}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                  <ul className="space-y-2" style={{ marginTop: '12px', fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
                    {exp.bulletPoints.map((bullet, bulletIndex) => (
                      bullet && (
                        <li key={bulletIndex} className="flex gap-3 items-start">
                          <span style={{ color: '#1a1a1a', marginTop: '4px' }}>
                            {styleOptions.getBulletChar()}
                          </span>
                          <span>{bullet}</span>
                        </li>
                      )
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Education - Boxed Layout Variant */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div data-section="education" style={{ marginBottom: '28px' }}>
          <SectionHeader 
            title="Education" 
            themeColor={accent}
            className="mb-3"
            paddingBottom="8px"
            style={{ marginBottom: '12px' }}
          />
          <div className="space-y-3">
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
                  gpa: "",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                  <div 
                    className="p-4 rounded"
                    style={{ 
                      border: `1px solid ${accentBorder}`,
                      backgroundColor: '#fafafa',
                      marginBottom: '12px'
                    }}
                  >
                  <div className="flex justify-between items-start">
                      <div className="flex-1">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                          value={edu.degree || "Degree"}
                        className="block"
                        style={{
                            fontSize: '15px',
                            fontWeight: 600,
                            color: '#1a1a1a',
                        }}
                        as="h3"
                      />
                        {(editable || edu.field) && (
                      <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field || ""}
                            className="mt-1 block"
                        style={{
                              fontSize: '13px',
                              color: '#1a1a1a',
                              lineHeight: 1.4,
                        }}
                        as="p"
                            placeholder="Field of Study"
                      />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school || "School Name"}
                          className="mt-1 block"
                          style={{
                            fontSize: '13px',
                            fontWeight: 500,
                            color: accent,
                          }}
                          as="p"
                        />
                        {(editable || edu.gpa) && (
                          <div className="mt-2" style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}>
                            <span>GPA: </span>
                            <InlineEditableText
                              path={`education[${index}].gpa`}
                              value={edu.gpa || ""}
                              className="inline-block font-medium"
                              placeholder="3.8/4.0"
                              style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}
                              as="span"
                            />
                          </div>
                      )}
                    </div>
                      <div className="flex items-center gap-1 ml-4" style={{ fontSize: '13px', color: '#525252', fontWeight: 500 }}>
                        <InlineEditableDate
                          path={`education[${index}].startDate`}
                          value={edu.startDate}
                          formatDisplay={formatDate}
                          className="inline-block"
                        />
                        <span> - </span>
                        <InlineEditableDate
                          path={`education[${index}].endDate`}
                          value={edu.endDate}
                          formatDisplay={formatDate}
                          className="inline-block"
                        />
                    </div>
                  </div>
                </div>
              )}
            />
          ) : (
            resumeData.education.map((edu, index) => (
                <div 
                  key={edu.id}
                  className="p-4 rounded"
                  style={{ 
                    border: `1px solid ${accentBorder}`,
                    backgroundColor: '#fafafa',
                    marginBottom: '12px'
                  }}
                >
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                    <h3 style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#1a1a1a',
                    }}>
                        {edu.degree}
                    </h3>
                      {edu.field && (
                        <p style={{
                          fontSize: '13px',
                          color: '#1a1a1a',
                          lineHeight: 1.4,
                        }}>
                          {edu.field}
                        </p>
                      )}
                      <p style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: accent,
                      }}>
                      {edu.school}
                    </p>
                    {edu.gpa && (
                        <p style={{
                          fontSize: '12px',
                          color: '#525252',
                          lineHeight: 1.4,
                          marginTop: '8px',
                        }}>
                          <span className="font-medium">GPA: {edu.gpa}</span>
                      </p>
                    )}
                  </div>
                    <div className="ml-4" style={{ fontSize: '13px', color: '#525252', fontWeight: 500 }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))
          )}
          </div>
        </div>
      )}

      {/* Skills - Vertical List Variant */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div style={{ marginBottom: '28px' }} data-section="skills">
          <SectionHeader 
            title="Skills" 
            themeColor={accent}
            className="mb-3"
            paddingBottom="8px"
            style={{ marginBottom: '12px' }}
          />
          <ul className="space-y-2" style={{ listStyle: 'none', paddingLeft: 0 }}>
          {editable ? (
              <>
                {resumeData.skills.map((skill, index) => (
                  <li 
                    key={skill.id || index}
                    className="flex items-center gap-2 group"
                    style={{
                      fontSize: '13px',
                      color: '#1a1a1a',
                      lineHeight: 1.5,
                    }}
                  >
                <span
                      style={{ 
                        color: accent,
                        marginRight: '4px',
                        fontSize: '10px'
                      }}
                    >
                      ▸
                    </span>
                    <InlineEditableText
                      path={`skills[${index}].name`}
                      value={skill.name}
                      className="flex-1"
                      style={{
                        fontSize: '13px',
                        color: '#1a1a1a',
                        lineHeight: 1.5,
                      }}
                      as="span"
                    />
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      const { addArrayItem } = useInlineEdit();
                      if (addArrayItem) {
                        addArrayItem('skills', { name: "New Skill", id: Date.now().toString() });
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors mt-2"
                    style={{ color: accent, borderColor: accent }}
                  >
                    <Plus className="h-3 w-3" />
                    Add Skill
                  </button>
                </li>
              </>
            ) : (
              resumeData.skills.map((skill, index) => (
                <li 
                  key={skill.id || index}
                  className="flex items-center gap-2"
                  style={{
                    fontSize: '13px',
                    color: '#1a1a1a',
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      color: accent,
                      marginRight: '4px',
                      fontSize: '10px'
                    }}
                  >
                    ▸
                  </span>
                  <span>{skill.name}</span>
                </li>
              ))
          )}
          </ul>
        </div>
      )}

      {/* Custom Sections */}
      <div data-section="custom">
        <CustomSectionsWrapper
          sections={resumeData.sections || []}
        editable={editable}
          accentColor={accent}
          styles={SINGLE_COLUMN_CONFIG}
          renderSectionHeader={(title, index, helpers) => (
            <SectionHeader
              title={title}
              themeColor={accent}
              className="mb-3"
              paddingBottom="8px"
              style={{ marginBottom: '12px' }}
            />
          )}
          itemStyle={{ 
            fontSize: '13px', 
            color: '#1a1a1a', 
            lineHeight: 1.5 
          }}
          sectionStyle={{ marginBottom: '28px' }}
          showAddSection={true}
          renderItem={(item, itemIndex, sectionIndex, helpers) => {
            const itemValue = typeof item === 'string' ? item : (item as any)?.text || String(item || '');
            const showBorder = editable;
  return (
              <div key={itemIndex} className="group flex items-start gap-2 mb-2">
              {editable ? (
                  <helpers.EditableText
                    className={`flex-1 min-h-[1.2rem] ${showBorder ? 'border border-dashed border-gray-300 rounded px-1' : ''}`}
                    style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}
                    placeholder="Click to add item..."
                />
                ) : (
                  <span style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: 1.5 }}>
                    {itemValue}
                  </span>
                )}
            {editable && (
              <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      helpers.remove();
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                style={{ color: '#ef4444' }}
              >
                    <span className="text-xs">×</span>
              </button>
            )}
          </div>
            );
          }}
          renderAddItemButton={(onClick, sectionIndex) => (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
              }}
              className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
              style={{ color: accent, borderColor: accent }}
            >
              <span>+</span>
              Add Item
            </button>
          )}
          />
        </div>
      </div>
    </StyleOptionsWrapper>
  );
};

// Separate component for Add Skill button to use hooks
const PremiumUniversalAddSkillButton = ({ accent }: { accent: string }) => {
  const { addArrayItem } = useInlineEdit();
  
  return (
        <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (addArrayItem) {
          addArrayItem('skills', { name: "New Skill", id: Date.now().toString() });
        }
      }}
      className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors mt-2"
          style={{ color: accent, borderColor: accent }}
        >
      <Plus className="h-3 w-3" />
      Add Skill
        </button>
  );
};

