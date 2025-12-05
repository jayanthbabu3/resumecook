import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Plus, X } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";
import { useInlineEdit } from "@/contexts/InlineEditContext";

interface StarterTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const StarterTemplate = ({ resumeData, themeColor = "#0EA5E9", editable = false }: StarterTemplateProps) => {
  const styles = SINGLE_COLUMN_CONFIG;
  const photo = resumeData.personalInfo.photo;
  const inlineEditContext = useInlineEdit();
  const { addBulletPoint, removeBulletPoint } = inlineEditContext || {};

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  // Custom render function for Education to use 13px and #1a1a1a
  const renderEducationItem = (edu: any, index: number, isEditable: boolean) => {
    return (
      <div className="space-y-1" style={{ lineHeight: 1.8 }} data-section="education">
        <InlineEditableText
          path={`education[${index}].degree`}
          value={edu.degree}
          className="text-[13px] font-semibold block"
          style={{ color: '#1a1a1a' }}
          as="h3"
        />
        {edu.field && (
          <InlineEditableText
            path={`education[${index}].field`}
            value={edu.field}
            className="text-[13px] block"
            style={{ color: '#1a1a1a' }}
            as="p"
          />
        )}
        <InlineEditableText
          path={`education[${index}].school`}
          value={edu.school}
          className="text-[13px] font-medium block"
          style={{ color: '#1a1a1a' }}
          as="p"
        />
        <div className="text-[13px] flex items-center gap-1" style={{ color: '#525252' }}>
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
    );
  };

