import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import { ResumeData } from "@/pages/Editor";

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2", fontWeight: 700 },
  ]
});

interface PDFTriangularElementsUniversalTemplateProps {
  resumeData: ResumeData;
  themeColor?: string;
}

const createStyles = (themeColor: string) => StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Inter",
    fontSize: 13,
    lineHeight: 1.6,
    color: "#1f2937",
    backgroundColor: "#ffffff",
    
  },
  header: {
    marginBottom: 40,
  },
  name: {
    fontSize: 13,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 8,
    
  },
  title: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 20,
    
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    fontSize: 12,
    color: "#6b7280",
    
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 16,
  },
});

export const PDFTriangularElementsUniversalTemplate = ({
  resumeData,
  themeColor = "#7c3aed",
}: PDFTriangularElementsUniversalTemplateProps) => {
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View style={styles.header}>
            <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
            {resumeData.personalInfo.title && (
              <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
            )}
            <View style={styles.contactInfo}>
              {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
              {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
              {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}
            </View>
          </View>

          {resumeData.personalInfo.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={{ fontSize: 13, lineHeight: 1.7, color: "#374151" }}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {resumeData.experience && resumeData.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {resumeData.experience.map((exp, index) => {
                const bulletPoints = (exp.description || "").split("\n").filter(Boolean);
                return (
                  <View key={index} style={{ marginBottom: 24 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}>{exp.position}</Text>
                        <Text style={{ fontSize: 13, color: "#374151" }}>{exp.company}</Text>
                      </View>
                      <Text style={{ fontSize: 11, color: "#6b7280" }}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                    </View>
                    {bulletPoints.length > 0 && (
                      <View style={{ marginLeft: 20, marginTop: 8 }}>
                        {bulletPoints.map((point, i) => (
                          <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: "#374151", marginRight: 8, marginTop: 6 }} />
                            <Text style={{ flex: 1, fontSize: 12.5, lineHeight: 1.7, color: "#374151" }}>{point}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {resumeData.education && resumeData.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={{ marginBottom: 16 }}>
                  <Text style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 4 }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#374151", marginBottom: 2 }}>{edu.school}</Text>
                  <Text style={{ fontSize: 11, color: "#6b7280" }}>{edu.startDate} - {edu.endDate}</Text>
                </View>
              ))}
            </View>
          )}

          {resumeData.skills && resumeData.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {resumeData.skills.map((skill, index) => (
                  <Text key={index} style={{ fontSize: 13, color: "#111827", marginRight: 4 }}>{skill.name}</Text>
                ))}
              </View>
            </View>
          )}
          {resumeData.sections && resumeData.sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={{ fontSize: 13, lineHeight: 1.7, color: "#374151" }}>{section.content}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
