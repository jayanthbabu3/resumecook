import type { ResumeData } from "@/pages/Editor";
import { Mail, Phone, MapPin, Calendar, Award, Code, GraduationCap, Briefcase, Star } from "lucide-react";
import { ProfilePhoto } from "./ProfilePhoto";

interface PremiumFresherTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const PremiumFresherTemplate = ({
  resumeData,
  themeColor = "#7C3AED",
}: PremiumFresherTemplateProps) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const photo = resumeData.personalInfo.photo;

  return (
    <div className="w-full h-full bg-white overflow-auto">
      <div className="max-w-[850px] mx-auto">
        {/* Header with Modern Design */}
        <div className="relative bg-gradient-to-r from-slate-50 to-white">
          <div className="absolute inset-0 bg-gradient-to-r" style={{ 
            background: `linear-gradient(135deg, ${themeColor}15 0%, ${themeColor}05 100%)` 
          }} />
          <div className="relative px-12 pt-9 pb-7">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="mb-3">
                  <h1 className="text-[2.1rem] font-bold text-slate-900 tracking-tight mb-2">
                    {resumeData.personalInfo.fullName}
                  </h1>
                  {resumeData.personalInfo.title && (
                    <div className="flex items-center gap-2.5">
                      <div className="h-1 w-10 rounded-full" style={{ backgroundColor: themeColor }} />
                      <span className="text-base font-medium text-slate-600">
                        {resumeData.personalInfo.title}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
                  {resumeData.personalInfo.email && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100">
                        <Mail className="h-4 w-4" style={{ color: themeColor }} />
                      </div>
                      <span className="text-slate-700">{resumeData.personalInfo.email}</span>
                    </div>
                  )}
                  {resumeData.personalInfo.phone && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100">
                        <Phone className="h-4 w-4" style={{ color: themeColor }} />
                      </div>
                      <span className="text-slate-700">{resumeData.personalInfo.phone}</span>
                    </div>
                  )}
                  {resumeData.personalInfo.location && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100">
                        <MapPin className="h-4 w-4" style={{ color: themeColor }} />
                      </div>
                      <span className="text-slate-700">{resumeData.personalInfo.location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {photo && (
                <div className="ml-6">
                  <ProfilePhoto
                    src={photo}
                    borderClass="border-4 border-white shadow-lg"
                    className="rounded-2xl"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-12 pb-11">
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <section className="mb-9">
              <div className="bg-gradient-to-r from-slate-50/90 to-white p-6 rounded-[18px] border border-slate-100">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeColor}20` }}>
                    <Star className="h-5 w-5" style={{ color: themeColor }} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Professional Summary</h2>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {resumeData.personalInfo.summary}
                </p>
              </div>
            </section>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-7">
            {/* Left Sidebar */}
            <div className="col-span-4 space-y-8">
              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeColor}20` }}>
                      <GraduationCap className="h-5 w-5" style={{ color: themeColor }} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Education</h2>
                  </div>
                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="relative">
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          <h3 className="font-bold text-slate-900 mb-1">{edu.degree}</h3>
                          {edu.field && (
                            <p className="text-sm text-slate-600 mb-2">{edu.field}</p>
                          )}
                          <p className="text-sm font-semibold mb-2" style={{ color: themeColor }}>
                            {edu.school}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Technical Skills */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeColor}20` }}>
                      <Code className="h-5 w-5" style={{ color: themeColor }} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Technical Skills</h2>
                  </div>
                  <div className="space-y-3">
                    {resumeData.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-slate-900">{skill.name}</span>
                          {skill.level && (
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{ 
                                    width: `${skill.level * 10}%`, 
                                    backgroundColor: themeColor 
                                  }}
                                />
                              </div>
                              <span className="text-xs text-slate-500">{skill.level}/10</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Achievements/Awards */}
              {resumeData.sections && resumeData.sections.some(section => 
                section.title.toLowerCase().includes('achievement') || 
                section.title.toLowerCase().includes('award')
              ) && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeColor}20` }}>
                      <Award className="h-5 w-5" style={{ color: themeColor }} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">Achievements</h2>
                  </div>
                  <div className="space-y-4">
                    {resumeData.sections
                      .filter(section => 
                        section.title.toLowerCase().includes('achievement') || 
                        section.title.toLowerCase().includes('award')
                      )
                      .map((section) => (
                        <div key={section.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                            {section.content}
                          </p>
                        </div>
                      ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Main Content */}
            <div className="col-span-8 space-y-8">
              {/* Projects Section - Most Important for Freshers */}
              {resumeData.sections && resumeData.sections.filter(section => 
                !section.title.toLowerCase().includes('achievement') && 
                !section.title.toLowerCase().includes('award')
              ).length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeColor}20` }}>
                      <Code className="h-5 w-5" style={{ color: themeColor }} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Projects & Portfolio</h2>
                  </div>
                  <div className="space-y-6">
                    {resumeData.sections
                      .filter(section => 
                        !section.title.toLowerCase().includes('achievement') && 
                        !section.title.toLowerCase().includes('award')
                      )
                      .map((section) => (
                        <div key={section.id} className="bg-gradient-to-r from-white to-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                          <h3 className="text-lg font-bold text-slate-900 mb-3">{section.title}</h3>
                          <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                            {section.content}
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              )}

              {/* Experience/Internships */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${themeColor}20` }}>
                      <Briefcase className="h-5 w-5" style={{ color: themeColor }} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Experience & Internships</h2>
                  </div>
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="relative">
                        <div className="bg-gradient-to-r from-white to-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                          <div className="flex justify-between items-start gap-4 mb-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-slate-900 mb-1">
                                {exp.position}
                              </h3>
                              <p className="text-base font-semibold mb-2" style={{ color: themeColor }}>
                                {exp.company}
                              </p>
                            </div>
                            <div className="bg-white px-3 py-1 rounded-lg border border-slate-200 text-sm text-slate-600">
                              {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                            </div>
                          </div>
                          {exp.description && (
                            <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                              {exp.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
