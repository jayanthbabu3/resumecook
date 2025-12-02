import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X, Linkedin, Globe, Github, Mail, Phone, MapPin } from "lucide-react";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

export const MinimalistProTemplate = ({ resumeData, themeColor = "#475569", editable = false, onAddBulletPoint, onRemoveBulletPoint }: TemplateProps) => {
  const styles = SINGLE_COLUMN_CONFIG;
  const accent = themeColor || styles.colors.primary;
  const accentLight = `${accent}20`;

  const headingStyle = {
    fontSize: styles.sectionHeading.size,
    fontWeight: styles.sectionHeading.weight,
    letterSpacing: styles.sectionHeading.letterSpacing,
    color: styles.colors.text.primary,
    marginBottom: styles.spacing.itemGap,
  };

  const descriptionStyle = {
    fontSize: styles.itemDescription.size,
    color: styles.itemDescription.color,
    lineHeight: styles.itemDescription.lineHeight,
  };

  const itemTitleStyle = {
    fontSize: styles.itemTitle.size,
    fontWeight: styles.itemTitle.weight,
    lineHeight: styles.itemTitle.lineHeight ?? styles.spacing.lineHeight,
    color: styles.colors.text.primary,
  };

  const itemSubtitleStyle = {
    fontSize: styles.itemSubtitle.size,
    fontWeight: styles.itemSubtitle.weight,
    lineHeight: styles.itemSubtitle.lineHeight ?? styles.spacing.lineHeight,
    color: accent,
  };

  const itemDateStyle = {
    fontSize: styles.itemDate.size,
    fontWeight: styles.itemDate.weight,
    lineHeight: styles.itemDate.lineHeight ?? styles.spacing.lineHeight,
    color: styles.colors.text.secondary,
  };

  const bulletListStyle = {
    listStyleType: "disc" as const,
    paddingLeft: "20px",
    margin: 0,
    display: "flex",
    flexDirection: "column" as const,
    gap: styles.spacing.bulletGap,
    fontSize: styles.itemDescription.size,
    color: styles.itemDescription.color,
    lineHeight: styles.itemDescription.lineHeight,
  };

  const skillTagStyle = {
    display: "inline-block",
    color: styles.colors.text.primary,
    fontSize: styles.skills.tag.size,
    fontWeight: styles.skills.tag.weight,
    lineHeight: styles.skills.tag.lineHeight,
    padding: styles.skills.tag.padding,
    backgroundColor: accentLight,
    borderRadius: styles.skills.tag.borderRadius,
  };

  const contactValueStyle = {
    fontSize: styles.header.contact.size,
    lineHeight: styles.header.contact.lineHeight,
    color: styles.colors.text.secondary,
  };
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div
      className="w-full h-full bg-white"
      style={{
        fontFamily: styles.fonts.primary,
        color: styles.colors.text.primary,
        lineHeight: styles.spacing.lineHeight,
        padding: "40px 48px",
        pageBreakAfter: "auto",
      }}
    >
      {/* Header - Minimal */}
      <div className="mb-8">
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName || "Your Name"}
            className="mb-2 block"
            as="h1"
            style={{
              fontSize: styles.header.name.size,
              fontWeight: styles.header.name.weight,
              lineHeight: styles.header.name.lineHeight,
              letterSpacing: styles.header.name.letterSpacing,
              color: accent,
            }}
          />
        ) : (
          <h1
            className="mb-2"
            style={{
              fontSize: styles.header.name.size,
              fontWeight: styles.header.name.weight,
              lineHeight: styles.header.name.lineHeight,
              letterSpacing: styles.header.name.letterSpacing,
              color: accent,
            }}
          >
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
        )}
        {resumeData.personalInfo.title && (
          editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title || "Professional Title"}
              className="mb-6 block"
              as="p"
              style={{
                fontSize: styles.header.title.size,
                fontWeight: styles.header.title.weight,
                lineHeight: styles.header.title.lineHeight,
                color: styles.colors.text.secondary,
              }}
            />
          ) : (
            <p
              className="mb-6"
              style={{
                fontSize: styles.header.title.size,
                fontWeight: styles.header.title.weight,
                lineHeight: styles.header.title.lineHeight,
                color: styles.colors.text.secondary,
              }}
            >
              {resumeData.personalInfo.title || "Professional Title"}
            </p>
          )
        )}

        {/* Contact - Minimal */}
        <div
          className="flex gap-6"
          style={{
            fontSize: contactValueStyle.fontSize,
            lineHeight: contactValueStyle.lineHeight,
            color: contactValueStyle.color,
          }}
        >
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" style={{ color: accent }} />
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="inline-block"
                  style={contactValueStyle}
                />
              ) : (
                <span style={contactValueStyle}>{resumeData.personalInfo.email}</span>
              )}
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" style={{ color: accent }} />
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="inline-block"
                  style={contactValueStyle}
                />
              ) : (
                <span style={contactValueStyle}>{resumeData.personalInfo.phone}</span>
              )}
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ color: accent }} />
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="inline-block"
                  style={contactValueStyle}
                />
              ) : (
                <span style={contactValueStyle}>{resumeData.personalInfo.location}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div style={{ marginBottom: styles.spacing.sectionGap, pageBreakInside: 'avoid' }}>
          <div className="h-px w-full mb-6" style={{ backgroundColor: accentLight }}></div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="block"
              multiline
              as="p"
              style={descriptionStyle}
            />
          ) : (
            <p style={descriptionStyle}>{resumeData.personalInfo.summary}</p>
          )}
        </div>
      )}

      {/* Social Links */}
      {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
        <div style={{ marginBottom: styles.spacing.sectionGap, pageBreakInside: 'avoid' }}>
          <h2 style={headingStyle}>Social Links</h2>
          <div className="flex flex-wrap gap-4" style={contactValueStyle}>
            {resumeData.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.linkedin"
                    value={resumeData.personalInfo.linkedin}
                    className="inline-block"
                    style={contactValueStyle}
                  />
                ) : (
                  <a
                    href={resumeData.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accent }}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
            {resumeData.personalInfo.portfolio && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.portfolio"
                    value={resumeData.personalInfo.portfolio}
                    className="inline-block"
                    style={contactValueStyle}
                  />
                ) : (
                  <a
                    href={resumeData.personalInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accent }}
                  >
                    Portfolio
                  </a>
                )}
              </div>
            )}
            {resumeData.personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.github"
                    value={resumeData.personalInfo.github}
                    className="inline-block"
                    style={contactValueStyle}
                  />
                ) : (
                  <a
                    href={resumeData.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accent }}
                  >
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
          <h2 style={headingStyle}>Experience</h2>
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
                <div style={{ marginBottom: styles.spacing.itemGap, pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline gap-4" style={{ marginBottom: "8px" }}>
                    <div className="flex-1">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position || "Position Title"}
                        className="block"
                        as="h3"
                        style={itemTitleStyle}
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company || "Company Name"}
                        className="block"
                        as="p"
                        style={itemSubtitleStyle}
                      />
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap" style={itemDateStyle}>
                      <InlineEditableDate
                        path={`experience[${index}].startDate`}
                        value={exp.startDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                      <span>—</span>
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
                    <div style={{ marginTop: "8px" }}>
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
                    <div style={{ marginTop: "12px" }}>
                      <ul style={bulletListStyle}>
                        {exp.bulletPoints.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="group" style={{ display: 'list-item' }}>
                            <div className="flex items-start gap-2">
                              <InlineEditableText
                                path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                value={bullet || ""}
                                placeholder="Click to add achievement..."
                                className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                style={descriptionStyle}
                                multiline
                                as="span"
                              />
                              {editable && onRemoveBulletPoint && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onRemoveBulletPoint(exp.id, bulletIndex);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
                                  style={{ color: '#ef4444' }}
                                >
                                  <X className="h-3 w-3" />
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
                          className="mt-2 flex items-center gap-1 text-xs font-medium"
                          style={{ color: accent }}
                        >
                          <Plus className="h-3 w-3" />
                          Add Achievement
                        </button>
                      )}
                    </div>
                  )}
                  {exp.description && (!exp.bulletPoints || exp.bulletPoints.length === 0) && (
                    <div style={{ marginTop: "12px" }}>
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        className="block"
                        style={descriptionStyle}
                        multiline
                        as="p"
                      />
                    </div>
                  )}
                </div>
              )}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.itemGap }}>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline gap-4" style={{ marginBottom: "8px" }}>
                    <div className="flex-1">
                      <h3 style={itemTitleStyle}>{exp.position || "Position Title"}</h3>
                      <p style={itemSubtitleStyle}>{exp.company || "Company Name"}</p>
                    </div>
                    <span style={itemDateStyle}>
                      {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.bulletPoints && exp.bulletPoints.length > 0 ? (
                    <ul style={bulletListStyle}>
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        bullet && (
                          <li key={bulletIndex} style={{ display: 'list-item' }}>
                            <span>{bullet}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  ) : (
                    exp.description && (
                      <p style={{ ...descriptionStyle, marginTop: "12px" }}>
                        {exp.description}
                      </p>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div style={{ marginBottom: styles.spacing.sectionGap, pageBreakInside: 'avoid' }}>
          <h2 style={headingStyle}>Skills</h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill) => {
                return skill.name ? (
                  <span style={{ ...skillTagStyle, marginRight: '8px', marginBottom: '8px' }}>
                    {skill.name}
                  </span>
                ) : null;
              }}
              className="flex flex-wrap gap-2"
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                skill.name ? (
                  <span key={skill.id} style={skillTagStyle}>
                    {skill.name}
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
          <h2 style={headingStyle}>Education</h2>
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
                <div style={{ marginBottom: styles.spacing.itemGap, pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline gap-4">
                    <div className="flex-1">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="block"
                        as="h3"
                        style={itemTitleStyle}
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="block"
                          as="p"
                          style={descriptionStyle}
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="block"
                        as="p"
                        style={{ ...itemSubtitleStyle, color: styles.colors.text.secondary }}
                      />
                      {edu.gpa && (
                        <InlineEditableText
                          path={`education[${index}].gpa`}
                          value={edu.gpa}
                          className="block"
                          as="p"
                          style={{ ...descriptionStyle, fontWeight: '500' }}
                          placeholder="Grade/Percentage (Optional)"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap" style={itemDateStyle}>
                      <InlineEditableDate
                        path={`education[${index}].startDate`}
                        value={edu.startDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                      <span>—</span>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.itemGap }}>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline gap-4" style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex-1">
                    <h3 style={itemTitleStyle}>{edu.degree}</h3>
                    {edu.field && <p style={descriptionStyle}>{edu.field}</p>}
                    <p style={{ ...itemSubtitleStyle, color: styles.colors.text.secondary }}>{edu.school}</p>
                    {edu.gpa && <p style={{ ...descriptionStyle, fontWeight: '500' }}>{edu.gpa}</p>}
                  </div>
                  <span style={itemDateStyle}>
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      <CustomSectionsRenderer 
        sections={resumeData.sections} 
        editable={editable} 
        headingStyle={headingStyle}
        descriptionStyle={descriptionStyle}
        accentColor={accent}
        sectionGap={styles.spacing.sectionGap}
      />
    </div>
  );
};

// Separate component for Custom Sections to use hooks
interface CustomSectionsRendererProps {
  sections: ResumeData['sections'];
  editable: boolean;
  headingStyle: React.CSSProperties;
  descriptionStyle: React.CSSProperties;
  accentColor: string;
  sectionGap: string;
}

const CustomSectionsRenderer = ({ 
  sections, 
  editable, 
  headingStyle, 
  descriptionStyle, 
  accentColor,
  sectionGap 
}: CustomSectionsRendererProps) => {
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
      {sections.map((section, index) => (
        <div key={section.id} style={{ marginBottom: sectionGap, pageBreakInside: 'avoid' }} className="group/section relative">
          <div className="flex items-center gap-2">
            <h2 style={headingStyle} className="flex-1">
              {editable ? (
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title || ""}
                  placeholder="Section Title"
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
            itemStyle={descriptionStyle}
            addButtonLabel="Add Item"
            placeholder="Click to add item..."
            accentColor={accentColor}
            showBullets={false}
          />
        </div>
      ))}

      {/* Add Section Button */}
      {editable && (
        <button
          onClick={handleAddSection}
          className="mt-4 flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border-2 border-dashed hover:bg-gray-50 transition-colors"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <Plus className="h-4 w-4" />
          Add Section
        </button>
      )}
    </>
  );
};
