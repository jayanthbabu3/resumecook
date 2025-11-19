#!/usr/bin/env python3
"""
Improved PDF generation with better layout matching
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

def detect_layout_type(ui_content):
    """More accurate layout detection"""
    # Check for true sidebar layout (30/70 or similar split with bg-gray on one side)
    if re.search(r'className="w-\[(25|30|35)%\][^"]*bg-gray', ui_content):
        return 'sidebar'
    if 'ModernSidebar' in ui_content or 'ProfessionalSidebar' in ui_content or 'SidebarAccent' in ui_content:
        return 'sidebar'
    if 'SidebarProfessionalUniversal' in ui_content:
        return 'sidebar'
    
    # Two column if it has grid-cols-2 or specific two-column patterns
    if 'grid grid-cols-2' in ui_content and 'gap-' in ui_content:
        return 'two-column'
    
    return 'standard'


def get_theme_color(ui_content):
    """Extract theme color from template"""
    match = re.search(r'themeColor\s*=\s*"([#\w]+)"', ui_content)
    return match.group(1) if match else '#0891b2'


def is_centered_header(ui_content):
    """Check if header is centered"""
    # Look for text-center near personalInfo.fullName
    lines = ui_content.split('\n')
    for i, line in enumerate(lines):
        if 'personalInfo.fullName' in line:
            # Check surrounding 10 lines for text-center
            context = '\n'.join(lines[max(0, i-10):min(len(lines), i+10)])
            if 'text-center' in context:
                return True
    return False


def has_colored_header_background(ui_content):
    """Check if header has colored background"""
    lines = ui_content.split('\n')
    for i, line in enumerate(lines):
        if 'personalInfo.fullName' in line:
            context = '\n'.join(lines[max(0, i-15):min(len(lines), i+5)])
            if 'backgroundColor' in context or 'bg-gradient' in context or ('style=' in context and 'background' in context.lower()):
                return True
    return False


def generate_sidebar_pdf(template_name, theme_color):
    """Generate true sidebar PDF layout"""
    return f'''import {{ Document, Page, Text, View, StyleSheet, Font, Link }} from "@react-pdf/renderer";
import {{ ResumeData }} from "@/pages/Editor";

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
  page: {{
    flexDirection: "row",
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    backgroundColor: "#ffffff",
  }},
  sidebar: {{
    width: "30%",
    backgroundColor: "#f9fafb",
    padding: 24,
    paddingTop: 32,
    borderRight: `3px solid ${{themeColor}}`,
  }},
  mainContent: {{
    width: "70%",
    padding: 32,
    paddingTop: 32,
  }},
  sidebarSection: {{
    marginBottom: 20,
  }},
  sidebarTitle: {{
    fontSize: 11,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottom: `2px solid ${{themeColor}}`,
    paddingBottom: 6,
  }},
  sidebarText: {{
    fontSize: 9,
    color: "#374151",
    marginBottom: 6,
    lineHeight: 1.5,
  }},
  name: {{
    fontSize: 24,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 16,
  }},
  sectionTitle: {{
    fontSize: 12,
    fontWeight: 700,
    color: themeColor,
    marginBottom: 12,
    marginTop: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  }},
  summary: {{
    fontSize: 10,
    lineHeight: 1.7,
    color: "#374151",
    marginBottom: 16,
  }},
  experienceItem: {{
    marginBottom: 14,
  }},
  position: {{
    fontSize: 11,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 3,
  }},
  company: {{
    fontSize: 10,
    fontWeight: 500,
    color: themeColor,
    marginBottom: 3,
  }},
  dateRange: {{
    fontSize: 8.5,
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
    backgroundColor: themeColor,
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
    marginBottom: 10,
  }},
  degree: {{
    fontSize: 10,
    fontWeight: 600,
    color: "#111827",
    marginBottom: 2,
  }},
  school: {{
    fontSize: 9,
    color: "#374151",
    marginBottom: 2,
  }},
  educationDate: {{
    fontSize: 8.5,
    color: "#6b7280",
  }},
  skillItem: {{
    fontSize: 9,
    color: "#374151",
    marginBottom: 5,
    paddingLeft: 8,
  }},
}});

export const PDF{template_name} = ({{
  resumeData,
  themeColor = "{theme_color}",
}}: PDF{template_name}Props) => {{
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={{styles.page}}>
        {{/* Sidebar */}}
        <View style={{styles.sidebar}}>
          {{/* Contact */}}
          <View style={{styles.sidebarSection}}>
            <Text style={{styles.sidebarTitle}}>Contact</Text>
            {{resumeData.personalInfo.email && (
              <Text style={{styles.sidebarText}}>{{resumeData.personalInfo.email}}</Text>
            )}}
            {{resumeData.personalInfo.phone && (
              <Text style={{styles.sidebarText}}>{{resumeData.personalInfo.phone}}</Text>
            )}}
            {{resumeData.personalInfo.location && (
              <Text style={{styles.sidebarText}}>{{resumeData.personalInfo.location}}</Text>
            )}}
          </View>

          {{/* Skills */}}
          {{resumeData.skills && resumeData.skills.length > 0 && (
            <View style={{styles.sidebarSection}}>
              <Text style={{styles.sidebarTitle}}>Skills</Text>
              {{resumeData.skills.map((skill, index) => (
                <Text key={{index}} style={{styles.skillItem}}>• {{skill.name}}</Text>
              ))}}
            </View>
          )}}

          {{/* Education */}}
          {{resumeData.education && resumeData.education.length > 0 && (
            <View style={{styles.sidebarSection}}>
              <Text style={{styles.sidebarTitle}}>Education</Text>
              {{resumeData.education.map((edu, index) => (
                <View key={{index}} style={{styles.educationItem}}>
                  <Text style={{styles.degree}}>{{edu.degree}}</Text>
                  {{edu.field && <Text style={{styles.school}}>{{edu.field}}</Text>}}
                  <Text style={{styles.school}}>{{edu.school}}</Text>
                  <Text style={{styles.educationDate}}>
                    {{edu.startDate}} - {{edu.endDate}}
                  </Text>
                </View>
              ))}}
            </View>
          )}}
        </View>

        {{/* Main Content */}}
        <View style={{styles.mainContent}}>
          <Text style={{styles.name}}>{{resumeData.personalInfo.fullName}}</Text>

          {{/* Summary */}}
          {{resumeData.personalInfo.summary && (
            <View>
              <Text style={{styles.sectionTitle}}>Professional Summary</Text>
              <Text style={{styles.summary}}>{{resumeData.personalInfo.summary}}</Text>
            </View>
          )}}

          {{/* Experience */}}
          {{resumeData.experience && resumeData.experience.length > 0 && (
            <View>
              <Text style={{styles.sectionTitle}}>Experience</Text>
              {{resumeData.experience.map((exp, index) => {{
                const bulletPoints = (exp.description || "")
                  .split("\\\\n")
                  .map((line) => line.trim())
                  .filter(Boolean);

                return (
                  <View key={{index}} style={{styles.experienceItem}}>
                    <Text style={{styles.position}}>{{exp.position}}</Text>
                    <Text style={{styles.company}}>{{exp.company}}</Text>
                    <Text style={{styles.dateRange}}>
                      {{exp.startDate}} - {{exp.current ? "Present" : exp.endDate}}
                    </Text>
                    {{bulletPoints.length > 0 && (
                      <View style={{styles.bulletPoints}}>
                        {{bulletPoints.map((point, i) => (
                          <View key={{i}} style={{styles.bulletPoint}}>
                            <View style={{styles.bullet}} />
                            <Text style={{styles.bulletText}}>{{point}}</Text>
                          </View>
                        ))}}
                      </View>
                    )}}
                  </View>
                );
              }})}}
            </View>
          )}}
        </View>
      </Page>
    </Document>
  );
}};
'''


def main():
    ui_templates_dir = Path("src/components/resume/templates")
    pdf_templates_dir = Path("src/components/resume/pdf")
    
    print("=" * 80)
    print("IMPROVING PDF TEMPLATES FOR BETTER UI MATCHING")
    print("=" * 80)
    print()
    
    # Focus on sidebar templates first
    sidebar_templates = []
    
    for template_name in FIRST_50_TEMPLATES:
        ui_path = ui_templates_dir / f"{template_name}Template.tsx"
        
        if not ui_path.exists():
            continue
        
        with open(ui_path, 'r') as f:
            ui_content = f.read()
        
        layout_type = detect_layout_type(ui_content)
        if layout_type == 'sidebar':
            sidebar_templates.append(template_name)
    
    print(f"Found {len(sidebar_templates)} sidebar templates:")
    for name in sidebar_templates:
        print(f"  - {name}")
    print()
    
    print("Regenerating sidebar PDFs with true sidebar layout...")
    print()
    
    for i, template_name in enumerate(sidebar_templates, 1):
        ui_path = ui_templates_dir / f"{template_name}Template.tsx"
        pdf_path = pdf_templates_dir / f"PDF{template_name}Template.tsx"
        
        with open(ui_path, 'r') as f:
            ui_content = f.read()
        
        theme_color = get_theme_color(ui_content)
        pdf_content = generate_sidebar_pdf(template_name, theme_color)
        
        with open(pdf_path, 'w') as f:
            f.write(pdf_content)
        
        print(f"[{i:2d}/{len(sidebar_templates)}] {template_name:35s} | ✓ Sidebar layout")
    
    print()
    print("=" * 80)
    print(f"✅ Improved {len(sidebar_templates)} sidebar PDF templates!")
    print("=" * 80)


if __name__ == "__main__":
    main()
