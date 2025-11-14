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

export const PremiumFresherPDF = ({
  resumeData,
  themeColor = "#7C3AED",
}: Props) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Inter",
      backgroundColor: "#ffffff",
      paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    },
    header: {
      marginBottom: 24,
      paddingBottom: 16,
      borderBottomWidth: 2,
      borderBottomColor: themeColor,
    },
    headerContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    headerLeft: {
      flex: 1,
    },
    name: {
      fontSize: 24,
      fontWeight: 700,
      color: themeColor,
      marginBottom: 4,
    },
    title: {
      fontSize: 11,
      color: "#4b5563",
      marginBottom: 12,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 24,
      fontSize: 9,
      color: "#374151",
    },
    photoWrapper: {
      width: 64,
      height: 64,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: themeColor,
      overflow: "hidden",
      marginLeft: 16,
    },
    photo: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    summarySection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: themeColor,
      marginBottom: 12,
    },
    summaryText: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
    },
    mainContent: {
      flexDirection: "row",
      gap: 24,
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
    educationItem: {
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
    },
    educationItemLast: {
      marginBottom: 16,
      paddingBottom: 0,
      borderBottomWidth: 0,
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
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    skillName: {
      fontSize: 9,
      color: "#111827",
      flex: 1,
    },
    skillLevelContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    skillBar: {
      width: 64,
      height: 6,
      backgroundColor: "#e5e7eb",
      borderRadius: 999,
      overflow: "hidden",
    },
    skillBarFill: {
      height: "100%",
      backgroundColor: themeColor,
      borderRadius: 999,
    },
    skillLevel: {
      fontSize: 8,
      color: "#6b7280",
      width: 32,
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
      fontSize: 10,
      fontWeight: 700,
      color: "#111827",
    },
    company: {
      fontSize: 10,
      fontWeight: 600,
      color: themeColor,
      marginTop: 4,
    },
    dateRange: {
      fontSize: 8,
      color: "#4b5563",
    },
    description: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
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
        </View>

        {/* Professional Summary */}
        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resumeData.education.map((edu, index) => (
                  <View 
                    key={index} 
                    style={index === resumeData.education.length - 1 ? styles.educationItemLast : styles.educationItem}
                  >
                    <Text style={styles.degree}>{edu.degree}</Text>
                    {hasContent(edu.field) && <Text style={styles.field}>{edu.field}</Text>}
                    <Text style={styles.school}>{edu.school}</Text>
                    <Text style={styles.dateText}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                  </View>
                ))}
        )              </View>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Technical Skills</Text>
                {resumeData.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillItem}>
                    <Text style={styles.skillName}>{skill.name}</Text>
                    {skill.level && (
                      <View style={styles.skillLevelContainer}>
                        <View style={styles.skillBar}>
                          <View
                            style={[
                              styles.skillBarFill,
                              { width: `${skill.level * 10}%` },
                            ]}
                          />
                        </View>
                        <Text style={styles.skillLevel}>{skill.level}/10</Text>
                      </View>
                    )}
                  </View>
                ))}
        )              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {resumeData.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View style={styles.experienceLeft}>
                        <Text style={styles.position}>{exp.position}</Text>
                        <Text style={styles.company}>{exp.company}</Text>
                      </View>
                      <Text style={styles.dateRange}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </Text>
                    </View>
                    {hasContent(exp.description) && (
                      <Text style={styles.description}>{exp.description}</Text>
                    )}
                  </View>
                ))}
        )              </View>
            )}

            {/* Projects/Sections */}
            {resumeData.sections &&
              resumeData.sections.map((section, index) => (
                <View key={index} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  <Text style={styles.sectionContent}>{section.content}</Text>
                </View>
              ))}
        )          </View>
        </View>
      </Page>
    </Document>
  );
};
