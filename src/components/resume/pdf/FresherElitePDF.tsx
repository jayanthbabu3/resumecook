import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";
import { registerPDFFonts } from "@/lib/pdfFonts";

registerPDFFonts();

interface IconProps {
  color: string;
}

const MailIcon = ({ color }: IconProps) => (
  <Svg width={9} height={9} viewBox="0 0 24 24">
    <Path
      d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m22 6-10 7L2 6"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PhoneIcon = ({ color }: IconProps) => (
  <Svg width={9} height={9} viewBox="0 0 24 24">
    <Path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MapPinIcon = ({ color }: IconProps) => (
  <Svg width={9} height={9} viewBox="0 0 24 24">
    <Path
      d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const FresherElitePDF = ({
  resumeData,
  themeColor = "#6366f1",
}: Props) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Inter",
      backgroundColor: "#f9fafb",
      paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    },
    container: {
      backgroundColor: "#ffffff",
      borderRadius: 16,
      overflow: "hidden",
    },
    header: {
      backgroundColor: themeColor,
      paddingHorizontal: 40,
      paddingVertical: 32,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerLeft: {
      flex: 1,
      color: "#ffffff",
    },
    name: {
      fontSize: 24,
      fontWeight: 700,
      color: "#ffffff",
      marginBottom: 6,
    },
    title: {
      fontSize: 11,
      fontWeight: 600,
      color: "#ffffff",
      opacity: 0.95,
      marginBottom: 12,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 20,
      color: "#ffffff",
      opacity: 0.9,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      fontSize: 9,
    },
    photoWrapper: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 4,
      borderColor: "#ffffff",
      overflow: "hidden",
      marginLeft: 20,
    },
    photo: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    mainContent: {
      paddingHorizontal: 40,
      paddingVertical: 24,
    },
    summaryContainer: {
      backgroundColor: "#f9fafb",
      borderRadius: 12,
      paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
      marginBottom: 24,
      borderLeftWidth: 4,
      borderLeftColor: themeColor,
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
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
    },
    sectionDot: {
      width: 4,
      height: 14,
      backgroundColor: themeColor,
      borderRadius: 2,
    },
    sectionTitle: {
      fontSize: 8,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: themeColor,
    },
    educationCard: {
      backgroundColor: "#ffffff",
      borderRadius: 8,
      paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      marginBottom: 12,
    },
    degree: {
      fontSize: 10,
      fontWeight: 700,
      color: "#111827",
      marginBottom: 4,
    },
    field: {
      fontSize: 8,
      color: "#4b5563",
      marginBottom: 6,
    },
    school: {
      fontSize: 8,
      fontWeight: 600,
      color: themeColor,
      marginBottom: 4,
    },
    dateText: {
      fontSize: 8,
      color: "#6b7280",
    },
    skillItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    skillName: {
      fontSize: 9,
      fontWeight: 600,
      color: "#111827",
    },
    skillDots: {
      flexDirection: "row",
      gap: 4,
    },
    skillDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    experienceItem: {
      position: "relative",
      paddingLeft: 20,
      paddingBottom: 20,
      borderLeftWidth: 2,
      borderLeftColor: "#e5e7eb",
    },
    experienceItemLast: {
      position: "relative",
      paddingLeft: 20,
      paddingBottom: 0,
      borderLeftWidth: 0,
    },
    timelineDot: {
      position: "absolute",
      left: -6,
      top: 0,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: themeColor,
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
      fontSize: 11,
      fontWeight: 700,
      color: "#111827",
    },
    company: {
      fontSize: 10,
      fontWeight: 600,
      color: themeColor,
      marginTop: 4,
    },
    dateBadge: {
      fontSize: 8,
      fontWeight: 600,
      color: themeColor,
      backgroundColor: `${themeColor}15`,
      paddingHorizontal: 10,
      paddingVertical: 2,
      borderRadius: 999,
    },
    description: {
      fontSize: 9,
      lineHeight: 1.6,
      color: "#374151",
    },
    projectCard: {
      backgroundColor: "#f9fafb",
      borderRadius: 12,
      paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
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
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
              {resumeData.personalInfo.title && (
                <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
              )}
              <View style={styles.contactInfo}>
                {resumeData.personalInfo.email && (
                  <View style={styles.contactItem}>
                    <MailIcon color="#ffffff" />
                    <Text>{resumeData.personalInfo.email}</Text>
                  </View>
                )}
                {resumeData.personalInfo.phone && (
                  <View style={styles.contactItem}>
                    <PhoneIcon color="#ffffff" />
                    <Text>{resumeData.personalInfo.phone}</Text>
                  </View>
                )}
                {resumeData.personalInfo.location && (
                  <View style={styles.contactItem}>
                    <MapPinIcon color="#ffffff" />
                    <Text>{resumeData.personalInfo.location}</Text>
                  </View>
                )}
              </View>
            </View>
            {photo && (
              <View style={styles.photoWrapper}>
                <Image src={photo} style={styles.photo} />
              </View>
            )}
          </View>

          <View style={styles.mainContent}>
            {/* Professional Summary */}
            {hasContent(resumeData.personalInfo.summary) && (
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>
                  {resumeData.personalInfo.summary}
                </Text>
              </View>
            )}

            <View style={styles.contentGrid}>
              {/* Left Column */}
              <View style={styles.leftColumn}>
                {/* Education */}
                {resumeData.education && resumeData.education.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <View style={styles.sectionDot} />
                      <Text style={styles.sectionTitle}>Education</Text>
                    </View>
                    {resumeData.education.map((edu, index) => (
                      <View key={index} style={styles.educationCard}>
                        <Text style={styles.degree}>{edu.degree}</Text>
                        {hasContent(edu.field) && <Text style={styles.field}>{edu.field}</Text>}
                        <Text style={styles.school}>{edu.school}</Text>
                        <Text style={styles.dateText}>
                          {edu.startDate} - {edu.endDate}
                        </Text>
                      </View>
                    ))}
        )                  </View>
                )}

                {/* Skills */}
                {resumeData.skills && resumeData.skills.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <View style={styles.sectionDot} />
                      <Text style={styles.sectionTitle}>Skills</Text>
                    </View>
                    {resumeData.skills.map((skill) => (
                      <View key={skill.id} style={styles.skillItem}>
                        <Text style={styles.skillName}>{skill.name}</Text>
                        {skill.level && (
                          <View style={styles.skillDots}>
                            {[...Array(5)].map((_, i) => (
                              <View
                                key={i}
                                style={[
                                  styles.skillDot,
                                  {
                                    backgroundColor:
                                      i < Math.ceil(skill.level / 2)
                                        ? themeColor
                                        : "#e5e7eb",
                                  },
                                ]}
                              />
                            ))}
        )                          </View>
                        )}
                      </View>
                    ))}
        )                  </View>
                )}
              </View>

              {/* Right Column */}
              <View style={styles.rightColumn}>
                {/* Experience */}
                {resumeData.experience && resumeData.experience.length > 0 && (
                  <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                      <View style={styles.sectionDot} />
                      <Text style={styles.sectionTitle}>Experience</Text>
                    </View>
                    {resumeData.experience.map((exp, index) => (
                      <View 
                        key={index} 
                        style={
                          index === resumeData.experience.length - 1
                            ? styles.experienceItemLast
                            : styles.experienceItem
                        }
                      >
                        <View style={styles.timelineDot} />
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
                          <Text style={styles.description}>{exp.description}</Text>
                        )}
                      </View>
                    ))}
        )                  </View>
                )}

                {/* Projects/Sections */}
                {resumeData.sections &&
                  resumeData.sections.map((section, index) => (
                    <View key={index} style={styles.section}>
                      <View style={styles.sectionHeader}>
                        <View style={styles.sectionDot} />
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                      </View>
                      <View style={styles.projectCard}>
                        <Text style={styles.sectionContent}>{section.content}</Text>
                      </View>
                    </View>
                  ))}
        )              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
