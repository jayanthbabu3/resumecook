import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface HealthcareTwoColumnTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const HealthcareTwoColumnTemplate = ({
  resumeData,
  themeColor = "#00695c",
  editable = false,
}: HealthcareTwoColumnTemplateProps) => {

  return (
    <div className="mx-auto bg-white font-sans text-gray-900">
      {/* Header Section */}
      <div className="p-8" style={{ backgroundColor: themeColor }}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="mb-2 text-4xl font-bold text-white"
                as="h1"
              />
            ) : (
              <h1 className="mb-2 text-4xl font-bold text-white">
                {resumeData.personalInfo.fullName}
              </h1>
            )}
            {editable ? (
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="mb-3 text-xl font-semibold text-white/90"
                as="h2"
              />
            ) : (
              <h2 className="mb-3 text-xl font-semibold text-white/90">
                {resumeData.personalInfo.title}
              </h2>
            )}
            <div className="text-sm text-white/80">
              {editable ? (
                <>
                  {resumeData.personalInfo.location && (
                    <>
                      <InlineEditableText
                        path="personalInfo.location"
                        value={resumeData.personalInfo.location}
                        className="text-sm text-white/80 inline"
                        as="span"
                      />
                      {" | "}
                    </>
                  )}
                  {resumeData.personalInfo.phone && (
                    <>
                      <InlineEditableText
                        path="personalInfo.phone"
                        value={resumeData.personalInfo.phone}
                        className="text-sm text-white/80 inline"
                        as="span"
                      />
                      {" | "}
                    </>
                  )}
                  {resumeData.personalInfo.email && (
                    <InlineEditableText
                      path="personalInfo.email"
                      value={resumeData.personalInfo.email}
                      className="text-sm text-white/80 inline"
                      as="span"
                    />
                  )}
                </>
              ) : (
                [resumeData.personalInfo.location, resumeData.personalInfo.phone, resumeData.personalInfo.email]
                  .filter(Boolean)
                  .join(" | ")
              )}
            </div>
          </div>
          {resumeData.personalInfo.photo && (
            <div className="ml-8">
              <ProfilePhoto src={resumeData.personalInfo.photo} sizeClass="h-32 w-32 border-4 border-white" />
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6 p-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <div>
              <h3
                className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-1"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Skills
              </h3>
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills}
                  renderSkill={(skill, index) => (
                    <div className="mb-2 text-sm text-gray-700">
                      • {skill.name}
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-2">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="text-sm text-gray-700">
                      • {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <div>
              <h3
                className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-1"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Education
              </h3>
              {editable ? (
                <InlineEditableList
                  path="education"
                  items={resumeData.education}
                  defaultItem={{
                    id: Date.now().toString(),
                    degree: "Degree",
                    school: "School Name",
                    field: "Field",
                    startDate: "2020-01",
                    endDate: "2024-01",
                  }}
                  addButtonLabel="Add Education"
                  renderItem={(edu, index) => (
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 text-sm">
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          className="font-bold text-gray-900 inline text-sm"
                          as="span"
                        />
                      </h4>
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-xs text-gray-700"
                        as="p"
                      />
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <InlineEditableDate
                          path={`education[${index}].startDate`}
                          value={edu.startDate}
                          className="inline-block"
                        />
                        <span>-</span>
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
                  {resumeData.education.map((edu) => (
                    <div key={edu.id}>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-gray-700">{edu.school}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Certifications */}
          {editable ? (
            <InlineEditableList
              path="sections"
              items={resumeData.sections.filter(s => s.title === "Certifications")}
              defaultItem={{
                id: Date.now().toString(),
                title: "Certifications",
                content: "BLS/ACLS - AHA\nEMR Certified\nState License",
              }}
              addButtonLabel="Add Certifications"
              renderItem={(section, index) => (
                <div>
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-1"
                    as="h3"
                    style={{ color: themeColor, borderColor: themeColor }}
                  />
                  <InlineEditableText
                    path={`sections[${index}].content`}
                    value={section.content}
                    className="text-xs text-gray-700"
                    as="div"
                    multiline
                  />
                </div>
              )}
            />
          ) : (
            resumeData.sections
              .filter(s => s.title === "Certifications")
              .map((section) => (
                <div key={section.id}>
                  <h3
                    className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-1"
                    style={{ color: themeColor, borderColor: themeColor }}
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.content.split("\n").map((line, idx) => (
                      <p key={idx} className="text-xs text-gray-700">
                        • {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <div>
              <h3
                className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-1"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Professional Summary
              </h3>
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  className="text-sm leading-relaxed text-gray-700"
                  as="p"
                  multiline
                />
              ) : (
                <p className="text-sm leading-relaxed text-gray-700">
                  {resumeData.personalInfo.summary}
                </p>
              )}
            </div>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <div>
              <h3
                className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-1"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Clinical Experience
              </h3>
              {editable ? (
                <InlineEditableList
                  path="experience"
                  items={resumeData.experience}
                  defaultItem={{
                    id: Date.now().toString(),
                    company: "Healthcare Facility",
                    position: "Position",
                    startDate: "2023-01",
                    endDate: "2024-01",
                    description: "Patient care responsibilities",
                    current: false,
                  }}
                  addButtonLabel="Add Experience"
                  renderItem={(exp, index) => (
                    <div>
                      <div className="mb-1 flex items-baseline justify-between">
                        <h4 className="font-bold text-gray-900">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            className="font-bold text-gray-900 inline"
                            as="span"
                          />
                        </h4>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <InlineEditableDate
                            path={`experience[${index}].startDate`}
                            value={exp.startDate}
                            className="inline-block"
                          />
                          <span> — </span>
                          {exp.current ? (
                            <span>Present</span>
                          ) : (
                            <InlineEditableDate
                              path={`experience[${index}].endDate`}
                              value={exp.endDate}
                              className="inline-block"
                            />
                          )}
                        </span>
                      </div>
                      <p className="text-sm italic text-gray-600 mb-2">
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-sm italic text-gray-600 inline"
                          as="span"
                        />
                      </p>
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        className="text-sm leading-relaxed text-gray-700"
                        as="div"
                        multiline
                      />
                    </div>
                  )}
                />
              ) : (
                <div className="space-y-4">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="mb-1 flex items-baseline justify-between">
                        <h4 className="font-bold text-gray-900">{exp.position}</h4>
                        <span className="text-xs text-gray-500">
                          {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <p className="text-sm italic text-gray-600 mb-2">{exp.company}</p>
                      <div>
                        {exp.description.split("\n").map((line, idx) => (
                          <p key={idx} className="mb-1 text-sm leading-relaxed text-gray-700">
                            • {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Custom Sections */}
          {editable ? (
            <InlineEditableList
              path="sections"
              items={resumeData.sections}
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
                    className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-1"
                    as="h3"
                    style={{ color: themeColor, borderColor: themeColor }}
                  />
                  <InlineEditableText
                    path={`sections[${index}].content`}
                    value={section.content}
                    className="text-sm text-gray-700"
                    as="div"
                    multiline
                  />
                </div>
              )}
            />
          ) : (
            resumeData.sections
              .filter(s => s.title !== "Certifications")
              .map((section) => (
                <div key={section.id}>
                  <h3
                    className="mb-3 text-sm font-bold uppercase tracking-wider border-b-2 pb-1"
                    style={{ color: themeColor, borderColor: themeColor }}
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.content.split("\n").map((line, idx) => (
                      <p key={idx} className="text-sm text-gray-700">
                        • {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};
