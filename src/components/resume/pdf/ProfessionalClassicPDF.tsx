import { Document, Page, Text, View, StyleSheet, Svg, Path, Rect, Circle } from '@react-pdf/renderer';
import type { ResumeData } from "@/types/resume";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const createStyles = (themeColor: string) => StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    fontFamily: 'Inter',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 8,
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 6,
    textAlign: 'center',
  },
  title: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 12,
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 9,
    color: '#6b7280',
  },
  separator: {
    color: '#9ca3af',
    marginHorizontal: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#d1d5db',
    marginTop: 0,
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 10,
  },
  position: {
    fontSize: 11,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 2,
  },
  company: {
    fontSize: 10,
    color: '#374151',
  },
  experienceDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  description: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    fontSize: 9.5,
    color: '#374151',
  },
  educationItem: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  educationContent: {
    flex: 1,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 2,
  },
  educationField: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 9.5,
    color: '#374151',
  },
  educationDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  bulletList: {
    marginTop: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 9.5,
    color: themeColor,
    marginRight: 6,
  },
  bulletText: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
    flex: 1,
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 9.5,
    color: '#374151',
    marginTop: 8,
  },
  socialLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkText: {
    fontSize: 9.5,
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

export const ProfessionalClassicPDF = ({ resumeData, themeColor = "#374151" }: Props) => {
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
          {hasContent(resumeData.personalInfo.title) && <Text style={styles.title}>{resumeData.personalInfo.title}</Text>}
          <View style={styles.contactContainer}>
            {hasContent(resumeData.personalInfo.email) && <Text>{resumeData.personalInfo.email}</Text>}
            {hasContent(resumeData.personalInfo.email) && hasContent(resumeData.personalInfo.phone) && (
              <Text style={styles.separator}>|</Text>
            )}
            {hasContent(resumeData.personalInfo.phone) && <Text>{resumeData.personalInfo.phone}</Text>}
            {hasContent(resumeData.personalInfo.phone) && hasContent(resumeData.personalInfo.location) && (
              <Text style={styles.separator}>|</Text>
            )}
            {hasContent(resumeData.personalInfo.location) && <Text>{resumeData.personalInfo.location}</Text>}
          </View>
        </View>

        <View style={styles.divider} />

        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Social Links */}
        {resumeData.includeSocialLinks && (resumeData.personalInfo.linkedin || resumeData.personalInfo.portfolio || resumeData.personalInfo.github) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Social Links</Text>
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

        {resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {resumeData.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.position}>{exp.position || "Position Title"}</Text>
                    <Text style={styles.company}>{exp.company || "Company Name"}</Text>
                  </View>
                  <Text style={styles.experienceDate}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                </View>
                {hasContent(exp.description) && <Text style={styles.description}>{exp.description}</Text>}
                
                {/* Bullet Points */}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.bulletPoints.map((bullet, bulletIndex) => (
                      bullet && (
                        <View key={bulletIndex} style={styles.bulletItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                      )
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.map((skill, index) => (
                hasContent(skill.name) ? (
                  <Text key={skill.id} style={styles.skillItem}>
                    {skill.name}{index < resumeData.skills.length - 1 ? ", " : ""}
                  </Text>
                ) : null
              ))}
            </View>
          </View>
        )}

        {resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.educationContent}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  {hasContent(edu.field) && <Text style={styles.educationField}>{edu.field}</Text>}
                  <Text style={styles.educationSchool}>{edu.school}</Text>
                  {hasContent(edu.gpa) && (
                    <Text style={[styles.educationField, { marginTop: 2 }]}>GPA: {edu.gpa}</Text>
                  )}
                </View>
                <Text style={styles.educationDate}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {resumeData.sections.map((section) => (
          hasContent(section.title) && hasContent(section.content) && (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.summary}>{section.content}</Text>
            </View>
          )
        ))}
      </Page>
    </Document>
  );
};
