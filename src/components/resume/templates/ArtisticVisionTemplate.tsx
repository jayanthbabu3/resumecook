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

export const ArtisticVisionTemplate = ({
  resumeData,
  themeColor = "#3b82f6",
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
    <div className="w-full h-full bg-white text-gray-900 p-10 text-[13px] leading-relaxed">
      {/* Geometric Header with Angular Accent */}
      <div className="relative mb-8 pb-6">
        <div className="absolute top-0 left-0 w-20 h-20 opacity-10" style={{
          clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
          backgroundColor: themeColor
        }}></div>

        <div className="relative">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName || "Your Name"}
              className="text-[32px] font-bold mb-2 block uppercase tracking-tight"
              style={{ color: themeColor }}
              as="h1"
            />
          ) : (
            <h1 className="text-[32px] font-bold mb-2 uppercase tracking-tight" style={{ color: themeColor }}>
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
          )}

          {resumeData.personalInfo.title && (
            editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-[14px] text-gray-600 mb-4 uppercase tracking-wider block"
                as="h2"
              />
            ) : (
              <h2 className="text-[14px] text-gray-600 mb-4 uppercase tracking-wider">
                {resumeData.personalInfo.title}
              </h2>
            )
          )}

          <div className="flex gap-5 text-[12px] text-gray-700 flex-wrap">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: themeColor }}></div>
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
                <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: themeColor }}></div>
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
                <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: themeColor }}></div>
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
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Summary and Skills */}
        <div className="col-span-1 space-y-6">
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-[15px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
                Profile
              </h2>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="text-[12.5px] text-gray-700 leading-[1.7] block"
                  multiline
                  as="p"
                />
              ) : (
                <p className="text-[12.5px] text-gray-700 leading-[1.7]">
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </div>
          )}

          {/* Skills with Hexagonal Design */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
                Expertise
              </h2>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill) =>
                    skill.name ? (
                      <div className="relative mb-2 px-3 py-2 text-[12px] font-medium" style={{
                        backgroundColor: `${themeColor}10`,
                        clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)',
                        color: themeColor
                      }}>
                        {skill.name}
                      </div>
                    ) : null
                  }
                />
              ) : (
                <div className="space-y-2">
                  {resumeData.skills.map((skill) =>
                    skill.name ? (
                      <div key={skill.id} className="relative px-3 py-2 text-[12px] font-medium" style={{
                        backgroundColor: `${themeColor}10`,
                        clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)',
                        color: themeColor
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
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
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
                    <div className="mb-5 last:mb-0">
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
                      <div className="text-[12px] text-gray-500 flex items-center gap-1 mt-1">
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
                    <div key={edu.id}>
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

        {/* Right Column - Experience */}
        <div className="col-span-2">
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div>
              <div className="flex items-center mb-6">
                <div className="w-2 h-2 rotate-45 mr-3" style={{ backgroundColor: themeColor }}></div>
                <h2 className="text-[15px] font-bold uppercase tracking-wide" style={{ color: themeColor }}>
                  Professional Experience
                </h2>
                <div className="flex-1 h-px ml-4" style={{ backgroundColor: `${themeColor}30` }}></div>
              </div>
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
                    <div className="mb-6 last:mb-0 relative pl-6">
                      <div className="absolute left-0 top-1 w-3 h-3 rotate-45" style={{ backgroundColor: `${themeColor}40` }}></div>
                      <div className="mb-2">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position || "Position Title"}
                          className="text-[15px] font-bold block"
                          style={{ color: themeColor }}
                          as="h3"
                        />
                        <div className="flex justify-between items-baseline">
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company || "Company Name"}
                            className="text-[13px] font-semibold text-gray-700 block"
                            as="p"
                          />
                          <div className="text-[12px] text-gray-600 font-medium whitespace-nowrap ml-4 flex items-center gap-1">
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
                  )}
                />
              ) : (
                <div className="space-y-6">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6">
                      <div className="absolute left-0 top-1 w-3 h-3 rotate-45" style={{ backgroundColor: `${themeColor}40` }}></div>
                      <div className="mb-2">
                        <h3 className="text-[15px] font-bold" style={{ color: themeColor }}>
                          {exp.position || "Position Title"}
                        </h3>
                        <div className="flex justify-between items-baseline">
                          <p className="text-[13px] font-semibold text-gray-700">
                            {exp.company || "Company Name"}
                          </p>
                          <span className="text-[12px] text-gray-600 font-medium whitespace-nowrap ml-4">
                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                          </span>
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Additional Sections */}
          {resumeData.sections && resumeData.sections.length > 0 && resumeData.sections.map((section, index) => (
            <div key={section.id} className="mt-8">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 rotate-45 mr-3" style={{ backgroundColor: themeColor }}></div>
                <h2 className="text-[15px] font-bold uppercase tracking-wide" style={{ color: themeColor }}>
                  {section.title}
                </h2>
                <div className="flex-1 h-px ml-4" style={{ backgroundColor: `${themeColor}30` }}></div>
              </div>
              {editable ? (
                <InlineEditableText
                  path={`sections[${index}].content`}
                  value={section.content}
                  className="text-[12.5px] text-gray-700 leading-[1.7] block pl-6"
                  multiline
                  as="p"
                />
              ) : (
                <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line pl-6">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtisticVisionTemplate;
