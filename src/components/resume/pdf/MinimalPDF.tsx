import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from "@/pages/Editor";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: 'Inter',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 26,
    fontFamily: 'Inter',
    fontWeight: 300,
    marginBottom: 8,
    letterSpacing: 1,
  },
  title: {
    fontSize: 11,
    color: '#666',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 15,
    fontSize: 9,
    color: '#666',
  },
  summary: {
    fontSize: 10,
    color: '#333',
    lineHeight: 1.5,
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000',
  },
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#e5e5e5',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 3,
  },
  company: {
    fontSize: 10,
    color: '#666',
  },
  date: {
    fontSize: 9,
    color: '#999',
  },
  description: {
    fontSize: 9,
    lineHeight: 1.4,
    color: '#333',
  },
  educationItem: {
    marginBottom: 12,
  },
  degree: {
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: 700,
    marginBottom: 3,
  },
  school: {
    fontSize: 10,
    color: '#666',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'flex-start',
  },
  skill: {
    fontSize: 9,
    color: '#333',
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

export const MinimalPDF = ({ resumeData }: Props) => (
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

      {/* Summary */}
      {resumeData.personalInfo.summary && (
        <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
      )}

      {/* Experience */}
      {resumeData.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resumeData.experience.map((exp, index) => (
            <View 
              key={exp.id} 
              style={[
                styles.experienceItem,
                index === resumeData.experience.length - 1 && { borderBottom: 0 }
              ]} 
              wrap={false}
            >
              <View style={styles.experienceHeader}>
                <View>
                  <Text style={styles.jobTitle}>{exp.position || "Position Title"}</Text>
                  <Text style={styles.company}>{exp.company || "Company Name"}</Text>
                </View>
                <Text style={styles.date}>
                  {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
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
          {resumeData.education.map((edu) => (
            <View key={edu.id} style={styles.educationItem} wrap={false}>
              <View style={styles.experienceHeader}>
                <View>
                  <Text style={styles.degree}>
                    {edu.degree || "Degree"}{edu.field && `, ${edu.field}`}
                  </Text>
                  <Text style={styles.school}>{edu.school || "School Name"}</Text>
                </View>
                <Text style={styles.date}>
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {resumeData.skills.map((skill, index) => (
              skill && <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>
      )}

      {/* Custom Sections */}
      {resumeData.sections.map((section) => (
        <View key={section.id} style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.description}>{section.content}</Text>
        </View>
      ))}
    </Page>
  </Document>
);