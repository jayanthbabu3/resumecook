#!/usr/bin/env python3
"""
Generate matching PDFs for ALL 943 templates
"""
import re
from pathlib import Path
from typing import Dict, List

def get_all_ui_templates():
    """Get list of all UI template files"""
    ui_dir = Path("src/components/resume/templates")
    templates = []
    for file in sorted(ui_dir.glob("*.tsx")):
        # Extract template name without "Template.tsx"
        name = file.stem.replace("Template", "")
        if name and name != "ProfilePhoto":  # Skip ProfilePhoto helper
            templates.append(name)
    return templates


def analyze_template_structure(ui_content: str, template_name: str) -> Dict:
    """Analyze UI template and extract structure information"""
    structure = {
        'layout': 'standard',  # standard, sidebar, two-column, grid
        'header_alignment': 'left',  # left, center
        'header_size': 'large',  # small, medium, large, xl
        'has_colored_bg': False,
        'has_timeline': False,
        'has_border': False,
        'theme_color': '#0891b2',
        'is_minimal': False,
        'is_artistic': False,
    }
    
    # Extract theme color
    theme_match = re.search(r'themeColor\s*=\s*"([#\w]+)"', ui_content)
    if theme_match:
        structure['theme_color'] = theme_match.group(1)
    
    # Detect sidebar layout - must have clear sidebar structure
    if re.search(r'className="w-\[(25|30|35)%\][^"]*(?:bg-gray|bg-slate)', ui_content):
        structure['layout'] = 'sidebar'
    elif 'Sidebar' in template_name and 'flex' in ui_content[:2000]:
        structure['layout'] = 'sidebar'
    
    # Detect two-column grid layout
    elif re.search(r'grid\s+grid-cols-2', ui_content):
        structure['layout'] = 'two-column'
    
    # Detect centered header
    header_section = ui_content[:3000]  # Check first 3000 chars
    if 'personalInfo.fullName' in header_section:
        if 'text-center' in header_section or 'justify-center' in header_section:
            structure['header_alignment'] = 'center'
    
    # Detect header size
    if 'text-[36px]' in header_section or 'text-[40px]' in header_section:
        structure['header_size'] = 'xl'
    elif 'text-[32px]' in header_section or 'text-[34px]' in header_section:
        structure['header_size'] = 'large'
    elif 'text-[28px]' in header_section or 'text-[30px]' in header_section:
        structure['header_size'] = 'medium'
    elif 'text-[24px]' in header_section or 'text-[22px]' in header_section:
        structure['header_size'] = 'small'
    
    # Detect colored background header
    if 'backgroundColor' in header_section or ('bg-gradient' in header_section and 'personalInfo.fullName' in header_section):
        structure['has_colored_bg'] = True
    
    # Detect timeline style
    if 'timeline' in template_name.lower() or 'border-l-' in ui_content:
        structure['has_timeline'] = True
    
    # Detect border/frame
    if re.search(r'border-[2-4]', ui_content[:2000]):
        structure['has_border'] = True
    
    # Detect minimal style
    if 'minimal' in template_name.lower() or 'clean' in template_name.lower():
        structure['is_minimal'] = True
    
    # Detect artistic style
    if any(word in template_name.lower() for word in ['artistic', 'bold', 'creative', 'modern', 'elegant']):
        structure['is_artistic'] = True
    
    return structure


