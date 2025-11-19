import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface SapphireExecutiveTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const SapphireExecutiveTemplate = ({
  resumeData,
  themeColor = "#1e40af",
  editable = false,
}: SapphireExecutiveTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Elegant Header with Diagonal Accent */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white pb-8 pt-10 px-12">
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: accent }} />

        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[42px] font-bold mb-3 tracking-tight text-gray-900"
                as="h1"
              />
            ) : (
              <h1 className="text-[42px] font-bold mb-3 tracking-tight text-gray-900">
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[16px] font-semibold mb-5 tracking-wide uppercase"
                  as="p"
                  style={{ color: accent }}
                />
              ) : (
                <p
                  className="text-[16px] font-semibold mb-5 tracking-wide uppercase"
                  style={{ color: accent }}
                >
                  {resumeData.personalInfo.title}
                </p>
              )
            )}

            {/* Contact Info - Elegant Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[12px] text-gray-600">
              {resumeData.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={resumeData.personalInfo.email}
                      className="text-[12px] inline"
                      as="span"
                    />
                  ) : (
                    <span>{resumeData.personalInfo.email}</span>
                  )}
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.phone"
                      value={resumeData.personalInfo.phone}
                      className="text-[12px] inline"
                      as="span"
                    />
                  ) : (
                    <span>{resumeData.personalInfo.phone}</span>
                  )}
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.location"
                      value={resumeData.personalInfo.location}
                      className="text-[12px] inline"
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
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-full h-full rounded-xl" style={{ backgroundColor: accentLight }} />
              <div className="relative rounded-xl overflow-hidden border-2 border-white shadow-xl">
                <ProfilePhoto
                  src={photo}
                  borderClass=""
                  className="rounded-xl"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Professional Summary with Accent Border */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 border-l-4 pl-6 py-1" style={{ borderColor: accent }}>
            <h2 className="text-[14px] font-bold uppercase tracking-wider mb-3 text-gray-900">
              Executive Summary
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

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold uppercase tracking-wider mb-5 text-gray-900 pb-2 border-b-2" style={{ borderColor: accent }}>
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
                  <div className="relative pl-6 pb-6 border-l-2 border-gray-200 last:border-0 last:pb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2" style={{ borderColor: accent }} />

                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="text-[14.5px] font-bold text-gray-900"
                          as="h3"
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-[13px] font-semibold mt-1"
                          as="p"
                          style={{ color: accent }}
                        />
                      </div>
                      <div className="text-[11px] font-semibold px-4 py-1.5 rounded-full" style={{ backgroundColor: accentLight, color: accent }}>
                        <div className="flex items-center gap-1">
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
                        className="text-[12px] text-gray-700 leading-[1.75] mt-2"
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
                  <div key={index} className="relative pl-6 pb-6 border-l-2 border-gray-200 last:border-0 last:pb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2" style={{ borderColor: accent }} />

                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-[14.5px] font-bold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-[13px] font-semibold mt-1" style={{ color: accent }}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-[11px] font-semibold px-4 py-1.5 rounded-full" style={{ backgroundColor: accentLight, color: accent }}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>

                    {exp.description && (
                      <ul className="list-disc ml-5 space-y-1.5 text-[12px] text-gray-700 leading-[1.75] mt-2">
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

        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2 className="text-[14px] font-bold uppercase tracking-wider mb-5 text-gray-900 pb-2 border-b-2" style={{ borderColor: accent }}>
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
                    <div className="mb-4 last:mb-0">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-[13px] font-bold text-gray-900"
                        as="h3"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="text-[12px] font-medium mt-0.5"
                          as="p"
                          style={{ color: accent }}
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[11.5px] text-gray-600 mt-1"
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
                    <div key={index}>
                      <h3 className="text-[13px] font-bold text-gray-900">
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <p className="text-[12px] font-medium mt-0.5" style={{ color: accent }}>
                          {edu.field}
                        </p>
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
              <h2 className="text-[14px] font-bold uppercase tracking-wider mb-5 text-gray-900 pb-2 border-b-2" style={{ borderColor: accent }}>
                Core Competencies
              </h2>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                      <span className="text-[12px] text-gray-700 font-medium">
                        {skill.name}
                      </span>
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-2.5">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                      <span className="text-[12px] text-gray-700 font-medium">
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
              <div className="mt-8">
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title}
                  className="text-[14px] font-bold uppercase tracking-wider mb-4 text-gray-900 pb-2 border-b-2"
                  as="h2"
                  style={{ borderColor: accent }}
                />
                <InlineEditableText
                  path={`sections[${index}].content`}
                  value={section.content}
                  className="text-[12px] text-gray-700 leading-[1.75] whitespace-pre-line"
                  as="div"
                  multiline
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mt-8">
              <h2 className="text-[14px] font-bold uppercase tracking-wider mb-4 text-gray-900 pb-2 border-b-2" style={{ borderColor: accent }}>
                {section.title}
              </h2>
              <div className="text-[12px] text-gray-700 leading-[1.75] whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
