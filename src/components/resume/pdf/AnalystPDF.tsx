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

interface AnalystPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#1f2937",
  },
  header: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 2,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#1f2937",
  },
  contact: {
    fontSize: 9,
    color: "#4b5563",
    marginBottom: 2,
    flexWrap: "nowrap",
  },
  photo: {
    width: 80,
    height: 80,
    marginLeft: 24,
    objectFit: "cover",
  },
  divider: {
    height: 0.5,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionDivider: {
    height: 0.5,
    marginBottom: 12,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.6,
    color: "#374151",
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  experienceTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1f2937",
  },
  experienceDate: {
    fontSize: 9,
    fontWeight: 600,
    color: "#1f2937",
  },
  bulletPoint: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 2,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 10,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  educationTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1f2937",
  },
  educationSchool: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 1,
  },
  educationNote: {
    fontSize: 9,
    color: "#4b5563",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    width: "22%",
    fontSize: 9,
    color: "#374151",
    marginBottom: 4,
  },
  customSection: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 2,
  },
});

export const AnalystPDF = ({
  resumeData,
  themeColor = "#2563eb",
}: AnalystPDFProps) => {
  const { personalInfo, experience, education, skills, sections } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.name, { color: themeColor }]}>
              {personalInfo.fullName}
            </Text>
            <View style={{ height: 6 }} />
            <Text style={styles.title}>{personalInfo.title}</Text>
            <View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
              <Text style={styles.contact}>
                {[
                  personalInfo.location,
                  personalInfo.phone,
                  personalInfo.email,
                ]
                  .filter(Boolean)
                  .join(" | ")}
              </Text>
            </View>
          </View>
          {personalInfo.photo && (
            <Image src={personalInfo.photo} style={styles.photo} />
          )}
        </View>

        {/* Summary */}
        {personalInfo.summary && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>
              Summary
            </Text>
            <View
              style={[styles.sectionDivider, { backgroundColor: themeColor }]}
            />
            <Text style={styles.summary}>{personalInfo.summary}</Text>
          </View>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>
              Professional Experience
            </Text>
            <View
              style={[styles.sectionDivider, { backgroundColor: themeColor }]}
            />
            {experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>
                    {exp.position}, {exp.company}
                  </Text>
                  <Text style={styles.experienceDate}>
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </Text>
                </View>
                {exp.description.split("\n").map((line, idx) => (
                  <Text key={idx} style={styles.bulletPoint}>
                    • {line}
                  </Text>
                ))}
        )              </View>
            ))}
        )          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>
              Education
            </Text>
            <View
              style={[styles.sectionDivider, { backgroundColor: themeColor }]}
            />
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.educationTitle}>
                    {edu.degree} {hasContent(edu.field) && `in ${edu.field}`}
                  </Text>
                  <Text style={styles.experienceDate}>
                    {edu.startDate} — {edu.endDate}
                  </Text>
                </View>
                <Text style={styles.educationSchool}>{edu.school}</Text>
                <Text style={styles.educationNote}>
                  • Graduated with High Honors.
                </Text>
              </View>
            ))}
        )          </View>
        )}

        {/* Technical Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>
              Technical Skills
            </Text>
            <View
              style={[styles.sectionDivider, { backgroundColor: themeColor }]}
            />
            <View style={styles.skillsGrid}>
              {skills.map((skill) => (
                <Text key={skill.id} style={styles.skillItem}>
                  {skill.name}
                </Text>
              ))}
        )            </View>
          </View>
        )}

        {/* Custom Sections */}
        {sections.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>
              {section.title}
            </Text>
            <View
              style={[styles.sectionDivider, { backgroundColor: themeColor }]}
            />
            {section.content.split("\n").map((line, idx) => (
              <Text key={idx} style={styles.customSection}>
                • {line}
              </Text>
            ))}
        )          </View>
        ))}
        )      </Page>
    </Document>
  );
};
