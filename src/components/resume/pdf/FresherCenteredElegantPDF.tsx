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
};

const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top + 20,
    paddingRight: PDF_PAGE_MARGINS.right + 20,
    paddingBottom: PDF_PAGE_MARGINS.bottom + 20,
    paddingLeft: PDF_PAGE_MARGINS.left + 20,
    fontSize: 9,
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  photoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#A855F7",
    marginBottom: 24,
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  name: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 12,
    color: "#111827",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 13,
    fontWeight: 600,
    fontStyle: "italic",
    color: "#A855F7",
    textAlign: "center",
    marginBottom: 16,
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#4B5563",
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginRight: 6,
  },
  decorativeLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  line: {
    width: 64,
    height: 1,
    backgroundColor: "#A855F7",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#A855F7",
  },
  summarySection: {
    alignItems: "center",
    marginBottom: 40,
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
    textAlign: "center",
    maxWidth: 500,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#A855F7",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: 0.3,
  },
  section: {
    marginBottom: 40,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  skillItem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: "#A855F7",
    borderRadius: 20,
    fontSize: 9,
    fontWeight: 600,
    color: "#1F2937",
  },
  educationItem: {
    alignItems: "center",
    marginBottom: 24,
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },
  educationField: {
    fontSize: 10,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 4,
  },
  educationSchool: {
    fontSize: 10,
    fontWeight: 600,
    color: "#A855F7",
    textAlign: "center",
    marginBottom: 8,
  },
  educationDate: {
    fontSize: 9,
    color: "#6B7280",
    textAlign: "center",
  },
  experienceItem: {
    alignItems: "center",
    marginBottom: 20,
    maxWidth: 450,
    marginHorizontal: "auto",
  },
  experiencePosition: {
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },
  experienceCompany: {
    fontSize: 10,
    fontWeight: 600,
    color: "#A855F7",
    textAlign: "center",
    marginBottom: 4,
  },
  experienceDate: {
    fontSize: 9,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 12,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#4B5563",
    textAlign: "center",
  },
  sectionContent: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#374151",
    textAlign: "center",
    maxWidth: 450,
    marginHorizontal: "auto",
  },
});
};

const EmailIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#A855F7" strokeWidth={2} />
    <Path d="m22 6-10 7L2 6" fill="none" stroke="#A855F7" strokeWidth={2} />
  </Svg>
);
};

const PhoneIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#A855F7" strokeWidth={2} />
  </Svg>
);
};

const LocationIcon = () => (
  <Svg style={styles.contactIcon} viewBox="0 0 24 24">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#A855F7" strokeWidth={2} />
    <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="#A855F7" strokeWidth={2} />
  </Svg>
);
};

interface FresherCenteredElegantPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
};
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

export const FresherCenteredElegantPDF = ({ resumeData, themeColor = "#A855F7" }: FresherCenteredElegantPDFProps) => {
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        {resumeData.personalInfo.photo && (
          <View style={styles.photoWrapper}>
            <Image src={resumeData.personalInfo.photo} style={styles.photo} />
          </View>
        )}

        <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>

        {resumeData.personalInfo.title && (
          <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
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

        <View style={styles.decorativeLine}>
          <View style={styles.line} />
          <View style={styles.dot} />
          <View style={styles.line} />
        </View>
      </View>

      {/* Professional Summary */}
      {hasContent(resumeData.personalInfo.summary) && (
        <View style={styles.summarySection}>
          <Text style={styles.summaryText}>{resumeData.personalInfo.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Expertise</Text>
          <View style={styles.skillsContainer}>
            {resumeData.skills.map((skill) => (
              <Text key={skill.id} style={styles.skillItem}>
                {skill.name}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resumeData.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.educationDegree}>{edu.degree}</Text>
              {hasContent(edu.field) && (
                <Text style={styles.educationField}>{edu.field}</Text>
              )}
              <Text style={styles.educationSchool}>{edu.school}</Text>
              <Text style={styles.educationDate}>
                {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {resumeData.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experiencePosition}>{exp.position}</Text>
              <Text style={styles.experienceCompany}>{exp.company}</Text>
              <Text style={styles.experienceDate}>
                {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
              </Text>
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
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionContent}>{section.content}</Text>
              </View>
            )
          ))}
        </>
      )}
    </Page>
  </Document>
);
};
