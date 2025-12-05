/**
 * Auto-Migrate Templates Script
 * 
 * This script automatically migrates templates to use the new shared components.
 * It uses AST-like pattern matching to find and replace code patterns.
 * 
 * Run: node scripts/auto-migrate-templates.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Templates to migrate (from the analysis)
const TEMPLATES_TO_MIGRATE = [
  "fullstack",
  "senior",
  "senior-frontend",
  "senior-backend",
  "software",
  "tech-grid",
  "java-developer",
  "dotnet-developer",
  "devops-engineer",
  "cloud-architect",
  "mobile-developer",
  "react-native-developer",
  "data-engineer",
  "machine-learning-engineer",
  "qa-automation-engineer",
  "security-engineer",
  "python-developer",
  "nodejs-developer",
  "react-developer",
  "go-developer",
];

function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function getTemplateFilePath(templateId) {
  const componentName = toPascalCase(templateId) + 'Template';
  return path.join(TEMPLATES_DIR, `${componentName}.tsx`);
}

// Add new imports to the file
function addImports(content) {
  // Check if imports already exist
  if (content.includes('ExperienceSection')) {
    return content;
  }
  
  // Find the import section and add new imports
  const importLines = [
    'import { ExperienceSection, CustomSectionsWrapper } from "@/components/resume/shared";',
    'import { InlineEducationSection } from "@/components/resume/sections/InlineEducationSection";',
  ];
  
  // Remove InlineEditableList import if exists
  content = content.replace(/import \{ InlineEditableList \} from [^;]+;?\n?/g, '');
  content = content.replace(/,\s*InlineEditableList\s*/g, '');
  content = content.replace(/InlineEditableList,\s*/g, '');
  
  // Find the last import statement
  const importRegex = /^import .+ from .+;$/gm;
  let lastImportMatch;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    lastImportMatch = match;
  }
  
  if (lastImportMatch) {
    const insertPos = lastImportMatch.index + lastImportMatch[0].length;
    content = content.slice(0, insertPos) + '\n' + importLines.join('\n') + content.slice(insertPos);
  }
  
  return content;
}

// Migrate experience section - this is complex, so we'll use a simpler approach
function migrateExperienceSection(content, templateId) {
  // Check if already migrated
  if (content.includes('<ExperienceSection')) {
    return content;
  }
  
  // Find the experience section pattern
  // Look for InlineEditableList with path="experience"
  const experienceListPattern = /<InlineEditableList[\s\S]*?path=["']experience["'][\s\S]*?\/>/;
  
  if (!experienceListPattern.test(content)) {
    console.log(`  ⚠️  No InlineEditableList for experience found`);
    return content;
  }
  
  // Extract the accent color variable name
  const accentMatch = content.match(/const\s+(accent|themeColor|accentColor)\s*=.*?(?:themeColor|#[0-9a-fA-F]+)/);
  const accentVar = accentMatch ? accentMatch[1] : 'themeColor';
  
  // Extract border color variable
  const borderMatch = content.match(/const\s+(accentBorder|borderColor)\s*=/);
  const borderVar = borderMatch ? borderMatch[1] : 'accentBorder';
  
  // Find the section title
  const titleMatch = content.match(/>\s*(Professional Experience|Work Experience|Experience)\s*</);
  const sectionTitle = titleMatch ? titleMatch[1] : 'Professional Experience';
  
  // Create the new ExperienceSection component
  // We'll use a generic replacement that works for most templates
  const newExperienceSection = `<ExperienceSection
          experience={resumeData.experience || []}
          editable={editable}
          accentColor={${accentVar}}
          title="${sectionTitle}"
          className="mb-7"
        />`;
  
  // Replace the entire experience section block
  // This is a simplified replacement - for complex templates, manual review may be needed
  
  // Pattern 1: {editable ? <InlineEditableList ... /> : resumeData.experience.map(...)}
  const pattern1 = /\{editable\s*\?\s*\(\s*<InlineEditableList[\s\S]*?path=["']experience["'][\s\S]*?<\/InlineEditableList>\s*\)\s*:\s*\(?\s*resumeData\.experience\.map[\s\S]*?\)\s*\)?\s*\}/;
  
  if (pattern1.test(content)) {
    content = content.replace(pattern1, newExperienceSection);
    console.log(`  ✅ Replaced experience section (pattern 1)`);
    return content;
  }
  
  // Pattern 2: {editable ? <InlineEditableList ... /> : resumeData.experience.map(...)}
  const pattern2 = /\{editable\s*\?\s*<InlineEditableList[\s\S]*?path=["']experience["'][\s\S]*?addButtonLabel=["'][^"']*["']\s*\/>\s*:\s*resumeData\.experience\.map[\s\S]*?\)\s*\}/;
  
  if (pattern2.test(content)) {
    content = content.replace(pattern2, newExperienceSection);
    console.log(`  ✅ Replaced experience section (pattern 2)`);
    return content;
  }
  
  console.log(`  ⚠️  Could not auto-replace experience section - manual review needed`);
  return content;
}

// Migrate a single template
function migrateTemplate(templateId) {
  const filePath = getTemplateFilePath(templateId);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${templateId}: File not found`);
    return false;
  }
  
  console.log(`\n🔄 Migrating: ${templateId}`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Step 1: Add imports
  content = addImports(content);
  
  // Step 2: Migrate experience section
  content = migrateExperienceSection(content, templateId);
  
  // Check if any changes were made
  if (content === originalContent) {
    console.log(`  ⚠️  No changes made`);
    return false;
  }
  
  // Write the updated content
  fs.writeFileSync(filePath, content);
  console.log(`  ✅ File updated`);
  
  return true;
}

// Main function
function main() {
  console.log('\n🚀 Auto-Migrating Templates\n');
  console.log('='.repeat(60));
  
  let migrated = 0;
  let failed = 0;
  
  TEMPLATES_TO_MIGRATE.forEach(templateId => {
    try {
      if (migrateTemplate(templateId)) {
        migrated++;
      } else {
        failed++;
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      failed++;
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 MIGRATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Migrated: ${migrated}`);
  console.log(`Failed/Skipped: ${failed}`);
  console.log(`\n⚠️  Please review the changes and test each template!`);
}

main();
