import type { ResumeData } from "@/types/resume";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";


interface FoundationGraduateTemplateProps {
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

export const FoundationGraduateTemplate = ({
  resumeData,
  themeColor = "#1e40af",
  editable = false,
}: FoundationGraduateTemplateProps) => {
  const accent = normalizeHex(themeColor) ?? "#1e40af";
  const accentLight = withOpacity(accent, "15") ?? "#1e40af15";
  const accentBorder = withOpacity(accent, "33") ?? "#1e40af33";

  return (
    <div className="w-full h-full bg-white text-gray-900 p-12 text-[13px] leading-relaxed">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b-2" style={{ borderColor: accent }}>
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName}
            className="text-[32px] font-bold mb-3 block tracking-tight"
            style={{ color: accent }}
            as="h1"
          />
        ) : (
          <h1 className="text-[32px] font-bold mb-3 tracking-tight" style={{ color: accent }}>
            {resumeData.personalInfo.fullName}
          </h1>
        )}

        <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[12px] text-gray-600 mt-2">
          {resumeData.personalInfo.email && (
            editable ? (
              <InlineEditableText
                path="personalInfo.email"
                value={resumeData.personalInfo.email}
                className="inline-flex items-center gap-1.5"
              />
            ) : (
              <span className="flex items-center gap-1.5">{resumeData.personalInfo.email}</span>
            )
          )}
          {resumeData.personalInfo.phone && (
            editable ? (
              <InlineEditableText
                path="personalInfo.phone"
                value={resumeData.personalInfo.phone}
                className="inline-flex items-center gap-1.5"
              />
            ) : (
              <span className="flex items-center gap-1.5">{resumeData.personalInfo.phone}</span>
            )
          )}
          {resumeData.personalInfo.location && (
            editable ? (
              <InlineEditableText
                path="personalInfo.location"
                value={resumeData.personalInfo.location}
                className="inline-flex items-center gap-1.5"
              />
            ) : (
              <span className="flex items-center gap-1.5">{resumeData.personalInfo.location}</span>
            )
          )}
          {resumeData.personalInfo.linkedin && (
            editable ? (
              <InlineEditableText
                path="personalInfo.linkedin"
                value={resumeData.personalInfo.linkedin}
                className="inline-flex items-center gap-1.5"
              />
            ) : (
              <span className="flex items-center gap-1.5">{resumeData.personalInfo.linkedin}</span>
            )
          )}
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
      <InlineExperienceSection
        items={resumeData.experience}
        editable={editable}
        accentColor={accent}
        title="Professional Experience"
        className="mb-8"
        titleStyle={{
          fontSize: "16px",
          fontWeight: 700,
          marginBottom: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: accent
        }}
      />

      
      {/* Education Section */}
      <InlineEducationSection
        items={resumeData.education}
        editable={editable}
        accentColor={accent}
        title="Education"
        className="mb-8"
        titleStyle={{
          fontSize: "16px",
          fontWeight: 700,
          marginBottom: "1rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: accent
        }}
      />

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
      <InlineCustomSections
        sections={resumeData.sections}
        editable={editable}
        accentColor={accent}
        containerClassName="mb-8"
        itemStyle={{
          fontSize: SINGLE_COLUMN_CONFIG.itemDescription.size,
          lineHeight: SINGLE_COLUMN_CONFIG.itemDescription.lineHeight,
          color: SINGLE_COLUMN_CONFIG.itemDescription.color,
        }}
      />
    </div>
  );
};
