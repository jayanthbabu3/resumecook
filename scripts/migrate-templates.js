/**
 * Template Migration Script
 * 
 * This script migrates templates to use the new shared components:
 * - ExperienceSection (with bullet points)
 * - InlineEducationSection
 * - CustomSectionsWrapper
 * 
 * Run: node scripts/migrate-templates.js [category]
 * Example: node scripts/migrate-templates.js software-technology
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Software category template IDs
const SOFTWARE_TEMPLATES = [
  "frontend",
  "backend",
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
  "kubernetes-engineer",
];

// Convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Check if template uses InlineEditableList for experience
function usesInlineEditableList(content) {
  return content.includes('InlineEditableList') && 
         (content.includes('path="experience"') || content.includes("path='experience'"));
}

// Check if template already uses ExperienceSection
function usesExperienceSection(content) {
  return content.includes('ExperienceSection') || content.includes('from "@/components/resume/shared"');
}

// Check if template uses InlineEducationSection
function usesInlineEducationSection(content) {
  return content.includes('InlineEducationSection');
}

// Check if template uses CustomSectionsWrapper
function usesCustomSectionsWrapper(content) {
  return content.includes('CustomSectionsWrapper');
}

// Analyze a template file
function analyzeTemplate(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath);
  
  return {
    filename,
    filePath,
    hasExperienceSection: content.includes('experience') && content.includes('Experience'),
    hasEducationSection: content.includes('education') && content.includes('Education'),
    hasCustomSections: content.includes('sections') && (content.includes('Custom') || content.includes('section.title')),
    usesInlineEditableList: usesInlineEditableList(content),
    usesExperienceSection: usesExperienceSection(content),
    usesInlineEducationSection: usesInlineEducationSection(content),
    usesCustomSectionsWrapper: usesCustomSectionsWrapper(content),
    needsMigration: usesInlineEditableList(content) && !usesExperienceSection(content),
    lineCount: content.split('\n').length,
  };
}

// Get template file path from ID
function getTemplateFilePath(templateId) {
  const componentName = toPascalCase(templateId) + 'Template';
  const filePath = path.join(TEMPLATES_DIR, `${componentName}.tsx`);
  
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  return null;
}

// Main function
function main() {
  const category = process.argv[2] || 'software-technology';
  
  console.log(`\n🔍 Analyzing templates in category: ${category}\n`);
  console.log('='.repeat(70));
  
  const templates = SOFTWARE_TEMPLATES;
  const results = {
    total: 0,
    found: 0,
    needsMigration: 0,
    alreadyMigrated: 0,
    notFound: [],
    needsMigrationList: [],
    alreadyMigratedList: [],
  };
  
  templates.forEach(templateId => {
    results.total++;
    const filePath = getTemplateFilePath(templateId);
    
    if (!filePath) {
      results.notFound.push(templateId);
      console.log(`❌ ${templateId}: File not found`);
      return;
    }
    
    results.found++;
    const analysis = analyzeTemplate(filePath);
    
    if (analysis.usesExperienceSection) {
      results.alreadyMigrated++;
      results.alreadyMigratedList.push(templateId);
      console.log(`✅ ${templateId}: Already migrated`);
    } else if (analysis.needsMigration) {
      results.needsMigration++;
      results.needsMigrationList.push({
        id: templateId,
        filePath,
        ...analysis
      });
      console.log(`🔄 ${templateId}: Needs migration (uses InlineEditableList)`);
    } else {
      console.log(`⚠️  ${templateId}: Manual review needed`);
    }
  });
  
  console.log('\n' + '='.repeat(70));
  console.log('📊 SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total templates: ${results.total}`);
  console.log(`Found: ${results.found}`);
  console.log(`Already migrated: ${results.alreadyMigrated}`);
  console.log(`Needs migration: ${results.needsMigration}`);
  console.log(`Not found: ${results.notFound.length}`);
  
  if (results.needsMigrationList.length > 0) {
    console.log('\n📝 Templates needing migration:');
    results.needsMigrationList.forEach(t => {
      console.log(`   - ${t.id} (${t.lineCount} lines)`);
    });
  }
  
  // Save results to file
  const reportPath = path.join(__dirname, '../generated/migration-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Report saved to: ${reportPath}`);
  
  return results;
}

main();
