import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Calendar, Briefcase } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface FresherDarkProfessionalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherDarkProfessionalTemplate = ({
  resumeData,
  themeColor = "#6366F1",
  editable = false,
}: FresherDarkProfessionalTemplateProps) => {
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
        {/* Dark Modern Header */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 py-6 relative overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ background: themeColor }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full" style={{ background: themeColor }} />
          </div>

          <div className="relative flex items-center gap-6">
            <div className="flex-shrink-0">
              <ProfilePhoto
                src={photo}
                borderClass="border-4 border-white shadow-xl"
                className="text-white"
              />
            </div>

            <div className="flex-1 space-y-4">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-4xl font-bold text-white tracking-tight block"
                  as="h1"
                />
              ) : (
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  {resumeData.personalInfo.fullName}
                </h1>
              )}

              {resumeData.personalInfo.title && (
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-white" />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      className="text-lg font-medium text-gray-200 inline-block"
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-200">
                      {resumeData.personalInfo.title}
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300 pt-2">
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
          <section className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: themeColor }} />
              <h2 className="text-lg font-bold text-gray-900">Professional Summary</h2>
            </div>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-sm leading-relaxed text-gray-700 pl-5 block"
                multiline
                as="p"
              />
            ) : (
              <p className="text-sm leading-relaxed text-gray-700 pl-5">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </section>
        )}

        {/* Main Content - Two Column Layout */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Left Sidebar - Education & Skills */}
            <div className="col-span-1 space-y-8">
              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 rounded-full" style={{ backgroundColor: themeColor }} />
                    <h2 className="text-base font-bold text-gray-900">Education</h2>
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
                        <div className="mb-5 pl-5 border-l-2 border-gray-200">
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
                    <div className="space-y-5 pl-5 border-l-2 border-gray-200">
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

              {/* Skills */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 rounded-full" style={{ backgroundColor: themeColor }} />
                    <h2 className="text-base font-bold text-gray-900">Skills</h2>
                  </div>
                  {editable ? (
                    <InlineEditableSkills
                      path="skills"
                      skills={resumeData.skills}
                      renderSkill={(skill, index) => (
                        <div className="mb-2 pl-5">
                          <div className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md">
                            {skill.name}
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-2 pl-5">
                      {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-md">
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Right Content - Projects & Experience */}
            <div className="col-span-2 space-y-8">
              {/* Custom Sections (Projects, etc.) - Most Important for Freshers */}
              {resumeData.sections && resumeData.sections.length > 0 && (
                editable ? (
                  <InlineEditableList
                    path="sections"
                    items={resumeData.sections}
                    defaultItem={{
                      id: Date.now().toString(),
                      title: "Projects",
                      content: "Project details here...",
                    }}
                    addButtonLabel="Add Section"
                    renderItem={(section, index) => (
                      <section className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-6 rounded-full" style={{ backgroundColor: themeColor }} />
                          <InlineEditableText
                            path={`sections[${index}].title`}
                            value={section.title}
                            className="text-base font-bold text-gray-900 inline-block"
                            as="h2"
                          />
                        </div>
                        <InlineEditableText
                          path={`sections[${index}].content`}
                          value={section.content}
                          className="text-sm leading-relaxed text-gray-700 pl-5 whitespace-pre-line block"
                          multiline
                          as="div"
                        />
                      </section>
                    )}
                  />
                ) : (
                  <>
                    {resumeData.sections.map((section, index) => (
                      <section key={index}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-6 rounded-full" style={{ backgroundColor: themeColor }} />
                          <h2 className="text-base font-bold text-gray-900">
                            {section.title}
                          </h2>
                        </div>
                        <div className="text-sm leading-relaxed text-gray-700 pl-5 whitespace-pre-line">
                          {section.content}
                        </div>
                      </section>
                    ))}
                  </>
                )
              )}

              {/* Internship Experience - Optional for Freshers */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 rounded-full" style={{ backgroundColor: themeColor }} />
                    <h2 className="text-base font-bold text-gray-900">Internship Experience</h2>
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
                        <div className="mb-6 pl-5">
                          <div className="flex justify-between items-start gap-4 mb-3">
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
                                className="text-sm font-medium mt-1 block"
                                style={{ color: themeColor }}
                                as="p"
                              />
                            </div>
                            <div className="text-xs px-3 py-1 rounded-full text-white" style={{ backgroundColor: themeColor }}>
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
                      )}
                    />
                  ) : (
                    <div className="space-y-6 pl-5">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm text-gray-900">
                                {exp.position}
                              </h3>
                              <p className="text-sm font-medium mt-1" style={{ color: themeColor }}>
                                {exp.company}
                              </p>
                            </div>
                            <div className="text-xs px-3 py-1 rounded-full text-white" style={{ backgroundColor: themeColor }}>
                              {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                            </div>
                          </div>
                          {exp.description && (
                            <div className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">
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
    </div>
  );
};
