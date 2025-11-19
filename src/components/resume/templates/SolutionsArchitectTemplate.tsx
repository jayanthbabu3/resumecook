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

export const SolutionsArchitectTemplate = ({ resumeData, themeColor = "#f97316", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#f97316";
  const accentLight = withOpacity(accent, "15");
  const accentBorder = withOpacity(accent, "30");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter',sans-serif] text-gray-900">
      {/* Header Section - Architecture professional design */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white opacity-80"></div>
        <div className="relative max-w-4xl mx-auto px-12 pt-11 pb-9 border-b-4" style={{ borderColor: accent }}>
          <div className="flex items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: accent }}>
                  <div className="w-6 h-6 border-2 border-white transform rotate-45"></div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Solutions Architecture</div>
                  <div className="text-[11px] font-semibold text-gray-500">Enterprise & Cloud</div>
                </div>
              </div>
              <h1 className="text-[38px] font-bold tracking-tight text-gray-900 mb-2">
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
              <p className="text-[16px] font-bold mb-5" style={{ color: accent }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    placeholder="Solutions Architect | Enterprise Architecture | Cloud Consulting"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.title
                )}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-gray-600">
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
            <ProfilePhoto src={photo} size="xl" borderClass="border-4 shadow-xl" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-10">
        {/* Professional Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-10">
            <div className="flex items-start gap-4">
              <div className="w-1 h-24 rounded-full mt-1" style={{ backgroundColor: accent }}></div>
              <div className="flex-1">
                <h2 className="text-[15px] font-bold mb-4 text-gray-900 uppercase tracking-wider">
                  Architecture Profile
                </h2>
                <p className="text-[14px] text-gray-700 leading-[1.85]">
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.summary"
                      value={resumeData.personalInfo.summary || ""}
                      placeholder="Solutions Architect with 12+ years designing enterprise-scale cloud architectures for Fortune 500 clients. Expert in AWS, Azure, and hybrid cloud solutions. Led 50+ successful architecture engagements, reducing client costs by an average of 35% while improving scalability and reliability. Passionate about translating business requirements into technical solutions..."
                      multiline
                      as="span"
                    />
                  ) : (
                    resumeData.personalInfo.summary
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Technical Expertise */}
        {((resumeData.skills && resumeData.skills.length > 0) || editable) && (
          <div className="mb-10">
            <h2 className="text-[15px] font-bold mb-5 text-gray-900 uppercase tracking-wider">
              Technical Expertise
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {editable ? (
                <InlineEditableSkills
                  path="skills"
                  skills={resumeData.skills || []}
                  className="text-[13px]"
                />
              ) : (
                <div className="flex flex-wrap gap-2.5">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2.5 text-[12.5px] font-semibold rounded-lg border-l-4"
                      style={{
                        backgroundColor: accentLight,
                        borderColor: accent,
                        color: accent
                      }}
                    >
                      {skill.name}
                    </span>
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
                  position: "Solutions Architect",
                  company: "Consulting Firm",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "• Architected cloud migration for Fortune 100 client, moving 200+ applications to AWS\n• Designed multi-region disaster recovery solution achieving 99.99% availability\n• Led technical discovery and design for enterprise clients totaling $10M+ in revenue",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-7 last:mb-0 border-l-4 pl-6" style={{ borderColor: accent }}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            placeholder="Architecture Position Title"
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
                      <div className="text-[11.5px] font-semibold whitespace-nowrap ml-4 px-4 py-2 rounded-full" style={{ backgroundColor: accent, color: "white" }}>
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
                    <div className="text-[13.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap">
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        placeholder="• Architecture solution with business impact\n• Client engagement achievement\n• Technical design with measurable results"
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
                <div key={index} className="mb-7 last:mb-0 border-l-4 pl-6" style={{ borderColor: accent }}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[14px] font-semibold mt-1.5" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <div className="text-[11.5px] font-semibold whitespace-nowrap ml-4 px-4 py-2 rounded-full" style={{ backgroundColor: accent, color: "white" }}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-[13.5px] text-gray-700 leading-[1.85] whitespace-pre-wrap">
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
              title: "Certifications",
              content: "AWS Certified Solutions Architect - Professional\nGoogle Cloud Professional Cloud Architect\nTOGAF 9 Certified Enterprise Architect",
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
