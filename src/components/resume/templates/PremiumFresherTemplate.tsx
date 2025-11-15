import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface PremiumFresherTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const PremiumFresherTemplate = ({
  resumeData,
  themeColor = "#7C3AED",
  editable = false,
}: PremiumFresherTemplateProps) => {
  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white p-10">
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2" style={{ borderColor: themeColor }}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-3xl font-bold mb-1 block"
                style={{ color: themeColor }}
                as="h1"
              />
            ) : (
              <h1 className="text-3xl font-bold mb-1" style={{ color: themeColor }}>
                {resumeData.personalInfo.fullName}
              </h1>
            )}
            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-base text-gray-600 mb-3 block"
                  as="p"
                />
              ) : (
                <p className="text-base text-gray-600 mb-3">{resumeData.personalInfo.title}</p>
              )
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
              {resumeData.personalInfo.email && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="inline-block"
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
                    className="inline-block"
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
                    className="inline-block"
                  />
                ) : (
                  <span>{resumeData.personalInfo.location}</span>
                )
              )}
            </div>
          </div>
          {photo && (
            <div className="ml-4">
              <ProfilePhoto src={photo} borderClass="border-2" className="rounded-lg" />
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-base font-bold mb-2" style={{ color: themeColor }}>
            Professional Summary
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-sm text-gray-700 leading-relaxed block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-4 space-y-6">
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3" style={{ color: themeColor }}>
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
                    <div className="mb-4 pb-4 border-b border-gray-200 last:border-0">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-sm font-bold text-gray-900 block"
                        as="h3"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="text-xs text-gray-600 mt-1 block"
                          as="p"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-xs font-semibold mt-1 block"
                        style={{ color: themeColor }}
                        as="p"
                      />
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
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
                resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-0">
                    <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-xs text-gray-600 mt-1">{edu.field}</p>}
                    <p className="text-xs font-semibold mt-1" style={{ color: themeColor }}>
                      {edu.school}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3" style={{ color: themeColor }}>
                Technical Skills
              </h2>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{skill.name}</span>
                      {(skill.level !== undefined && skill.level !== null) && (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(skill.level || 0) * 10}%`,
                                backgroundColor: themeColor,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">{skill.level}/10</span>
                        </div>
                      )}
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-2">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{skill.name}</span>
                      {skill.level && (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${skill.level * 10}%`,
                                backgroundColor: themeColor,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">{skill.level}/10</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-6">
          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div>
              <h2 className="text-base font-bold mb-3" style={{ color: themeColor }}>
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
                    <div className="mb-5">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            className="text-sm font-bold text-gray-900 block"
                            as="h3"
                          />
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            className="text-sm font-semibold mt-1 block"
                            style={{ color: themeColor }}
                            as="p"
                          />
                        </div>
                        <div className="text-xs text-gray-600 flex items-center gap-1">
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
                      {exp.description && (
                        <InlineEditableText
                          path={`experience[${index}].description`}
                          value={exp.description}
                          className="text-sm text-gray-700 leading-relaxed block"
                          multiline
                          as="div"
                        />
                      )}
                    </div>
                  )}
                />
              ) : (
                resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-sm font-semibold mt-1" style={{ color: themeColor }}>
                          {exp.company}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {exp.description.split("\n").map((line, i) => (
                          <p key={i} className="mb-1">
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Projects/Sections */}
          {resumeData.sections && resumeData.sections.length > 0 && (
            editable ? (
              <InlineEditableList
                path="sections"
                items={resumeData.sections}
                defaultItem={{
                  id: Date.now().toString(),
                  title: "New Section",
                  content: "Section content here",
                }}
                addButtonLabel="Add Section"
                renderItem={(section, index) => (
                  <div>
                    <InlineEditableText
                      path={`sections[${index}].title`}
                      value={section.title}
                      className="text-base font-bold mb-3 block"
                      style={{ color: themeColor }}
                      as="h2"
                    />
                    <InlineEditableText
                      path={`sections[${index}].content`}
                      value={section.content}
                      className="text-sm text-gray-700 leading-relaxed block"
                      multiline
                      as="div"
                    />
                  </div>
                )}
              />
            ) : (
              resumeData.sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-base font-bold mb-3" style={{ color: themeColor }}>
                    {section.title}
                  </h2>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    {section.content.split("\n").map((line, i) => (
                      <p key={i} className="mb-1">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};
