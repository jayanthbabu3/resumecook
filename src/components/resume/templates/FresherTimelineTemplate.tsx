import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Calendar, Circle } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface FresherTimelineTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherTimelineTemplate = ({
  resumeData,
  themeColor = "#EC4899",
  editable = false,
}: FresherTimelineTemplateProps) => {
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
        {/* Header Section */}
        <div className="relative px-12 pt-10 pb-8 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-start gap-8">
            <div className="flex-shrink-0">
              <ProfilePhoto
                src={photo}
                borderClass="border-4"
                className="text-gray-300"
                style={{ borderColor: themeColor }}
              />
            </div>

            <div className="flex-1 space-y-3">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-4xl font-bold text-gray-900 tracking-tight block"
                  as="h1"
                />
              ) : (
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                  {resumeData.personalInfo.fullName}
                </h1>
              )}

              {resumeData.personalInfo.title && (
                <div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      className="text-lg font-medium text-gray-600 inline-block"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-600">
                      {resumeData.personalInfo.title}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 pt-2">
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

        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <section className="px-12 py-6 bg-white">
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

        <div className="px-12 py-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Skills */}
            <div className="col-span-1 space-y-8">
              {/* Skills */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>
                    Technical Skills
                  </h2>
                  {editable ? (
                    <InlineEditableSkills
                      path="skills"
                      skills={resumeData.skills}
                      renderSkill={(skill, index) => (
                        <div className="mb-2">
                          <div className="px-3 py-2 bg-gray-50 rounded-md text-xs font-medium text-gray-800 border-l-3" style={{ borderLeftColor: themeColor }}>
                            {skill.name}
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-2">
                      {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="px-3 py-2 bg-gray-50 rounded-md text-xs font-medium text-gray-800 border-l-3" style={{ borderLeftColor: themeColor }}>
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Right Column - Timeline (Education & Experience) */}
            <div className="col-span-2 space-y-8">
              {/* Education Timeline */}
              {resumeData.education && resumeData.education.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: themeColor }}>
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
                        <div className="relative pl-8 pb-8">
                          {/* Timeline dot and line */}
                          <div className="absolute left-0 top-1 flex flex-col items-center">
                            <Circle className="h-3 w-3 fill-current" style={{ color: themeColor }} />
                            {index < resumeData.education.length - 1 && (
                              <div className="w-0.5 h-full mt-1" style={{ backgroundColor: themeColor, opacity: 0.3 }} />
                            )}
                          </div>

                          <div className="space-y-1">
                            <InlineEditableText
                              path={`education[${index}].degree`}
                              value={edu.degree}
                              className="font-semibold text-base text-gray-900 leading-tight block"
                              as="h3"
                            />
                            {edu.field && (
                              <InlineEditableText
                                path={`education[${index}].field`}
                                value={edu.field}
                                className="text-sm text-gray-600 block"
                                as="p"
                              />
                            )}
                            <InlineEditableText
                              path={`education[${index}].school`}
                              value={edu.school}
                              className="text-sm font-medium block"
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
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-0">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="relative pl-8 pb-8">
                          {/* Timeline dot and line */}
                          <div className="absolute left-0 top-1 flex flex-col items-center">
                            <Circle className="h-3 w-3 fill-current" style={{ color: themeColor }} />
                            {index < resumeData.education.length - 1 && (
                              <div className="w-0.5 h-full mt-1" style={{ backgroundColor: themeColor, opacity: 0.3 }} />
                            )}
                          </div>

                          <div className="space-y-1">
                            <h3 className="font-semibold text-base text-gray-900 leading-tight">
                              {edu.degree}
                            </h3>
                            {edu.field && (
                              <p className="text-sm text-gray-600">{edu.field}</p>
                            )}
                            <p className="text-sm font-medium" style={{ color: themeColor }}>
                              {edu.school}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                              <Calendar className="h-3 w-3" />
                              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Experience Timeline */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-6" style={{ color: themeColor }}>
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
                        <div className="relative pl-8 pb-8">
                          {/* Timeline dot and line */}
                          <div className="absolute left-0 top-1 flex flex-col items-center">
                            <Circle className="h-3 w-3 fill-current" style={{ color: themeColor }} />
                            {index < resumeData.experience.length - 1 && (
                              <div className="w-0.5 h-full mt-1" style={{ backgroundColor: themeColor, opacity: 0.3 }} />
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
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
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
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
                    <div className="space-y-0">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="relative pl-8 pb-8">
                          {/* Timeline dot and line */}
                          <div className="absolute left-0 top-1 flex flex-col items-center">
                            <Circle className="h-3 w-3 fill-current" style={{ color: themeColor }} />
                            {index < resumeData.experience.length - 1 && (
                              <div className="w-0.5 h-full mt-1" style={{ backgroundColor: themeColor, opacity: 0.3 }} />
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-base text-gray-900">
                                  {exp.position}
                                </h3>
                                <p className="text-sm font-medium mt-1" style={{ color: themeColor }}>
                                  {exp.company}
                                </p>
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
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
                          className="text-sm font-bold uppercase tracking-wider mb-4 inline-block"
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
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>
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
