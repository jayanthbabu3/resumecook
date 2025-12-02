import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { Plus, X } from "lucide-react";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface ContemporarySplitTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

// Helper to convert hex color with opacity to rgba
const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const ContemporarySplitTemplate = ({
  resumeData,
  themeColor = "#f59e0b",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: ContemporarySplitTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const styles = SINGLE_COLUMN_CONFIG;
  const accent = themeColor || styles.colors.primary;
  const accentLight = hexToRgba(accent, 0.15);

  return (
    <div
      className="w-full h-full bg-white flex"
      style={{
        fontFamily: styles.fonts.primary,
        color: styles.colors.text.primary,
        lineHeight: styles.spacing.lineHeight,
      }}
    >
      {/* Left Side - Dark Background 50% */}
      <div className="w-[50%] text-white pt-10 pb-10 pl-10 pr-5" style={{ backgroundColor: styles.colors.text.primary }}>
        {/* Photo */}
        {photo && (
          <div className="mb-12 flex justify-center">
            <ProfilePhoto
              src={photo}
              borderClass=""
              className="rounded-2xl"
            />
          </div>
        )}

        {/* Personal Info */}
        <div className="mb-8">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="mb-3 tracking-tight"
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
              className="mb-3 tracking-tight"
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
                className="uppercase tracking-wider mb-6"
                as="p"
                style={{
                  fontSize: styles.header.title.size,
                  fontWeight: styles.header.title.weight,
                  color: accent,
                }}
              />
            ) : (
              <p
                className="uppercase tracking-wider mb-6"
                style={{
                  fontSize: styles.header.title.size,
                  fontWeight: styles.header.title.weight,
                  color: accent,
                }}
              >
                {resumeData.personalInfo.title}
              </p>
            )
          )}

          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <div className="mt-6 pt-6 border-t-[0.5px] border-white/20">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="font-light"
                  style={{
                    fontSize: styles.itemDescription.size,
                    color: styles.colors.text.light,
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
                    color: styles.colors.text.light,
                    lineHeight: styles.itemDescription.lineHeight,
                  }}
                >
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mb-8 pb-8 border-b-[0.5px] border-white/20">
          <h2
            className="uppercase tracking-wider mb-4"
            style={{
              fontSize: styles.sectionHeading.size,
              fontWeight: styles.sectionHeading.weight,
              color: accent,
            }}
          >
            Contact
          </h2>
          <div className="space-y-3" style={{ fontSize: styles.header.contact.size, color: styles.header.contact.color }}>
            {resumeData.personalInfo.email && (
              <div className="break-words">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-white/90"
                    style={{ fontSize: styles.header.contact.size }}
                    as="p"
                  />
                ) : (
                  <p className="text-white/90">{resumeData.personalInfo.email}</p>
                )}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="text-white/90"
                    style={{ fontSize: styles.header.contact.size }}
                    as="p"
                  />
                ) : (
                  <p className="text-white/90">{resumeData.personalInfo.phone}</p>
                )}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="text-white/90"
                    style={{ fontSize: styles.header.contact.size }}
                    as="p"
                  />
                ) : (
                  <p className="text-white/90">{resumeData.personalInfo.location}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8 pb-8 border-b-[0.5px] border-white/20">
            <h2
              className="uppercase tracking-wider mb-4"
              style={{
                fontSize: styles.sectionHeading.size,
                fontWeight: styles.sectionHeading.weight,
                color: accent,
              }}
            >
              Skills
            </h2>
            {editable ? (
              <div className="space-y-3">
                {resumeData.skills.map((skill, index) => (
                  <div key={skill.id}>
                    <InlineEditableText
                      path={`skills[${index}].name`}
                      value={skill.name}
                      className="font-medium text-white/90 block"
                      style={{ fontSize: styles.itemDescription.size }}
                      as="span"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id}>
                    <span
                      className="font-medium text-white/90 block"
                      style={{ fontSize: styles.itemDescription.size }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2
              className="uppercase tracking-wider mb-4"
              style={{
                fontSize: styles.sectionHeading.size,
                fontWeight: styles.sectionHeading.weight,
                color: accent,
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
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div className="mb-5 last:mb-0">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-white block"
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
                        className="text-white/90 block mt-1"
                        style={{ fontSize: styles.itemDescription.size }}
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-white/80 block mt-1"
                      style={{ fontSize: styles.itemDescription.size }}
                      as="p"
                    />
                    <div className="text-[10.5px] text-white/70 mt-1 flex items-center gap-1">
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
                  </div>
                )}
              />
            ) : (
              <div className="space-y-5">
                {resumeData.education.map((edu, index) => (
                  <div key={index}>
                    <h3
                      className="text-white"
                      style={{ fontSize: styles.itemTitle.size, fontWeight: styles.itemTitle.weight }}
                    >
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-white/90 mt-1" style={{ fontSize: styles.itemDescription.size }}>
                        {edu.field}
                      </p>
                    )}
                    <p className="text-white/80 mt-1" style={{ fontSize: styles.itemDescription.size }}>
                      {edu.school}
                    </p>
                    <p className="text-white/70 mt-1" style={{ fontSize: styles.itemDate.size }}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side - White Background 50% */}
      <div className="w-[50%] bg-white pt-10 pb-10 pr-10 pl-5">
        {/* Professional Experience */}
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
              Professional Experience
            </h2>
            {editable ? (
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="mb-6 last:mb-0 pb-6 border-b-[0.5px] border-gray-200 last:border-0">
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
                      <div className="text-[11px] font-semibold px-3 py-1 rounded-md" style={{ backgroundColor: accentLight, color: accent }}>
                        <div className="flex items-center gap-1 whitespace-nowrap">
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
                      className="mb-2"
                      as="p"
                      style={{
                        fontSize: styles.itemSubtitle.size,
                        fontWeight: styles.itemSubtitle.weight,
                        color: accent,
                      }}
                    />
                    {/* Bullet Points Section */}
                    <div className="space-y-2">
                      {(exp.bulletPoints && exp.bulletPoints.length > 0) || exp.description ? (
                        <>
                          {(exp.bulletPoints && exp.bulletPoints.length > 0 ? exp.bulletPoints : exp.description.split('\n').filter(Boolean)).map((point, bulletIndex) => (
                            <div key={bulletIndex} className="flex items-start gap-2 group">
                              <span className="text-gray-400 mt-1" style={{ fontSize: styles.itemDescription.size }}>•</span>
                              <div className="flex-1">
                                <InlineEditableText
                                  path={exp.bulletPoints ? `experience[${index}].bulletPoints[${bulletIndex}]` : `experience[${index}].description`}
                                  value={point}
                                  className="text-gray-700"
                                  style={{
                                    fontSize: styles.itemDescription.size,
                                    lineHeight: styles.itemDescription.lineHeight,
                                  }}
                                  as="div"
                                  multiline
                                />
                              </div>
                              {onAddBulletPoint && onRemoveBulletPoint && exp.bulletPoints && (
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                  <button
                                    onClick={() => onAddBulletPoint(exp.id)}
                                    className="text-[10px] px-1 py-0.5 bg-green-100 text-green-600 rounded hover:bg-green-200"
                                  >
                                    +
                                  </button>
                                  {bulletIndex > 0 && (
                                    <button
                                      onClick={() => onRemoveBulletPoint(exp.id, bulletIndex)}
                                      className="text-[10px] px-1 py-0.5 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                    >
                                      -
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                          {onAddBulletPoint && exp.bulletPoints && (
                            <button
                              onClick={() => onAddBulletPoint(exp.id)}
                              className="text-[11px] px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 mt-2"
                            >
                              + Add Bullet Point
                            </button>
                          )}
                        </>
                      ) : (
                        onAddBulletPoint && (
                          <button
                            onClick={() => onAddBulletPoint(exp.id)}
                            className="text-[11px] px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                          >
                            + Add Bullet Points
                          </button>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="pb-6 border-b-[0.5px] border-gray-200 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[14.5px] font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <div className="text-[11px] font-semibold px-3 py-1 rounded-md whitespace-nowrap" style={{ backgroundColor: accentLight, color: accent }}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    <p className="text-[13px] font-semibold mb-2" style={{ color: accent }}>
                      {exp.company}
                    </p>
                    {(exp.bulletPoints && exp.bulletPoints.length > 0) || exp.description ? (
                      <ul
                        className="list-disc ml-5 space-y-1.5"
                        style={{
                          fontSize: styles.itemDescription.size,
                          color: styles.colors.text.secondary,
                          lineHeight: styles.itemDescription.lineHeight,
                        }}
                      >
                        {(exp.bulletPoints && exp.bulletPoints.length > 0 
                          ? exp.bulletPoints 
                          : exp.description
                              .split("\n")
                              .map((line) => line.trim())
                              .filter(Boolean)
                        ).map((line, i) => (
                          <li key={i} className="pl-1">{line}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Additional Sections */}
        <ContemporarySplitCustomSections 
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
const ContemporarySplitCustomSections = ({ 
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
        <div key={section.id || index} className="mb-8 group/section">
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
          
          <InlineEditableSectionItems
            sectionIndex={index}
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
