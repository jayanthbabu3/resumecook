#!/usr/bin/env python3
"""
Analyze UI templates and generate matching PDF templates
"""
import re
from pathlib import Path

# First 50 universal-professional templates
FIRST_50_TEMPLATES = [
    "Professional", "Minimal", "PremiumUniversal", "PremiumPro", "Elite",
    "Refined", "PremiumElite", "ModernSidebar", "MinimalistGeometric", "BoldHeadline",
    "DualTone", "ContemporarySplit", "ExecutiveModern", "CorporateBlue", "ProfessionalSidebar",
    "MinimalistPro", "ClassicElegant", "BusinessModern", "ProfessionalTimeline", "CleanCorporate",
    "ModernProfessional", "ElegantProfessional", "ProfessionalGrid", "BusinessElite", "CorporateClean",
    "ProfessionalClassic", "ModernBusiness", "TimelineElegance", "ExecutiveMinimal", "SidebarAccent",
    "GeometricModern", "TwoToneClassic", "BorderedElegance", "ColumnDivide", "CompactProfessional",
    "StrategicExecutive", "ProfessionalSphere", "GlobalProfessional", "ProfessionalHorizon", "ExecutivePrime",
    "CorporateMomentum", "ProfessionalAscend", "GlobalElite", "ExecutiveVision", "CorporateFusion",
    "ProfessionalZenith", "ExecutiveCore", "SidebarProfessionalUniversal", "MetroModernUniversal", "SwissStyleUniversal"
]

def extract_ui_structure(ui_content):
    """Extract key structural information from UI template"""
    structure = {
        'has_sidebar': False,
        'has_two_columns': False,
        'header_style': 'standard',  # standard, bold, minimal, centered
        'has_timeline': False,
        'has_border': False,
        'has_accent_color_background': False,
        'layout_type': 'standard',  # standard, sidebar, two-column, grid
        'theme_color': '#0891b2',
    }
    
    # Detect layout patterns
    if 'flex-row' in ui_content or 'grid grid-cols-2' in ui_content or 'grid-cols-3' in ui_content:
        if 'sidebar' in ui_content.lower() or 'w-1/3' in ui_content:
            structure['has_sidebar'] = True
            structure['layout_type'] = 'sidebar'
        elif 'grid grid-cols-2' in ui_content:
            structure['has_two_columns'] = True
            structure['layout_type'] = 'two-column'
    
    # Detect header styles
    if 'text-center' in ui_content and 'personalInfo.fullName' in ui_content:
        structure['header_style'] = 'centered'
    elif 'font-black' in ui_content or 'text-[32px]' in ui_content or 'text-[36px]' in ui_content:
        structure['header_style'] = 'bold'
    elif 'text-[20px]' in ui_content or 'text-[22px]' in ui_content:
        structure['header_style'] = 'minimal'
    
    # Detect special features
    if 'timeline' in ui_content.lower() or 'border-l' in ui_content:
        structure['has_timeline'] = True
    
    if 'border-2' in ui_content or 'border-4' in ui_content or 'border-solid' in ui_content:
        structure['has_border'] = True
        
    # Check if header has colored background
    if 'backgroundColor' in ui_content or 'bg-gradient' in ui_content:
        structure['has_accent_color_background'] = True
    
    # Extract theme color
    theme_match = re.search(r'themeColor\s*=\s*"([#\w]+)"', ui_content)
    if theme_match:
        structure['theme_color'] = theme_match.group(1)
    
    return structure


