import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Code2, Database, Server } from "lucide-react";

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (date: string) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

export const FullstackTemplate = ({ resumeData }: TemplateProps) => {
  return (
    <div className="w-full min-h-[297mm] bg-white font-sans text-gray-800">
      {/* Two Column Layout */}
      <div className="flex">
        {/* Left Sidebar - 35% */}
        <div className="w-[35%] bg-slate-800 text-white p-6">
          {/* Profile Section */}
          <div className="mb-8 pb-6 border-b border-slate-600">
            <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center mb-4 mx-auto">
              <Code2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-center break-words">{resumeData.personalInfo.fullName}</h1>
            <p className="text-teal-300 text-center text-lg font-medium">{resumeData.personalInfo.title}</p>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 text-teal-300 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-teal-300"></div>
              CONTACT
            </h2>
            <div className="space-y-3 text-sm">
              {resumeData.personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-300" />
                  <span className="break-words">{resumeData.personalInfo.email}</span>
                </div>
              )}
              {resumeData.personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-300" />
                  <span>{resumeData.personalInfo.phone}</span>
                </div>
              )}
              {resumeData.personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-300" />
                  <span>{resumeData.personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-teal-300 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-teal-300"></div>
                SKILLS
              </h2>
              <div className="space-y-2">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-slate-700 px-3 py-2 rounded text-sm font-medium border-l-2 border-teal-400"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4 text-teal-300 flex items-center gap-2">
                <div className="w-8 h-0.5 bg-teal-300"></div>
                EDUCATION
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-slate-600 last:border-0">
                  <h3 className="font-bold text-sm mb-1">{edu.degree}</h3>
                  {edu.field && <p className="text-teal-300 text-sm mb-1">{edu.field}</p>}
                  <p className="text-slate-300 text-sm mb-1">{edu.school}</p>
                  <p className="text-slate-400 text-xs">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Content - 65% */}
        <div className="w-[65%] p-8">
          {/* About Me */}
          {resumeData.personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-3 text-slate-800 flex items-center gap-3">
                <div className="w-1 h-8 bg-teal-500"></div>
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">{resumeData.personalInfo.summary}</p>
            </div>
          )}

          {/* Professional Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-800 flex items-center gap-3">
                <div className="w-1 h-8 bg-teal-500"></div>
                Professional Experience
              </h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-6 pl-4 border-l-2 border-teal-400">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800">{exp.position}</h3>
                      <p className="text-teal-600 font-semibold text-lg">{exp.company}</p>
                    </div>
                    <div className="bg-slate-100 px-3 py-1 rounded text-sm text-slate-600 font-medium whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Custom Sections */}
          {resumeData.sections &&
            resumeData.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold mb-3 text-slate-800 flex items-center gap-3">
                  <div className="w-1 h-8 bg-teal-500"></div>
                  {section.title}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{section.content}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
