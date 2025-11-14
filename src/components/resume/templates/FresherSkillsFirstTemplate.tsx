import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Calendar, Code } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface FresherSkillsFirstTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherSkillsFirstTemplate = ({
  resumeData,
  themeColor = "#F59E0B",
  editable = false,
}: FresherSkillsFirstTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white overflow-auto">
      <div className="max-w-[850px] mx-auto">
        {/* Compact Header */}
        <div className="px-12 pt-10 pb-6 border-b-2" style={{ borderBottomColor: themeColor }}>
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <ProfilePhoto
                src={photo}
                borderClass="border-3"
                className="text-gray-300"
                style={{ borderColor: themeColor }}
              />
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.fullName"
                    value={resumeData.personalInfo.fullName}
                    className="text-3xl font-bold text-gray-900 tracking-tight block"
                    as="h1"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {resumeData.personalInfo.fullName}
                  </h1>
                )}

                {resumeData.personalInfo.title && (
                  <div className="mt-2">
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.title"
                        value={resumeData.personalInfo.title}
                        className="text-base font-medium inline-block"
                        style={{ color: themeColor }}
                      />
                    ) : (
                      <p className="text-base font-medium" style={{ color: themeColor }}>
                        {resumeData.personalInfo.title}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {resumeData.personalInfo.email && (
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" style={{ color: themeColor }} />
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
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" style={{ color: themeColor }} />
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
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" style={{ color: themeColor }} />
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
        </div>

        {/* Skills Section - Prominent at Top */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="px-12 py-8 bg-gray-50">
            <div className="flex items-center gap-3 mb-6">
              <Code className="h-6 w-6" style={{ color: themeColor }} />
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                Technical Skills
              </h2>
            </div>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <div className="inline-block m-2">
                    <div
                      className="px-6 py-4 rounded-lg text-base font-semibold text-white shadow-md hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: themeColor }}
                    >
                      {skill.name}
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="flex flex-wrap">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="inline-block m-2">
                    <div
                      className="px-6 py-4 rounded-lg text-base font-semibold text-white shadow-md hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: themeColor }}
                    >
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <div className="px-12 py-8">
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>
                Professional Summary
              </h2>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="text-sm leading-relaxed text-gray-700 block"
                  multiline
                  as="p"
                />
              ) : (
                <p className="text-sm leading-relaxed text-gray-700">
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </section>
          )}

          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - Experience */}
            <div className="space-y-8">
              {/* Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>
                    Experience & Internships
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
                        <div className="mb-6">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            className="font-semibold text-base text-gray-900 block"
                            as="h3"
                          />
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            className="text-sm font-medium mt-1 block"
                            style={{ color: themeColor }}
                            as="p"
                          />
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3" />
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
                          {exp.description && (
                            <InlineEditableText
                              path={`experience[${index}].description`}
                              value={exp.description}
                              className="text-sm leading-relaxed text-gray-600 mt-2 whitespace-pre-line block"
                              multiline
                              as="div"
                            />
                          )}
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index}>
                          <h3 className="font-semibold text-base text-gray-900">
                            {exp.position}
                          </h3>
                          <p className="text-sm font-medium mt-1" style={{ color: themeColor }}>
                            {exp.company}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                          </div>
                          {exp.description && (
                            <div className="text-sm leading-relaxed text-gray-600 mt-2 whitespace-pre-line">
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

            {/* Right Column - Education & Sections */}
            <div className="space-y-8">
              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>
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
                            className="font-semibold text-sm text-gray-900 leading-tight block"
                            as="h3"
                          />
                          {edu.field && (
                            <InlineEditableText
                              path={`education[${index}].field`}
                              value={edu.field}
                              className="text-xs text-gray-600 mt-1 block"
                              as="p"
                            />
                          )}
                          <InlineEditableText
                            path={`education[${index}].school`}
                            value={edu.school}
                            className="text-xs font-medium mt-1 block"
                            style={{ color: themeColor }}
                            as="p"
                          />
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                            <Calendar className="h-3 w-3" />
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
                      {resumeData.education.map((edu, index) => (
                        <div key={index}>
                          <h3 className="font-semibold text-sm text-gray-900 leading-tight">
                            {edu.degree}
                          </h3>
                          {edu.field && (
                            <p className="text-xs text-gray-600 mt-1">{edu.field}</p>
                          )}
                          <p className="text-xs font-medium mt-1" style={{ color: themeColor }}>
                            {edu.school}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                            <Calendar className="h-3 w-3" />
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Custom Sections */}
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
                      <section className="mb-8">
                        <InlineEditableText
                          path={`sections[${index}].title`}
                          value={section.title}
                          className="text-sm font-bold uppercase tracking-wider mb-3 inline-block"
                          style={{ color: themeColor }}
                          as="h2"
                        />
                        <InlineEditableText
                          path={`sections[${index}].content`}
                          value={section.content}
                          className="text-sm leading-relaxed text-gray-700 whitespace-pre-line block"
                          multiline
                          as="div"
                        />
                      </section>
                    )}
                  />
                ) : (
                  <>
                    {resumeData.sections.map((section, index) => (
                      <section key={index} className="mb-8">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>
                          {section.title}
                        </h2>
                        <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                          {section.content}
                        </div>
                      </section>
                    ))}
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
