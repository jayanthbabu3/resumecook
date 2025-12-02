import React from "react";
import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { Plus, X, Linkedin, Globe, Github } from "lucide-react";

interface ExecutiveMinimalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

export const ExecutiveMinimalTemplate = ({
  resumeData,
  themeColor = "#000000",
  editable = false,
  onAddBulletPoint,
  onRemoveBulletPoint,
}: ExecutiveMinimalTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 p-16">
      {/* Header - Ultra Minimal */}
      <div className="mb-12 text-center">
        <div className="mb-2">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-4xl font-bold tracking-tight uppercase"
              as="h1"
            />
          ) : (
            <h1 className="text-4xl font-bold tracking-tight uppercase">
              {resumeData.personalInfo.fullName}
            </h1>
          )}
        </div>

        {resumeData.personalInfo.title && (
          <div className="mb-6">
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-base font-light tracking-wider text-gray-600"
                as="p"
              />
            ) : (
              <p className="text-base font-light tracking-wider text-gray-600">
                {resumeData.personalInfo.title}
              </p>
            )}
          </div>
        )}

        {/* Contact - Minimal Inline */}
        <div className="flex justify-center gap-6 text-xs text-gray-500 border-t border-b border-gray-300 py-3">
          {resumeData.personalInfo.email && (
            editable ? (
              <InlineEditableText
                path="personalInfo.email"
                value={resumeData.personalInfo.email}
                className="hover:text-gray-900"
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
                className="hover:text-gray-900"
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
                className="hover:text-gray-900"
                as="span"
              />
            ) : (
              <span>{resumeData.personalInfo.location}</span>
            )
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-12 max-w-4xl mx-auto" style={{ pageBreakInside: 'avoid' }}>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-center text-gray-700 leading-relaxed text-sm italic"
              as="p"
            />
          ) : (
            <p className="text-center text-gray-700 leading-relaxed text-sm italic">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Social Links */}
      {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
        <div className="mb-12 max-w-4xl mx-auto" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-xs font-bold tracking-widest uppercase mb-8 text-center border-b pb-2" style={{ pageBreakAfter: 'avoid' }}>
            Social Links
          </h2>
          <div className="flex flex-wrap gap-4 text-[12.5px] text-gray-700 justify-center">
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
        <div className="mb-12" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-xs font-bold tracking-widest uppercase mb-8 text-center border-b pb-2" style={{ pageBreakAfter: 'avoid' }}>
            Experience
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
                <div key={exp.id} className="mb-8 max-w-4xl mx-auto group">
              <div className="flex justify-between items-baseline mb-3 border-b border-gray-200 pb-2">
                <div className="flex-1">
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position}
                        className="text-xs font-semibold"
                      as="h3"
                    />
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                        className="text-xs text-gray-600 font-light"
                      as="p"
                    />
                    </div>
                    <div className="text-xs text-gray-500 ml-4 flex items-center gap-1">
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

              {/* Bullet Points */}
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <ul className="space-y-2">
                  {exp.bulletPoints.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex gap-3">
                      <span className="text-gray-400 mt-1">—</span>
                        <InlineEditableText
                          path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                          value={bullet || ""}
                          placeholder="Click to add achievement..."
                            className="text-xs text-gray-700 leading-relaxed flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
                          multiline
                          as="span"
                        />
                          {onRemoveBulletPoint && (
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
                  {onAddBulletPoint && exp.id && (
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
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-8 max-w-4xl mx-auto group">
                  <div className="flex justify-between items-baseline mb-3 border-b border-gray-200 pb-2">
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold">{exp.position}</h3>
                      <p className="text-xs text-gray-600 font-light">{exp.company}</p>
                    </div>
                    <div className="text-xs text-gray-500 ml-4">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="space-y-2">
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="flex gap-3">
                          <span className="text-gray-400 mt-1">—</span>
                          <span className="flex-1 text-xs">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-12" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-xs font-bold tracking-widest uppercase mb-8 text-center border-b pb-2" style={{ pageBreakAfter: 'avoid' }}>
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
                <div key={edu.id} className="mb-6 max-w-4xl mx-auto">
              <div className="flex justify-between items-baseline border-b border-gray-200 pb-2">
                    <div className="flex-1">
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                          className="text-xs font-semibold"
                      as="h3"
                    />
                  ) : (
                        <h3 className="text-xs font-semibold">{edu.degree}</h3>
                      )}
                      {edu.field && (
                        editable ? (
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field}
                            className="text-xs text-gray-600 font-light"
                            as="p"
                          />
                        ) : (
                          <p className="text-xs text-gray-600 font-light">{edu.field}</p>
                        )
                  )}
                  {editable ? (
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                          className="text-xs text-gray-600 font-light"
                          as="p"
                        />
                      ) : (
                        <p className="text-xs text-gray-600 font-light">{edu.school}</p>
                      )}
                      {edu.gpa && (
                        editable ? (
                          <InlineEditableText
                            path={`education[${index}].gpa`}
                            value={`GPA: ${edu.gpa}`}
                            className="text-xs text-gray-500 font-light mt-0.5"
                      as="p"
                    />
                  ) : (
                          <p className="text-xs text-gray-500 font-light mt-0.5">GPA: {edu.gpa}</p>
                        )
                      )}
                    </div>
                    <div className="text-xs text-gray-500 ml-4 flex items-center gap-1">
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
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-6 max-w-4xl mx-auto">
                  <div className="flex justify-between items-baseline border-b border-gray-200 pb-2">
                    <div className="flex-1">
                      <h3 className="text-xs font-semibold">{edu.degree}</h3>
                      {edu.field && <p className="text-xs text-gray-600 font-light">{edu.field}</p>}
                      <p className="text-xs text-gray-600 font-light">{edu.school}</p>
                      {edu.gpa && (
                        <p className="text-xs text-gray-500 font-light mt-0.5">GPA: {edu.gpa}</p>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 ml-4">
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
        <div className="mb-12" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-xs font-bold tracking-widest uppercase mb-8 text-center border-b pb-2" style={{ pageBreakAfter: 'avoid' }}>
            Skills
          </h2>
          <div className="max-w-4xl mx-auto">
          {editable ? (
              <div className="flex flex-wrap justify-center [&>div>div]:!gap-0">
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <span className="text-xs text-gray-500 font-light">
                    {skill.name}
                    {index < resumeData.skills.length - 1 && <span className="ml-4 text-gray-300">|</span>}
                  </span>
                  )}
                />
            </div>
          ) : (
              <div className="flex flex-wrap justify-center gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs text-gray-500 font-light"
                  >
                    {skill.name}
                    {index < resumeData.skills.length - 1 && <span className="ml-4 text-gray-300">|</span>}
                  </span>
                ))}
              </div>
            )}
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
            <div key={section.id} className="mb-12 max-w-4xl mx-auto" style={{ pageBreakInside: 'avoid' }}>
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="text-xs font-bold tracking-widest uppercase mb-6 text-center border-b pb-2 block"
                style={{ pageBreakAfter: 'avoid' }}
                as="h2"
              />
              <InlineEditableText
                path={`sections[${index}].content`}
                value={section.content}
                className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap block"
                multiline
                as="div"
              />
            </div>
          )}
        />
      ) : (
        resumeData.sections &&
        resumeData.sections.map((section, index) => (
          <div key={index} className="mb-12 max-w-4xl mx-auto" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-xs font-bold tracking-widest uppercase mb-6 text-center border-b pb-2" style={{ pageBreakAfter: 'avoid' }}>
              {section.title}
            </h2>
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExecutiveMinimalTemplate;
