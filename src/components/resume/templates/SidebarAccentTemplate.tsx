import React from "react";
import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { Plus, X, Linkedin, Globe, Github } from "lucide-react";

interface SidebarAccentTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

export const SidebarAccentTemplate = ({
  resumeData,
  themeColor = "#1e40af",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: SidebarAccentTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-white flex">
      {/* Left Sidebar - 35% */}
      <div
        className="w-[33%] text-white px-7 py-8"
        style={{ backgroundColor: themeColor }}
      >
        {/* Header in Sidebar */}
        <div className="mb-6">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-[20px] font-bold mb-2"
              as="h1"
            />
          ) : (
            <h1 className="text-[20px] font-bold mb-2">
              {resumeData.personalInfo.fullName}
            </h1>
          )}

          {resumeData.personalInfo.title && (
            <div>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[10px] opacity-90"
                  as="p"
                />
              ) : (
                <p className="text-[10px] opacity-90">{resumeData.personalInfo.title}</p>
              )}
            </div>
          )}
        </div>

        {/* Contact Info in Sidebar */}
        <div className="mb-6 space-y-2 text-[10px]">
          {resumeData.personalInfo.email && (
            <div className="flex items-start gap-2">
              <span className="opacity-80">Email:</span>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="flex-1 break-words"
                  as="div"
                />
              ) : (
                <div className="flex-1 break-words">{resumeData.personalInfo.email}</div>
              )}
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-start gap-2">
              <span className="opacity-80">Phone:</span>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="flex-1"
                  as="div"
                />
              ) : (
                <div className="flex-1">{resumeData.personalInfo.phone}</div>
              )}
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-start gap-2">
              <span className="opacity-80">Location:</span>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="flex-1"
                  as="div"
                />
              ) : (
                <div className="flex-1">{resumeData.personalInfo.location}</div>
              )}
            </div>
          )}
        </div>

        {/* Skills in Sidebar */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[12px] font-bold mb-3 border-b border-white/30 pb-2">
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills path="skills" skills={resumeData.skills} />
            ) : (
              <div className="space-y-1.5">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="text-[9px] bg-white/10 px-2.5 py-1.5 rounded"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Social Links in Sidebar */}
        {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
          <div className="mb-6">
            <h2 className="text-[12px] font-bold mb-3 border-b border-white/30 pb-2">
              Social Links
            </h2>
            <div className="space-y-2">
              {resumeData.personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-3 w-3 opacity-80" />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.linkedin"
                      value={resumeData.personalInfo.linkedin}
                      className="text-[9px] flex-1"
                      as="div"
                    />
                  ) : (
                    <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-200 hover:text-blue-100">
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
              {resumeData.personalInfo.portfolio && (
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 opacity-80" />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.portfolio"
                      value={resumeData.personalInfo.portfolio}
                      className="text-[9px] flex-1"
                      as="div"
                    />
                  ) : (
                    <a href={resumeData.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-200 hover:text-blue-100">
                      Portfolio
                    </a>
                  )}
                </div>
              )}
              {resumeData.personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github className="h-3 w-3 opacity-80" />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.github"
                      value={resumeData.personalInfo.github}
                      className="text-[9px] flex-1"
                      as="div"
                    />
                  ) : (
                    <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-200 hover:text-blue-100">
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Education in Sidebar */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-[12px] font-bold mb-3 border-b border-white/30 pb-2">
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
                  <div key={edu.id} className="text-[9px] mb-4">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="font-semibold mb-1"
                      as="div"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="opacity-90 mb-1"
                        as="div"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="opacity-90 mb-1"
                      as="div"
                    />
                    {edu.gpa && (
                      <InlineEditableText
                        path={`education[${index}].gpa`}
                        value={`GPA: ${edu.gpa}`}
                        className="opacity-75 mb-1 text-[8px]"
                        as="div"
                      />
                    )}
                    <div className="text-[8px] opacity-75 flex items-center gap-1">
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
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="text-[9px]">
                    <div className="font-semibold mb-1">{edu.degree}</div>
                    {edu.field && <div className="opacity-90 mb-1">{edu.field}</div>}
                    <div className="opacity-90 mb-1">{edu.school}</div>
                    {edu.gpa && <div className="opacity-75 mb-1 text-[8px]">GPA: {edu.gpa}</div>}
                    <div className="text-[8px] opacity-75">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Content - 65% */}
      <div className="w-[67%] px-8 py-8 bg-gray-50 text-[10px] leading-relaxed">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-3 text-gray-800">
              Professional Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-gray-700 leading-relaxed text-[10px]"
                as="p"
              />
            ) : (
              <p className="text-gray-700 leading-relaxed text-[10px]">{resumeData.personalInfo.summary}</p>
            )}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-4 text-gray-800">
              Experience
            </h2>
            <div className="space-y-5">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm text-[10px] group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="text-[12px] font-bold text-gray-900"
                          as="h3"
                        />
                      ) : (
                        <h3 className="text-[12px] font-bold text-gray-900">{exp.position}</h3>
                      )}
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="font-medium text-[10px]"
                          as="p"
                          style={{ color: themeColor }}
                        />
                      ) : (
                        <p className="font-medium text-[10px]" style={{ color: themeColor }}>
                          {exp.company}
                        </p>
                      )}
                    </div>
                    <div className="text-[9px] text-gray-500 ml-4 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="space-y-2 list-none mt-3">
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-gray-700 text-[10px] leading-relaxed flex items-start">
                          <span className="mr-2" style={{ color: themeColor }}>•</span>
                          {editable ? (
                            <InlineEditableText
                              path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                              value={bullet || ""}
                              placeholder="Click to add achievement..."
                              className="text-gray-700 text-[10px] leading-relaxed flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
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
              ))}
            </div>
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
                  className="text-[14px] font-bold mb-3 text-gray-800 block"
                  as="h2"
                />
                <InlineEditableText
                  path={`sections[${index}].content`}
                  value={section.content}
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap block text-[10px]"
                  multiline
                  as="div"
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-[14px] font-bold mb-3 text-gray-800">
                {section.title}
              </h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-[10px]">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SidebarAccentTemplate;
