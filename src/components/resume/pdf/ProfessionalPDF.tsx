import { Document, Page, Text, View, StyleSheet, Svg, Path, Image, Rect, Circle } from '@react-pdf/renderer';
import type { ResumeData } from "@/pages/Editor";
import type { ResumeSection } from "@/types/resume";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    fontSize: 10,
    fontFamily: 'Inter',
  },
  header: {
    marginBottom: 20,
    borderBottom: 1.5,
    borderBottomColor: '#000',
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 15,
    fontSize: 9,
    color: '#666',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  photoWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 8,
    textTransform: 'uppercase',
    borderBottom: 0.5,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 5,
    letterSpacing: 0.5,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  experienceItem: {
    marginBottom: 18,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 2,
  },
  company: {
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 600,
    color: '#333',
    marginBottom: 2,
  },
  date: {
    fontSize: 9,
    color: '#666',
  },
  description: {
    fontSize: 9,
    fontFamily: 'Inter',
    color: '#333',
    lineHeight: 1.4,
    marginTop: 4,
  },
  bulletPoints: {
    marginTop: 4,
  },
  bulletPoint: {
    fontSize: 9,
    fontFamily: 'Inter',
    color: '#333',
    lineHeight: 1.4,
    marginBottom: 2,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 2,
  },
  school: {
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 600,
    color: '#333',
  },
  gpa: {
    fontSize: 9,
    fontFamily: 'Inter',
    color: '#666',
    marginTop: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 5,
  },
  skillBadge: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
  },
  skill: {
    fontSize: 9,
    color: '#333',
  },
  linkText: {
    fontSize: 9,
    color: '#0066cc',
  },
});

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const ProfessionalPDF = ({ resumeData, themeColor }: Props) => {
  const photo = resumeData.personalInfo.photo;

  // Render a single dynamic section
  const renderDynamicSection = (section: ResumeSection) => {
    if (!section.enabled) return null;

    const sectionData = section.data;

    switch (sectionData.type) {
      case 'certifications':
        return sectionData.items.length > 0 ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {sectionData.items.map((cert) => (
              <View key={cert.id} style={styles.educationItem}>
                <Text style={styles.degree}>{cert.name}</Text>
                <Text style={styles.company}>{cert.issuer}</Text>
                <Text style={styles.date}>{formatDate(cert.date)}</Text>
                {cert.credentialId && (
                  <Text style={styles.description}>ID: {cert.credentialId}</Text>
                )}
              </View>
            ))}
          </View>
        ) : null;

      case 'languages':
        return sectionData.items.length > 0 ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.skillsContainer}>
              {sectionData.items.map((lang, index) => (
                <Text key={lang.id} style={styles.skill}>
                  {lang.language} - {lang.proficiency}
                  {index < sectionData.items.length - 1 ? " •" : ""}
                </Text>
              ))}
            </View>
          </View>
        ) : null;

      case 'projects':
        return sectionData.items.length > 0 ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {sectionData.items.map((project) => (
              <View key={project.id} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{project.name}</Text>
                {project.description && (
                  <Text style={styles.description}>{project.description}</Text>
                )}
                {project.techStack && project.techStack.length > 0 && (
                  <Text style={styles.description}>
                    Tech: {project.techStack.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ) : null;

      case 'awards':
        return sectionData.items.length > 0 ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {sectionData.items.map((award) => (
              <View key={award.id} style={styles.educationItem}>
                <Text style={styles.degree}>{award.title}</Text>
                <Text style={styles.company}>{award.issuer}</Text>
                <Text style={styles.date}>{formatDate(award.date)}</Text>
                {award.description && (
                  <Text style={styles.description}>{award.description}</Text>
                )}
              </View>
            ))}
          </View>
        ) : null;

      case 'volunteer':
        return sectionData.items.length > 0 ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {sectionData.items.map((vol) => (
              <View key={vol.id} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{vol.role}</Text>
                <Text style={styles.company}>{vol.organization}</Text>
                <Text style={styles.date}>
                  {formatDate(vol.startDate)} - {vol.current ? "Present" : formatDate(vol.endDate)}
                </Text>
                {vol.description && (
                  <Text style={styles.description}>{vol.description}</Text>
                )}
              </View>
            ))}
          </View>
        ) : null;

      case 'publications':
        return sectionData.items.length > 0 ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {sectionData.items.map((pub) => (
              <View key={pub.id} style={styles.educationItem}>
                <Text style={styles.degree}>{pub.title}</Text>
                <Text style={styles.company}>{pub.publisher}</Text>
                <Text style={styles.date}>{formatDate(pub.date)}</Text>
                {pub.description && (
                  <Text style={styles.description}>{pub.description}</Text>
                )}
              </View>
            ))}
          </View>
        ) : null;

      case 'speaking':
        return sectionData.items.length > 0 ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {sectionData.items.map((talk) => (
              <View key={talk.id} style={styles.educationItem}>
                <Text style={styles.degree}>{talk.topic}</Text>
                <Text style={styles.company}>{talk.event}</Text>
                <Text style={styles.date}>
                  {formatDate(talk.date)} • {talk.location}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case 'patents':
        return sectionData.items.length > 0 ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {sectionData.items.map((patent) => (
              <View key={patent.id} style={styles.educationItem}>
                <Text style={styles.degree}>{patent.title}</Text>
                <Text style={styles.company}>
                  {patent.patentNumber} • {patent.status}
                </Text>
                <Text style={styles.date}>{formatDate(patent.date)}</Text>
                {patent.description && (
                  <Text style={styles.description}>{patent.description}</Text>
                )}
              </View>
            ))}
          </View>
        ) : null;

      case 'portfolio':
        return sectionData.items.length > 0 ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {sectionData.items.map((item) => (
              <View key={item.id} style={styles.educationItem}>
                <Text style={styles.description}>
                  {item.platform}: {item.url}
                </Text>
              </View>
            ))}
          </View>
        ) : null;

      case 'custom':
        return hasContent(sectionData.content) ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.description}>{sectionData.content}</Text>
          </View>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
            {resumeData.personalInfo.title && (
              <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
            )}
          </View>
          {photo ? (
            <View style={styles.photoWrapper}>
              <Image src={photo} style={styles.photo} />
            </View>
          ) : null}
        </View>
        <View style={styles.contactRow}>
          {resumeData.personalInfo.email && (
            <View style={styles.contactItem}>
              <Svg width="10" height="10" viewBox="0 0 24 24">
                <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#666" strokeWidth="2" />
                <Path d="m22 6-10 7L2 6" fill="none" stroke="#666" strokeWidth="2" />
              </Svg>
              <Text>{resumeData.personalInfo.email}</Text>
            </View>
          )}
          {resumeData.personalInfo.phone && (
            <View style={styles.contactItem}>
              <Svg width="10" height="10" viewBox="0 0 24 24">
                <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#666" strokeWidth="2" />
              </Svg>
              <Text>{resumeData.personalInfo.phone}</Text>
            </View>
          )}
          {resumeData.personalInfo.location && (
            <View style={styles.contactItem}>
              <Svg width="10" height="10" viewBox="0 0 24 24">
                <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#666" strokeWidth="2" />
                <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="#666" strokeWidth="2" />
              </Svg>
              <Text>{resumeData.personalInfo.location}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Summary */}
      {hasContent(resumeData.personalInfo.summary) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.description}>{resumeData.personalInfo.summary}</Text>
        </View>
      )}

      {/* Social Links */}
      {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SOCIAL LINKS</Text>
          <View style={styles.contactRow}>
            {resumeData.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="#666" strokeWidth="2" />
                  <Rect x="2" y="9" width="4" height="12" fill="none" stroke="#666" strokeWidth="2" />
                  <Circle cx="4" cy="4" r="2" fill="none" stroke="#666" strokeWidth="2" />
                </Svg>
                <Text style={styles.linkText}>{resumeData.personalInfo.linkedin}</Text>
              </View>
            )}
            {resumeData.personalInfo.portfolio && (
              <View style={styles.contactItem}>
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Circle cx="12" cy="12" r="10" fill="none" stroke="#666" strokeWidth="2" />
                  <Path d="M2 12h20" fill="none" stroke="#666" strokeWidth="2" />
                  <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="#666" strokeWidth="2" />
                </Svg>
                <Text style={styles.linkText}>{resumeData.personalInfo.portfolio}</Text>
              </View>
            )}
            {resumeData.personalInfo.github && (
              <View style={styles.contactItem}>
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" fill="none" stroke="#666" strokeWidth="2" />
                </Svg>
                <Text style={styles.linkText}>{resumeData.personalInfo.github}</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
          {resumeData.experience.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <Text style={styles.jobTitle}>{exp.position || "Position Title"}</Text>
                <Text style={styles.date}>
                  {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                </Text>
              </View>
              <Text style={styles.company}>{exp.company || "Company Name"}</Text>
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <View style={styles.bulletPoints}>
                  {exp.bulletPoints.map((bullet, index) => (
                    hasContent(bullet) && (
                      <Text key={index} style={styles.bulletPoint}>
                        • {bullet}
                      </Text>
                    )
                  ))}
                </View>
              )}
              {hasContent(exp.description) && <Text style={styles.description}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {resumeData.education.map((edu) => (
            <View key={edu.id} style={styles.educationItem}>
              <View style={styles.educationHeader}>
                <Text style={styles.degree}>
                  {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                </Text>
                <Text style={styles.date}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
              </View>
              <Text style={styles.school}>{edu.school || "School Name"}</Text>
              {edu.gpa && <Text style={styles.gpa}>{edu.gpa}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <View style={styles.skillsContainer}>
            {resumeData.skills.map((skill, index) => (
              hasContent(skill.name) && (
                <View key={skill.id} style={styles.skillBadge}>
                  <Text style={styles.skill}>
                    {skill.name}
                  </Text>
                </View>
              )
            ))}
          </View>
        </View>
      )}

      {/* Custom Sections */}
      {resumeData.sections.map((section) => (
        hasContent(section.title) && hasContent(section.content) && (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.description}>{section.content}</Text>
          </View>
        )
      ))}

      {/* Dynamic Sections (Helper Sections) */}
      {resumeData.dynamicSections && Array.isArray(resumeData.dynamicSections) && resumeData.dynamicSections.length > 0 && (
        <>
          {resumeData.dynamicSections
            .filter(section => section.enabled)
            .sort((a, b) => a.order - b.order)
            .map(section => renderDynamicSection(section))}
        </>
      )}
      </Page>
    </Document>
  );
};
