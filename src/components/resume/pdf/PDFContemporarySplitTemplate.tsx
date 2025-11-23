import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";
import { registerPDFFonts } from "@/lib/pdfFonts";

registerPDFFonts();

interface PDFContemporarySplitTemplateProps {
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

export const PDFContemporarySplitTemplate = ({
  resumeData,
  themeColor = "#f59e0b",
}: PDFContemporarySplitTemplateProps) => {
  const accent = themeColor;
  const accentLight = blendColors(accent, 0.15);

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
      width: "50%",
      backgroundColor: "#1f2937",
      paddingTop: 40,
      paddingRight: 20,
      paddingBottom: 40,
      paddingLeft: 40,
    },
    rightPanel: {
      width: "50%",
      backgroundColor: "#ffffff",
      paddingTop: 40,
      paddingRight: 40,
      paddingBottom: 40,
      paddingLeft: 20,
    },
    photoWrapper: {
      width: 144,
      height: 144,
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
    name: {
      fontSize: 24,
      fontWeight: 700,
      color: "#ffffff",
      marginBottom: 12,
      letterSpacing: -0.5,
    },
    title: {
      fontSize: 10,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: accent,
      marginBottom: 24,
    },
    summarySection: {
      marginTop: 0,
    },
    summaryBorderLine: {
      height: 1,
      backgroundColor: "#4c545f",
      marginBottom: 16,
    },
    summaryText: {
      fontSize: 10,
      lineHeight: 1.8,
      color: "rgba(255, 255, 255, 0.9)",
    },
    sidebarSection: {
      marginBottom: 24,
    },
    lastSidebarSection: {
      marginBottom: 0,
      paddingBottom: 0,
    },
    sidebarBorderLine: {
      height: 1,
      backgroundColor: "#4c545f",
      marginTop: 0,
    },
    sidebarTitle: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: accent,
      marginBottom: 16,
    },
    contactItem: {
      marginBottom: 12,
    },
    contactText: {
      fontSize: 10,
      color: "rgba(255, 255, 255, 0.9)",
    },
    skillItem: {
      marginBottom: 12,
    },
    skillText: {
      fontSize: 10,
      fontWeight: 500,
      color: "rgba(255, 255, 255, 0.9)",
    },
    educationItem: {
      marginBottom: 20,
    },
    degree: {
      fontSize: 10,
      fontWeight: 700,
      color: "#ffffff",
      marginBottom: 4,
    },
    field: {
      fontSize: 10,
      color: "rgba(255, 255, 255, 0.9)",
      marginTop: 4,
    },
    school: {
      fontSize: 9,
      color: "rgba(255, 255, 255, 0.8)",
      marginTop: 4,
    },
    educationDate: {
      fontSize: 9,
      color: "rgba(255, 255, 255, 0.7)",
      marginTop: 4,
    },
    section: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: "#111827",
      marginBottom: 20,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: accent,
    },
    experienceItem: {
      marginBottom: 24,
      paddingBottom: 24,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e7eb",
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
      backgroundColor: accentLight,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
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
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.pageContent}>
          {/* Left Panel - Dark Background 50% */}
          <View style={styles.leftPanel}>
            {/* Photo */}
            {photo && (
              <View style={styles.photoWrapper}>
                <Image src={photo} style={styles.photo} />
              </View>
            )}

            {/* Personal Info */}
            <View>
              <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
              {resumeData.personalInfo.title && (
                <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
              )}

              {/* Summary */}
              {hasContent(resumeData.personalInfo.summary) && (
                <View style={styles.summarySection}>
                  <View style={styles.summaryBorderLine} />
                  <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
                </View>
              )}
            </View>

            {/* Contact Info */}
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Contact</Text>
              {resumeData.personalInfo.email && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{resumeData.personalInfo.email}</Text>
                </View>
              )}
              {resumeData.personalInfo.phone && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{resumeData.personalInfo.phone}</Text>
                </View>
              )}
              {resumeData.personalInfo.location && (
                <View style={styles.contactItem}>
                  <Text style={styles.contactText}>{resumeData.personalInfo.location}</Text>
                </View>
              )}
              <View style={styles.sidebarBorderLine} />
            </View>

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={styles.sidebarSection}>
                <Text style={styles.sidebarTitle}>Skills</Text>
                {resumeData.skills.map((skill) => (
                  <View key={skill.id} style={styles.skillItem}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
                <View style={styles.sidebarBorderLine} />
              </View>
            )}

            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={styles.lastSidebarSection}>
                <Text style={styles.sidebarTitle}>Education</Text>
                {resumeData.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
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

          {/* Right Panel - White Background 50% */}
          <View style={styles.rightPanel}>
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
