import type { ResumeData } from "@/types/resume";
import type { ResumeSection } from "@/types/resume";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDynamicSection } from "@/components/resume/InlineEditableDynamicSection";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { HelperSectionVariantRenderer } from "@/components/resume/HelperSectionVariantRenderer";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const AcademicAchieverTemplate = ({ resumeData, themeColor = "#2563eb", editable = false }: TemplateProps) => {
  const styles = SINGLE_COLUMN_CONFIG;
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  const renderDynamicSection = (section: ResumeSection, sectionIndex: number) => {
    if (!section.enabled) return null;

    if (editable) {
      const renderNonEditableContent = () => {
        return <HelperSectionVariantRenderer section={section} formatDate={formatDate} />;
      };

      return (
        <div key={section.id} style={{ pageBreakInside: 'avoid' }}>
          <InlineEditableDynamicSection
            section={section}
            sectionIndex={sectionIndex}
            formatDate={formatDate}
            renderNonEditable={renderNonEditableContent}
          />
        </div>
      );
    }

    return <HelperSectionVariantRenderer key={section.id} section={section} formatDate={formatDate} />;
  };

  return (
    <div className="w-full h-full bg-white p-12 text-gray-900" style={{ pageBreakAfter: 'auto' }}>
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2" style={{ borderColor: themeColor, pageBreakAfter: 'avoid', pageBreakInside: 'avoid' }}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            {editable ? (
              <>
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName || "Your Name"}
                  className="text-4xl font-bold mb-2 uppercase tracking-wide block"
                  style={{ color: themeColor }}
                  as="h1"
                />
                {resumeData.personalInfo.title && (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    className="text-xl text-gray-700 font-medium block"
                    as="p"
                  />
                )}
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide" style={{ color: themeColor }}>
                  {resumeData.personalInfo.fullName || "Your Name"}
                </h1>
                {resumeData.personalInfo.title && (
                  <p className="text-xl text-gray-700 font-medium">
                    {resumeData.personalInfo.title}
                  </p>
                )}
              </>
            )}
          </div>
          <ProfilePhoto src={photo} borderClass="border-2 border-gray-200" />
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
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
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
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
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
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
      </div>

      {/* Professional Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b pb-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
            Professional Summary
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-sm text-gray-700 leading-relaxed block"
              style={{
                fontSize: styles.itemDescription.size,
                lineHeight: styles.itemDescription.lineHeight,
                color: styles.itemDescription.color,
              }}
              multiline
              as="p"
            />
          ) : (
            <p 
              className="text-sm text-gray-700 leading-relaxed"
              style={{
                fontSize: styles.itemDescription.size,
                lineHeight: styles.itemDescription.lineHeight,
                color: styles.itemDescription.color,
              }}
            >
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      <InlineExperienceSection
        items={resumeData.experience}
        editable={editable}
        accentColor={themeColor}
        title="Professional Experience"
        className="mb-8"
        titleStyle={{
          fontSize: "1.125rem", // text-lg
          fontWeight: 700,
          marginBottom: "0.75rem", // mb-3
          textTransform: "uppercase",
          letterSpacing: "0.025em", // tracking-wide
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderColor: themeColor,
          paddingBottom: "0.5rem", // pb-2
          color: themeColor
        }}
      />

      {/* Education */}
      <InlineEducationSection
        items={resumeData.education}
        editable={editable}
        accentColor={themeColor}
        title="Education"
        className="mb-8"
        titleStyle={{
          fontSize: "1.125rem", // text-lg
          fontWeight: 700,
          marginBottom: "0.75rem", // mb-3
          textTransform: "uppercase",
          letterSpacing: "0.025em", // tracking-wide
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderColor: themeColor,
          paddingBottom: "0.5rem", // pb-2
          color: themeColor
        }}
      />

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b pb-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
            Skills
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill, index) =>
                skill.name && (
                  <span className="text-sm text-gray-700 font-medium">
                    {skill.name}{index < resumeData.skills.length - 1 ? " •" : ""}
                  </span>
                )
              }
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                skill.name && (
                  <span
                    key={skill.id}
                    className="text-sm text-gray-700 font-medium"
                  >
                    {skill.name}{index < resumeData.skills.length - 1 ? " •" : ""}
                  </span>
                )
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      <InlineCustomSections
        sections={resumeData.sections}
        editable={editable}
        accentColor={themeColor}
        containerClassName="mb-8"
        itemStyle={{
          fontSize: styles.itemDescription.size,
          lineHeight: styles.itemDescription.lineHeight,
          color: styles.itemDescription.color,
        }}
      />
    </div>
  );
};
