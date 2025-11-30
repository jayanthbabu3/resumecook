import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";

interface MonochromeElegantUniversalTemplateProps {
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

export const MonochromeElegantUniversalTemplate = ({
  resumeData,
  themeColor = "#374151",
  editable = false,
}: MonochromeElegantUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#374151";

  return (
    <div className="w-full h-full bg-white text-gray-900 px-12 py-10 text-[13px] leading-relaxed">
      <div className="mb-8 border-b border-gray-200 pb-6">
        {editable ? (
          <>
            <InlineEditableText path="personalInfo.fullName" value={resumeData.personalInfo.fullName} className="text-[34px] tracking-tight font-semibold mb-2 block" style={{ color: accent }} as="h1" />
            <InlineEditableText path="personalInfo.title" value={resumeData.personalInfo.title || "Professional Title"} className="text-[15px] uppercase tracking-[0.2em] text-gray-600 mb-4 block" as="p" />
          </>
        ) : (
          <>
            <h1 className="text-[34px] tracking-tight font-semibold mb-2" style={{ color: accent }}>{resumeData.personalInfo.fullName}</h1>
            <p className="text-[15px] uppercase tracking-[0.2em] text-gray-600 mb-4">{resumeData.personalInfo.title || "Professional Title"}</p>
          </>
        )}
        <div className="flex flex-wrap gap-x-8 gap-y-1 text-[12.5px] text-gray-600">
          {resumeData.personalInfo.email && (editable ? <InlineEditableText path="personalInfo.email" value={resumeData.personalInfo.email} className="inline-block" /> : <span>{resumeData.personalInfo.email}</span>)}
          {resumeData.personalInfo.phone && (editable ? <InlineEditableText path="personalInfo.phone" value={resumeData.personalInfo.phone} className="inline-block" /> : <span>{resumeData.personalInfo.phone}</span>)}
          {resumeData.personalInfo.location && (editable ? <InlineEditableText path="personalInfo.location" value={resumeData.personalInfo.location} className="inline-block" /> : <span>{resumeData.personalInfo.location}</span>)}
        </div>
      </div>

      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-[15px] tracking-[0.2em] text-gray-500 font-medium mb-3">PROFILE</h2>
          {editable ? <InlineEditableText path="personalInfo.summary" value={resumeData.personalInfo.summary} className="text-[13px] text-gray-700 leading-[1.8] block" multiline as="p" /> : <p className="text-[13px] text-gray-700 leading-[1.8]">{resumeData.personalInfo.summary}</p>}
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-[15px] tracking-[0.2em] text-gray-500 font-medium mb-5">EXPERIENCE</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-7 last:mb-0">
              <div className="flex justify-between gap-4 items-start mb-3">
                <div>
                  {editable ? (
                    <InlineEditableText path={`experience[${index}].position`} value={exp.position} className="text-[15px] font-semibold text-gray-900 block" as="h3" />
                  ) : (
                    <h3 className="text-[15px] font-semibold text-gray-900">{exp.position}</h3>
                  )}
                  {editable ? (
                    <InlineEditableText path={`experience[${index}].company`} value={exp.company} className="text-[13px] text-gray-700 block" as="p" />
                  ) : (
                    <p className="text-[13px] text-gray-700">{exp.company}</p>
                  )}
                </div>
                <p className="text-[11.5px] text-gray-500 whitespace-nowrap">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
              </div>
              {editable ? (
                <InlineEditableText
                  path={`experience[${index}].description`}
                  value={exp.description}
                  className="text-[12.5px] text-gray-700 leading-[1.8] block"
                  multiline
                  as="div"
                />
              ) : (
                <ul className="ml-5 list-disc space-y-1.5 text-[12.5px] text-gray-700 leading-[1.8]">
                  {(exp.description || "").split("\n").filter(Boolean).map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] tracking-[0.2em] text-gray-500 font-medium mb-4">EDUCATION</h2>
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="mb-4 last:mb-0">
              <div className="flex justify-between items-start">
                <div>
                  {editable ? (
                    <InlineEditableText path={`education[${idx}].degree`} value={edu.degree} className="text-[14px] font-semibold text-gray-900 block" as="h3" />
                  ) : (
                    <h3 className="text-[14px] font-semibold text-gray-900">{edu.degree}</h3>
                  )}
                  {edu.field && editable ? (
                    <InlineEditableText path={`education[${idx}].field`} value={edu.field} className="text-[13px] text-gray-700" />
                  ) : edu.field ? (
                    <p className="text-[13px] text-gray-700">in {edu.field}</p>
                  ) : null}
                  {editable ? (
                    <InlineEditableText path={`education[${idx}].school`} value={edu.school} className="text-[13px] text-gray-700" />
                  ) : (
                    <p className="text-[13px] text-gray-700">{edu.school}</p>
                  )}
                </div>
                <p className="text-[11.5px] text-gray-500 whitespace-nowrap">{edu.startDate} - {edu.endDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] tracking-[0.2em] text-gray-500 font-medium mb-4">SKILLS</h2>
          <div className="flex flex-wrap gap-2 text-[12px] uppercase tracking-wide text-gray-800">
            {resumeData.skills.map((skill, idx) => (
              editable ? (
                <InlineEditableText
                  key={skill.id || idx}
                  path={`skills[${idx}].name`}
                  value={skill.name}
                  className="px-2 py-1 bg-gray-100 rounded inline-block"
                />
              ) : (
                <span key={skill.id || idx} className="px-2 py-1 bg-gray-100 rounded">
                  {skill.name}
                </span>
              )
            ))}
          </div>
        </div>
      )}

      {resumeData.sections && resumeData.sections.length > 0 && (
        <div className="space-y-8">
          {resumeData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {editable ? (
                <InlineEditableText path={`sections[${sectionIndex}].title`} value={section.title} className="text-[15px] tracking-[0.2em] text-gray-500 font-medium mb-3 block" as="h2" />
              ) : (
                <h2 className="text-[15px] tracking-[0.2em] text-gray-500 font-medium mb-3">{section.title}</h2>
              )}
              {editable ? (
                <InlineEditableText
                  path={`sections[${sectionIndex}].content`}
                  value={section.content}
                  className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-line block"
                  multiline
                  as="div"
                />
              ) : (
                <div className="text-[13px] text-gray-700 leading-[1.8] whitespace-pre-line">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
