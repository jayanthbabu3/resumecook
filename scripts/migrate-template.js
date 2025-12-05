/**
 * Template Migration Script
 * 
 * This script helps migrate templates to use shared components.
 * It analyzes a template and generates the migrated version.
 * 
 * Usage: node scripts/migrate-template.js <TemplateName>
 * Example: node scripts/migrate-template.js AngularModernUniversalTemplate
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Patterns to detect what the template currently has
const DETECTION_PATTERNS = {
  // Experience section patterns
  hasExperienceMap: /resumeData\.experience\.map/,
  hasInlineExperienceSection: /InlineExperienceSection/,
  
  // Education section patterns
  hasEducationMap: /resumeData\.education\.map/,
  hasInlineEducationSection: /InlineEducationSection/,
  
  // Skills section patterns
  hasSkillsMap: /resumeData\.skills\.map/,
  hasInlineEditableSkills: /InlineEditableSkills/,
  
  // Custom sections patterns
  hasSectionsMap: /resumeData\.sections\.map/,
  hasInlineCustomSections: /InlineCustomSections/,
  
  // Editable components
  hasInlineEditableText: /InlineEditableText/,
  hasInlineEditableDate: /InlineEditableDate/,
  hasInlineEditableList: /InlineEditableList/,
  
  // Style imports
  hasPdfStylesImport: /from ['"]@\/lib\/pdfStyles/,
  hasSINGLE_COLUMN_CONFIG: /SINGLE_COLUMN_CONFIG/,
};

function analyzeTemplate(templateName) {
  const filePath = path.join(TEMPLATES_DIR, `${templateName}.tsx`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`Template not found: ${filePath}`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const analysis = {
    name: templateName,
    path: filePath,
    content,
    
    // What it currently has
    has: {
      experienceMap: DETECTION_PATTERNS.hasExperienceMap.test(content),
      inlineExperienceSection: DETECTION_PATTERNS.hasInlineExperienceSection.test(content),
      educationMap: DETECTION_PATTERNS.hasEducationMap.test(content),
      inlineEducationSection: DETECTION_PATTERNS.hasInlineEducationSection.test(content),
      skillsMap: DETECTION_PATTERNS.hasSkillsMap.test(content),
      inlineEditableSkills: DETECTION_PATTERNS.hasInlineEditableSkills.test(content),
      sectionsMap: DETECTION_PATTERNS.hasSectionsMap.test(content),
      inlineCustomSections: DETECTION_PATTERNS.hasInlineCustomSections.test(content),
      inlineEditableText: DETECTION_PATTERNS.hasInlineEditableText.test(content),
      inlineEditableDate: DETECTION_PATTERNS.hasInlineEditableDate.test(content),
      inlineEditableList: DETECTION_PATTERNS.hasInlineEditableList.test(content),
      pdfStylesImport: DETECTION_PATTERNS.hasPdfStylesImport.test(content),
      singleColumnConfig: DETECTION_PATTERNS.hasSINGLE_COLUMN_CONFIG.test(content),
    },
    
    // What needs to be migrated
    needsMigration: {
      experience: false,
      education: false,
      skills: false,
      sections: false,
    },
  };
  
  // Determine what needs migration
  analysis.needsMigration.experience = analysis.has.experienceMap && !analysis.has.inlineExperienceSection;
  analysis.needsMigration.education = analysis.has.educationMap && !analysis.has.inlineEducationSection;
  analysis.needsMigration.skills = analysis.has.skillsMap && !analysis.has.inlineEditableSkills;
  analysis.needsMigration.sections = analysis.has.sectionsMap && !analysis.has.inlineCustomSections;
  
  return analysis;
}

function generateMigrationGuide(analysis) {
  console.log('\n' + '='.repeat(60));
  console.log(`📋 MIGRATION GUIDE FOR: ${analysis.name}`);
  console.log('='.repeat(60));
  
  console.log('\n📊 CURRENT STATUS:');
  console.log(`  Experience: ${analysis.has.inlineExperienceSection ? '✅ Uses shared component' : '❌ Needs migration'}`);
  console.log(`  Education:  ${analysis.has.inlineEducationSection ? '✅ Uses shared component' : '❌ Needs migration'}`);
  console.log(`  Skills:     ${analysis.has.inlineEditableSkills ? '✅ Uses InlineEditableSkills' : '❌ Needs migration'}`);
  console.log(`  Sections:   ${analysis.has.inlineCustomSections ? '✅ Uses shared component' : '❌ Needs migration'}`);
  
  const needsAnyMigration = Object.values(analysis.needsMigration).some(v => v);
  
  if (!needsAnyMigration) {
    console.log('\n✅ This template is already using shared components!');
    console.log('   No migration needed.');
    return;
  }
  
  console.log('\n📝 MIGRATION STEPS:');
  console.log('-'.repeat(60));
  
  // Step 1: Add imports
  console.log('\n1️⃣ ADD THESE IMPORTS at the top of the file:');
  console.log('```tsx');
  
  const imports = [];
  if (analysis.needsMigration.experience) {
    imports.push('import { InlineExperienceSection } from "@/components/resume/sections/InlineExperienceSection";');
  }
  if (analysis.needsMigration.education) {
    imports.push('import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";');
  }
  if (analysis.needsMigration.skills && !analysis.has.inlineEditableSkills) {
    imports.push('import { InlineEditableSkills } from "@/components/resume/InlineEditableSkills";');
  }
  if (analysis.needsMigration.sections) {
    imports.push('import { InlineCustomSections } from "@/components/resume/sections/InlineCustomSections";');
  }
  if (!analysis.has.pdfStylesImport) {
    imports.push('import { SINGLE_COLUMN_CONFIG } from "@/lib/pdfStyles";');
  }
  
  imports.forEach(i => console.log(i));
  console.log('```');
  
  // Step 2: Replace experience section
  if (analysis.needsMigration.experience) {
    console.log('\n2️⃣ REPLACE EXPERIENCE SECTION:');
    console.log('   Find the code that maps over resumeData.experience and replace with:');
    console.log('```tsx');
    console.log(`<InlineExperienceSection
  items={resumeData.experience}
  editable={editable}
  accentColor={accent}
  title="Professional Experience"
  className="mb-8"
  titleStyle={{
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "1rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: accent
  }}
/>`);
    console.log('```');
  }
  
  // Step 3: Replace education section
  if (analysis.needsMigration.education) {
    console.log('\n3️⃣ REPLACE EDUCATION SECTION:');
    console.log('   Find the code that maps over resumeData.education and replace with:');
    console.log('```tsx');
    console.log(`<InlineEducationSection
  items={resumeData.education}
  editable={editable}
  accentColor={accent}
  title="Education"
  className="mb-8"
  titleStyle={{
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "1rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: accent
  }}
/>`);
    console.log('```');
  }
  
  // Step 4: Replace skills section
  if (analysis.needsMigration.skills) {
    console.log('\n4️⃣ REPLACE SKILLS SECTION:');
    console.log('   Find the code that maps over resumeData.skills and wrap with InlineEditableSkills:');
    console.log('```tsx');
    console.log(`{editable ? (
  <InlineEditableSkills
    path="skills"
    skills={resumeData.skills}
    renderSkill={(skill, index) => (
      <span
        key={index}
        className="px-4 py-1.5 text-[12px] font-medium rounded-md"
        style={{ 
          border: \`1.5px solid \${accentBorder}\`, 
          backgroundColor: accentLight 
        }}
      >
        {skill.name}
      </span>
    )}
  />
) : (
  <div className="flex flex-wrap gap-2">
    {resumeData.skills.map((skill, index) => (
      <span
        key={index}
        className="px-4 py-1.5 text-[12px] font-medium rounded-md"
        style={{ 
          border: \`1.5px solid \${accentBorder}\`, 
          backgroundColor: accentLight 
        }}
      >
        {skill.name}
      </span>
    ))}
  </div>
)}`);
    console.log('```');
  }
  
  // Step 5: Replace custom sections
  if (analysis.needsMigration.sections) {
    console.log('\n5️⃣ REPLACE CUSTOM SECTIONS:');
    console.log('   Find the code that maps over resumeData.sections and replace with:');
    console.log('```tsx');
    console.log(`<InlineCustomSections
  sections={resumeData.sections}
  editable={editable}
  accentColor={accent}
  containerClassName="mb-8"
  itemStyle={{
    fontSize: SINGLE_COLUMN_CONFIG.itemDescription.size,
    lineHeight: SINGLE_COLUMN_CONFIG.itemDescription.lineHeight,
    color: SINGLE_COLUMN_CONFIG.itemDescription.color,
  }}
  renderHeader={(title) => (
    <h2 className="text-[16px] font-bold mb-4 uppercase tracking-wider" style={{ color: accent }}>
      {title}
    </h2>
  )}
/>`);
    console.log('```');
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📌 IMPORTANT NOTES:');
  console.log('='.repeat(60));
  console.log('• Keep your existing visual styles in the renderHeader/renderItem props');
  console.log('• The shared components handle all editing functionality');
  console.log('• Test in Live Editor after migration');
  console.log('• PDF generation will work automatically');
}

// Main
const templateName = process.argv[2];

if (!templateName) {
  console.log('Usage: node scripts/migrate-template.js <TemplateName>');
  console.log('Example: node scripts/migrate-template.js AngularModernUniversalTemplate');
  process.exit(1);
}

const analysis = analyzeTemplate(templateName);
generateMigrationGuide(analysis);
