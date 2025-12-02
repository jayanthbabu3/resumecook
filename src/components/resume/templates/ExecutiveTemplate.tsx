import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

const normalizeHex = (color?: string) => {
  if (!color || !color.startsWith("#")) {
    return undefined;
  }
  if (color.length === 4) {
    const r = color[1];
    const g = color[2];
    const b = color[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return color.length >= 7 ? color.slice(0, 7) : color;
};

const withOpacity = (color: string | undefined, alpha: string) => {
  const hex = normalizeHex(color);
  if (!hex) {
    return color;
  }
  return `${hex}${alpha}`;
};

export const ExecutiveTemplate = ({
  resumeData,
  themeColor = "#1e293b",
  editable = false,
}: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const primary = normalizeHex(themeColor) ?? "#1e293b";
  const primaryTint = withOpacity(primary, "22") ?? "#e2e8f0";
  const primarySoft = withOpacity(primary, "18") ?? "#f8fafc";
  const primaryBorder = withOpacity(primary, "44") ?? "#cbd3f5";
  const primaryText = withOpacity(primary, "dd") ?? primary;

  const photo = resumeData.personalInfo.photo;

  return (
    <div
      className="w-full h-full bg-white text-gray-900 text-[13px] leading-relaxed"
      style={{ pageBreakAfter: "auto" }}
    >
      {/* Header Bar */}
      <div
        className="text-white px-12 py-10"
        style={{
          background: `linear-gradient(90deg, ${primary}, ${
            withOpacity(primary, "dd") ?? primary
          })`,
          pageBreakAfter: "avoid",
          pageBreakInside: "avoid",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-[30px] font-bold tracking-tight">
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.fullName"
                    value={resumeData.personalInfo.fullName || ""}
                    placeholder="Your Name"
                    as="span"
                  />
                ) : (
                  resumeData.personalInfo.fullName || "Your Name"
                )}
              </h1>
              {resumeData.personalInfo.title && (
                <p className="text-[15px] font-light text-white/80 mt-1.5">
                  {editable ? (
                    <InlineEditableText
                      path="personalInfo.title"
                      value={resumeData.personalInfo.title}
                      placeholder="Professional Title"
                      as="span"
                    />
                  ) : (
                    resumeData.personalInfo.title
                  )}
                </p>
              )}
            </div>
            <ProfilePhoto src={photo} borderClass="border-4 border-white/50" />
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/80">
            {(resumeData.personalInfo.email || editable) && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
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
                <Phone className="h-4 w-4" />
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
                <MapPin className="h-4 w-4" />
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
      </div>

      <div className="px-12 py-8 max-w-4xl mx-auto">
        {/* Executive Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8" style={{ pageBreakInside: "avoid" }}>
            <h2
              className="text-[15px] font-semibold text-slate-900 mb-3 border-l-4 pl-3"
              style={{ borderColor: primary, pageBreakAfter: "avoid" }}
            >
              Executive Summary
            </h2>
            <p className="text-[12.5px] text-gray-700 leading-[1.7] pl-3">
              {editable ? (
                <InlineEditableText
                  path="personalInfo.summary"
                  value={resumeData.personalInfo.summary}
                  placeholder="Executive Summary"
                  multiline
                  as="span"
                />
              ) : (
                resumeData.personalInfo.summary
              )}
            </p>
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-[15px] font-semibold text-slate-900 mb-3 border-l-4 pl-3"
              style={{ borderColor: primary, pageBreakAfter: "avoid" }}
            >
              Professional Experience
            </h2>
            {editable ? (
              <InlineEditableList
                path="experience"
                items={resumeData.experience}
                defaultItem={{
                  id: "",
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  description: "",
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => (
                  <div
                    className="border-l-2 pl-5 pb-5"
                    style={{ borderColor: primaryTint, pageBreakInside: "avoid" }}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <div className="flex-1">
                        <h3 className="text-[14px] font-semibold text-slate-900">
                          <InlineEditableText
                            path={`experience[${index}].position`}
                            value={exp.position || ""}
                            placeholder="Position Title"
                            as="span"
                          />
                        </h3>
                        <p
                          className="text-[13px] font-medium"
                          style={{ color: primary }}
                        >
                          <InlineEditableText
                            path={`experience[${index}].company`}
                            value={exp.company || ""}
                            placeholder="Company Name"
                            as="span"
                          />
                        </p>
                      </div>
                      <div
                        className="text-[11px] px-3 py-1 rounded whitespace-nowrap ml-4 flex items-center gap-1"
                        style={{
                          backgroundColor: primarySoft,
                          color: primaryText,
                          border: `1px solid ${primaryBorder}`,
                        }}
                      >
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
                      <div className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line mt-2">
                        <InlineEditableText
                          path={`experience[${index}].description`}
                          value={exp.description}
                          placeholder="Job description"
                          multiline
                          as="span"
                        />
                      </div>
                    )}
                  </div>
                )}
              />
            ) : (
              <div className="space-y-4 pl-3">
                {resumeData.experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-l-2 pl-5 pb-5"
                    style={{ borderColor: primaryTint, pageBreakInside: "avoid" }}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <div className="flex-1">
                        <h3 className="text-[14px] font-semibold text-slate-900">
                          {exp.position || "Position Title"}
                        </h3>
                        <p
                          className="text-[13px] font-medium"
                          style={{ color: primary }}
                        >
                          {exp.company || "Company Name"}
                        </p>
                      </div>
                      <div
                        className="text-[11px] px-3 py-1 rounded whitespace-nowrap ml-4"
                        style={{
                          backgroundColor: primarySoft,
                          color: primaryText,
                          border: `1px solid ${primaryBorder}`,
                        }}
                      >
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line mt-2">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-8" style={{ pageBreakInside: "avoid" }}>
            <h2
              className="text-[15px] font-semibold text-slate-900 mb-3 border-l-4 pl-3"
              style={{ borderColor: primary, pageBreakAfter: "avoid" }}
            >
              Education
            </h2>
            {editable ? (
              <InlineEditableList
                path="education"
                items={resumeData.education}
                defaultItem={{
                  id: "",
                  degree: "",
                  school: "",
                  field: "",
                  startDate: "",
                  endDate: "",
                }}
                addButtonLabel="Add Education"
                renderItem={(edu, index) => (
                  <div
                    className="border-l-2 pl-4"
                    style={{ borderColor: primaryTint, pageBreakInside: "avoid" }}
                  >
                    <h3 className="text-[13px] font-semibold text-slate-900">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree || ""}
                        placeholder="Degree"
                        as="span"
                      />
                    </h3>
                    <p className="text-[12px] text-slate-700 font-medium">
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school || ""}
                        placeholder="School Name"
                        as="span"
                      />
                    </p>
                    {edu.field && (
                      <p className="text-[12px] text-gray-600 mb-1">
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          placeholder="Field of Study"
                          as="span"
                        />
                      </p>
                    )}
                    <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
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
              <div className="grid md:grid-cols-2 gap-3 pl-3">
                {resumeData.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="border-l-2 pl-4"
                    style={{ borderColor: primaryTint, pageBreakInside: "avoid" }}
                  >
                    <h3 className="text-[13px] font-semibold text-slate-900">
                      {edu.degree || "Degree"}
                    </h3>
                    <p className="text-[12px] text-slate-700 font-medium">
                      {edu.school || "School Name"}
                    </p>
                    {edu.field && (
                      <p className="text-[12px] text-gray-600 mb-1">{edu.field}</p>
                    )}
                    <p className="text-[11px] text-slate-600 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Core Competencies */}
        {resumeData.skills.length > 0 && (
          <div className="mb-8" style={{ pageBreakInside: "avoid" }}>
            <h2
              className="text-[15px] font-semibold text-slate-900 mb-3 border-l-4 pl-3"
              style={{ borderColor: primary, pageBreakAfter: "avoid" }}
            >
              Core Competencies
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <div
                    className="px-3 py-1.5 rounded text-[11px] font-semibold text-center"
                    style={{
                      backgroundColor: primarySoft,
                      color: primaryText,
                      border: `1px solid ${primaryBorder}`,
                    }}
                  >
                    {skill.name || ""}
                  </div>
                )}
              />
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 pl-3">
                {resumeData.skills.map(
                  (skill) =>
                    skill.name && (
                      <div
                        key={skill.id}
                        className="px-3 py-1.5 rounded text-[11px] font-semibold text-center"
                        style={{
                          backgroundColor: primarySoft,
                          color: primaryText,
                          border: `1px solid ${primaryBorder}`,
                        }}
                      >
                        {skill.name}
                      </div>
                    ),
                )}
              </div>
            )}
          </div>
        )}

        {/* Custom Sections */}
        {editable ? (
          <InlineEditableList
            path="sections"
            items={resumeData.sections}
            defaultItem={{ id: "", title: "", content: "" }}
            addButtonLabel="Add Section"
            renderItem={(section, index) => (
              <div className="mb-8" style={{ pageBreakInside: "avoid" }}>
                <h2
                  className="text-[15px] font-semibold text-slate-900 mb-3 border-l-4 pl-3"
                  style={{ borderColor: primary, pageBreakAfter: "avoid" }}
                >
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    placeholder="Section Title"
                    as="span"
                  />
                </h2>
                <div className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line pl-3">
                  <InlineEditableText
                    path={`sections[${index}].content`}
                    value={section.content}
                    placeholder="Section content"
                    multiline
                    as="span"
                  />
                </div>
              </div>
            )}
          />
        ) : (
          resumeData.sections.map((section) => (
            <div
              key={section.id}
              className="mb-8"
              style={{ pageBreakInside: "avoid" }}
            >
              <h2
                className="text-[15px] font-semibold text-slate-900 mb-3 border-l-4 pl-3"
                style={{ borderColor: primary, pageBreakAfter: "avoid" }}
              >
                {section.title}
              </h2>
              <div className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line pl-3">
                {section.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
