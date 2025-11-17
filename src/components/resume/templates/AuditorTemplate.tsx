import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface AuditorTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const AuditorTemplate = ({
  resumeData,
  themeColor = "#283593",
  editable = false,
}: AuditorTemplateProps) => {

  return (
    <div className="mx-auto bg-white p-12 font-sans text-gray-900">
      <div className="mb-6 border-l-4 pl-4" style={{ borderColor: themeColor }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="mb-1 text-3xl font-bold"
            as="h1"
            style={{ color: themeColor }}
          />
        ) : (
          <h1 className="mb-1 text-3xl font-bold" style={{ color: themeColor }}>
            {resumeData.personalInfo.fullName}
          </h1>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={resumeData.personalInfo.title}
            className="mb-2 text-lg font-semibold text-gray-700"
            as="h2"
          />
        ) : (
          <h2 className="mb-2 text-lg font-semibold text-gray-700">{resumeData.personalInfo.title}</h2>
        )}
        <p className="text-sm text-gray-600">
          {editable ? (
            <>
              {resumeData.personalInfo.email && (
                <>
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-sm text-gray-600 inline"
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
                    className="text-sm text-gray-600 inline"
                    as="span"
                  />
                  {" | "}
                </>
              )}
              {resumeData.personalInfo.location && (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="text-sm text-gray-600 inline"
                  as="span"
                />
              )}
            </>
          ) : (
            [resumeData.personalInfo.email, resumeData.personalInfo.phone, resumeData.personalInfo.location].filter(Boolean).join(" | ")
          )}
        </p>
      </div>

      {resumeData.personalInfo.summary && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide" style={{ color: themeColor }}>
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
            <p className="text-sm leading-relaxed text-gray-700">{resumeData.personalInfo.summary}</p>
          )}
        </div>
      )}

      {resumeData.experience.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide" style={{ color: themeColor }}>
            Professional Experience
          </h3>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={resumeData.experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Firm Name",
                position: "Auditor",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Conducted financial audits for clients with revenue up to $X million\nIdentified control weaknesses and recommended improvements\nReduced audit findings by X% through thorough risk assessment\nEnsured compliance with GAAP, GAAS, and SOX requirements",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div className="mb-4">
                  <div className="flex items-baseline justify-between">
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
                      <span>—</span>
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
                  <p className="text-sm text-gray-600 mb-2">
                    <InlineEditableText
                      path={`experience[${index}].company`}
                      value={exp.company}
                      className="text-sm text-gray-600 inline"
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
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <span className="text-xs text-gray-500">
                      {exp.startDate}—{exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
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

      {resumeData.education.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide" style={{ color: themeColor }}>
            Education
          </h3>
          {editable ? (
            <InlineEditableList
              path="education"
              items={resumeData.education}
              defaultItem={{
                id: Date.now().toString(),
                degree: "Bachelor of Science",
                school: "University",
                field: "Accounting",
                startDate: "2020-01",
                endDate: "2024-01",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div className="mb-3">
                  <h4 className="font-bold text-gray-900">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="font-bold text-gray-900 inline"
                      as="span"
                    />
                    {edu.field && (
                      <>
                        {" in "}
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="font-bold text-gray-900 inline"
                          as="span"
                        />
                      </>
                    )}
                  </h4>
                  <InlineEditableText
                    path={`education[${index}].school`}
                    value={edu.school}
                    className="text-sm text-gray-700"
                    as="p"
                  />
                </div>
              )}
            />
          ) : (
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <h4 className="font-bold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h4>
                  <p className="text-sm text-gray-700">{edu.school}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {resumeData.skills.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wide" style={{ color: themeColor }}>
            Technical Skills
          </h3>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill, index) => (
                <div className="text-sm text-gray-700">{skill.name}</div>
              )}
            />
          ) : (
            <div className="grid grid-cols-3 gap-x-6 gap-y-2">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="text-sm text-gray-700">
                  • {skill.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
            <div className="mb-6">
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="mb-2 text-sm font-bold uppercase tracking-wide"
                as="h3"
                style={{ color: themeColor }}
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
        resumeData.sections.map((section) => (
          <div key={section.id} className="mb-6">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide" style={{ color: themeColor }}>
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
  );
};
