import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const DesignSphereTemplate = ({
  resumeData,
  themeColor = "#ec4899",
  editable = false,
}: TemplateProps) => {

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    if (!year || !month) return date;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 p-10 text-[13px] leading-relaxed relative">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-5" style={{ backgroundColor: themeColor }}></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-5" style={{ backgroundColor: themeColor }}></div>

      {/* Header with Circular Design */}
      <div className="mb-8 text-center relative">
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName || "Your Name"}
            className="text-[32px] font-bold mb-2 block"
            style={{ color: themeColor }}
            as="h1"
          />
        ) : (
          <h1 className="text-[32px] font-bold mb-2" style={{ color: themeColor }}>
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
        )}

        {resumeData.personalInfo.title && (
          editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title}
              className="text-[14px] text-gray-600 mb-4 block"
              as="h2"
            />
          ) : (
            <h2 className="text-[14px] text-gray-600 mb-4">
              {resumeData.personalInfo.title}
            </h2>
          )
        )}

        <div className="flex gap-4 text-[12px] text-gray-700 justify-center flex-wrap items-center">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.email}</span>
              )}
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.phone}</span>
              )}
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="inline-block"
                />
              ) : (
                <span>{resumeData.personalInfo.location}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Summary with Rounded Design */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8 max-w-3xl mx-auto">
          <h2 className="text-[15px] font-bold mb-4 text-center uppercase tracking-wide" style={{ color: themeColor }}>
            Profile
          </h2>
          <div className="p-6 rounded-3xl" style={{ backgroundColor: `${themeColor}08`, border: `2px solid ${themeColor}20` }}>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[12.5px] text-gray-700 leading-[1.7] block text-center"
                multiline
                as="p"
              />
            ) : (
              <p className="text-[12.5px] text-gray-700 leading-[1.7] text-center">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Experience with Circular Bullets */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8 max-w-3xl mx-auto">
          <h2 className="text-[15px] font-bold mb-6 text-center uppercase tracking-wide" style={{ color: themeColor }}>
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
                <div className="mb-6 last:mb-0 relative pl-8">
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full" style={{ backgroundColor: themeColor }}></div>
                  <div className="p-5 rounded-2xl" style={{ backgroundColor: `${themeColor}05` }}>
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div className="flex-1 min-w-0">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position || "Position Title"}
                          className="text-[15px] font-bold block"
                          style={{ color: themeColor }}
                          as="h3"
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company || "Company Name"}
                          className="text-[13px] font-semibold text-gray-700 block"
                          as="p"
                        />
                      </div>
                      <div className="text-[12px] text-gray-600 font-medium whitespace-nowrap px-4 py-1.5 rounded-full" style={{ backgroundColor: `${themeColor}15` }}>
                        <div className="flex items-center gap-1">
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
                  </div>
                </div>
              )}
            />
          ) : (
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="relative pl-8">
                  <div className="absolute left-0 top-2 w-4 h-4 rounded-full" style={{ backgroundColor: themeColor }}></div>
                  <div className="p-5 rounded-2xl" style={{ backgroundColor: `${themeColor}05` }}>
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-bold" style={{ color: themeColor }}>
                          {exp.position || "Position Title"}
                        </h3>
                        <p className="text-[13px] font-semibold text-gray-700">
                          {exp.company || "Company Name"}
                        </p>
                      </div>
                      <span className="text-[12px] text-gray-600 font-medium whitespace-nowrap px-4 py-1.5 rounded-full" style={{ backgroundColor: `${themeColor}15` }}>
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Skills with Circular Pills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div>
            <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide text-center" style={{ color: themeColor }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) =>
                  skill.name ? (
                    <div className="px-4 py-2 rounded-full text-[12px] font-medium text-center" style={{
                      backgroundColor: `${themeColor}15`,
                      color: themeColor,
                      border: `1px solid ${themeColor}30`
                    }}>
                      {skill.name}
                    </div>
                  ) : null
                }
              />
            ) : (
              <div className="flex flex-wrap gap-2 justify-center">
                {resumeData.skills.map((skill) =>
                  skill.name ? (
                    <div key={skill.id} className="px-4 py-2 rounded-full text-[12px] font-medium text-center" style={{
                      backgroundColor: `${themeColor}15`,
                      color: themeColor,
                      border: `1px solid ${themeColor}30`
                    }}>
                      {skill.name}
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide text-center" style={{ color: themeColor }}>
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
                  <div className="mb-5 last:mb-0 text-center">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree || "Degree"}
                      className="text-[13px] font-bold text-gray-900 block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[12px] text-gray-700 block"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school || "School Name"}
                      className="text-[12.5px] text-gray-600 block"
                      as="p"
                    />
                    <div className="text-[12px] text-gray-500 flex items-center gap-1 mt-1 justify-center">
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
              <div className="space-y-5">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="text-center">
                    <h3 className="text-[13px] font-bold text-gray-900">{edu.degree || "Degree"}</h3>
                    {edu.field && <p className="text-[12px] text-gray-700">{edu.field}</p>}
                    <p className="text-[12.5px] text-gray-600">{edu.school || "School Name"}</p>
                    <span className="text-[12px] text-gray-500 block mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Additional Sections */}
      {resumeData.sections && resumeData.sections.length > 0 && resumeData.sections.map((section, index) => (
        <div key={section.id} className="mt-8 max-w-3xl mx-auto">
          <h2 className="text-[15px] font-bold mb-3 uppercase tracking-wide text-center" style={{ color: themeColor }}>
            {section.title}
          </h2>
          {editable ? (
            <InlineEditableText
              path={`sections[${index}].content`}
              value={section.content}
              className="text-[12.5px] text-gray-700 leading-[1.7] block text-center"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line text-center">{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DesignSphereTemplate;
