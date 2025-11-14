import { Document, Page, Text, View, StyleSheet, Svg, Path, Image } from '@react-pdf/renderer';
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const styles = StyleSheet.create({
  page: {
    paddingTop: PDF_PAGE_MARGINS.top,
    paddingRight: PDF_PAGE_MARGINS.right,
    paddingBottom: PDF_PAGE_MARGINS.bottom,
    paddingLeft: PDF_PAGE_MARGINS.left,
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  header: {
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 30,
    marginBottom: 25,
    marginTop: -40,
    marginLeft: -40,
    marginRight: -40,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  name: {
    fontSize: 26,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    marginBottom: 15,
    color: '#e2e8f0',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 20,
    fontSize: 9,
    color: '#cbd5e1',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  photoWrapper: {
    width: 78,
    height: 78,
    borderRadius: 39,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#334155',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 10,
    borderLeft: 4,
    borderLeftColor: '#1e293b',
    paddingLeft: 10,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333',
    paddingLeft: 10,
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 20,
    borderLeft: 2,
    borderLeftColor: '#e2e8f0',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fontWeight: 600,
    color: '#475569',
  },
  dateBox: {
    backgroundColor: '#f8fafc',
    padding: 6,
    borderRadius: 3,
    fontSize: 8,
    color: '#64748b',
  },
  description: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#333',
  },
  educationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    paddingLeft: 10,
  },
  educationItem: {
    width: '45%',
    borderLeft: 2,
    borderLeftColor: '#e2e8f0',
    paddingLeft: 12,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 3,
  },
  school: {
    fontSize: 10,
    fontFamily: 'Roboto',
    fontWeight: 600,
    color: '#475569',
    marginBottom: 2,
  },
  field: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 2,
  },
  date: {
    fontSize: 8,
    color: '#64748b',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingLeft: 10,
  },
  skillBox: {
    backgroundColor: '#f8fafc',
    padding: 8,
    borderRadius: 3,
    fontSize: 9,
    fontFamily: 'Roboto',
    fontWeight: 600,
    color: '#1e293b',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e2e8f0',
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

export const ExecutivePDF = ({ resumeData, themeColor }: Props) => {
  const photo = resumeData.personalInfo.photo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
            {resumeData.personalInfo.title && (
              <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
            )}
          </View>
          {photo ? (
            <View style={styles.photoWrapper}>
              <Image src={photo} style={styles.photo} />
            </View>
          ) : null}
        </View>
        <View style={styles.contactRow}>
          {resumeData.personalInfo.email && (
            <View style={styles.contactItem}>
              <Svg width="9" height="9" viewBox="0 0 24 24">
                <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                <Path d="m22 6-10 7L2 6" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              </Svg>
              <Text>{resumeData.personalInfo.email}</Text>
            </View>
          )}
          {resumeData.personalInfo.phone && (
            <View style={styles.contactItem}>
              <Svg width="9" height="9" viewBox="0 0 24 24">
                <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              </Svg>
              <Text>{resumeData.personalInfo.phone}</Text>
            </View>
          )}
          {resumeData.personalInfo.location && (
            <View style={styles.contactItem}>
              <Svg width="9" height="9" viewBox="0 0 24 24">
                <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#cbd5e1" strokeWidth="2" />
                <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="#cbd5e1" strokeWidth="2" />
              </Svg>
              <Text>{resumeData.personalInfo.location}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.content}>
        {/* Summary */}
        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Executive Summary</Text>
            <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {resumeData.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{exp.position || "Position Title"}</Text>
                    <Text style={styles.company}>{exp.company || "Company Name"}</Text>
                  </View>
                  <Text style={styles.dateBox}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                </View>
                {hasContent(exp.description) && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.educationGrid}>
              {resumeData.education.map((edu) => (
                <View key={edu.id} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree || "Degree"}</Text>
                  <Text style={styles.school}>{edu.school || "School Name"}</Text>
                  {hasContent(edu.field) && <Text style={styles.field}>{edu.field}</Text>}
                  <Text style={styles.date}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
              <View style={styles.skillsGrid}>
                {resumeData.skills.map((skill) => (
                  hasContent(skill.name) && <Text key={skill.id} style={styles.skillBox}>{skill.name}</Text>
                ))}
              </View>
            </View>
          )}

        {/* Custom Sections */}
        {resumeData.sections.map((section) => (
          hasContent(section.title) && hasContent(section.content) && (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.summary}>{section.content}</Text>
            </View>
          )
        ))}
      </View>
      </Page>
    </Document>
  );
};
