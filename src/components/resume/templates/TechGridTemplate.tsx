import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TechGridTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const TechGridTemplate = ({
  resumeData,
  themeColor = "#4f46e5",
  editable = false,
}: TechGridTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-gray-50 text-gray-900">
      {/* Modern Header with Gradient */}
      <div className="relative px-12 pt-10 pb-8" style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)` }}>
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[40px] font-bold mb-2 tracking-tight text-white"
                as="h1"
              />
            ) : (
              <h1 className="text-[40px] font-bold mb-2 tracking-tight text-white">
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[15px] font-semibold uppercase tracking-wider text-white/90"
                  as="p"
                />
              ) : (
                <p className="text-[15px] font-semibold uppercase tracking-wider text-white/90">
                  {resumeData.personalInfo.title}
                </p>
              )
            )}

            {/* Contact Info */}
            <div className="flex gap-6 mt-4 text-[11.5px] text-white/80">
              {resumeData.personalInfo.email && (
                <div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={resumeData.personalInfo.email}
                      className="text-[11.5px] text-white/80 inline"
                      as="span"
                    />
                  ) : (
                    <span>{resumeData.personalInfo.email}</span>
                  )}
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={resumeData.personalInfo.phone}
                      className="text-[11.5px] text-white/80 inline"
                      as="span"
                    />
                  ) : (
                    <span>{resumeData.personalInfo.phone}</span>
                  )}
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.location"
                      value={resumeData.personalInfo.location}
                      className="text-[11.5px] text-white/80 inline"
                      as="span"
                    />
                  ) : (
                    <span>{resumeData.personalInfo.location}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {photo && (
            <div className="rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
              <ProfilePhoto
                src={photo}
                borderClass=""
                className="rounded-2xl"
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-5 bg-white rounded-lg shadow-sm">
            <h2 className="text-[13px] font-bold uppercase tracking-wider mb-3" style={{ color: accent }}>
              Professional Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[12.5px] text-gray-700 leading-[1.8]"
                as="p"
                multiline
              />
            ) : (
              <p className="text-[12.5px] text-gray-700 leading-[1.8]">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Skills - 3 Column Grid */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: accent }}>
              Technical Skills
            </h2>
            {editable ? (
              <div className="grid grid-cols-3 gap-3">
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div className="p-3 bg-white rounded-lg shadow-sm border-l-4 hover:shadow-md transition-shadow" style={{ borderColor: accent }}>
                      <span className="text-[12px] font-semibold text-gray-800 block">
                        {skill.name}
                      </span>
                    </div>
                  )}
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="p-3 bg-white rounded-lg shadow-sm border-l-4 hover:shadow-md transition-shadow" style={{ borderColor: accent }}>
                    <span className="text-[12px] font-semibold text-gray-800 block">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Professional Experience - Card Style */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: accent }}>
              Professional Experience
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
                  description: "Job description",
                  current: false,
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => (
                  <div className="mb-5 last:mb-0 p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="text-[14.5px] font-bold block"
                          as="h3"
                          style={{ color: accent }}
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-[13px] font-semibold text-gray-700 block mt-1"
                          as="p"
                        />
                      </div>
                      <div className="text-[11px] font-bold px-3 py-1.5 rounded-md" style={{ backgroundColor: accentLight, color: accent }}>
                        <div className="flex items-center gap-1 whitespace-nowrap">
                          <InlineEditableDate
                            path={`experience[${index}].startDate`}
                            value={exp.startDate}
                            className="inline-block"
                          />
                          <span> - </span>
                          {exp.current ? (
                            <span>Present</span>
                          ) : (
                            <InlineEditableDate
                              path={`experience[${index}].endDate`}
                              value={exp.endDate}
                              className="inline-block"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {exp.description && (
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        className="text-[12px] text-gray-700 leading-[1.75]"
                        as="div"
                        multiline
                      />
                    )}
                  </div>
                )}
              />
            ) : (
              <div className="space-y-5">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-[14.5px] font-bold" style={{ color: accent }}>
                          {exp.position}
                        </h3>
                        <p className="text-[13px] font-semibold text-gray-700 mt-1">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-[11px] font-bold px-3 py-1.5 rounded-md whitespace-nowrap" style={{ backgroundColor: accentLight, color: accent }}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    {exp.description && (
                      <ul className="list-disc ml-5 space-y-1.5 text-[12px] text-gray-700 leading-[1.75]">
                        {exp.description
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i} className="pl-1">{line}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: accent }}>
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education}
                defaultItem={{
                  id: Date.now().toString(),
                  degree: "Degree",
                  school: "School Name",
                  field: "Field of Study",
                  startDate: "2020-01",
                  endDate: "2024-01",
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div className="mb-4 last:mb-0 p-4 bg-white rounded-lg shadow-sm">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-[13px] font-bold block"
                      as="h3"
                      style={{ color: accent }}
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[12px] text-gray-700 block mt-1"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[11.5px] text-gray-600 block mt-1"
                      as="p"
                    />
                    <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                      <InlineEditableDate
                        path={`education[${index}].startDate`}
                        value={edu.startDate}
                        className="inline-block"
                      />
                      <span> - </span>
                      <InlineEditableDate
                        path={`education[${index}].endDate`}
                        value={edu.endDate}
                        className="inline-block"
                      />
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="text-[13px] font-bold" style={{ color: accent }}>
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-[12px] text-gray-700 mt-1">{edu.field}</p>
                    )}
                    <p className="text-[11.5px] text-gray-600 mt-1">{edu.school}</p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Additional Sections */}
        {editable ? (
          <InlineEditableList
            path="sections"
            items={resumeData.sections || []}
            defaultItem={{
              id: Date.now().toString(),
              title: "Section Title",
              content: "Section content",
            }}
            addButtonLabel="Add Section"
            renderItem={(section, index) => (
              <div className="mb-8">
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title}
                  className="text-[13px] font-bold uppercase tracking-wider mb-4"
                  as="h2"
                  style={{ color: accent }}
                />
                <div className="p-5 bg-white rounded-lg shadow-sm">
                  <InlineEditableText
                    path={`sections[${index}].content`}
                    value={section.content}
                    className="text-[12px] text-gray-700 leading-[1.75] whitespace-pre-line"
                    as="div"
                    multiline
                  />
                </div>
              </div>
            )}
          />
        ) : (
          resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: accent }}>
                {section.title}
              </h2>
              <div className="p-5 bg-white rounded-lg shadow-sm">
                <div className="text-[12px] text-gray-700 leading-[1.75] whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
