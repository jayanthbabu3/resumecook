import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { Plus, X, Linkedin, Globe, Github } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
  onAddBulletPoint?: (expId: string) => void;
  onRemoveBulletPoint?: (expId: string, bulletIndex: number) => void;
}

export const ProfessionalClassicTemplate = ({ resumeData, themeColor = "#374151", editable = false, onAddBulletPoint, onRemoveBulletPoint }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900 p-8 text-[13px] leading-relaxed">
      {/* Header - Classic ATS-Friendly */}
      <div className="mb-2 text-center">
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName || "Your Name"}
            className="text-[36px] font-bold mb-2 block"
            style={{ color: themeColor }}
            as="h1"
          />
        ) : (
          <h1 className="text-[36px] font-bold mb-2" style={{ color: themeColor }}>
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={resumeData.personalInfo.title || "Professional Title"}
            className="text-[14px] text-gray-600 mb-4 block"
            as="p"
          />
        ) : (
          <p className="text-[14px] text-gray-600 mb-4">
            {resumeData.personalInfo.title || "Professional Title"}
          </p>
        )}

        {/* Contact */}
        <div className="flex justify-center gap-x-4 text-[12px] text-gray-600 flex-wrap">
          {resumeData.personalInfo.email && (
            <>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.email}</span>
              )}
            </>
          )}
          {resumeData.personalInfo.email && resumeData.personalInfo.phone && <span className="text-gray-400">|</span>}
          {resumeData.personalInfo.phone && (
            <>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.phone}</span>
              )}
            </>
          )}
          {resumeData.personalInfo.phone && resumeData.personalInfo.location && <span className="text-gray-400">|</span>}
          {resumeData.personalInfo.location && (
            <>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.location}</span>
              )}
            </>
          )}
        </div>
      </div>

      <div className="h-px w-full bg-gray-300 mb-6"></div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-3 uppercase" style={{ color: themeColor }}>
            Professional Summary
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[13px] text-gray-700 leading-[1.7] block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[13px] text-gray-700 leading-[1.7]">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Social Links */}
      {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-3 uppercase" style={{ color: themeColor }}>
            Social Links
          </h2>
          <div className="flex flex-wrap gap-4 text-[12.5px] text-gray-700">
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
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-3 uppercase" style={{ color: themeColor }}>
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
                description: "Job description here",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-5 group">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <div className="flex-1">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position || "Position Title"}
                        className="text-[14px] font-bold text-gray-900 block"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company || "Company Name"}
                        className="text-[13px] text-gray-700 block"
                        as="p"
                      />
                    </div>
                    <div className="text-[12px] text-gray-600 whitespace-nowrap flex items-center gap-1">
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
                      className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line block"
                      multiline
                      as="p"
                    />
                  )}
                  
                  {/* Bullet Points */}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="mt-3 space-y-2 list-none">
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-[12.5px] text-gray-700 leading-[1.7] flex items-start">
                          <span className="mr-2" style={{ color: themeColor }}>•</span>
                          {editable ? (
                            <InlineEditableText
                              path={`experience[${index}].bulletPoints[${bulletIndex}]`}
                              value={bullet || ""}
                              placeholder="Click to add achievement..."
                              className="text-[12.5px] text-gray-700 leading-[1.7] flex-1 min-h-[1.2rem] border border-dashed border-gray-300 rounded px-1"
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
              )}
            />
          ) : (
            <div className="space-y-5">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="group">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <div className="flex-1">
                      <h3 className="text-[14px] font-bold text-gray-900">{exp.position || "Position Title"}</h3>
                      <p className="text-[13px] text-gray-700">{exp.company || "Company Name"}</p>
                    </div>
                    <span className="text-[12px] text-gray-600 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                  
                  {/* Bullet Points */}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="mt-3 space-y-2 list-none">
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        bullet && (
                          <li key={bulletIndex} className="text-[12.5px] text-gray-700 leading-[1.7] flex items-start">
                            <span className="mr-2" style={{ color: themeColor }}>•</span>
                            <span>{bullet}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-3 uppercase" style={{ color: themeColor }}>
            Skills
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill) => {
                return skill.name ? (
                  <span className="inline-block mr-4 mb-2 text-[12.5px] text-gray-700">
                    {skill.name}
                  </span>
                ) : null;
              }}
            />
          ) : (
            <div className="flex flex-wrap">
              {resumeData.skills.map((skill, index) => (
                skill.name ? (
                  <span key={skill.id} className="text-[12.5px] text-gray-700">
                    {skill.name}{index < resumeData.skills.length - 1 ? ", " : ""}
                  </span>
                ) : null
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-3 uppercase" style={{ color: themeColor }}>
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
                <div className="mb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-[13px] font-semibold text-gray-900 block"
                        as="h3"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="text-[12px] text-gray-600 block"
                          as="p"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[12.5px] text-gray-700 block"
                        as="p"
                      />
                      {edu.gpa && (
                        <InlineEditableText
                          path={`education[${index}].gpa`}
                          value={`GPA: ${edu.gpa}`}
                          className="text-[11px] text-gray-500 block mt-0.5"
                          as="p"
                        />
                      )}
                    </div>
                    <div className="text-[12px] text-gray-500 whitespace-nowrap flex items-center gap-1">
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
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-[13px] font-semibold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-[12px] text-gray-600">{edu.field}</p>}
                    <p className="text-[12.5px] text-gray-700">{edu.school}</p>
                    {edu.gpa && <p className="text-[11px] text-gray-500 mt-0.5">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-[12px] text-gray-500 whitespace-nowrap">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
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
                className="text-[14px] font-bold mb-3 uppercase block"
                style={{ color: themeColor }}
                as="h2"
              />
              <InlineEditableText
                path={`sections[${index}].content`}
                value={section.content}
                className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line block"
                multiline
                as="p"
              />
            </div>
          )}
        />
      ) : (
        resumeData.sections.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-[14px] font-bold mb-3 uppercase" style={{ color: themeColor }}>
              {section.title}
            </h2>
            <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
