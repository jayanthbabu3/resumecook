import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { Globe, Linkedin, Github, Twitter, Mail, Phone, MapPin } from "lucide-react";

interface DribbbleShowcaseTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const normalizeHex = (color?: string) => {
  if (!color || !color.startsWith("#")) return undefined;
  if (color.length === 4) {
    const [_, r, g, b] = color;
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return color.slice(0, 7);
};

const withOpacity = (color: string | undefined, alpha: string) => {
  const normalized = normalizeHex(color);
  if (!normalized) return color;
  return `${normalized}${alpha}`;
};

export const DribbbleShowcaseTemplate = ({
  resumeData,
  themeColor = "#ea4c89",
  editable = false,
}: DribbbleShowcaseTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#ea4c89";
  const accentLight = withOpacity(accent, "15") ?? "#ea4c8915";
  const accentBorder = withOpacity(accent, "33") ?? "#ea4c8933";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 text-[13px] leading-relaxed">
      {/* Header with Name */}
      <div className="mb-6">
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="text-[34px] font-bold mb-2 block tracking-tight"
            style={{ color: accent }}
            as="h1"
          />
        ) : (
          <h1 className="text-[34px] font-bold mb-2 tracking-tight" style={{ color: accent }}>
            {resumeData.personalInfo.fullName}
          </h1>
        )}
      </div>

      {/* Contact Info & Social Links */}
      <div className="mb-8 pb-6 border-b-2" style={{ borderColor: accentBorder }}>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[12px]">
          {/* Left Column - Traditional Contact */}
          <div className="space-y-1.5">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="inline-block"
                  />
                ) : (
                  <span>{resumeData.personalInfo.email}</span>
                )}
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="inline-block"
                  />
                ) : (
                  <span>{resumeData.personalInfo.phone}</span>
                )}
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="inline-block"
                  />
                ) : (
                  <span>{resumeData.personalInfo.location}</span>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Social/Online Presence */}
          <div className="space-y-1.5">
            {resumeData.personalInfo.website && (
              <div className="flex items-center gap-2 text-gray-700">
                <Globe className="w-4 h-4" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.website"
                    value={resumeData.personalInfo.website}
                    className="inline-block"
                  />
                ) : (
                  <a href={resumeData.personalInfo.website} className="hover:underline">
                    {resumeData.personalInfo.website}
                  </a>
                )}
              </div>
            )}
            {resumeData.personalInfo.linkedin && (
              <div className="flex items-center gap-2 text-gray-700">
                <Linkedin className="w-4 h-4" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.linkedin"
                    value={resumeData.personalInfo.linkedin}
                    className="inline-block"
                  />
                ) : (
                  <a href={resumeData.personalInfo.linkedin} className="hover:underline">
                    {resumeData.personalInfo.linkedin}
                  </a>
                )}
              </div>
            )}
            {resumeData.personalInfo.github && (
              <div className="flex items-center gap-2 text-gray-700">
                <Github className="w-4 h-4" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.github"
                    value={resumeData.personalInfo.github}
                    className="inline-block"
                  />
                ) : (
                  <a href={resumeData.personalInfo.github} className="hover:underline">
                    {resumeData.personalInfo.github}
                  </a>
                )}
              </div>
            )}
            {resumeData.personalInfo.portfolio && (
              <div className="flex items-center gap-2 text-gray-700">
                <Globe className="w-4 h-4" style={{ color: accent }} />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.portfolio"
                    value={resumeData.personalInfo.portfolio}
                    className="inline-block"
                  />
                ) : (
                  <a href={resumeData.personalInfo.portfolio} className="hover:underline">
                    {resumeData.personalInfo.portfolio}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-[16px] font-bold mb-3 uppercase tracking-wider" style={{ color: accent }}>
            Professional Summary
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[13px] text-gray-700 leading-[1.8] block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[13px] text-gray-700 leading-[1.8]">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience Section */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider" style={{ color: accent }}>
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
              renderItem={(exp, index) => (
                <div className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position}
                        className="text-[14.5px] font-semibold text-gray-900 block mb-1"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company}
                        className="text-[13px] font-medium block"
                        style={{ color: accent }}
                        as="p"
                      />
                    </div>
                    <div className="text-right text-[11.5px] text-gray-600 ml-4">
                      <div className="flex items-center gap-1.5">
                        <InlineEditableDate
                          path={`experience[${index}].startDate`}
                          value={exp.startDate}
                          className="inline-block"
                        />
                        <span>-</span>
                        {exp.current ? (
                          <span className="font-medium">Present</span>
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
                      className="text-[12.5px] text-gray-700 leading-[1.8] mt-2 block"
                      multiline
                      as="div"
                    />
                  )}
                </div>
              )}
            />
          ) : (
            resumeData.experience.map((exp, index) => {
              const bulletPoints = (exp.description || "")
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean);

              return (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-[14.5px] font-semibold text-gray-900 mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-[13px] font-medium" style={{ color: accent }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right text-[11.5px] text-gray-600 ml-4">
                      <p>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                  </div>
                  {bulletPoints.length > 0 && (
                    <ul className="ml-5 list-disc space-y-1.5 text-[12.5px] text-gray-700 leading-[1.8] mt-2">
                      {bulletPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Education Section */}
      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider" style={{ color: accent }}>
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
                <div className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={`${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`}
                        className="text-[14px] font-semibold text-gray-900 block mb-1"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[13px] text-gray-700 block"
                        as="p"
                      />
                    </div>
                    <div className="text-right text-[11.5px] text-gray-600 ml-4">
                      <p>
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            />
          ) : (
            resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-[14px] font-semibold text-gray-900 mb-1">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-[13px] text-gray-700">{edu.school}</p>
                  </div>
                  <div className="text-right text-[11.5px] text-gray-600 ml-4">
                    <p>
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Skills Section */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider" style={{ color: accent }}>
            Skills
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 text-[12px] font-medium text-gray-900 rounded-md"
                  style={{ border: `1.5px solid ${accentBorder}`, backgroundColor: accentLight }}
                >
                  {skill.name}
                </span>
              )}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 text-[12px] font-medium text-gray-900 rounded-md"
                  style={{ border: `1.5px solid ${accentBorder}`, backgroundColor: accentLight }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections && resumeData.sections.length > 0 && (
        editable ? (
          <InlineEditableList
            path="sections"
            items={resumeData.sections}
            defaultItem={{
              id: Date.now().toString(),
              title: "New Section",
              content: "Section content here",
            }}
            addButtonLabel="Add Section"
            renderItem={(section, sectionIndex) => (
              <div className="mb-8">
                <InlineEditableText
                  path={`sections[${sectionIndex}].title`}
                  value={section.title}
                  className="text-[16px] font-bold mb-4 uppercase tracking-wider block"
                  style={{ color: accent }}
                  as="h2"
                />
                <InlineEditableText
                  path={`sections[${sectionIndex}].content`}
                  value={section.content}
                  className="text-[13px] text-gray-700 leading-[1.8] block"
                  multiline
                  as="div"
                />
              </div>
            )}
          />
        ) : (
          resumeData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider" style={{ color: accent }}>
                {section.title}
              </h2>
              <div className="text-[13px] text-gray-700 leading-[1.8]">
                {section.content.split("\n").map((line, i) => (
                  <p key={i} className="mb-1.5">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};
