/**
 * Cleanup Custom Sections in Templates
 * 
 * This script removes duplicate custom sections code that was left behind.
 * 
 * Run: node scripts/cleanup-custom-sections.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Templates to update
const TEMPLATES_TO_UPDATE = [
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
  "backend",
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

function cleanupDuplicateCustomSections(content) {
  // Pattern: Look for the old InlineEditableList for sections after CustomSectionsWrapper
  // The pattern starts with {resumeData.sections && resumeData.sections.length > 0 && (
  
  const duplicatePattern = /\s*\{resumeData\.sections && resumeData\.sections\.length > 0 && \(\s*editable \? \(\s*<InlineEditableList[\s\S]*?addButtonLabel="Add Section"[\s\S]*?\)\s*\)\s*\}/g;
  
  const cleaned = content.replace(duplicatePattern, '');
  
  return cleaned;
}

function updateTemplate(templateId) {
  const filePath = getTemplateFilePath(templateId);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${templateId}: File not found`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Check if there's duplicate code
  if (!content.includes('CustomSectionsWrapper') || !content.includes('InlineEditableList')) {
    console.log(`⚠️  ${templateId}: No cleanup needed`);
    return false;
  }
  
  // Cleanup duplicate custom sections
  content = cleanupDuplicateCustomSections(content);
  
  // Check if any changes were made
  if (content === originalContent) {
    console.log(`⚠️  ${templateId}: No changes made`);
    return false;
  }
  
  // Write the updated content
  fs.writeFileSync(filePath, content);
  console.log(`✅ ${templateId}: Cleaned up`);
  
  return true;
}

function main() {
  console.log('\n🧹 Cleaning up Duplicate Custom Sections\n');
  console.log('='.repeat(60));
  
  let updated = 0;
  let skipped = 0;
  
  TEMPLATES_TO_UPDATE.forEach(templateId => {
    try {
      if (updateTemplate(templateId)) {
        updated++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.log(`❌ ${templateId}: Error - ${error.message}`);
      skipped++;
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 COMPLETE');
  console.log('='.repeat(60));
  console.log(`Cleaned: ${updated}`);
  console.log(`Skipped: ${skipped}`);
}

main();
