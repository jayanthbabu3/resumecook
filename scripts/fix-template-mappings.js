import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Get all existing template files
const existingTemplates = new Set();
const templateFiles = fs.readdirSync(TEMPLATES_DIR)
  .filter(f => f.endsWith('Template.tsx'));

templateFiles.forEach(filename => {
  const componentName = filename.replace('.tsx', '');
  existingTemplates.add(componentName);
});

console.log(`📁 Found ${existingTemplates.size} existing template files\n`);

// Files to fix
const filesToFix = [
  'src/pages/LiveEditor.tsx',
  'src/components/resume/ResumePreview.tsx',
  'src/components/resume/EditableResumePreview.tsx',
  'src/components/TemplatePreview.tsx',
];

console.log('🔧 Fixing template mappings...\n');

for (const filePath of filesToFix) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  let removedCount = 0;
  
  // Find and remove template mappings for non-existent templates
  // Match: "template-id": TemplateName,
  const mappingRegex = /"([^"]+)":\s*(\w+Template),?\n?/g;
  
  content = content.replace(mappingRegex, (match, templateId, componentName) => {
    if (!existingTemplates.has(componentName)) {
      removedCount++;
      modified = true;
      // Remove the entire line including any leading/trailing whitespace
      return '';
    }
    return match;
  });
  
  // Clean up multiple consecutive empty lines
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed ${filePath} (removed ${removedCount} invalid mappings)`);
  } else {
    console.log(`✓  ${filePath} (no changes needed)`);
  }
}

console.log('\n✅ Template mappings fixed!');


