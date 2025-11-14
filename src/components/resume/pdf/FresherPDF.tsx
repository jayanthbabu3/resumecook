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
  headerAccent: {
    height: 8,
    backgroundColor: "#2563EB",
    marginTop: -40,
    marginLeft: -40,
    marginRight: -40,
  },
  headerContent: {
    paddingTop: 32,
    paddingBottom: 24,
    textAlign: "center",
  },
  photoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#2563EB",
    alignSelf: "center",
    marginBottom: 20,
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 12,
    color: "#111827",
    textAlign: "center",
  },
  titleBadge: {
    backgroundColor: "#2563EB",
    color: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: 600,
    alignSelf: "center",
    marginBottom: 16,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 10,
    color: "#4B5563",
    marginRight: 16,
    marginBottom: 6,
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginRight: 6,
  },
  mainContent: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    backgroundColor: "#2563EB",
    color: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 8,
    fontWeight: 600,
    borderRadius: 3,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
    paddingLeft: 16,
    fontWeight: 400,
  },
  contentGrid: {
    flexDirection: "row",
    gap: 32,
  },
  leftColumn: {
    width: "35%",
  },
  rightColumn: {
    width: "65%",
  },
  sectionSpacing: {
    marginTop: 12,
    marginBottom: 12,
  },
  leftSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  leftSectionTitle: {
    backgroundColor: "#2563EB",
    color: "#ffffff",
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 7,
    fontWeight: 600,
    borderRadius: 2,
  },
  leftSectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  educationItem: {
    marginBottom: 16,
    paddingLeft: 16,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 2,
  },
  educationField: {
    fontSize: 9,
    color: "#4B5563",
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 9,
    fontWeight: 600,
    color: "#2563EB",
    marginBottom: 4,
  },
  educationDate: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  educationDateIcon: {
    width: 9,
    height: 9,
    marginRight: 4,
  },
  educationDateText: {
    fontSize: 9,
    color: "#6B7280",
  },
  skillsContainer: {
    paddingLeft: 16,
  },
  skillItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
    borderLeftWidth: 3,
    borderLeftColor: "#2563EB",
    fontSize: 9,
    fontWeight: 600,
    color: "#1F2937",
    marginBottom: 8,
  },
  experienceSection: {
    marginBottom: 26,
    paddingLeft: 16,
  },
  experienceItem: {
    marginBottom: 20,
    position: "relative",
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
  experiencePosition: {
    fontSize: 10,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 2,
  },
  experienceCompany: {
    fontSize: 10,
    fontWeight: 600,
    color: "#2563EB",
  },
  experienceDate: {
    fontSize: 9,
    color: "#6B7280",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#4B5563",
  },
  projectSection: {
    marginBottom: 24,
    paddingLeft: 16,
  },
  projectContent: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
    fontWeight: 400,
  },
});

const EmailIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#2563EB" strokeWidth={2} />
    <Path d="m22 6-10 7L2 6" fill="none" stroke="#2563EB" strokeWidth={2} />
  </Svg>
);

const PhoneIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#2563EB" strokeWidth={2} />
  </Svg>
);

const LocationIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#2563EB" strokeWidth={2} />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="#2563EB" strokeWidth={2} />
  </Svg>
);

const CalendarIcon = () => (
  <Svg style={styles.educationDateIcon} viewBox="0 0 24 24">
    <Path d="M6 2v4M18 2v4M4 8h16" stroke="#6B7280" strokeWidth={2} fill="none" strokeLinecap="round" />
    <Path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="#6B7280" strokeWidth={2} fill="none" />
  </Svg>
);

interface FresherPDFProps {
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

export const FresherPDF = ({ resumeData }: FresherPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with accent */}
      <View style={styles.headerAccent} />

      <View style={styles.headerContent}>
        {/* Profile Photo */}
        {resumeData.personalInfo.photo && (
          <View style={styles.photoWrapper}>
            <Image src={resumeData.personalInfo.photo} style={styles.photo} />
          </View>
        )}

        {/* Name */}
        <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>

        {/* Title Badge */}
        {resumeData.personalInfo.title && (
          <Text style={styles.titleBadge}>{resumeData.personalInfo.title}</Text>
        )}

        {/* Contact Info */}
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

      <View style={styles.mainContent}>
        {/* Professional Summary */}
        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.summarySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
              <View style={styles.sectionLine} />
            </View>
            <Text style={styles.summaryText}>
              {resumeData.personalInfo.summary}
            </Text>
          </View>
        )}

        {/* Main Content Grid */}
        <View style={styles.contentGrid}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <View style={styles.sectionSpacing}>
                <View style={styles.leftSectionHeader}>
                  <Text style={styles.leftSectionTitle}>EDUCATION</Text>
                  <View style={styles.leftSectionLine} />
                </View>
                <View>
                  {resumeData.education.map((edu, index) => (
                    <View key={index} style={styles.educationItem}>
                      <Text style={styles.educationDegree}>{edu.degree}</Text>
                      {hasContent(edu.field) && (
                        <Text style={styles.educationField}>{edu.field}</Text>
                      )}
                      <Text style={styles.educationSchool}>{edu.school}</Text>
                      <View style={styles.educationDate}>
                        <CalendarIcon />
                        <Text style={styles.educationDateText}>
                          {formatDate(edu.startDate)} -{" "}
                          {formatDate(edu.endDate)}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Technical Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <View style={styles.sectionSpacing}>
                <View style={styles.leftSectionHeader}>
                  <Text style={styles.leftSectionTitle}>TECHNICAL SKILLS</Text>
                  <View style={styles.leftSectionLine} />
                </View>
                <View style={styles.skillsContainer}>
                  {resumeData.skills.map((skill) => (
                    <Text key={skill.id} style={styles.skillItem}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Projects Sections */}
            {resumeData.sections && resumeData.sections.length > 0 && (
              <>
                {resumeData.sections.map((section, index) => (
                  hasContent(section.title) && hasContent(section.content) && (
                    <View key={index} style={styles.sectionSpacing}>
                      <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                          {section.title.toUpperCase()}
                        </Text>
                        <View style={styles.sectionLine} />
                      </View>
                      <View style={styles.projectSection}>
                        <Text style={styles.projectContent}>
                          {section.content}
                        </Text>
                      </View>
                    </View>
                  )
                ))}
              </>
            )}

            {/* Experience */}
            {resumeData.experience && resumeData.experience.length > 0 && (
              <View style={styles.sectionSpacing}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    EXPERIENCE & INTERNSHIPS
                  </Text>
                  <View style={styles.sectionLine} />
                </View>
                <View style={styles.experienceSection}>
                  {resumeData.experience.map((exp, index) => (
                    <View key={index} style={styles.experienceItem}>
                      <View style={styles.experienceHeader}>
                        <View style={styles.experienceLeft}>
                          <Text style={styles.experiencePosition}>
                            {exp.position}
                          </Text>
                          <Text style={styles.experienceCompany}>
                            {exp.company}
                          </Text>
                        </View>
                        <Text style={styles.experienceDate}>
                          {formatDate(exp.startDate)} -{" "}
                          {exp.current ? "Present" : formatDate(exp.endDate)}
                        </Text>
                      </View>
                      {hasContent(exp.description) && (
                        <Text style={styles.experienceDescription}>
                          {exp.description}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
