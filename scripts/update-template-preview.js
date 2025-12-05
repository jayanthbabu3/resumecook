/**
 * Update TemplatePreview.tsx
 * 
 * This script updates the TemplatePreview.tsx to include all 903 templates.
 * It generates the import statements and mapping object.
 * 
 * Run: node scripts/update-template-preview.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the generated templates
const templatesPath = path.join(__dirname, '../generated/templates.json');
const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));

// Read existing TemplatePreview.tsx
const templatePreviewPath = path.join(__dirname, '../src/components/TemplatePreview.tsx');
const existingContent = fs.readFileSync(templatePreviewPath, 'utf-8');

// Extract existing imports to preserve any special handling
function getExistingImports(content) {
  const imports = new Set();
  const regex = /import\s*\{\s*(\w+)\s*\}\s*from\s*["']\.\/resume\/templates\/\w+["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    imports.add(match[1]);
  }
  return imports;
}

function main() {
  console.log('📊 Updating TemplatePreview.tsx...\n');
  
  const existingImports = getExistingImports(existingContent);
  console.log(`📋 Found ${existingImports.size} existing imports`);
  console.log(`📁 Need ${templates.length} templates\n`);
  
  // Generate imports
  const imports = templates.map(t => 
    `import { ${t.componentName} } from "./resume/templates/${t.componentName}";`
  ).join('\n');
  
  // Generate mapping
  const mapping = templates.map(t => 
    `  "${t.id}": ${t.componentName},`
  ).join('\n');
  
  // Find the start of imports (after React imports)
  const reactImportEnd = existingContent.indexOf('import { InlineEditProvider }');
  if (reactImportEnd === -1) {
    console.error('❌ Could not find InlineEditProvider import');
    return;
  }
  
  // Find where the template imports start
  const templateImportStart = existingContent.indexOf('import { ProfessionalTemplate }');
  if (templateImportStart === -1) {
    console.error('❌ Could not find first template import');
    return;
  }
  
  // Find where the template imports end (before interface or const)
  const interfaceStart = existingContent.indexOf('interface TemplatePreviewProps');
  if (interfaceStart === -1) {
    console.error('❌ Could not find TemplatePreviewProps interface');
    return;
  }
  
  // Find the templates mapping object
  const templatesObjStart = existingContent.indexOf('const templates = {');
  if (templatesObjStart === -1) {
    console.error('❌ Could not find templates object');
    return;
  }
  
  // Find the end of templates object
  let bracketCount = 0;
  let templatesObjEnd = -1;
  let foundStart = false;
  for (let i = templatesObjStart; i < existingContent.length; i++) {
    if (existingContent[i] === '{') {
      bracketCount++;
      foundStart = true;
    }
    if (existingContent[i] === '}') {
      bracketCount--;
      if (foundStart && bracketCount === 0) {
        templatesObjEnd = i + 1;
        break;
      }
    }
  }
  
  if (templatesObjEnd === -1) {
    console.error('❌ Could not find end of templates object');
    return;
  }
  
  // Build new content
  // Part 1: Everything before template imports
  const part1 = existingContent.substring(0, templateImportStart);
  
  // Part 2: New imports
  const part2 = imports + '\n\n';
  
  // Part 3: Everything from interface to templates object
  const part3 = existingContent.substring(interfaceStart, templatesObjStart);
  
  // Part 4: New templates object
  const part4 = `const templates = {\n${mapping}\n}`;
  
  // Part 5: Everything after templates object
  const part5 = existingContent.substring(templatesObjEnd);
  
  const newContent = part1 + part2 + part3 + part4 + part5;
  
  // Write the updated file
  fs.writeFileSync(templatePreviewPath, newContent);
  
  console.log(`✅ Updated ${templatePreviewPath}`);
  console.log(`   Now has ${templates.length} template imports and mappings`);
  
  // Verify
  const verifyContent = fs.readFileSync(templatePreviewPath, 'utf-8');
  const importCount = (verifyContent.match(/import \{ \w+Template \} from/g) || []).length;
  const mappingCount = (verifyContent.match(/"[a-z0-9-]+": \w+Template,/g) || []).length;
  console.log(`   Verified: ${importCount} imports, ${mappingCount} mappings`);
}

main();
