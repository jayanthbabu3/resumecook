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

export const CreativeCraftedTemplate = ({
  resumeData,
  themeColor = "#84cc16",
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
      {/* Header with Stitched Border Effect */}
      <div className="mb-8 pb-6 relative">
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{
          background: `repeating-linear-gradient(90deg, ${themeColor} 0, ${themeColor} 10px, transparent 10px, transparent 20px)`,
          height: '2px'
        }}></div>

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
              className="text-[14px] text-gray-600 mb-4 font-medium block"
              as="h2"
            />
          ) : (
            <h2 className="text-[14px] text-gray-600 mb-4 font-medium">
              {resumeData.personalInfo.title}
            </h2>
          )
        )}

        <div className="flex gap-5 text-[12px] text-gray-700 flex-wrap">
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
          {resumeData.personalInfo.email && resumeData.personalInfo.phone && <span className="text-gray-400">•</span>}
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
          {resumeData.personalInfo.location && (resumeData.personalInfo.email || resumeData.personalInfo.phone) && <span className="text-gray-400">•</span>}
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

      {/* Summary with Textured Box */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8 p-5 relative" style={{
          backgroundColor: `${themeColor}08`,
          border: `2px dashed ${themeColor}40`
        }}>
          <h2 className="text-[15px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Handcrafted Profile
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

      {/* Experience with Artisan Cards */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-6 uppercase tracking-wide" style={{ color: themeColor }}>
            Work Portfolio
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
                <div className="mb-6 last:mb-0 p-5 border-2 rounded-lg" style={{
                  borderColor: `${themeColor}30`,
                  backgroundColor: `${themeColor}05`
                }}>
                  <div className="flex justify-between items-start mb-2">
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
                    <div className="text-[12px] text-gray-600 font-medium whitespace-nowrap ml-4 px-3 py-1 rounded-full" style={{
                      backgroundColor: `${themeColor}20`,
                      border: `1px solid ${themeColor}`
                    }}>
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
                      className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line block mt-3"
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
                <div key={exp.id} className="p-5 border-2 rounded-lg" style={{
                  borderColor: `${themeColor}30`,
                  backgroundColor: `${themeColor}05`
                }}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold" style={{ color: themeColor }}>
                        {exp.position || "Position Title"}
                      </h3>
                      <p className="text-[13px] font-semibold text-gray-700">
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <span className="text-[12px] text-gray-600 font-medium whitespace-nowrap ml-4 px-3 py-1 rounded-full" style={{
                      backgroundColor: `${themeColor}20`,
                      border: `1px solid ${themeColor}`
                    }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line mt-3">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Skills with Artisan Tags */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div>
            <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
              Craftsman Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) =>
                  skill.name ? (
                    <div className="px-3 py-2 text-[12px] font-medium border-2" style={{
                      borderColor: themeColor,
                      color: themeColor,
                      backgroundColor: 'white'
                    }}>
                      {skill.name}
                    </div>
                  ) : null
                }
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) =>
                  skill.name ? (
                    <div key={skill.id} className="px-3 py-2 text-[12px] font-medium border-2" style={{
                      borderColor: themeColor,
                      color: themeColor,
                      backgroundColor: 'white'
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

      {/* Additional Sections */}
      {resumeData.sections && resumeData.sections.length > 0 && resumeData.sections.map((section, index) => (
        <div key={section.id} className="mt-8">
          <h2 className="text-[15px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            {section.title}
          </h2>
          {editable ? (
            <InlineEditableText
              path={`sections[${index}].content`}
              value={section.content}
              className="text-[12.5px] text-gray-700 leading-[1.7] block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CreativeCraftedTemplate;
