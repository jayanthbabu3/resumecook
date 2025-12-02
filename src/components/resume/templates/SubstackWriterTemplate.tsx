import type { ResumeData } from "@/pages/Editor";
import type { ResumeSection } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Twitter } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableDynamicSection } from "@/components/resume/InlineEditableDynamicSection";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { HelperSectionVariantRenderer } from "@/components/resume/HelperSectionVariantRenderer";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const SubstackWriterTemplate = ({ resumeData, themeColor = "#ff6719", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  // Type assertion for social links (future-proof)
  const personalInfoWithSocials = resumeData.personalInfo as any;

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
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
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

            {/* Contact Information */}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
              {resumeData.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" style={{ color: themeColor }} />
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
                  <Phone className="h-4 w-4" style={{ color: themeColor }} />
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
                  <MapPin className="h-4 w-4" style={{ color: themeColor }} />
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

            {/* Social Links Section */}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {personalInfoWithSocials.linkedin && (
                <a
                  href={personalInfoWithSocials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                  style={{ color: themeColor }}
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}
              {personalInfoWithSocials.github && (
                <a
                  href={personalInfoWithSocials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                  style={{ color: themeColor }}
                >
                  <Github className="h-4 w-4" />
                  <span className="font-medium">GitHub</span>
                </a>
              )}
              {personalInfoWithSocials.website && (
                <a
                  href={personalInfoWithSocials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                  style={{ color: themeColor }}
                >
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">Portfolio</span>
                </a>
              )}
              {personalInfoWithSocials.twitter && (
                <a
                  href={personalInfoWithSocials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                  style={{ color: themeColor }}
                >
                  <Twitter className="h-4 w-4" />
                  <span className="font-medium">Twitter</span>
                </a>
              )}
            </div>
          </div>
          <ProfilePhoto src={photo} borderClass="border-4" style={{ borderColor: themeColor }} />
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
              multiline
              as="p"
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wide border-b pb-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
            Professional Experience
          </h2>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={resumeData.experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Company Name",
                position: "Position Title",
                startDate: "2023-01",
                endDate: "2024-01",
                description: "Job description here",
                current: false,
              }}
              addButtonLabel="Add Experience"
              renderItem={(exp, index) => (
                <div style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <InlineEditableText
                        path={`experience[${index}].position`}
                        value={exp.position || "Position Title"}
                        className="text-base font-bold text-gray-900 block"
                        as="h3"
                      />
                      <InlineEditableText
                        path={`experience[${index}].company`}
                        value={exp.company || "Company Name"}
                        className="text-sm font-semibold block"
                        style={{ color: themeColor }}
                        as="p"
                      />
                    </div>
                    <div className="text-xs text-gray-600 text-right flex items-center gap-1">
                      <InlineEditableDate
                        path={`experience[${index}].startDate`}
                        value={exp.startDate}
                        formatDisplay={formatDate}
                        className="inline-block"
                      />
                      <span> - </span>
                      {exp.current ? (
                        <span className="font-semibold" style={{ color: themeColor }}>Present</span>
                      ) : (
                        <InlineEditableDate
                          path={`experience[${index}].endDate`}
                          value={exp.endDate}
                          formatDisplay={formatDate}
                          className="inline-block"
                        />
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <InlineEditableText
                      path={`experience[${index}].description`}
                      value={exp.description}
                      className="text-sm text-gray-700 leading-relaxed whitespace-pre-line block"
                      multiline
                      as="p"
                    />
                  )}
                </div>
              )}
            />
          ) : (
            <div className="space-y-5">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {exp.position || "Position Title"}
                      </h3>
                      <p className="text-sm font-semibold" style={{ color: themeColor }}>
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 text-right">
                      {formatDate(exp.startDate)} - {exp.current ? <span className="font-semibold" style={{ color: themeColor }}>Present</span> : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wide border-b pb-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
            Education
          </h2>
          {editable ? (
            <InlineEditableList
              path="education"
              items={resumeData.education}
              defaultItem={{
                id: Date.now().toString(),
                school: "School Name",
                degree: "Degree",
                field: "Field of Study",
                startDate: "2019-09",
                endDate: "2023-05",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree || "Degree"}
                          className="inline-block"
                        />
                        {edu.field && (
                          <>
                            {" in "}
                            <InlineEditableText
                              path={`education[${index}].field`}
                              value={edu.field}
                              className="inline-block"
                            />
                          </>
                        )}
                      </h3>
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school || "School Name"}
                        className="text-sm font-semibold block"
                        style={{ color: themeColor }}
                        as="p"
                      />
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
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
                </div>
              )}
            />
          ) : (
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.id} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-sm font-semibold" style={{ color: themeColor }}>
                        {edu.school || "School Name"}
                      </p>
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
                  <span className="inline-block px-3 py-1 mr-2 mb-2 rounded-full text-sm font-medium text-white" style={{ backgroundColor: themeColor }}>
                    {skill.name}
                  </span>
                )
              }
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                skill.name && (
                  <span
                    key={skill.id}
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: themeColor }}
                  >
                    {skill.name}
                  </span>
                )
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {resumeData.sections.map((section, index) => (
        <div key={section.id} className="mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b pb-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
            {editable ? (
              <InlineEditableText
                path={`sections[${index}].title`}
                value={section.title}
                className="inline-block"
              />
            ) : (
              section.title
            )}
          </h2>
          {editable ? (
            <InlineEditableText
              path={`sections[${index}].content`}
              value={section.content}
              className="text-sm text-gray-700 leading-relaxed whitespace-pre-line block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          )}
        </div>
      ))}

      {/* Dynamic Sections */}
      {resumeData.dynamicSections && Array.isArray(resumeData.dynamicSections) && resumeData.dynamicSections.length > 0 && (
        <>
          {resumeData.dynamicSections
            .filter(section => section.enabled)
            .sort((a, b) => a.order - b.order)
            .map((section, index) => {
              const actualIndex = resumeData.dynamicSections!.findIndex(s => s.id === section.id);
              return (
                <div key={section.id}>
                  {renderDynamicSection(section, actualIndex)}
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};
