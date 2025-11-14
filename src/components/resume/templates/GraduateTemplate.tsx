import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface GraduateTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const GraduateTemplate = ({ resumeData, themeColor = "#0EA5E9", editable = false }: GraduateTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white p-12 overflow-auto">
      <div className="max-w-[850px] mx-auto space-y-6">
        {/* Header Section */}
        <div className="pb-5 border-b-2" style={{ borderColor: themeColor }}>
          <div className="flex justify-center mb-4">
            <ProfilePhoto src={photo} borderClass="border-2 border-gray-200" />
          </div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-3xl font-bold tracking-tight text-gray-900 mb-2 block"
              as="h1"
            />
          ) : (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
              {resumeData.personalInfo.fullName}
            </h1>
          )}
          {resumeData.personalInfo.title && (
            editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-base text-gray-600 mb-3 block"
                as="p"
              />
            ) : (
              <p className="text-base text-gray-600 mb-3">{resumeData.personalInfo.title}</p>
            )
          )}
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            {resumeData.personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-3 w-3" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="inline-block"
                  />
                ) : (
                  resumeData.personalInfo.email
                )}
              </span>
            )}
            {resumeData.personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="inline-block"
                  />
                ) : (
                  resumeData.personalInfo.phone
                )}
              </span>
            )}
            {resumeData.personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="inline-block"
                  />
                ) : (
                  resumeData.personalInfo.location
                )}
              </span>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Education & Skills */}
          <div className="col-span-1 space-y-5">
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
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
                      <div className="space-y-1">
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="font-semibold text-xs leading-tight text-gray-900 block"
                          as="div"
                        />
                        {edu.field && (
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field}
                            className="text-xs text-gray-600 block"
                            as="div"
                          />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          className="text-xs text-gray-700 font-medium block"
                          as="div"
                        />
                        <div className="text-xs text-gray-500">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </div>
                      </div>
                    )}
                  />
                ) : (
                  <div className="space-y-3">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="space-y-1">
                        <div className="font-semibold text-xs leading-tight text-gray-900">{edu.degree}</div>
                        {edu.field && <div className="text-xs text-gray-600">{edu.field}</div>}
                        <div className="text-xs text-gray-700 font-medium">{edu.school}</div>
                        <div className="text-xs text-gray-500">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  Skills
                </h2>
                {editable ? (
                  <InlineEditableSkills
                    path="skills"
                    skills={resumeData.skills}
                    renderSkill={(skill, index) => (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                        {skill.name}
                      </span>
                    )}
                  />
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>

          {/* Right Column - Summary, Projects & Experience */}
          <div className="col-span-2 space-y-5">
            {/* Professional Summary */}
            {resumeData.personalInfo.summary && (
              <section className="space-y-2">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  Profile
                </h2>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.summary"
                    value={resumeData.personalInfo.summary}
                    className="text-xs leading-relaxed text-gray-700 block"
                    multiline
                    as="p"
                  />
                ) : (
                  <p className="text-xs leading-relaxed text-gray-700">{resumeData.personalInfo.summary}</p>
                )}
              </section>
            )}

            {/* Projects Section - More Prominent for Freshers */}
            {resumeData.sections && resumeData.sections.length > 0 && (
              editable ? (
                <InlineEditableList
                  path="sections"
                  items={resumeData.sections}
                  defaultItem={{
                    id: Date.now().toString(),
                    title: "New Section",
                    content: "Section content here",
                  }}
                  addButtonLabel="Add Section"
                  renderItem={(section, index) => (
                    <section className="space-y-2">
                      <InlineEditableText
                        path={`sections[${index}].title`}
                        value={section.title}
                        className="text-sm font-bold uppercase tracking-wide text-gray-900 block"
                        as="h2"
                      />
                      <InlineEditableText
                        path={`sections[${index}].content`}
                        value={section.content}
                        className="text-xs leading-relaxed text-gray-700 whitespace-pre-line block"
                        multiline
                        as="div"
                      />
                    </section>
                  )}
                />
              ) : (
                <>
                  {resumeData.sections.map((section, index) => (
                    <section key={index} className="space-y-2">
                      <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                        {section.title}
                      </h2>
                      <div className="text-xs leading-relaxed text-gray-700 whitespace-pre-line">
                        {section.content}
                      </div>
                    </section>
                  ))}
                </>
              )
            )}

            {/* Experience/Internships */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                  Internships & Experience
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
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <InlineEditableText
                              path={`experience[${index}].position`}
                              value={exp.position}
                              className="font-semibold text-sm text-gray-900 block"
                              as="h3"
                            />
                            <InlineEditableText
                              path={`experience[${index}].company`}
                              value={exp.company}
                              className="text-xs font-medium block"
                              style={{ color: themeColor }}
                              as="div"
                            />
                          </div>
                          <div className="text-xs text-gray-500 whitespace-nowrap">
                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                          </div>
                        </div>
                        {exp.description && (
                          <InlineEditableText
                            path={`experience[${index}].description`}
                            value={exp.description}
                            className="text-xs leading-relaxed text-gray-600 whitespace-pre-line block"
                            multiline
                            as="div"
                          />
                        )}
                      </div>
                    )}
                  />
                ) : (
                  <div className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm text-gray-900">{exp.position}</h3>
                            <div className="text-xs font-medium" style={{ color: themeColor }}>{exp.company}</div>
                          </div>
                          <div className="text-xs text-gray-500 whitespace-nowrap">
                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                          </div>
                        </div>
                        {exp.description && (
                          <div className="text-xs leading-relaxed text-gray-600 whitespace-pre-line">
                            {exp.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
