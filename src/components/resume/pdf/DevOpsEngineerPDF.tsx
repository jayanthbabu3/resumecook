import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
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
    backgroundColor: '#1f2937',
    paddingHorizontal: 48,
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  name: {
    fontSize: 36,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 8,
    color: '#ffffff',
  },
  title: {
    fontSize: 15,
    marginBottom: 16,
    color: '#326ce5',
    fontWeight: 600,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 11.5,
    color: '#d1d5db',
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
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 10,
    color: '#111827',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionAccent: {
    fontSize: 20,
    color: '#326ce5',
  },
  experienceItem: {
    marginBottom: 14,
  },
  jobTitle: {
    fontSize: 15,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 2,
    color: '#111827',
  },
  company: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: 600,
    color: '#326ce5',
    marginBottom: 2,
  },
  date: {
    fontSize: 11.5,
    color: '#6b7280',
    marginBottom: 5,
    fontWeight: 500,
  },
  description: {
    fontSize: 12.5,
    lineHeight: 1.75,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 10,
  },
  degree: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 2,
    color: '#111827',
  },
  field: {
    fontSize: 12.5,
    color: '#4b5563',
    marginBottom: 2,
  },
  school: {
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: 500,
    color: '#374151',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skill: {
    fontSize: 12,
    color: '#326ce5',
    backgroundColor: '#e8f1fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#93c5fd',
    fontWeight: 500,
  },
  summary: {
    fontSize: 13,
    lineHeight: 1.8,
    color: '#374151',
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

export const DevOpsEngineerPDF = ({ resumeData, themeColor = "#326ce5" }: Props) => {
  const photo = resumeData.personalInfo.photo;

  // Render a single dynamic section
  const renderDynamicSection = (section: ResumeSection) => {
    if (!section.enabled) return null;

    const sectionData = section.data;

    switch (sectionData.type) {
      case 'certifications':
        return sectionData.items.length > 0 ? (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
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
            <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
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
            <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
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
            <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
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
            <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
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
            <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
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
            <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
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
            <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
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
            <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
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
            <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
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
            <View style={{ flex: 1 }}>
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
                <Text>✉ {resumeData.personalInfo.email}</Text>
              </View>
            )}
            {resumeData.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text>☎ {resumeData.personalInfo.phone}</Text>
              </View>
            )}
            {resumeData.personalInfo.location && (
              <View style={styles.contactItem}>
                <Text>📍 {resumeData.personalInfo.location}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={{ paddingHorizontal: 48, paddingVertical: 36 }}>
          {/* Summary */}
          {hasContent(resumeData.personalInfo.summary) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>▍ PROFESSIONAL SUMMARY</Text>
              <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>▍ TECHNICAL SKILLS</Text>
              <View style={styles.skillsContainer}>
                {resumeData.skills.map((skill) => (
                  hasContent(skill.name) && (
                    <Text key={skill.id} style={styles.skill}>
                      {skill.name}
                    </Text>
                  )
                ))}
              </View>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>▍ PROFESSIONAL EXPERIENCE</Text>
              {resumeData.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <Text style={styles.jobTitle}>{exp.position || "Position Title"}</Text>
                  <Text style={styles.company}>{exp.company || "Company Name"}</Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                  {hasContent(exp.description) && <Text style={styles.description}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>▍ EDUCATION</Text>
              {resumeData.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree || "Degree"}</Text>
                  {edu.field && <Text style={styles.field}>{edu.field}</Text>}
                  <Text style={styles.school}>{edu.school || "School Name"}</Text>
                  <Text style={styles.date}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Custom Sections */}
          {resumeData.sections.map((section) => (
            hasContent(section.title) && hasContent(section.content) && (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionTitle}>▍ {section.title.toUpperCase()}</Text>
                <Text style={styles.description}>{section.content}</Text>
              </View>
            )
          ))}

          {/* Dynamic Sections */}
          {resumeData.dynamicSections && Array.isArray(resumeData.dynamicSections) && resumeData.dynamicSections.length > 0 && (
            <>
              {resumeData.dynamicSections
                .filter(section => section.enabled)
                .sort((a, b) => a.order - b.order)
                .map(section => renderDynamicSection(section))}
            </>
          )}
        </View>
      </Page>
    </Document>
  );
};
