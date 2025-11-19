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

export const FresherBoldHeaderTemplate = ({ resumeData, themeColor = "#dc2626", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900" style={{ fontFamily: 'Inter' }}>
      {/* Bold Colored Header */}
      <div className="p-10 text-white" style={{ backgroundColor: themeColor }}>
        <div className="text-center">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName || "Your Name"}
              className="text-[40px] font-bold mb-3 text-white block"
              as="h1"
            />
          ) : (
            <h1 className="text-[40px] font-bold mb-3 text-white">
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
          )}
          {editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title || "Entry-Level Professional"}
              className="text-[16px] text-white/90 uppercase tracking-wider block"
              as="p"
            />
          ) : (
            <p className="text-[16px] text-white/90 uppercase tracking-wider">
              {resumeData.personalInfo.title || "Entry-Level Professional"}
            </p>
          )}

          {/* Contact in Header */}
          <div className="flex justify-center gap-8 mt-6 text-[13px] text-white/90">
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
      </div>

      <div className="p-8">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-5 border-l-4" style={{ borderColor: themeColor, backgroundColor: `${themeColor}05` }}>
            <h2 className="text-[15px] font-bold mb-3" style={{ color: themeColor }}>
              OBJECTIVE
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

        {/* Education - Prominent */}
        {resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-4 pb-3 border-b-3 uppercase tracking-wide" style={{ color: themeColor, borderBottomWidth: '3px', borderColor: themeColor }}>
              Education
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
                  <div className="mb-5 p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="text-[15px] font-bold text-gray-900 block"
                          as="h3"
                        />
                        {edu.field && (
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field}
                            className="text-[14px] font-semibold block mt-1"
                            style={{ color: themeColor }}
                            as="p"
                          />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          className="text-[13px] text-gray-700 block mt-1"
                          as="p"
                        />
                      </div>
                      <div className="text-[12.5px] text-gray-600 whitespace-nowrap flex items-center gap-1">
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
              <div className="space-y-5">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-[15px] font-bold text-gray-900">{edu.degree}</h3>
                        {edu.field && <p className="text-[14px] font-semibold mt-1" style={{ color: themeColor }}>{edu.field}</p>}
                        <p className="text-[13px] text-gray-700 mt-1">{edu.school}</p>
                      </div>
                      <span className="text-[12.5px] text-gray-600 whitespace-nowrap">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-4 pb-3 border-b-3 uppercase tracking-wide" style={{ color: themeColor, borderBottomWidth: '3px', borderColor: themeColor }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <span className="inline-block px-4 py-2 mr-3 mb-3 rounded-md text-[13px] font-medium border-2" style={{ borderColor: themeColor, color: themeColor }}>
                    {skill.name}
                  </span>
                )}
              />
            ) : (
              <div className="flex flex-wrap">
                {resumeData.skills.map((skill) => (
                  <span key={skill.id} className="px-4 py-2 mr-3 mb-3 rounded-md text-[13px] font-medium border-2" style={{ borderColor: themeColor, color: themeColor }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 pb-3 border-b-3 uppercase tracking-wide" style={{ color: themeColor, borderBottomWidth: '3px', borderColor: themeColor }}>
            Projects
          </h2>
          <div className="space-y-5">
            {resumeData.sections.map((section) => (
              <div key={section.id} className="p-5 border-l-4" style={{ borderColor: themeColor }}>
                <h3 className="text-[14px] font-bold mb-2" style={{ color: themeColor }}>{section.title}</h3>
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
            <h2 className="text-[15px] font-bold mb-4 pb-3 border-b-3 uppercase tracking-wide" style={{ color: themeColor, borderBottomWidth: '3px', borderColor: themeColor }}>
              Experience
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
                  <div className="mb-5">
                    <div className="flex justify-between items-start mb-2">
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
                          className="text-[13px] font-semibold block"
                          style={{ color: themeColor }}
                          as="p"
                        />
                      </div>
                      <div className="text-[12.5px] text-gray-600 whitespace-nowrap flex items-center gap-1">
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
              <div className="space-y-5">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-[14px] font-bold text-gray-900">{exp.position || "Position"}</h3>
                        <p className="text-[13px] font-semibold" style={{ color: themeColor }}>{exp.company || "Company"}</p>
                      </div>
                      <span className="text-[12.5px] text-gray-600 whitespace-nowrap">
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
          <h2 className="text-[15px] font-bold mb-4 pb-3 border-b-3 uppercase tracking-wide" style={{ color: themeColor, borderBottomWidth: '3px', borderColor: themeColor }}>
            Certifications
          </h2>
          <div className="space-y-2 text-[13px] text-gray-700">
            <p>• Professional Certification Name - Issuer (Year)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
