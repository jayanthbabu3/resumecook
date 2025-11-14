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
    borderBottomColor: "#2563eb",
    borderBottomStyle: "solid",
    paddingBottom: 12,
    marginBottom: 18,
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
    marginTop: 0,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#2563eb",
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#1f2937",
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
    color: "#1f2937",
    lineHeight: 1.4,
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

export const SeniorFrontendPDF = ({
  resumeData,
  themeColor = "#2563eb",
}: Props) => {
  const accent = themeColor;

  const contactItems = [
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location,
  ].filter((item): item is string => Boolean(item));

  const additionalSections = resumeData.sections?.filter(
    (section) => section.title && section.content,
  );

  const skillsText = resumeData.skills
    .map((skill) => skill.name?.trim())
    .filter((name): name is string => Boolean(name))
    .join(" • ");

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

        {resumeData.personalInfo.summary ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accent }]}>Summary</Text>
            <Text style={styles.paragraph}>{resumeData.personalInfo.summary}</Text>
          </View>
        ) : null}

        {resumeData.experience.length > 0 ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accent }]}>
              Professional Experience
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
                  {exp.company ? (
                    <Text style={styles.company}>{exp.company}</Text>
                  ) : null}
                  {bullets.length > 0 ? (
                    <View style={styles.bulletList}>
                      {bullets.map((point, index) => (
                        <Text key={`${exp.id}-${index}`} style={styles.bulletItem}>
                          • {point.replace(/^•\s*/, "")}
                        </Text>
                      ))}
        )                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        ) : null}

        {skillsText ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: accent }]}>Skills</Text>
            <Text style={styles.paragraph}>{skillsText}</Text>
          </View>
        ) : null}

        {additionalSections?.length
          ? additionalSections.map((section) => (
              <View key={section.id} style={styles.section}>
                <Text style={[styles.sectionTitle, { color: accent }]}>
                  {section.title}
                </Text>
                <View style={styles.bulletList}>
                  {splitLines(section.content).map((point, index) => (
                    <Text key={`${section.id}-${index}`} style={styles.bulletItem}>
                      • {point}
                    </Text>
                  ))}
        )                </View>
              </View>
            ))
          : null}

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
        )          </View>
        ) : null}
      </Page>
    </Document>
  );
};
