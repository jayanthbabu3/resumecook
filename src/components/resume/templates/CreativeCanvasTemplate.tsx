import type { ResumeData } from "@/pages/Editor";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";
import { ProfilePhoto } from "./ProfilePhoto";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const CreativeCanvasTemplate = ({
  resumeData,
  themeColor = "#f43f5e",
  editable = false,
}: TemplateProps) => {

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    if (!year || !month) return date;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white text-gray-900">
      {/* Canvas-style header with paint strokes */}
      <div className="relative p-10 pb-8">
        {/* Decorative paint stroke */}
        <div className="absolute top-0 left-0 w-full h-2 opacity-80" style={{
          background: `linear-gradient(90deg, ${themeColor} 0%, ${themeColor}80 50%, transparent 100%)`
        }} />

        <div className="flex items-start gap-8">
          {/* Polaroid-style photo */}
          {photo && (
            <div className="flex-shrink-0 p-3 bg-white shadow-lg" style={{ transform: 'rotate(-2deg)' }}>
              <div className="w-32 h-32 overflow-hidden border-2 border-gray-100">
                <ProfilePhoto src={photo} borderClass="" className="" />
              </div>
              <div className="mt-2 h-1" style={{ backgroundColor: themeColor }} />
            </div>
          )}

          <div className="flex-1">
            {editable ? (
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName || "Your Name"}
                className="text-[32px] font-bold mb-1 block"
                style={{ color: themeColor }}
                as="h1"
              />
            ) : (
              <h1 className="text-[32px] font-bold mb-1" style={{ color: themeColor }}>
                {resumeData.personalInfo.fullName || "Your Name"}
              </h1>
            )}
            {resumeData.personalInfo.title && (
              editable ? (
                <InlineEditableText
                  path="personalInfo.title"
                  value={resumeData.personalInfo.title}
                  className="text-[16px] text-gray-700 mb-4 font-medium block uppercase tracking-wide"
                  as="h2"
                />
              ) : (
                <h2 className="text-[16px] text-gray-700 mb-4 font-medium uppercase tracking-wide">
                  {resumeData.personalInfo.title}
                </h2>
              )
            )}
            <div className="flex flex-wrap gap-4 text-[12px] text-gray-600">
              {resumeData.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: themeColor }} />
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
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: themeColor }} />
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
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: themeColor }} />
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
        </div>
      </div>

      <div className="px-10 pb-10">
        {/* Summary as canvas card */}
        {resumeData.personalInfo.summary && (
          <div className="mb-8 p-6 bg-white shadow-md border-l-4" style={{ borderColor: themeColor }}>
            <h2 className="text-[15px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              Creative Profile
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[12.5px] text-gray-700 leading-[1.7] block"
                multiline
                as="p"
              />
            ) : (
              <p className="text-[12.5px] text-gray-700 leading-[1.7]">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </div>
        )}

        {/* Experience as gallery cards */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-5 uppercase tracking-wide flex items-center gap-3" style={{ color: themeColor }}>
              <span>Experience</span>
              <div className="flex-1 h-px bg-gray-300" />
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
                  description: "Job description",
                  current: false,
                }}
                addButtonLabel="Add Experience"
                renderItem={(exp, index) => (
                  <div className="mb-6 p-5 bg-white shadow-sm border-t-2" style={{ borderColor: `${themeColor}40` }}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="text-[15px] font-bold text-gray-900 block"
                          as="h3"
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-[13px] font-medium block"
                          style={{ color: themeColor }}
                          as="p"
                        />
                      </div>
                      <div className="text-[12px] text-gray-500 whitespace-nowrap flex items-center gap-1">
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
                        className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line block mt-3"
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
                  <div key={exp.id} className="p-5 bg-white shadow-sm border-t-2" style={{ borderColor: `${themeColor}40` }}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-[15px] font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-[13px] font-medium" style={{ color: themeColor }}>{exp.company}</p>
                      </div>
                      <span className="text-[12px] text-gray-500 whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line mt-3">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Skills as paint palette */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-8 p-6 bg-white shadow-md">
            <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide" style={{ color: themeColor }}>
              Creative Skills
            </h2>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => {
                  const colors = [themeColor, '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
                  const color = colors[index % colors.length];
                  return skill.name ? (
                    <span
                      className="px-4 py-2 text-[12px] font-medium rounded-md inline-block border-2"
                      style={{
                        borderColor: color,
                        color: color,
                        backgroundColor: `${color}10`,
                      }}
                    >
                      {skill.name}
                    </span>
                  ) : null;
                }}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => {
                  const colors = [themeColor, '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
                  const color = colors[index % colors.length];
                  return skill.name ? (
                    <span
                      key={skill.id}
                      className="px-4 py-2 text-[12px] font-medium rounded-md border-2"
                      style={{
                        borderColor: color,
                        color: color,
                        backgroundColor: `${color}10`,
                      }}
                    >
                      {skill.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[15px] font-bold mb-5 uppercase tracking-wide flex items-center gap-3" style={{ color: themeColor }}>
              <span>Education</span>
              <div className="flex-1 h-px bg-gray-300" />
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
                  <div className="flex justify-between items-start gap-4 mb-4 p-4 bg-white shadow-sm">
                    <div className="flex-1">
                      <InlineEditableText
                        path={`education[${index}].degree`}
                        value={edu.degree}
                        className="text-[13px] font-bold text-gray-900 block"
                        as="h3"
                      />
                      {edu.field && (
                        <InlineEditableText
                          path={`education[${index}].field`}
                          value={edu.field}
                          className="text-[12px] text-gray-600 block"
                          as="p"
                        />
                      )}
                      <InlineEditableText
                        path={`education[${index}].school`}
                        value={edu.school}
                        className="text-[12.5px] font-medium block"
                        style={{ color: themeColor }}
                        as="p"
                      />
                    </div>
                    <div className="text-[12px] text-gray-500 whitespace-nowrap flex items-center gap-1">
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
                  <div key={edu.id} className="flex justify-between items-start gap-4 p-4 bg-white shadow-sm">
                    <div className="flex-1">
                      <h3 className="text-[13px] font-bold text-gray-900">{edu.degree}</h3>
                      {edu.field && <p className="text-[12px] text-gray-600">{edu.field}</p>}
                      <p className="text-[12.5px] font-medium" style={{ color: themeColor }}>{edu.school}</p>
                    </div>
                    <span className="text-[12px] text-gray-500 whitespace-nowrap">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Custom Sections */}
        {resumeData.sections && resumeData.sections.map((section, index) => (
          <div key={section.id} className="mb-8 p-6 bg-white shadow-md">
            <h2 className="text-[15px] font-bold mb-3 uppercase tracking-wide" style={{ color: themeColor }}>
              {section.title}
            </h2>
            <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreativeCanvasTemplate;
