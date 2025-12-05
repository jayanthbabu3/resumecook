/**
 * Add Bullet Points to Templates
 * 
 * This script adds the ExperienceBulletPoints component to templates
 * by replacing the description InlineEditableText with ExperienceBulletPoints.
 * 
 * Run: node scripts/add-bullet-points.js
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
  "backend", // Added backend
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

function addImport(content) {
  // Check if import already exists
  if (content.includes('ExperienceBulletPoints')) {
    return content;
  }
  
  // Find the InlineEditableSkills import and add after it
  const skillsImportRegex = /import \{ InlineEditableSkills \} from [^;]+;/;
  const match = content.match(skillsImportRegex);
  
  if (match) {
    const insertPos = match.index + match[0].length;
    const importLine = '\nimport { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";';
    return content.slice(0, insertPos) + importLine + content.slice(insertPos);
  }
  
  // Fallback: add after InlineEditableList import
  const listImportRegex = /import \{ InlineEditableList \} from [^;]+;/;
  const listMatch = content.match(listImportRegex);
  
  if (listMatch) {
    const insertPos = listMatch.index + listMatch[0].length;
    const importLine = '\nimport { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";';
    return content.slice(0, insertPos) + importLine + content.slice(insertPos);
  }
  
  return content;
}

function replaceDescriptionWithBulletPoints(content) {
  // Pattern 1: InlineEditableText for description in editable mode
  // Match: <InlineEditableText path={`experience[${index}].description`} ... />
  const editablePattern = /<InlineEditableText\s+path=\{`experience\[\$\{index\}\]\.description`\}[^>]*value=\{exp\.description\}[^/]*\/>/gs;
  
  content = content.replace(editablePattern, (match) => {
    // Extract style info if present
    const styleMatch = match.match(/className="([^"]+)"/);
    const fontSize = styleMatch && styleMatch[1].includes('12.5px') ? '12.5px' : '13px';
    
    return `<ExperienceBulletPoints
                      experienceId={exp.id}
                      experienceIndex={index}
                      bulletPoints={exp.bulletPoints}
                      description={exp.description}
                      editable={true}
                      accentColor={accent}
                      bulletStyle={{ fontSize: '${fontSize}', color: '#4b5563', lineHeight: '1.7' }}
                    />`;
  });
  
  // Pattern 2: Plain description in non-editable mode
  // Match: <p className="...">{exp.description}</p>
  const readOnlyPattern = /<p\s+className="[^"]*text-\[12\.?5?px\][^"]*">\s*\{exp\.description\}\s*<\/p>/gs;
  
  content = content.replace(readOnlyPattern, (match) => {
    return `<ExperienceBulletPoints
                    experienceId={exp.id}
                    experienceIndex={index}
                    bulletPoints={exp.bulletPoints}
                    description={exp.description}
                    editable={false}
                    bulletStyle={{ fontSize: '12.5px', color: '#4b5563', lineHeight: '1.7' }}
                  />`;
  });
  
  // Pattern 3: Another common pattern for description
  const readOnlyPattern2 = /<p\s+className="[^"]*text-gray-600[^"]*leading-\[1\.7\][^"]*whitespace-pre-wrap[^"]*">\s*\{exp\.description\}\s*<\/p>/gs;
  
  content = content.replace(readOnlyPattern2, (match) => {
    return `<ExperienceBulletPoints
                    experienceId={exp.id}
                    experienceIndex={index}
                    bulletPoints={exp.bulletPoints}
                    description={exp.description}
                    editable={false}
                    bulletStyle={{ fontSize: '12.5px', color: '#4b5563', lineHeight: '1.7' }}
                  />`;
  });
  
  return content;
}

function updateTemplate(templateId) {
  const filePath = getTemplateFilePath(templateId);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${templateId}: File not found`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Step 1: Add import
  content = addImport(content);
  
  // Step 2: Replace description with bullet points
  content = replaceDescriptionWithBulletPoints(content);
  
  // Check if any changes were made
  if (content === originalContent) {
    console.log(`⚠️  ${templateId}: No changes needed or pattern not matched`);
    return false;
  }
  
  // Write the updated content
  fs.writeFileSync(filePath, content);
  console.log(`✅ ${templateId}: Updated`);
  
  return true;
}

function main() {
  console.log('\n🚀 Adding Bullet Points to Templates\n');
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
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`\n✅ Test the templates to verify they work correctly!`);
}

main();
