import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
  Rect,
  Circle,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
import { PDF_PAGE_MARGINS } from "@/lib/pdfConfig";

interface SidebarAccentPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (color: string) =>
  StyleSheet.create({
    page: {
      fontFamily: "Inter",
      fontSize: 10,
      backgroundColor: "#ffffff",
      flexDirection: "row",
    },
    sidebar: {
      width: "33%",
      backgroundColor: color,
      paddingHorizontal: 18,
      paddingVertical: 24,
      color: "#ffffff",
    },
    mainContent: {
      width: "67%",
      paddingHorizontal: 22,
      paddingVertical: 24,
      backgroundColor: "#f9fafb",
    },
    sidebarName: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 8,
    },
    sidebarTitle: {
      fontSize: 10,
      opacity: 0.9,
      marginBottom: 15,
    },
    sidebarSection: {
      marginBottom: 15,
    },
    sidebarSectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 4,
    },
    sidebarSectionBorder: {
      height: 1,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      marginBottom: 8,
    },
    contactItem: {
      fontSize: 8,
      marginBottom: 6,
    },
    skillChip: {
      fontSize: 9,
      backgroundColor: "rgba(255,255,255,0.1)",
      padding: 6,
      borderRadius: 4,
      marginBottom: 4,
    },
    section: {
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: color,
      marginBottom: 12,
    },
    experienceCard: {
      backgroundColor: "#ffffff",
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
    },
    position: {
      fontSize: 12,
      fontWeight: 700,
    },
    company: {
      fontSize: 10,
      fontWeight: 500,
      color: color,
      marginTop: 2,
    },
    dateRange: {
      fontSize: 8,
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
    socialLinksContainer: {
      marginBottom: 12,
    },
    socialLinkItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
      gap: 4,
    },
    socialLinkText: {
      fontSize: 8,
      color: '#ffffff',
      opacity: 0.9,
    },
  });

export const SidebarAccentPDF = ({
  resumeData,
  themeColor = "#1e40af",
}: SidebarAccentPDFProps) => {
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
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <Text style={styles.sidebarName}>{personalInfo.fullName}</Text>
          {personalInfo.title && (
            <Text style={styles.sidebarTitle}>{personalInfo.title}</Text>
          )}

          {/* Contact */}
          <View style={styles.sidebarSection}>
            {personalInfo.email && (
              <View style={{ flexDirection: "row", marginBottom: 6 }}>
                <Text style={[styles.contactItem, { opacity: 0.8, marginRight: 6 }]}>Email:</Text>
                <Text style={styles.contactItem}>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={{ flexDirection: "row", marginBottom: 6 }}>
                <Text style={[styles.contactItem, { opacity: 0.8, marginRight: 6 }]}>Phone:</Text>
                <Text style={styles.contactItem}>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={{ flexDirection: "row", marginBottom: 6 }}>
                <Text style={[styles.contactItem, { opacity: 0.8, marginRight: 6 }]}>Location:</Text>
                <Text style={styles.contactItem}>{personalInfo.location}</Text>
              </View>
            )}
          </View>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              <View style={styles.sidebarSectionBorder} />
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skillChip}>{skill.name}</Text>
              ))}
            </View>
          )}

          {/* Social Links */}
          {personalInfo.linkedin || personalInfo.portfolio || personalInfo.github ? (
            <View style={styles.socialLinksContainer}>
              <Text style={styles.sidebarSectionTitle}>Social Links</Text>
              <View style={styles.sidebarSectionBorder} />
              {personalInfo.linkedin && (
                <View style={styles.socialLinkItem}>
                  <Svg width="8" height="8" viewBox="0 0 24 24">
                    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="#ffffff" strokeWidth="2" />
                    <Rect x="2" y="9" width="4" height="12" fill="none" stroke="#ffffff" strokeWidth="2" />
                    <Circle cx="4" cy="4" r="2" fill="none" stroke="#ffffff" strokeWidth="2" />
                  </Svg>
                  <Text style={styles.socialLinkText}>{personalInfo.linkedin}</Text>
                </View>
              )}
              {personalInfo.portfolio && (
                <View style={styles.socialLinkItem}>
                  <Svg width="8" height="8" viewBox="0 0 24 24">
                    <Circle cx="12" cy="12" r="10" fill="none" stroke="#ffffff" strokeWidth="2" />
                    <Path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke="#ffffff" strokeWidth="2" />
                  </Svg>
                  <Text style={styles.socialLinkText}>{personalInfo.portfolio}</Text>
                </View>
              )}
              {personalInfo.github && (
                <View style={styles.socialLinkItem}>
                  <Svg width="8" height="8" viewBox="0 0 24 24">
                    <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" fill="none" stroke="#ffffff" strokeWidth="2" />
                  </Svg>
                  <Text style={styles.socialLinkText}>{personalInfo.github}</Text>
                </View>
              )}
            </View>
          ) : null}

          {/* Education */}
          {education && education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Education</Text>
              <View style={styles.sidebarSectionBorder} />
              {education.map((edu, index) => (
                <View key={index} style={{ marginBottom: 10, fontSize: 9 }}>
                  <Text style={{ fontWeight: 600, marginBottom: 2 }}>{edu.degree}</Text>
                  {hasContent(edu.field) && (
                    <Text style={{ opacity: 0.9, marginBottom: 2 }}>{edu.field}</Text>
                  )}
                  <Text style={{ opacity: 0.9, marginBottom: 2 }}>{edu.school}</Text>
                  {hasContent(edu.gpa) && (
                    <Text style={{ fontSize: 8, opacity: 0.75, marginBottom: 2 }}>GPA: {edu.gpa}</Text>
                  )}
                  <Text style={{ fontSize: 8, opacity: 0.75 }}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Summary */}
          {personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={[styles.description, { color: "#374151" }]}>{personalInfo.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp, index) => (
                <View key={index} style={styles.experienceCard}>
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

export default SidebarAccentPDF;
