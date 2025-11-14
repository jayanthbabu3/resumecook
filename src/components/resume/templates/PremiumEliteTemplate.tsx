import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface PremiumEliteTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const PremiumEliteTemplate = ({
  resumeData,
  themeColor = "#8b5cf6",
  editable = false,
}: PremiumEliteTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-white text-[13px] leading-relaxed text-gray-900">
      {/* Top Accent Bar with Header */}
      <div 
        className="px-12 pt-10 pb-8"
        style={{ 
          background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 text-white">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[38px] font-bold mb-2 tracking-tight"
                as="h1"
              />
            ) : (
              <h1 className="text-[38px] font-bold mb-2 tracking-tight">
                {resumeData.personalInfo.fullName}
              </h1>
            )}
            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[15px] font-medium opacity-95 mb-4"
                  as="p"
                />
              ) : (
                <p className="text-[15px] font-medium opacity-95 mb-4">
                  {resumeData.personalInfo.title}
                </p>
              )
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11.5px] opacity-90">
              {resumeData.personalInfo.email && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-[11.5px] opacity-90 inline"
                    as="span"
                  />
                ) : (
                  <span>{resumeData.personalInfo.email}</span>
                )
              )}
              {resumeData.personalInfo.phone && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="text-[11.5px] opacity-90 inline"
                    as="span"
                  />
                ) : (
                  <span>{resumeData.personalInfo.phone}</span>
                )
              )}
              {resumeData.personalInfo.location && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="text-[11.5px] opacity-90 inline"
                    as="span"
                  />
                ) : (
                  <span>{resumeData.personalInfo.location}</span>
                )
              )}
            </div>
          </div>
          {photo && (
            <div className="ml-8">
              <div className="border-4 border-white rounded-2xl overflow-hidden shadow-xl">
                <ProfilePhoto
                  src={photo}
                  borderClass=""
                  className="rounded-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-5 rounded-xl" style={{ backgroundColor: accentLight }}>
            <h2
              className="text-[13px] font-bold uppercase tracking-wide mb-3"
              style={{ color: accent }}
            >
              Professional Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[12.5px] text-gray-700 leading-[1.75]"
                as="p"
                multiline
              />
            ) : (
              <p className="text-[12.5px] text-gray-700 leading-[1.75]">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - 40% */}
          <div className="col-span-5 space-y-7">
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div>
                <h2
                  className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
                  style={{ color: accent, borderColor: accent }}
                >
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
                      <div className="relative pl-4 border-l-2" style={{ borderColor: accentLight }}>
                        <div
                          className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
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
                            className="text-[11.5px] text-gray-600 mt-1"
                            as="p"
                          />
                        )}
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          className="text-[12px] font-semibold mt-1.5"
                          as="p"
                          style={{ color: accent }}
                        />
                        <p className="text-[10.5px] text-gray-500 mt-1 font-medium">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      </div>
                    )}
                  />
                ) : (
                  <div className="space-y-5">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: accentLight }}>
                        <div
                          className="absolute -left-[5px] top-1 w-2 h-2 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        <h3 className="text-[13px] font-bold text-gray-900">
                          {edu.degree}
                        </h3>
                        {edu.field && (
                          <p className="text-[11.5px] text-gray-600 mt-1">{edu.field}</p>
                        )}
                        <p className="text-[12px] font-semibold mt-1.5" style={{ color: accent }}>
                          {edu.school}
                        </p>
                        <p className="text-[10.5px] text-gray-500 mt-1 font-medium">
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
                <h2
                  className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
                  style={{ color: accent, borderColor: accent }}
                >
                  Skills & Expertise
                </h2>
                {editable ? (
                  <InlineEditableSkills
                    path="skills"
                    skills={resumeData.skills}
                    renderSkill={(skill, index) => (
                      <span
                        className="text-[11.5px] font-medium px-3 py-1.5 rounded-lg"
                        style={{
                          backgroundColor: accentLight,
                          color: accent
                        }}
                      >
                        {skill.name}
                      </span>
                    )}
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="text-[11.5px] font-medium px-3 py-1.5 rounded-lg"
                        style={{
                          backgroundColor: accentLight,
                          color: accent
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - 60% */}
          <div className="col-span-7 space-y-7">
            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <div>
                <h2
                  className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
                  style={{ color: accent, borderColor: accent }}
                >
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
                      <div className="relative">
                        <div className="flex justify-between items-start mb-2.5">
                          <div className="flex-1">
                            <InlineEditableText
                              path={`experience[${index}].position`}
                              value={exp.position}
                              className="text-[14px] font-bold text-gray-900"
                              as="h3"
                            />
                            <InlineEditableText
                              path={`experience[${index}].company`}
                              value={exp.company}
                              className="text-[12.5px] font-bold mt-1"
                              as="p"
                              style={{ color: accent }}
                            />
                          </div>
                          <div
                            className="text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
                              color: 'white'
                            }}
                          >
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </div>
                        </div>
                        {exp.description && (
                          <InlineEditableText
                            path={`experience[${index}].description`}
                            value={exp.description}
                            className="ml-5 list-disc space-y-1.5 text-[12px] text-gray-700 leading-[1.7]"
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
                      <div key={index} className="relative">
                        <div className="flex justify-between items-start mb-2.5">
                          <div className="flex-1">
                            <h3 className="text-[14px] font-bold text-gray-900">
                              {exp.position}
                            </h3>
                            <p
                              className="text-[12.5px] font-bold mt-1"
                              style={{ color: accent }}
                            >
                              {exp.company}
                            </p>
                          </div>
                          <div
                            className="text-[10.5px] font-bold px-3.5 py-1.5 rounded-lg shadow-sm"
                            style={{
                              background: `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
                              color: 'white'
                            }}
                          >
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </div>
                        </div>
                        {exp.description && (
                          <ul className="ml-5 list-disc space-y-1.5 text-[12px] text-gray-700 leading-[1.7]">
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
                  <div>
                    <InlineEditableText
                      path={`sections[${index}].title`}
                      value={section.title}
                      className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
                      as="h2"
                      style={{ color: accent, borderColor: accent }}
                    />
                    <InlineEditableText
                      path={`sections[${index}].content`}
                      value={section.content}
                      className="text-[12px] text-gray-700 leading-[1.7] whitespace-pre-line"
                      as="div"
                      multiline
                    />
                  </div>
                )}
              />
            ) : (
              resumeData.sections &&
              resumeData.sections.map((section, index) => (
                <div key={index}>
                  <h2
                    className="text-[13px] font-bold uppercase tracking-wide mb-4 pb-2.5 border-b-2"
                    style={{ color: accent, borderColor: accent }}
                  >
                    {section.title}
                  </h2>
                  <div className="text-[12px] text-gray-700 leading-[1.7] whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
