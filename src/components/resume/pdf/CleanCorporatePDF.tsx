import { Document, Page, Text, View, StyleSheet, Svg, Path, Rect, Circle } from '@react-pdf/renderer';
import type { ResumeData } from "@/types/resume";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

// Blend hex color with white to simulate opacity (React-PDF doesn't handle rgba well for borders)
const hexToLightHex = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Blend with white (255, 255, 255) at given opacity
  const newR = Math.round(r * opacity + 255 * (1 - opacity));
  const newG = Math.round(g * opacity + 255 * (1 - opacity));
  const newB = Math.round(b * opacity + 255 * (1 - opacity));
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
};

// Convert hex to rgba for background colors (React-PDF handles rgba for backgroundColor)
const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const createStyles = (themeColor: string) => {
  const themeColor30 = hexToLightHex(themeColor, 0.3); // Light border color
  const themeColor05 = hexToRgba(themeColor, 0.05); // Light background color
  
  return StyleSheet.create({
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
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: themeColor,
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 6,
  },
  title: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 9.5,
    color: '#6b7280',
  },
  summaryContainer: {
    marginBottom: 24,
    paddingLeft: 12,
    borderLeftWidth: 0.5,
    borderLeftColor: themeColor,
    backgroundColor: themeColor05,
    padding: 12,
    pageBreakInside: 'avoid',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
  },
  section: {
    marginBottom: 24,
    pageBreakInside: 'avoid',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: themeColor,
    textTransform: 'uppercase',
    pageBreakAfter: 'avoid',
  },
  experienceItem: {
    marginBottom: 20,
    padding: 12,
    borderWidth: 0.5,
    borderColor: themeColor30,
    borderRadius: 4,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 10,
  },
  position: {
    fontSize: 12,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 3,
  },
  company: {
    fontSize: 10,
    fontWeight: 600,
    color: themeColor,
  },
  experienceDate: {
    fontSize: 9,
    color: '#6b7280',
  },
  description: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
  },
  bulletList: {
    marginTop: 6,
    marginLeft: 0,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 10,
    color: themeColor,
    marginRight: 6,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#374151',
    flex: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: themeColor,
    borderRadius: 4,
    fontSize: 9,
    fontWeight: 600,
    color: themeColor,
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
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 9,
    color: '#374151',
    marginTop: 8,
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
  });
};

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

export const CleanCorporatePDF = ({ resumeData, themeColor = "#6366f1" }: Props) => {
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
          {hasContent(resumeData.personalInfo.title) && <Text style={styles.title}>{resumeData.personalInfo.title}</Text>}
          <View style={styles.contactContainer}>
            {hasContent(resumeData.personalInfo.email) && <Text>{resumeData.personalInfo.email}</Text>}
            {hasContent(resumeData.personalInfo.phone) && <Text>{resumeData.personalInfo.phone}</Text>}
            {hasContent(resumeData.personalInfo.location) && <Text>{resumeData.personalInfo.location}</Text>}
          </View>
        </View>

        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.summaryContainer}>
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
            <Text style={styles.sectionTitle}>Professional Experience</Text>
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
                {/* Bullet Points Priority: Check bulletPoints first, then description */}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.bulletPoints.map((bullet, bulletIndex) => (
                      bullet && bullet.trim() && (
                        <View key={bulletIndex} style={styles.bulletItem}>
                          <Text style={styles.bullet}>•</Text>
                          <Text style={styles.bulletText}>{bullet}</Text>
                        </View>
                      )
                    ))}
                  </View>
                )}
                {/* Fallback to description if no bullet points */}
                {(!exp.bulletPoints || exp.bulletPoints.length === 0) && hasContent(exp.description) && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.map((skill) => (
                hasContent(skill.name) ? <Text key={skill.id} style={styles.skillItem}>{skill.name}</Text> : null
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
                </View>
                <Text style={styles.educationDate}>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {resumeData.sections.map((section) => (
          (hasContent(section.title) || hasContent(section.content)) && (
            <View key={section.id} style={styles.section}>
              {hasContent(section.title) && (
              <Text style={styles.sectionTitle}>{section.title}</Text>
              )}
              {hasContent(section.content) && (
              <Text style={styles.summary}>{section.content}</Text>
              )}
            </View>
          )
        ))}
      </Page>
    </Document>
  );
};
