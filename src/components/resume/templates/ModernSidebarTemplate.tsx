import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface ModernSidebarTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ModernSidebarTemplate = ({
  resumeData,
  themeColor = "#0891b2",
  editable = false,
}: ModernSidebarTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-white text-gray-900 flex">
      {/* Left Sidebar - 30% */}
      <div className="w-[30%] bg-gray-50 p-8 border-r-4" style={{ borderColor: accent }}>
        {/* Photo */}
        {photo && (
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-3" style={{ borderColor: accent }}>
              <ProfilePhoto
                src={photo}
                borderClass=""
                className="rounded-2xl"
              />
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="mb-7">
          <h2 className="text-[13px] font-bold uppercase tracking-wider mb-3 pb-2 border-b-2" style={{ color: accent, borderColor: accent }}>
            Contact
          </h2>
          <div className="space-y-2.5 text-[11px] text-gray-700">
            {resumeData.personalInfo.email && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="text-[11px] text-gray-700 break-words"
                  as="p"
                />
              ) : (
                <p className="break-words">{resumeData.personalInfo.email}</p>
              )
            )}
            {resumeData.personalInfo.phone && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="text-[11px] text-gray-700"
                  as="p"
                />
              ) : (
                <p>{resumeData.personalInfo.phone}</p>
              )
            )}
            {resumeData.personalInfo.location && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="text-[11px] text-gray-700"
                  as="p"
                />
              ) : (
                <p>{resumeData.personalInfo.location}</p>
              )
            )}
          </div>
        </div>

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-7">
            <h2 className="text-[13px] font-bold uppercase tracking-wider mb-3 pb-2 border-b-2" style={{ color: accent, borderColor: accent }}>
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
                      className="text-[12px] font-bold text-gray-900 block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[11px] text-gray-600 block mt-0.5"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[10.5px] text-gray-600 block mt-1"
                      as="p"
                    />
                    <div className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1">
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
                    <h3 className="text-[12px] font-bold text-gray-900">
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-[11px] text-gray-600 mt-0.5">{edu.field}</p>
                    )}
                    <p className="text-[10.5px] text-gray-600 mt-1">{edu.school}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
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
            <h2 className="text-[13px] font-bold uppercase tracking-wider mb-3 pb-2 border-b-2" style={{ color: accent, borderColor: accent }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <span className="inline-block text-[10.5px] font-medium px-2.5 py-1 rounded-md mb-2 mr-2" style={{ backgroundColor: accentLight, color: accent }}>
                    {skill.name}
                  </span>
                )}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <span key={skill.id} className="inline-block text-[10.5px] font-medium px-2.5 py-1 rounded-md" style={{ backgroundColor: accentLight, color: accent }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Main Content - 70% */}
      <div className="w-[70%] p-10">
        {/* Header */}
        <div className="mb-8">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-[44px] font-bold mb-2 tracking-tight"
              as="h1"
              style={{ color: accent }}
            />
          ) : (
            <h1 className="text-[44px] font-bold mb-2 tracking-tight" style={{ color: accent }}>
              {resumeData.personalInfo.fullName}
            </h1>
          )}

          {resumeData.personalInfo.title && (
            editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-[17px] font-medium text-gray-700 uppercase tracking-wide"
                as="p"
              />
            ) : (
              <p className="text-[17px] font-medium text-gray-700 uppercase tracking-wide">
                {resumeData.personalInfo.title}
              </p>
            )
          )}

          <div className="mt-4 w-20 h-1 rounded-full" style={{ backgroundColor: accent }} />
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold uppercase tracking-wider mb-3 text-gray-900">
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

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold uppercase tracking-wider mb-5 text-gray-900">
              Work Experience
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
                      <div className="text-[11px] font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: accentLight, color: accent }}>
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
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="pb-6 border-b border-gray-200 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-[14.5px] font-bold text-gray-900">
                          {exp.position}
                        </h3>
                        <p className="text-[13px] font-semibold mt-1" style={{ color: accent }}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-[11px] font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: accentLight, color: accent }}>
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
                  className="text-[15px] font-bold uppercase tracking-wider mb-3 text-gray-900"
                  as="h2"
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
              <h2 className="text-[15px] font-bold uppercase tracking-wider mb-3 text-gray-900">
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
