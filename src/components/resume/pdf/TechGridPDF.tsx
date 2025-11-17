import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const createStyles = (color: string) => StyleSheet.create({
  page: {
    fontSize: 10,
    fontFamily: "Inter",
    backgroundColor: "#f9fafb", // gray-50
  },
  header: {
    backgroundColor: color,
    paddingTop: 36,
    paddingBottom: 30,
    paddingHorizontal: 45,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 24,
  },
  name: {
    fontSize: 40,
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: "row",
    gap: 18,
    fontSize: 11.5,
    color: "rgba(255, 255, 255, 0.8)",
  },
  photoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    paddingHorizontal: 45,
    paddingTop: 30,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: color,
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 18,
    marginBottom: 14,
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 18,
    marginBottom: 24,
  },
  summaryText: {
    fontSize: 12.5,
    lineHeight: 1.8,
    color: "#374151",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 11,
    borderLeftWidth: 4,
    borderLeftColor: color,
    width: "31%",
  },
  skillText: {
    fontSize: 12,
    fontWeight: 600,
    color: "#1f2937",
  },
  expCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 18,
    marginBottom: 14,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 12,
  },
  expPosition: {
    fontSize: 14.5,
    fontWeight: 700,
    color: color,
    marginBottom: 4,
  },
  expCompany: {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
  },
  expDate: {
    fontSize: 11,
    fontWeight: 700,
    color: color,
    backgroundColor: `${color}15`,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 6,
  },
  expDescription: {
    fontSize: 12,
    lineHeight: 1.75,
    color: "#374151",
  },
  eduCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  eduDegree: {
    fontSize: 13,
    fontWeight: 700,
    color: color,
    marginBottom: 3,
  },
  eduField: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 3,
  },
  eduSchool: {
    fontSize: 11.5,
    color: "#4b5563",
    marginBottom: 3,
  },
  eduDate: {
    fontSize: 11,
    color: "#6b7280",
  },
});

const formatDate = (date: string): string => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const TechGridPDF = ({ resumeData, themeColor = "#4f46e5" }: Props) => {
  const styles = createStyles(themeColor);
  const photo = resumeData.personalInfo.photo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Gradient Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
              {resumeData.personalInfo.title && (
                <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
              )}
              <View style={styles.contactRow}>
                {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
                {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
                {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}
              </View>
            </View>
            {photo && (
              <View style={styles.photoWrapper}>
                <Image src={photo} style={styles.photo} />
              </View>
            )}
          </View>
        </View>

        <View style={styles.content}>
          {/* Professional Summary */}
          {hasContent(resumeData.personalInfo.summary) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
              </View>
            </View>
          )}

          {/* Skills - 3 Column Grid */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Technical Skills</Text>
              <View style={styles.skillsGrid}>
                {resumeData.skills.map((skill) => (
                  hasContent(skill.name) && (
                    <View key={skill.id} style={styles.skillCard}>
                      <Text style={styles.skillText}>{skill.name}</Text>
                    </View>
                  )
                ))}
              </View>
            </View>
          )}

          {/* Professional Experience - Card Style */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {resumeData.experience.map((exp) => (
                <View key={exp.id} style={styles.expCard}>
                  <View style={styles.expHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.expPosition}>{exp.position || "Position"}</Text>
                      <Text style={styles.expCompany}>{exp.company || "Company"}</Text>
                    </View>
                    <Text style={styles.expDate}>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </Text>
                  </View>
                  {hasContent(exp.description) && (
                    <Text style={styles.expDescription}>{exp.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resumeData.education.map((edu) => (
                <View key={edu.id} style={styles.eduCard}>
                  <Text style={styles.eduDegree}>{edu.degree || "Degree"}</Text>
                  {hasContent(edu.field) && <Text style={styles.eduField}>{edu.field}</Text>}
                  <Text style={styles.eduSchool}>{edu.school || "School"}</Text>
                  <Text style={styles.eduDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Additional Sections */}
          {resumeData.sections && resumeData.sections.map((section) => (
            hasContent(section.title) && hasContent(section.content) && (
              <View key={section.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.card}>
                  <Text style={styles.summaryText}>{section.content}</Text>
                </View>
              </View>
            )
          ))}
        </View>
      </Page>
    </Document>
  );
};
