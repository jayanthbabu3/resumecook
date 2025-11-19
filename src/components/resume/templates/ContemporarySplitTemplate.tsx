import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface ContemporarySplitTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ContemporarySplitTemplate = ({
  resumeData,
  themeColor = "#f59e0b",
  editable = false,
}: ContemporarySplitTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-white text-gray-900 flex">
      {/* Left Side - Dark Background 50% */}
      <div className="w-[50%] bg-[#1f2937] text-white p-10">
        {/* Photo */}
        {photo && (
          <div className="mb-8">
            <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden border-4 shadow-2xl" style={{ borderColor: accent }}>
              <ProfilePhoto
                src={photo}
                borderClass=""
                className="rounded-2xl"
              />
            </div>
          </div>
        )}

        {/* Personal Info */}
        <div className="mb-8">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-[38px] font-bold mb-3 tracking-tight text-white"
              as="h1"
            />
          ) : (
            <h1 className="text-[38px] font-bold mb-3 tracking-tight text-white">
              {resumeData.personalInfo.fullName}
            </h1>
          )}

          {resumeData.personalInfo.title && (
            editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-[15px] font-semibold uppercase tracking-wider mb-6"
                as="p"
                style={{ color: accent }}
              />
            ) : (
              <p className="text-[15px] font-semibold uppercase tracking-wider mb-6" style={{ color: accent }}>
                {resumeData.personalInfo.title}
              </p>
            )
          )}

          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <div className="mt-6 pt-6 border-t border-white/20">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="text-[12.5px] text-white/90 leading-[1.8]"
                  as="p"
                  multiline
                />
              ) : (
                <p className="text-[12.5px] text-white/90 leading-[1.8]">
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mb-8 pb-8 border-b border-white/20">
          <h2 className="text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: accent }}>
            Contact
          </h2>
          <div className="space-y-3 text-[11.5px]">
            {resumeData.personalInfo.email && (
              <div className="break-words">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-[11.5px] text-white/90"
                    as="p"
                  />
                ) : (
                  <p className="text-white/90">{resumeData.personalInfo.email}</p>
                )}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="text-[11.5px] text-white/90"
                    as="p"
                  />
                ) : (
                  <p className="text-white/90">{resumeData.personalInfo.phone}</p>
                )}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="text-[11.5px] text-white/90"
                    as="p"
                  />
                ) : (
                  <p className="text-white/90">{resumeData.personalInfo.location}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8 pb-8 border-b border-white/20">
            <h2 className="text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: accent }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <div className="mb-3">
                    <span className="text-[12px] font-medium text-white/90 block">
                      {skill.name}
                    </span>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-3">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id}>
                    <span className="text-[12px] font-medium text-white/90 block">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
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
                  <div className="mb-5 last:mb-0">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-[12.5px] font-bold text-white block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[11.5px] text-white/90 block mt-1"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[11px] text-white/80 block mt-1"
                      as="p"
                    />
                    <div className="text-[10.5px] text-white/70 mt-1 flex items-center gap-1">
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
              <div className="space-y-5">
                {resumeData.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-[12.5px] font-bold text-white">
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-[11.5px] text-white/90 mt-1">{edu.field}</p>
                    )}
                    <p className="text-[11px] text-white/80 mt-1">{edu.school}</p>
                    <p className="text-[10.5px] text-white/70 mt-1">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side - White Background 50% */}
      <div className="w-[50%] bg-white p-10">
        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold uppercase tracking-wider mb-5 pb-2 border-b-2 text-gray-900" style={{ borderColor: accent }}>
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
                  <div className="mb-6 last:mb-0 pb-6 border-b border-gray-200 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[14.5px] font-bold text-gray-900"
                        as="h3"
                      />
                      <div className="text-[11px] font-semibold px-3 py-1 rounded-md" style={{ backgroundColor: accentLight, color: accent }}>
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
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="text-[13px] font-semibold mb-2"
                      as="p"
                      style={{ color: accent }}
                    />
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
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="pb-6 border-b border-gray-200 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[14.5px] font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <div className="text-[11px] font-semibold px-3 py-1 rounded-md whitespace-nowrap" style={{ backgroundColor: accentLight, color: accent }}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    <p className="text-[13px] font-semibold mb-2" style={{ color: accent }}>
                      {exp.company}
                    </p>
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
                  className="text-[14px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2 text-gray-900"
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
            <div key={index} className="mb-8">
              <h2 className="text-[14px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2 text-gray-900" style={{ borderColor: accent }}>
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
