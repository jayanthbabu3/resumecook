import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
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
      width: "35%",
      backgroundColor: color,
      padding: 20,
      color: "#ffffff",
    },
    mainContent: {
      width: "65%",
      padding: 25,
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
      marginBottom: 8,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.3)",
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
  });

export const SidebarAccentPDF = ({
  resumeData,
  themeColor = "#1e40af",
}: SidebarAccentPDFProps) => {
  const styles = createStyles(themeColor);
  const { personalInfo, experience, education, skills, sections } = resumeData;

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
            {personalInfo.email && <Text style={styles.contactItem}>✉ {personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contactItem}>☎ {personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contactItem}>📍 {personalInfo.location}</Text>}
          </View>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.skillChip}>{skill.name}</Text>
              ))}
            </View>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Education</Text>
              {education.map((edu, index) => (
                <View key={index} style={{ marginBottom: 10, fontSize: 9 }}>
                  <Text style={{ fontWeight: 600, marginBottom: 2 }}>{edu.degree}</Text>
                  <Text style={{ opacity: 0.9, marginBottom: 2 }}>{edu.institution}</Text>
                  <Text style={{ fontSize: 8, opacity: 0.75 }}>{edu.graduationDate}</Text>
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
                    <Text style={styles.dateRange}>{exp.startDate} - {exp.endDate || "Present"}</Text>
                  </View>
                  {exp.description && (
                    <View style={styles.description}>
                      {exp.description.split("\n").map((item, i) => (
                        <Text key={i} style={styles.descriptionItem}>• {item}</Text>
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
