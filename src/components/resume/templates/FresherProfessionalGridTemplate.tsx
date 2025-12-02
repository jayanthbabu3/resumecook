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

export const FresherProfessionalGridTemplate = ({ resumeData, themeColor = "#0d9488", editable = false }: TemplateProps) => {
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
      <div className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: themeColor }}>
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
            value={resumeData.personalInfo.title || "Entry-Level Professional"}
            className="text-[15px] text-gray-600 block"
            as="p"
          />
        ) : (
          <p className="text-[15px] text-gray-600">
            {resumeData.personalInfo.title || "Entry-Level Professional"}
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
          <h2 className="text-[15px] font-bold mb-3" style={{ color: themeColor }}>
            Professional Summary
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

      {/* Skills Grid */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4" style={{ color: themeColor }}>
            Technical Skills
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill) => (
                <div className="p-4 border-2 rounded-lg text-center" style={{ borderColor: `${themeColor}40` }}>
                  <span className="text-[13px] font-medium" style={{ color: themeColor }}>{skill.name}</span>
                </div>
              )}
              className="grid grid-cols-4 gap-3"
            />
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="p-4 border-2 rounded-lg text-center" style={{ borderColor: `${themeColor}40` }}>
                  <span className="text-[13px] font-medium" style={{ color: themeColor }}>{skill.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education and Projects Grid */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Education */}
        {resumeData.education.length > 0 && (
          <div>
            <h2 className="text-[15px] font-bold mb-4" style={{ color: themeColor }}>
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education}
                defaultItem={{
                  id: Date.now().toString(),
                  school: "University",
                  degree: "Degree",
                  field: "Field",
                  startDate: "2019-09",
                  endDate: "2023-05",
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div className="mb-4 p-4 border-2 rounded-lg" style={{ borderColor: `${themeColor}40`, backgroundColor: `${themeColor}05` }}>
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
                        className="text-[12.5px] text-gray-600 block"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[12.5px] text-gray-700 block"
                      as="p"
                    />
                    <div className="text-[11.5px] text-gray-500 mt-1 flex items-center gap-1">
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
              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="p-4 border-2 rounded-lg" style={{ borderColor: `${themeColor}40`, backgroundColor: `${themeColor}05` }}>
                    <h3 className="text-[14px] font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-[12.5px] text-gray-600">{edu.field}</p>}
                    <p className="text-[12.5px] text-gray-700">{edu.school}</p>
                    <p className="text-[11.5px] text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        <div>
          <h2 className="text-[15px] font-bold mb-4" style={{ color: themeColor }}>
            Projects
          </h2>
          <div className="space-y-4">
            {resumeData.sections.map((section) => (
              <div key={section.id} className="p-4 border-2 rounded-lg" style={{ borderColor: `${themeColor}40`, backgroundColor: `${themeColor}05` }}>
                <h3 className="text-[13px] font-bold mb-1" style={{ color: themeColor }}>{section.title}</h3>
                <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4" style={{ color: themeColor }}>
            Professional Experience
          </h2>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={resumeData.experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Company",
                position: "Position",
                startDate: "2023-06",
                endDate: "2023-08",
                description: "Description",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-4 p-5 border-2 rounded-lg" style={{ borderColor: `${themeColor}40` }}>
                  <div className="flex justify-between items-start mb-2">
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position || "Position"}
                      className="text-[14px] font-bold text-gray-900 block"
                      as="h3"
                    />
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
                  <InlineEditableText
                    path={`experience[${index}].company`}
                    value={exp.company || "Company"}
                    className="text-[13px] font-semibold mb-2 block"
                    style={{ color: themeColor }}
                    as="p"
                  />
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
                <div key={exp.id} className="p-5 border-2 rounded-lg" style={{ borderColor: `${themeColor}40` }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[14px] font-bold text-gray-900">{exp.position || "Position"}</h3>
                    <span className="text-[12px] text-gray-600 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold mb-2" style={{ color: themeColor }}>{exp.company || "Company"}</p>
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
        <h2 className="text-[15px] font-bold mb-4" style={{ color: themeColor }}>
          Certifications
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 border-2 rounded-lg text-center" style={{ borderColor: `${themeColor}40` }}>
            <span className="text-[12.5px] text-gray-700">Certification Name - Issuer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
