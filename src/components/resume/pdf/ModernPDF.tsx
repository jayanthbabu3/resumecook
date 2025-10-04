import { Document, Page, Text, View, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import type { ResumeData } from "@/pages/Editor";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#4f46e5',
    color: '#fff',
    padding: 25,
  },
  content: {
    width: '65%',
    padding: 35,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 700,
    color: '#fff',
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 10,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sidebarText: {
    fontSize: 9,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  sidebarContactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    marginBottom: 8,
  },
  skillBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 4,
    marginBottom: 6,
    fontSize: 9,
  },
  name: {
    fontSize: 28,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#4f46e5',
    fontFamily: 'Roboto',
    fontWeight: 600,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 10,
    color: '#4f46e5',
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 15,
    borderLeft: 2,
    borderLeftColor: '#e0e7ff',
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    color: '#4f46e5',
    fontFamily: 'Roboto',
    fontWeight: 600,
    marginBottom: 2,
  },
  date: {
    fontSize: 9,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.4,
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

export const ModernPDF = ({ resumeData }: Props) => {
  const getInitials = () => {
    return resumeData.personalInfo.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || "YN";
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.avatar}>
            <Text style={styles.initials}>{getInitials()}</Text>
          </View>

          {/* Contact */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {resumeData.personalInfo.email && (
              <View style={styles.sidebarContactItem}>
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="#fff" strokeWidth="2" />
                  <Path d="m22 6-10 7L2 6" fill="none" stroke="#fff" strokeWidth="2" />
                </Svg>
                <Text style={[styles.sidebarText, { marginBottom: 0 }]}>{resumeData.personalInfo.email}</Text>
              </View>
            )}
            {resumeData.personalInfo.phone && (
              <View style={styles.sidebarContactItem}>
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="#fff" strokeWidth="2" />
                </Svg>
                <Text style={[styles.sidebarText, { marginBottom: 0 }]}>{resumeData.personalInfo.phone}</Text>
              </View>
            )}
            {resumeData.personalInfo.location && (
              <View style={styles.sidebarContactItem}>
                <Svg width="10" height="10" viewBox="0 0 24 24">
                  <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="#fff" strokeWidth="2" />
                  <Path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="none" stroke="#fff" strokeWidth="2" />
                </Svg>
                <Text style={[styles.sidebarText, { marginBottom: 0 }]}>{resumeData.personalInfo.location}</Text>
              </View>
            )}
          </View>

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {resumeData.skills.map((skill, index) => (
                skill && <Text key={index} style={styles.skillBox}>{skill}</Text>
              ))}
            </View>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {resumeData.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 12 }}>
                  <Text style={[styles.sidebarText, { fontWeight: 'bold' }]}>{edu.degree}</Text>
                  <Text style={styles.sidebarText}>{edu.school}</Text>
                  <Text style={[styles.sidebarText, { fontSize: 8 }]}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
          {resumeData.personalInfo.title && (
            <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
          )}

          {/* Summary */}
          {resumeData.personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <Text style={styles.description}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {resumeData.experience.map((exp) => (
                <View key={exp.id} style={styles.experienceItem} wrap={false}>
                  <Text style={styles.jobTitle}>{exp.position || "Position Title"}</Text>
                  <Text style={styles.company}>{exp.company || "Company Name"}</Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </Text>
                  {exp.description && <Text style={styles.description}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Custom Sections */}
          {resumeData.sections.map((section) => (
            <View key={section.id} style={styles.section} wrap={false}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.description}>{section.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};