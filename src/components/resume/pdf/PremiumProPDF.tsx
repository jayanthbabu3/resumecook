import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";
import { registerPDFFonts } from "@/lib/pdfFonts";

registerPDFFonts();

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const PremiumProPDF = ({
  resumeData,
  themeColor = "#0f766e",
}: Props) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Inter",
      backgroundColor: "#ffffff",
      flexDirection: "row",
    },
    accentPanel: {
      width: 8,
      backgroundColor: themeColor,
    },
    mainContent: {
      flex: 1,
      paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    },
    header: {
      marginBottom: 32,
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 20,
    },
    headerLeft: {
      flex: 1,
    },
    name: {
      fontSize: 26,
      fontWeight: 700,
      color: "#111827",
      marginBottom: 6,
    },
    title: {
      fontSize: 12,
      fontWeight: 600,
      color: "#4b5563",
      marginBottom: 12,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 18,
      fontSize: 9,
      color: "#374151",
    },
    photoWrapper: {
      width: 72,
      height: 72,
      borderRadius: 12,
      borderWidth: 3,
      borderColor: themeColor,
      overflow: "hidden",
      marginLeft: 24,
    },
    photo: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    summaryContainer: {
      position: "relative",
      paddingLeft: 16,
    },
    summaryAccent: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 4,
      backgroundColor: themeColor,
      borderRadius: 2,
    },
    summaryText: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
    },
    contentGrid: {
      flexDirection: "row",
      gap: 28,
    },
    leftColumn: {
      width: "33.333%",
    },
    rightColumn: {
      flex: 1,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: themeColor,
      marginBottom: 12,
      paddingBottom: 6,
      borderBottomWidth: 1.5,
      borderBottomColor: themeColor,
    },
    educationItem: {
      marginBottom: 16,
    },
    degree: {
      fontSize: 10,
      fontWeight: 700,
      color: "#111827",
    },
    field: {
      fontSize: 8,
      color: "#4b5563",
      marginTop: 4,
    },
    school: {
      fontSize: 8,
      fontWeight: 600,
      color: themeColor,
      marginTop: 4,
    },
    dateText: {
      fontSize: 8,
      color: "#6b7280",
      marginTop: 4,
    },
    skillItem: {
      marginBottom: 12,
    },
    skillHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    skillName: {
      fontSize: 9,
      fontWeight: 600,
      color: "#111827",
    },
    skillLevel: {
      fontSize: 8,
      color: "#6b7280",
    },
    skillBar: {
      height: 6,
      backgroundColor: "#e5e7eb",
      borderRadius: 3,
      overflow: "hidden",
    },
    skillBarFill: {
      height: "100%",
      backgroundColor: themeColor,
      borderRadius: 3,
    },
    experienceItem: {
      marginBottom: 20,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    experienceLeft: {
      flex: 1,
    },
    position: {
      fontSize: 10.5,
      fontWeight: 700,
      color: "#111827",
    },
    company: {
      fontSize: 9.5,
      fontWeight: 600,
      color: themeColor,
      marginTop: 4,
    },
    dateBadge: {
      fontSize: 8,
      fontWeight: 600,
      color: themeColor,
      backgroundColor: `${themeColor}20`,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 999,
    },
    bulletList: {
      marginTop: 6,
      paddingLeft: 14,
    },
    bulletItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 4,
      gap: 6,
    },
    bulletDot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      marginTop: 4,
      backgroundColor: themeColor,
    },
    bulletText: {
      fontSize: 9,
      lineHeight: 1.5,
      color: "#374151",
      flex: 1,
    },
    sectionContent: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
    },
  });

  const photo = resumeData.personalInfo.photo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Accent Panel */}
        <View style={styles.accentPanel} />
        
        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.headerLeft}>
                <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
                {resumeData.personalInfo.title && (
                  <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
                )}
                <View style={styles.contactInfo}>
                  {resumeData.personalInfo.email && (
                    <Text>{resumeData.personalInfo.email}</Text>
                  )}
                  {resumeData.personalInfo.phone && (
                    <Text>{resumeData.personalInfo.phone}</Text>
                  )}
                  {resumeData.personalInfo.location && (
                    <Text>{resumeData.personalInfo.location}</Text>
                  )}
                </View>
              </View>
              {photo && (
                <View style={styles.photoWrapper}>
                  <Image src={photo} style={styles.photo} />
                </View>
              )}
            </View>
            
            {hasContent(resumeData.personalInfo.summary) && (
              <View style={styles.summaryContainer}>
                <View style={styles.summaryAccent} />
                <Text style={styles.summaryText}>
                  {resumeData.personalInfo.summary}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.contentGrid}>
            {/* Left Column */}
            <View style={styles.leftColumn}>
              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Education</Text>
                  {resumeData.education.map((edu, index) => (
                    <View key={index} style={styles.educationItem}>
                      <Text style={styles.degree}>{edu.degree}</Text>
                      {hasContent(edu.field) && <Text style={styles.field}>{edu.field}</Text>}
                      <Text style={styles.school}>{edu.school}</Text>
                      <Text style={styles.dateText}>
                        {edu.startDate} - {edu.endDate}
                      </Text>
                    </View>
                  ))}
        )                </View>
              )}

              {/* Skills */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Skills</Text>
                  {resumeData.skills.map((skill) => (
                    <View key={skill.id} style={styles.skillItem}>
                      <View style={styles.skillHeader}>
                        <Text style={styles.skillName}>{skill.name}</Text>
                        {skill.level && (
                          <Text style={styles.skillLevel}>{skill.level}/10</Text>
                        )}
                      </View>
                      {skill.level && (
                        <View style={styles.skillBar}>
                          <View
                            style={[
                              styles.skillBarFill,
                              { width: `${skill.level * 10}%` },
                            ]}
                          />
                        </View>
                      )}
                    </View>
                  ))}
        )                </View>
              )}
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
              {/* Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Professional Experience</Text>
                  {resumeData.experience.map((exp, index) => (
                    <View key={index} style={styles.experienceItem}>
                      <View style={styles.experienceHeader}>
                        <View style={styles.experienceLeft}>
                          <Text style={styles.position}>{exp.position}</Text>
                          <Text style={styles.company}>{exp.company}</Text>
                        </View>
                        <Text style={styles.dateBadge}>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </Text>
                      </View>
                      {hasContent(exp.description) && (
                        <View style={styles.bulletList}>
                          {exp.description
                            .split("\n")
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((point, bulletIndex) => (
                              <View key={bulletIndex} style={styles.bulletItem}>
                                <View style={styles.bulletDot} />
                                <Text style={styles.bulletText}>{point}</Text>
                              </View>
                            ))}
        )                        </View>
                      )}
                    </View>
                  ))}
        )                </View>
              )}

              {/* Sections */}
              {resumeData.sections &&
                resumeData.sections.map((section, index) => (
                  <View key={index} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <Text style={styles.sectionContent}>{section.content}</Text>
                  </View>
                ))}
        )            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
