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

export const DesignMaestroTemplate = ({
  resumeData,
  themeColor = "#8b5cf6",
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
      {/* Centered Header with Elegant Dividers */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-gray-400"></div>
          <div className="mx-4">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName || "Your Name"}
                className="text-[32px] font-bold block"
                style={{ color: themeColor }}
                as="h1"
              />
            ) : (
              <h1 className="text-[32px] font-bold" style={{ color: themeColor }}>
                {resumeData.personalInfo.fullName || "Your Name"}
              </h1>
            )}
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-300 to-gray-400"></div>
        </div>

        {resumeData.personalInfo.title && (
          editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title}
              className="text-[14px] text-gray-600 mb-4 italic block"
              as="h2"
            />
          ) : (
            <h2 className="text-[14px] text-gray-600 mb-4 italic">
              {resumeData.personalInfo.title}
            </h2>
          )
        )}

        {/* Contact Info with Flowing Separators */}
        <div className="flex gap-4 text-[12px] text-gray-700 justify-center items-center flex-wrap">
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
          {resumeData.personalInfo.email && resumeData.personalInfo.phone && <span className="text-gray-400">~</span>}
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
          {resumeData.personalInfo.location && (resumeData.personalInfo.email || resumeData.personalInfo.phone) && <span className="text-gray-400">~</span>}
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

      {/* Summary with Musical Flow */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-px" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-[15px] font-bold mx-3 uppercase tracking-wider" style={{ color: themeColor }}>
              Professional Symphony
            </h2>
            <div className="w-12 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[12.5px] text-gray-700 leading-[1.8] block text-center"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[12.5px] text-gray-700 leading-[1.8] text-center">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience with Flowing Timeline */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-[15px] font-bold mx-3 uppercase tracking-wider" style={{ color: themeColor }}>
              Performance History
            </h2>
            <div className="w-12 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>
          <div className="relative border-l-2 pl-8 ml-6" style={{ borderColor: `${themeColor}40` }}>
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
                  <div className="mb-8 last:mb-0 relative">
                    <div className="absolute -left-[2.4rem] w-5 h-5 rounded-full border-2 bg-white" style={{ borderColor: themeColor }}></div>
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="flex-1">
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
                    {exp.description && (
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line block mt-2"
                        multiline
                        as="p"
                      />
                    )}
                  </div>
                )}
              />
            ) : (
              <div className="space-y-8">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-[2.4rem] w-5 h-5 rounded-full border-2 bg-white" style={{ borderColor: themeColor }}></div>
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold" style={{ color: themeColor }}>
                          {exp.position || "Position Title"}
                        </h3>
                        <p className="text-[13px] font-semibold text-gray-700">
                          {exp.company || "Company Name"}
                        </p>
                      </div>
                      <span className="text-[12px] text-gray-600 font-medium whitespace-nowrap ml-4">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line mt-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Skills with Curved Progress Design */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-[15px] font-bold mx-3 uppercase tracking-wider" style={{ color: themeColor }}>
              Mastery & Skills
            </h2>
            <div className="w-12 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill) =>
                skill.name ? (
                  <div className="px-4 py-2.5 rounded-full border-2 text-[12px] font-medium text-center transition-all hover:shadow-md" style={{ borderColor: themeColor, color: themeColor }}>
                    {skill.name}
                  </div>
                ) : null
              }
            />
          ) : (
            <div className="flex flex-wrap gap-3 justify-center">
              {resumeData.skills.map((skill) =>
                skill.name ? (
                  <div key={skill.id} className="px-4 py-2.5 rounded-full border-2 text-[12px] font-medium text-center" style={{ borderColor: themeColor, color: themeColor }}>
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
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-px" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-[15px] font-bold mx-3 uppercase tracking-wider" style={{ color: themeColor }}>
              Academic Foundation
            </h2>
            <div className="w-12 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>
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
                <div className="mb-6 last:mb-0 text-center p-4 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
                  <InlineEditableText
                    path={`education[${index}].degree`}
                    value={edu.degree || "Degree"}
                    className="text-[13px] font-bold block"
                    style={{ color: themeColor }}
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
                    className="text-[12.5px] text-gray-600 block mt-1"
                    as="p"
                  />
                  <div className="text-[12px] text-gray-500 mt-1 flex items-center gap-1 justify-center">
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
            <div className="space-y-6">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="text-center p-4 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
                  <h3 className="text-[13px] font-bold" style={{ color: themeColor }}>{edu.degree || "Degree"}</h3>
                  {edu.field && <p className="text-[12px] text-gray-700">{edu.field}</p>}
                  <p className="text-[12.5px] text-gray-600 mt-1">{edu.school || "School Name"}</p>
                  <span className="text-[12px] text-gray-500 mt-1 block">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Additional Sections */}
      {resumeData.sections && resumeData.sections.length > 0 && resumeData.sections.map((section, index) => (
        <div key={section.id} className="mt-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-px" style={{ backgroundColor: themeColor }}></div>
            <h2 className="text-[15px] font-bold mx-3 uppercase tracking-wider" style={{ color: themeColor }}>
              {section.title}
            </h2>
            <div className="w-12 h-px" style={{ backgroundColor: themeColor }}></div>
          </div>
          {editable ? (
            <InlineEditableText
              path={`sections[${index}].content`}
              value={section.content}
              className="text-[12.5px] text-gray-700 leading-[1.8] block text-center"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-line text-center">{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DesignMaestroTemplate;
