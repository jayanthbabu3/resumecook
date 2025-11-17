import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const createStyles = (color: string) => StyleSheet.create({
  page: { paddingTop: PDF_PAGE_MARGINS.top, paddingRight: PDF_PAGE_MARGINS.right, paddingBottom: PDF_PAGE_MARGINS.bottom, paddingLeft: PDF_PAGE_MARGINS.left, fontSize: 10, fontFamily: 'Inter' },
  header: { marginBottom: 20, borderBottom: 4, borderBottomColor: color, paddingBottom: 15 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  name: { fontSize: 36, fontFamily: 'Inter', fontWeight: 700, marginBottom: 5, color: '#111827' },
  title: { fontSize: 15, marginBottom: 10, color: color, fontWeight: 600 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, fontSize: 11.5, color: '#4b5563' },
  photoWrapper: { width: 72, height: 72, borderRadius: 36, overflow: 'hidden', borderWidth: 4, borderColor: color },
  photo: { width: '100%', height: '100%', objectFit: 'cover' },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 14, fontFamily: 'Inter', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', color: '#111827', borderBottom: 2, borderBottomColor: color, paddingBottom: 5, letterSpacing: 0.8 },
  experienceItem: { marginBottom: 14 },
  jobTitle: { fontSize: 15, fontFamily: 'Inter', fontWeight: 700, marginBottom: 2, color: '#111827' },
  company: { fontSize: 13, fontFamily: 'Inter', fontWeight: 600, color: color, marginBottom: 2 },
  date: { fontSize: 11.5, color: '#6b7280', marginBottom: 5, fontWeight: 500 },
  description: { fontSize: 12.5, lineHeight: 1.75, color: '#374151' },
  educationItem: { marginBottom: 10 },
  degree: { fontSize: 14, fontFamily: 'Inter', fontWeight: 700, marginBottom: 2, color: '#111827' },
  field: { fontSize: 12.5, color: '#4b5563', marginBottom: 2 },
  school: { fontSize: 12.5, fontFamily: 'Inter', fontWeight: 500, color: '#374151' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skill: { fontSize: 12, color: color, paddingHorizontal: 11, paddingVertical: 5, borderRadius: 4, borderWidth: 1.5, fontWeight: 600 },
  summary: { fontSize: 12.5, lineHeight: 1.75, color: '#374151' }
});

const formatDate = (date: string) => {
  if (!date) return "";
  const parts = date.split("-");
  const year = parts[0];
  const month = parts[1];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[parseInt(month) - 1] + " " + year;
};

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const SeniorMobileEngineerPDF = ({ resumeData, themeColor = "#3DDC84" }: Props) => {
  const styles = createStyles(themeColor);
  const photo = resumeData.personalInfo.photo;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{resumeData.personalInfo.fullName || "Your Name"}</Text>
              {resumeData.personalInfo.title && <Text style={styles.title}>{resumeData.personalInfo.title}</Text>}
            </View>
            {photo ? <View style={styles.photoWrapper}><Image src={photo} style={styles.photo} /></View> : null}
          </View>
          <View style={styles.contactRow}>
            {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
            {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
            {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}
          </View>
        </View>

        {hasContent(resumeData.personalInfo.summary) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Leadership Profile</Text>
            <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Expertise</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.map((skill) => hasContent(skill.name) && <Text key={skill.id} style={styles.skill}>{skill.name}</Text>)}
            </View>
          </View>
        )}

        {resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {resumeData.experience.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{exp.position || "Position"}</Text>
                <Text style={styles.company}>{exp.company || "Company"}</Text>
                <Text style={styles.date}>{formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}</Text>
                {hasContent(exp.description) && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree || "Degree"}</Text>
                {edu.field && <Text style={styles.field}>{edu.field}</Text>}
                <Text style={styles.school}>{edu.school || "School"}</Text>
                <Text style={styles.date}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</Text>
              </View>
            ))}
          </View>
        )}

        {resumeData.sections.map((section) => hasContent(section.title) && hasContent(section.content) && (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.description}>{section.content}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};
