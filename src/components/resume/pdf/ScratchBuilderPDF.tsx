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
  // Helper to apply text case transformation
  const applyTextCase = (text: string, caseType?: string) => {
    if (!text) return text;
    switch (caseType) {
      case 'upper':
        return text.toUpperCase();
      case 'lower':
        return text.toLowerCase();
      case 'title':
        // Title case: capitalize first letter of each word
        return text.replace(/\w\S*/g, (word) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        );
      default:
        return text.toUpperCase(); // Default to uppercase for backwards compatibility
    }
  };

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
              <Text style={[
                styles.sectionTitle,
                { textAlign: section.titleAlignment || 'left' }
              ]}>
                {applyTextCase(section.title, section.titleCase)}
              </Text>

              {/* Summary Section with variant support */}
              {(section.type === "summary" || section.data.type === "summary") && (
                <>
                  {/* Executive Summary - bold */}
                  {section.data.variantId === "executive-summary" && section.data.content && (
                    <Text style={[styles.sectionContent, { textAlign: section.contentAlignment || 'left', fontWeight: 600 }]}>
                      {section.data.content}
                    </Text>
                  )}

                  {/* Professional Profile - bullet points */}
                  {section.data.variantId === "professional-profile" && Array.isArray(section.data.content) && (
                    <View style={{ textAlign: section.contentAlignment || 'left' }}>
                      {section.data.content.map((item: string, idx: number) => (
                        <Text key={idx} style={[styles.sectionContent, { marginBottom: 3 }]}>
                          • {item}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Career Objective - italic style */}
                  {section.data.variantId === "career-objective" && section.data.content && (
                    <Text style={[styles.sectionContent, { fontStyle: "italic", textAlign: section.contentAlignment || 'left' }]}>
                      {section.data.content}
                    </Text>
                  )}

                  {/* About Me - casual style */}
                  {section.data.variantId === "about-me" && section.data.content && (
                    <Text style={[styles.sectionContent, { fontStyle: "italic", lineHeight: 1.7, textAlign: section.contentAlignment || 'left' }]}>
                      {section.data.content}
                    </Text>
                  )}

                  {/* Professional Summary - classic with border */}
                  {section.data.variantId === "professional-summary" && section.data.content && (
                    <Text style={[styles.sectionContent, { textAlign: section.contentAlignment || 'left' }]}>{section.data.content}</Text>
                  )}

                  {/* Highlighted Summary - with accent */}
                  {section.data.variantId === "highlighted-summary" && section.data.content && (
                    <Text style={[styles.sectionContent, { textAlign: section.contentAlignment || 'left', fontWeight: 600 }]}>{section.data.content}</Text>
                  )}

                  {/* Two-Column Layout - stats + content */}
                  {section.data.variantId === "two-column-summary" && (
                    <View>
                      {section.data.stats && Array.isArray(section.data.stats) && (
                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 6, gap: 4 }}>
                          {section.data.stats.map((stat: string, idx: number) => (
                            <Text key={idx} style={[styles.sectionContent, { fontSize: 9, fontWeight: 600 }]}>
                              {stat}
                              {idx < section.data.stats.length - 1 ? " •" : ""}
                            </Text>
                          ))}
                        </View>
                      )}
                      {section.data.content && (
                        <Text style={[styles.sectionContent, { textAlign: section.contentAlignment || 'left' }]}>{section.data.content}</Text>
                      )}
                    </View>
                  )}

                  {/* Minimal Summary */}
                  {section.data.variantId === "minimal-summary" && section.data.content && (
                    <Text style={[styles.sectionContent, { textAlign: section.contentAlignment || 'left' }]}>{section.data.content}</Text>
                  )}

                  {/* Achievement-Focused - bullet points */}
                  {section.data.variantId === "achievement-focused" && Array.isArray(section.data.content) && (
                    <View style={{ textAlign: section.contentAlignment || 'left' }}>
                      {section.data.content.map((item: string, idx: number) => (
                        <Text key={idx} style={[styles.sectionContent, { marginBottom: 3 }]}>
                          ↗ {item}
                        </Text>
                      ))}
                    </View>
                  )}

                  {/* Expertise Summary - content + tags */}
                  {section.data.variantId === "expertise-summary" && (
                    <View>
                      {section.data.content && (
                        <Text style={[styles.sectionContent, { textAlign: section.contentAlignment || 'left', marginBottom: 6 }]}>{section.data.content}</Text>
                      )}
                      {section.data.tags && Array.isArray(section.data.tags) && (
                        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
                          {section.data.tags.map((tag: string, idx: number) => (
                            <Text key={idx} style={[styles.sectionContent, { fontSize: 9, backgroundColor: "#f3f4f6", padding: 4, borderRadius: 4 }]}>
                              {tag}
                            </Text>
                          ))}
                        </View>
                      )}
                    </View>
                  )}

                  {/* Default summary - for sections without variant */}
                  {!section.data.variantId && section.data.content && (
                    <Text style={[styles.sectionContent, { textAlign: section.contentAlignment || 'left' }]}>{section.data.content}</Text>
                  )}
                </>
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

              {/* Skills Section with variant support */}
              {(section.type === "skills" || section.data.type === "skills") && (
                <>
                  {/* Skill Pills - horizontal chips */}
                  {(section.data.variantId === "skill-pills" || !section.data.variantId) && section.data.skills && (
                    <View style={styles.skillsContainer}>
                      {Array.isArray(section.data.skills) && section.data.skills.map((skill: string, idx: number) => (
                        <View key={idx} style={styles.skillTag}>
                          <Text>{skill}</Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Vertical List with levels */}
                  {section.data.variantId === "skill-list" && section.data.skills && (
                    <View>
                      {section.data.skills.map((skill: any, idx: number) => (
                        <View key={idx} style={[styles.itemContainer, { marginBottom: 4 }]}>
                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.sectionContent}>{skill.name}</Text>
                            <Text style={[styles.itemDate, { fontSize: 8 }]}>{skill.level}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Comma Separated - inline */}
                  {section.data.variantId === "skill-inline" && section.data.skills && (
                    <Text style={styles.sectionContent}>
                      {typeof section.data.skills === "string" ? section.data.skills : ""}
                    </Text>
                  )}

                  {/* Grouped Categories */}
                  {section.data.variantId === "skill-grouped" && section.data.skillGroups && (
                    <View>
                      {section.data.skillGroups.map((group: any, idx: number) => (
                        <View key={idx} style={[styles.itemContainer, { marginBottom: 6 }]}>
                          <Text style={[styles.sectionContent, { fontWeight: 600 }]}>
                            {group.category}:
                          </Text>
                          <Text style={[styles.sectionContent, { marginLeft: 8 }]}>
                            {group.skills.join(", ")}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Skill Bars */}
                  {section.data.variantId === "skill-bars" && section.data.skills && (
                    <View>
                      {section.data.skills.map((skill: any, idx: number) => (
                        <View key={idx} style={[styles.itemContainer, { marginBottom: 6 }]}>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }}>
                            <Text style={styles.sectionContent}>{skill.name}</Text>
                            <Text style={[styles.itemDate, { fontSize: 8 }]}>{skill.level}%</Text>
                          </View>
                          <View style={{
                            height: 4,
                            backgroundColor: "#e5e7eb",
                            borderRadius: 2,
                            width: "100%",
                          }}>
                            <View style={{
                              height: 4,
                              backgroundColor: themeColor,
                              borderRadius: 2,
                              width: `${skill.level}%`,
                            }} />
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  {/* Legacy support for items array */}
                  {section.data.items?.length > 0 && !section.data.skills && (
                    <View style={styles.skillsContainer}>
                      {section.data.items
                        .filter((skill: any) => skill.name)
                        .map((skill: any) => (
                          <View key={skill.id} style={styles.skillTag}>
                            <Text>{skill.name}</Text>
                          </View>
                        ))}
                    </View>
                  )}
                </>
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
