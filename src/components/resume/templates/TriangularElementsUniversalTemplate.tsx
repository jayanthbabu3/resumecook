import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface TriangularElementsUniversalTemplateProps {
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

export const TriangularElementsUniversalTemplate = ({
  resumeData,
  themeColor = "#7c3aed",
  editable = false,
}: TriangularElementsUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#7c3aed";
  const accentLight = withOpacity(accent, "15") ?? "#f5f5f5";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-14 text-[13px] leading-relaxed">
      <div className="mb-10">
        {editable ? (
          <>
            <InlineEditableText path="personalInfo.fullName" value={resumeData.personalInfo.fullName} className="text-[34px] font-bold mb-2 block" style={{ color: accent }} as="h1" />
            <InlineEditableText path="personalInfo.title" value={resumeData.personalInfo.title || "Professional Title"} className="text-[15px] text-gray-700 mb-5 block" as="p" />
          </>
        ) : (
          <>
            <h1 className="text-[34px] font-bold mb-2" style={{ color: accent }}>{resumeData.personalInfo.fullName}</h1>
            <p className="text-[15px] text-gray-700 mb-5">{resumeData.personalInfo.title || "Professional Title"}</p>
          </>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-gray-600">
          {resumeData.personalInfo.email && (editable ? <InlineEditableText path="personalInfo.email" value={resumeData.personalInfo.email} className="inline-block" /> : <span>{resumeData.personalInfo.email}</span>)}
          {resumeData.personalInfo.phone && (editable ? <InlineEditableText path="personalInfo.phone" value={resumeData.personalInfo.phone} className="inline-block" /> : <span>{resumeData.personalInfo.phone}</span>)}
          {resumeData.personalInfo.location && (editable ? <InlineEditableText path="personalInfo.location" value={resumeData.personalInfo.location} className="inline-block" /> : <span>{resumeData.personalInfo.location}</span>)}
        </div>
      </div>

      {resumeData.personalInfo.summary && (
        <div className="mb-10">
          <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>Professional Summary</h2>
          {editable ? <InlineEditableText path="personalInfo.summary" value={resumeData.personalInfo.summary} className="text-[13px] text-gray-700 leading-[1.7] block" multiline as="p" /> : <p className="text-[13px] text-gray-700 leading-[1.7]">{resumeData.personalInfo.summary}</p>}
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>Work Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <h3 className="text-[14px] font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-[13px] text-gray-700">{exp.company}</p>
                </div>
                <p className="text-[11px] text-gray-600">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
              </div>
              <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                {(exp.description || "").split("\n").filter(Boolean).map((point, i) => <li key={i}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>Education</h2>
          {resumeData.education.map((edu, idx) => (
            <div key={idx} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-[14px] font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p className="text-[13px] text-gray-700">{edu.school}</p>
                </div>
                <p className="text-[11px] text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && (
        <div>
          <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>Skills</h2>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills.map((skill, idx) => (
              <span key={idx} className="px-4 py-1.5 text-[12px] font-medium border-2 rounded" style={{ borderColor: accent, color: accent }}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {resumeData.sections && resumeData.sections.length > 0 && (
        <>
          {resumeData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mt-10">
              <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>{section.title}</h2>
              <div className="text-[13px] text-gray-700 leading-[1.7]">
                {section.content.split("\n").map((line, i) => <p key={i} className="mb-1">{line}</p>)}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
