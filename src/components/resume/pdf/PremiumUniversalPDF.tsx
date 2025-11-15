import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeData } from "@/pages/Editor";
import { registerPDFFonts } from "@/lib/pdfFonts";

registerPDFFonts();

interface PremiumUniversalPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export const PremiumUniversalPDF = ({
  resumeData,
  themeColor = "#2563eb",
}: PremiumUniversalPDFProps) => {
  const hasContent = (value?: string | null) => value && value.trim().length > 0;

  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#ffffff",
      paddingTop: 40,
      paddingRight: 40,
      paddingBottom: 40,
      paddingLeft: 40,
      fontFamily: "Inter",
      color: "#111827",
    },
    header: {
      marginBottom: 20,
      paddingBottom: 16,
      borderBottomWidth: 2,
      borderBottomColor: themeColor,
    },
    name: {
      fontSize: 26,
      fontFamily: "Inter",
      fontWeight: 700,
      color: themeColor,
      marginBottom: 6,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 14,
      fontSize: 9,
      color: "#4b5563",
    },
    contactItem: {
      marginRight: 8,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 12,
      fontFamily: "Inter",
      fontWeight: 600,
      color: themeColor,
      marginBottom: 10,
    },
    summaryText: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
    },
    experienceItem: {
      marginBottom: 16,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    positionTitle: {
      fontSize: 11,
      fontFamily: "Inter",
      fontWeight: 600,
      color: "#111827",
    },
    companyName: {
      fontSize: 10,
      fontFamily: "Inter",
      fontWeight: 600,
      color: "#374151",
      marginTop: 2,
    },
    dateLocation: {
      fontSize: 8,
      color: "#4b5563",
      textAlign: "right",
    },
    description: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
    },
    bulletList: {
      marginTop: 4,
      paddingLeft: 12,
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
    educationItem: {
      marginBottom: 14,
    },
    educationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    degree: {
      fontSize: 11,
      fontFamily: "Inter",
      fontWeight: 600,
      color: "#111827",
    },
    institution: {
      fontSize: 10,
      color: "#374151",
      marginTop: 2,
    },
    gpa: {
      fontSize: 8,
      color: "#4b5563",
      marginTop: 2,
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    skillChip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      fontSize: 8,
      fontFamily: "Inter",
      fontWeight: 600,
      color: "#111827",
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 4,
    },
    certificationItem: {
      marginBottom: 12,
    },
    certificationName: {
      fontSize: 10,
      fontFamily: "Inter",
      fontWeight: 600,
      color: "#111827",
    },
    certificationDetails: {
      fontSize: 9,
      color: "#374151",
      marginTop: 2,
    },
    projectItem: {
      marginBottom: 16,
    },
    projectName: {
      fontSize: 11,
      fontFamily: "Inter",
      fontWeight: 600,
      color: "#111827",
    },
    projectDescription: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
      marginTop: 4,
    },
    customSectionItem: {
      marginBottom: 16,
    },
    customItemTitle: {
      fontSize: 11,
      fontFamily: "Inter",
      fontWeight: 600,
      color: "#111827",
    },
    customItemSubtitle: {
      fontSize: 10,
      fontFamily: "Inter",
      fontWeight: 600,
      color: "#374151",
      marginTop: 2,
    },
    customItemDescription: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
      marginTop: 4,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.email}</Text>
            )}
            {resumeData.personalInfo.phone && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.phone}</Text>
            )}
            {resumeData.personalInfo.location && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {resumeData.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.positionTitle}>{exp.position}</Text>
                    <Text style={styles.companyName}>{exp.company}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateLocation}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </Text>
                  </View>
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
        )                  </View>
                )}
              </View>
            ))}
        )          </View>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <View>
                    <Text style={styles.degree}>
                      {edu.degree} {hasContent(edu.field) && `in ${edu.field}`}
                    </Text>
                    <Text style={styles.institution}>{edu.school}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateLocation}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        )          </View>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.map((skill, index) => (
                <Text key={index} style={styles.skillChip}>
                  {skill.name}
                </Text>
              ))}
        )            </View>
          </View>
        )}

        {/* Custom Sections */}
        {resumeData.sections &&
          resumeData.sections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.description}>{section.content}</Text>
            </View>
          ))}
        )      </Page>
    </Document>
  );
};
