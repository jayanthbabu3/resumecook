import type { ResumeData } from "@/pages/Editor";
import type { ResumeSection } from "@/types/resume";
import { Mail, Phone, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableDynamicSection } from "@/components/resume/InlineEditableDynamicSection";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const ProfessionalTemplate = ({ resumeData, themeColor, editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  // Render a single dynamic section
  const renderDynamicSection = (section: ResumeSection, sectionIndex: number) => {
    if (!section.enabled) return null;

    const sectionData = section.data;

    // Render the non-editable version of the section content
    const renderNonEditableContent = () => {
      switch (sectionData.type) {
      case 'certifications':
        return sectionData.items.length > 0 ? (
          <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              {section.title}
            </h2>
            <div className="space-y-3">
              {sectionData.items.map((cert) => (
                <div key={cert.id} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{cert.name}</h3>
                      <p className="text-sm text-gray-700 font-semibold">{cert.issuer}</p>
                    </div>
                    <div className="text-xs text-gray-600">{formatDate(cert.date)}</div>
                  </div>
                  {cert.credentialId && (
                    <p className="text-xs text-gray-600">ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'languages':
        return sectionData.items.length > 0 ? (
          <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-2">
              {section.title}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {sectionData.items.map((lang) => (
                <div key={lang.id} className="text-sm text-gray-700">
                  <span className="font-semibold">{lang.language}</span>
                  <span className="text-gray-600"> - {lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return sectionData.items.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              {section.title}
            </h2>
            <div className="space-y-4">
              {sectionData.items.map((project) => (
                <div key={project.id} style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
                  {project.description && (
                    <p className="text-sm text-gray-700 leading-relaxed mt-1">{project.description}</p>
                  )}
                  {project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="text-xs text-gray-600">Tech:</span>
                      {project.techStack.map((tech, idx) => (
                        <span key={idx} className="text-xs text-gray-700 font-medium">
                          {tech}{idx < project.techStack.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'awards':
        return sectionData.items.length > 0 ? (
          <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              {section.title}
            </h2>
            <div className="space-y-3">
              {sectionData.items.map((award) => (
                <div key={award.id} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold text-gray-900">{award.title}</h3>
                    <div className="text-xs text-gray-600">{formatDate(award.date)}</div>
                  </div>
                  <p className="text-sm text-gray-700">{award.issuer}</p>
                  {award.description && (
                    <p className="text-sm text-gray-600 mt-1">{award.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'volunteer':
        return sectionData.items.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              {section.title}
            </h2>
            <div className="space-y-4">
              {sectionData.items.map((vol) => (
                <div key={vol.id} style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex justify-between items-baseline mb-2">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{vol.role}</h3>
                      <p className="text-sm text-gray-700 font-semibold">{vol.organization}</p>
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatDate(vol.startDate)} - {vol.current ? "Present" : formatDate(vol.endDate)}
                    </div>
                  </div>
                  {vol.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">{vol.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'portfolio':
        return sectionData.items.length > 0 ? (
          <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-2">
              {section.title}
            </h2>
            <div className="space-y-2">
              {sectionData.items.map((item) => (
                <div key={item.id} className="text-sm">
                  <span className="font-semibold text-gray-900">{item.platform}:</span>{" "}
                  <span className="text-gray-700">{item.url}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case 'custom':
        return sectionData.content ? (
          <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-2">
              {section.title}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {sectionData.content}
            </p>
          </div>
        ) : null;

        default:
          return null;
      }
    };

    // Render section header and content
    return (
      <div className="mb-8" style={{ pageBreakInside: 'avoid' }}>
        <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
          {editable ? (
            <InlineEditableText
              path={`dynamicSections[${sectionIndex}].title`}
              value={section.title}
              className="inline-block"
            />
          ) : (
            section.title
          )}
        </h2>
        {editable ? (
          <InlineEditableDynamicSection
            section={section}
            sectionIndex={sectionIndex}
            formatDate={formatDate}
            renderNonEditable={renderNonEditableContent}
          />
        ) : (
          renderNonEditableContent()
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white p-12 text-gray-900" style={{ pageBreakAfter: 'auto' }}>
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-gray-900" style={{ pageBreakAfter: 'avoid', pageBreakInside: 'avoid' }}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            {editable ? (
              <>
                <InlineEditableText
                  path="personalInfo.fullName"
                  value={resumeData.personalInfo.fullName || "Your Name"}
                  className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide block"
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
                <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
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
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-2" style={{ pageBreakAfter: 'avoid' }}>
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
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2" style={{ pageBreakAfter: 'avoid' }}>
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
                        className="text-sm text-gray-700 font-semibold block"
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
                        <span>Present</span>
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
                      <p className="text-sm text-gray-700 font-semibold">
                        {exp.company || "Company Name"}
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 text-right">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
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
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2" style={{ pageBreakAfter: 'avoid' }}>
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
                        className="text-sm text-gray-700 font-semibold block"
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
                      <p className="text-sm text-gray-700 font-semibold">
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
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-2" style={{ pageBreakAfter: 'avoid' }}>
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
      {resumeData.sections.map((section, index) => (
        <div key={section.id} className="mb-8" style={{ pageBreakInside: 'avoid' }}>
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-2" style={{ pageBreakAfter: 'avoid' }}>
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

      {/* Dynamic Sections (New Feature) */}
      {resumeData.dynamicSections && resumeData.dynamicSections.length > 0 && (
        <>
          {resumeData.dynamicSections
            .filter(section => section.enabled)
            .sort((a, b) => a.order - b.order)
            .map((section, index) => {
              // Find the actual index in the original array for proper path
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
