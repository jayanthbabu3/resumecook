import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "../InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TemplateProps {
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

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const PrincipalSoftwareEngineerTemplate = ({ resumeData, themeColor = "#0f172a", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#0f172a";
  const accentLight = withOpacity(accent, "10");
  const accentBorder = withOpacity(accent, "25");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter',sans-serif] text-gray-900">
      {/* Header Section - Executive principal design */}
      <div className="border-b-[5px]" style={{ borderColor: accent }}>
        <div className="max-w-4xl mx-auto px-12 pt-12 pb-10">
          <div className="flex items-start justify-between gap-10">
            <div className="flex-1">
              <div className="inline-block px-5 py-2 mb-4 text-[10px] font-bold uppercase tracking-widest text-white rounded" style={{ backgroundColor: accent }}>
                Principal Engineer
              </div>
              <h1 className="text-[40px] font-bold tracking-tight text-gray-900 mb-3 leading-[1.1]">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.fullName"
                    value={resumeData.personalInfo.fullName}
                    placeholder="Your Name"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.fullName
                )}
              </h1>
              <p className="text-[16px] font-semibold mb-6 text-gray-700">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    placeholder="Technical Strategy | Architecture | Cross-Team Leadership"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.title
                )}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-x-7 gap-y-2.5 text-[12px] text-gray-600">
                {(resumeData.personalInfo.email || editable) && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" style={{ color: accent }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.email"
                        value={resumeData.personalInfo.email || ""}
                        placeholder="email@example.com"
                        as="span"
                      />
                    ) : (
                      <span>{resumeData.personalInfo.email}</span>
                    )}
                  </div>
                )}
                {(resumeData.personalInfo.phone || editable) && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" style={{ color: accent }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.phone"
                        value={resumeData.personalInfo.phone || ""}
                        placeholder="+1 (555) 000-0000"
                        as="span"
                      />
                    ) : (
                      <span>{resumeData.personalInfo.phone}</span>
                    )}
                  </div>
                )}
                {(resumeData.personalInfo.location || editable) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: accent }} />
                    {editable ? (
                      <InlineEditableText
                        path="personalInfo.location"
                        value={resumeData.personalInfo.location || ""}
                        placeholder="City, State"
                        as="span"
                      />
                    ) : (
                      <span>{resumeData.personalInfo.location}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <ProfilePhoto src={photo} size="xl" borderClass="border-[5px]" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-10">
        {/* Executive Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-10 p-6 border-l-[5px] bg-gray-50" style={{ borderColor: accent }}>
            <h2 className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-wider">
              Executive Summary
            </h2>
            <p className="text-[14px] text-gray-700 leading-[1.85]">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  placeholder="Principal Software Engineer with 15+ years driving technical strategy and architecture decisions across multiple engineering teams. Expert in distributed systems, cloud infrastructure, and organizational technical excellence. Led company-wide initiatives improving system reliability to 99.99% and reducing infrastructure costs by 50%. Passionate about mentoring engineers and fostering technical innovation..."
                  multiline
                  as="span"
                />
              ) : (
                resumeData.personalInfo.summary
              )}
            </p>
          </div>
        )}

        {/* Core Competencies */}
        {((resumeData.skills && resumeData.skills.length > 0) || editable) && (
          <div className="mb-10">
            <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider">
              Core Competencies
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills || []}
                  className="text-[13px]"
                />
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {resumeData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-2.5 text-[12px] font-semibold text-center rounded border-2"
                      style={{
                        borderColor: accent,
                        color: accent
                      }}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {((resumeData.experience && resumeData.experience.length > 0) || editable) && (
          <div className="mb-10">
            <h2 className="text-[15px] font-bold mb-6 text-gray-900 uppercase tracking-wider">
              Professional Experience
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience || []}
                defaultItem={{
                  position: "Principal Software Engineer",
                  company: "Tech Company",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "• Defined technical strategy for engineering organization of 200+ engineers\n• Architected distributed platform processing 100M+ events daily\n• Led cross-functional technical initiatives reducing time-to-market by 40%",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-8 last:mb-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-[16px] font-bold text-gray-900">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            placeholder="Principal Position Title"
                            as="span"
                          />
                        </h3>
                        <p className="text-[14px] font-semibold mt-1.5 text-gray-700">
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            placeholder="Company Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div className="text-[11.5px] font-bold whitespace-nowrap ml-4 px-4 py-2 rounded text-white" style={{ backgroundColor: accent }}>
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
                    <div className="text-[13.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap pl-5 border-l-2" style={{ borderColor: accentBorder }}>
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        placeholder="• Strategic initiative with organizational impact\n• Technical architecture decision with measurable results\n• Cross-team leadership and influence"
                        multiline
                        as="div"
                      />
                    </div>
                  </div>
                )}
                addButtonLabel="Add Experience"
              />
            ) : (
              resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-[16px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[14px] font-semibold mt-1.5 text-gray-700">{exp.company}</p>
                    </div>
                    <div className="text-[11.5px] font-bold whitespace-nowrap ml-4 px-4 py-2 rounded text-white" style={{ backgroundColor: accent }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-[13.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap pl-5 border-l-2" style={{ borderColor: accentBorder }}>
                    {exp.description}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Education */}
        {((resumeData.education && resumeData.education.length > 0) || editable) && (
          <div className="mb-10">
            <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider">
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education || []}
                defaultItem={{
                  degree: "Master of Science",
                  field: "Computer Science",
                  school: "University Name",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  id: Date.now().toString(),
                }}
                renderItem={(edu, index) => (
                  <div className="mb-4 last:mb-0 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900">
                        <InlineEditableText
                          path={`education[${index}].degree`}
                          value={edu.degree}
                          placeholder="Degree"
                          as="span"
                        />
                      </h3>
                      <p className="text-[13px] text-gray-600 mt-0.5">
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field || ""}
                          placeholder="Field of Study"
                          as="span"
                        />
                      </p>
                      <p className="text-[13.5px] font-medium text-gray-700 mt-0.5">
                        <InlineEditableText
                          path={`education[${index}].school`}
                          value={edu.school}
                          placeholder="School Name"
                          as="span"
                        />
                      </p>
                    </div>
                    <div className="text-[12px] text-gray-500 font-semibold whitespace-nowrap ml-4">
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
                addButtonLabel="Add Education"
              />
            ) : (
              resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0 flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-[15px] font-bold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-[13px] text-gray-600 mt-0.5">{edu.field}</p>}
                    <p className="text-[13.5px] font-medium text-gray-700 mt-0.5">{edu.school}</p>
                  </div>
                  <div className="text-[12px] text-gray-500 font-semibold whitespace-nowrap ml-4">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Custom Sections */}
        {editable ? (
          <InlineEditableList
            path="sections"
            items={resumeData.sections || []}
            defaultItem={{
              title: "Speaking & Publications",
              content: "Conference Speaker: AWS re:Invent 2023 - Distributed Systems at Scale\nPublished: 'Modern Architecture Patterns' - O'Reilly Media\nTechnical Advisory Board Member - Cloud Native Computing Foundation",
              id: Date.now().toString(),
            }}
            renderItem={(section, index) => (
              <div className="mb-10">
                <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider">
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    placeholder="Section Title"
                    as="span"
                  />
                </h2>
                <div className="text-[13.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap">
                  <InlineEditableText
                    path={`sections[${index}].content`}
                    value={section.content}
                    placeholder="Section content..."
                    multiline
                    as="div"
                  />
                </div>
              </div>
            )}
            addButtonLabel="Add Custom Section"
          />
        ) : (
          resumeData.sections &&
          resumeData.sections.map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider">
                {section.title}
              </h2>
              <div className="text-[13.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
