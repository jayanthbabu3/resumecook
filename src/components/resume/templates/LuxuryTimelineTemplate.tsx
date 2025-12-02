import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface LuxuryTimelineTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const LuxuryTimelineTemplate = ({
  resumeData,
  themeColor = "#b45309",
  editable = false,
}: LuxuryTimelineTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Luxury Header */}
      <div className="px-16 pt-12 pb-10 border-b border-gray-200">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[46px] font-light tracking-wide mb-2"
                as="h1"
                style={{ color: accent }}
              />
            ) : (
              <h1
                className="text-[46px] font-light tracking-wide mb-2"
                style={{ color: accent }}
              >
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[14px] font-medium text-gray-600 uppercase tracking-[0.25em] mb-6"
                  as="p"
                />
              ) : (
                <p className="text-[14px] font-medium text-gray-600 uppercase tracking-[0.25em] mb-6">
                  {resumeData.personalInfo.title}
                </p>
              )
            )}

            {/* Contact Info - Luxury Style */}
            <div className="flex gap-8 text-[11.5px] text-gray-600 mt-8">
              {resumeData.personalInfo.email && (
                <div>
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={resumeData.personalInfo.email}
                      className="text-[11.5px] inline"
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
                      className="text-[11.5px] inline"
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
                      className="text-[11.5px] inline"
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
            <div className="rounded-lg overflow-hidden shadow-xl border-2" style={{ borderColor: accent }}>
              <ProfilePhoto
                src={photo}
                borderClass=""
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-16 py-10">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-12 max-w-4xl">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-4 text-gray-400">
              Professional Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[13.5px] text-gray-700 leading-[2]"
                as="p"
                multiline
              />
            ) : (
              <p className="text-[13.5px] text-gray-700 leading-[2]">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Professional Experience - Timeline Style */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-12">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-8 text-gray-400">
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
                  <div className="relative pl-12 pb-12 last:pb-0">
                    {/* Timeline Line */}
                    <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200 last:hidden" />

                    {/* Timeline Dot - Golden/Bronze */}
                    <div
                      className="absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-lg"
                      style={{ backgroundColor: accent }}
                    />

                    <div className="mb-4">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[16px] font-light tracking-wide mb-1 block"
                        as="h3"
                        style={{ color: accent }}
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-[13px] font-medium text-gray-700 block mb-2"
                        as="p"
                      />
                      <div className="text-[11px] font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
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
                    {exp.description && (
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        className="text-[12.5px] text-gray-700 leading-[1.9]"
                        as="div"
                        multiline
                      />
                    )}
                  </div>
                )}
              />
            ) : (
              <div className="space-y-0">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="relative pl-12 pb-12 last:pb-0">
                    {/* Timeline Line */}
                    {index < resumeData.experience.length - 1 && (
                      <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200" />
                    )}

                    {/* Timeline Dot - Golden/Bronze */}
                    <div
                      className="absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white shadow-lg"
                      style={{ backgroundColor: accent }}
                    />

                    <div className="mb-4">
                      <h3 className="text-[16px] font-light tracking-wide mb-1" style={{ color: accent }}>
                        {exp.position}
                      </h3>
                      <p className="text-[13px] font-medium text-gray-700 mb-2">
                        {exp.company}
                      </p>
                      <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (
                      <ul className="list-none space-y-2 text-[12.5px] text-gray-700 leading-[1.9]">
                        {exp.description
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i} className="pl-0 flex gap-3">
                              <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                              <span className="flex-1">{line}</span>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education & Skills - Side by Side */}
        <div className="grid grid-cols-2 gap-16">
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-6 text-gray-400">
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
                    <div className="mb-6 last:mb-0">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-[13px] font-medium block"
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
                <div className="space-y-6">
                  {resumeData.education.map((edu, index) => (
                    <div key={index}>
                      <h3 className="text-[13px] font-medium" style={{ color: accent }}>
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

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div>
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-6 text-gray-400">
                Expertise
              </h2>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                      <span className="text-[12.5px] text-gray-700 font-light tracking-wide">
                        {skill.name}
                      </span>
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-4">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                      <span className="text-[12.5px] text-gray-700 font-light tracking-wide">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

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
              <div className="mt-12">
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title}
                  className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-6 text-gray-400"
                  as="h2"
                />
                <InlineEditableText
                  path={`sections[${index}].content`}
                  value={section.content}
                  className="text-[12.5px] text-gray-700 leading-[1.9] whitespace-pre-line"
                  as="div"
                  multiline
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mt-12">
              <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] mb-6 text-gray-400">
                {section.title}
              </h2>
              <div className="text-[12.5px] text-gray-700 leading-[1.9] whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
