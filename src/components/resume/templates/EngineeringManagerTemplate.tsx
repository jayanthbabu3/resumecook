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

export const EngineeringManagerTemplate = ({ resumeData, themeColor = "#374151", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#374151";
  const accentLight = withOpacity(accent, "10");
  const accentBorder = withOpacity(accent, "25");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter',sans-serif] text-gray-900">
      {/* Header Section - Management professional style */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-12 pt-11 pb-9">
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 mb-4 text-[10px] font-bold uppercase tracking-widest bg-white/20 rounded-md">
                Engineering Leadership
              </div>
              <h1 className="text-[38px] font-bold tracking-tight mb-2">
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
              <p className="text-[16px] font-semibold mb-5 text-gray-300">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    placeholder="Engineering Manager | Team Leadership | Technical Delivery"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.title
                )}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-gray-300">
                {(resumeData.personalInfo.email || editable) && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-white" />
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
                    <Phone className="w-4 h-4 text-white" />
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
                    <MapPin className="w-4 h-4 text-white" />
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
            <ProfilePhoto src={photo} size="xl" borderClass="border-4 border-white" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-10">
        {/* Leadership Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-10">
            <h2 className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-wider pb-3 border-b-2" style={{ borderColor: accent }}>
              Leadership Summary
            </h2>
            <p className="text-[14px] text-gray-700 leading-[1.85]">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  placeholder="Engineering Manager with 10+ years building and leading high-performing engineering teams. Expert in team development, technical delivery, and organizational growth. Led teams of 15+ engineers delivering critical products, improved team velocity by 50%, and established engineering best practices. Passionate about people development and technical excellence..."
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
            <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider pb-3 border-b-2" style={{ borderColor: accent }}>
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
                <div className="grid grid-cols-3 gap-3">
                  {resumeData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="px-4 py-2.5 text-[12.5px] font-medium text-center rounded-md"
                      style={{
                        backgroundColor: accentLight,
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
            <h2 className="text-[15px] font-bold mb-6 text-gray-900 uppercase tracking-wider pb-3 border-b-2" style={{ borderColor: accent }}>
              Professional Experience
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience || []}
                defaultItem={{
                  position: "Engineering Manager",
                  company: "Tech Company",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "• Led team of 12 engineers across 3 product lines, exceeding delivery goals by 30%\n• Improved team retention to 95% through mentorship and career development\n• Established agile practices reducing cycle time from 4 weeks to 1 week",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-7 last:mb-0">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            placeholder="Management Position Title"
                            as="span"
                          />
                        </h3>
                        <p className="text-[14px] font-semibold mt-1.5" style={{ color: accent }}>
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            placeholder="Company Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div className="text-[11.5px] font-semibold whitespace-nowrap ml-4 px-4 py-2 rounded-md bg-gray-100 text-gray-700">
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
                    <div className="text-[13.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        placeholder="• Team leadership achievement with measurable impact\n• People development accomplishment\n• Delivery and process improvement results"
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
                <div key={index} className="mb-7 last:mb-0">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[14px] font-semibold mt-1.5" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <div className="text-[11.5px] font-semibold whitespace-nowrap ml-4 px-4 py-2 rounded-md bg-gray-100 text-gray-700">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-[13.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
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
            <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider pb-3 border-b-2" style={{ borderColor: accent }}>
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education || []}
                defaultItem={{
                  degree: "Bachelor of Science",
                  field: "Computer Science",
                  school: "University Name",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  id: Date.now().toString(),
                }}
                renderItem={(edu, index) => (
                  <div className="mb-4 last:mb-0 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-[14.5px] font-bold text-gray-900">
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
                    <h3 className="text-[14.5px] font-bold text-gray-900">{edu.degree}</h3>
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
              title: "Leadership & Development",
              content: "Certified Scrum Master (CSM)\nExecutive Leadership Program - Stanford GSB\nPublic Speaking: Engineering Leadership Conference 2023",
              id: Date.now().toString(),
            }}
            renderItem={(section, index) => (
              <div className="mb-10">
                <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider pb-3 border-b-2" style={{ borderColor: accent }}>
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
              <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider pb-3 border-b-2" style={{ borderColor: accent }}>
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
