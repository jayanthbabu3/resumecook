import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Calendar, Award, TrendingUp, Star } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface FresherAchievementTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherAchievementTemplate = ({
  resumeData,
  themeColor = "#EAB308",
  editable = false,
}: FresherAchievementTemplateProps) => {
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
        {/* Achievement-focused Header */}
        <div className="relative px-8 pt-10 pb-8" style={{ background: `linear-gradient(135deg, ${themeColor}15 0%, ${themeColor}05 100%)` }}>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 relative">
              <div className="absolute -top-2 -right-2 z-10">
                <Award className="h-6 w-6" style={{ color: themeColor }} />
              </div>
              <ProfilePhoto
                src={photo}
                borderClass="border-4"
                className="text-gray-300"
                style={{ borderColor: themeColor }}
              />
            </div>

            <div className="flex-1">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-4xl font-bold text-gray-900 tracking-tight mb-2 block"
                  as="h1"
                />
              ) : (
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
                  {resumeData.personalInfo.fullName}
                </h1>
              )}

              {resumeData.personalInfo.title && (
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5" style={{ color: themeColor, fill: themeColor }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      className="text-lg font-semibold inline-block"
                      style={{ color: themeColor }}
                    />
                  ) : (
                    <p className="text-lg font-semibold" style={{ color: themeColor }}>
                      {resumeData.personalInfo.title}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
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

        <div className="px-8 py-8">
          {/* Professional Summary with Achievement Focus */}
          {resumeData.personalInfo.summary && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-5 w-5" style={{ color: themeColor }} />
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                  Profile Highlights
                </h2>
              </div>
              <div className="pl-8 border-l-3" style={{ borderLeftColor: themeColor }}>
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
              </div>
            </section>
          )}

          {/* Core Competencies */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5" style={{ color: themeColor }} />
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                  Core Competencies
                </h2>
              </div>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div className="inline-block m-1.5">
                      <div className="px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-800 border-2" style={{ borderColor: themeColor, backgroundColor: `${themeColor}10` }}>
                        {skill.name}
                      </div>
                    </div>
                  )}
                />
              ) : (
                <div className="flex flex-wrap">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="inline-block m-1.5">
                      <div className="px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-800 border-2" style={{ borderColor: themeColor, backgroundColor: `${themeColor}10` }}>
                        {skill.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Custom Sections - Most Important for Freshers */}
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
                      <TrendingUp className="h-5 w-5" style={{ color: themeColor }} />
                      <InlineEditableText
                        path={`sections[${index}].title`}
                        value={section.title}
                        className="text-base font-bold text-gray-900 uppercase tracking-wide inline-block"
                        as="h2"
                      />
                    </div>
                    <div className="pl-8 border-l-3" style={{ borderLeftColor: themeColor }}>
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
                  <section key={index} className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="h-5 w-5" style={{ color: themeColor }} />
                      <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                        {section.title}
                      </h2>
                    </div>
                    <div className="pl-8 border-l-3" style={{ borderLeftColor: themeColor }}>
                      <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  </section>
                ))}
              </>
            )
          )}

          {/* Internship Experience - Optional for Freshers */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-5 w-5" style={{ color: themeColor, fill: themeColor }} />
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                  Internship Experience
                </h2>
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
                    <div className="mb-6 p-4 rounded-lg border-l-4" style={{ borderLeftColor: themeColor, backgroundColor: `${themeColor}05` }}>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex-1">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            className="font-bold text-base text-gray-900 block"
                            as="h3"
                          />
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            className="text-sm font-semibold mt-1 block"
                            style={{ color: themeColor }}
                            as="p"
                          />
                        </div>
                        <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full flex items-center gap-1">
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
                          className="text-sm leading-relaxed text-gray-700 mt-3 whitespace-pre-line block"
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
                    <div key={index} className="p-4 rounded-lg border-l-4" style={{ borderLeftColor: themeColor, backgroundColor: `${themeColor}05` }}>
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-base text-gray-900">
                            {exp.position}
                          </h3>
                          <p className="text-sm font-semibold mt-1" style={{ color: themeColor }}>
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </div>
                      </div>
                      {exp.description && (
                        <div className="text-sm leading-relaxed text-gray-700 mt-3 whitespace-pre-line">
                          {exp.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5" style={{ color: themeColor }} />
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide">
                  Academic Background
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                      <div className="p-4 rounded-lg border-2" style={{ borderColor: themeColor, backgroundColor: `${themeColor}05` }}>
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="font-bold text-sm text-gray-900 leading-tight block"
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
                          className="text-xs font-semibold mt-2 block"
                          style={{ color: themeColor }}
                          as="p"
                        />
                        <div className="text-xs text-gray-500 mt-2">
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
                  <>
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="p-4 rounded-lg border-2" style={{ borderColor: themeColor, backgroundColor: `${themeColor}05` }}>
                        <h3 className="font-bold text-sm text-gray-900 leading-tight">
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-xs text-gray-600 mt-1">{edu.field}</p>
                        )}
                        <p className="text-xs font-semibold mt-2" style={{ color: themeColor }}>
                          {edu.school}
                        </p>
                        <div className="text-xs text-gray-500 mt-2">
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
