import type { ResumeData } from "@/types/resume";
import type { ResumeSection } from "@/types/resume";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Linkedin, Globe, Github, Plus, X } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableDynamicSection } from "@/components/resume/InlineEditableDynamicSection";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { TemplateContactInfo, TemplateSocialLinks, SectionHeader } from "@/components/resume/shared/TemplateBase";
import { CustomSectionsWrapper } from "@/components/resume/shared/CustomSectionsWrapper";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { HelperSectionVariantRenderer } from "@/components/resume/HelperSectionVariantRenderer";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfstandards";

// Use centralized PDF config for consistent styling
const styles = SINGLE_COLUMN_CONFIG;

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
  showSkillRatings?: boolean; // Enable skill ratings (default: false)
}

export const ProfessionalTemplate = ({ resumeData, themeColor, editable = false, onAddBulletPoint, onRemoveBulletPoint, showSkillRatings = false }: TemplateProps) => {
  const styleOptions = useStyleOptionsWithDefaults();
  const accent = themeColor || "#1a1a1a";
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return styleOptions.formatDate(dateString);
  };

  const photo = resumeData.personalInfo.photo;

  // Render a single dynamic section
  const renderDynamicSection = (section: ResumeSection, sectionIndex: number) => {
    if (!section.enabled) return null;

    // For editable mode, render with inline editing support
    if (editable) {
      const renderNonEditableContent = () => {
        return <HelperSectionVariantRenderer section={section} formatDate={formatDate} />;
      };

      return (
        <div key={section.id} style={{ pageBreakInside: 'avoid' }}>
          <InlineEditableDynamicSection
            section={section}
            sectionIndex={sectionIndex}
            formatDate={formatDate}
            renderNonEditable={renderNonEditableContent}
          />
        </div>
      );
    }

    // For non-editable mode, use the variant renderer directly
    return <HelperSectionVariantRenderer key={section.id} section={section} formatDate={formatDate} />;
  };

  return (
    <StyleOptionsWrapper>
      <div 
        className="w-full h-full bg-white"
        style={{ 
          padding: '40px 48px',
          fontSize: '13px',
          lineHeight: 1.5,
          fontFamily: styles.fonts.primary,
          color: '#1a1a1a',
          pageBreakAfter: 'auto',
        }}
      >
      {/* Header */}
      <div style={{ 
        marginBottom: styles.spacing.sectionGap, 
        paddingBottom: '24px', 
        borderBottom: `1.5px solid ${styles.itemDescription.color}`,
        pageBreakAfter: 'avoid', 
        pageBreakInside: 'avoid',
      }}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            {editable ? (
              <>
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName || "Your Name"}
                  className="block mb-2 uppercase tracking-wide"
                  style={{
                    fontSize: '27px',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: '#1a1a1a',
                  }}
                  as="h1"
                />
                {(editable || resumeData.personalInfo.title) && (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title || ""}
                    className="block"
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
                <h1 className="mb-2 uppercase tracking-wide" style={{
                  fontSize: '27px',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#1a1a1a',
                }}>
                  {resumeData.personalInfo.fullName || "Your Name"}
                </h1>
                {resumeData.personalInfo.title && (
                  <p style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: '#1a1a1a',
                  }}>
                    {resumeData.personalInfo.title}
                  </p>
                )}
              </>
            )}
          </div>
          <ProfilePhoto src={photo} borderClass="border-2 border-gray-200" />
        </div>
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
        <div style={{ marginBottom: '28px', pageBreakInside: 'avoid' }} data-section="summary">
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
        <div className="mb-8" data-section="social" style={{ pageBreakInside: 'avoid' }}>
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
      {resumeData.experience.length > 0 && (
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
                <div style={{ pageBreakInside: 'avoid', marginBottom: styles.spacing.itemGap }}>
                  <div className="flex justify-between items-baseline" style={{ marginBottom: '8px' }}>
                    <div>
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position || "Position Title"}
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
                        value={exp.company || "Company Name"}
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
                  {(!exp.bulletPoints || exp.bulletPoints.length === 0) && editable && onAddBulletPoint && exp.id && (
                    <div className="mt-3">
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
                      <ul>
                        {exp.bulletPoints.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start group" style={{
                            fontSize: '13px',
                            color: '#1a1a1a',
                            lineHeight: 1.5,
                            marginBottom: '6px',
                          }}>
                            <span className="mr-2 mt-1" style={{ color: '#1a1a1a' }}>
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
                              {editable && onRemoveBulletPoint && (
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
                      {editable && onAddBulletPoint && exp.id && (
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
                  {exp.description && (
                    <div style={{ marginTop: '12px' }}>
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        className="whitespace-pre-line block"
                        style={{
                          fontSize: '13px',
                          color: '#1a1a1a',
                          lineHeight: 1.5,
                        }}
                        multiline
                        as="p"
                      />
                    </div>
                  )}
                </div>
              )}
            />
          ) : (
            <div>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} style={{ pageBreakInside: 'avoid', marginBottom: styles.spacing.itemGap }}>
                  <div className="flex justify-between items-baseline" style={{ marginBottom: '8px' }}>
                    <div>
                      <h3 style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#1a1a1a',
                      }}>
                        {exp.position || "Position Title"}
                      </h3>
                      <p style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: '#1a1a1a',
                      }}>
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <div className="text-right" style={{ fontSize: '13px', color: '#525252' }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <ul>
                        {exp.bulletPoints.map((bullet, index) => (
                          bullet && (
                            <li key={index} className="flex" style={{
                              fontSize: '13px',
                              color: '#1a1a1a',
                              lineHeight: 1.5,
                              marginBottom: '6px',
                            }}>
                              <span className="mr-2" style={{ color: '#1a1a1a' }}>
                                {styleOptions.getBulletChar()}
                              </span>
                              <span>{bullet}</span>
                            </li>
                          )
                        ))}
                      </ul>
                    </div>
                  )}
                  {exp.description && (
                    <div style={{ marginTop: '12px' }}>
                      <p className="whitespace-pre-line" style={{
                        fontSize: '13px',
                        color: '#1a1a1a',
                        lineHeight: 1.5,
                      }}>
                        {exp.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div style={{ marginBottom: '28px' }} data-section="education">
          <SectionHeader 
            title="Education" 
            themeColor={accent}
            className="mb-3"
            paddingBottom="8px"
            style={{ marginBottom: '12px' }}
          />
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
                <div style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
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
                          color: '#1a1a1a',
                        }}
                        as="p"
                      />
                      {(editable || edu.gpa) && (
                        <div className="mt-1" style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}>
                          <span>GPA: </span>
                          <InlineEditableText
                            path={`education[${index}].gpa`}
                            value={edu.gpa || ""}
                            className="inline-block"
                            placeholder="3.8/4.0"
                            style={{ fontSize: '12px', color: '#525252', lineHeight: 1.4 }}
                            as="span"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 ml-4" style={{ fontSize: '13px', color: '#525252' }}>
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
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <h3 style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#1a1a1a',
                      }}>
                        {edu.degree || "Degree"}
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
                        color: '#1a1a1a',
                      }}>
                        {edu.school || "School Name"}
                      </p>
                      {edu.gpa && (
                        <p style={{
                          fontSize: '12px',
                          color: '#525252',
                          lineHeight: 1.4,
                        }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="ml-4" style={{ fontSize: '13px', color: '#525252' }}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div style={{ marginBottom: '28px', pageBreakInside: 'avoid' }} data-section="skills">
          <SectionHeader 
            title="Skills" 
            themeColor={accent}
            className="mb-3"
            paddingBottom="8px"
            style={{ marginBottom: '12px' }}
          />
          {editable ? (
            <div className="flex flex-wrap gap-2">
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <span className="px-2 py-1 bg-gray-100 rounded font-medium" style={{
                    fontSize: '13px',
                    color: '#1a1a1a',
                  }}>
                    {skill.name}
                  </span>
                )}
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                skill.name && (
                  <span
                    key={skill.id}
                    className="px-2 py-1 bg-gray-100 rounded font-medium"
                    style={{
                      fontSize: '13px',
                      color: '#1a1a1a',
                    }}
                  >
                    {skill.name}
                  </span>
                )
              ))}
            </div>
          )}
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

      {/* Dynamic Sections (New Feature) */}
      {resumeData.dynamicSections && Array.isArray(resumeData.dynamicSections) && resumeData.dynamicSections.length > 0 && (
        <>
          {resumeData.dynamicSections
            .filter(section => section.enabled)
            .sort((a, b) => a.order - b.order)
            .map((section, index) => {
              // Find the actual index in the original array for proper path
              const actualIndex = resumeData.dynamicSections!.findIndex(s => s.id === section.id);
              return (
                <div key={section.id}>
                  {renderDynamicSection(section, actualIndex)}
                </div>
              );
            })}
        </>
      )}
      </div>
    </StyleOptionsWrapper>
  );
};

