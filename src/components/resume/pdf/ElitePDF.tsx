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

interface ElitePDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#1f2937",
  },
  accentBar: {
    width: 8,
  },
  mainContent: {
    flex: 1,
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
  },
  header: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: 300,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#374151",
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contactItem: {
    fontSize: 9,
    color: "#4b5563",
  },
  photo: {
    width: 90,
    height: 90,
    marginLeft: 24,
    objectFit: "cover",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionAccent: {
    width: 32,
    height: 3,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  sectionContent: {
    paddingLeft: 40,
  },
  summary: {
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
    marginBottom: 6,
  },
  experienceLeft: {
    flex: 1,
  },
  position: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: 2,
  },
  company: {
    fontSize: 9,
    fontWeight: 600,
  },
  date: {
    fontSize: 9,
    fontWeight: 500,
    color: "#4b5563",
  },
  bulletPoint: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 3,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 12,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  degree: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: 2,
  },
  school: {
    fontSize: 9,
    fontWeight: 600,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    width: "33%",
    fontSize: 9,
    color: "#374151",
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  skillBullet: {
    fontSize: 8,
    marginRight: 4,
  },
  customContent: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 2,
  },
});

export const ElitePDF = ({
  resumeData,
  themeColor = "#7c3aed",
}: ElitePDFProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Accent Bar */}
        <View style={[styles.accentBar, { backgroundColor: themeColor }]} />

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={[styles.name, { color: themeColor }]}>
                {personalInfo.fullName}
              </Text>
              <Text style={styles.title}>{personalInfo.title}</Text>
              <View style={styles.contactRow}>
                {personalInfo.location && (
                  <Text style={styles.contactItem}>
                    📍 {personalInfo.location}
                  </Text>
                )}
                {personalInfo.phone && (
                  <Text style={styles.contactItem}>
                    📞 {personalInfo.phone}
                  </Text>
                )}
                {personalInfo.email && (
                  <Text style={styles.contactItem}>
                    ✉️ {personalInfo.email}
                  </Text>
                )}
              </View>
            </View>
            {personalInfo.photo && (
              <Image src={personalInfo.photo} style={styles.photo} />
            )}
          </View>

          {/* Professional Summary */}
          {personalInfo.summary && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View
                  style={[styles.sectionAccent, { backgroundColor: themeColor }]}
                />
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  Professional Summary
                </Text>
              </View>
              <View style={styles.sectionContent}>
                <Text style={styles.summary}>{personalInfo.summary}</Text>
              </View>
            </View>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View
                  style={[styles.sectionAccent, { backgroundColor: themeColor }]}
                />
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  Experience
                </Text>
              </View>
              <View style={styles.sectionContent}>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View style={styles.experienceLeft}>
                        <Text style={styles.position}>{exp.position}</Text>
                        <Text style={[styles.company, { color: themeColor }]}>
                          {exp.company}
                        </Text>
                      </View>
                      <Text style={styles.date}>
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </Text>
                    </View>
                    {exp.description.split("\n").map((line, idx) => (
                      <Text key={idx} style={styles.bulletPoint}>
                        • {line}
                      </Text>
                    ))}
        )                  </View>
                ))}
        )              </View>
            </View>
          )}

          {/* Education */}
          {education.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View
                  style={[styles.sectionAccent, { backgroundColor: themeColor }]}
                />
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  Education
                </Text>
              </View>
              <View style={styles.sectionContent}>
                {education.map((edu) => (
                  <View key={edu.id} style={styles.educationItem}>
                    <View style={styles.educationHeader}>
                      <View style={styles.experienceLeft}>
                        <Text style={styles.degree}>
                          {edu.degree} {hasContent(edu.field) && `in ${edu.field}`}
                        </Text>
                        <Text style={[styles.school, { color: themeColor }]}>
                          {edu.school}
                        </Text>
                      </View>
                      <Text style={styles.date}>
                        {edu.startDate} — {edu.endDate}
                      </Text>
                    </View>
                  </View>
                ))}
        )              </View>
            </View>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View
                  style={[styles.sectionAccent, { backgroundColor: themeColor }]}
                />
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  Core Competencies
                </Text>
              </View>
              <View style={styles.sectionContent}>
                <View style={styles.skillsGrid}>
                  {skills.map((skill) => (
                    <View key={skill.id} style={styles.skillItem}>
                      <Text style={[styles.skillBullet, { color: themeColor }]}>
                        ▪
                      </Text>
                      <Text>{skill.name}</Text>
                    </View>
                  ))}
        )                </View>
              </View>
            </View>
          )}

          {/* Custom Sections */}
          {sections.map((section) => (
            <View key={section.id} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View
                  style={[styles.sectionAccent, { backgroundColor: themeColor }]}
                />
                <Text style={[styles.sectionTitle, { color: themeColor }]}>
                  {section.title}
                </Text>
              </View>
              <View style={styles.sectionContent}>
                {section.content.split("\n").map((line, idx) => (
                  <Text key={idx} style={styles.customContent}>
                    • {line}
                  </Text>
                ))}
        )              </View>
            </View>
          ))}
        )        </View>
      </Page>
    </Document>
  );
};
