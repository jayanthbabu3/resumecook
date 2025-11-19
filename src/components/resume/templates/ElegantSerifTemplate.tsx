import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface ElegantSerifTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ElegantSerifTemplate = ({
  resumeData,
  themeColor = "#854d0e",
  editable = false,
}: ElegantSerifTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-white text-gray-900">
      {/* Centered Header with Photo */}
      <div className="text-center py-10 px-12 border-b-2 border-gray-200">
        {photo && (
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 shadow-lg" style={{ borderColor: accent }}>
              <ProfilePhoto
                src={photo}
                borderClass=""
                className="rounded-full"
              />
            </div>
          </div>
        )}

        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="text-[32px] font-serif font-bold mb-3 tracking-tight"
            as="h1"
            style={{ color: accent }}
          />
        ) : (
          <h1
            className="text-[32px] font-serif font-bold mb-3 tracking-tight"
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
              className="text-[15px] font-serif font-medium text-gray-600 uppercase tracking-widest mb-6"
              as="p"
            />
          ) : (
            <p className="text-[15px] font-serif font-medium text-gray-600 uppercase tracking-widest mb-6">
              {resumeData.personalInfo.title}
            </p>
          )
        )}

        {/* Ornamental Divider */}
        <div className="flex items-center justify-center gap-3 my-5">
          <div className="w-12 h-px bg-gray-300" />
          <div className="w-2 h-2 rotate-45 border-2" style={{ borderColor: accent }} />
          <div className="w-12 h-px bg-gray-300" />
        </div>

        {/* Contact Info - Elegant Centered */}
        <div className="flex justify-center gap-8 text-[12px] text-gray-600">
          {resumeData.personalInfo.email && (
            <div>
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
            <div>
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
            <div>
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

      <div className="px-16 py-10">
        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-10">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-16 h-px bg-gray-300" />
              <h2 className="text-[13px] font-serif font-bold uppercase tracking-widest" style={{ color: accent }}>
                Summary
              </h2>
              <div className="w-16 h-px bg-gray-300" />
            </div>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[13px] text-gray-700 leading-[2] text-center max-w-3xl mx-auto font-serif"
                as="p"
                multiline
              />
            ) : (
              <p className="text-[13px] text-gray-700 leading-[2] text-center max-w-3xl mx-auto font-serif">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-px bg-gray-300" />
              <h2 className="text-[13px] font-serif font-bold uppercase tracking-widest" style={{ color: accent }}>
                Experience
              </h2>
              <div className="w-16 h-px bg-gray-300" />
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
                  <div className="mb-8 last:mb-0 pb-8 last:pb-0 border-b border-gray-200 last:border-0">
                    <div className="text-center mb-4">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[15px] font-serif font-bold block mb-1"
                        as="h3"
                        style={{ color: accent }}
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-[13px] font-serif font-medium text-gray-700 block mb-2"
                        as="p"
                      />
                      <div className="text-[11px] font-serif text-gray-500 flex items-center justify-center gap-1">
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
                        className="text-[12.5px] text-gray-700 leading-[1.9] font-serif"
                        as="div"
                        multiline
                      />
                    )}
                  </div>
                )}
              />
            ) : (
              <div className="space-y-8">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="pb-8 border-b border-gray-200 last:border-0">
                    <div className="text-center mb-4">
                      <h3 className="text-[15px] font-serif font-bold mb-1" style={{ color: accent }}>
                        {exp.position}
                      </h3>
                      <p className="text-[13px] font-serif font-medium text-gray-700 mb-2">
                        {exp.company}
                      </p>
                      <p className="text-[11px] font-serif text-gray-500">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.description && (
                      <ul className="list-disc ml-6 space-y-2 text-[12.5px] text-gray-700 leading-[1.9] font-serif">
                        {exp.description
                          .split("\n")
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i} className="pl-2">{line}</li>
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
        <div className="grid grid-cols-2 gap-12">
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-gray-300" />
                <h2 className="text-[13px] font-serif font-bold uppercase tracking-widest" style={{ color: accent }}>
                  Education
                </h2>
                <div className="flex-1 h-px bg-gray-300" />
              </div>
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
                        className="text-[13px] font-serif font-bold block"
                        as="h3"
                        style={{ color: accent }}
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="text-[12px] font-serif text-gray-700 block mt-1"
                          as="p"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[11.5px] font-serif text-gray-600 block mt-1"
                        as="p"
                      />
                      <div className="text-[11px] font-serif text-gray-500 mt-1 flex items-center gap-1">
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
                      <h3 className="text-[13px] font-serif font-bold" style={{ color: accent }}>
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <p className="text-[12px] font-serif text-gray-700 mt-1">{edu.field}</p>
                      )}
                      <p className="text-[11.5px] font-serif text-gray-600 mt-1">{edu.school}</p>
                      <p className="text-[11px] font-serif text-gray-500 mt-1">
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
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-gray-300" />
                <h2 className="text-[13px] font-serif font-bold uppercase tracking-widest" style={{ color: accent }}>
                  Skills
                </h2>
                <div className="flex-1 h-px bg-gray-300" />
              </div>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rotate-45 border" style={{ borderColor: accent }} />
                      <span className="text-[12.5px] font-serif text-gray-700">
                        {skill.name}
                      </span>
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-3">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rotate-45 border" style={{ borderColor: accent }} />
                      <span className="text-[12.5px] font-serif text-gray-700">
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
              <div className="mt-10">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-16 h-px bg-gray-300" />
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    className="text-[13px] font-serif font-bold uppercase tracking-widest"
                    as="h2"
                    style={{ color: accent }}
                  />
                  <div className="w-16 h-px bg-gray-300" />
                </div>
                <InlineEditableText
                  path={`sections[${index}].content`}
                  value={section.content}
                  className="text-[12.5px] font-serif text-gray-700 leading-[1.9] whitespace-pre-line"
                  as="div"
                  multiline
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mt-10">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-16 h-px bg-gray-300" />
                <h2 className="text-[13px] font-serif font-bold uppercase tracking-widest" style={{ color: accent }}>
                  {section.title}
                </h2>
                <div className="w-16 h-px bg-gray-300" />
              </div>
              <div className="text-[12.5px] font-serif text-gray-700 leading-[1.9] whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
