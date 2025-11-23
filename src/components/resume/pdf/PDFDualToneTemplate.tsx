import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";
import { registerPDFFonts } from "@/lib/pdfFonts";

registerPDFFonts();

interface PDFDualToneTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

// Helper to blend hex color with white for opacity effect
const blendColors = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const whiteR = 255;
  const whiteG = 255;
  const whiteB = 255;

  const blendedR = Math.round(r * opacity + whiteR * (1 - opacity));
  const blendedG = Math.round(g * opacity + whiteG * (1 - opacity));
  const blendedB = Math.round(b * opacity + whiteB * (1 - opacity));

  return `#${((1 << 24) + (blendedR << 16) + (blendedG << 8) + blendedB).toString(16).slice(1)}`;
};

export const PDFDualToneTemplate = ({
  resumeData,
  themeColor = "#10b981",
}: PDFDualToneTemplateProps) => {
  const accent = themeColor;
  const accentLight = blendColors(accent, 0.08);
  const accentLight15 = blendColors(accent, 0.15);

  const styles = StyleSheet.create({
    page: {
      paddingTop: PDF_PAGE_MARGINS.top,
      paddingBottom: PDF_PAGE_MARGINS.bottom,
      fontSize: 10,
      fontFamily: "Inter",
      backgroundColor: "#ffffff",
      flexDirection: "row",
    },
    pageContent: {
      flexDirection: "row",
      marginTop: -PDF_PAGE_MARGINS.top,
    },
    leftPanel: {
      width: "40%",
      backgroundColor: accentLight,
      paddingTop: 32,
      paddingRight: 20,
      paddingBottom: 32,
      paddingLeft: 32,
    },
    rightPanel: {
      width: "60%",
      paddingTop: 40,
      paddingRight: 40,
      paddingBottom: 40,
      paddingLeft: 20,
    },
    photoWrapper: {
      width: 128,
      height: 128,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: accent,
      overflow: "hidden",
      marginBottom: 32,
      alignSelf: "center",
    },
    photo: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    sidebarSection: {
      marginBottom: 32,
    },
    sidebarTitle: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: accent,
      marginBottom: 16,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: accent,
    },
    contactItem: {
      marginBottom: 12,
    },
    contactLabel: {
      fontSize: 9,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: accent,
      marginBottom: 2,
    },
    contactValue: {
      fontSize: 10,
      color: "#374151",
    },
    skillCard: {
      backgroundColor: "#ffffff",
      padding: 10,
      borderRadius: 8,
      marginBottom: 12,
    },
    skillText: {
      fontSize: 10,
      fontWeight: 500,
      color: "#111827",
    },
    educationCard: {
      backgroundColor: "#ffffff",
      padding: 12,
      borderRadius: 8,
      marginBottom: 20,
    },
    degree: {
      fontSize: 10,
      fontWeight: 700,
      color: accent,
      marginBottom: 4,
    },
    field: {
      fontSize: 10,
      color: "#374151",
      marginTop: 2,
    },
    school: {
      fontSize: 9,
      color: "#4b5563",
      marginTop: 4,
    },
    educationDate: {
      fontSize: 9,
      color: "#6b7280",
      marginTop: 4,
    },
    header: {
      marginBottom: 32,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: accent,
    },
    name: {
      fontSize: 28,
      fontWeight: 700,
      color: accent,
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    title: {
      fontSize: 12,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: "#374151",
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#111827",
      marginBottom: 20,
    },
    summaryText: {
      fontSize: 10,
      lineHeight: 1.6,
      color: "#374151",
    },
    experienceCard: {
      backgroundColor: "#f9fafb",
      padding: 16,
      borderRadius: 8,
      borderLeftWidth: 1,
      borderLeftColor: accent,
      marginBottom: 24,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    experienceLeft: {
      flex: 1,
      marginRight: 12,
    },
    position: {
      fontSize: 11,
      fontWeight: 700,
      color: "#111827",
      marginBottom: 4,
    },
    company: {
      fontSize: 10,
      fontWeight: 600,
      color: accent,
      marginTop: 4,
    },
    dateBadge: {
      fontSize: 9,
      fontWeight: 600,
      color: accent,
      backgroundColor: accentLight15,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
    },
    bulletList: {
      marginTop: 8,
      paddingLeft: 20,
    },
    bulletItem: {
      flexDirection: "row",
      marginBottom: 4,
    },
    bulletDot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: "#374151",
      marginRight: 6,
      marginTop: 4,
    },
    bulletText: {
      fontSize: 9,
      lineHeight: 1.5,
      color: "#374151",
      flex: 1,
    },
    sectionContent: {
      fontSize: 9,
      lineHeight: 1.5,
      color: "#374151",
    },
  });

  const photo = resumeData.personalInfo.photo;

  return (
    <Document>
      <Page 
        size="A4" 
        style={styles.page}
        wrap={false}
      >
        <View style={styles.pageContent}>
          {/* Left Panel - 40% */}
          <View style={styles.leftPanel}>
          {/* Photo */}
          {photo && (
            <View style={styles.photoWrapper}>
              <Image src={photo} style={styles.photo} />
            </View>
          )}

          {/* Contact Info */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {resumeData.personalInfo.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{resumeData.personalInfo.email}</Text>
              </View>
            )}
            {resumeData.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>{resumeData.personalInfo.phone}</Text>
              </View>
            )}
            {resumeData.personalInfo.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Location</Text>
                <Text style={styles.contactValue}>{resumeData.personalInfo.location}</Text>
              </View>
            )}
          </View>

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {resumeData.skills.map((skill) => (
                <View key={skill.id} style={styles.skillCard}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationCard}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  {hasContent(edu.field) && (
                    <Text style={styles.field}>{edu.field}</Text>
                  )}
                  <Text style={styles.school}>{edu.school}</Text>
                  <Text style={styles.educationDate}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Panel - 60% */}
        <View style={styles.rightPanel}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
            {resumeData.personalInfo.title && (
              <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
            )}
          </View>

          {/* Professional Summary */}
          {hasContent(resumeData.personalInfo.summary) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {/* Professional Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {resumeData.experience.map((exp, index) => {
                const bulletPoints = (exp.description || "")
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean);

                return (
                  <View key={index} style={styles.experienceCard}>
                    <View style={styles.experienceHeader}>
                      <View style={styles.experienceLeft}>
                        <Text style={styles.position}>{exp.position}</Text>
                        <Text style={styles.company}>{exp.company}</Text>
                      </View>
                      <Text style={styles.dateBadge}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </Text>
                    </View>
                    {bulletPoints.length > 0 && (
                      <View style={styles.bulletList}>
                        {bulletPoints.map((point, i) => (
                          <View key={i} style={styles.bulletItem}>
                            <View style={styles.bulletDot} />
                            <Text style={styles.bulletText}>{point}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {/* Additional Sections */}
          {resumeData.sections &&
            resumeData.sections.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionContent}>{section.content}</Text>
              </View>
            ))}
        </View>
        </View>
      </Page>
    </Document>
  );
};
