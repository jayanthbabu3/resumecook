import { Document, Page, StyleSheet, Text, View, Svg, Path, Rect, Circle } from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

interface TwoToneClassicPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const hexToRgba = (hex: string, alpha = 1) => {
  const cleanedHex = hex.replace("#", "");
  if (cleanedHex.length !== 6) {
    return hex;
  }
  const r = parseInt(cleanedHex.slice(0, 2), 16);
  const g = parseInt(cleanedHex.slice(2, 4), 16);
  const b = parseInt(cleanedHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const createStyles = (color: string) =>
  StyleSheet.create({
    page: {
      fontFamily: "Inter",
      fontSize: 10,
      backgroundColor: "#ffffff",
      paddingTop: PDF_PAGE_MARGINS.top,
      paddingBottom: PDF_PAGE_MARGINS.bottom,
      paddingHorizontal: PDF_PAGE_MARGINS.left,
    },
    header: {
      backgroundColor: color,
      paddingVertical: 25,
      paddingHorizontal: 25,
      color: "#ffffff",
      marginLeft: -PDF_PAGE_MARGINS.left,
      marginRight: -PDF_PAGE_MARGINS.right,
      marginTop: -PDF_PAGE_MARGINS.top,
      marginBottom: 20,
    },
    name: {
      fontSize: 26,
      fontWeight: 700,
      marginBottom: 6,
    },
    title: {
      fontSize: 11,
      opacity: 0.9,
      marginBottom: 12,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      fontSize: 9,
      opacity: 0.9,
    },
    contactInfoItem: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 12,
      marginBottom: 6,
    },
    contactText: {
      marginLeft: 4,
      fontSize: 9,
      opacity: 0.9,
    },
    content: {
      paddingHorizontal: 0,
      paddingBottom: 20,
    },
    section: {
      marginBottom: 20,
      pageBreakInside: 'avoid',
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: 700,
      color: color,
      marginBottom: 15,
      paddingBottom: 4,
      borderBottomWidth: 2,
      borderBottomColor: color,
      pageBreakAfter: 'avoid',
    },
    lightBox: {
      backgroundColor: hexToRgba(color, 0.08),
      padding: 12,
      borderRadius: 4,
    },
    experienceItem: {
      marginBottom: 12,
      padding: 10,
      borderRadius: 4,
    },
    position: {
      fontSize: 11,
      fontWeight: 700,
    },
    company: {
      fontSize: 10,
      fontWeight: 500,
      color: color,
      marginTop: 2,
    },
    dateRange: {
      fontSize: 9,
      color: "#6b7280",
    },
    description: {
      fontSize: 9,
      color: "#4b5563",
      lineHeight: 1.5,
      marginTop: 6,
    },
    descriptionItem: {
      marginBottom: 2,
      paddingLeft: 10,
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -2,
    },
    skillChip: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      backgroundColor: color,
      color: "#ffffff",
      fontSize: 8,
      fontWeight: 500,
      borderRadius: 4,
      marginHorizontal: 2,
      marginBottom: 4,
    },
    socialLinksContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      gap: 12,
      fontSize: 9.5,
      color: '#374151',
      marginTop: 6,
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

export const TwoToneClassicPDF = ({
  resumeData,
  themeColor = "#334155",
}: TwoToneClassicPDFProps) => {
  const styles = createStyles(themeColor);
  const { personalInfo, experience, education, skills, sections } = resumeData;

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName}</Text>
          {personalInfo.title && (
            <Text style={styles.title}>{personalInfo.title}</Text>
          )}
          <View style={styles.contactInfo}>
            {personalInfo.email && (
              <View style={styles.contactInfoItem}>
                <Svg width="8" height="8" viewBox="0 0 24 24">
                  <Path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" fill="none" stroke="#ffffff" strokeWidth="2" />
                </Svg>
                <Text style={styles.contactText}>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactInfoItem}>
                <Svg width="8" height="8" viewBox="0 0 24 24">
                  <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" fill="none" stroke="#ffffff" strokeWidth="2" />
                </Svg>
                <Text style={styles.contactText}>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={styles.contactInfoItem}>
                <Svg width="8" height="8" viewBox="0 0 24 24">
                  <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" fill="none" stroke="#ffffff" strokeWidth="2" />
                  <Circle cx="12" cy="10" r="3" fill="none" stroke="#ffffff" strokeWidth="2" />
                </Svg>
                <Text style={styles.contactText}>{personalInfo.location}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Summary */}
          {personalInfo.summary && (
            <View style={styles.section} break={false}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <View style={styles.lightBox}>
                <Text style={[styles.description, { color: "#374151" }]}>{personalInfo.summary}</Text>
              </View>
            </View>
          )}

          {/* Social Links */}
          {personalInfo.linkedin || personalInfo.portfolio || personalInfo.github ? (
            <View style={styles.section} break={false}>
              <Text style={styles.sectionTitle}>Social Links</Text>
              <View style={[styles.lightBox, styles.socialLinksContainer]}>
                {personalInfo.linkedin && (
                  <View style={styles.socialLinkItem}>
                    <Svg width="8" height="8" viewBox="0 0 24 24">
                      <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="#666" strokeWidth="2" />
                      <Rect x="2" y="9" width="4" height="12" fill="none" stroke="#666" strokeWidth="2" />
                      <Circle cx="4" cy="4" r="2" fill="none" stroke="#666" strokeWidth="2" />
                    </Svg>
                    <Text style={styles.linkText}>{personalInfo.linkedin}</Text>
                  </View>
                )}
                {personalInfo.portfolio && (
                  <View style={styles.socialLinkItem}>
                    <Svg width="8" height="8" viewBox="0 0 24 24">
                      <Circle cx="12" cy="12" r="10" fill="none" stroke="#666" strokeWidth="2" />
                      <Path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="#666" strokeWidth="2" />
                    </Svg>
                    <Text style={styles.linkText}>{personalInfo.portfolio}</Text>
                  </View>
                )}
                {personalInfo.github && (
                  <View style={styles.socialLinkItem}>
                    <Svg width="8" height="8" viewBox="0 0 24 24">
                      <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" fill="none" stroke="#666" strokeWidth="2" />
                    </Svg>
                    <Text style={styles.linkText}>{personalInfo.github}</Text>
                  </View>
                )}
              </View>
            </View>
          ) : null}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <View style={styles.section} break={experience.length > 3}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {experience.map((exp, index) => (
                <View key={index} style={[styles.experienceItem, index % 2 === 0 ? styles.lightBox : {}, { pageBreakInside: 'avoid' }]} break={index > 0}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <Text style={styles.dateRange}>{formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}</Text>
                  </View>
                  {/* Bullet Points */}
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <View style={styles.description}>
                      {exp.bulletPoints.map((bullet, bulletIndex) => (
                        bullet && (
                          <Text key={bulletIndex} style={styles.descriptionItem}>• {bullet}</Text>
                        )
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <View style={styles.section} break={education.length > 2}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={[{ marginBottom: 8, padding: 6, borderRadius: 4, pageBreakInside: 'avoid' }, styles.lightBox]} break={index > 0}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={styles.position}>{edu.degree}</Text>
                      {hasContent(edu.field) && <Text style={[styles.company, { color: "#4b5563" }]}>{edu.field}</Text>}
                      <Text style={[styles.company, { color: "#4b5563" }]}>{edu.school}</Text>
                      {hasContent(edu.gpa) && <Text style={[styles.company, { color: "#6b7280", marginTop: 2 }]}>GPA: {edu.gpa}</Text>}
                    </View>
                    <Text style={styles.dateRange}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <View style={styles.section} break={skills.length > 8}>
              <Text style={styles.sectionTitle}>Core Skills</Text>
              <View style={styles.skillsContainer}>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skillChip}>{skill.name}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Custom Sections */}
          {sections && sections.map((section, index) => (
            <View key={index} style={styles.section} break={index > 0}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.description}>{section.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default TwoToneClassicPDF;
