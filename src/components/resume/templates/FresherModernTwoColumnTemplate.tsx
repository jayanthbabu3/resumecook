import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";
import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherModernTwoColumnTemplate = ({ resumeData, themeColor = "#2563eb", editable = false }: TemplateProps) => {
  const styles = SINGLE_COLUMN_CONFIG;
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900 flex" style={{ fontFamily: 'Inter' }}>
      {/* Left Sidebar (35%) */}
      <div className="w-[35%] p-8" style={{ backgroundColor: `${themeColor}08` }}>
        {/* Photo */}
        {photo && (
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4" style={{ borderColor: themeColor }}>
              <ProfilePhoto src={photo} borderClass="" className="rounded-full" />
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
            Contact
          </h2>
          <div className="space-y-2 text-[12.5px] text-gray-700">
            {resumeData.personalInfo.email && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.email"
                  value={resumeData.personalInfo.email}
                  className="block break-words"
                />
              ) : (
                <p className="break-words">{resumeData.personalInfo.email}</p>
              )
            )}
            {resumeData.personalInfo.phone && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.phone"
                  value={resumeData.personalInfo.phone}
                  className="block"
                />
              ) : (
                <p>{resumeData.personalInfo.phone}</p>
              )
            )}
            {resumeData.personalInfo.location && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.location"
                  value={resumeData.personalInfo.location}
                  className="block"
                />
              ) : (
                <p>{resumeData.personalInfo.location}</p>
              )
            )}
          </div>
        </div>

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <div className="mb-2">
                    <span className="text-[12.5px] text-gray-800 font-medium">{skill.name}</span>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-2">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id}>
                    <span className="text-[12.5px] text-gray-800 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        <InlineEducationSection
          items={resumeData.education}
          editable={editable}
          accentColor={themeColor}
          title="Education"
          className="mb-6"
          titleStyle={{
            fontSize: "14px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.025em",
            marginBottom: "0.75rem",
            color: themeColor
          }}
        />

        {/* Custom Sections - Sidebar */}
        {/* Some sections might be better in sidebar if they are short lists, but for now keeping consistent with old template structure logic if possible,
            though old template iterated ALL sections in sidebar. Let's check if we should move main content sections to main area.
            The original template put ALL sections in sidebar. Let's keep them there for now using InlineCustomSections but styled for sidebar.
        */}
        <InlineCustomSections
          sections={resumeData.sections.filter(s => s.title !== "Projects")}
          editable={editable}
          accentColor={themeColor}
          path="sections"
          containerClassName="mb-6"
          renderHeader={(title) => (
            <h2 className="text-[14px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              {title}
            </h2>
          )}
          itemStyle={{ fontSize: "12.5px", color: "#374151", lineHeight: 1.6 }}
        />
      </div>

      {/* Right Main Content (65%) */}
      <div className="w-[65%] p-8">
        {/* Header */}
        <div className="mb-8">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName || "Your Name"}
              className="text-[38px] font-bold mb-2 block"
              style={{ color: themeColor }}
              as="h1"
            />
          ) : (
            <h1 className="text-[38px] font-bold mb-2" style={{ color: themeColor }}>
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
          )}
          {editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title || "Recent Graduate"}
              className="text-[16px] text-gray-600 block"
              as="p"
            />
          ) : (
            <p className="text-[16px] text-gray-600">
              {resumeData.personalInfo.title || "Recent Graduate"}
            </p>
          )}
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
            <h2 className="text-[15px] font-bold mb-3" style={{ color: themeColor }}>
              Career Objective
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

        {/* Projects - Filtered from sections */}
        <InlineCustomSections
          sections={resumeData.sections.filter(s => s.title === "Projects")}
          editable={editable}
          accentColor={themeColor}
          path="sections"
          containerClassName="mb-8"
          renderHeader={(title) => (
            <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              {title}
            </h2>
          )}
          // Special styling for projects in this template (box style)
          // Since InlineCustomSections renders a list, we can't easily wrap each item in a box unless we pass a custom renderItem.
          // However, for consistency with other "bullet point" updates, let's use the standard list view which is cleaner and supports bullets properly.
          // If box style is strictly required, we'd need a custom component or extending InlineCustomSections.
          // Given the requirement is to "fix issues" and "make it work", standard bullet list is safer and more functional.
        />

        {/* Experience/Internships */}
        <InlineExperienceSection
          items={resumeData.experience}
          editable={editable}
          accentColor={themeColor}
          title="Internships & Experience"
          className="mb-8"
          titleStyle={{
            fontSize: "15px",
            fontWeight: 700,
            marginBottom: "1rem",
            paddingBottom: "0.5rem",
            borderBottomWidth: "2px",
            borderBottomStyle: "solid",
            borderColor: themeColor,
            color: themeColor
          }}
        />
      </div>
    </div>
  );
};
