import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface CreativeAccentTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const CreativeAccentTemplate = ({
  resumeData,
  themeColor = "#d946ef",
  editable = false,
}: CreativeAccentTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;
  const accentMedium = `${accent}30`;

  return (
    <div className="w-full h-full bg-white text-gray-900 flex">
      {/* Left Accent Sidebar - 35% */}
      <div className="w-[35%] p-10 text-white" style={{ background: `linear-gradient(180deg, ${accent} 0%, ${accent}dd 100%)` }}>
        {/* Photo */}
        {photo && (
          <div className="mb-8">
            <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <ProfilePhoto
                src={photo}
                borderClass=""
                className="rounded-full"
              />
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="mb-8">
          <h2 className="text-[14px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2 border-white/30">
            Contact
          </h2>
          <div className="space-y-3 text-[11.5px]">
            {resumeData.personalInfo.email && (
              <div className="break-words">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-[11.5px] text-white/95"
                    as="p"
                  />
                ) : (
                  <p className="text-white/95">{resumeData.personalInfo.email}</p>
                )}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="text-[11.5px] text-white/95"
                    as="p"
                  />
                ) : (
                  <p className="text-white/95">{resumeData.personalInfo.phone}</p>
                )}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="text-[11.5px] text-white/95"
                    as="p"
                  />
                ) : (
                  <p className="text-white/95">{resumeData.personalInfo.location}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2 border-white/30">
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <div className="mb-3">
                    <span className="text-[12px] font-medium text-white/95 block mb-1.5">
                      {skill.name}
                    </span>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${85 + (index % 3) * 5}%` }}
                      />
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-3">
                {resumeData.skills.map((skill, index) => (
                  <div key={skill.id}>
                    <span className="text-[12px] font-medium text-white/95 block mb-1.5">
                      {skill.name}
                    </span>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${85 + (index % 3) * 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-[14px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2 border-white/30">
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
                    <div className="text-[10.5px] text-white/75 mt-1 flex items-center gap-1">
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
                    <p className="text-[10.5px] text-white/75 mt-1">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Main Content - 65% */}
      <div className="w-[65%] p-10">
        {/* Header */}
        <div className="mb-8">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-[32px] font-bold mb-2 tracking-tight"
              as="h1"
              style={{ color: accent }}
            />
          ) : (
            <h1
              className="text-[32px] font-bold mb-2 tracking-tight"
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
                className="text-[16px] font-semibold text-gray-700 uppercase tracking-wide"
                as="p"
              />
            ) : (
              <p className="text-[16px] font-semibold text-gray-700 uppercase tracking-wide">
                {resumeData.personalInfo.title}
              </p>
            )
          )}
        </div>

        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-0.5 rounded-full" style={{ backgroundColor: accent }} />
              <h2 className="text-[14px] font-bold uppercase tracking-wider text-gray-900">
                Profile
              </h2>
            </div>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[12.5px] text-gray-700 leading-[1.8] pl-13"
                as="p"
                multiline
              />
            ) : (
              <p className="text-[12.5px] text-gray-700 leading-[1.8] pl-13">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-0.5 rounded-full" style={{ backgroundColor: accent }} />
              <h2 className="text-[14px] font-bold uppercase tracking-wider text-gray-900">
                Experience
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
                  description: "Job description",
                  current: false,
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => (
                  <div className="mb-6 last:mb-0 pl-13">
                    <div className="flex justify-between items-baseline mb-2">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[14px] font-bold text-gray-900"
                        as="h3"
                      />
                      <div className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: accentLight, color: accent }}>
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
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="text-[12.5px] font-semibold mb-2"
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
              <div className="space-y-6 pl-13">
                {resumeData.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-[14px] font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <div className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: accentLight, color: accent }}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    <p className="text-[12.5px] font-semibold mb-2" style={{ color: accent }}>
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 rounded-full" style={{ backgroundColor: accent }} />
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    className="text-[14px] font-bold uppercase tracking-wider text-gray-900"
                    as="h2"
                  />
                </div>
                <InlineEditableText
                  path={`sections[${index}].content`}
                  value={section.content}
                  className="text-[12px] text-gray-700 leading-[1.75] whitespace-pre-line pl-13"
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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 rounded-full" style={{ backgroundColor: accent }} />
                <h2 className="text-[14px] font-bold uppercase tracking-wider text-gray-900">
                  {section.title}
                </h2>
              </div>
              <div className="text-[12px] text-gray-700 leading-[1.75] whitespace-pre-line pl-13">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