def generate_matching_pdf(template_name, structure):
    """Generate PDF template that matches UI structure"""
    theme_color = structure['theme_color']
    
    # Base imports
    pdf_content = f'''import {{ Document, Page, Text, View, StyleSheet, Font, Link }} from "@react-pdf/renderer";
import {{ ResumeData }} from "@/pages/Editor";

// Register fonts
Font.register({{
  family: "Inter",
  fonts: [
    {{ src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" }},
    {{ src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2", fontWeight: 600 }},
    {{ src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff2", fontWeight: 700 }},
  ]
}});

interface PDF{template_name}Props {{
  resumeData: ResumeData;
  themeColor?: string;
}}

const createStyles = (themeColor: string) => StyleSheet.create({{
'''
    
    # Generate styles based on structure
    if structure['layout_type'] == 'sidebar':
        pdf_content += generate_sidebar_styles(theme_color, structure)
    elif structure['layout_type'] == 'two-column':
        pdf_content += generate_two_column_styles(theme_color, structure)
    else:
        pdf_content += generate_standard_styles(theme_color, structure)
    
    pdf_content += '''});

export const PDF''' + template_name + ''' = ({
  resumeData,
  themeColor = "''' + theme_color + '''",
}: PDF''' + template_name + '''Props) => {
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
'''
    
    # Generate content based on layout
    if structure['layout_type'] == 'sidebar':
        pdf_content += generate_sidebar_content(structure)
    elif structure['layout_type'] == 'two-column':
        pdf_content += generate_two_column_content(structure)
    else:
        pdf_content += generate_standard_content(structure)
    
    pdf_content += '''      </Page>
    </Document>
  );
};
'''
    
    return pdf_content


def generate_sidebar_styles(theme_color, structure):
    """Generate styles for sidebar layout"""
    header_style = "centered" if structure['header_style'] == 'centered' else "left"
    name_size = 32 if structure['header_style'] == 'bold' else 24
    
    return f'''  page: {{
    flexDirection: "row",
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    backgroundColor: "#ffffff",
  }},
  sidebar: {{
    width: "35%",
    backgroundColor: "{theme_color}15",
    padding: 24,
    paddingTop: 40,
  }},
  mainContent: {{
    width: "65%",
    padding: 40,
    paddingTop: 40,
  }},
  name: {{
    fontSize: {name_size},
    fontWeight: 700,
    color: "{theme_color}",
    marginBottom: 8,
    textAlign: "{header_style}",
  }},
  sectionTitle: {{
    fontSize: 12,
    fontWeight: 700,
    color: "{theme_color}",
    marginBottom: 12,
    marginTop: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  }},
  contactItem: {{
    fontSize: 9,
    color: "#374151",
    marginBottom: 8,
  }},
  skillItem: {{
    fontSize: 9,
    color: "#374151",
    marginBottom: 6,
    paddingLeft: 8,
  }},
  experienceItem: {{
    marginBottom: 16,
  }},
  position: {{
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 4,
  }},
  company: {{
    fontSize: 10,
    fontWeight: 500,
    color: "{theme_color}",
    marginBottom: 4,
  }},
  dateRange: {{
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 6,
  }},
  bulletPoints: {{
    marginTop: 6,
  }},
  bulletPoint: {{
    flexDirection: "row",
    marginBottom: 3,
  }},
  bullet: {{
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "{theme_color}",
    marginRight: 8,
    marginTop: 4,
  }},
  bulletText: {{
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: "#374151",
  }},
  educationItem: {{
    marginBottom: 12,
  }},
  degree: {{
    fontSize: 10,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 3,
  }},
  school: {{
    fontSize: 9,
    color: "#374151",
    marginBottom: 2,
  }},
  summary: {{
    fontSize: 10,
    lineHeight: 1.7,
    color: "#374151",
    marginBottom: 16,
  }}'''


