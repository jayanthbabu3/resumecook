import type { ResumeData } from "@/pages/Editor";
import { ProfilePhoto } from "./ProfilePhoto";
import { InlineEditableText } from "@/components/resume/InlineEditableText";
import { InlineEditableDate } from "@/components/resume/InlineEditableDate";
import { InlineEditableList } from "@/components/resume/InlineEditableList";
import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";

interface TemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
  editable?: boolean;
}

export const FresherCleanModernTemplate = ({ resumeData, themeColor = "#6366f1", editable = false }: TemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full bg-white text-gray-900 p-8" style={{ fontFamily: 'Inter' }}>
      {/* Header Section */}
      <div className="text-center mb-8 pb-8 border-b-4" style={{ borderColor: themeColor }}>
        {photo && (
          <div className="mb-4">
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4" style={{ borderColor: themeColor }}>
              <ProfilePhoto src={photo} borderClass="" className="rounded-full" />
            </div>
          </div>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.fullName"
            value={resumeData.personalInfo.fullName || "Your Name"}
            className="text-[38px] font-bold mb-2 block"
            style={{ color: themeColor }}
            as="h1"
          />
        ) : (
          <h1 className="text-[38px] font-bold mb-2" style={{ color: themeColor }}>
            {resumeData.personalInfo.fullName || "Your Name"}
          </h1>
        )}
        {editable ? (
          <InlineEditableText
            path="personalInfo.title"
            value={resumeData.personalInfo.title || "Recent Graduate"}
            className="text-[15px] text-gray-600 uppercase tracking-wide block"
            as="p"
          />
        ) : (
          <p className="text-[15px] text-gray-600 uppercase tracking-wide">
            {resumeData.personalInfo.title || "Recent Graduate"}
          </p>
        )}

        {/* Contact Info */}
        <div className="flex justify-center gap-6 mt-4 text-[12.5px] text-gray-600 flex-wrap">
          {resumeData.personalInfo.email && (
            editable ? (
              <InlineEditableText
                path="personalInfo.email"
                value={resumeData.personalInfo.email}
                className="inline-block"
              />
            ) : (
              <span>{resumeData.personalInfo.email}</span>
            )
          )}
          {resumeData.personalInfo.phone && (
            editable ? (
              <InlineEditableText
                path="personalInfo.phone"
                value={resumeData.personalInfo.phone}
                className="inline-block"
              />
            ) : (
              <span>{resumeData.personalInfo.phone}</span>
            )
          )}
          {resumeData.personalInfo.location && (
            editable ? (
              <InlineEditableText
                path="personalInfo.location"
                value={resumeData.personalInfo.location}
                className="inline-block"
              />
            ) : (
              <span>{resumeData.personalInfo.location}</span>
            )
          )}
        </div>
      </div>

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-3 text-center uppercase tracking-wide" style={{ color: themeColor }}>
            Career Objective
          </h2>
          {editable ? (
            <InlineEditableText
              path="personalInfo.summary"
              value={resumeData.personalInfo.summary}
              className="text-[13px] text-gray-700 leading-[1.8] text-center block"
              multiline
              as="p"
            />
          ) : (
            <p className="text-[13px] text-gray-700 leading-[1.8] text-center">
              {resumeData.personalInfo.summary}
            </p>
          )}
        </div>
      )}

      {/* Skills - Prominent Badges */}
      {resumeData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 text-center uppercase tracking-wide" style={{ color: themeColor }}>
            Technical Skills
          </h2>
          {editable ? (
            <InlineEditableSkills
              path="skills"
              skills={resumeData.skills}
              renderSkill={(skill) => (
                <span className="inline-block px-5 py-2.5 mr-3 mb-3 rounded-full text-[12.5px] font-medium text-white shadow-md" style={{ backgroundColor: themeColor }}>
                  {skill.name}
                </span>
              )}
            />
          ) : (
            <div className="flex flex-wrap justify-center">
              {resumeData.skills.map((skill) => (
                <span key={skill.id} className="px-5 py-2.5 mr-3 mb-3 rounded-full text-[12.5px] font-medium text-white shadow-md" style={{ backgroundColor: themeColor }}>
                  {skill.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 text-center uppercase tracking-wide" style={{ color: themeColor }}>
            Education
          </h2>
          {editable ? (
            <InlineEditableList
              path="education"
              items={resumeData.education}
              defaultItem={{
                id: Date.now().toString(),
                school: "University Name",
                degree: "Bachelor's Degree",
                field: "Field of Study",
                startDate: "2019-09",
                endDate: "2023-05",
              }}
              addButtonLabel="Add Education"
              renderItem={(edu, index) => (
                <div className="mb-5 p-5 rounded-lg border-l-4" style={{ borderColor: themeColor, backgroundColor: `${themeColor}08` }}>
                  <InlineEditableText
                    path={`education[${index}].degree`}
                    value={edu.degree}
                    className="text-[14px] font-bold text-gray-900 block"
                    as="h3"
                  />
                  {edu.field && (
                    <InlineEditableText
                      path={`education[${index}].field`}
                      value={edu.field}
                      className="text-[13px] font-semibold block"
                      style={{ color: themeColor }}
                      as="p"
                    />
                  )}
                  <InlineEditableText
                    path={`education[${index}].school`}
                    value={edu.school}
                    className="text-[12.5px] text-gray-700 block mt-1"
                    as="p"
                  />
                  <div className="text-[12px] text-gray-500 mt-2 flex items-center gap-1">
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
            <div className="space-y-5">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="p-5 rounded-lg border-l-4" style={{ borderColor: themeColor, backgroundColor: `${themeColor}08` }}>
                  <h3 className="text-[14px] font-bold text-gray-900">{edu.degree}</h3>
                  {edu.field && <p className="text-[13px] font-semibold" style={{ color: themeColor }}>{edu.field}</p>}
                  <p className="text-[12.5px] text-gray-700 mt-1">{edu.school}</p>
                  <p className="text-[12px] text-gray-500 mt-2">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Projects */}
      <div className="mb-8">
        <h2 className="text-[15px] font-bold mb-4 text-center uppercase tracking-wide" style={{ color: themeColor }}>
          Academic Projects
        </h2>
        <div className="space-y-5">
          {resumeData.sections.map((section) => (
            <div key={section.id} className="p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
              <h3 className="text-[14px] font-bold mb-2" style={{ color: themeColor }}>{section.title}</h3>
              <p className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Internships */}
      {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-bold mb-4 text-center uppercase tracking-wide" style={{ color: themeColor }}>
            Internship Experience
          </h2>
          {editable ? (
            <InlineEditableList
              path="experience"
              items={resumeData.experience}
              defaultItem={{
                id: Date.now().toString(),
                company: "Company Name",
                position: "Intern",
                startDate: "2023-06",
                endDate: "2023-08",
                description: "Internship description",
                current: false,
              }}
              addButtonLabel="Add Internship"
              renderItem={(exp, index) => (
                <div className="mb-5 p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
                  <div className="flex justify-between items-start mb-2">
                    <InlineEditableText
                      path={`experience[${index}].position`}
                      value={exp.position || "Position"}
                      className="text-[14px] font-bold text-gray-900 block"
                      as="h3"
                    />
                    <div className="text-[12px] text-gray-600 whitespace-nowrap flex items-center gap-1">
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
                  <InlineEditableText
                    path={`experience[${index}].company`}
                    value={exp.company || "Company"}
                    className="text-[13px] font-semibold mb-2 block"
                    style={{ color: themeColor }}
                    as="p"
                  />
                  {exp.description && (
                    <InlineEditableText
                      path={`experience[${index}].description`}
                      value={exp.description}
                      className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line block"
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
                <div key={exp.id} className="p-5 rounded-lg" style={{ backgroundColor: `${themeColor}08` }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[14px] font-bold text-gray-900">{exp.position || "Position"}</h3>
                    <span className="text-[12px] text-gray-600 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-[13px] font-semibold mb-2" style={{ color: themeColor }}>{exp.company || "Company"}</p>
                  {exp.description && (
                    <p className="text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Certifications */}
      <div className="mb-8">
        <h2 className="text-[15px] font-bold mb-4 text-center uppercase tracking-wide" style={{ color: themeColor }}>
          Certifications
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 rounded-lg text-[12.5px] font-medium border-2" style={{ borderColor: themeColor, color: themeColor }}>
            Certification Name - Issuer
          </span>
        </div>
      </div>
    </div>
  );
};
