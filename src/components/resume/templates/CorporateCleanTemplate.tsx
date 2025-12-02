import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { Plus, X, Linkedin, Globe, Github } from "lucide-react";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

// Use centralized PDF config for consistent styling
const styles = SINGLE_COLUMN_CONFIG;

// Helper to create a lighter border color using rgba
const getLightBorderColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 0.25)`; // 25% opacity for lighter borders
};

export const CorporateCleanTemplate = ({ resumeData, themeColor = "#0369a1", editable = false, onAddBulletPoint, onRemoveBulletPoint }: TemplateProps) => {
  const lightBorderColor = getLightBorderColor(themeColor);
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div 
      className="w-full bg-white text-gray-900 leading-relaxed"
      style={{ 
        padding: '32px 40px',
        fontSize: styles.itemDescription.size,
        lineHeight: styles.spacing.lineHeight,
        fontFamily: styles.fonts.primary,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: styles.spacing.sectionGap, paddingBottom: '16px', borderBottom: '1px solid #d1d5db' }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName || "Your Name"}
            className="block mb-2"
            style={{ 
              fontSize: styles.header.name.size,
              fontWeight: styles.header.name.weight,
              lineHeight: styles.header.name.lineHeight,
              letterSpacing: styles.header.name.letterSpacing,
              color: styles.colors.text.primary,
            }}
            as="h1"
          />
        ) : (
          <h1 style={{ 
            fontSize: styles.header.name.size,
            fontWeight: styles.header.name.weight,
            lineHeight: styles.header.name.lineHeight,
            letterSpacing: styles.header.name.letterSpacing,
            color: styles.colors.text.primary,
            marginBottom: '8px',
          }}>
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={resumeData.personalInfo.title || "Professional Title"}
            className="block mb-4"
            style={{ 
              fontSize: styles.header.title.size,
              fontWeight: styles.header.title.weight,
              color: themeColor,
            }}
            as="p"
          />
        ) : (
          <p style={{ 
            fontSize: styles.header.title.size,
            fontWeight: styles.header.title.weight,
            color: themeColor,
            marginBottom: '16px',
          }}>
            {resumeData.personalInfo.title || "Professional Title"}
          </p>
        )}

        {/* Contact */}
        <div className="flex flex-wrap" style={{ gap: '24px', fontSize: styles.header.contact.size, color: styles.colors.text.secondary }}>
          {resumeData.personalInfo.email && (
            editable ? (
              <InlineEditableText
                path="personalInfo.email"
                value={resumeData.personalInfo.email}
                className="inline-block"
              />
            ) : (
              <span>{resumeData.personalInfo.email}</span>
            )
          )}
          {resumeData.personalInfo.phone && (
            editable ? (
              <InlineEditableText
                path="personalInfo.phone"
                value={resumeData.personalInfo.phone}
                className="inline-block"
              />
            ) : (
              <span>{resumeData.personalInfo.phone}</span>
            )
          )}
          {resumeData.personalInfo.location && (
            editable ? (
              <InlineEditableText
                path="personalInfo.location"
                value={resumeData.personalInfo.location}
                className="inline-block"
              />
            ) : (
              <span>{resumeData.personalInfo.location}</span>
            )
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div style={{ marginBottom: styles.spacing.sectionGap }}>
          <h2 style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: themeColor,
            borderBottom: `1px solid ${lightBorderColor}`,
            paddingBottom: '4px',
            marginBottom: '12px',
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
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-3 pb-1 border-b" style={{ color: themeColor, borderColor: lightBorderColor }}>
            SOCIAL LINKS
          </h2>
          <div className="flex flex-wrap gap-4 text-[12.5px] text-gray-700">
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
          <h2 style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: themeColor,
            borderBottom: `1px solid ${lightBorderColor}`,
            paddingBottom: '4px',
            marginBottom: '12px',
          }}>
            WORK EXPERIENCE
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
                <div className="group" style={{ marginBottom: styles.spacing.itemGap }}>
                  <div className="flex justify-between items-start gap-4" style={{ marginBottom: '8px' }}>
                    <div className="flex-1">
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
                          color: themeColor,
                        }}
                        as="p"
                      />
                    </div>
                    <div className="whitespace-nowrap flex items-center gap-1" style={{ fontSize: styles.itemDate.size, color: themeColor }}>
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
                      className="whitespace-pre-line block"
                      style={{
                        fontSize: styles.itemDescription.size,
                        color: styles.colors.text.secondary,
                        lineHeight: styles.itemDescription.lineHeight,
                      }}
                      multiline
                      as="p"
                    />
                  )}
                  
                  {/* Bullet Points */}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="list-none" style={{ marginTop: '12px' }}>
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex items-start" style={{ 
                          fontSize: styles.itemDescription.size,
                          color: styles.colors.text.secondary,
                          lineHeight: styles.itemDescription.lineHeight,
                          marginBottom: styles.spacing.bulletGap,
                        }}>
                          <span className="mr-2" style={{ color: themeColor }}>•</span>
                          {editable ? (
                            <InlineEditableText
                              path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                              value={bullet || ""}
                              placeholder="Click to add achievement..."
                              className="text-[12.5px] text-gray-700 leading-[1.7] flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                              multiline
                              as="span"
                            />
                          ) : (
                            bullet && <span>{bullet}</span>
                          )}
                          {editable && onRemoveBulletPoint && (
                            <button
                              onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded ml-2"
                            >
                              <X className="h-3 w-3 text-red-500" />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Add bullet point button */}
                  {editable && onAddBulletPoint && exp.id && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (onAddBulletPoint && exp.id) {
                          onAddBulletPoint(exp.id);
                        }
                      }}
                      className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Plus className="h-3 w-3" />
                      Add Achievement
                    </button>
                  )}
                </div>
              )}
            />
          ) : (
            <div>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="group" style={{ marginBottom: styles.spacing.itemGap }}>
                  <div className="flex justify-between items-start gap-4" style={{ marginBottom: '8px' }}>
                    <div className="flex-1">
                      <h3 style={{
                        fontSize: styles.itemTitle.size,
                        fontWeight: styles.itemTitle.weight,
                        color: styles.colors.text.primary,
                      }}>{exp.position || "Position Title"}</h3>
                      <p style={{ 
                        fontSize: styles.itemSubtitle.size,
                        fontWeight: styles.itemSubtitle.weight,
                        color: themeColor,
                      }}>{exp.company || "Company Name"}</p>
                    </div>
                    <span className="whitespace-nowrap" style={{ fontSize: styles.itemDate.size, color: themeColor }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="whitespace-pre-line" style={{
                      fontSize: styles.itemDescription.size,
                      color: styles.colors.text.secondary,
                      lineHeight: styles.itemDescription.lineHeight,
                    }}>
                      {exp.description}
                    </p>
                  )}
                  
                  {/* Bullet Points */}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="list-none" style={{ marginTop: '12px' }}>
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        bullet && (
                          <li key={bulletIndex} className="flex items-start" style={{ 
                            fontSize: styles.itemDescription.size,
                            color: styles.colors.text.secondary,
                            lineHeight: styles.itemDescription.lineHeight,
                            marginBottom: styles.spacing.bulletGap,
                          }}>
                            <span className="mr-2" style={{ color: themeColor }}>•</span>
                            <span>{bullet}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div style={{ marginBottom: styles.spacing.sectionGap }}>
          <h2 style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: themeColor,
            borderBottom: `1px solid ${lightBorderColor}`,
            paddingBottom: '4px',
            marginBottom: '12px',
          }}>
            KEY SKILLS
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill) => {
                return skill.name ? (
                  <span className="inline-block mr-4 mb-2" style={{ fontSize: styles.itemDescription.size, color: styles.colors.text.secondary }}>
                    • {skill.name}
                  </span>
                ) : null;
              }}
            />
          ) : (
            <div className="flex flex-wrap">
              {resumeData.skills.map((skill) => (
                skill.name ? (
                  <span key={skill.id} className="mr-4 mb-2" style={{ fontSize: styles.itemDescription.size, color: styles.colors.text.secondary }}>
                    • {skill.name}
                  </span>
                ) : null
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div style={{ marginBottom: styles.spacing.sectionGap }}>
          <h2 style={{ 
            fontSize: styles.sectionHeading.size,
            fontWeight: styles.sectionHeading.weight,
            color: themeColor,
            borderBottom: `1px solid ${lightBorderColor}`,
            paddingBottom: '4px',
            marginBottom: '12px',
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
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div style={{ marginBottom: styles.spacing.itemGap }}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="block"
                        style={{
                          fontSize: styles.itemTitle.size,
                          fontWeight: styles.itemTitle.weight,
                          color: styles.colors.text.primary,
                        }}
                        as="h3"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="block"
                          style={{ fontSize: styles.itemSubtitle.size, color: styles.colors.text.secondary }}
                          as="p"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="block"
                        style={{ fontSize: styles.itemSubtitle.size, color: themeColor }}
                        as="p"
                      />
                      {edu.gpa && (
                        <InlineEditableText
                          path={`education[${index}].gpa`}
                          value={`GPA: ${edu.gpa}`}
                          className="block"
                          style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary, marginTop: '2px' }}
                          as="p"
                        />
                      )}
                    </div>
                    <div className="whitespace-nowrap flex items-center gap-1" style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
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
            <div>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start gap-4" style={{ marginBottom: styles.spacing.itemGap }}>
                  <div className="flex-1">
                    <h3 style={{
                      fontSize: styles.itemTitle.size,
                      fontWeight: styles.itemTitle.weight,
                      color: styles.colors.text.primary,
                    }}>{edu.degree}</h3>
                    {edu.field && <p style={{ fontSize: styles.itemSubtitle.size, color: styles.colors.text.secondary }}>{edu.field}</p>}
                    <p style={{ fontSize: styles.itemSubtitle.size, color: themeColor }}>{edu.school}</p>
                    {edu.gpa && <p style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary, marginTop: '2px' }}>GPA: {edu.gpa}</p>}
                  </div>
                  <span className="whitespace-nowrap" style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {editable ? (
        <InlineEditableList
          path="sections"
          items={resumeData.sections || []}
          defaultItem={{
            id: Date.now().toString(),
            title: "Certifications",
            content: "Certification Name",
          }}
          addButtonLabel="Add Section"
          renderItem={(section, index) => (
            <div key={section.id} className="mb-8">
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="text-[14px] font-bold mb-3 pb-1 border-b block"
                style={{ color: themeColor, borderColor: lightBorderColor }}
                as="h2"
              />
              <InlineEditableText
                path={`sections[${index}].content`}
                value={section.content}
                className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line block"
                multiline
                as="p"
              />
            </div>
          )}
        />
      ) : (
        resumeData.sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-[14px] font-bold mb-3 pb-1 border-b" style={{ color: themeColor, borderColor: lightBorderColor }}>
              {section.title.toUpperCase()}
            </h2>
            <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
