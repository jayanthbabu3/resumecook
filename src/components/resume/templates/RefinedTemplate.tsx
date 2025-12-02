import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { cn } from "@/lib/utils";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, X } from "lucide-react";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface RefinedTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const RefinedTemplate = ({
  resumeData,
  themeColor = "#4f46e5",
  editable = false,
}: RefinedTemplateProps) => {
  const { addBulletPoint, removeBulletPoint } = useInlineEdit();
  const styles = SINGLE_COLUMN_CONFIG;
  const accent = themeColor || styles.colors.primary;
  const sidebarBg = `${accent}15`;

  return (
    <div
      className="mx-auto bg-white min-h-full"
      style={{
        fontFamily: styles.fonts.primary,
        color: styles.colors.text.primary,
        lineHeight: styles.spacing.lineHeight,
        minHeight: '297mm', // A4 height
      }}
    >
      <div className="grid grid-cols-[280px,1fr] h-full" style={{ minHeight: '297mm' }}>
        {/* Left Sidebar */}
        <div
          className="px-8 py-12"
          style={{
            backgroundColor: sidebarBg,
            fontSize: styles.itemDescription.size,
            minHeight: '100%',
          }}
        >
          {/* Photo */}
          {resumeData.personalInfo.photo && (
            <div className="mb-8">
              <ProfilePhoto src={resumeData.personalInfo.photo} sizeClass="h-40 w-40 mx-auto" />
            </div>
          )}

          {/* Contact */}
          <div className="mb-8">
            <h3
              className="uppercase tracking-widest"
              style={{
                fontSize: styles.sectionHeading.size,
                fontWeight: styles.sectionHeading.weight,
                color: styles.colors.text.primary,
                marginBottom: "12px",
              }}
            >
              Contact
            </h3>
            <div className="space-y-3" style={{ color: styles.colors.text.secondary }}>
              {resumeData.personalInfo.email && (
                <div className="break-words">
                  <div className="mb-1 font-semibold" style={{ color: accent }}>
                    Email
                  </div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={resumeData.personalInfo.email}
                      className="font-light"
                      style={{ fontSize: styles.header.contact.size, color: styles.colors.text.secondary }}
                      as="div"
                    />
                  ) : (
                    <div className="font-light" style={{ fontSize: styles.header.contact.size }}>
                      {resumeData.personalInfo.email}
                    </div>
                  )}
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div>
                  <div className="mb-1 font-semibold" style={{ color: accent }}>
                    Phone
                  </div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={resumeData.personalInfo.phone}
                      className="font-light"
                      style={{ fontSize: styles.header.contact.size, color: styles.colors.text.secondary }}
                      as="div"
                    />
                  ) : (
                    <div className="font-light" style={{ fontSize: styles.header.contact.size }}>
                      {resumeData.personalInfo.phone}
                    </div>
                  )}
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div>
                  <div className="mb-1 font-semibold" style={{ color: accent }}>
                    Location
                  </div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.location"
                      value={resumeData.personalInfo.location}
                      className="font-light"
                      style={{ fontSize: styles.header.contact.size, color: styles.colors.text.secondary }}
                      as="div"
                    />
                  ) : (
                    <div className="font-light" style={{ fontSize: styles.header.contact.size }}>
                      {resumeData.personalInfo.location}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div className="mb-8">
              <h3
                className="uppercase tracking-widest"
                style={{
                  fontSize: styles.sectionHeading.size,
                  fontWeight: styles.sectionHeading.weight,
                  color: styles.colors.text.primary,
                  marginBottom: "12px",
                }}
              >
                Skills
              </h3>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div
                      className="font-light"
                      style={{
                        fontSize: styles.itemDescription.size,
                        color: styles.colors.text.secondary,
                      }}
                    >
                      {skill.name}
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-2">
                  {resumeData.skills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="font-light"
                      style={{
                        fontSize: styles.itemDescription.size,
                        color: styles.colors.text.secondary,
                      }}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div className="mb-8">
              <h3
                className="uppercase tracking-widest"
                style={{
                  fontSize: styles.sectionHeading.size,
                  fontWeight: styles.sectionHeading.weight,
                  color: styles.colors.text.primary,
                  marginBottom: "12px",
                }}
              >
                Education
              </h3>
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
                  }}
                  addButtonLabel="Add Education"
                  renderItem={(edu, index) => (
                    <div>
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="mb-1"
                        style={{
                          fontSize: styles.itemTitle.size,
                          fontWeight: styles.itemTitle.weight,
                          color: styles.colors.text.primary,
                        }}
                        as="div"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="mb-1"
                          style={{ fontSize: styles.itemDescription.size, color: styles.colors.text.secondary }}
                          as="div"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="mb-1"
                        as="div"
                        style={{
                          fontSize: styles.itemSubtitle.size,
                          fontWeight: styles.itemSubtitle.weight,
                          color: accent,
                        }}
                      />
                      <div style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
                        <div className="flex items-center gap-1">
                          <InlineEditableDate
                            path={`education[${index}].startDate`}
                            value={edu.startDate}
                            className="inline-block"
                          />
                          <span> — </span>
                          <InlineEditableDate
                            path={`education[${index}].endDate`}
                            value={edu.endDate}
                            className="inline-block"
                          />
                        </div>
                        {edu.gpa && (
                          <div className="mt-1">
                            GPA: <InlineEditableText
                              path={`education[${index}].gpa`}
                              value={edu.gpa}
                              className="inline-block"
                              style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}
                              as="span"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-4">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id}>
                      <div
                        className="mb-1"
                        style={{ fontSize: styles.itemTitle.size, fontWeight: styles.itemTitle.weight }}
                      >
                        {edu.degree}
                      </div>
                      {edu.field && (
                        <div
                          className="mb-1"
                          style={{ fontSize: styles.itemDescription.size, color: styles.colors.text.secondary }}
                        >
                          {edu.field}
                        </div>
                      )}
                      <div
                        className="mb-1"
                        style={{ fontSize: styles.itemSubtitle.size, fontWeight: styles.itemSubtitle.weight, color: accent }}
                      >
                        {edu.school}
                      </div>
                      <div style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}>
                        {edu.startDate} — {edu.endDate}
                        {edu.gpa && (
                          <div className="mt-1">
                            GPA: {edu.gpa}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div
          className="px-12 py-12"
          style={{ fontSize: styles.itemDescription.size, color: styles.colors.text.primary }}
        >
          {/* Header */}
          <div className="mb-10">
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
                  color: accent,
                }}
              />
            ) : (
              <h1
                className="mb-3"
                style={{
                  fontSize: styles.header.name.size,
                  fontWeight: styles.header.name.weight,
                  lineHeight: styles.header.name.lineHeight,
                  color: accent,
                }}
              >
                {resumeData.personalInfo.fullName}
              </h1>
            )}
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="mb-6 uppercase tracking-wider"
                as="h2"
                style={{
                  fontSize: styles.header.title.size,
                  fontWeight: styles.header.title.weight,
                  color: styles.colors.text.secondary,
                }}
              />
            ) : (
              <h2
                className="mb-6 uppercase tracking-wider"
                style={{
                  fontSize: styles.header.title.size,
                  fontWeight: styles.header.title.weight,
                  color: styles.colors.text.secondary,
                }}
              >
                {resumeData.personalInfo.title}
              </h2>
            )}
            {resumeData.personalInfo.summary && (
              editable ? (
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
              )
            )}
          </div>

          {/* Professional Experience */}
          {resumeData.experience.length > 0 && (
            <div style={{ marginBottom: styles.spacing.sectionGap }}>
              <h3
                className="uppercase tracking-widest"
                style={{
                  fontSize: styles.sectionHeading.size,
                  fontWeight: styles.sectionHeading.weight,
                  color: styles.colors.text.primary,
                  borderBottom: `1px solid ${accent}`,
                  paddingBottom: "8px",
                  marginBottom: styles.spacing.itemGap,
                }}
              >
                Professional Experience
              </h3>
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
                    <div style={{ marginBottom: styles.spacing.itemGap }}>
                      <div className="mb-3">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="mb-1"
                          style={{
                            fontSize: styles.itemTitle.size,
                            fontWeight: styles.itemTitle.weight,
                            color: styles.colors.text.primary,
                          }}
                          as="h4"
                        />
                        <div className="flex items-baseline justify-between">
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            className="text-xs font-medium"
                            as="p"
                            style={{
                              fontSize: styles.itemSubtitle.size,
                              fontWeight: styles.itemSubtitle.weight,
                              color: accent,
                            }}
                          />
                          <span
                            className="uppercase tracking-wide"
                            style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}
                          >
                            <div className="flex items-center gap-1">
                              <InlineEditableDate
                                path={`experience[${index}].startDate`}
                                value={exp.startDate}
                                className="inline-block"
                              />
                              <span> — </span>
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
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        {editable ? (
                          <>
                            {(exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                              exp.bulletPoints.map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className="flex items-start gap-2 group">
                                  <div className="flex-1">
                                    <InlineEditableText
                                      path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                      value={bullet}
                                      className="font-light pl-4 relative"
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
                                className="font-light pl-4 relative before:content-['•'] before:absolute before:left-0"
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
                          </>
                        ) : (
                          // Non-editable mode (read-only)
                          (exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                            exp.bulletPoints.map((bullet, bulletIndex) => (
                              <p
                                key={bulletIndex}
                                className="font-light pl-4 relative before:content-['•'] before:absolute before:left-0"
                                style={{
                                  fontSize: styles.itemDescription.size,
                                  color: styles.colors.text.secondary,
                                  lineHeight: styles.itemDescription.lineHeight,
                                }}
                              >
                                {bullet}
                              </p>
                            ))
                          ) : (
                            exp.description && (
                              <p
                                className="font-light"
                                style={{
                                  fontSize: styles.itemDescription.size,
                                  color: styles.colors.text.secondary,
                                  lineHeight: styles.itemDescription.lineHeight,
                                }}
                              >
                                {exp.description}
                              </p>
                            )
                          )
                        )}
                      </div>
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-6">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="mb-3">
                        <h4
                          className="mb-1"
                          style={{ fontSize: styles.itemTitle.size, fontWeight: styles.itemTitle.weight }}
                        >
                          {exp.position}
                        </h4>
                        <div className="flex items-baseline justify-between">
                          <p
                            className="font-medium"
                            style={{ fontSize: styles.itemSubtitle.size, color: accent }}
                          >
                            {exp.company}
                          </p>
                          <span
                            className="uppercase tracking-wide"
                            style={{ fontSize: styles.itemDate.size, color: styles.colors.text.secondary }}
                          >
                            {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        {(exp.bulletPoints && exp.bulletPoints.length > 0) ? (
                          exp.bulletPoints.map((bullet, bulletIndex) => (
                            <p key={bulletIndex} className="text-xs leading-relaxed text-gray-700 font-light pl-4 relative before:content-['•'] before:absolute before:left-0" style={{ color: 'inherit' }}>
                              {bullet}
                            </p>
                          ))
                        ) : (
                          exp.description && exp.description.split("\n").map((line, idx) => (
                            <p
                              key={idx}
                              className="font-light pl-4 relative before:content-['•'] before:absolute before:left-0"
                              style={{
                                fontSize: styles.itemDescription.size,
                                color: styles.colors.text.secondary,
                                lineHeight: styles.itemDescription.lineHeight,
                              }}
                            >
                              {line}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Custom Sections */}
          <RefinedCustomSections 
            sections={resumeData.sections}
            editable={editable}
            accent={accent}
            styles={styles}
          />
        </div>
      </div>
    </div>
  );
};

// Separate component for Custom Sections to use hooks
const RefinedCustomSections = ({ 
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
      {sections.map((section, index) => (
        <div key={section.id} style={{ marginBottom: styles.spacing.sectionGap, pageBreakInside: 'avoid' }} className="group/section">
          <div className="flex items-center gap-2">
            <h3
              className="uppercase tracking-widest flex-1"
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
            </h3>
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
            showBullets={true}
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