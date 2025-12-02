import { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface MagazineLayoutUniversalTemplateProps {
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

export const MagazineLayoutUniversalTemplate = ({
  resumeData,
  themeColor = "#e11d48",
  editable = false,
}: MagazineLayoutUniversalTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#e11d48";

  return (
    <div className="w-full h-full bg-white text-gray-900 text-[13px] leading-relaxed">
      {/* Magazine-style header */}
      <div className="border-b-8 pb-6 mb-8 px-12 pt-12" style={{ borderColor: accent }}>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            {editable ? (
              <>
                <InlineEditableText path="personalInfo.fullName" value={resumeData.personalInfo.fullName} className="text-[42px] font-black mb-1 block uppercase tracking-tight" as="h1" />
                <InlineEditableText path="personalInfo.title" value={resumeData.personalInfo.title || "Professional Title"} className="text-[16px] font-semibold block uppercase tracking-wider" style={{ color: accent }} as="p" />
              </>
            ) : (
              <>
                <h1 className="text-[42px] font-black mb-1 uppercase tracking-tight">{resumeData.personalInfo.fullName}</h1>
                <p className="text-[16px] font-semibold uppercase tracking-wider" style={{ color: accent }}>{resumeData.personalInfo.title || "Professional Title"}</p>
              </>
            )}
          </div>
          <div className="text-[12px] text-gray-700 space-y-1 flex flex-col justify-end">
            {resumeData.personalInfo.email && <p>{resumeData.personalInfo.email}</p>}
            {resumeData.personalInfo.phone && <p>{resumeData.personalInfo.phone}</p>}
            {resumeData.personalInfo.location && <p>{resumeData.personalInfo.location}</p>}
          </div>
        </div>
      </div>

      <div className="px-12 pb-12">
        {resumeData.personalInfo.summary && (
          <div className="mb-10 grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <h2 className="text-[18px] font-black mb-3 uppercase tracking-wide" style={{ color: accent }}>Profile</h2>
              <p className="text-[13px] text-gray-700 leading-[1.7]">{resumeData.personalInfo.summary}</p>
            </div>
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div>
                <h2 className="text-[18px] font-black mb-3 uppercase tracking-wide" style={{ color: accent }}>Expertise</h2>
                <div className="space-y-2">
                  {resumeData.skills.map((skill, idx) => (
                    <div key={idx} className="text-[12px] font-medium text-gray-900">{skill.name}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-[18px] font-black mb-4 uppercase tracking-wide" style={{ color: accent }}>Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0 pb-6 border-b border-gray-200 last:border-0">
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="text-[14px] font-bold text-gray-900 uppercase">{exp.position}</h3>
                    <p className="text-[13px] font-semibold" style={{ color: accent }}>{exp.company}</p>
                  </div>
                  <p className="text-[11px] font-medium text-gray-600 uppercase">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</p>
                </div>
                <ul className="ml-5 list-disc space-y-1 text-[12.5px] text-gray-700 leading-[1.7]">
                  {(exp.description || "").split("\n").filter(Boolean).map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <h2 className="text-[18px] font-black mb-4 uppercase tracking-wide" style={{ color: accent }}>Education</h2>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <h3 className="text-[14px] font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                <p className="text-[13px] text-gray-700">{edu.school}</p>
                <p className="text-[11px] text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
