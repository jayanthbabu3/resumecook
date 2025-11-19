import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface LinearProgressUniversalTemplateProps {
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

export const LinearProgressUniversalTemplate = ({
  resumeData,
  themeColor = "#10b981",
  editable = false,
}: LinearProgressUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#10b981";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-14 text-[13px] leading-relaxed">
      <div className="mb-10">
        <div className="h-1 mb-6" style={{ background: `linear-gradient(to right, ${accent} 0%, ${accent} 50%, #e5e7eb 50%, #e5e7eb 100%)` }}></div>
        {editable ? (
          <>
            <InlineEditableText path="personalInfo.fullName" value={resumeData.personalInfo.fullName} className="text-[34px] font-bold mb-2 block" as="h1" />
            <InlineEditableText path="personalInfo.title" value={resumeData.personalInfo.title || "Professional Title"} className="text-[14px] text-gray-700 block" style={{ color: accent }} as="p" />
          </>
        ) : (
          <>
            <h1 className="text-[34px] font-bold mb-2">{resumeData.personalInfo.fullName}</h1>
            <p className="text-[14px] text-gray-700" style={{ color: accent }}>{resumeData.personalInfo.title || "Professional Title"}</p>
          </>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-gray-600 mt-4">
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
        </div>
      </div>

      {resumeData.personalInfo.summary && (
        <div className="mb-10">
          <h2 className="text-[15px] font-bold mb-2" style={{ color: accent }}>Professional Summary</h2>
          <div className="h-0.5 mb-4" style={{ background: `linear-gradient(to right, ${accent} 0%, ${accent} 30%, #e5e7eb 30%, #e5e7eb 100%)` }}></div>
          <p className="text-[13px] text-gray-700 leading-[1.7]">{resumeData.personalInfo.summary}</p>
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-[15px] font-bold mb-2" style={{ color: accent }}>Work Experience</h2>
          <div className="h-0.5 mb-4" style={{ background: `linear-gradient(to right, ${accent} 0%, ${accent} 40%, #e5e7eb 40%, #e5e7eb 100%)` }}></div>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-[14px] font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-[11px] text-gray-600">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
              </div>
              <p className="text-[13px] text-gray-700 mb-2">{exp.company}</p>
              <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                {(exp.description || "").split("\n").filter(Boolean).map((point, i) => <li key={i}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-10">
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-[15px] font-bold mb-2" style={{ color: accent }}>Education</h2>
            <div className="h-0.5 mb-4" style={{ background: `linear-gradient(to right, ${accent} 0%, ${accent} 50%, #e5e7eb 50%, #e5e7eb 100%)` }}></div>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <h3 className="text-[14px] font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p className="text-[13px] text-gray-700">{edu.school}</p>
                <p className="text-[11px] text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div>
            <h2 className="text-[15px] font-bold mb-2" style={{ color: accent }}>Skills</h2>
            <div className="h-0.5 mb-4" style={{ background: `linear-gradient(to right, ${accent} 0%, ${accent} 50%, #e5e7eb 50%, #e5e7eb 100%)` }}></div>
            <div className="space-y-2">
              {resumeData.skills.map((skill, idx) => <div key={idx} className="text-[13px] text-gray-900">{skill.name}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
