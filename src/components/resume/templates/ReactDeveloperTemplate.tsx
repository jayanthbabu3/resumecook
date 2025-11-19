import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";
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

export const ReactDeveloperTemplate = ({ resumeData, themeColor = "#61DAFB", editable = false }: TemplateProps) => {
  const photo = resumeData.personalInfo.photo;
  const accent = normalizeHex(themeColor) ?? "#61DAFB";
  const accentLight = withOpacity(accent, "12");
  const accentMedium = withOpacity(accent, "30");

  return (
    <div className="w-full min-h-[297mm] bg-white font-['Inter',sans-serif] text-gray-900">
      {/* Header - React-inspired component design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${accentLight} 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, ${accentLight} 0%, transparent 50%)`
        }} />
        <div className="relative max-w-4xl mx-auto px-12 py-10 border-b-2" style={{ borderColor: accentMedium }}>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="inline-block mb-3">
                <div className="text-[11px] font-mono font-semibold px-3 py-1.5 rounded border-2"
                  style={{ borderColor: accent, color: accent }}>
                  &lt;Developer /&gt;
                </div>
              </div>
              <h1 className="text-[40px] font-bold tracking-tight mb-2">
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
              <p className="text-[16px] font-semibold mb-4" style={{ color: accent }}>
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.title"
                    value={resumeData.personalInfo.title}
                    placeholder="React Developer"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.title
                )}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-gray-600">
                {(resumeData.personalInfo.email || editable) && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
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
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
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
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
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
            <ProfilePhoto src={photo} size="lg" borderClass="border-4" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-12 py-8">
        {/* Professional Summary */}
        {(resumeData.personalInfo.summary || editable) && (
          <div className="mb-8">
            <div className="mb-4 pb-2 border-l-4 pl-4" style={{ borderColor: accent }}>
              <h2 className="text-[14px] font-bold text-gray-900 uppercase tracking-wider">
                Professional Summary
              </h2>
            </div>
            <p className="text-[13px] text-gray-700 leading-[1.8]">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary || ""}
                  placeholder="React Developer with 4+ years building modern, responsive web applications. Expert in React, TypeScript, Redux, and Next.js with a focus on performance optimization and user experience..."
                  multiline
                  as="span"
                />
              ) : (
                resumeData.personalInfo.summary
              )}
            </p>
          </div>
        )}

        {/* Technical Skills */}
        {((resumeData.skills && resumeData.skills.length > 0) || editable) && (
          <div className="mb-8">
            <div className="mb-4 pb-2 border-l-4 pl-4" style={{ borderColor: accent }}>
              <h2 className="text-[14px] font-bold text-gray-900 uppercase tracking-wider">
                Technical Skills
              </h2>
            </div>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills || []}
                className="text-[12.5px]"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-[12px] font-medium rounded-lg border-2"
                    style={{
                      backgroundColor: accentLight,
                      borderColor: accentMedium,
                      color: accent
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Professional Experience */}
        {((resumeData.experience && resumeData.experience.length > 0) || editable) && (
          <div className="mb-8">
            <div className="mb-4 pb-2 border-l-4 pl-4" style={{ borderColor: accent }}>
              <h2 className="text-[14px] font-bold text-gray-900 uppercase tracking-wider">
                Professional Experience
              </h2>
            </div>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience || []}
                defaultItem={{
                  position: "Senior React Developer",
                  company: "Frontend Innovations Inc.",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                  current: false,
                  description: "• Built responsive web applications using React, TypeScript, and modern UI libraries\n• Implemented state management solutions with Redux Toolkit and React Query\n• Optimized application performance achieving 95+ Lighthouse scores\n• Developed reusable component library used across multiple projects",
                  id: Date.now().toString(),
                }}
                renderItem={(exp, index) => (
                  <div className="mb-6 last:mb-0 p-5 rounded-lg border-l-4"
                    style={{ backgroundColor: accentLight, borderColor: accent }}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position}
                            placeholder="Job Title"
                            as="span"
                          />
                        </h3>
                        <p className="text-[13px] font-semibold" style={{ color: accent }}>
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company}
                            placeholder="Company Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div className="text-[11.5px] text-gray-500 font-medium whitespace-nowrap ml-4">
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
                    <div className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-wrap mt-3">
                      <InlineEditableText
                        path={`experience[${index}].description`}
                        value={exp.description}
                        placeholder="• Describe your achievements and responsibilities"
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
                <div key={index} className="mb-6 last:mb-0 p-5 rounded-lg border-l-4"
                  style={{ backgroundColor: accentLight, borderColor: accent }}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-[13px] font-semibold" style={{ color: accent }}>{exp.company}</p>
                    </div>
                    <div className="text-[11.5px] text-gray-500 font-medium whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <div className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-wrap mt-3">
                    {exp.description}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Education */}
        {((resumeData.education && resumeData.education.length > 0) || editable) && (
          <div className="mb-8">
            <div className="mb-4 pb-2 border-l-4 pl-4" style={{ borderColor: accent }}>
              <h2 className="text-[14px] font-bold text-gray-900 uppercase tracking-wider">
                Education
              </h2>
            </div>
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
                  <div className="mb-4 last:mb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-[14px] font-bold text-gray-900">
                          <InlineEditableText
                            path={`education[${index}].degree`}
                            value={edu.degree}
                            placeholder="Degree"
                            as="span"
                          />
                        </h3>
                        <p className="text-[12.5px] text-gray-600">
                          <InlineEditableText
                            path={`education[${index}].field`}
                            value={edu.field || ""}
                            placeholder="Field of Study"
                            as="span"
                          />
                        </p>
                        <p className="text-[13px] font-medium text-gray-700">
                          <InlineEditableText
                            path={`education[${index}].school`}
                            value={edu.school}
                            placeholder="School Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div className="text-[11.5px] text-gray-500 font-medium whitespace-nowrap ml-4">
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
                addButtonLabel="Add Education"
              />
            ) : (
              resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-[14px] font-bold text-gray-900">{edu.degree}</h3>
                      {edu.field && <p className="text-[12.5px] text-gray-600">{edu.field}</p>}
                      <p className="text-[13px] font-medium text-gray-700">{edu.school}</p>
                    </div>
                    <div className="text-[11.5px] text-gray-500 font-medium whitespace-nowrap ml-4">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </div>
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
              content: "Meta Front-End Developer Professional Certificate\nAdvanced React and Redux\nNext.js & React - The Complete Guide",
              id: Date.now().toString(),
            }}
            renderItem={(section, index) => (
              <div className="mb-8">
                <div className="mb-4 pb-2 border-l-4 pl-4" style={{ borderColor: accent }}>
                  <h2 className="text-[14px] font-bold text-gray-900 uppercase tracking-wider">
                    <InlineEditableText
                      path={`sections[${index}].title`}
                      value={section.title}
                      placeholder="Section Title"
                      as="span"
                    />
                  </h2>
                </div>
                <div className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-wrap">
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
            <div key={index} className="mb-8">
              <div className="mb-4 pb-2 border-l-4 pl-4" style={{ borderColor: accent }}>
                <h2 className="text-[14px] font-bold text-gray-900 uppercase tracking-wider">
                  {section.title}
                </h2>
              </div>
              <div className="text-[12.5px] text-gray-700 leading-[1.8] whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
