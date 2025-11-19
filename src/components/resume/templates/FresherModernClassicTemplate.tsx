import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherModernClassicTemplate = ({ resumeData, themeColor = "#1e40af", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900 p-8" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <div className="text-center mb-8">
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName || "Your Name"}
            className="text-[38px] font-bold mb-2 block"
            style={{ color: themeColor }}
            as="h1"
          />
        ) : (
          <h1 className="text-[38px] font-bold mb-2" style={{ color: themeColor }}>
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={resumeData.personalInfo.title || "Recent Graduate"}
            className="text-[15px] text-gray-600 block"
            as="p"
          />
        ) : (
          <p className="text-[15px] text-gray-600">
            {resumeData.personalInfo.title || "Recent Graduate"}
          </p>
        )}

        <div className="flex justify-center gap-6 mt-4 text-[12.5px] text-gray-600">
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

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-3 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            CAREER OBJECTIVE
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[13px] text-gray-700 leading-[1.8] block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[13px] text-gray-700 leading-[1.8]">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Skills - Prominent */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-3 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            SKILLS
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill) => (
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: themeColor }}></span>
                  <span className="text-[13px] text-gray-800">{skill.name}</span>
                </div>
              )}
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: themeColor }}></span>
                  <span className="text-[13px] text-gray-800">{skill.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-3 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            EDUCATION
          </h2>
          {editable ? (
            <InlineEditableList
              path="education"
              items={resumeData.education}
              defaultItem={{
                id: Date.now().toString(),
                school: "University Name",
                degree: "Degree",
                field: "Field of Study",
                startDate: "2019-09",
                endDate: "2023-05",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-[14px] font-bold text-gray-900 block"
                        as="h3"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="text-[13px] text-gray-600 block"
                          as="p"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[13px] text-gray-700 block"
                        as="p"
                      />
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
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[14px] font-bold text-gray-900">{edu.degree}</h3>
                      {edu.field && <p className="text-[13px] text-gray-600">{edu.field}</p>}
                      <p className="text-[13px] text-gray-700">{edu.school}</p>
                    </div>
                    <span className="text-[12px] text-gray-500 whitespace-nowrap">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      <div className="mb-8">
        <h2 className="text-[15px] font-bold mb-3 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
          PROJECTS
        </h2>
        <div className="space-y-4">
          {resumeData.sections.map((section) => (
            <div key={section.id}>
              <h3 className="text-[14px] font-bold mb-1" style={{ color: themeColor }}>{section.title}</h3>
              <p className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-3 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            EXPERIENCE
          </h2>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={resumeData.experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Company Name",
                position: "Position",
                startDate: "2023-06",
                endDate: "2023-08",
                description: "Description",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position || "Position"}
                        className="text-[14px] font-bold text-gray-900 block"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company || "Company"}
                        className="text-[13px] text-gray-700 block"
                        as="p"
                      />
                    </div>
                    <div className="text-[12px] text-gray-500 whitespace-nowrap flex items-center gap-1">
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
                      className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line block"
                      multiline
                      as="p"
                    />
                  )}
                </div>
              )}
            />
          ) : (
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-[14px] font-bold text-gray-900">{exp.position || "Position"}</h3>
                      <p className="text-[13px] text-gray-700">{exp.company || "Company"}</p>
                    </div>
                    <span className="text-[12px] text-gray-500 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Certifications */}
      <div className="mb-8">
        <h2 className="text-[15px] font-bold mb-3 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
          CERTIFICATIONS
        </h2>
        <ul className="space-y-1 text-[13px] text-gray-700">
          <li>• Certification Name - Issuing Organization (Year)</li>
        </ul>
      </div>
    </div>
  );
};
