import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/pages/Editor";
import { PDF_PAGE_MARGINS, hasContent } from "@/lib/pdfConfig";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    paddingHorizontal: 45,
    paddingVertical: 48,
    fontSize: 10,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    paddingBottom: 14,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: "#0f172a",
  },
  title: {
    fontSize: 11,
    fontWeight: 600,
    color: "#475569",
    marginTop: 4,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 9,
    color: "#475569",
  },
  contentRow: {
    flexDirection: "row",
  },
  sidebar: {
    width: "35%",
    paddingRight: 16,
  },
  mainColumn: {
    flex: 1,
  },
  sidebarSection: {
    marginBottom: 14,
  },
  sidebarTitle: {
    fontSize: 9,
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  chip: {
    fontSize: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "#ffffff",
    color: "#0f172a",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#1f2937",
    textAlign: "justify",
  },
  experienceBlock: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  position: {
    fontSize: 10,
    fontWeight: 600,
    color: "#0f172a",
  },
  company: {
    fontSize: 9,
    fontWeight: 500,
    color: "#1f2937",
    marginTop: 2,
  },
  date: {
    fontSize: 8,
    color: "#64748b",
  },
  bulletList: {
    marginTop: 4,
    marginLeft: 10,
  },
  bulletItem: {
    fontSize: 9,
    lineHeight: 1.45,
    color: "#1f2937",
    marginBottom: 3,
  },
});

const formatDate = (date: string) => {
  if (!date) {
    return "";
  }
  const parsed = new Date(date);
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

const splitLines = (text?: string | null) =>
  text
    ? text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

interface Props {
  resumeData: ResumeData;
  themeColor?: string;
}

export const SeniorBackendPDF = ({
  resumeData,
  themeColor = "#0f766e",
}: Props) => {
  const accent = themeColor;
  const contactItems = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location,
  ].filter((item): item is string => Boolean(item));

  const sections = resumeData.sections ?? [];
  const achievementsSection = sections.find((section) =>
    section.title?.toLowerCase().includes("achievement"),
  );
  const achievementLines = splitLines(achievementsSection?.content);
  const otherSections = sections.filter(
    (section) => section !== achievementsSection && section.title && section.content,
  );

  const competencyChips = resumeData.skills
    .map((skill) => skill.name?.trim())
    .filter((name): name is string => Boolean(name));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.header, { borderBottomColor: accent }]}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
              {resumeData.personalInfo.title ? (
                <Text style={styles.title}>{resumeData.personalInfo.title}</Text>
              ) : null}
            </View>
            {contactItems.length > 0 ? (
              <View style={styles.contactRow}>
                <Text>{contactItems.join("  |  ")}</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.contentRow}>
          <View style={styles.sidebar}>
            {resumeData.personalInfo.summary ? (
              <View style={styles.sidebarSection}>
                <Text style={[styles.sidebarTitle, { color: accent }]}>Summary</Text>
                <Text style={styles.paragraph}>{resumeData.personalInfo.summary}</Text>
              </View>
            ) : null}

            {competencyChips.length > 0 ? (
              <View style={styles.sidebarSection}>
                <Text style={[styles.sidebarTitle, { color: accent }]}>Skills</Text>
                <View style={styles.chipRow}>
                  {competencyChips.slice(0, 16).map((skill, index) => (
                    <Text key={`${skill}-${index}`} style={styles.chip}>
                      {skill}
                    </Text>
                  ))}
        )                </View>
              </View>
            ) : null}

            {achievementLines.length > 0 ? (
              <View style={styles.sidebarSection}>
                <Text style={[styles.sidebarTitle, { color: accent }]}>Achievements</Text>
                <View style={styles.bulletList}>
                  {achievementLines.map((line, index) => (
                    <Text key={`achievement-${index}`} style={styles.bulletItem}>
                      • {line}
                    </Text>
                  ))}
        )                </View>
              </View>
            ) : null}
          </View>

          <View style={styles.mainColumn}>
            {resumeData.experience.length > 0 ? (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: accent }]}>
                  Experience
                </Text>
                {resumeData.experience.map((exp) => {
                  const bullets = splitLines(exp.description);
                  return (
                    <View key={exp.id} style={styles.experienceBlock}>
                      <View style={styles.experienceHeader}>
                        <Text style={styles.position}>{exp.position || "Role"}</Text>
                        <Text style={styles.date}>
                          {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                        </Text>
                      </View>
                      {exp.company ? <Text style={styles.company}>{exp.company}</Text> : null}
                      {bullets.length > 0 ? (
                        <View style={styles.bulletList}>
                          {bullets.map((point, index) => (
                            <Text key={`${exp.id}-${index}`} style={styles.bulletItem}>
                              • {point.replace(/^•\s*/, "")}
                            </Text>
                          ))}
        )                        </View>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            ) : null}

            {otherSections.map((section) => {
              const items = splitLines(section.content);
              return (
                <View key={section.id} style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: accent }]}>{section.title}</Text>
                  {items.length > 0 ? (
                    <View style={styles.bulletList}>
                      {items.map((line, index) => (
                        <Text key={`${section.id}-${index}`} style={styles.bulletItem}>
                          • {line}
                        </Text>
                      ))}
        )                    </View>
                  ) : (
                    <Text style={styles.paragraph}>{section.content}</Text>
                  )}
                </View>
              );
            })}

            {resumeData.education.length > 0 ? (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: accent }]}>Education</Text>
                {resumeData.education.map((edu) => (
                  <View key={edu.id} style={styles.experienceBlock}>
                    <Text style={styles.position}>{edu.degree || "Degree"}</Text>
                    {edu.school ? <Text style={styles.company}>{edu.school}</Text> : null}
                    {edu.field ? <Text style={styles.paragraph}>{edu.field}</Text> : null}
                    <Text style={styles.date}>
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </Text>
                  </View>
                ))}
        )              </View>
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
};
