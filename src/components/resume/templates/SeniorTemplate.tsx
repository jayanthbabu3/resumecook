import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";
import { CustomSectionsWrapper, TemplateSocialLinks, TemplateSummarySection } from "@/components/resume/shared";
import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";
import { useStyleOptionsWithDefaults } from "@/contexts/StyleOptionsContext";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const SeniorTemplate = ({ resumeData, themeColor = "#0f766e", editable = false }: TemplateProps) => {
  const markerColor = `${themeColor}33`;
  const photo = resumeData.personalInfo.photo;
  const accent = themeColor;
  const styleOptions = useStyleOptionsWithDefaults();
  const dividerStyle = styleOptions.getDividerStyle();

  return (
    <div className="w-full min-h-[297mm] bg-white font-sans flex" style={{ color: '#1a1a1a', fontSize: '13px', lineHeight: '1.6' }}>
      {/* Main Content */}
      <div className="w-[65%] px-12 py-10">
        <div className="pb-5 mb-7" style={{ borderBottom: `0.5px solid ${accent}` }}>
          {editable ? (
            <>
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[28px] font-semibold tracking-tight block"
                style={{ color: '#000000' }}
                as="h1"
              />
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-[14px] font-semibold block"
                style={{ color: accent }}
                as="p"
              />
            </>
          ) : (
            <>
              <h1 className="text-[28px] font-semibold tracking-tight" style={{ color: '#000000' }}>
                {resumeData.personalInfo.fullName}
              </h1>
              <p className="text-[14px] font-semibold" style={{ color: accent }}>
                {resumeData.personalInfo.title}
              </p>
            </>
          )}
          <div className="mt-4 flex flex-wrap gap-4 text-[13px]" style={{ color: '#1a1a1a' }}>
            {resumeData.personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="inline-block"
                  />
                ) : (
                  resumeData.personalInfo.phone
                )}
              </span>
            )}
            {resumeData.personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="inline-block"
                  />
                ) : (
                  resumeData.personalInfo.email
                )}
              </span>
            )}
            {resumeData.personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="inline-block"
                  />
                ) : (
                  resumeData.personalInfo.location
                )}
              </span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        <TemplateSummarySection
          resumeData={resumeData}
          editable={editable}
          themeColor={accent}
          title="Summary"
          className="mb-3"
          renderHeader={(title) => (
            <h2 
              className="text-[13px] font-semibold uppercase mb-3 pb-2"
              data-accent-color="true"
              style={{ borderBottom: `0.5px solid ${accent}`, color: accent }}
            >
              {styleOptions.formatHeader(title)}
            </h2>
          )}
        />

        {/* Social Links Section */}
        {(resumeData.includeSocialLinks || editable) && (
          <section className="mb-3">
            <h2 
              className="text-[13px] font-semibold uppercase mb-3 pb-2"
              data-accent-color="true"
              style={{ borderBottom: `0.5px solid ${accent}`, color: accent }}
            >
              {styleOptions.formatHeader('Connect With Me')}
            </h2>
            <TemplateSocialLinks
              resumeData={resumeData}
              editable={editable}
              themeColor={accent}
              showLabels={false}
            />
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section className="mb-3">
            <h2 
              className="text-[13px] font-semibold uppercase mb-3 pb-2"
              data-accent-color="true"
              style={{ borderBottom: `0.5px solid ${accent}`, color: accent }}
            >
              {styleOptions.formatHeader('Experience')}
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="relative pl-6 mb-6 last:mb-0">
                <span
                  className="absolute left-0 top-1 block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <div className="flex justify-between items-baseline gap-4">
                  <div>
                    <h3 className="text-[13px] font-semibold" style={{ color: '#000000' }}>
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          placeholder="Position"
                          as="span"
                        />
                      ) : (
                        exp.position
                      )}
                    </h3>
                    <p className="text-[13px] font-medium" style={{ color: '#1a1a1a' }}>
                      {editable ? (
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          placeholder="Company"
                          as="span"
                        />
                      ) : (
                        exp.company
                      )}
                    </p>
                  </div>
                  <div className="text-[13px] font-medium" style={{ color: '#6b7280' }}>
                    {editable ? (
                      <>
                        <InlineEditableDate
                          path={`experience[${index}].startDate`}
                          value={exp.startDate}
                          className="inline-block"
                        />
                        <span> - </span>
                        {exp.current ? (
                          <span>Present</span>
                        ) : (
                          <InlineEditableDate
                            path={`experience[${index}].endDate`}
                            value={exp.endDate || ""}
                            className="inline-block"
                          />
                        )}
                      </>
                    ) : (
                      `${formatDate(exp.startDate)} - ${exp.current ? "Present" : formatDate(exp.endDate)}`
                    )}
                  </div>
                </div>
                <ExperienceBulletPoints
                  experienceId={exp.id}
                  experienceIndex={index}
                  bulletPoints={exp.bulletPoints}
                  description={exp.description}
                  editable={editable}
                  bulletStyle={{ fontSize: '13px', color: '#1a1a1a', lineHeight: '1.7' }}
                />
              </div>
            ))}
          </section>
        )}

        {(resumeData.education.length > 0) || editable ? (
          <section className="mb-2">
            <InlineEducationSection
              items={resumeData.education || []}
              editable={editable}
              accentColor={accent}
              className="mb-2"
              renderHeader={(title) => (
                <h2 
                  className="text-[13px] font-semibold uppercase mb-3 pb-2"
                  data-accent-color="true"
                  style={{ borderBottom: `0.5px solid ${accent}`, color: accent }}
                >
                  {styleOptions.formatHeader(title)}
                </h2>
              )}
            />
          </section>
        ) : null}

        {/* Custom Sections */}
        <CustomSectionsWrapper
          sections={resumeData.sections || []}
          editable={editable}
          accentColor={accent}
          renderSectionHeader={(title, index, { EditableText }) => (
            <h2
              className="text-[13px] font-semibold uppercase mb-3 pb-2"
              data-accent-color="true"
              style={{ 
                borderBottom: `0.5px solid ${accent}`,
                color: accent,
                marginBottom: '12px'
              }}
            >
              <EditableText 
                className="inherit"
              />
            </h2>
          )}
          itemStyle={{ 
            fontSize: '13px', 
            color: '#1a1a1a', 
            lineHeight: '1.7' 
          }}
          sectionStyle={{ marginBottom: '12px' }}
        />
      </div>

      {/* Sidebar */}
      <aside
        className="w-[35%] px-8 py-10 text-white flex flex-col gap-7"
        style={{ backgroundColor: themeColor }}
      >
        {/* Photo Section */}
        <div className="flex flex-col items-center text-center">
          {photo ? (
            <ProfilePhoto
              src={photo}
              sizeClass="h-24 w-24"
              borderClass="border-4 border-white/40"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-semibold">
              {(resumeData.personalInfo.fullName || "").split(" ").map((part) => part[0]).join("") || "SE"}
            </div>
          )}
          <div className="mt-4 text-[11px]" style={{ color: 'white' }}>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary || "Driving technical excellence and shipping impactful products."}
                className="block text-center"
                placeholder="Add a professional summary..."
              />
            ) : (
              resumeData.personalInfo.summary || "Driving technical excellence and shipping impactful products."
            )}
          </div>
        </div>

        {/* Skills Section */}
        {(resumeData.skills.length > 0) || editable ? (
          <div className="mb-2">
            <h3 
              className="text-[12px] font-semibold uppercase text-white mb-2"
              data-accent-color="true"
              style={{ color: 'white' }}
            >
              {styleOptions.formatHeader('Skills & Tools')}
            </h3>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/15 border border-white/20">
                    {skill.name}
                  </span>
                )}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/15 border border-white/20"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </aside>
    </div>
  );
};
