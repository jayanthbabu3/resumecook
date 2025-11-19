import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface BoldHeadlineTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const BoldHeadlineTemplate = ({
  resumeData,
  themeColor = "#dc2626",
  editable = false,
}: BoldHeadlineTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}10`;

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Bold Header Section */}
      <div className="bg-gray-900 text-white px-12 py-10">
        <div className="flex items-center justify-between gap-8">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[52px] font-black mb-3 tracking-tighter text-white"
                as="h1"
              />
            ) : (
              <h1 className="text-[52px] font-black mb-3 tracking-tighter text-white">
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[18px] font-bold tracking-wide uppercase mb-5"
                  as="p"
                  style={{ color: accent }}
                />
              ) : (
                <p className="text-[18px] font-bold tracking-wide uppercase mb-5" style={{ color: accent }}>
                  {resumeData.personalInfo.title}
                </p>
              )
            )}

            <div className="flex gap-6 text-[12px] text-gray-300">
              {resumeData.personalInfo.email && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-[12px] text-gray-300 inline"
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
                    className="text-[12px] text-gray-300 inline"
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
                    className="text-[12px] text-gray-300 inline"
                    as="span"
                  />
                ) : (
                  <span>{resumeData.personalInfo.location}</span>
                )
              )}
            </div>
          </div>

          {photo && (
            <div className="relative">
              <div className="absolute -bottom-2 -right-2 w-full h-full" style={{ backgroundColor: accent }} />
              <ProfilePhoto
                src={photo}
                borderClass="border-4 border-white"
                className="relative z-10"
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-6" style={{ backgroundColor: accentLight }}>
            <h2 className="text-[14px] font-black uppercase tracking-wider mb-3 text-gray-900">
              About Me
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[13px] text-gray-700 leading-[1.9] font-medium"
                as="p"
                multiline
              />
            ) : (
              <p className="text-[13px] text-gray-700 leading-[1.9] font-medium">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[16px] font-black uppercase tracking-wider mb-5 text-gray-900 pb-3 border-b-3" style={{ borderColor: accent }}>
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
                  <div className="mb-6 last:mb-0">
                    <div className="flex justify-between items-start mb-2">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[15px] font-bold text-gray-900"
                        as="h3"
                      />
                      <div className="text-[11px] font-bold px-4 py-2 text-white rounded-md" style={{ backgroundColor: accent }}>
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
                      className="text-[13px] font-bold mb-3"
                      as="p"
                      style={{ color: accent }}
                    />
                    {exp.description && (
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        className="text-[12.5px] text-gray-700 leading-[1.8]"
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
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[15px] font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <div className="text-[11px] font-bold px-4 py-2 text-white rounded-md" style={{ backgroundColor: accent }}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    <p className="text-[13px] font-bold mb-3" style={{ color: accent }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="list-disc ml-5 space-y-1.5 text-[12.5px] text-gray-700 leading-[1.8]">
                        {exp.description
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-10">
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2 className="text-[16px] font-black uppercase tracking-wider mb-5 text-gray-900 pb-3 border-b-3" style={{ borderColor: accent }}>
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
                        className="text-[13px] font-bold text-gray-900 block"
                        as="h3"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="text-[12px] font-semibold mt-0.5 block"
                          as="p"
                          style={{ color: accent }}
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[11.5px] text-gray-600 mt-1 block"
                        as="p"
                      />
                      <div className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
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
                        <p className="text-[12px] font-semibold mt-0.5" style={{ color: accent }}>
                          {edu.field}
                        </p>
                      )}
                      <p className="text-[11.5px] text-gray-600 mt-1">{edu.school}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
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
              <h2 className="text-[16px] font-black uppercase tracking-wider mb-5 text-gray-900 pb-3 border-b-3" style={{ borderColor: accent }}>
                Skills
              </h2>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <span className="inline-block text-[11.5px] font-bold px-4 py-2 rounded-md mr-2 mb-2 text-white" style={{ backgroundColor: accent }}>
                      {skill.name}
                    </span>
                  )}
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill) => (
                    <span key={skill.id} className="inline-block text-[11.5px] font-bold px-4 py-2 rounded-md text-white" style={{ backgroundColor: accent }}>
                      {skill.name}
                    </span>
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
                  className="text-[16px] font-black uppercase tracking-wider mb-4 text-gray-900 pb-3 border-b-3"
                  as="h2"
                  style={{ borderColor: accent }}
                />
                <InlineEditableText
                  path={`sections[${index}].content`}
                  value={section.content}
                  className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-line"
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
              <h2 className="text-[16px] font-black uppercase tracking-wider mb-4 text-gray-900 pb-3 border-b-3" style={{ borderColor: accent }}>
                {section.title}
              </h2>
              <div className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
