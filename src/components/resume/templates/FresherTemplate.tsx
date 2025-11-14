import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface FresherTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherTemplate = ({
  resumeData,
  themeColor = "#2563EB",
  editable = false,
}: FresherTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white overflow-auto">
      <div className="max-w-[850px] mx-auto">
        {/* Header Section with Theme Accent */}
        <div className="relative">
          <div className="h-2 w-full" style={{ backgroundColor: themeColor }} />
          <div className="px-12 pt-8 pb-6">
            <div className="text-center mb-6">
              <ProfilePhoto
                src={photo}
                borderClass="border-3 border-current"
                className="text-blue-600"
              />
            </div>

            <div className="text-center space-y-3">
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
                <div className="flex items-center justify-center">
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      className="px-4 py-1 rounded-full text-sm font-medium text-white inline-block"
                      style={{ backgroundColor: themeColor }}
                    />
                  ) : (
                    <span
                      className="px-4 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      {resumeData.personalInfo.title}
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mt-4">
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
        </div>

        <div className="px-12 pb-12">
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h2
                  className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded text-white"
                  style={{ backgroundColor: themeColor }}
                >
                  PROFESSIONAL SUMMARY
                </h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="text-sm leading-relaxed text-gray-700 pl-4 block"
                  multiline
                  as="p"
                />
              ) : (
                <p className="text-sm leading-relaxed text-gray-700 pl-4">
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </section>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-5 gap-8">
            {/* Left Column - Education & Skills */}
            <div className="col-span-2 space-y-8">
              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <h2
                      className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded text-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      EDUCATION
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
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
                        <div className="relative pl-4">
                          <div className="space-y-1">
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
                                className="text-xs text-gray-600 italic block"
                                as="p"
                              />
                            )}
                            <InlineEditableText
                              path={`education[${index}].school`}
                              value={edu.school}
                              className="text-xs font-medium block"
                              style={{ color: themeColor }}
                              as="p"
                            />
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {formatDate(edu.startDate)} -{" "}
                              {formatDate(edu.endDate)}
                            </div>
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-4 pl-4">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="relative">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-sm text-gray-900 leading-tight">
                              {edu.degree}
                            </h3>
                            {edu.field && (
                              <p className="text-xs text-gray-600 italic">
                                {edu.field}
                              </p>
                            )}
                            <p
                              className="text-xs font-medium"
                              style={{ color: themeColor }}
                            >
                              {edu.school}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {formatDate(edu.startDate)} -{" "}
                              {formatDate(edu.endDate)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Core Skills */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <h2
                      className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded text-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      TECHNICAL SKILLS
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  {editable ? (
                    <InlineEditableSkills
                      path="skills"
                      skills={resumeData.skills}
                      renderSkill={(skill, index) => (
                        <div className="pl-4">
                          <div
                            className="px-3 py-2 bg-gray-50 border-l-3 text-xs font-medium text-gray-800"
                            style={{ borderLeftColor: themeColor }}
                          >
                            {skill.name}
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="pl-4">
                      <div className="grid grid-cols-1 gap-2">
                        {resumeData.skills.map((skill) => (
                          <div
                            key={skill.id}
                            className="px-3 py-2 bg-gray-50 border-l-3 text-xs font-medium text-gray-800"
                            style={{ borderLeftColor: themeColor }}
                          >
                            {skill.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Right Column - Projects & Experience */}
            <div className="col-span-3 space-y-8">
              {/* Projects Section - Most Important for Freshers */}
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
                      <section>
                        <div className="flex items-center gap-3 mb-4">
                          <InlineEditableText
                            path={`sections[${index}].title`}
                            value={section.title}
                            className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded text-white inline-block"
                            style={{ backgroundColor: themeColor }}
                            as="h2"
                          />
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                        <div className="pl-4">
                          <InlineEditableText
                            path={`sections[${index}].content`}
                            value={section.content}
                            className="text-sm leading-relaxed text-gray-700 whitespace-pre-line block"
                            multiline
                            as="div"
                          />
                        </div>
                      </section>
                    )}
                  />
                ) : (
                  <>
                    {resumeData.sections.map((section, index) => (
                      <section key={index}>
                        <div className="flex items-center gap-3 mb-4">
                          <h2
                            className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded text-white"
                            style={{ backgroundColor: themeColor }}
                          >
                            {section.title.toUpperCase()}
                          </h2>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                        <div className="pl-4">
                          <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                            {section.content}
                          </div>
                        </div>
                      </section>
                    ))}
                  </>
                )
              )}

              {/* Experience/Internships */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <h2
                      className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded text-white"
                      style={{ backgroundColor: themeColor }}
                    >
                      EXPERIENCE & INTERNSHIPS
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
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
                        <div className="relative pl-4">
                          {/* Timeline dot */}


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
                                  className="text-sm font-medium block"
                                  style={{ color: themeColor }}
                                  as="p"
                                />
                              </div>
                              <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                {formatDate(exp.startDate)} -{" "}
                                {exp.current
                                  ? "Present"
                                  : formatDate(exp.endDate)}
                              </div>
                            </div>
                            {exp.description && (
                              <InlineEditableText
                                path={`experience[${index}].description`}
                                value={exp.description}
                                className="text-sm leading-relaxed text-gray-600 whitespace-pre-line block"
                                multiline
                                as="div"
                              />
                            )}
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-5 pl-4">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="relative">
                          {/* Timeline dot */}


                          <div className="space-y-2">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-sm text-gray-900">
                                  {exp.position}
                                </h3>
                                <p
                                  className="text-sm font-medium"
                                  style={{ color: themeColor }}
                                >
                                  {exp.company}
                                </p>
                              </div>
                              <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                {formatDate(exp.startDate)} -{" "}
                                {exp.current
                                  ? "Present"
                                  : formatDate(exp.endDate)}
                              </div>
                            </div>
                            {exp.description && (
                              <div className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">
                                {exp.description}
                              </div>
                            )}
                          </div>
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
    </div>
  );
};
