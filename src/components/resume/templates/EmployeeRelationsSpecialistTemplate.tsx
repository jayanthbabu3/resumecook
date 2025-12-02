import type { ResumeData } from "@/pages/Editor";
import type { ResumeSection } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Award } from "lucide-react";
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

export const EmployeeRelationsSpecialistTemplate = ({ resumeData, themeColor = "#f472b6", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;
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
    <div className="w-full h-full bg-white text-gray-900" style={{ pageBreakAfter: 'auto' }}>
      {/* Professional Header with Accent Bar */}
      <div className="w-full" style={{ backgroundColor: themeColor, height: '6px' }}></div>

      <div className="p-10">
        {/* Header Section */}
        <div className="mb-8" style={{ pageBreakAfter: 'avoid', pageBreakInside: 'avoid' }}>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              {editable ? (
                <>
                  <InlineEditableText
                    path="personalInfo.fullName"
                    value={resumeData.personalInfo.fullName || "Your Name"}
                    className="text-5xl font-bold mb-2 block"
                    style={{ color: themeColor }}
                    as="h1"
                  />
                  {resumeData.personalInfo.title && (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      className="text-2xl text-gray-600 font-light block mb-4"
                      as="p"
                    />
                  )}
                </>
              ) : (
                <>
                  <h1 className="text-5xl font-bold mb-2" style={{ color: themeColor }}>
                    {resumeData.personalInfo.fullName || "Your Name"}
                  </h1>
                  {resumeData.personalInfo.title && (
                    <p className="text-2xl text-gray-600 font-light mb-4">
                      {resumeData.personalInfo.title}
                    </p>
                  )}
                </>
              )}

              {/* Contact & Social Links */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
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

              {/* Social Links */}
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                {personalInfoWithSocials.linkedin && (
                  <a
                    href={personalInfoWithSocials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity font-medium"
                    style={{ color: themeColor }}
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {personalInfoWithSocials.github && (
                  <a
                    href={personalInfoWithSocials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity font-medium"
                    style={{ color: themeColor }}
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {personalInfoWithSocials.website && (
                  <a
                    href={personalInfoWithSocials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity font-medium"
                    style={{ color: themeColor }}
                  >
                    <Globe className="h-4 w-4" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
            <ProfilePhoto src={photo} size="xl" borderClass="border-4" style={{ borderColor: themeColor }} />
          </div>
        </div>

        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-5 bg-gray-50 rounded-lg border-l-4" style={{ borderLeftColor: themeColor, pageBreakInside: 'avoid' }}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: themeColor }}>
              <Award className="h-5 w-5" />
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

        {/* Professional Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-5 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
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
                  <div className="mb-6 pl-4 border-l-2" style={{ borderLeftColor: themeColor, pageBreakInside: 'avoid' }}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position || "Position Title"}
                          className="text-lg font-bold block"
                          style={{ color: themeColor }}
                          as="h3"
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company || "Company Name"}
                          className="text-base text-gray-900 font-semibold block"
                          as="p"
                        />
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-1 ml-4">
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
                        className="text-sm text-gray-700 leading-relaxed whitespace-pre-line block mt-2"
                        multiline
                        as="p"
                      />
                    )}
                  </div>
                )}
              />
            ) : (
              <div className="space-y-6">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="pl-4 border-l-2" style={{ borderLeftColor: themeColor, pageBreakInside: 'avoid' }}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold" style={{ color: themeColor }}>
                          {exp.position || "Position Title"}
                        </h3>
                        <p className="text-base text-gray-900 font-semibold">
                          {exp.company || "Company Name"}
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 ml-4">
                        {formatDate(exp.startDate)} - {exp.current ? <span className="font-semibold" style={{ color: themeColor }}>Present</span> : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line mt-2">
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
            <h2 className="text-xl font-bold mb-5 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
              Education & Credentials
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
                  <div className="mb-4" style={{ pageBreakInside: 'avoid' }}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
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
                          className="text-sm font-semibold block mt-1"
                          style={{ color: themeColor }}
                          as="p"
                        />
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-1 ml-4">
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
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-900">
                          {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                        </h3>
                        <p className="text-sm font-semibold mt-1" style={{ color: themeColor }}>
                          {edu.school || "School Name"}
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 ml-4">
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
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
              Core Skills & Competencies
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) =>
                  skill.name && (
                    <span className="inline-block px-4 py-2 mr-2 mb-2 rounded-md text-sm font-medium border-2"
                          style={{ borderColor: themeColor, color: themeColor }}>
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
                      className="inline-block px-4 py-2 rounded-md text-sm font-medium border-2"
                      style={{ borderColor: themeColor, color: themeColor }}
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
            <h2 className="text-xl font-bold mb-4 pb-2 border-b-2" style={{ color: themeColor, borderColor: themeColor, pageBreakAfter: 'avoid' }}>
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
    </div>
  );
};
