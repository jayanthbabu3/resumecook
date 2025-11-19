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

export const ExecutiveModernTemplate = ({ resumeData, themeColor = "#1e3a8a", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900 text-[13px] leading-relaxed">
      {/* Header with bold navy background */}
      <div className="px-8 py-10" style={{ backgroundColor: themeColor }}>
        <div className="flex items-center gap-6">
          {photo && (
            <div className="flex-shrink-0">
              <ProfilePhoto src={photo} alt="Profile" size={80} />
            </div>
          )}
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName || "Your Name"}
                className="text-[40px] font-bold text-white mb-2 block"
                as="h1"
              />
            ) : (
              <h1 className="text-[40px] font-bold text-white mb-2">
                {resumeData.personalInfo.fullName || "Your Name"}
              </h1>
            )}
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title || "Professional Title"}
                className="text-[15px] text-white/90 block"
                as="p"
              />
            ) : (
              <p className="text-[15px] text-white/90">
                {resumeData.personalInfo.title || "Professional Title"}
              </p>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 mt-6 text-[12.5px] text-white/80">
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

      {/* Two-column layout */}
      <div className="flex gap-6 p-8">
        {/* Left Sidebar - Skills */}
        <div className="w-1/3 space-y-8">
          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                Skills
              </h2>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill) => {
                    return skill.name ? (
                      <div className="mb-2 px-3 py-2 bg-gray-100 rounded text-[12.5px] font-medium text-gray-800">
                        {skill.name}
                      </div>
                    ) : null;
                  }}
                />
              ) : (
                <div className="space-y-2">
                  {resumeData.skills.map((skill) => (
                    skill.name ? (
                      <div key={skill.id} className="px-3 py-2 bg-gray-100 rounded text-[12.5px] font-medium text-gray-800">
                        {skill.name}
                      </div>
                    ) : null
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div>
              <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
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
                        className="text-[13px] font-semibold text-gray-900 block"
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
                        className="text-[12.5px] text-gray-700 block"
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
                      <h3 className="text-[13px] font-semibold text-gray-900">{edu.degree}</h3>
                      {edu.field && <p className="text-[12px] text-gray-600">{edu.field}</p>}
                      <p className="text-[12.5px] text-gray-700">{edu.school}</p>
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

        {/* Right Main Content */}
        <div className="flex-1 space-y-8">
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <div>
              <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                Executive Summary
              </h2>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="text-[13px] text-gray-700 leading-[1.7] block"
                  multiline
                  as="p"
                />
              ) : (
                <p className="text-[13px] text-gray-700 leading-[1.7]">
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div>
              <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                Professional Experience
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
                    <div className="relative pl-6 border-l-4 pb-6" style={{ borderColor: themeColor }}>
                      <div className="absolute left-[-8px] top-[6px] w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }}></div>
                      <div className="flex justify-between items-start mb-2 gap-4">
                        <div className="flex-1">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position || "Position Title"}
                            className="text-[15px] font-bold text-gray-900 block"
                            as="h3"
                          />
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company || "Company Name"}
                            className="text-[13px] font-semibold block"
                            style={{ color: themeColor }}
                            as="p"
                          />
                        </div>
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
                      {exp.description && (
                        <InlineEditableText
                          path={`experience[${index}].description`}
                          value={exp.description}
                          className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line block mt-2"
                          multiline
                          as="p"
                        />
                      )}
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-0">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-4 pb-6" style={{ borderColor: themeColor }}>
                      <div className="absolute left-[-8px] top-[6px] w-3 h-3 rounded-full" style={{ backgroundColor: themeColor }}></div>
                      <div className="flex justify-between items-start mb-2 gap-4">
                        <div className="flex-1">
                          <h3 className="text-[15px] font-bold text-gray-900">{exp.position || "Position Title"}</h3>
                          <p className="text-[13px] font-semibold" style={{ color: themeColor }}>{exp.company || "Company Name"}</p>
                        </div>
                        <span className="text-[12px] text-gray-600 whitespace-nowrap">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line mt-2">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Custom Sections */}
          {resumeData.sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
                {section.title}
              </h2>
              <p className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
