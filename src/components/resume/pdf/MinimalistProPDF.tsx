import { Document, Page, Text, View, StyleSheet, Svg, Path, Rect, Circle } from '@react-pdf/renderer';
import type { ResumeData } from "@/types/resume";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top + 20,
    paddingRight: PDF_PAGE_MARGINS.right + 20,
    paddingBottom: PDF_PAGE_MARGINS.bottom + 20,
    paddingLeft: PDF_PAGE_MARGINS.left + 20,
    fontFamily: 'Inter',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 300,
    color: '#475569',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 18,
  },
  contactContainer: {
    flexDirection: 'row',
    fontSize: 9,
    color: '#6b7280',
  },
  contactItem: {
    marginRight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#47556930',
    marginBottom: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#475569',
    marginBottom: 12,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  position: {
    fontSize: 11,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 2,
  },
  company: {
    fontSize: 9.5,
    color: '#6b7280',
  },
  experienceDate: {
    fontSize: 8.5,
    color: '#9ca3af',
  },
  description: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  bulletPoints: {
    marginTop: 6,
  },
  bulletPointItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    width: 8,
    fontSize: 9.5,
    marginRight: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 9,
    color: '#6b7280',
  },
  socialLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkText: {
    fontSize: 9,
    color: '#0066cc',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
  },
  skillItem: {
    fontSize: 9.5,
    color: '#374151',
    marginRight: 18,
    marginBottom: 4,
  },
  educationItem: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  educationContent: {
    flex: 1,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 2,
  },
  educationField: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 9,
    color: '#4b5563',
  },
  educationDate: {
    fontSize: 8.5,
    color: '#9ca3af',
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

export const MinimalistProPDF = ({ resumeData, themeColor = "#475569" }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.name, { color: themeColor }]}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
          {hasContent(resumeData.personalInfo.title) && (
            <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
          )}

          {/* Contact */}
          <View style={styles.contactContainer}>
            {hasContent(resumeData.personalInfo.email) && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.email}</Text>
            )}
            {hasContent(resumeData.personalInfo.phone) && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.phone}</Text>
            )}
            {hasContent(resumeData.personalInfo.location) && (
              <Text>{resumeData.personalInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.section}>
            <View style={[styles.divider, { backgroundColor: `${themeColor}30` }]} />
            <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Social Links */}
        {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Social Links</Text>
            <View style={styles.socialLinksContainer}>
              {resumeData.personalInfo.linkedin && (
                <View style={styles.socialLinkItem}>
                  <Svg width="10" height="10" viewBox="0 0 24 24">
                    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="#666" strokeWidth="2" />
                    <Rect x="2" y="9" width="4" height="12" fill="none" stroke="#666" strokeWidth="2" />
                    <Circle cx="4" cy="4" r="2" fill="none" stroke="#666" strokeWidth="2" />
                  </Svg>
                  <Text style={styles.linkText}>{resumeData.personalInfo.linkedin}</Text>
                </View>
              )}
              {resumeData.personalInfo.portfolio && (
                <View style={styles.socialLinkItem}>
                  <Svg width="10" height="10" viewBox="0 0 24 24">
                    <Circle cx="12" cy="12" r="10" fill="none" stroke="#666" strokeWidth="2" />
                    <Path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="#666" strokeWidth="2" />
                  </Svg>
                  <Text style={styles.linkText}>{resumeData.personalInfo.portfolio}</Text>
                </View>
              )}
              {resumeData.personalInfo.github && (
                <View style={styles.socialLinkItem}>
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
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Experience</Text>
            {resumeData.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.position}>{exp.position || "Position Title"}</Text>
                    <Text style={styles.company}>{exp.company || "Company Name"}</Text>
                  </View>
                  <Text style={styles.experienceDate}>
                    {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                </View>
                {exp.bulletPoints && exp.bulletPoints.length > 0 ? (
                  <View style={styles.bulletPoints}>
                    {exp.bulletPoints.map((bullet, index) => (
                      hasContent(bullet) && (
                        <View key={index} style={styles.bulletPointItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                      )
                    ))}
                  </View>
                ) : (
                  hasContent(exp.description) && <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.map((skill) => (
                hasContent(skill.name) ? (
                  <Text key={skill.id} style={styles.skillItem}>{skill.name}</Text>
                ) : null
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
            {resumeData.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.educationContent}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  {hasContent(edu.field) && <Text style={styles.educationField}>{edu.field}</Text>}
                  <Text style={styles.educationSchool}>{edu.school}</Text>
                </View>
                <Text style={styles.educationDate}>
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {resumeData.sections && resumeData.sections.length > 0 && (
          <>
            {resumeData.sections.map((section) => (
              hasContent(section.title) || hasContent(section.content) ? (
                <View key={section.id} style={styles.section}>
                  {hasContent(section.title) && (
                    <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title || "Section"}</Text>
                  )}
                  {hasContent(section.content) && (
                    <Text style={styles.summary}>{section.content}</Text>
                  )}
                </View>
              ) : null
            ))}
          </>
        )}
      </Page>
    </Document>
  );
};
