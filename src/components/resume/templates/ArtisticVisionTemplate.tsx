import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ArtisticVisionTemplate = ({
  resumeData,
  themeColor = "#ec4899",
  editable = false,
}: TemplateProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    if (!year || !month) return date;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="w-full h-full bg-white text-gray-900 p-10 text-[13px] leading-relaxed">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2" style={{ borderColor: themeColor }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={personalInfo.fullName || "Your Name"}
            className="text-[32px] font-bold mb-2 block"
            style={{ color: themeColor }}
            as="h1"
          />
        ) : (
          <h1 className="text-[32px] font-bold mb-2" style={{ color: themeColor }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
        )}
        {personalInfo.title && (
          editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={personalInfo.title}
              className="text-[14px] text-gray-600 mb-4 font-light block"
              as="h2"
            />
          ) : (
            <h2 className="text-[14px] text-gray-600 mb-4 font-light">
              {personalInfo.title}
            </h2>
          )
        )}
        <div className="flex gap-6 text-[12px] text-gray-700">
          {personalInfo.email && (
            editable ? (
              <InlineEditableText
                path="personalInfo.email"
                value={personalInfo.email}
                className="inline-block"
              />
            ) : (
              <span>{personalInfo.email}</span>
            )
          )}
          {personalInfo.email && personalInfo.phone && <span>•</span>}
          {personalInfo.phone && (
            editable ? (
              <InlineEditableText
                path="personalInfo.phone"
                value={personalInfo.phone}
                className="inline-block"
              />
            ) : (
              <span>{personalInfo.phone}</span>
            )
          )}
          {personalInfo.location && (personalInfo.email || personalInfo.phone) && <span>•</span>}
          {personalInfo.location && (
            editable ? (
              <InlineEditableText
                path="personalInfo.location"
                value={personalInfo.location}
                className="inline-block"
              />
            ) : (
              <span>{personalInfo.location}</span>
            )
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Professional Summary
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={personalInfo.summary}
              className="text-[12.5px] text-gray-700 leading-[1.7] block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[12.5px] text-gray-700 leading-[1.7]">
              {personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
            Experience
          </h2>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={experience}
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
                <div className="mb-6 last:mb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="flex-1">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position || "Position Title"}
                        className="text-[15px] font-bold block"
                        style={{ color: themeColor }}
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company || "Company Name"}
                        className="text-[13px] font-semibold text-gray-700 block"
                        as="p"
                      />
                    </div>
                    <div className="text-[12px] text-gray-600 font-medium whitespace-nowrap flex items-center gap-1">
                      <InlineEditableDate
                        path={`experience[${index}].startDate`}
                        value={exp.startDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                      <span> - </span>
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
                      className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line block"
                      multiline
                      as="p"
                    />
                  )}
                </div>
              )}
            />
          ) : (
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold" style={{ color: themeColor }}>
                        {exp.position || "Position Title"}
                      </h3>
                      <p className="text-[13px] font-semibold text-gray-700">
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <span className="text-[12px] text-gray-600 font-medium whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div>
            <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={skills}
                renderSkill={(skill) =>
                  skill.name ? (
                    <div className="px-3 py-2 rounded text-[12px] font-medium text-center" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                      {skill.name}
                    </div>
                  ) : null
                }
              />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill) =>
                  skill.name ? (
                    <div key={skill.id} className="px-3 py-2 rounded text-[12px] font-medium text-center" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                      {skill.name}
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={education}
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
                  <div className="mb-4 last:mb-0">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree || "Degree"}
                      className="text-[14px] font-bold text-gray-900 block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[13px] text-gray-700 block"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school || "School Name"}
                      className="text-[13px] text-gray-600 italic block"
                      as="p"
                    />
                    <div className="text-[12px] text-gray-500 flex items-center gap-1">
                      <InlineEditableDate
                        path={`education[${index}].startDate`}
                        value={edu.startDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                      <span> - </span>
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
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4 last:mb-0">
                    <h3 className="text-[14px] font-bold text-gray-900">{edu.degree || "Degree"}</h3>
                    {edu.field && <p className="text-[13px] text-gray-700">{edu.field}</p>}
                    <p className="text-[13px] text-gray-600 italic">{edu.school || "School Name"}</p>
                    <span className="text-[12px] text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Additional Sections */}
      {sections && sections.length > 0 && sections.map((section) => (
        <div key={section.id} className="mt-8">
          <h2 className="text-[15px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            {section.title}
          </h2>
          {editable ? (
            <InlineEditableText
              path={`sections[${sections.indexOf(section)}].content`}
              value={section.content}
              className="text-[12.5px] text-gray-700 leading-[1.7] block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ArtisticVisionTemplate;
