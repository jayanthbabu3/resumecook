import { Document, Page, View, Text, StyleSheet, Image, Svg, Path, Rect, Circle } from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
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
    alignItems: 'center',
  },
  photoWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    marginBottom: 12,
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  name: {
    fontSize: 26,
    fontFamily: 'Inter',
    fontWeight: 300,
    marginBottom: 8,
    letterSpacing: 1,
  },
  title: {
    fontSize: 11,
    color: '#666',
    marginBottom: 10,
    letterSpacing: 0.5,
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
  summary: {
    fontSize: 10,
    color: '#333',
    lineHeight: 1.5,
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000',
  },
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#e5e5e5',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 3,
  },
  company: {
    fontSize: 10,
    color: '#666',
  },
  date: {
    fontSize: 9,
    color: '#999',
  },
  description: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#333',
  },
  bulletPoints: {
    marginTop: 8,
  },
  bulletPoint: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#333',
    marginBottom: 4,
  },
  linkText: {
    fontSize: 9,
    color: '#0066cc',
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 3,
  },
  school: {
    fontSize: 10,
    color: '#666',
  },
  gpa: {
    fontSize: 9,
    color: '#999',
    marginTop: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
    marginTop: 5,
    marginBottom: 5,
  },
  skill: {
    fontSize: 9,
    color: '#333',
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    lineHeight: 1.2,
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

export const MinimalPDF = ({ resumeData, themeColor }: Props) => {
  const photo = resumeData.personalInfo.photo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        {photo ? (
          <View style={styles.photoWrapper}>
            <Image src={photo} style={styles.photo} />
          </View>
        ) : null}
        <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
        {resumeData.personalInfo.title && (
          <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
        )}
        <View style={styles.contactRow}>
          {resumeData.personalInfo.email && (
            <View style={styles.contactItem}>
              <Svg width="9" height="9" viewBox="0 0 24 24">
                <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#666" strokeWidth="2" />
                <Path d="m22 6-10 7L2 6" fill="none" stroke="#666" strokeWidth="2" />
              </Svg>
              <Text>{resumeData.personalInfo.email}</Text>
            </View>
          )}
          {resumeData.personalInfo.phone && (
            <View style={styles.contactItem}>
              <Svg width="9" height="9" viewBox="0 0 24 24">
                <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#666" strokeWidth="2" />
              </Svg>
              <Text>{resumeData.personalInfo.phone}</Text>
            </View>
          )}
          {resumeData.personalInfo.location && (
            <View style={styles.contactItem}>
              <Svg width="9" height="9" viewBox="0 0 24 24">
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
        <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
      )}

      {/* Social Links */}
      {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Links</Text>
          <View style={styles.contactRow}>
            {resumeData.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Svg width="9" height="9" viewBox="0 0 24 24">
                  <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="#666" strokeWidth="2" />
                  <Rect x="2" y="9" width="4" height="12" fill="none" stroke="#666" strokeWidth="2" />
                  <Circle cx="4" cy="4" r="2" fill="none" stroke="#666" strokeWidth="2" />
                </Svg>
                <Text style={styles.linkText}>{resumeData.personalInfo.linkedin}</Text>
              </View>
            )}
            {resumeData.personalInfo.portfolio && (
              <View style={styles.contactItem}>
                <Svg width="9" height="9" viewBox="0 0 24 24">
                  <Circle cx="12" cy="12" r="10" fill="none" stroke="#666" strokeWidth="2" />
                  <Path d="M2 12h20" fill="none" stroke="#666" strokeWidth="2" />
                  <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="#666" strokeWidth="2" />
                </Svg>
                <Text style={styles.linkText}>{resumeData.personalInfo.portfolio}</Text>
              </View>
            )}
            {resumeData.personalInfo.github && (
              <View style={styles.contactItem}>
                <Svg width="9" height="9" viewBox="0 0 24 24">
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
        <View style={styles.section} break={resumeData.experience.length > 3}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resumeData.experience.map((exp, index) => (
            <View
              key={exp.id}
              style={[
                styles.experienceItem,
                index === resumeData.experience.length - 1 && { borderBottom: 0 }
              ]}
              break
            >
              <View style={styles.experienceHeader}>
                <View>
                  <Text style={styles.jobTitle}>{exp.position || "Position Title"}</Text>
                  <Text style={styles.company}>{exp.company || "Company Name"}</Text>
                </View>
                <Text style={styles.date}>
                  {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                </Text>
              </View>
              {hasContent(exp.description) && <Text style={styles.description}>{exp.description}</Text>}
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <View style={styles.bulletPoints}>
                  {exp.bulletPoints.map((bullet, idx) => (
                    hasContent(bullet) && (
                      <Text key={idx} style={styles.bulletPoint}>
                        • {bullet}
                      </Text>
                    )
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <View style={styles.section} break={resumeData.education.length > 2}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resumeData.education.map((edu) => (
            <View key={edu.id} style={styles.educationItem} break>
              <View style={styles.experienceHeader}>
                <View>
                  <Text style={styles.degree}>
                    {edu.degree || "Degree"}{hasContent(edu.field) && `, ${edu.field}`}
                  </Text>
                  <Text style={styles.school}>{edu.school || "School Name"}</Text>
                  {hasContent(edu.gpa) && <Text style={styles.gpa}>Grade: {edu.gpa}</Text>}
                </View>
                <Text style={styles.date}>
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <View style={styles.section} break={resumeData.skills.length > 8}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {resumeData.skills.map((skill) => (
              hasContent(skill.name) && <Text key={skill.id} style={styles.skill}>{skill.name}</Text>
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
      </Page>
    </Document>
  );
};
