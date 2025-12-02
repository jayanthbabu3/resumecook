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

export const FresherCreativeEdgeTemplate = ({ resumeData, themeColor = "#ec4899", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900" style={{ fontFamily: 'Inter' }}>
      {/* Asymmetric Header */}
      <div className="flex">
        <div className="w-[70%] p-8" style={{ backgroundColor: `${themeColor}10` }}>
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName || "Your Name"}
              className="text-[40px] font-bold mb-2 block"
              style={{ color: themeColor }}
              as="h1"
            />
          ) : (
            <h1 className="text-[40px] font-bold mb-2" style={{ color: themeColor }}>
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
          )}
          {editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title || "Creative Professional"}
              className="text-[16px] text-gray-700 font-medium block"
              as="p"
            />
          ) : (
            <p className="text-[16px] text-gray-700 font-medium">
              {resumeData.personalInfo.title || "Creative Professional"}
            </p>
          )}
        </div>
        <div className="w-[30%] p-8 text-white flex items-center justify-center" style={{ backgroundColor: themeColor }}>
          {photo && (
            <div className="w-28 h-28 rounded-lg overflow-hidden border-4 border-white shadow-lg">
              <ProfilePhoto src={photo} borderClass="" className="rounded-lg" />
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Contact */}
        <div className="flex gap-6 mb-8 text-[12.5px] text-gray-600 flex-wrap">
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

        {/* Projects & Portfolio - Front and Center */}
        <div className="mb-8">
          <h2 className="text-[16px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            Featured Projects & Portfolio
          </h2>
          <div className="space-y-6">
            {resumeData.sections.map((section) => (
              <div key={section.id} className="p-6 rounded-xl border-2" style={{ borderColor: `${themeColor}40`, backgroundColor: `${themeColor}05` }}>
                <h3 className="text-[15px] font-bold mb-3" style={{ color: themeColor }}>{section.title}</h3>
                <p className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[16px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              Skills & Expertise
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <span className="inline-block px-5 py-2.5 mr-3 mb-3 rounded-lg text-[13px] font-medium text-white shadow-md" style={{ backgroundColor: themeColor }}>
                    {skill.name}
                  </span>
                )}
              />
            ) : (
              <div className="flex flex-wrap">
                {resumeData.skills.map((skill) => (
                  <span key={skill.id} className="px-5 py-2.5 mr-3 mb-3 rounded-lg text-[13px] font-medium text-white shadow-md" style={{ backgroundColor: themeColor }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[16px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
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
                  <div className="mb-4 p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
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
                        className="text-[13px] font-semibold block"
                        style={{ color: themeColor }}
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[12.5px] text-gray-700 block"
                      as="p"
                    />
                    <div className="text-[12px] text-gray-500 mt-1 flex items-center gap-1">
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
                  <div key={edu.id} className="p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
                    <h3 className="text-[14px] font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-[13px] font-semibold" style={{ color: themeColor }}>{edu.field}</p>}
                    <p className="text-[12.5px] text-gray-700">{edu.school}</p>
                    <p className="text-[12px] text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[16px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              Experience
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
                  <div className="mb-5">
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
              <div className="space-y-5">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id}>
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

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-6 rounded-xl" style={{ backgroundColor: `${themeColor}10` }}>
            <h2 className="text-[16px] font-bold mb-3" style={{ color: themeColor }}>
              About Me
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
      </div>
    </div>
  );
};
