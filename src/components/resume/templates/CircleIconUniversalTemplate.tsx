import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface CircleIconUniversalTemplateProps {
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

export const CircleIconUniversalTemplate = ({
  resumeData,
  themeColor = "#8b5cf6",
  editable = false,
}: CircleIconUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#8b5cf6";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 text-[13px] leading-relaxed">
      <div className="mb-10">
        {editable ? (
          <>
            <InlineEditableText path="personalInfo.fullName" value={resumeData.personalInfo.fullName} className="text-[32px] font-bold mb-2 block" style={{ color: accent }} as="h1" />
            <InlineEditableText path="personalInfo.title" value={resumeData.personalInfo.title || "Professional Title"} className="text-[14px] text-gray-700 mb-5 block" as="p" />
          </>
        ) : (
          <>
            <h1 className="text-[32px] font-bold mb-2" style={{ color: accent }}>{resumeData.personalInfo.fullName}</h1>
            <p className="text-[14px] text-gray-700 mb-5">{resumeData.personalInfo.title || "Professional Title"}</p>
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
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: accent }}>S</div>
            <h2 className="text-[16px] font-bold" style={{ color: accent }}>Professional Summary</h2>
          </div>
          {editable ? <InlineEditableText path="personalInfo.summary" value={resumeData.personalInfo.summary} className="text-[13px] text-gray-700 leading-[1.7] block pl-13" multiline as="p" /> : <p className="text-[13px] text-gray-700 leading-[1.7] pl-13">{resumeData.personalInfo.summary}</p>}
        </div>
      )}

      {resumeData.experience && resumeData.experience.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: accent }}>E</div>
            <h2 className="text-[16px] font-bold" style={{ color: accent }}>Experience</h2>
          </div>
          <div className="pl-13">
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
        </div>
      )}

      {resumeData.education && resumeData.education.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: accent }}>E</div>
            <h2 className="text-[16px] font-bold" style={{ color: accent }}>Education</h2>
          </div>
          <div className="pl-13">
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <h3 className="text-[14px] font-semibold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p className="text-[13px] text-gray-700">{edu.school}</p>
                <p className="text-[11px] text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.skills && resumeData.skills.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: accent }}>S</div>
            <h2 className="text-[16px] font-bold" style={{ color: accent }}>Skills</h2>
          </div>
          <div className="pl-13 flex flex-wrap gap-2">
            {resumeData.skills.map((skill, idx) => <span key={idx} className="text-[13px] text-gray-900">{skill.name}</span>)}
          </div>
        </div>
      )}
    </div>
  );
};
