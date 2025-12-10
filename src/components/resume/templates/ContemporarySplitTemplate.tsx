import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { TemplateContactInfo, TemplateSocialLinks, SectionHeader } from "@/components/resume/shared/TemplateBase";
import { CustomSectionsWrapper } from "@/components/resume/shared/CustomSectionsWrapper";
import { StyleOptionsWrapper } from "@/components/resume/StyleOptionsWrapper";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";
import { Plus } from "lucide-react";
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
  const styleOptions = useStyleOptionsWithDefaults();
  const photo = resumeData.personalInfo.photo;
  const styles = SINGLE_COLUMN_CONFIG;
  const accent = themeColor || styles.colors.primary;
  const accentLight = hexToRgba(accent, 0.15);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return styleOptions.formatDate(dateString);
  };

  return (
    <StyleOptionsWrapper>
    <div
      className="w-full h-full bg-white flex"
      style={{
        fontFamily: styles.fonts.primary,
          color: '#1a1a1a',
        lineHeight: styles.itemDescription.lineHeight,
          fontSize: '13px',
      }}
    >
        {/* Left Side - Blue Background 50% */}
        <div className="w-[50%] text-white pt-10 pb-10 pl-10 pr-5" style={{ backgroundColor: accent }}>
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
                fontSize: '27px',
                fontWeight: 700,
                lineHeight: styles.header.name.lineHeight,
                color: 'white',
              }}
            />
          ) : (
            <h1
              className="mb-3 tracking-tight"
              style={{
                fontSize: '27px',
                fontWeight: 700,
                lineHeight: styles.header.name.lineHeight,
                color: 'white',
              }}
            >
              {resumeData.personalInfo.fullName}
            </h1>
          )}

          {(editable || resumeData.personalInfo.title) && (
            editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title || ""}
                className="uppercase tracking-wider mb-6"
                as="div"
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'white',
                  letterSpacing: "0.08em",
                }}
                placeholder="Professional Title"
              />
            ) : (
              resumeData.personalInfo.title && (
                <div
                className="uppercase tracking-wider mb-6"
                style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'white',
                    letterSpacing: "0.08em",
                }}
              >
                {resumeData.personalInfo.title}
                </div>
              )
            )
          )}

          {/* Summary */}
          {(resumeData.personalInfo.summary || editable) && (
            <div className="mt-6 pt-6 border-t-[0.5px] border-white/20">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  className="font-light"
                  style={{
                    fontSize: '13px',
                    color: 'white',
                    lineHeight: styles.itemDescription.lineHeight,
                  }}
                  as="div"
                  multiline
                  placeholder="Professional summary..."
                />
              ) : (
                resumeData.personalInfo.summary && (
                  <div
                  className="font-light"
                  style={{
                      fontSize: '13px',
                      color: 'white',
                    lineHeight: styles.itemDescription.lineHeight,
                  }}
                >
                  {resumeData.personalInfo.summary}
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mb-8 pb-8 border-b-[0.5px] border-white/20">
          <SectionHeader
            title="Contact"
            themeColor="white"
            className="mb-3"
            paddingBottom="8px"
            style={{ marginBottom: '12px', color: 'white' }}
          />
          <div style={{ fontSize: '13px', color: 'white' }}>
            <TemplateContactInfo
              resumeData={resumeData}
              editable={editable}
              themeColor="white"
              layout="vertical"
              textColor="white"
            />
          </div>
        </div>

        {/* Social Links */}
        {resumeData.includeSocialLinks && (
          <div className="mb-8 pb-8 border-b-[0.5px] border-white/20">
            <SectionHeader
              title="Social Links"
              themeColor="white"
              className="mb-3"
              paddingBottom="8px"
              style={{ marginBottom: '12px', color: 'white' }}
            />
            <TemplateSocialLinks
              resumeData={resumeData}
              editable={editable}
              themeColor="white"
              textColor="white"
              variant="vertical"
            />
          </div>
        )}

        {/* Skills */}
        {(resumeData.skills && resumeData.skills.length > 0) || editable ? (
          <div className="mb-8 pb-8 border-b-[0.5px] border-white/20">
            <SectionHeader
              title="Skills"
              themeColor="white"
              className="mb-3"
              paddingBottom="8px"
              style={{ marginBottom: '12px', color: 'white' }}
            />
            {editable ? (
              <div className="space-y-2">
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills || []}
                  renderSkill={(skill, index) => (
                    <div
                      key={skill.id || index}
                      className="font-medium text-white/90"
                      style={{ fontSize: '13px' }}
                    >
                    <InlineEditableText
                      path={`skills[${index}].name`}
                      value={skill.name}
                        className="text-white"
                        style={{ fontSize: '13px', color: 'white' }}
                      as="span"
                        placeholder="New Skill"
                    />
                  </div>
                  )}
                />
              </div>
            ) : (
              <div className="space-y-2">
                {resumeData.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="font-medium text-white/90"
                    style={{ fontSize: '13px' }}
                    >
                      {skill.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* Education */}
        {(resumeData.education && resumeData.education.length > 0) || editable ? (
          <div>
            <SectionHeader
              title="Education"
              themeColor="white"
              className="mb-3"
              paddingBottom="8px"
              style={{ marginBottom: '12px', color: 'white' }}
            />
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
                        style={{ fontSize: '13px' }}
                        as="p"
                        placeholder="Field of Study"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-white/80 block mt-1"
                      style={{ fontSize: '13px' }}
                      as="p"
                    />
                    <div className="text-[10.5px] text-white/70 mt-1 flex items-center gap-1">
                      <InlineEditableDate
                        path={`education[${index}].startDate`}
                        value={edu.startDate}
                        className="inline-block"
                        formatDisplay={formatDate}
                      />
                      <span> - </span>
                      <InlineEditableDate
                        path={`education[${index}].endDate`}
                        value={edu.endDate}
                        className="inline-block"
                        formatDisplay={formatDate}
                      />
                    </div>
                    {(editable || edu.gpa) && (
                      <div className="text-white/80 mt-1" style={{ fontSize: '13px' }}>
                        <span>GPA: </span>
                        <InlineEditableText
                          path={`education[${index}].gpa`}
                          value={edu.gpa || ""}
                          className="inline-block"
                          style={{ fontSize: '13px', color: 'white' }}
                          as="span"
                          placeholder="3.8/4.0"
                        />
                      </div>
                    )}
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
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && (
                      <p className="text-white/80 mt-1" style={{ fontSize: '13px' }}>
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* Right Side - White Background 50% */}
      <div className="w-[50%] bg-white pt-10 pb-10 pr-10 pl-5" style={{ fontSize: '13px', color: '#1a1a1a' }}>
        {/* Professional Experience */}
        {(resumeData.experience && resumeData.experience.length > 0) || editable ? (
          <div className="mb-8">
            <SectionHeader
              title="Professional Experience"
              themeColor={accent}
              className="mb-3"
              paddingBottom="8px"
              style={{ marginBottom: '12px' }}
            />
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
                            formatDisplay={formatDate}
                          />
                          <span> - </span>
                          {exp.current ? (
                            <span>Present</span>
                          ) : (
                            <InlineEditableDate
                              path={`experience[${index}].endDate`}
                              value={exp.endDate}
                              className="inline-block"
                              formatDisplay={formatDate}
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
                              <span className="text-gray-400 mt-1" style={{ fontSize: '13px', color: '#1a1a1a' }}>
                                {styleOptions.getBulletChar()}
                              </span>
                              <div className="flex-1">
                                <InlineEditableText
                                  path={exp.bulletPoints ? `experience[${index}].bulletPoints[${bulletIndex}]` : `experience[${index}].description`}
                                  value={point}
                                  className="text-gray-700"
                                  style={{
                                    fontSize: '13px',
                                    color: '#1a1a1a',
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
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    <p className="text-[13px] font-semibold mb-2" style={{ color: accent }}>
                      {exp.company}
                    </p>
                    {(exp.bulletPoints && exp.bulletPoints.length > 0) || exp.description ? (
                      <ul
                        className="list-disc ml-5 space-y-1.5"
                        style={{
                          fontSize: '13px',
                          color: '#1a1a1a',
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
        ) : null}

        {/* Additional Sections */}
        <CustomSectionsWrapper
          sections={resumeData.sections || []}
          editable={editable}
          accentColor={accent}
          styles={styles}
          renderSectionHeader={(title) => (
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
            lineHeight: styles.itemDescription.lineHeight,
          }}
          sectionStyle={{ marginBottom: '28px' }}
          showAddSection={true}
          renderItem={(item, itemIndex, sectionIndex, helpers) => {
            const itemValue = typeof item === 'string' ? item : (item as any)?.text || String(item || '');
            return (
              <div className="group flex items-start gap-2 mb-2">
                {editable ? (
                  <helpers.EditableText
                    className="flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                    style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: styles.itemDescription.lineHeight }}
                    placeholder="Click to add item..."
                  />
                ) : (
                  <span style={{ fontSize: '13px', color: '#1a1a1a', lineHeight: styles.itemDescription.lineHeight }}>
                    {itemValue}
                  </span>
                )}
    </div>
  );
          }}
          renderAddItemButton={(onClick, _sectionIndex) => (
            <button
              onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
                onClick();
              }}
              className="mt-3 flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded border border-dashed hover:bg-gray-50 transition-colors"
              style={{ color: accent, borderColor: accent }}
              >
              <Plus className="h-3 w-3" />
              Add Item
              </button>
            )}
          />
        </div>
    </div>
    </StyleOptionsWrapper>
  );
};
