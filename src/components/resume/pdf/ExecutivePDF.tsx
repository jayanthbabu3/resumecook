import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from "@/pages/Editor";

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  header: {
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 30,
    marginBottom: 25,
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
  content: {
    paddingHorizontal: 35,
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
    border: 1,
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
}

export const ExecutivePDF = ({ resumeData }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
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

      <View style={styles.content}>
        {/* Summary */}
        {resumeData.personalInfo.summary && (
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
              <View key={exp.id} style={styles.experienceItem} wrap={false}>
                <View style={styles.experienceHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{exp.position || "Position Title"}</Text>
                    <Text style={styles.company}>{exp.company || "Company Name"}</Text>
                  </View>
                  <Text style={styles.dateBox}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                </View>
                {exp.description && <Text style={styles.description}>{exp.description}</Text>}
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
                <View key={edu.id} style={styles.educationItem} wrap={false}>
                  <Text style={styles.degree}>{edu.degree || "Degree"}</Text>
                  <Text style={styles.school}>{edu.school || "School Name"}</Text>
                  {edu.field && <Text style={styles.field}>{edu.field}</Text>}
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
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
            <View style={styles.skillsGrid}>
              {resumeData.skills.map((skill, index) => (
                skill && <Text key={index} style={styles.skillBox}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Custom Sections */}
        {resumeData.sections.map((section) => (
          <View key={section.id} style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.summary}>{section.content}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);