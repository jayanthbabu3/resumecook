import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const formatDate = (date: string) => {
  if (!date) {
    return "";
  }
  const parsed = new Date(date);
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

const splitLines = (text?: string | null) =>
  text
    ? text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

export const SeniorFrontendTemplate = ({
  resumeData,
  themeColor = "#2563eb",
  editable = false,
}: TemplateProps) => {
  const contactDetails = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location,
  ].filter((detail): detail is string => Boolean(detail));

  const additionalSections = resumeData.sections?.filter(
    (section) => section.title && section.content,
  );

  const skillNames = resumeData.skills
    .map((skill) => skill.name?.trim())
    .filter((name): name is string => Boolean(name));

  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-900 font-sans text-[13px] leading-relaxed">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-8 py-10">
        <header className="space-y-3 border-b pb-5" style={{ borderColor: themeColor }}>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName}
                  className="text-[30px] font-semibold tracking-tight text-slate-900 block"
                  as="h1"
                />
              ) : (
                <h1 className="text-[30px] font-semibold tracking-tight text-slate-900">
                  {resumeData.personalInfo.fullName}
                </h1>
              )}
              {resumeData.personalInfo.title && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-[13px] font-medium text-slate-600 block"
                    as="p"
                  />
                ) : (
                  <p className="text-[13px] font-medium text-slate-600">
                    {resumeData.personalInfo.title}
                  </p>
                )
              )}
            </div>
            {contactDetails.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-medium text-slate-600">
                {editable ? (
                  <>
                    {resumeData.personalInfo.email && (
                      <InlineEditableText
                        path="personalInfo.email"
                        value={resumeData.personalInfo.email}
                        className="inline-block"
                      />
                    )}
                    {resumeData.personalInfo.phone && (
                      <>
                        {resumeData.personalInfo.email && <span className="text-slate-300">|</span>}
                        <InlineEditableText
                          path="personalInfo.phone"
                          value={resumeData.personalInfo.phone}
                          className="inline-block"
                        />
                      </>
                    )}
                    {resumeData.personalInfo.location && (
                      <>
                        {(resumeData.personalInfo.email || resumeData.personalInfo.phone) && <span className="text-slate-300">|</span>}
                        <InlineEditableText
                          path="personalInfo.location"
                          value={resumeData.personalInfo.location}
                          className="inline-block"
                        />
                      </>
                    )}
                  </>
                ) : (
                  contactDetails.map((detail, idx) => (
                    <span key={`${detail}-${idx}`} className="flex items-center gap-2">
                      <span>{detail}</span>
                      {idx < contactDetails.length - 1 && <span className="text-slate-300">|</span>}
                    </span>
                  ))
                )}
              </div>
            )}
          </div>
        </header>

        {resumeData.personalInfo.summary && (
          <section className="space-y-2">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[12.5px] text-slate-800 leading-[1.7] block"
                multiline
                as="p"
              />
            ) : (
              <p className="text-[12.5px] text-slate-800 leading-[1.7]">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section className="space-y-4">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
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
                  description: "Job description here",
                  current: false,
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => {
                  const bulletPoints = splitLines(exp.description);
                  return (
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position || "Role"}
                          className="text-[13px] font-semibold text-slate-900 inline-block"
                        />
                        <div className="text-[11px] font-medium text-slate-600">
                          {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                        </div>
                      </div>
                      {exp.company && (
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-[12.5px] font-medium text-slate-700 block"
                          as="div"
                        />
                      )}
                      {exp.description && (
                        <InlineEditableText
                          path={`experience[${index}].description`}
                          value={exp.description}
                          className="text-[12.5px] text-slate-800 leading-[1.7] block"
                          multiline
                          as="div"
                        />
                      )}
                    </div>
                  );
                }}
              />
            ) : (
              <div className="space-y-4">
                {resumeData.experience.map((exp) => {
                  const bulletPoints = splitLines(exp.description);
                  return (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="text-[13px] font-semibold text-slate-900">
                          {exp.position || "Role"}
                        </div>
                        <div className="text-[11px] font-medium text-slate-600">
                          {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                        </div>
                      </div>
                      {exp.company && (
                        <div className="text-[12.5px] font-medium text-slate-700">
                          {exp.company}
                        </div>
                      )}
                      {bulletPoints.length > 0 && (
                        <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-slate-800 leading-[1.7]">
                          {bulletPoints.map((point, index) => (
                            <li key={`${exp.id}-point-${index}`}>{point.replace(/^•\s*/, "")}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {skillNames.length > 0 && (
          <section className="space-y-2">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <span className="inline">
                    <span className="text-[12.5px] text-slate-800 leading-[1.7]">
                      {skill.name}
                    </span>
                    {index < resumeData.skills.length - 1 && " • "}
                  </span>
                )}
              />
            ) : (
              <p className="text-[12.5px] text-slate-800 leading-[1.7]">
                {skillNames.join(" • ")}
              </p>
            )}
          </section>
        )}

        {additionalSections?.length ? (
          editable ? (
            <InlineEditableList
              path="sections"
              items={additionalSections}
              defaultItem={{
                id: Date.now().toString(),
                title: "New Section",
                content: "Section content here",
              }}
              addButtonLabel="Add Section"
              renderItem={(section, index) => (
                <section className="space-y-2">
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    className="text-[13px] font-semibold uppercase tracking-wide block"
                    style={{ color: themeColor }}
                    as="h2"
                  />
                  <InlineEditableText
                    path={`sections[${index}].content`}
                    value={section.content}
                    className="text-[12.5px] text-slate-800 leading-[1.7] block"
                    multiline
                    as="div"
                  />
                </section>
              )}
            />
          ) : (
            additionalSections.map((section) => (
              <section key={section.id} className="space-y-2">
                <h2
                  className="text-[13px] font-semibold uppercase tracking-wide"
                  style={{ color: themeColor }}
                >
                  {section.title}
                </h2>
                <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-slate-800 leading-[1.7]">
                  {splitLines(section.content).map((point, index) => (
                    <li key={`${section.id}-${index}`}>{point}</li>
                  ))}
                </ul>
              </section>
            ))
          )
        ) : null}

        {resumeData.education.length > 0 && (
          <section className="space-y-3">
            <h2
              className="text-[13px] font-semibold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education}
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
                  <div className="space-y-1">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree || "Degree"}
                      className="text-[13px] font-semibold text-slate-900 block"
                      as="div"
                    />
                    {edu.school && (
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[12.5px] font-medium text-slate-700 block"
                        as="div"
                      />
                    )}
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[12px] text-slate-700 block"
                        as="div"
                      />
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <div className="text-[11px] font-medium text-slate-600">
                        {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                      </div>
                    )}
                  </div>
                )}
              />
            ) : (
              <div className="space-y-3">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <div className="text-[13px] font-semibold text-slate-900">
                      {edu.degree || "Degree"}
                    </div>
                    {edu.school && (
                      <div className="text-[12.5px] font-medium text-slate-700">
                        {edu.school}
                      </div>
                    )}
                    {edu.field && (
                      <div className="text-[12px] text-slate-700">
                        {edu.field}
                      </div>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <div className="text-[11px] font-medium text-slate-600">
                        {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
