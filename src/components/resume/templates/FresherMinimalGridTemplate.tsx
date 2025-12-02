import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Calendar, Award } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface FresherMinimalGridTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherMinimalGridTemplate = ({
  resumeData,
  themeColor = "#10B981",
  editable = false,
}: FresherMinimalGridTemplateProps) => {
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
        {/* Minimal Header with Side Border */}
        <div className="relative border-l-4 pl-12 pr-12 pt-10 pb-8" style={{ borderLeftColor: themeColor }}>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <ProfilePhoto
                src={photo}
                borderClass="border-3"
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
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" style={{ color: themeColor }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      className="text-lg font-medium text-gray-700 inline-block"
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-700">
                      {resumeData.personalInfo.title}
                    </span>
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
          <section className="px-8 py-6 bg-gray-50">
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

        {/* 3-Column Grid Layout */}
        <div className="px-8 py-8">
          <div className="grid grid-cols-3 gap-6">
            {/* Column 1 - Education */}
            <div className="space-y-6">
              {resumeData.education && resumeData.education.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ color: themeColor, borderBottomColor: themeColor }}>
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
            </div>

            {/* Column 2 - Skills */}
            <div className="space-y-6">
              {resumeData.skills && resumeData.skills.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ color: themeColor, borderBottomColor: themeColor }}>
                    Skills
                  </h2>
                  {editable ? (
                    <InlineEditableSkills
                      path="skills"
                      skills={resumeData.skills}
                      renderSkill={(skill, index) => (
                        <div className="mb-2">
                          <div className="px-3 py-1.5 bg-gray-50 rounded-md text-xs font-medium text-gray-800 border-l-3" style={{ borderLeftColor: themeColor }}>
                            {skill.name}
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-2">
                      {resumeData.skills.map((skill) => (
                        <div key={skill.id} className="px-3 py-1.5 bg-gray-50 rounded-md text-xs font-medium text-gray-800 border-l-3" style={{ borderLeftColor: themeColor }}>
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* Column 3 - Experience & Projects */}
            <div className="space-y-6">
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
                      <section className="mb-6">
                        <InlineEditableText
                          path={`sections[${index}].title`}
                          value={section.title}
                          className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2 inline-block"
                          style={{ color: themeColor, borderBottomColor: themeColor }}
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
                      <section key={index} className="mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ color: themeColor, borderBottomColor: themeColor }}>
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

              {/* Internship Experience - Optional for Freshers */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ color: themeColor, borderBottomColor: themeColor }}>
                    Internship Experience
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
                        <div className="mb-4">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            className="font-semibold text-sm text-gray-900 block"
                            as="h3"
                          />
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            className="text-xs font-medium mt-1 block"
                            style={{ color: themeColor }}
                            as="p"
                          />
                          <div className="text-xs text-gray-500 mt-1">
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
                              className="text-xs leading-relaxed text-gray-600 mt-2 whitespace-pre-line block"
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
                        <div key={index}>
                          <h3 className="font-semibold text-sm text-gray-900">
                            {exp.position}
                          </h3>
                          <p className="text-xs font-medium mt-1" style={{ color: themeColor }}>
                            {exp.company}
                          </p>
                          <div className="text-xs text-gray-500 mt-1">
                            {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                          </div>
                          {exp.description && (
                            <div className="text-xs leading-relaxed text-gray-600 mt-2 whitespace-pre-line">
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
