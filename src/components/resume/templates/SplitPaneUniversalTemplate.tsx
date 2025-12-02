import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface SplitPaneUniversalTemplateProps {
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

export const SplitPaneUniversalTemplate = ({
  resumeData,
  themeColor = "#10b981",
  editable = false,
}: SplitPaneUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#10b981";

  return (
    <div className="w-full h-full bg-white text-gray-900 flex text-[13px] leading-relaxed">
      {/* Left Pane - 40% */}
      <div className="w-[40%] p-10 bg-gray-50">
        <div className="mb-8">
          <h1 className="text-[28px] font-bold mb-2" style={{ color: accent }}>{resumeData.personalInfo.fullName}</h1>
          <p className="text-[14px] text-gray-700 mb-4">{resumeData.personalInfo.title || "Professional Title"}</p>
          <div className="space-y-2 text-[12px] text-gray-600">
            {resumeData.personalInfo.email && <p>{resumeData.personalInfo.email}</p>}
            {resumeData.personalInfo.phone && <p>{resumeData.personalInfo.phone}</p>}
            {resumeData.personalInfo.location && <p>{resumeData.personalInfo.location}</p>}
          </div>
        </div>

        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-4" style={{ color: accent }}>Skills</h2>
            <div className="space-y-2">
              {resumeData.skills.map((skill, idx) => <div key={idx} className="text-[12px] text-gray-900">{skill.name}</div>)}
            </div>
          </div>
        )}

        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-[15px] font-bold mb-4" style={{ color: accent }}>Education</h2>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="mb-4 last:mb-0 text-[12px]">
                <h3 className="font-semibold text-gray-900 mb-1">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p className="text-gray-700 mb-1">{edu.school}</p>
                <p className="text-gray-600 text-[11px]">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Pane - 60% */}
      <div className="w-[60%] p-10">
        {resumeData.personalInfo.summary && (
          <div className="mb-10">
            <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>Professional Summary</h2>
            <p className="text-[13px] text-gray-700 leading-[1.7]">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {resumeData.experience && resumeData.experience.length > 0 && (
          <div>
            <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="mb-2">
                  <h3 className="text-[14px] font-semibold text-gray-900">{exp.position}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-[13px] text-gray-700">{exp.company}</p>
                    <p className="text-[11px] text-gray-600">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                  </div>
                </div>
                <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                  {(exp.description || "").split("\n").filter(Boolean).map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
