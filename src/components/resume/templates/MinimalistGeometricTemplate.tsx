import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface MinimalistGeometricTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const MinimalistGeometricTemplate = ({
  resumeData,
  themeColor = "#6366f1",
  editable = false,
}: MinimalistGeometricTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}10`;

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12">
      {/* Geometric Header */}
      <div className="mb-10 relative">
        <div className="absolute top-0 left-0 w-24 h-24 opacity-10" style={{ backgroundColor: accent }}>
          <div className="absolute top-4 left-4 w-16 h-16 bg-white" />
        </div>

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[48px] font-light mb-2 tracking-tight text-gray-900"
                as="h1"
              />
            ) : (
              <h1 className="text-[48px] font-light mb-2 tracking-tight text-gray-900">
                {resumeData.personalInfo.fullName}
              </h1>
            )}

            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[15px] font-medium tracking-widest uppercase mb-6"
                  as="p"
                  style={{ color: accent }}
                />
              ) : (
                <p className="text-[15px] font-medium tracking-widest uppercase mb-6" style={{ color: accent }}>
                  {resumeData.personalInfo.title}
                </p>
              )
            )}

            {/* Contact - Minimal Inline */}
            <div className="flex flex-wrap gap-6 text-[11.5px] text-gray-600">
              {resumeData.personalInfo.email && (
                editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-[11.5px] inline"
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
                    className="text-[11.5px] inline"
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
                    className="text-[11.5px] inline"
                    as="span"
                  />
                ) : (
                  <span>{resumeData.personalInfo.location}</span>
                )
              )}
            </div>
          </div>

          {photo && (
            <div className="ml-8 relative">
              <div className="absolute -top-3 -right-3 w-full h-full border-2" style={{ borderColor: accent }} />
              <ProfilePhoto
                src={photo}
                borderClass=""
                className="relative z-10"
              />
            </div>
          )}
        </div>
      </div>

      {/* Summary with Geometric Accent */}
      {resumeData.personalInfo.summary && (
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-2" style={{ backgroundColor: accent }} />
            <h2 className="text-[13px] font-semibold uppercase tracking-widest text-gray-900">
              Profile
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[13px] text-gray-700 leading-[1.9] font-light"
              as="p"
              multiline
            />
          ) : (
            <p className="text-[13px] text-gray-700 leading-[1.9] font-light">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-2" style={{ backgroundColor: accent }} />
            <h2 className="text-[13px] font-semibold uppercase tracking-widest text-gray-900">
              Experience
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
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
                <div className="mb-8 last:mb-0">
                  <div className="grid grid-cols-[1fr_auto] gap-4 mb-3">
                    <div>
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[14px] font-semibold text-gray-900 block"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-[12.5px] font-medium mt-1 block"
                        as="p"
                        style={{ color: accent }}
                      />
                    </div>
                    <div className="text-right text-[11px] font-medium text-gray-500">
                      <div className="flex items-center gap-1">
                        <InlineEditableDate
                          path={`experience[${index}].startDate`}
                          value={exp.startDate}
                          className="inline-block"
                        />
                        <span> - </span>
                        {exp.current ? (
                          <span>Now</span>
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
                      className="text-[12.5px] text-gray-700 leading-[1.8] font-light"
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
                <div key={index}>
                  <div className="grid grid-cols-[1fr_auto] gap-4 mb-3">
                    <div>
                      <h3 className="text-[14px] font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-[12.5px] font-medium mt-1" style={{ color: accent }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right text-[11px] font-medium text-gray-500">
                      {exp.startDate} - {exp.current ? "Now" : exp.endDate}
                    </div>
                  </div>
                  {exp.description && (
                    <ul className="list-disc ml-5 space-y-2 text-[12.5px] text-gray-700 leading-[1.8] font-light">
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-12">
        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-2 h-2" style={{ backgroundColor: accent }} />
              <h2 className="text-[13px] font-semibold uppercase tracking-widest text-gray-900">
                Education
              </h2>
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
                      className="text-[13px] font-semibold text-gray-900 block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[12px] font-medium mt-0.5 block"
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
                    <div className="text-[10.5px] text-gray-500 mt-0.5 flex items-center gap-1">
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
                    <h3 className="text-[13px] font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-[12px] font-medium mt-0.5" style={{ color: accent }}>
                        {edu.field}
                      </p>
                    )}
                    <p className="text-[11.5px] text-gray-600 mt-1">{edu.school}</p>
                    <p className="text-[10.5px] text-gray-500 mt-0.5">
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
            <div className="flex items-center gap-4 mb-5">
              <div className="w-2 h-2" style={{ backgroundColor: accent }} />
              <h2 className="text-[13px] font-semibold uppercase tracking-widest text-gray-900">
                Skills
              </h2>
            </div>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <div className="mb-3 last:mb-0 flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
                    <span className="text-[12.5px] text-gray-700 font-light">
                      {skill.name}
                    </span>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-3">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
                    <span className="text-[12.5px] text-gray-700 font-light">
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
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2" style={{ backgroundColor: accent }} />
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title}
                  className="text-[13px] font-semibold uppercase tracking-widest text-gray-900"
                  as="h2"
                />
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <InlineEditableText
                path={`sections[${index}].content`}
                value={section.content}
                className="text-[12.5px] text-gray-700 leading-[1.8] font-light whitespace-pre-line"
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
            <div className="flex items-center gap-4 mb-4">
              <div className="w-2 h-2" style={{ backgroundColor: accent }} />
              <h2 className="text-[13px] font-semibold uppercase tracking-widest text-gray-900">
                {section.title}
              </h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="text-[12.5px] text-gray-700 leading-[1.8] font-light whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