def generate_sidebar_pdf(template_name: str, theme_color: str) -> str:
    """Generate sidebar layout PDF"""
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
        <View style={{styles.sidebar}}>
          <View style={{styles.sidebarSection}}>
            <Text style={{styles.sidebarTitle}}>Contact</Text>
            {{resumeData.personalInfo.email && <Text style={{styles.sidebarText}}>{{resumeData.personalInfo.email}}</Text>}}
            {{resumeData.personalInfo.phone && <Text style={{styles.sidebarText}}>{{resumeData.personalInfo.phone}}</Text>}}
            {{resumeData.personalInfo.location && <Text style={{styles.sidebarText}}>{{resumeData.personalInfo.location}}</Text>}}
          </View>
          {{resumeData.skills && resumeData.skills.length > 0 && (
            <View style={{styles.sidebarSection}}>
              <Text style={{styles.sidebarTitle}}>Skills</Text>
              {{resumeData.skills.map((skill, index) => (
                <Text key={{index}} style={{styles.skillItem}}>• {{skill.name}}</Text>
              ))}}
            </View>
          )}}
          {{resumeData.education && resumeData.education.length > 0 && (
            <View style={{styles.sidebarSection}}>
              <Text style={{styles.sidebarTitle}}>Education</Text>
              {{resumeData.education.map((edu, index) => (
                <View key={{index}} style={{styles.educationItem}}>
                  <Text style={{styles.degree}}>{{edu.degree}}</Text>
                  {{edu.field && <Text style={{styles.school}}>{{edu.field}}</Text>}}
                  <Text style={{styles.school}}>{{edu.school}}</Text>
                  <Text style={{styles.educationDate}}>{{edu.startDate}} - {{edu.endDate}}</Text>
                </View>
              ))}}
            </View>
          )}}
        </View>
        <View style={{styles.mainContent}}>
          <Text style={{styles.name}}>{{resumeData.personalInfo.fullName}}</Text>
          {{resumeData.personalInfo.summary && (
            <View>
              <Text style={{styles.sectionTitle}}>Professional Summary</Text>
              <Text style={{styles.summary}}>{{resumeData.personalInfo.summary}}</Text>
            </View>
          )}}
          {{resumeData.experience && resumeData.experience.length > 0 && (
            <View>
              <Text style={{styles.sectionTitle}}>Experience</Text>
              {{resumeData.experience.map((exp, index) => {{
                const bulletPoints = (exp.description || "").split("\\\\n").map((line) => line.trim()).filter(Boolean);
                return (
                  <View key={{index}} style={{styles.experienceItem}}>
                    <Text style={{styles.position}}>{{exp.position}}</Text>
                    <Text style={{styles.company}}>{{exp.company}}</Text>
                    <Text style={{styles.dateRange}}>{{exp.startDate}} - {{exp.current ? "Present" : exp.endDate}}</Text>
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


def generate_standard_pdf(template_name: str, structure: Dict) -> str:
    """Generate standard layout PDF with customizations"""
    theme_color = structure['theme_color']
    header_align = structure['header_alignment']
    
    # Calculate font sizes based on header size
    name_size = {
        'small': 22,
        'medium': 26,
        'large': 28,
        'xl': 32
    }.get(structure['header_size'], 28)
    
    has_border = structure['has_border']
    has_bg = structure['has_colored_bg']
    has_timeline = structure['has_timeline']
    
    # Build styles
    page_padding = "0" if has_bg else "40"
    
    styles_code = f'''  page: {{
    padding: {page_padding},
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.6,
    color: "#1f2937",
    backgroundColor: "#ffffff",
  }},'''
    
    if has_bg:
        styles_code += f'''
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
        border_style = f'borderBottom: "2px solid {theme_color}",' if has_border else ''
        styles_code += f'''
  header: {{
    marginBottom: 24,
    paddingBottom: {"20" if has_border else "16"},
    {border_style}
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
    
    timeline_styles = ''
    if has_timeline:
        timeline_styles = f'''borderLeft: "2px solid {theme_color}33",
    paddingLeft: 16,'''
    
    styles_code += f'''
  sectionTitle: {{
    fontSize: 13,
    fontWeight: 700,
    color: "{theme_color}",
    marginBottom: 12,
    marginTop: 16,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  }},
  summary: {{
    fontSize: 10.5,
    lineHeight: 1.8,
    color: "#374151",
    marginBottom: 16,
  }},
  experienceItem: {{
    marginBottom: 16,
    {timeline_styles}
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
    
    # Build content
    if has_bg:
        content = '''        <View style={styles.headerSection}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
            {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
            {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}
          </View>
        </View>
        <View style={styles.mainContent}>'''
    else:
        content = '''        <View style={styles.header}>
          <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && <Text>{resumeData.personalInfo.email}</Text>}
            {resumeData.personalInfo.phone && <Text>{resumeData.personalInfo.phone}</Text>}
            {resumeData.personalInfo.location && <Text>{resumeData.personalInfo.location}</Text>}
          </View>
        </View>'''
    
    content += '''
        {resumeData.personalInfo.summary && (
          <View>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summary}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {resumeData.experience.map((exp, index) => {
              const bulletPoints = (exp.description || "").split("\\n").map((line) => line.trim()).filter(Boolean);
              return (
                <View key={index} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.position}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <View>
                      <Text style={styles.dateRange}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
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
        {resumeData.education && resumeData.education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.degree}>{edu.degree} {edu.field && `in ${edu.field}`}</Text>
                  <Text style={styles.school}>{edu.school}</Text>
                </View>
                <View>
                  <Text style={styles.dateRange}>{edu.startDate} - {edu.endDate}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
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
        )}'''
    
    if has_bg:
        content += '\n        </View>'
    
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
{styles_code}
}});

export const PDF{template_name} = ({{
  resumeData,
  themeColor = "{theme_color}",
}}: PDF{template_name}Props) => {{
  const styles = createStyles(themeColor);

  return (
    <Document>
      <Page size="A4" style={{styles.page}}>
{content}
      </Page>
    </Document>
  );
}};
'''


def main():
    ui_dir = Path("src/components/resume/templates")
    pdf_dir = Path("src/components/resume/pdf")
    
    print("=" * 80)
    print("GENERATING MATCHING PDFs FOR ALL 943 TEMPLATES")
    print("=" * 80)
    print()
    
    # Get all templates
    all_templates = get_all_ui_templates()
    total = len(all_templates)
    
    print(f"Found {total} UI templates")
    print()
    
    # Track statistics
    stats = {
        'sidebar': 0,
        'two-column': 0,
        'standard': 0,
        'centered': 0,
        'colored_bg': 0,
        'timeline': 0,
    }
    
    generated = 0
    errors = []
    
    for i, template_name in enumerate(all_templates, 1):
        ui_path = ui_dir / f"{template_name}Template.tsx"
        pdf_path = pdf_dir / f"PDF{template_name}Template.tsx"
        
        if not ui_path.exists():
            errors.append(f"{template_name}: UI file not found")
            continue
        
        try:
            # Read and analyze UI template
            with open(ui_path, 'r', encoding='utf-8') as f:
                ui_content = f.read()
            
            structure = analyze_template_structure(ui_content, template_name)
            
            # Generate appropriate PDF
            if structure['layout'] == 'sidebar':
                pdf_content = generate_sidebar_pdf(template_name, structure['theme_color'])
                stats['sidebar'] += 1
            else:
                pdf_content = generate_standard_pdf(template_name, structure)
                if structure['layout'] == 'two-column':
                    stats['two-column'] += 1
                else:
                    stats['standard'] += 1
            
            # Track other features
            if structure['header_alignment'] == 'center':
                stats['centered'] += 1
            if structure['has_colored_bg']:
                stats['colored_bg'] += 1
            if structure['has_timeline']:
                stats['timeline'] += 1
            
            # Write PDF
            with open(pdf_path, 'w', encoding='utf-8') as f:
                f.write(pdf_content)
            
            generated += 1
            
            # Progress indicator
            if i % 50 == 0:
                print(f"[{i:4d}/{total}] Processed {i} templates...")
            
        except Exception as e:
            errors.append(f"{template_name}: {str(e)}")
    
    print()
    print("=" * 80)
    print(f"✅ Successfully generated {generated}/{total} matching PDF templates!")
    print("=" * 80)
    print()
    print("STATISTICS:")
    print(f"  Sidebar layouts:        {stats['sidebar']}")
    print(f"  Two-column layouts:     {stats['two-column']}")
    print(f"  Standard layouts:       {stats['standard']}")
    print(f"  Centered headers:       {stats['centered']}")
    print(f"  Colored backgrounds:    {stats['colored_bg']}")
    print(f"  Timeline styles:        {stats['timeline']}")
    print()
    
    if errors:
        print(f"ERRORS ({len(errors)}):")
        for error in errors[:10]:  # Show first 10 errors
            print(f"  - {error}")
        if len(errors) > 10:
            print(f"  ... and {len(errors) - 10} more")


if __name__ == "__main__":
    main()
