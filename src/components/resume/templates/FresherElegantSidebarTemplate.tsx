import type { ResumeData } from "@/types/resume";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";
import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherElegantSidebarTemplate = ({ resumeData, themeColor = "#9333ea", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  const certificationsIndex = resumeData.sections.findIndex(
    (section) => section.title?.toLowerCase().includes("certification"),
  );
  const certificationsSection =
    certificationsIndex >= 0 ? resumeData.sections[certificationsIndex] : undefined;

  return (
    <div className="w-full bg-white text-gray-900 flex" style={{ fontFamily: 'Inter' }}>
      {/* Left Sidebar (32%) - Elegant Gradient */}
      <div className="w-[32%] text-white p-8" style={{ background: `linear-gradient(180deg, ${themeColor} 0%, ${themeColor}dd 100%)` }}>
        {/* Photo */}
        {photo && (
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
              <ProfilePhoto src={photo} borderClass="" className="rounded-full" />
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="mb-8">
          <h2 className="text-[14px] font-bold mb-4 text-white uppercase tracking-wide pb-2 border-b border-white/30">
            Contact
          </h2>
          <div className="space-y-3 text-[12.5px] text-white/90">
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
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-4 text-white uppercase tracking-wide pb-2 border-b border-white/30">
              Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill) => (
                  <div className="mb-3 p-2 rounded bg-white/10">
                    <span className="text-[12.5px] text-white/90 font-medium">{skill.name}</span>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-3">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="p-2 rounded bg-white/10">
                    <span className="text-[12.5px] text-white/90 font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-4 text-white uppercase tracking-wide pb-2 border-b border-white/30">
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education}
                defaultItem={{
                  id: Date.now().toString(),
                  school: "University",
                  degree: "Degree",
                  field: "Field",
                  startDate: "2019-09",
                  endDate: "2023-05",
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div className="mb-4">
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-[13px] font-bold text-white block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[12px] text-white/80 block"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[12px] text-white/80 block"
                      as="p"
                    />
                    <div className="text-[11px] text-white/70 mt-1 flex items-center gap-1">
                      <InlineEditableDate
                        path={`education[${index}].startDate`}
                        value={edu.startDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                      <span> - </span>
                      <InlineEditableDate
                        path={`education[${index}].endDate`}
                        value={edu.endDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="space-y-4">
                {resumeData.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[13px] font-bold text-white">{edu.degree}</h3>
                    {edu.field && <p className="text-[12px] text-white/80">{edu.field}</p>}
                    <p className="text-[12px] text-white/80">{edu.school}</p>
                    <p className="text-[11px] text-white/70 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Certifications */}
        {certificationsSection && certificationsSection.items && certificationsSection.items.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[14px] font-bold mb-4 text-white uppercase tracking-wide pb-2 border-b border-white/30">
              Certifications
            </h2>
            <div className="space-y-2 text-[12px] text-white/80">
              {certificationsSection.items.map((item, index) =>
                editable ? (
                  <InlineEditableText
                    key={index}
                    path={`sections[${certificationsIndex}].items[${index}]`}
                    value={item}
                    className="block"
                    as="p"
                  />
                ) : (
                  <p key={index}>{item}</p>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Content (68%) */}
      <div className="w-[68%] p-8">
        {/* Header */}
        <div className="mb-8">
          {editable ? (
            <InlineEditableText
              path="personalInfo.fullName"
              value={resumeData.personalInfo.fullName || "Your Name"}
              className="text-[40px] font-bold mb-2 block"
              style={{ color: themeColor }}
              as="h1"
            />
          ) : (
            <h1 className="text-[40px] font-bold mb-2" style={{ color: themeColor }}>
              {resumeData.personalInfo.fullName || "Your Name"}
            </h1>
          )}
          {editable ? (
            <InlineEditableText
              path="personalInfo.title"
              value={resumeData.personalInfo.title || "Aspiring Professional"}
              className="text-[16px] text-gray-600 font-medium block"
              as="p"
            />
          ) : (
            <p className="text-[16px] text-gray-600 font-medium">
              {resumeData.personalInfo.title || "Aspiring Professional"}
            </p>
          )}
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-3 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
              Professional Profile
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

        {/* Projects / Custom Sections */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            Academic Projects & Activities
          </h2>
          <InlineCustomSections
            sections={resumeData.sections}
            editable={editable}
            accentColor={themeColor}
            containerClassName="space-y-5"
            itemStyle={{
              fontSize: "13px",
              lineHeight: 1.7,
              color: "#374151",
            }}
          />
        </div>

        {/* Experience */}
        <div className="mb-8">
          <InlineExperienceSection
            items={resumeData.experience}
            editable={editable}
            accentColor={themeColor}
            title="Professional Experience"
            className="space-y-5"
            renderHeader={(title) => (
              <h2
                className="text-[15px] font-bold mb-4 pb-2 border-b-2"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                {title}
              </h2>
            )}
          />
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor }}>
            Achievements & Awards
          </h2>
          <div className="space-y-2 text-[13px] text-gray-700">
            <p>• Academic achievement or recognition</p>
            <p>• Competition participation or award</p>
          </div>
        </div>
      </div>
    </div>
  );
};
