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

export const FresherMinimalistTwoColumnTemplate = ({ resumeData, themeColor = "#475569", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900 flex" style={{ fontFamily: 'Inter' }}>
      {/* Left Column (33%) */}
      <div className="w-[33%] p-8 bg-gray-50">
        {/* Photo */}
        {photo && (
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden border-2" style={{ borderColor: themeColor }}>
              <ProfilePhoto src={photo} borderClass="" className="rounded-lg" />
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-[14px] font-bold mb-3" style={{ color: themeColor }}>
            Contact
          </h2>
          <div className="space-y-2 text-[12.5px] text-gray-700">
            {resumeData.personalInfo.email && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="block break-words"
                />
              ) : (
                <p className="break-words">{resumeData.personalInfo.email}</p>
              )
            )}
            {resumeData.personalInfo.phone && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="block"
                />
              ) : (
                <p>{resumeData.personalInfo.phone}</p>
              )
            )}
            {resumeData.personalInfo.location && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="block"
                />
              ) : (
                <p>{resumeData.personalInfo.location}</p>
              )
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[14px] font-bold mb-3" style={{ color: themeColor }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <div className="mb-2">
                    <span className="text-[12.5px] text-gray-700">{skill.name}</span>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-2">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id}>
                    <span className="text-[12.5px] text-gray-700">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[14px] font-bold mb-3" style={{ color: themeColor }}>
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education}
                defaultItem={{
                  id: Date.now().toString(),
                  school: "School",
                  degree: "Degree",
                  field: "Field",
                  startDate: "2019-09",
                  endDate: "2023-05",
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div className="mb-4">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-[12.5px] font-bold text-gray-900 block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[11.5px] text-gray-600 block"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[11.5px] text-gray-700 block"
                      as="p"
                    />
                    <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                      <InlineEditableDate
                        path={`education[${index}].startDate`}
                        value={edu.startDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                      <span>-</span>
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
                  <div key={edu.id}>
                    <h3 className="text-[12.5px] font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-[11.5px] text-gray-600">{edu.field}</p>}
                    <p className="text-[11.5px] text-gray-700">{edu.school}</p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Column (67%) */}
      <div className="w-[67%] p-8">
        {/* Header */}
        <div className="mb-8">
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
              value={resumeData.personalInfo.title || "Fresh Graduate"}
              className="text-[15px] text-gray-600 block"
              as="p"
            />
          ) : (
            <p className="text-[15px] text-gray-600">
              {resumeData.personalInfo.title || "Fresh Graduate"}
            </p>
          )}
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-3 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
              Profile
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

        {/* Projects */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-3 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
            Projects
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

        {/* Internships */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-3 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
              Internships
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
                addButtonLabel="Add Internship"
                renderItem={(exp, index) => (
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-1">
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
                        <span>-</span>
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
                      className="text-[13px] text-gray-600 mb-2 block"
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
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[14px] font-bold text-gray-900">{exp.position || "Position"}</h3>
                      <span className="text-[12px] text-gray-600 whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-600 mb-2">{exp.company || "Company"}</p>
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
          <h2 className="text-[15px] font-bold mb-3 pb-2 border-b" style={{ color: themeColor, borderColor: themeColor }}>
            Certifications
          </h2>
          <div className="space-y-1 text-[13px] text-gray-700">
            <p>Certification Name - Issuer</p>
          </div>
        </div>
      </div>
    </div>
  );
};
