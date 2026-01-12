/**
 * Fix Custom Sections in Templates
 * 
 * This script updates templates to use CustomSectionsWrapper
 * instead of InlineEditableList for custom sections.
 * 
 * Run: node scripts/fix-custom-sections.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Templates to update
const TEMPLATES_TO_UPDATE = [
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

function addCustomSectionsImport(content) {
  // Check if import already exists
  if (content.includes('CustomSectionsWrapper')) {
    return content;
  }
  
  // Add the import after ExperienceBulletPoints import
  const bulletImportRegex = /import \{ ExperienceBulletPoints \} from [^;]+;/;
  const match = content.match(bulletImportRegex);
  
  if (match) {
    const insertPos = match.index + match[0].length;
    const importLine = '\nimport { CustomSectionsWrapper } from "@/components/resume/shared";';
    return content.slice(0, insertPos) + importLine + content.slice(insertPos);
  }
  
  // Fallback: add after InlineEditableSkills import
  const skillsImportRegex = /import \{ InlineEditableSkills \} from [^;]+;/;
  const skillsMatch = content.match(skillsImportRegex);
  
  if (skillsMatch) {
    const insertPos = skillsMatch.index + skillsMatch[0].length;
    const importLine = '\nimport { CustomSectionsWrapper } from "@/components/resume/shared";';
    return content.slice(0, insertPos) + importLine + content.slice(insertPos);
  }
  
  return content;
}

function replaceCustomSections(content, templateId) {
  // Find the accent variable name
  const accentMatch = content.match(/const\s+(accent|themeColor|accentColor)\s*=/);
  const accentVar = accentMatch ? accentMatch[1] : 'accent';
  
  // Pattern to match the entire custom sections block
  // This is complex because the block spans multiple lines
  
  // Look for the custom sections pattern
  const customSectionsStart = content.indexOf('{/* Custom Sections */}');
  if (customSectionsStart === -1) {
    console.log(`  ⚠️  No custom sections found`);
    return content;
  }
  
  // Find the end of the custom sections block
  // We need to find the matching closing tag
  let depth = 0;
  let endPos = customSectionsStart;
  let foundStart = false;
  
  for (let i = customSectionsStart; i < content.length; i++) {
    if (content[i] === '{' && content[i-1] !== '\\') {
      depth++;
      foundStart = true;
    }
    if (content[i] === '}' && content[i-1] !== '\\') {
      depth--;
      if (foundStart && depth === 0) {
        endPos = i + 1;
        break;
      }
    }
  }
  
  // Extract the custom sections block
  const customSectionsBlock = content.slice(customSectionsStart, endPos);
  
  // Create the new CustomSectionsWrapper component
  const newCustomSections = `{/* Custom Sections */}
        <CustomSectionsWrapper
          sections={resumeData.sections || []}
          editable={editable}
          accentColor={${accentVar}}
          titleStyle={{ 
            fontSize: '13px', 
            fontWeight: 600, 
            color: ${accentVar},
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            paddingBottom: '8px',
            marginBottom: '12px',
            borderBottom: \`1px solid \${${accentVar}}\`
          }}
          itemStyle={{ 
            fontSize: '12.5px', 
            color: '#374151', 
            lineHeight: '1.7' 
          }}
          sectionStyle={{ marginBottom: '28px' }}
        />`;
  
  // Replace the old block with the new one
  content = content.slice(0, customSectionsStart) + newCustomSections + content.slice(endPos);
  
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
  content = addCustomSectionsImport(content);
  
  // Step 2: Replace custom sections
  content = replaceCustomSections(content, templateId);
  
  // Check if any changes were made
  if (content === originalContent) {
    console.log(`⚠️  ${templateId}: No changes made`);
    return false;
  }
  
  // Write the updated content
  fs.writeFileSync(filePath, content);
  console.log(`✅ ${templateId}: Updated`);
  
  return true;
}

function main() {
  console.log('\n🚀 Fixing Custom Sections in Templates\n');
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
}

main();
