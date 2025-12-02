import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface BoldHeadlineTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const BoldHeadlineTemplate = ({
  resumeData,
  themeColor = "#dc2626",
  editable = false,
}: BoldHeadlineTemplateProps) => {
  const { addBulletPoint, removeBulletPoint } = useInlineEdit();
  const photo = resumeData.personalInfo.photo;
  const styles = SINGLE_COLUMN_CONFIG;
  const accent = themeColor || styles.colors.primary;
  const accentLight = `${accent}15`;

  return (
    <div
      className="w-full h-full bg-white"
      style={{
        fontFamily: styles.fonts.primary,
        color: styles.colors.text.primary,
        lineHeight: styles.spacing.lineHeight,
      }}
    >
      {/* Bold Header Section */}
      <div
        className="text-white"
        style={{
          backgroundColor: styles.colors.text.primary,
          padding: styles.header.spacing.padding,
        }}
      >
        <div className="flex items-center justify-between gap-8">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="mb-3"
                as="h1"
                style={{
                  fontSize: styles.header.name.size,
                  fontWeight: styles.header.name.weight,
                  lineHeight: styles.header.name.lineHeight,
                  color: styles.colors.text.light,
                }}
              />
            ) : (
              <h1
                className="mb-3"
                style={{
                  fontSize: styles.header.name.size,
                  fontWeight: styles.header.name.weight,
                  lineHeight: styles.header.name.lineHeight,
                  color: styles.colors.text.light,
                }}
              >
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="uppercase mb-5"
                  as="p"
                  style={{
                    fontSize: styles.header.title.size,
                    fontWeight: styles.header.title.weight,
                    color: accent,
                    letterSpacing: "0.08em",
                  }}
                />
              ) : (
                <p
                  className="uppercase mb-5"
                  style={{
                    fontSize: styles.header.title.size,
                    fontWeight: styles.header.title.weight,
                    color: accent,
                    letterSpacing: "0.08em",
                  }}
                >
                  {resumeData.personalInfo.title}
                </p>
              )
            )}

            <div
              className="flex gap-6"
              style={{ fontSize: styles.header.contact.size, color: styles.header.contact.color }}
            >
              {resumeData.personalInfo.email && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="inline"
                    style={{ fontSize: styles.header.contact.size, color: styles.header.contact.color }}
                    as="span"
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
                    className="inline"
                    style={{ fontSize: styles.header.contact.size, color: styles.header.contact.color }}
                    as="span"
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
                    className="inline"
                    style={{ fontSize: styles.header.contact.size, color: styles.header.contact.color }}
                    as="span"
                  />
                ) : (
                  <span>{resumeData.personalInfo.location}</span>
                )
              )}
            </div>
          </div>

          {photo && (
            <div className="relative">
              <div className="absolute -bottom-2 -right-2 w-full h-full" style={{ backgroundColor: accent }} />
              <ProfilePhoto
                src={photo}
                borderClass="border-4 border-white"
                className="relative z-10"
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8" style={{ fontSize: styles.itemDescription.size }}>
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-6" style={{ backgroundColor: accentLight }}>
            <h2
              className="uppercase tracking-wider"
              style={{
                fontSize: styles.sectionHeading.size,
                fontWeight: styles.sectionHeading.weight,
                color: styles.colors.text.primary,
                marginBottom: "12px",
              }}
            >
              About Me
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="font-light"
                style={{
                  fontSize: styles.itemDescription.size,
                  color: styles.colors.text.secondary,
                  lineHeight: styles.itemDescription.lineHeight,
                }}
                as="p"
                multiline
              />
            ) : (
              <p
                className="font-light"
                style={{
                  fontSize: styles.itemDescription.size,
                  color: styles.colors.text.secondary,
                  lineHeight: styles.itemDescription.lineHeight,
                }}
              >
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2
              className="uppercase tracking-wider"
              style={{
                fontSize: styles.sectionHeading.size,
                fontWeight: styles.sectionHeading.weight,
                color: styles.colors.text.primary,
                borderBottom: `1px solid ${accent}`,
                paddingBottom: "8px",
                marginBottom: styles.spacing.itemGap,
              }}
            >
              Work Experience
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
                  description: "Job description",
                  bulletPoints: [],
                  current: false,
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => (
                  <div className="mb-6 last:mb-0">
                    <div className="flex justify-between items-start mb-2">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-gray-900"
                        as="h3"
                        style={{
                          fontSize: styles.itemTitle.size,
                          fontWeight: styles.itemTitle.weight,
                        }}
                      />
                      <div className="text-[11px] font-bold px-4 py-2 text-white rounded-md" style={{ backgroundColor: accent }}>
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
                      </div>
                    </div>
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="mb-3"
                      as="p"
                      style={{
                        fontSize: styles.itemSubtitle.size,
                        fontWeight: styles.itemSubtitle.weight,
                        color: accent,
                      }}
                    />
                    <div className="space-y-1.5">
                      {(exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                        exp.bulletPoints.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex items-start gap-2 group">
                            <div className="flex-1">
                              <InlineEditableText
                                path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                value={bullet}
                                className="font-light"
                                style={{
                                  fontSize: styles.itemDescription.size,
                                  color: styles.colors.text.secondary,
                                  lineHeight: styles.itemDescription.lineHeight,
                                }}
                                placeholder="Enter bullet point..."
                                as="div"
                                multiline
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBulletPoint(exp.id, bulletIndex)}
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                              disabled={exp.bulletPoints.length <= 1}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div
                          className="font-light"
                          style={{
                            fontSize: styles.itemDescription.size,
                            color: styles.colors.text.secondary,
                            lineHeight: styles.itemDescription.lineHeight,
                          }}
                        >
                          No bullet points yet. Click "Add Bullet Point" to add one.
                        </div>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addBulletPoint(exp.id)}
                        className="h-7 px-2 text-xs border-dashed w-full justify-start"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Bullet Point
                      </Button>
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <h3
                        className="text-gray-900"
                        style={{ fontSize: styles.itemTitle.size, fontWeight: styles.itemTitle.weight }}
                      >
                        {exp.position}
                      </h3>
                      <div className="text-[11px] font-bold px-4 py-2 text-white rounded-md" style={{ backgroundColor: accent }}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    <p
                      className="mb-3"
                      style={{
                        fontSize: styles.itemSubtitle.size,
                        fontWeight: styles.itemSubtitle.weight,
                        color: accent,
                      }}
                    >
                      {exp.company}
                    </p>
                    {(exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                      <ul
                        className="list-disc ml-5 space-y-1.5"
                        style={{
                          fontSize: styles.itemDescription.size,
                          color: styles.colors.text.secondary,
                          lineHeight: styles.itemDescription.lineHeight,
                        }}
                      >
                        {exp.bulletPoints.map((bullet, bulletIndex) => (
                          <li key={bulletIndex}>{bullet}</li>
                        ))}
                      </ul>
                    ) : (
                      exp.description && (
                        <ul
                          className="list-disc ml-5 space-y-1.5"
                          style={{
                            fontSize: styles.itemDescription.size,
                            color: styles.colors.text.secondary,
                            lineHeight: styles.itemDescription.lineHeight,
                          }}
                        >
                          {exp.description
                            .split("\n")
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line, i) => (
                              <li key={i}>{line}</li>
                            ))}
                        </ul>
                      )
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-10">
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2
                className="uppercase tracking-wider"
                style={{
                  fontSize: styles.sectionHeading.size,
                  fontWeight: styles.sectionHeading.weight,
                  color: styles.colors.text.primary,
                  borderBottom: `1px solid ${accent}`,
                  paddingBottom: "8px",
                  marginBottom: styles.spacing.itemGap,
                }}
              >
                Education
              </h2>
              {editable ? (
                <InlineEditableList
                  path="education"
                  items={resumeData.education}
                  defaultItem={{
                    id: Date.now().toString(),
                    degree: "Degree",
                    school: "School Name",
                    field: "Field of Study",
                    startDate: "2020-01",
                    endDate: "2024-01",
                    gpa: "",
                  }}
                  addButtonLabel="Add Education"
                  renderItem={(edu, index) => (
                    <div className="mb-4 last:mb-0">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-gray-900 block"
                        as="h3"
                        style={{
                          fontSize: styles.itemTitle.size,
                          fontWeight: styles.itemTitle.weight,
                        }}
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="mt-0.5 block"
                          as="p"
                          style={{
                            fontSize: styles.itemSubtitle.size,
                            color: accent,
                          }}
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="mt-1 block"
                        style={{ fontSize: styles.itemDescription.size, color: styles.colors.text.secondary }}
                        as="p"
                      />
                      <div
                        className="mt-0.5 flex items-center gap-1"
                        style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}
                      >
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
                      {edu.gpa && (
                        <div className="mt-0.5" style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
                          GPA: <InlineEditableText
                            path={`education[${index}].gpa`}
                            value={edu.gpa}
                            className="inline-block"
                            as="span"
                          />
                        </div>
                      )}
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id}>
                      <h3
                        className="text-gray-900"
                        style={{ fontSize: styles.itemTitle.size, fontWeight: styles.itemTitle.weight }}
                      >
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <p
                          className="mt-0.5"
                          style={{
                            fontSize: styles.itemSubtitle.size,
                            color: accent,
                            fontWeight: styles.itemSubtitle.weight,
                          }}
                        >
                          {edu.field}
                        </p>
                      )}
                      <p style={{ fontSize: styles.itemDescription.size, color: styles.colors.text.secondary }} className="mt-1">
                        {edu.school}
                      </p>
                      <p
                        className="mt-0.5"
                        style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}
                      >
                        {edu.startDate} - {edu.endDate}
                      </p>
                      {edu.gpa && (
                        <p
                          className="mt-0.5"
                          style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}
                        >
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <h2
                className="uppercase tracking-wider"
                style={{
                  fontSize: styles.sectionHeading.size,
                  fontWeight: styles.sectionHeading.weight,
                  color: styles.colors.text.primary,
                  borderBottom: `1px solid ${accent}`,
                  paddingBottom: "8px",
                  marginBottom: styles.spacing.itemGap,
                }}
              >
                Skills
              </h2>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <span
                      className="inline-block mr-2 mb-2 text-white"
                      style={{
                        backgroundColor: accent,
                        fontSize: styles.skills.tag.size,
                        padding: styles.skills.tag.padding,
                        borderRadius: styles.skills.tag.borderRadius,
                        fontWeight: styles.itemSubtitle.weight,
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
                      key={skill.id}
                      className="inline-block text-white"
                      style={{
                        backgroundColor: accent,
                        fontSize: styles.skills.tag.size,
                        padding: styles.skills.tag.padding,
                        borderRadius: styles.skills.tag.borderRadius,
                        fontWeight: styles.itemSubtitle.weight,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Additional Sections */}
        <BoldHeadlineCustomSections 
          sections={resumeData.sections}
          editable={editable}
          accent={accent}
          styles={styles}
        />
      </div>
    </div>
  );
};

// Separate component for Custom Sections to use hooks
const BoldHeadlineCustomSections = ({ 
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
      {sections && sections.map((section, index) => (
        <div key={section.id || index} className="mt-8 group/section" style={{ pageBreakInside: 'avoid' }}>
          <div className="flex items-center gap-2">
            <h2
              className="uppercase tracking-wider flex-1"
              style={{
                fontSize: styles.sectionHeading.size,
                fontWeight: styles.sectionHeading.weight,
                color: styles.colors.text.primary,
                borderBottom: `1px solid ${accent}`,
                paddingBottom: "8px",
                marginBottom: styles.spacing.itemGap,
              }}
            >
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
            itemStyle={{
              fontSize: styles.itemDescription.size,
              color: styles.colors.text.secondary,
              lineHeight: styles.itemDescription.lineHeight,
              fontWeight: '300',
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
