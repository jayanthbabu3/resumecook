import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
import { hasContent } from "@/lib/pdfConfig";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2",
      fontWeight: 700,
    },
  ],
});

interface ScratchBuilderPDFProps {
  resumeData: ResumeData;
  themeColor?: string;
}

export function ScratchBuilderPDF({
  resumeData,
  themeColor = "#2563eb",
}: ScratchBuilderPDFProps) {
  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Inter",
      fontSize: 10,
      lineHeight: 1.5,
      backgroundColor: "#ffffff",
    },
    header: {
      marginBottom: 20,
      borderBottom: `2px solid ${themeColor}`,
      paddingBottom: 12,
    },
    name: {
      fontSize: 24,
      fontWeight: 700,
      color: themeColor,
      marginBottom: 4,
    },
    title: {
      fontSize: 14,
      fontWeight: 600,
      color: "#374151",
      marginBottom: 8,
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      fontSize: 9,
      color: "#6b7280",
    },
    contactItem: {
      marginRight: 12,
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 700,
      color: themeColor,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    sectionContent: {
      fontSize: 10,
      color: "#374151",
      lineHeight: 1.6,
    },
    itemContainer: {
      marginBottom: 10,
    },
    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    itemTitle: {
      fontSize: 11,
      fontWeight: 600,
      color: "#111827",
    },
    itemSubtitle: {
      fontSize: 10,
      color: "#6b7280",
      marginBottom: 3,
    },
    itemDate: {
      fontSize: 9,
      color: "#9ca3af",
    },
    itemDescription: {
      fontSize: 9,
      color: "#4b5563",
      lineHeight: 1.5,
    },
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
    skillTag: {
      backgroundColor: `${themeColor}15`,
      color: themeColor,
      padding: "4px 10px",
      borderRadius: 12,
      fontSize: 9,
      fontWeight: 500,
    },
  });

  const { personalInfo, dynamicSections = [] } = resumeData;

  // Sort sections by order
  const sortedSections = [...dynamicSections].sort((a, b) => a.order - b.order);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Personal Info */}
        <View style={styles.header}>
          {personalInfo.fullName && (
            <Text style={styles.name}>{personalInfo.fullName}</Text>
          )}
          {personalInfo.title && (
            <Text style={styles.title}>{personalInfo.title}</Text>
          )}
          <View style={styles.contactInfo}>
            {personalInfo.email && (
              <Text style={styles.contactItem}>{personalInfo.email}</Text>
            )}
            {personalInfo.phone && (
              <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            )}
            {personalInfo.location && (
              <Text style={styles.contactItem}>{personalInfo.location}</Text>
            )}
          </View>
        </View>

        {/* Dynamic Sections */}
        {sortedSections
          .filter((section) => section.enabled)
          .map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>

              {/* Summary Section */}
              {section.data.type === "summary" && section.data.content && (
                <Text style={styles.sectionContent}>{section.data.content}</Text>
              )}

              {/* Experience Section */}
              {section.data.type === "experience" &&
                section.data.items?.length > 0 && (
                  <View>
                    {section.data.items.map((exp) => (
                      <View key={exp.id} style={styles.itemContainer}>
                        <View style={styles.itemHeader}>
                          <Text style={styles.itemTitle}>
                            {exp.position || "Position"}
                          </Text>
                          <Text style={styles.itemDate}>
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </Text>
                        </View>
                        <Text style={styles.itemSubtitle}>
                          {exp.company || "Company"}
                        </Text>
                        {exp.description && (
                          <Text style={styles.itemDescription}>
                            {exp.description}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}

              {/* Education Section */}
              {section.data.type === "education" &&
                section.data.items?.length > 0 && (
                  <View>
                    {section.data.items.map((edu) => (
                      <View key={edu.id} style={styles.itemContainer}>
                        <View style={styles.itemHeader}>
                          <Text style={styles.itemTitle}>
                            {edu.degree || "Degree"}
                          </Text>
                          <Text style={styles.itemDate}>
                            {edu.startDate} - {edu.endDate}
                          </Text>
                        </View>
                        <Text style={styles.itemSubtitle}>
                          {edu.school || "School"}
                        </Text>
                        {edu.field && (
                          <Text style={styles.itemDescription}>
                            {edu.field}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}

              {/* Skills Section */}
              {section.data.type === "skills" &&
                section.data.items?.length > 0 && (
                  <View style={styles.skillsContainer}>
                    {section.data.items
                      .filter((skill) => skill.name)
                      .map((skill) => (
                        <View key={skill.id} style={styles.skillTag}>
                          <Text>{skill.name}</Text>
                        </View>
                      ))}
                  </View>
                )}

              {/* Certifications Section */}
              {section.data.type === "certifications" &&
                section.data.items?.length > 0 && (
                  <View>
                    {section.data.items.map((cert) => (
                      <View key={cert.id} style={styles.itemContainer}>
                        <View style={styles.itemHeader}>
                          <Text style={styles.itemTitle}>
                            {cert.name || "Certification"}
                          </Text>
                          <Text style={styles.itemDate}>{cert.date}</Text>
                        </View>
                        <Text style={styles.itemSubtitle}>
                          {cert.issuer || "Issuer"}
                        </Text>
                        {cert.credentialId && (
                          <Text style={styles.itemDescription}>
                            Credential ID: {cert.credentialId}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}

              {/* Languages Section */}
              {section.data.type === "languages" &&
                section.data.items?.length > 0 && (
                  <View>
                    {section.data.items.map((lang) => (
                      <View
                        key={lang.id}
                        style={[styles.itemContainer, { marginBottom: 6 }]}
                      >
                        <Text style={styles.sectionContent}>
                          <Text style={{ fontWeight: 600 }}>{lang.language}</Text> -{" "}
                          {lang.proficiency}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

              {/* Projects Section */}
              {section.data.type === "projects" &&
                section.data.items?.length > 0 && (
                  <View>
                    {section.data.items.map((project) => (
                      <View key={project.id} style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>
                          {project.name || "Project"}
                        </Text>
                        {project.description && (
                          <Text style={styles.itemDescription}>
                            {project.description}
                          </Text>
                        )}
                        {project.techStack && project.techStack.length > 0 && (
                          <Text
                            style={[
                              styles.itemDescription,
                              { marginTop: 3, fontStyle: "italic" },
                            ]}
                          >
                            Tech: {project.techStack.join(", ")}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}

              {/* Awards Section */}
              {section.data.type === "awards" && section.data.items?.length > 0 && (
                <View>
                  {section.data.items.map((award) => (
                    <View key={award.id} style={styles.itemContainer}>
                      <View style={styles.itemHeader}>
                        <Text style={styles.itemTitle}>
                          {award.title || "Award"}
                        </Text>
                        <Text style={styles.itemDate}>{award.date}</Text>
                      </View>
                      <Text style={styles.itemSubtitle}>
                        {award.issuer || "Issuer"}
                      </Text>
                      {award.description && (
                        <Text style={styles.itemDescription}>
                          {award.description}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
              )}

              {/* Custom Section */}
              {section.data.type === "custom" && section.data.content && (
                <Text style={styles.sectionContent}>{section.data.content}</Text>
              )}
            </View>
          ))}
      </Page>
    </Document>
  );
}
