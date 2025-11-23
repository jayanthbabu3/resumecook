import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top + 20,
    paddingRight: PDF_PAGE_MARGINS.right + 20,
    paddingBottom: PDF_PAGE_MARGINS.bottom + 20,
    paddingLeft: PDF_PAGE_MARGINS.left + 20,
    fontFamily: 'Inter',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 300,
    color: '#475569',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 18,
  },
  contactContainer: {
    flexDirection: 'row',
    fontSize: 9,
    color: '#6b7280',
  },
  contactItem: {
    marginRight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#47556930',
    marginBottom: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#475569',
    marginBottom: 12,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.7,
    color: '#374151',
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  position: {
    fontSize: 11,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 2,
  },
  company: {
    fontSize: 9.5,
    color: '#6b7280',
  },
  experienceDate: {
    fontSize: 8.5,
    color: '#9ca3af',
  },
  description: {
    fontSize: 9.5,
    lineHeight: 1.6,
    color: '#374151',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
  },
  skillItem: {
    fontSize: 9.5,
    color: '#374151',
    marginRight: 18,
    marginBottom: 4,
  },
  educationItem: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  educationContent: {
    flex: 1,
  },
  educationDegree: {
    fontSize: 10,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 2,
  },
  educationField: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 2,
  },
  educationSchool: {
    fontSize: 9,
    color: '#4b5563',
  },
  educationDate: {
    fontSize: 8.5,
    color: '#9ca3af',
  },
});

const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const MinimalistProPDF = ({ resumeData, themeColor = "#475569" }: Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.name, { color: themeColor }]}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
          {hasContent(resumeData.personalInfo.title) && (
            <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
          )}

          {/* Contact */}
          <View style={styles.contactContainer}>
            {hasContent(resumeData.personalInfo.email) && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.email}</Text>
            )}
            {hasContent(resumeData.personalInfo.phone) && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.phone}</Text>
            )}
            {hasContent(resumeData.personalInfo.location) && (
              <Text>{resumeData.personalInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.section}>
            <View style={[styles.divider, { backgroundColor: `${themeColor}30` }]} />
            <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Experience</Text>
            {resumeData.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.position}>{exp.position || "Position Title"}</Text>
                    <Text style={styles.company}>{exp.company || "Company Name"}</Text>
                  </View>
                  <Text style={styles.experienceDate}>
                    {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                </View>
                {hasContent(exp.description) && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.map((skill) => (
                hasContent(skill.name) ? (
                  <Text key={skill.id} style={styles.skillItem}>{skill.name}</Text>
                ) : null
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColor }]}>Education</Text>
            {resumeData.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.educationContent}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  {hasContent(edu.field) && <Text style={styles.educationField}>{edu.field}</Text>}
                  <Text style={styles.educationSchool}>{edu.school}</Text>
                </View>
                <Text style={styles.educationDate}>
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {resumeData.sections.map((section) => (
          hasContent(section.title) && hasContent(section.content) && (
            <View key={section.id} style={styles.section}>
              <Text style={[styles.sectionTitle, { color: themeColor }]}>{section.title}</Text>
              <Text style={styles.summary}>{section.content}</Text>
            </View>
          )
        ))}
      </Page>
    </Document>
  );
};
