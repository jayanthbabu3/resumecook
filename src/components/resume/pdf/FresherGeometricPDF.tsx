import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Svg,
  Path,
  Circle,
  Rect,
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
    position: "relative",
  },
  geometricDecor1: {
    position: "absolute",
    top: -128,
    right: -128,
    width: 256,
    height: 256,
    opacity: 0.1,
  },
  geometricDecor2: {
    position: "absolute",
    bottom: -96,
    left: -96,
    width: 192,
    height: 192,
    opacity: 0.1,
  },
  header: {
    paddingHorizontal: 48,
    paddingTop: 40,
    paddingBottom: 32,
    flexDirection: "row",
    gap: 32,
  },
  photoContainer: {
    position: "relative",
  },
  photoBackground: {
    position: "absolute",
    top: -8,
    left: -8,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3B82F6",
    opacity: 0.2,
  },
  photoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#3B82F6",
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
    marginBottom: 8,
    color: "#111827",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  hexagonIcon: {
    width: 14,
    height: 14,
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    color: "#3B82F6",
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 10,
    color: "#4B5563",
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginRight: 6,
  },
  summarySection: {
    paddingHorizontal: 48,
    paddingVertical: 0,
    marginBottom: 32,
    position: "relative",
  },
  summaryBar: {
    position: "absolute",
    left: 32,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#3B82F6",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
    paddingLeft: 32,
  },
  diamond: {
    width: 12,
    height: 12,
    backgroundColor: "#3B82F6",
    transform: "rotate(45deg)",
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: "#3B82F6",
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
    paddingLeft: 32,
  },
  mainContent: {
    paddingHorizontal: 48,
    flexDirection: "row",
    gap: 32,
  },
  leftColumn: {
    width: "33%",
  },
  rightColumn: {
    width: "67%",
  },
  skillItem: {
    position: "relative",
    paddingLeft: 24,
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
    marginBottom: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  skillDot: {
    position: "absolute",
    left: -12,
    top: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
  },
  skillText: {
    fontSize: 9,
    fontWeight: 600,
    color: "#1F2937",
  },
  sectionMargin: {
    marginBottom: 32,
  },
  educationItem: {
    position: "relative",
    paddingLeft: 24,
    marginBottom: 16,
  },
  geometricDot: {
    position: "absolute",
    left: 0,
    top: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#3B82F6",
    backgroundColor: "#ffffff",
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
    color: "#3B82F6",
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
  experienceItem: {
    position: "relative",
    paddingLeft: 24,
    marginBottom: 24,
  },
  experiencePosition: {
    fontSize: 10,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 9,
    fontWeight: 600,
    color: "#3B82F6",
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#4B5563",
    marginTop: 8,
  },
  sectionContent: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
  },
});

const EmailIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#3B82F6" strokeWidth={2} />
    <Path d="m22 6-10 7L2 6" fill="none" stroke="#3B82F6" strokeWidth={2} />
  </Svg>
);

const PhoneIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#3B82F6" strokeWidth={2} />
  </Svg>
);

const LocationIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#3B82F6" strokeWidth={2} />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="#3B82F6" strokeWidth={2} />
  </Svg>
);

const CalendarIcon = () => (
  <Svg style={styles.dateIcon} viewBox="0 0 24 24">
    <Path d="M6 2v4M18 2v4M4 8h16" stroke="#6B7280" strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="#6B7280" strokeWidth={2} fill="none" />
  </Svg>
);

interface FresherGeometricPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

export const FresherGeometricPDF = ({ resumeData }: FresherGeometricPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Geometric Decorations */}
      <View style={styles.geometricDecor1}>
        <Rect x={0} y={0} width={256} height={256} fill="none" stroke="#3B82F6" strokeWidth={32} transform="rotate(45 128 128)" />
      </View>
      <View style={styles.geometricDecor2}>
        <Circle cx={96} cy={96} r={80} fill="none" stroke="#3B82F6" strokeWidth={32} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.photoContainer}>
          <View style={styles.photoBackground} />
          {resumeData.personalInfo.photo && (
            <View style={styles.photoWrapper}>
              <Image src={resumeData.personalInfo.photo} style={styles.photo} />
            </View>
          )}
        </View>

        <View style={styles.headerContent}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>

          {resumeData.personalInfo.title && (
            <View style={styles.titleRow}>
              <Svg style={styles.hexagonIcon} viewBox="0 0 24 24">
                <Path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z" fill="#3B82F6" opacity={0.3} />
              </Svg>
              <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
            </View>
          )}

          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && (
              <View style={styles.contactItem}>
                <EmailIcon />
                <Text>{resumeData.personalInfo.email}</Text>
              </View>
            )}
            {resumeData.personalInfo.phone && (
              <View style={styles.contactItem}>
                <PhoneIcon />
                <Text>{resumeData.personalInfo.phone}</Text>
              </View>
            )}
            {resumeData.personalInfo.location && (
              <View style={styles.contactItem}>
                <LocationIcon />
                <Text>{resumeData.personalInfo.location}</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Professional Summary */}
      {hasContent(resumeData.personalInfo.summary) && (
        <View style={styles.summarySection}>
          <View style={styles.summaryBar} />
          <View style={styles.sectionHeader}>
            <View style={styles.diamond} />
            <Text style={styles.sectionTitle}>Professional Summary</Text>
          </View>
          <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Left Column - Skills */}
        <View style={styles.leftColumn}>
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.sectionMargin}>
              <View style={styles.sectionHeader}>
                <View style={styles.diamond} />
                <Text style={styles.sectionTitle}>Skills</Text>
              </View>
              {resumeData.skills.map((skill) => (
                <View key={skill.id} style={styles.skillItem}>
                  <View style={styles.skillDot} />
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Column - Education & Experience */}
        <View style={styles.rightColumn}>
          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View style={styles.sectionMargin}>
              <View style={styles.sectionHeader}>
                <Svg style={styles.hexagonIcon} viewBox="0 0 24 24">
                  <Path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z" fill="#3B82F6" opacity={0.3} />
                </Svg>
                <Text style={styles.sectionTitle}>Education</Text>
              </View>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={styles.geometricDot} />
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  {hasContent(edu.field) && (
                    <Text style={styles.educationField}>{edu.field}</Text>
                  )}
                  <Text style={styles.educationSchool}>{edu.school}</Text>
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

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.sectionMargin}>
              <View style={styles.sectionHeader}>
                <Svg style={styles.hexagonIcon} viewBox="0 0 24 24">
                  <Path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z" fill="#3B82F6" opacity={0.3} />
                </Svg>
                <Text style={styles.sectionTitle}>Experience & Internships</Text>
              </View>
              {resumeData.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.geometricDot} />
                  <Text style={styles.experiencePosition}>{exp.position}</Text>
                  <Text style={styles.experienceCompany}>{exp.company}</Text>
                  <View style={styles.educationDate}>
                    <CalendarIcon />
                    <Text>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
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
                    <View style={styles.sectionHeader}>
                      <Svg style={styles.hexagonIcon} viewBox="0 0 24 24">
                        <Path d="M12 2l9.5 5.5v11L12 24l-9.5-5.5v-11L12 2z" fill="#3B82F6" opacity={0.3} />
                      </Svg>
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
