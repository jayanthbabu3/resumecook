import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Calendar, GraduationCap, Code } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface FresherTwoToneTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherTwoToneTemplate = ({
  resumeData,
  themeColor = "#F43F5E",
  editable = false,
}: FresherTwoToneTemplateProps) => {
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
      <div className="max-w-[850px] mx-auto flex min-h-full">
        {/* Left Half - Colored */}
        <div className="w-1/2 text-white p-8" style={{ backgroundColor: themeColor }}>
          {/* Profile Photo */}
          <div className="text-center mb-8">
            <ProfilePhoto
              src={photo}
              borderClass="border-4 border-white shadow-xl"
              className="text-white"
            />
          </div>

          {/* Name & Title */}
          <div className="text-center mb-8">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-3xl font-bold text-white mb-3 block"
                as="h1"
              />
            ) : (
              <h1 className="text-3xl font-bold text-white mb-3">
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-base font-medium text-white/90 block"
                  />
                ) : (
                  <p className="text-base font-medium text-white/90">
                    {resumeData.personalInfo.title}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-4 mb-6 pb-6 border-b border-white/30">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">
              Contact Information
            </h2>
            {resumeData.personalInfo.email && (
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-sm text-white/90 break-words block"
                  />
                ) : (
                  <span className="text-sm text-white/90 break-words">
                    {resumeData.personalInfo.email}
                  </span>
                )}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="text-sm text-white/90 block"
                  />
                ) : (
                  <span className="text-sm text-white/90">
                    {resumeData.personalInfo.phone}
                  </span>
                )}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="text-sm text-white/90 block"
                  />
                ) : (
                  <span className="text-sm text-white/90">
                    {resumeData.personalInfo.location}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-6 pb-6 border-b border-white/30">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-4 w-4" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-white/80">
                  Education
                </h2>
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
                    <div className="mb-4">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="font-semibold text-sm text-white leading-tight block"
                        as="h3"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="text-xs text-white/80 mt-1 block"
                          as="p"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-xs font-medium text-white/90 mt-1 block"
                        as="p"
                      />
                      <div className="text-xs text-white/70 mt-2">
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
                      <h3 className="font-semibold text-sm text-white leading-tight">
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <p className="text-xs text-white/80 mt-1">{edu.field}</p>
                      )}
                      <p className="text-xs font-medium text-white/90 mt-1">
                        {edu.school}
                      </p>
                      <div className="text-xs text-white/70 mt-2">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-4 w-4" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-white/80">
                  Technical Skills
                </h2>
              </div>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div className="mb-2">
                      <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-md text-xs font-medium text-white">
                        {skill.name}
                      </div>
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-2">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-md text-xs font-medium text-white">
                      {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Half - White */}
        <div className="w-1/2 p-8 bg-white">
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2" style={{ borderBottomColor: themeColor }}>
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

          {/* Projects/Custom Sections - Most Important for Freshers */}
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
                    <InlineEditableText
                      path={`sections[${index}].title`}
                      value={section.title}
                      className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2 block"
                      style={{ borderBottomColor: themeColor }}
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
                    <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2" style={{ borderBottomColor: themeColor }}>
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
            <section className="mb-8">
              <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2" style={{ borderBottomColor: themeColor }}>
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
                          className="text-sm leading-relaxed text-gray-600 mt-3 whitespace-pre-line block"
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
                        <div className="text-sm leading-relaxed text-gray-600 mt-3 whitespace-pre-line">
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
  );
};
