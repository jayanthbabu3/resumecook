import type { ResumeData } from "@/types/resume";
import type { ResumeSection } from "@/types/resume";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Linkedin, Globe, Github, Plus, X } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableDynamicSection } from "@/components/resume/InlineEditableDynamicSection";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { HelperSectionVariantRenderer } from "@/components/resume/HelperSectionVariantRenderer";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

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
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
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
    <div 
      className="w-full h-full bg-white"
      style={{ 
        padding: '40px 48px',
        fontSize: styles.itemDescription.size,
        lineHeight: styles.spacing.lineHeight,
        fontFamily: styles.fonts.primary,
        color: styles.colors.text.primary,
        pageBreakAfter: 'auto',
      }}
    >
      {/* Header */}
      <div style={{ 
        marginBottom: styles.spacing.sectionGap, 
        paddingBottom: '24px', 
        borderBottom: `1.5px solid ${styles.colors.text.primary}`,
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
                    fontSize: styles.header.name.size,
                    fontWeight: styles.header.name.weight,
                    lineHeight: styles.header.name.lineHeight,
                    color: styles.colors.text.primary,
                  }}
                  as="h1"
                />
                {resumeData.personalInfo.title && (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="block"
                    style={{
                      fontSize: styles.header.title.size,
                      fontWeight: 500,
                      color: styles.colors.text.secondary,
                    }}
                    as="p"
                  />
                )}
              </>
            ) : (
              <>
                <h1 className="mb-2 uppercase tracking-wide" style={{
                  fontSize: styles.header.name.size,
                  fontWeight: styles.header.name.weight,
                  lineHeight: styles.header.name.lineHeight,
                  color: styles.colors.text.primary,
                }}>
                  {resumeData.personalInfo.fullName || "Your Name"}
                </h1>
                {resumeData.personalInfo.title && (
                  <p style={{
                    fontSize: styles.header.title.size,
                    fontWeight: 500,
                    color: styles.colors.text.secondary,
                  }}>
                    {resumeData.personalInfo.title}
                  </p>
                )}
              </>
            )}
          </div>
          <ProfilePhoto src={photo} borderClass="border-2 border-gray-200" />
        </div>
        <div className="mt-4 flex flex-wrap gap-4" style={{ fontSize: styles.header.contact.size, color: styles.colors.text.secondary }}>
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
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
              <Phone className="h-4 w-4" />
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
              <MapPin className="h-4 w-4" />
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
        <div style={{ marginBottom: styles.spacing.sectionGap, pageBreakInside: 'avoid' }}>
          <h2 className="uppercase tracking-wide" style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: styles.colors.text.primary,
            borderBottom: `1px solid ${styles.colors.border}`,
            paddingBottom: '8px',
            marginBottom: '12px',
            pageBreakAfter: 'avoid',
          }}>
            PROFESSIONAL SUMMARY
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

      {/* Social Links */}
      {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
        <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2" style={{ pageBreakAfter: 'avoid' }}>
            SOCIAL LINKS
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {resumeData.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.linkedin"
                    value={resumeData.personalInfo.linkedin}
                    className="inline-block"
                  />
                ) : (
                  <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    LinkedIn
                  </a>
                )}
              </div>
            )}
            {resumeData.personalInfo.portfolio && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.portfolio"
                    value={resumeData.personalInfo.portfolio}
                    className="inline-block"
                  />
                ) : (
                  <a href={resumeData.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    Portfolio
                  </a>
                )}
              </div>
            )}
            {resumeData.personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.github"
                    value={resumeData.personalInfo.github}
                    className="inline-block"
                  />
                ) : (
                  <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div style={{ marginBottom: styles.spacing.sectionGap }}>
          <h2 className="uppercase tracking-wide" style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: styles.colors.text.primary,
            borderBottom: `1px solid ${styles.colors.border}`,
            paddingBottom: '8px',
            marginBottom: '16px',
            pageBreakAfter: 'avoid',
          }}>
            PROFESSIONAL EXPERIENCE
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
                <div style={{ pageBreakInside: 'avoid', marginBottom: styles.spacing.itemGap }}>
                  <div className="flex justify-between items-baseline" style={{ marginBottom: '8px' }}>
                    <div>
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position || "Position Title"}
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
                        value={exp.company || "Company Name"}
                        className="block"
                        style={{
                          fontSize: styles.itemSubtitle.size,
                          fontWeight: styles.itemSubtitle.weight,
                          color: styles.colors.text.secondary,
                        }}
                        as="p"
                      />
                    </div>
                    <div className="text-right flex items-center gap-1" style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
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
                            fontSize: styles.itemDescription.size,
                            color: styles.colors.text.secondary,
                            lineHeight: styles.itemDescription.lineHeight,
                            marginBottom: styles.spacing.bulletGap,
                          }}>
                            <span className="mr-2 mt-1">•</span>
                            <div className="flex-1 flex items-center gap-2">
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
                          fontSize: styles.itemDescription.size,
                          color: styles.colors.text.secondary,
                          lineHeight: styles.itemDescription.lineHeight,
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
                        fontSize: styles.itemTitle.size,
                        fontWeight: styles.itemTitle.weight,
                        color: styles.colors.text.primary,
                      }}>
                        {exp.position || "Position Title"}
                      </h3>
                      <p style={{
                        fontSize: styles.itemSubtitle.size,
                        fontWeight: styles.itemSubtitle.weight,
                        color: styles.colors.text.secondary,
                      }}>
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <div className="text-right" style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <ul>
                        {exp.bulletPoints.map((bullet, index) => (
                          bullet && (
                            <li key={index} className="flex" style={{
                              fontSize: styles.itemDescription.size,
                              color: styles.colors.text.secondary,
                              lineHeight: styles.itemDescription.lineHeight,
                              marginBottom: styles.spacing.bulletGap,
                            }}>
                              <span className="mr-2">•</span>
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
                        fontSize: styles.itemDescription.size,
                        color: styles.colors.text.secondary,
                        lineHeight: styles.itemDescription.lineHeight,
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
        <div style={{ marginBottom: styles.spacing.sectionGap }}>
          <h2 className="uppercase tracking-wide" style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: styles.colors.text.primary,
            borderBottom: `1px solid ${styles.colors.border}`,
            paddingBottom: '8px',
            marginBottom: '16px',
            pageBreakAfter: 'avoid',
          }}>
            EDUCATION
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
                gpa: "3.5/4.0",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree || "Degree"}
                          className="inline-block"
                        />
                        {edu.field && (
                          <>
                            {" in "}
                            <InlineEditableText
                              path={`education[${index}].field`}
                              value={edu.field}
                              className="inline-block"
                            />
                          </>
                        )}
                      </h3>
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school || "School Name"}
                        className="text-sm text-gray-700 font-semibold block"
                        as="p"
                      />
                      {edu.gpa && (
                        <InlineEditableText
                          path={`education[${index}].gpa`}
                          value={edu.gpa}
                          className="text-xs text-gray-600 block"
                          as="p"
                        />
                      )}
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
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
                      <h3 className="text-base font-bold text-gray-900">
                        {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-sm text-gray-700 font-semibold">
                        {edu.school || "School Name"}
                      </p>
                      {edu.gpa && (
                        <p className="text-xs text-gray-600">
                          {edu.gpa}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
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
        <div style={{ marginBottom: styles.spacing.sectionGap, pageBreakInside: 'avoid' }}>
          <h2 className="uppercase tracking-wide" style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: styles.colors.text.primary,
            borderBottom: `1px solid ${styles.colors.border}`,
            paddingBottom: '8px',
            marginBottom: '12px',
            pageBreakAfter: 'avoid',
          }}>
            SKILLS
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill, index) =>
                skill.name && (
                  <span className="px-2 py-1 bg-gray-100 rounded font-medium" style={{
                    fontSize: styles.skills.tag.size,
                    color: styles.colors.text.secondary,
                  }}>
                    {skill.name}
                  </span>
                )
              }
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                skill.name && (
                  <span
                    key={skill.id}
                    className="px-2 py-1 bg-gray-100 rounded font-medium"
                    style={{
                      fontSize: styles.skills.tag.size,
                      color: styles.colors.text.secondary,
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
      <ProfessionalCustomSections 
        sections={resumeData.sections}
        editable={editable}
        themeColor={themeColor}
      />

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
  );
};

// Separate component for Custom Sections to use hooks
const ProfessionalCustomSections = ({ 
  sections, 
  editable, 
  themeColor 
}: { 
  sections: ResumeData['sections']; 
  editable: boolean; 
  themeColor?: string;
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

  const accent = themeColor || "#2563eb";

  return (
    <>
      {sections.map((section, index) => (
        <div key={section.id} className="mb-8 group/section" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-200 pb-2 flex-1" style={{ pageBreakAfter: 'avoid' }}>
              {editable ? (
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title}
                  className="inline-block"
                />
              ) : section.title}
            </h2>
            {editable && (
              <button
                onClick={(e) => handleRemoveSection(e, index)}
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
            sectionIndex={index}
            items={section.items || []}
            content={section.content || ""}
            editable={editable}
            itemStyle={{ fontSize: '14px', color: '#374151', lineHeight: '1.625' }}
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
