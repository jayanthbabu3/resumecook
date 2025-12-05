import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Plus, X } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { useInlineEdit } from "@/contexts/InlineEditContext";
import { InlineEditableSectionItems } from "@/components/resume/InlineEditableSectionItems";

interface GraduateTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

export const GraduateTemplate = ({ 
  resumeData, 
  themeColor = "#0EA5E9", 
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint
}: GraduateTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white p-12 overflow-auto">
      <div className="max-w-[850px] mx-auto space-y-6">
        {/* Header Section */}
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

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Education & Skills */}
          <div className="col-span-1 space-y-5">
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  Education
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
                      <div className="space-y-1">
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="font-semibold text-[13px] leading-tight block"
                          style={{ color: '#1a1a1a' }}
                          as="div"
                        />
                        {edu.field && (
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field}
                            className="text-[13px] block"
                            style={{ color: '#1a1a1a' }}
                            as="div"
                          />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          className="text-[13px] font-medium block"
                          style={{ color: '#1a1a1a' }}
                          as="div"
                        />
                        <div className="text-[13px] text-gray-500 flex items-center gap-1">
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
                    )}
                  />
                ) : (
                  <div className="space-y-3">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-semibold text-[13px] leading-tight" style={{ color: '#1a1a1a' }}>{edu.degree}</div>
                        {edu.field && <div className="text-[13px]" style={{ color: '#1a1a1a' }}>{edu.field}</div>}
                        <div className="text-[13px] font-medium" style={{ color: '#1a1a1a' }}>{edu.school}</div>
                        <div className="text-[13px]" style={{ color: '#525252' }}>
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

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
                    renderSkill={(skill, index) => (
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
          </div>

          {/* Right Column - Summary, Projects & Experience */}
          <div className="col-span-2 space-y-5">
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
                    style={{ color: '#1a1a1a' }}
                    multiline
                    as="p"
                  />
                ) : (
                  <p className="text-[13px] leading-relaxed" style={{ color: '#1a1a1a' }}>{resumeData.personalInfo.summary}</p>
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
                              className="font-semibold text-sm text-gray-900 block"
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
                          <div className="text-[13px] text-gray-500 whitespace-nowrap flex items-center gap-1">
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
                      </div>
                    )}
                  />
                ) : (
                  <div className="space-y-3">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                            <div className="text-[13px] font-medium" style={{ color: themeColor }}>{exp.company}</div>
                          </div>
                          <div className="text-[13px] text-gray-500 whitespace-nowrap">
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
          </div>
        </div>

        {/* Custom Sections - At bottom, after all standard sections */}
        <GraduateCustomSections
          sections={resumeData.sections || []}
          editable={editable}
          themeColor={themeColor}
          renderButton={false}
        />

        {/* Add Section Button - Always at the absolute bottom */}
        {editable && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <GraduateAddSectionButton themeColor={themeColor} />
          </div>
        )}
      </div>
    </div>
  );
};

// Separate component for Custom Sections (without Add Button - that goes at bottom)
const GraduateCustomSections = ({ 
  sections, 
  editable, 
  themeColor,
  renderButton = true
}: { 
  sections: ResumeData['sections']; 
  editable: boolean; 
  themeColor?: string;
  renderButton?: boolean;
}) => {
  const inlineEditContext = useInlineEdit();
  const removeArrayItem = inlineEditContext?.removeArrayItem;

  const handleRemoveSection = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!removeArrayItem) return;
    removeArrayItem('sections', index);
  };

  const accent = themeColor || "#0EA5E9";

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5">
      {sections.map((section, index) => (
        <div key={section.id} className="group/section">
          <div className="flex items-center justify-between">
            {editable ? (
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="text-sm font-bold uppercase tracking-wide text-gray-900 block"
                as="h2"
              />
            ) : (
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                {section.title}
              </h2>
            )}
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
            itemStyle={{ fontSize: '13px', color: '#1a1a1a', lineHeight: '1.5' }}
            accentColor={accent}
            showBullets={false}
          />
        </div>
      ))}
    </section>
  );
};

// Separate component for Add Section Button - Always at absolute bottom
const GraduateAddSectionButton = ({ themeColor }: { themeColor?: string }) => {
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
