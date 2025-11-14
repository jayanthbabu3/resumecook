import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

interface RefinedPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (themeColor: string) => StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#1f2937",
    flexDirection: "row",
  },
  sidebar: {
    width: 200,
    backgroundColor: `${themeColor}15`,
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
  },
  mainContent: {
    flex: 1,
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
  },
  photo: {
    width: 100,
    height: 100,
    marginBottom: 24,
    objectFit: "cover",
    alignSelf: "center",
  },
  sidebarSection: {
    marginBottom: 24,
  },
  sidebarTitle: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#1f2937",
    marginBottom: 12,
  },
  contactItem: {
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 8,
    fontWeight: 600,
    color: themeColor,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 8,
    fontWeight: 300,
    color: "#374151",
    lineHeight: 1.4,
  },
  skillItem: {
    fontSize: 8,
    fontWeight: 300,
    color: "#374151",
    marginBottom: 6,
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationDegree: {
    fontSize: 8,
    fontWeight: 600,
    color: "#1f2937",
    marginBottom: 2,
  },
  educationField: {
    fontSize: 8,
    fontWeight: 300,
    color: "#374151",
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 8,
    fontWeight: 500,
    color: themeColor,
    marginBottom: 2,
  },
  educationDate: {
    fontSize: 8,
    fontWeight: 300,
    color: "#4b5563",
  },
  header: {
    marginBottom: 32,
  },
  name: {
    fontSize: 32,
    fontWeight: 300,
    letterSpacing: -0.5,
    color: themeColor,
    marginBottom: 6,
    lineHeight: 1.2,
  },
  title: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#374151",
    marginBottom: 16,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#374151",
    fontWeight: 300,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: "#1f2937",
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: themeColor,
    marginBottom: 16,
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    marginBottom: 8,
  },
  position: {
    fontSize: 10,
    fontWeight: 600,
    color: "#1f2937",
    marginBottom: 2,
  },
  companyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  company: {
    fontSize: 9,
    fontWeight: 500,
    color: themeColor,
  },
  date: {
    fontSize: 8,
    fontWeight: 500,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  bulletPoint: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 4,
    lineHeight: 1.5,
    fontWeight: 300,
    paddingLeft: 12,
  },
  bullet: {
    position: "absolute",
    left: 0,
  },
});

export const RefinedPDF = ({
  resumeData,
  themeColor = "#2563eb",
}: RefinedPDFProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Photo */}
          {personalInfo.photo && (
            <Image src={personalInfo.photo} style={styles.photo} />
          )}

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={styles.contactValue}>{personalInfo.location}</Text>
              </View>
            )}
          </View>

          {/* Skills */}
          {skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name}
                </Text>
              ))}
        )            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  {hasContent(edu.field) && (
                    <Text style={styles.educationField}>{edu.field}</Text>
                  )}
                  <Text style={styles.educationSchool}>{edu.school}</Text>
                  <Text style={styles.educationDate}>
                    {edu.startDate} — {edu.endDate}
                  </Text>
                </View>
              ))}
        )            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{personalInfo.fullName}</Text>
            <Text style={styles.title}>{personalInfo.title}</Text>
            {personalInfo.summary && (
              <Text style={styles.summary}>{personalInfo.summary}</Text>
            )}
          </View>

          {/* Professional Experience */}
          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <Text style={styles.position}>{exp.position}</Text>
                    <View style={styles.companyRow}>
                      <Text style={styles.company}>{exp.company}</Text>
                      <Text style={styles.date}>
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </Text>
                    </View>
                  </View>
                  {exp.description.split("\n").map((line, idx) => (
                    <Text key={idx} style={styles.bulletPoint}>
                      • {line}
                    </Text>
                  ))}
        )                </View>
              ))}
        )            </View>
          )}

          {/* Custom Sections */}
          {sections.map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.content.split("\n").map((line, idx) => (
                <Text key={idx} style={styles.bulletPoint}>
                  • {line}
                </Text>
              ))}
        )            </View>
          ))}
        )        </View>
      </Page>
    </Document>
  );
};