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

export const FresherElegantSidebarTemplate = ({ resumeData, themeColor = "#9333ea", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900 flex" style={{ fontFamily: 'Inter' }}>
      {/* Left Sidebar (32%) - Elegant Gradient */}
      <div className="w-[32%] text-white p-8" style={{ background: `linear-gradient(180deg, ${themeColor} 0%, ${themeColor}dd 100%)` }}>
        {/* Photo */}
        {photo && (
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
              <ProfilePhoto src={photo} borderClass="" className="rounded-full" />
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-4 text-white uppercase tracking-wide pb-2 border-b border-white/30">
            Contact
          </h2>
          <div className="space-y-3 text-[12.5px] text-white/90">
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
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-4 text-white uppercase tracking-wide pb-2 border-b border-white/30">
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <div className="mb-3 p-2 rounded bg-white/10">
                    <span className="text-[12.5px] text-white/90 font-medium">{skill.name}</span>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-3">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="p-2 rounded bg-white/10">
                    <span className="text-[12.5px] text-white/90 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-4 text-white uppercase tracking-wide pb-2 border-b border-white/30">
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
                  <div className="mb-4">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-[13px] font-bold text-white block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[12px] text-white/80 block"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[12px] text-white/80 block"
                      as="p"
                    />
                    <div className="text-[11px] text-white/70 mt-1 flex items-center gap-1">
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
                    <h3 className="text-[13px] font-bold text-white">{edu.degree}</h3>
                    {edu.field && <p className="text-[12px] text-white/80">{edu.field}</p>}
                    <p className="text-[12px] text-white/80">{edu.school}</p>
                    <p className="text-[11px] text-white/70 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Certifications */}
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-4 text-white uppercase tracking-wide pb-2 border-b border-white/30">
            Certifications
          </h2>
          <div className="space-y-2 text-[12px] text-white/80">
            <p>Certification - Issuer</p>
          </div>
        </div>
      </div>

      {/* Right Main Content (68%) */}
      <div className="w-[68%] p-8">
        {/* Header */}
        <div className="mb-8">
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
              value={resumeData.personalInfo.title || "Aspiring Professional"}
              className="text-[16px] text-gray-600 font-medium block"
              as="p"
            />
          ) : (
            <p className="text-[16px] text-gray-600 font-medium">
              {resumeData.personalInfo.title || "Aspiring Professional"}
            </p>
          )}
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-3 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              Professional Profile
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
          <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            Academic Projects
          </h2>
          <div className="space-y-5">
            {resumeData.sections.map((section) => (
              <div key={section.id} className="p-5 rounded-lg border-l-4" style={{ borderColor: themeColor, backgroundColor: `${themeColor}08` }}>
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
            <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
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
                  <div className="mb-5 p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
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
                  <div key={exp.id} className="p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
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

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            Achievements & Awards
          </h2>
          <div className="space-y-2 text-[13px] text-gray-700">
            <p>• Academic achievement or recognition</p>
            <p>• Competition participation or award</p>
          </div>
        </div>
      </div>
    </div>
  );
};
