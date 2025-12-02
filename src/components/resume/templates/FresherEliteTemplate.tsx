import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface FresherEliteTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherEliteTemplate = ({
  resumeData,
  themeColor = "#6366f1",
  editable = false,
}: FresherEliteTemplateProps) => {
  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-gray-50 p-8">
      <div className="max-w-[900px] mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header with colored background */}
        <div 
          className="px-10 py-8"
          style={{ 
            background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)` 
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 text-white">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-3xl font-bold mb-2"
                  as="h1"
                />
              ) : (
                <h1 className="text-3xl font-bold mb-2">
                  {resumeData.personalInfo.fullName}
                </h1>
              )}
              {resumeData.personalInfo.title && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-base font-medium mb-3 opacity-95"
                    as="p"
                  />
                ) : (
                  <p className="text-base font-medium mb-3 opacity-95">
                    {resumeData.personalInfo.title}
                  </p>
                )
              )}
              <div className="flex flex-wrap gap-5 text-sm opacity-90">
                {resumeData.personalInfo.email && (
                  <span className="flex items-center gap-2">
                    <span>✉</span>{" "}
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.email"
                        value={resumeData.personalInfo.email}
                        className="text-sm opacity-90"
                        as="span"
                      />
                    ) : (
                      resumeData.personalInfo.email
                    )}
                  </span>
                )}
                {resumeData.personalInfo.phone && (
                  <span className="flex items-center gap-2">
                    <span>📞</span>{" "}
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.phone"
                        value={resumeData.personalInfo.phone}
                        className="text-sm opacity-90"
                        as="span"
                      />
                    ) : (
                      resumeData.personalInfo.phone
                    )}
                  </span>
                )}
                {resumeData.personalInfo.location && (
                  <span className="flex items-center gap-2">
                    <span>📍</span>{" "}
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.location"
                        value={resumeData.personalInfo.location}
                        className="text-sm opacity-90"
                        as="span"
                      />
                    ) : (
                      resumeData.personalInfo.location
                    )}
                  </span>
                )}
              </div>
            </div>
            {photo && (
              <div className="ml-6">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  <ProfilePhoto src={photo} borderClass="" className="rounded-none" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-10 py-6">
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-5 border-l-4" style={{ borderColor: themeColor }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.summary"
                    value={resumeData.personalInfo.summary}
                    className="text-sm text-gray-700 leading-relaxed"
                    as="p"
                    multiline
                  />
                ) : (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {resumeData.personalInfo.summary}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-7">
            {/* Left Column - 1 column */}
            <div className="space-y-6">
              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div>
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
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
                        <div className="bg-white rounded-lg p-3.5 border border-gray-200">
                          <InlineEditableText
                            path={`education[${index}].degree`}
                            value={edu.degree}
                            className="text-sm font-bold text-gray-900 mb-1"
                            as="h3"
                          />
                          {edu.field && (
                            <InlineEditableText
                              path={`education[${index}].field`}
                              value={edu.field}
                              className="text-xs text-gray-600 mb-1.5"
                              as="p"
                            />
                          )}
                          <InlineEditableText
                            path={`education[${index}].school`}
                            value={edu.school}
                            className="text-xs font-semibold mb-1"
                            as="p"
                            style={{ color: themeColor }}
                          />
                          <p className="text-xs text-gray-500">
                            <div className="text-xs text-gray-500 flex items-center gap-1">
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
                          </p>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-3">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="bg-white rounded-lg p-3.5 border border-gray-200">
                          <h3 className="text-sm font-bold text-gray-900 mb-1">
                            {edu.degree}
                          </h3>
                          {edu.field && (
                            <p className="text-xs text-gray-600 mb-1.5">{edu.field}</p>
                          )}
                          <p className="text-xs font-semibold mb-1" style={{ color: themeColor }}>
                            {edu.school}
                          </p>
                          <p className="text-xs text-gray-500">
                            {edu.startDate} - {edu.endDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Skills with circular progress */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <div>
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                    Skills
                  </h2>
                  {editable ? (
                      <InlineEditableSkills
                        path="skills"
                        skills={resumeData.skills}
                        renderSkill={(skill, index) => (
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">
                              {skill.name}
                            </span>
                            {(skill.level !== undefined && skill.level !== null) && (
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                      backgroundColor: i < Math.ceil((skill.level || 0) / 2) ? themeColor : '#e5e7eb',
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-2.5">
                      {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            {skill.name}
                          </span>
                          {skill.level && (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    backgroundColor: i < Math.ceil(skill.level / 2) ? themeColor : '#e5e7eb',
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - 2 columns */}
            <div className="col-span-2 space-y-6">
              {/* Projects/Sections - Most Important for Freshers */}
              {editable ? (
                <InlineEditableList
                  path="sections"
                  items={resumeData.sections || []}
                  defaultItem={{
                    id: Date.now().toString(),
                    title: "Projects",
                    content: "Describe your project details here...",
                  }}
                  addButtonLabel="Add Section"
                  renderItem={(section, index) => (
                    <div className="mb-6">
                      <h2
                        className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                        style={{ color: themeColor }}
                      >
                        <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                        <InlineEditableText
                          path={`sections[${index}].title`}
                          value={section.title}
                          className="text-xs font-bold uppercase tracking-wider"
                          as="span"
                          style={{ color: themeColor }}
                        />
                      </h2>
                      <div className="bg-gray-50 rounded-xl p-5">
                        <InlineEditableText
                          path={`sections[${index}].content`}
                          value={section.content}
                          className="text-sm text-gray-700 leading-relaxed whitespace-pre-line"
                          as="div"
                          multiline
                        />
                      </div>
                    </div>
                  )}
                />
              ) : (
                resumeData.sections &&
                resumeData.sections.map((section, index) => (
                  <div key={index} className="mb-6">
                    <h2
                      className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                      style={{ color: themeColor }}
                    >
                      <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                      {section.title}
                    </h2>
                    <div className="bg-gray-50 rounded-xl p-5">
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Internship Experience - Optional for Freshers */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div>
                  <h2
                    className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: themeColor }}
                  >
                    <span className="w-1 h-3.5 rounded-full" style={{ backgroundColor: themeColor }} />
                    Internship Experience
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
                        description: "Job description",
                        current: false,
                      }}
                      addButtonLabel="Add Experience"
                      renderItem={(exp, index) => (
                        <div className="relative pl-5 pb-5 border-l-2 border-gray-200 last:border-0 last:pb-0">
                          <div
                            className="absolute left-0 top-0 w-2.5 h-2.5 rounded-full -ml-[5px]"
                            style={{ backgroundColor: themeColor }}
                          />
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <InlineEditableText
                                path={`experience[${index}].position`}
                                value={exp.position}
                                className="text-base font-bold text-gray-900"
                                as="h3"
                              />
                              <InlineEditableText
                                path={`experience[${index}].company`}
                                value={exp.company}
                                className="text-sm font-semibold mt-1"
                                as="p"
                                style={{ color: themeColor }}
                              />
                            </div>
                            <span
                              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${themeColor}15`,
                                color: themeColor
                              }}
                            >
                              <div className="text-xs text-gray-500 flex items-center gap-1">
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
                            </span>
                          </div>
                          {exp.description && (
                            <InlineEditableText
                              path={`experience[${index}].description`}
                              value={exp.description}
                              className="text-sm text-gray-700 leading-relaxed"
                              as="div"
                              multiline
                            />
                          )}
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-5">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="relative pl-5 pb-5 border-l-2 border-gray-200 last:border-0 last:pb-0">
                          <div
                            className="absolute left-0 top-0 w-2.5 h-2.5 rounded-full -ml-[5px]"
                            style={{ backgroundColor: themeColor }}
                          />
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h3 className="text-base font-bold text-gray-900">
                                {exp.position}
                              </h3>
                              <p className="text-sm font-semibold mt-1" style={{ color: themeColor }}>
                                {exp.company}
                              </p>
                            </div>
                            <span
                              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                              style={{
                                backgroundColor: `${themeColor}15`,
                                color: themeColor
                              }}
                            >
                              {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                            </span>
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
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
