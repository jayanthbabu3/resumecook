import React from "react";
import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { Plus, X, Linkedin, Globe, Github } from "lucide-react";

interface TwoToneClassicTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

export const TwoToneClassicTemplate = ({
  resumeData,
  themeColor = "#334155",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: TwoToneClassicTemplateProps) => {
  const hexToRgba = (hex: string, alpha = 1) => {
    const cleanedHex = hex.replace("#", "");
    if (cleanedHex.length !== 6) {
      return hex;
    }
    const r = parseInt(cleanedHex.slice(0, 2), 16);
    const g = parseInt(cleanedHex.slice(2, 4), 16);
    const b = parseInt(cleanedHex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const lightTone = hexToRgba(themeColor, 0.08);

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Header with Two-Tone Design */}
      <div
        className="px-12 py-10"
        style={{ backgroundColor: themeColor }}
      >
        <div className="text-white">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-4xl font-bold mb-2"
              as="h1"
            />
          ) : (
            <h1 className="text-4xl font-bold mb-2">
              {resumeData.personalInfo.fullName}
            </h1>
          )}

          {resumeData.personalInfo.title && (
            <div className="mb-6">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-base opacity-90"
                  as="p"
                />
              ) : (
                <p className="text-base opacity-90">{resumeData.personalInfo.title}</p>
              )}
            </div>
          )}

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-sm opacity-90">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className=""
                    as="span"
                  />
                ) : (
                  <span>{resumeData.personalInfo.email}</span>
                )}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className=""
                    as="span"
                  />
                ) : (
                  <span>{resumeData.personalInfo.phone}</span>
                )}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className=""
                    as="span"
                  />
                ) : (
                  <span>{resumeData.personalInfo.location}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-12 py-10">
        {/* Summary with Light Tone Background */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-6 rounded" style={{ backgroundColor: lightTone, pageBreakInside: 'avoid' }}>
            <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest" style={{ color: themeColor, pageBreakAfter: 'avoid' }}>
              Professional Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-sm text-gray-700 leading-relaxed font-light block"
                multiline
                as="p"
              />
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed font-light">{resumeData.personalInfo.summary}</p>
            )}
          </div>
        )}

        {/* Social Links */}
        {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
          <div className="mb-8 p-6 rounded" style={{ backgroundColor: lightTone, pageBreakInside: 'avoid' }}>
            <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest" style={{ color: themeColor, pageBreakAfter: 'avoid' }}>
              Social Links
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
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
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
              Professional Experience
            </h2>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className={index % 2 === 0 ? "p-6 rounded group" : "p-6 group"} style={index % 2 === 0 ? { backgroundColor: lightTone, pageBreakInside: 'avoid' } : { pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="text-base font-semibold text-gray-900"
                          as="h3"
                        />
                      ) : (
                        <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                      )}
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-sm font-light"
                          as="p"
                          style={{ color: themeColor }}
                        />
                      ) : (
                        <p className="text-sm font-light" style={{ color: themeColor }}>
                          {exp.company}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  {(!exp.bulletPoints || exp.bulletPoints.length === 0) && editable && onAddBulletPoint && exp.id && (
                    <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (onAddBulletPoint && exp.id) {
                            onAddBulletPoint(exp.id);
                          }
                        }}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-light"
                      >
                        <Plus className="h-3 w-3" />
                        Add Achievement
                      </button>
                    </div>
                  )}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                      <ul className="space-y-2 list-none">
                        {exp.bulletPoints.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="text-sm text-gray-700 leading-relaxed font-light flex items-start group">
                            <span className="mr-2 mt-1" style={{ color: themeColor }}>•</span>
                            <div className="flex-1 flex items-center gap-2">
                              {editable ? (
                                <InlineEditableText
                                  path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                                  value={bullet || ""}
                                  placeholder="Click to add achievement..."
                                  className="text-sm text-gray-700 leading-relaxed font-light flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                                  multiline
                                  as="span"
                                />
                              ) : (
                                bullet && <span>{bullet}</span>
                              )}
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
                          className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-light"
                        >
                          <Plus className="h-3 w-3" />
                          Add Achievement
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
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
                  <div key={edu.id} className="p-4 rounded mb-4" style={{ backgroundColor: lightTone }}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="text-base font-semibold text-gray-900"
                          as="h3"
                        />
                        {edu.field && (
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field}
                            className="text-sm text-gray-600 font-light mt-1"
                            as="p"
                          />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          className="text-sm text-gray-600 font-light"
                          as="p"
                        />
                        {edu.gpa && (
                          <InlineEditableText
                            path={`education[${index}].gpa`}
                            value={`GPA: ${edu.gpa}`}
                            className="text-xs text-gray-500 font-light mt-1"
                            as="p"
                          />
                        )}
                      </div>
                      <div className="text-xs text-gray-500 font-light ml-4 flex items-center gap-1">
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
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="p-4 rounded" style={{ backgroundColor: lightTone }}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900">{edu.degree}</h3>
                        {edu.field && <p className="text-sm text-gray-600 font-light mt-1">{edu.field}</p>}
                        <p className="text-sm text-gray-600 font-light">{edu.school}</p>
                        {edu.gpa && <p className="text-xs text-gray-500 font-light mt-1">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-xs text-gray-500 font-light ml-4">
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
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
              Core Skills
            </h2>
            {editable ? (
              <div className="flex flex-wrap gap-2">
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <span
                      className="px-2.5 py-1 rounded text-xs font-medium inline-block"
                      style={{ backgroundColor: themeColor, color: 'white' }}
                    >
                      {skill.name}
                    </span>
                  )}
                />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded text-xs font-medium"
                    style={{ backgroundColor: themeColor, color: 'white' }}
                  >
                    {skill.name}
                  </span>
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
            addButtonLabel="Add Section"
            defaultItem={{
              id: Date.now().toString(),
              title: "Custom Section",
              content: "Add details here",
            }}
            renderItem={(section, index) => (
              <div key={section.id || index} className="mb-8">
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title}
                  className="text-xs font-semibold mb-5 uppercase tracking-widest pb-2 border-b-2 block"
                  style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}
                  as="h2"
                />
                <InlineEditableText
                  path={`sections[${index}].content`}
                  value={section.content}
                  className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line block"
                  multiline
                  as="div"
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections &&
          resumeData.sections.length > 0 &&
          resumeData.sections.map((section, index) => (
            <div key={section.id || index} className="mb-8" style={{ pageBreakInside: 'avoid' }}>
              <h2 className="text-xs font-semibold mb-5 uppercase tracking-widest pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
                {section.title}
              </h2>
              <div className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TwoToneClassicTemplate;