def generate_standard_styles(theme_color, structure):
    """Generate styles for standard layout"""
    name_size = 32 if structure['header_style'] == 'bold' else 28
    header_align = "center" if structure['header_style'] == 'centered' else "left"
    has_border = structure['has_border']
    has_bg = structure['has_accent_color_background']
    
    styles = f'''  page: {{
    padding: {"0" if has_bg else "40"},
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  }},'''
    
    if has_bg:
        styles += f'''
  headerSection: {{
    backgroundColor: "{theme_color}",
    padding: 32,
    paddingBottom: 24,
    marginBottom: 24,
  }},
  name: {{
    fontSize: {name_size},
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "{header_align}",
  }},
  contactInfo: {{
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    fontSize: 9,
    color: "#ffffff",
    opacity: 0.95,
    justifyContent: "{header_align}",
  }},
  mainContent: {{
    paddingHorizontal: 40,
  }},'''
    else:
        styles += f'''
  header: {{
    marginBottom: 24,
    paddingBottom: {"20" if has_border else "16"},
    {"borderBottom: " + '"2px solid ' + theme_color + '",' if has_border else ""}
    textAlign: "{header_align}",
  }},
  name: {{
    fontSize: {name_size},
    fontWeight: 700,
    color: "{theme_color}",
    marginBottom: 12,
  }},
  contactInfo: {{
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    fontSize: 9.5,
    color: "#6b7280",
    justifyContent: "{header_align}",
  }},'''
    
    styles += f'''
  sectionTitle: {{
    fontSize: 13,
    fontWeight: 700,
    color: "{theme_color}",
    marginBottom: 12,
    marginTop: 16,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    {"borderBottom: " + '"1.5px solid ' + theme_color + '33",' if structure['has_timeline'] else ""}
    {"paddingBottom: 8," if structure['has_timeline'] else ""}
  }},
  summary: {{
    fontSize: 10.5,
    lineHeight: 1.8,
    color: "#374151",
    marginBottom: 16,
  }},
  experienceItem: {{
    marginBottom: 16,
    {"paddingLeft: 16," if structure['has_timeline'] else ""}
    {"borderLeft: " + '"2px solid ' + theme_color + '33",' if structure['has_timeline'] else ""}
  }},
  experienceHeader: {{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  }},
  position: {{
    fontSize: 11.5,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 3,
  }},
  company: {{
    fontSize: 10.5,
    fontWeight: 500,
    color: "{theme_color}",
  }},
  dateRange: {{
    fontSize: 9,
    color: "#6b7280",
    textAlign: "right",
  }},
  bulletPoints: {{
    marginTop: 6,
    marginLeft: 12,
  }},
  bulletPoint: {{
    flexDirection: "row",
    marginBottom: 4,
  }},
  bullet: {{
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "{theme_color}",
    marginRight: 8,
    marginTop: 5,
  }},
  bulletText: {{
    flex: 1,
    fontSize: 10,
    lineHeight: 1.7,
    color: "#374151",
  }},
  educationItem: {{
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  }},
  degree: {{
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 3,
  }},
  school: {{
    fontSize: 10,
    color: "#374151",
  }},
  skillsContainer: {{
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  }},
  skillChip: {{
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    border: "1.5px solid {theme_color}33",
    backgroundColor: "{theme_color}15",
  }},
  skillText: {{
    fontSize: 9.5,
    fontWeight: 500,
    color: "#111827",
  }}'''
    
    return styles


def generate_two_column_styles(theme_color, structure):
    """Generate styles for two-column layout"""
    return generate_standard_styles(theme_color, structure)


def generate_sidebar_content(structure):
    """Generate PDF content for sidebar layout"""
    return '''        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.name}>
            <Text>{resumeData.personalInfo.fullName}</Text>
          </View>
          
          {/* Contact Information */}
          <View>
            <Text style={styles.sectionTitle}>Contact</Text>
            {resumeData.personalInfo.email && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.email}</Text>
            )}
            {resumeData.personalInfo.phone && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.phone}</Text>
            )}
            {resumeData.personalInfo.location && (
              <Text style={styles.contactItem}>{resumeData.personalInfo.location}</Text>
            )}
          </View>
          
          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              {resumeData.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>• {skill.name}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <View>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Experience</Text>
              {resumeData.experience.map((exp, index) => {
                const bulletPoints = (exp.description || "")
                  .split("\\n")
                  .map((line) => line.trim())
                  .filter(Boolean);

                return (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={styles.position}>{exp.position}</Text>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.dateRange}>
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </Text>
                    {bulletPoints.length > 0 && (
                      <View style={styles.bulletPoints}>
                        {bulletPoints.map((point, i) => (
                          <View key={i} style={styles.bulletPoint}>
                            <View style={styles.bullet} />
                            <Text style={styles.bulletText}>{point}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Education</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <View>
                    <Text style={styles.degree}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </Text>
                    <Text style={styles.school}>{edu.school}</Text>
                  </View>
                  <Text style={styles.dateRange}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
'''


