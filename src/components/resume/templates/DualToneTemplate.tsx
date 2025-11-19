import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface DualToneTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const DualToneTemplate = ({
  resumeData,
  themeColor = "#10b981",
  editable = false,
}: DualToneTemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const accentLight = `${accent}15`;

  return (
    <div className="w-full h-full bg-white text-gray-900 flex">
      {/* Left Panel - Light Accent 40% */}
      <div className="w-[40%] p-8" style={{ backgroundColor: `${accent}08` }}>
        {/* Photo */}
        {photo && (
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-4 shadow-lg" style={{ borderColor: accent }}>
              <ProfilePhoto
                src={photo}
                borderClass=""
                className="rounded-2xl"
              />
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="mb-8">
          <h2 className="text-[14px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ borderColor: accent, color: accent }}>
            Contact
          </h2>
          <div className="space-y-3 text-[11.5px] text-gray-700">
            {resumeData.personalInfo.email && (
              <div className="break-words">
                <div className="font-semibold text-[10px] uppercase tracking-wide mb-0.5" style={{ color: accent }}>
                  Email
                </div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="text-[11.5px]"
                    as="p"
                  />
                ) : (
                  <p>{resumeData.personalInfo.email}</p>
                )}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div>
                <div className="font-semibold text-[10px] uppercase tracking-wide mb-0.5" style={{ color: accent }}>
                  Phone
                </div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="text-[11.5px]"
                    as="p"
                  />
                ) : (
                  <p>{resumeData.personalInfo.phone}</p>
                )}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div>
                <div className="font-semibold text-[10px] uppercase tracking-wide mb-0.5" style={{ color: accent }}>
                  Location
                </div>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="text-[11.5px]"
                    as="p"
                  />
                ) : (
                  <p>{resumeData.personalInfo.location}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ borderColor: accent, color: accent }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <div className="mb-3 p-2.5 rounded-lg bg-white shadow-sm">
                    <span className="text-[12px] font-medium text-gray-800 block">
                      {skill.name}
                    </span>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-3">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="p-2.5 rounded-lg bg-white shadow-sm">
                    <span className="text-[12px] font-medium text-gray-800 block">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-[14px] font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ borderColor: accent, color: accent }}>
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
                  <div className="mb-5 last:mb-0 p-3 rounded-lg bg-white shadow-sm">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-[12.5px] font-bold block"
                      as="h3"
                      style={{ color: accent }}
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[11.5px] text-gray-700 block mt-1"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[11px] text-gray-600 block mt-1"
                      as="p"
                    />
                    <div className="text-[10.5px] text-gray-500 mt-1 flex items-center gap-1">
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
                  <div key={index} className="p-3 rounded-lg bg-white shadow-sm">
                    <h3 className="text-[12.5px] font-bold" style={{ color: accent }}>
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-[11.5px] text-gray-700 mt-1">{edu.field}</p>
                    )}
                    <p className="text-[11px] text-gray-600 mt-1">{edu.school}</p>
                    <p className="text-[10.5px] text-gray-500 mt-1">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Panel - Main Content 60% */}
      <div className="w-[60%] p-10">
        {/* Header */}
        <div className="mb-8 pb-6 border-b-2" style={{ borderColor: accent }}>
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName}
              className="text-[42px] font-bold mb-2 tracking-tight"
              as="h1"
              style={{ color: accent }}
            />
          ) : (
            <h1
              className="text-[42px] font-bold mb-2 tracking-tight"
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
            <h2 className="text-[14px] font-bold uppercase tracking-wider mb-3 text-gray-900">
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

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold uppercase tracking-wider mb-5 text-gray-900">
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
                  <div className="mb-6 last:mb-0 p-4 rounded-lg bg-gray-50 border-l-4" style={{ borderColor: accent }}>
                    <div className="flex justify-between items-baseline mb-2">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[14.5px] font-bold text-gray-900"
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
                      className="text-[13px] font-semibold mb-2"
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
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50 border-l-4" style={{ borderColor: accent }}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-[14.5px] font-bold text-gray-900">
                        {exp.position}
                      </h3>
                      <div className="text-[11px] font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: accentLight, color: accent }}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </div>
                    </div>
                    <p className="text-[13px] font-semibold mb-2" style={{ color: accent }}>
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
                <InlineEditableText
                  path={`sections[${index}].title`}
                  value={section.title}
                  className="text-[14px] font-bold uppercase tracking-wider mb-4 text-gray-900"
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
              <h2 className="text-[14px] font-bold uppercase tracking-wider mb-4 text-gray-900">
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
