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

export const FresherModernTwoColumnTemplate = ({ resumeData, themeColor = "#2563eb", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900 flex" style={{ fontFamily: 'Inter' }}>
      {/* Left Sidebar (35%) */}
      <div className="w-[35%] p-8" style={{ backgroundColor: `${themeColor}08` }}>
        {/* Photo */}
        {photo && (
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4" style={{ borderColor: themeColor }}>
              <ProfilePhoto src={photo} borderClass="" className="rounded-full" />
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
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
            <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <div className="mb-2">
                    <span className="text-[12.5px] text-gray-800 font-medium">{skill.name}</span>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-2">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id}>
                    <span className="text-[12.5px] text-gray-800 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
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
                  <div className="mb-4">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-[13px] font-bold text-gray-900 block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[12px] text-gray-600 block"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[12px] text-gray-700 block"
                      as="p"
                    />
                    <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
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
                  <div key={edu.id}>
                    <h3 className="text-[13px] font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-[12px] text-gray-600">{edu.field}</p>}
                    <p className="text-[12px] text-gray-700">{edu.school}</p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Custom Sections for Certifications */}
        {resumeData.sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              {section.title}
            </h2>
            <p className="text-[12.5px] text-gray-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Right Main Content (65%) */}
      <div className="w-[65%] p-8">
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
              value={resumeData.personalInfo.title || "Recent Graduate"}
              className="text-[16px] text-gray-600 block"
              as="p"
            />
          ) : (
            <p className="text-[16px] text-gray-600">
              {resumeData.personalInfo.title || "Recent Graduate"}
            </p>
          )}
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
            <h2 className="text-[15px] font-bold mb-3" style={{ color: themeColor }}>
              Career Objective
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

        {/* Projects - Prominent for freshers */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            Projects
          </h2>
          {editable ? (
            <InlineEditableList
              path="sections"
              items={resumeData.sections.filter(s => s.title === "Projects")}
              defaultItem={{
                id: Date.now().toString(),
                title: "Projects",
                content: "Project details here",
              }}
              addButtonLabel="Add Project"
              renderItem={(section, index) => (
                <div className="mb-5 p-4 rounded-lg border-l-4" style={{ borderColor: themeColor, backgroundColor: `${themeColor}05` }}>
                  <InlineEditableText
                    path={`sections[${index}].content`}
                    value={section.content}
                    className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line block"
                    multiline
                    as="p"
                  />
                </div>
              )}
            />
          ) : (
            <div className="space-y-5">
              {resumeData.sections
                .filter(s => s.title === "Projects")
                .map((section) => (
                  <div key={section.id} className="p-4 rounded-lg border-l-4" style={{ borderColor: themeColor, backgroundColor: `${themeColor}05` }}>
                    <p className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Experience/Internships */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              Internships & Experience
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience}
                defaultItem={{
                  id: Date.now().toString(),
                  company: "Company Name",
                  position: "Intern",
                  startDate: "2023-06",
                  endDate: "2023-08",
                  description: "Internship description",
                  current: false,
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => (
                  <div className="mb-5 p-4 rounded-lg" style={{ backgroundColor: `${themeColor}05` }}>
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
                  <div key={exp.id} className="p-4 rounded-lg" style={{ backgroundColor: `${themeColor}05` }}>
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
      </div>
    </div>
  );
};