  return (
    <div className="w-full h-full bg-white p-12 overflow-auto">
      <div className="max-w-[800px] mx-auto space-y-6">
        {/* Header */}
        <div className="pb-5 border-b-2" style={{ borderColor: themeColor }}>
          <div className="flex justify-center mb-4">
            <ProfilePhoto src={photo} borderClass="border-2 border-gray-200" />
          </div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-3xl font-bold tracking-tight text-gray-900 mb-2 block"
              as="h1"
            />
          ) : (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              {resumeData.personalInfo.fullName}
            </h1>
          )}
          {resumeData.personalInfo.title && (
            editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-base mb-3 block"
                style={{ color: '#1a1a1a' }}
                as="p"
              />
            ) : (
              <p className="text-base mb-3" style={{ color: '#1a1a1a' }}>{resumeData.personalInfo.title}</p>
            )
          )}
          <div className="flex flex-wrap gap-4 text-[13px]" style={{ color: '#1a1a1a' }}>
            {resumeData.personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-3 w-3" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="inline-block"
                    style={{ color: '#1a1a1a' }}
                  />
                ) : (
                  <span style={{ color: '#1a1a1a' }}>{resumeData.personalInfo.email}</span>
                )}
              </span>
            )}
            {resumeData.personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="inline-block"
                    style={{ color: '#1a1a1a' }}
                  />
                ) : (
                  <span style={{ color: '#1a1a1a' }}>{resumeData.personalInfo.phone}</span>
                )}
              </span>
            )}
            {resumeData.personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="inline-block"
                    style={{ color: '#1a1a1a' }}
                  />
                ) : (
                  <span style={{ color: '#1a1a1a' }}>{resumeData.personalInfo.location}</span>
                )}
              </span>
            )}
          </div>

          {/* Social Links */}
          {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
            <div className="flex flex-wrap gap-4 text-[13px] mt-4" style={{ color: '#1a1a1a' }}>
              {resumeData.personalInfo.linkedin && (
                <span className="flex items-center gap-1.5">
                  <Linkedin className="h-3 w-3" />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.linkedin"
                      value={resumeData.personalInfo.linkedin}
                      className="inline-block"
                      style={{ color: '#1a1a1a' }}
                    />
                  ) : (
                    <a
                      href={resumeData.personalInfo.linkedin.startsWith('http') ? resumeData.personalInfo.linkedin : `https://${resumeData.personalInfo.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {resumeData.personalInfo.linkedin}
                    </a>
                  )}
                </span>
              )}
              {resumeData.personalInfo.portfolio && (
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3 w-3" />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.portfolio"
                      value={resumeData.personalInfo.portfolio}
                      className="inline-block"
                      style={{ color: '#1a1a1a' }}
                    />
                  ) : (
                    <a
                      href={resumeData.personalInfo.portfolio.startsWith('http') ? resumeData.personalInfo.portfolio : `https://${resumeData.personalInfo.portfolio}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {resumeData.personalInfo.portfolio}
                    </a>
                  )}
                </span>
              )}
              {resumeData.personalInfo.github && (
                <span className="flex items-center gap-1.5">
                  <Github className="h-3 w-3" />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.github"
                      value={resumeData.personalInfo.github}
                      className="inline-block"
                      style={{ color: '#1a1a1a' }}
                    />
                  ) : (
                    <a
                      href={resumeData.personalInfo.github.startsWith('http') ? resumeData.personalInfo.github : `https://${resumeData.personalInfo.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {resumeData.personalInfo.github}
                    </a>
                  )}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
              Profile
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[13px] leading-relaxed block"
                style={{
                  fontSize: '13px',
                  lineHeight: styles.itemDescription.lineHeight,
                  color: '#1a1a1a',
                }}
                multiline
                as="p"
              />
            ) : (
              <p 
                className="text-[13px] leading-relaxed"
                style={{
                  fontSize: '13px',
                  lineHeight: styles.itemDescription.lineHeight,
                  color: '#1a1a1a',
                }}
              >
                {resumeData.personalInfo.summary}
              </p>
            )}
          </section>
        )}

        {/* Education */}
        <InlineEducationSection
          items={resumeData.education}
          editable={editable}
          accentColor={themeColor}
          title="EDUCATION"
          className="space-y-3"
          renderItem={renderEducationItem}
          titleStyle={{
            fontSize: "0.875rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.025em",
            color: "#111827", // text-gray-900
            marginBottom: "0.5rem"
          }}
        />

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <span className="px-2 py-1 bg-gray-100 text-xs font-medium rounded" style={{ color: '#1a1a1a' }}>
                    {skill.name}
                  </span>
                )}
              />
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {resumeData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-2 py-1 bg-gray-100 text-xs font-medium rounded"
                    style={{ color: '#1a1a1a' }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Experience/Internships */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
              Internships & Experience
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
                  description: "",
                  bulletPoints: ["Achievement or responsibility"],
                  current: false,
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => (
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position || ""}
                          className="font-semibold text-[13px] block"
                          style={{ color: '#1a1a1a' }}
                          as="h3"
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company || ""}
                          className="text-[13px] font-medium block"
                          style={{ color: themeColor }}
                          as="div"
                        />
                      </div>
                      <div className="text-[13px] whitespace-nowrap flex items-center gap-1" style={{ color: '#525252' }}>
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
                        className="text-[13px] leading-relaxed whitespace-pre-line block mb-3"
                        style={{ color: '#1a1a1a' }}
                        multiline
                        as="p"
                      />
                    )}
                    {(!exp.bulletPoints || exp.bulletPoints.length === 0) && editable && addBulletPoint && exp.id && (
                      <div className="mt-3">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (addBulletPoint && exp.id) {
                              addBulletPoint(exp.id);
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
                      <div className="mt-3">
                        <ul className="space-y-1">
                          {exp.bulletPoints.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="text-[13px] leading-relaxed flex items-start group" style={{ color: '#1a1a1a' }}>
                              <span className="mr-2 mt-1">•</span>
                              <div className="flex-1 flex items-center gap-2">
                                <InlineEditableText
                                  path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                  value={bullet || ""}
                                  placeholder="Click to add achievement..."
                                  className="text-[13px] leading-relaxed flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                  style={{ color: '#1a1a1a' }}
                                  multiline
                                  as="span"
                                />
                                {editable && removeBulletPoint && (
                                  <button
                                    onClick={() => removeBulletPoint(exp.id, bulletIndex)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                                  >
                                    <X className="h-3 w-3 text-red-500" />
                                  </button>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                        {editable && addBulletPoint && exp.id && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (addBulletPoint && exp.id) {
                                addBulletPoint(exp.id);
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
              <div className="space-y-3">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[13px]" style={{ color: '#1a1a1a' }}>{exp.position}</h3>
                        <div className="text-[13px] font-medium" style={{ color: themeColor }}>{exp.company}</div>
                      </div>
                      <div className="text-[13px] whitespace-nowrap" style={{ color: '#525252' }}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-[13px] leading-relaxed whitespace-pre-line" style={{ color: '#1a1a1a' }}>
                        {exp.description}
                      </p>
                    )}
                    {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                      <ul className="ml-4 list-disc space-y-1 text-[13px] leading-relaxed" style={{ color: '#1a1a1a' }}>
                        {exp.bulletPoints.map((bullet, bulletIndex) => (
                          bullet && (
                            <li key={bulletIndex}>{bullet}</li>
                          )
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Custom Sections - At bottom, after all standard sections */}
        <InlineCustomSections
          sections={resumeData.sections}
          editable={editable}
          accentColor={themeColor}
          containerClassName="space-y-6"
          itemStyle={{ fontSize: '13px', color: '#1a1a1a', lineHeight: '1.5' }}
          renderHeader={(title) => (
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-2">
              {title}
            </h2>
          )}
        />

        {/* Add Section Button - Always at the absolute bottom */}
        {editable && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <StarterAddSectionButton themeColor={themeColor} />
          </div>
        )}
      </div>
    </div>
  );
};

// Separate component for Add Section Button - Always at absolute bottom
const StarterAddSectionButton = ({ themeColor }: { themeColor?: string }) => {
  const inlineEditContext = useInlineEdit();
  const addArrayItem = inlineEditContext?.addArrayItem;

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

  const accent = themeColor || "#0EA5E9";

  return (
    <div className="flex justify-center w-full">
      <button
        onClick={handleAddSection}
        className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border-2 border-dashed hover:bg-gray-50 transition-colors"
        style={{ color: accent, borderColor: accent }}
      >
        <Plus className="h-4 w-4" />
        Add Section
      </button>
    </div>
  );
};
