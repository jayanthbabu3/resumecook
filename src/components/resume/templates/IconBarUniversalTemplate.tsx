import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface IconBarUniversalTemplateProps {
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

export const IconBarUniversalTemplate = ({
  resumeData,
  themeColor = "#f59e0b",
  editable = false,
}: IconBarUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#f59e0b";

  return (
    <div className="w-full h-full bg-white text-gray-900 flex text-[13px] leading-relaxed">
      {/* Icon Bar - 3% */}
      <div className="w-[3%]" style={{ backgroundColor: accent }}></div>

      {/* Content - 97% */}
      <div className="w-[97%] p-12">
        <div className="mb-10">
          <h1 className="text-[34px] font-bold mb-2">{resumeData.personalInfo.fullName}</h1>
          <p className="text-[15px] text-gray-700 mb-4" style={{ color: accent }}>{resumeData.personalInfo.title || "Professional Title"}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[12px] text-gray-600">
            {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && <span>{resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && <span>{resumeData.personalInfo.location}</span>}
          </div>
        </div>

        {resumeData.personalInfo.summary && (
          <div className="mb-10">
            <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>Professional Summary</h2>
            <p className="text-[13px] text-gray-700 leading-[1.7]">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>Experience</h2>
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

        <div className="grid grid-cols-2 gap-10">
          {resumeData.education && resumeData.education.length > 0 && (
            <div>
              <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>Education</h2>
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
              <h2 className="text-[16px] font-bold mb-4" style={{ color: accent }}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, idx) => <span key={idx} className="text-[13px] text-gray-900">{skill.name}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
