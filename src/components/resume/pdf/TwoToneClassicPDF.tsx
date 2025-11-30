import { Document, Page, StyleSheet, Text, View, Svg, Path, Rect, Circle } from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
import { PDF_PAGE_MARGINS } from "@/lib/pdfConfig";

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
      fontSize: 32,
      fontWeight: 700,
      marginBottom: 6,
    },
    title: {
      fontSize: 13,
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
      marginRight: 12,
      marginBottom: 6,
    },
    content: {
      paddingHorizontal: 25,
      paddingBottom: 25,
    },
    section: {
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: color,
      marginBottom: 12,
      paddingBottom: 4,
      borderBottomWidth: 2,
      borderBottomColor: color,
    },
    lightBox: {
      backgroundColor: hexToRgba(color, 0.08),
      padding: 12,
      borderRadius: 4,
    },
    experienceItem: {
      marginBottom: 12,
      padding: 12,
      borderRadius: 4,
    },
    position: {
      fontSize: 12,
      fontWeight: 700,
    },
    company: {
      fontSize: 11,
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
      marginHorizontal: -3,
    },
    skillChip: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: color,
      color: "#ffffff",
      fontSize: 9,
      fontWeight: 500,
      borderRadius: 4,
      marginHorizontal: 3,
      marginBottom: 6,
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
              <Text style={styles.contactInfoItem}>✉ {personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactInfoItem}>☎ {personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.contactInfoItem}>📍 {personalInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Summary */}
          {personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <View style={styles.lightBox}>
                <Text style={[styles.description, { color: "#374151" }]}>{personalInfo.summary}</Text>
              </View>
            </View>
          )}

          {/* Social Links */}
          {personalInfo.linkedin || personalInfo.portfolio || personalInfo.github ? (
            <View style={styles.section}>
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
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {experience.map((exp, index) => (
                <View key={index} style={[styles.experienceItem, index % 2 === 0 ? styles.lightBox : {}]}>
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
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={[{ marginBottom: 8, padding: 8, borderRadius: 4 }, styles.lightBox]}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={styles.position}>{edu.degree}</Text>
                      <Text style={[styles.company, { color: "#4b5563" }]}>{edu.school}</Text>
                    </View>
                    <Text style={styles.dateRange}>{edu.graduationDate}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <View style={styles.section}>
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
            <View key={index} style={styles.section}>
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
