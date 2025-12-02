import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin } from "lucide-react";
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

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const SeniorTemplate = ({ resumeData, themeColor = "#0f766e", editable = false }: TemplateProps) => {
  const markerColor = `${themeColor}33`;
  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full min-h-[297mm] bg-white font-sans text-gray-900 flex">
      {/* Main Content */}
      <div className="w-[65%] px-12 py-10">
        <div className="pb-5 mb-7 border-b" style={{ borderColor: `${themeColor}55` }}>
          {editable ? (
            <>
              <InlineEditableText
                path="personalInfo.fullName"
                value={resumeData.personalInfo.fullName}
                className="text-[28px] font-semibold tracking-tight text-gray-900 block"
                as="h1"
              />
              <InlineEditableText
                path="personalInfo.title"
                value={resumeData.personalInfo.title}
                className="text-[14px] font-semibold block"
                style={{ color: themeColor }}
                as="p"
              />
            </>
          ) : (
            <>
              <h1 className="text-[28px] font-semibold tracking-tight text-gray-900">
                {resumeData.personalInfo.fullName}
              </h1>
              <p className="text-[14px] font-semibold" style={{ color: themeColor }}>
                {resumeData.personalInfo.title}
              </p>
            </>
          )}
          <div className="mt-4 flex flex-wrap gap-4 text-[12px] text-gray-600">
            {resumeData.personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.phone"
                    value={resumeData.personalInfo.phone}
                    className="inline-block"
                  />
                ) : (
                  resumeData.personalInfo.phone
                )}
              </span>
            )}
            {resumeData.personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.email"
                    value={resumeData.personalInfo.email}
                    className="inline-block"
                  />
                ) : (
                  resumeData.personalInfo.email
                )}
              </span>
            )}
            {resumeData.personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {editable ? (
                  <InlineEditableText
                    path="personalInfo.location"
                    value={resumeData.personalInfo.location}
                    className="inline-block"
                  />
                ) : (
                  resumeData.personalInfo.location
                )}
              </span>
            )}
          </div>
        </div>

        {resumeData.personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-[13px] font-semibold uppercase text-gray-900 mb-3">
              Summary
            </h2>
            {editable ? (
              <InlineEditableText
                path="personalInfo.summary"
                value={resumeData.personalInfo.summary}
                className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line text-justify block"
                multiline
                as="p"
              />
            ) : (
              <p className="text-[12.5px] text-gray-700 leading-[1.7] whitespace-pre-line text-justify">
                {resumeData.personalInfo.summary}
              </p>
            )}
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-[13px] font-semibold uppercase text-gray-900 mb-3">
              Experience
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
                  <div className="relative pl-6">
                    <span
                      className="absolute left-0 top-1 block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: themeColor }}
                    />
                    <div className="flex justify-between items-baseline gap-4">
                      <div>
                        <InlineEditableText
                          path={`experience[${index}].position`}
                          value={exp.position}
                          className="text-[13px] font-semibold text-gray-900 block"
                          as="h3"
                        />
                        <InlineEditableText
                          path={`experience[${index}].company`}
                          value={exp.company}
                          className="text-[12.5px] font-medium text-gray-700 block"
                          as="p"
                        />
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium whitespace-nowrap flex items-center gap-1">
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
                      path={`experience[${index}].description`}
                      value={exp.description}
                      className="mt-2 text-[12.5px] text-gray-600 leading-[1.7] whitespace-pre-line block"
                      multiline
                      as="p"
                    />
                  </div>
                )}
              />
            ) : (
              <div className="space-y-6">
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <span
                      className="absolute left-0 top-1 block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: themeColor }}
                    />
                    <div className="flex justify-between items-baseline gap-4">
                      <div>
                        <h3 className="text-[13px] font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-[12.5px] font-medium text-gray-700">{exp.company}</p>
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </p>
                    </div>
                    <p className="mt-2 text-[12.5px] text-gray-600 leading-[1.7] whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {resumeData.education.length > 0 && (
          <section className="mb-2">
            <h2 className="text-[13px] font-semibold uppercase text-gray-900 mb-3">
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
                  <div className="relative pl-6">
                    <span
                      className="absolute left-0 top-2 block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: markerColor }}
                    />
                    <InlineEditableText
                      path={`education[${index}].degree`}
                      value={edu.degree}
                      className="text-[13px] font-semibold text-gray-900 block"
                      as="h3"
                    />
                    {edu.field && (
                      <InlineEditableText
                        path={`education[${index}].field`}
                        value={edu.field}
                        className="text-[12.5px] text-gray-600 block"
                        as="p"
                      />
                    )}
                    <InlineEditableText
                      path={`education[${index}].school`}
                      value={edu.school}
                      className="text-[12.5px] text-gray-700 font-medium block"
                      as="p"
                    />
                    <div className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
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
                  <div key={edu.id} className="relative pl-6">
                    <span
                      className="absolute left-0 top-2 block h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: markerColor }}
                    />
                    <h3 className="text-[13px] font-semibold text-gray-900">{edu.degree}</h3>
                    {edu.field && <p className="text-[12.5px] text-gray-600">{edu.field}</p>}
                    <p className="text-[12.5px] text-gray-700 font-medium">{edu.school}</p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Sidebar */}
      <aside
        className="w-[35%] px-8 py-10 text-white flex flex-col gap-7"
        style={{ backgroundColor: themeColor }}
      >
        <div className="flex flex-col items-center text-center">
          {photo ? (
            <ProfilePhoto
              src={photo}
              sizeClass="h-24 w-24"
              borderClass="border-4 border-white/40"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-semibold">
              {(resumeData.personalInfo.fullName || "").split(" ").map((part) => part[0]).join("") || "SE"}
            </div>
          )}
          <p className="mt-4 text-[11px] text-white/80">
            Driving technical excellence and shipping impactful products.
          </p>
        </div>

        {resumeData.sections.length > 0 && (
          <div className="space-y-7">
            {editable ? (
              resumeData.sections.map((section, index) => (
                <div key={section.id}>
                  <InlineEditableText
                    path={`sections[${index}].title`}
                    value={section.title}
                    className="text-[12px] font-semibold uppercase text-white mb-2 block"
                    as="h3"
                  />
                  <InlineEditableText
                    path={`sections[${index}].content`}
                    value={section.content}
                    className="space-y-2 text-[12px] text-white/90 leading-[1.7] whitespace-pre-line block"
                    multiline
                    as="div"
                  />
                </div>
              ))
            ) : (
              resumeData.sections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-[12px] font-semibold uppercase text-white mb-2">
                    {section.title}
                  </h3>
                  <div className="space-y-2 text-[12px] text-white/90 leading-[1.7] whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {resumeData.skills.length > 0 && (
          <div>
            <h3 className="text-[12px] font-semibold uppercase text-white mb-2">
              Skills & Tools
            </h3>
            {editable ? (
              <InlineEditableSkills
                path="skills"
                skills={resumeData.skills}
                renderSkill={(skill, index) => (
                  <span className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/15 border border-white/20">
                    {skill.name}
                  </span>
                )}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-[11px] font-medium px-3 py-1 rounded-full bg-white/15 border border-white/20"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};
