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

export const FresherTechSplitTemplate = ({ resumeData, themeColor = "#0891b2", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900 flex" style={{ fontFamily: 'Inter' }}>
      {/* Left Column (40%) */}
      <div className="w-[40%] p-8 border-r-4" style={{ borderColor: themeColor }}>
        {/* Header */}
        <div className="mb-6">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName || "Your Name"}
              className="text-[36px] font-bold mb-2 block"
              style={{ color: themeColor }}
              as="h1"
            />
          ) : (
            <h1 className="text-[36px] font-bold mb-2" style={{ color: themeColor }}>
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
          )}
          {editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title || "Tech Enthusiast"}
              className="text-[15px] text-gray-600 font-medium block"
              as="p"
            />
          ) : (
            <p className="text-[15px] text-gray-600 font-medium">
              {resumeData.personalInfo.title || "Tech Enthusiast"}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-6 pb-6 border-b-2 border-gray-200">
          <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Contact Info
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

        {/* Skills Matrix */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6 pb-6 border-b-2 border-gray-200">
            <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              Technical Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <div className="mb-3 p-2 rounded-md" style={{ backgroundColor: `${themeColor}10` }}>
                    <span className="text-[12.5px] text-gray-800 font-medium">{skill.name}</span>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-3">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="p-2 rounded-md" style={{ backgroundColor: `${themeColor}10` }}>
                    <span className="text-[12.5px] text-gray-800 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tools & Technologies */}
        <div className="mb-6">
          <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Tools & Tech
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-md text-[11.5px] font-medium text-white" style={{ backgroundColor: themeColor }}>
              Git
            </span>
            <span className="px-3 py-1.5 rounded-md text-[11.5px] font-medium text-white" style={{ backgroundColor: themeColor }}>
              VS Code
            </span>
            <span className="px-3 py-1.5 rounded-md text-[11.5px] font-medium text-white" style={{ backgroundColor: themeColor }}>
              Docker
            </span>
          </div>
        </div>
      </div>

      {/* Right Column (60%) */}
      <div className="w-[60%] p-8">
        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education}
                defaultItem={{
                  id: Date.now().toString(),
                  school: "University Name",
                  degree: "B.Tech/B.E.",
                  field: "Computer Science",
                  startDate: "2019-09",
                  endDate: "2023-05",
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
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
                      className="text-[12.5px] text-gray-700 block mt-1"
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
                  <div key={edu.id} className="p-4 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
                    <h3 className="text-[14px] font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-[13px] font-semibold" style={{ color: themeColor }}>{edu.field}</p>}
                    <p className="text-[12.5px] text-gray-700 mt-1">{edu.school}</p>
                    <p className="text-[12px] text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            Technical Projects
          </h2>
          <div className="space-y-5">
            {resumeData.sections.map((section) => (
              <div key={section.id} className="p-4 border-l-4" style={{ borderColor: themeColor }}>
                <h3 className="text-[14px] font-bold mb-2" style={{ color: themeColor }}>{section.title}</h3>
                <p className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line">
                  {section.content}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded text-[11px] font-medium text-white" style={{ backgroundColor: themeColor }}>
                    React
                  </span>
                  <span className="px-2 py-1 rounded text-[11px] font-medium text-white" style={{ backgroundColor: themeColor }}>
                    Node.js
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Internships */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              Internships
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience}
                defaultItem={{
                  id: Date.now().toString(),
                  company: "Company Name",
                  position: "Tech Intern",
                  startDate: "2023-06",
                  endDate: "2023-08",
                  description: "Internship details",
                  current: false,
                }}
                addButtonLabel="Add Internship"
                renderItem={(exp, index) => (
                  <div className="mb-4">
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
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-[14px] font-bold text-gray-900">{exp.position || "Position"}</h3>
                        <p className="text-[13px] font-semibold" style={{ color: themeColor }}>{exp.company || "Company"}</p>
                      </div>
                      <span className="text-[12px] text-gray-600 whitespace-nowrap">
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
          <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            Certifications
          </h2>
          <div className="space-y-2 text-[13px] text-gray-700">
            <p>• AWS Certified Cloud Practitioner</p>
            <p>• Google IT Support Professional Certificate</p>
          </div>
        </div>
      </div>
    </div>
  );
};