def generate_standard_content(structure):
    """Generate PDF content for standard layout"""
    has_bg = structure['has_accent_color_background']
    
    if has_bg:
        return '''        {/* Header with background */}
        <View style={styles.headerSection}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
            {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
            {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}
          </View>
        </View>

        <View style={styles.mainContent}>
          {/* Professional Summary */}
          {resumeData.personalInfo.summary && (
            <View>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {resumeData.experience && resumeData.experience.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {resumeData.experience.map((exp, index) => {
                const bulletPoints = (exp.description || "")
                  .split("\\n")
                  .map((line) => line.trim())
                  .filter(Boolean);

                return (
                  <View key={index} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.position}>{exp.position}</Text>
                        <Text style={styles.company}>{exp.company}</Text>
                      </View>
                      <View>
                        <Text style={styles.dateRange}>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </Text>
                      </View>
                    </View>
                    {bulletPoints.length > 0 && (
                      <View style={styles.bulletPoints}>
                        {bulletPoints.map((point, i) => (
                          <View key={i} style={styles.bulletPoint}>
                            <View style={styles.bullet} />
                            <Text style={styles.bulletText}>{point}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Education</Text>
              {resumeData.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.degree}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </Text>
                    <Text style={styles.school}>{edu.school}</Text>
                  </View>
                  <View>
                    <Text style={styles.dateRange}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {resumeData.skills && resumeData.skills.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {resumeData.skills.map((skill, index) => (
                  <View key={index} style={styles.skillChip}>
                    <Text style={styles.skillText}>{skill.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
'''
    else:
        return '''        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
            {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
            {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}
          </View>
        </View>

        {/* Professional Summary */}
        {resumeData.personalInfo.summary && (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {resumeData.experience.map((exp, index) => {
              const bulletPoints = (exp.description || "")
                .split("\\n")
                .map((line) => line.trim())
                .filter(Boolean);

              return (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <View>
                      <Text style={styles.dateRange}>
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </Text>
                    </View>
                  </View>
                  {bulletPoints.length > 0 && (
                    <View style={styles.bulletPoints}>
                      {bulletPoints.map((point, i) => (
                        <View key={i} style={styles.bulletPoint}>
                          <View style={styles.bullet} />
                          <Text style={styles.bulletText}>{point}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.degree}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </Text>
                  <Text style={styles.school}>{edu.school}</Text>
                </View>
                <View>
                  <Text style={styles.dateRange}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.map((skill, index) => (
                <View key={index} style={styles.skillChip}>
                  <Text style={styles.skillText}>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
'''


def generate_two_column_content(structure):
    """Generate PDF content for two-column layout"""
    return generate_standard_content(structure)


def main():
    ui_templates_dir = Path("src/components/resume/templates")
    pdf_templates_dir = Path("src/components/resume/pdf")
    
    print("=" * 80)
    print("ANALYZING UI TEMPLATES AND GENERATING MATCHING PDFs (First 50)")
    print("=" * 80)
    print()
    
    generated = 0
    for i, template_name in enumerate(FIRST_50_TEMPLATES, 1):
        ui_path = ui_templates_dir / f"{template_name}Template.tsx"
        pdf_path = pdf_templates_dir / f"PDF{template_name}Template.tsx"
        
        if not ui_path.exists():
            print(f"[{i:2d}/50] {template_name:35s} | ✗ UI template not found")
            continue
        
        # Read and analyze UI template
        with open(ui_path, 'r') as f:
            ui_content = f.read()
        
        structure = extract_ui_structure(ui_content)
        
        # Generate matching PDF
        pdf_content = generate_matching_pdf(template_name, structure)
        
        # Write PDF template
        with open(pdf_path, 'w') as f:
            f.write(pdf_content)
        
        layout_info = f"{structure['layout_type']:12s} | {structure['header_style']:10s}"
        print(f"[{i:2d}/50] {template_name:35s} | ✓ {layout_info}")
        generated += 1
    
    print()
    print("=" * 80)
    print(f"✅ Successfully generated {generated}/50 matching PDF templates!")
    print("=" * 80)


if __name__ == "__main__":
    main()
