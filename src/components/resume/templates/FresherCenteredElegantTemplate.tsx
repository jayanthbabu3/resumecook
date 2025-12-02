import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface FresherCenteredElegantTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherCenteredElegantTemplate = ({
  resumeData,
  themeColor = "#A855F7",
  editable = false,
}: FresherCenteredElegantTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white overflow-auto">
      <div className="max-w-[850px] mx-auto px-16 py-12">
        {/* Centered Header */}
        <div className="text-center mb-10">
          <div className="mb-6">
            <ProfilePhoto
              src={photo}
              borderClass="border-3"
              className="text-gray-300"
              style={{ borderColor: themeColor }}
            />
          </div>

          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-4xl font-serif font-bold text-gray-900 tracking-wide mb-3 block"
              as="h1"
            />
          ) : (
            <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-wide mb-3">
              {resumeData.personalInfo.fullName}
            </h1>
          )}

          {resumeData.personalInfo.title && (
            <div className="mb-4">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-lg font-serif italic inline-block"
                  style={{ color: themeColor }}
                />
              ) : (
                <p className="text-lg font-serif italic" style={{ color: themeColor }}>
                  {resumeData.personalInfo.title}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600">
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

          {/* Decorative line */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="w-16 h-px" style={{ backgroundColor: themeColor }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
            <div className="w-16 h-px" style={{ backgroundColor: themeColor }} />
          </div>
        </div>

        {/* Professional Summary - Centered */}
        {resumeData.personalInfo.summary && (
          <section className="mb-10 text-center">
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-sm leading-relaxed text-gray-700 max-w-3xl mx-auto block font-serif"
                multiline
                as="p"
              />
            ) : (
              <p className="text-sm leading-relaxed text-gray-700 max-w-3xl mx-auto font-serif">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </section>
        )}

        {/* Skills - Centered Grid */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-serif font-bold text-center mb-6" style={{ color: themeColor }}>
              Technical Expertise
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <div className="inline-block mx-2 mb-3">
                    <div className="px-5 py-2 border-2 rounded-full text-sm font-medium text-gray-800" style={{ borderColor: themeColor }}>
                      {skill.name}
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="flex flex-wrap justify-center">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="inline-block mx-2 mb-3">
                    <div className="px-5 py-2 border-2 rounded-full text-sm font-medium text-gray-800" style={{ borderColor: themeColor }}>
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Education - Centered */}
        {resumeData.education && resumeData.education.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-serif font-bold text-center mb-6" style={{ color: themeColor }}>
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
                  <div className="text-center mb-6">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="font-serif font-semibold text-base text-gray-900 leading-tight block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="font-serif text-sm text-gray-600 mt-1 block"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-sm font-medium mt-1 block"
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
                      <span> – </span>
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
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="text-center">
                    <h3 className="font-serif font-semibold text-base text-gray-900 leading-tight">
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="font-serif text-sm text-gray-600 mt-1">{edu.field}</p>
                    )}
                    <p className="text-sm font-medium mt-1" style={{ color: themeColor }}>
                      {edu.school}
                    </p>
                    <div className="text-xs text-gray-500 mt-2">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Custom Sections - Centered - Most Important for Freshers */}
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
                <section className="mb-10">
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    className="text-xl font-serif font-bold text-center mb-6 inline-block"
                    style={{ color: themeColor }}
                    as="h2"
                  />
                  <InlineEditableText
                    path={`sections[${index}].content`}
                    value={section.content}
                    className="text-sm leading-relaxed text-gray-700 max-w-2xl mx-auto text-center whitespace-pre-line block font-serif"
                    multiline
                    as="div"
                  />
                </section>
              )}
            />
          ) : (
            <>
              {resumeData.sections.map((section, index) => (
                <section key={index} className="mb-10">
                  <h2 className="text-xl font-serif font-bold text-center mb-6" style={{ color: themeColor }}>
                    {section.title}
                  </h2>
                  <div className="text-sm leading-relaxed text-gray-700 max-w-2xl mx-auto text-center whitespace-pre-line font-serif">
                    {section.content}
                  </div>
                </section>
              ))}
            </>
          )
        )}

        {/* Internship Experience - Centered - Optional for Freshers */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-serif font-bold text-center mb-6" style={{ color: themeColor }}>
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
                  <div className="mb-8 max-w-2xl mx-auto">
                    <div className="text-center mb-3">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="font-serif font-semibold text-base text-gray-900 block"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-sm font-medium mt-1 block"
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
                        <span> – </span>
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
                        className="text-sm leading-relaxed text-gray-600 text-center whitespace-pre-line block font-serif"
                        multiline
                        as="div"
                      />
                    )}
                  </div>
                )}
              />
            ) : (
              <div className="space-y-8">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="max-w-2xl mx-auto">
                    <div className="text-center mb-3">
                      <h3 className="font-serif font-semibold text-base text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-sm font-medium mt-1" style={{ color: themeColor }}>
                        {exp.company}
                      </p>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-sm leading-relaxed text-gray-600 text-center whitespace-pre-line font-serif">
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
  );
};
