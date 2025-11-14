import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Svg,
  Path,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { registerPDFFonts } from "@/lib/pdfFonts";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

registerPDFFonts();

const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    fontSize: 9,
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
  },
  header: {
    backgroundColor: "#1F2937",
    paddingVertical: 32,
    paddingHorizontal: 32,
    marginTop: -40,
    marginLeft: -40,
    marginRight: -40,
    marginBottom: 24,
    flexDirection: "row",
    gap: 32,
  },
  photoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 12,
    color: "#ffffff",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  titleIcon: {
    width: 14,
    height: 14,
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    color: "#E5E7EB",
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 10,
    color: "#D1D5DB",
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginRight: 6,
  },
  summarySection: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  sectionIndicator: {
    width: 4,
    height: 24,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#111827",
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
    paddingLeft: 20,
  },
  mainContent: {
    flexDirection: "row",
    gap: 32,
  },
  leftColumn: {
    width: "33%",
  },
  rightColumn: {
    width: "67%",
  },
  sectionMargin: {
    marginBottom: 24,
  },
  educationItem: {
    marginBottom: 20,
    paddingLeft: 20,
    borderLeftWidth: 2,
    borderLeftColor: "#E5E7EB",
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  },
  educationField: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 4,
  },
  educationSchool: {
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 8,
  },
  educationDate: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#6B7280",
  },
  dateIcon: {
    width: 9,
    height: 9,
    marginRight: 4,
  },
  skillItem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#1F2937",
    color: "#ffffff",
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 6,
    marginLeft: 20,
    borderRadius: 4,
  },
  experienceItem: {
    marginBottom: 24,
    paddingLeft: 20,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  experienceLeft: {
    flex: 1,
  },
  experiencePosition: {
    fontSize: 10,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 10,
    fontWeight: 600,
  },
  experienceDateBadge: {
    color: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 9,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#4B5563",
  },
  sectionContent: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
    paddingLeft: 20,
  },
});

const EmailIcon = ({ color }: { color: string }) => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke={color} strokeWidth={2} />
    <Path d="m22 6-10 7L2 6" fill="none" stroke={color} strokeWidth={2} />
  </Svg>
);

const PhoneIcon = ({ color }: { color: string }) => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke={color} strokeWidth={2} />
  </Svg>
);

const LocationIcon = ({ color }: { color: string }) => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke={color} strokeWidth={2} />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke={color} strokeWidth={2} />
  </Svg>
);

const BriefcaseIcon = () => (
  <Svg style={styles.titleIcon} viewBox="0 0 24 24">
    <Path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2M3 8h18v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8z" fill="none" stroke="#ffffff" strokeWidth={2} />
  </Svg>
);

const CalendarIcon = () => (
  <Svg style={styles.dateIcon} viewBox="0 0 24 24">
    <Path d="M6 2v4M18 2v4M4 8h16" stroke="#6B7280" strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="#6B7280" strokeWidth={2} fill="none" />
  </Svg>
);

interface FresherDarkProfessionalPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

export const FresherDarkProfessionalPDF = ({ resumeData, themeColor = "#6366F1" }: FresherDarkProfessionalPDFProps) => {
  // Dynamic styles that use themeColor
  const dynamicStyles = StyleSheet.create({
    sectionIndicator: {
      ...styles.sectionIndicator,
      backgroundColor: themeColor,
    },
    educationSchool: {
      ...styles.educationSchool,
      color: themeColor,
    },
    experienceCompany: {
      ...styles.experienceCompany,
      color: themeColor,
    },
    experienceDateBadge: {
      ...styles.experienceDateBadge,
      backgroundColor: themeColor,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Dark Header */}
        <View style={styles.header}>
          {resumeData.personalInfo.photo && (
            <View style={styles.photoWrapper}>
              <Image src={resumeData.personalInfo.photo} style={styles.photo} />
            </View>
          )}

          <View style={styles.headerContent}>
            <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>

            {resumeData.personalInfo.title && (
              <View style={styles.titleRow}>
                <BriefcaseIcon />
                <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
              </View>
            )}

            <View style={styles.contactInfo}>
              {resumeData.personalInfo.email && (
                <View style={styles.contactItem}>
                  <EmailIcon color={themeColor} />
                  <Text>{resumeData.personalInfo.email}</Text>
                </View>
              )}
              {resumeData.personalInfo.phone && (
                <View style={styles.contactItem}>
                  <PhoneIcon color={themeColor} />
                  <Text>{resumeData.personalInfo.phone}</Text>
                </View>
              )}
              {resumeData.personalInfo.location && (
                <View style={styles.contactItem}>
                  <LocationIcon color={themeColor} />
                  <Text>{resumeData.personalInfo.location}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Professional Summary */}
        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.summarySection}>
            <View style={styles.sectionHeaderRow}>
              <View style={dynamicStyles.sectionIndicator} />
              <Text style={styles.sectionTitle}>Professional Summary</Text>
            </View>
            <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={styles.sectionMargin}>
                <View style={styles.sectionHeaderRow}>
                  <View style={dynamicStyles.sectionIndicator} />
                  <Text style={styles.sectionTitle}>Education</Text>
                </View>
                {resumeData.education.map((edu, index) => (
                  <View key={index} style={styles.educationItem}>
                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                    {hasContent(edu.field) && (
                      <Text style={styles.educationField}>{edu.field}</Text>
                    )}
                    <Text style={dynamicStyles.educationSchool}>{edu.school}</Text>
                    <View style={styles.educationDate}>
                      <CalendarIcon />
                      <Text>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={styles.sectionMargin}>
                <View style={styles.sectionHeaderRow}>
                  <View style={dynamicStyles.sectionIndicator} />
                  <Text style={styles.sectionTitle}>Skills</Text>
                </View>
                {resumeData.skills.map((skill) => (
                  <Text key={skill.id} style={styles.skillItem}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <View style={styles.sectionMargin}>
                <View style={styles.sectionHeaderRow}>
                  <View style={dynamicStyles.sectionIndicator} />
                  <Text style={styles.sectionTitle}>Experience & Internships</Text>
                </View>
                {resumeData.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View style={styles.experienceLeft}>
                        <Text style={styles.experiencePosition}>{exp.position}</Text>
                        <Text style={dynamicStyles.experienceCompany}>{exp.company}</Text>
                      </View>
                      <Text style={dynamicStyles.experienceDateBadge}>
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </Text>
                    </View>
                    {hasContent(exp.description) && (
                      <Text style={styles.experienceDescription}>{exp.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Custom Sections */}
            {resumeData.sections && resumeData.sections.length > 0 && (
              <>
                {resumeData.sections.map((section, index) => (
                  hasContent(section.title) && hasContent(section.content) && (
                    <View key={index} style={styles.sectionMargin}>
                      <View style={styles.sectionHeaderRow}>
                        <View style={dynamicStyles.sectionIndicator} />
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                      </View>
                      <Text style={styles.sectionContent}>{section.content}</Text>
                    </View>
                  )
                ))}
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
