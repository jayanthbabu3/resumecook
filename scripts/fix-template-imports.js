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

// Files to clean up
const filesToClean = [
  'src/components/TemplatePreview.tsx',
  'src/components/resume/ResumePreview.tsx',
  'src/components/resume/EditableResumePreview.tsx',
  'src/pages/LiveEditor.tsx',
  'src/pages/Hero.tsx',
];

console.log('🧹 Fixing template imports...\n');

for (const filePath of filesToClean) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  let removedCount = 0;
  
  // Remove imports for non-existent templates
  // Match various import patterns:
  // - import { ComponentName } from "./templates/ComponentName";
  // - import { ComponentName } from "./resume/templates/ComponentName";
  // - import { ComponentName } from "@/components/resume/templates/ComponentName";
  const importPatterns = [
    /import\s+\{?\s*(\w+Template)\s*\}?\s+from\s+["']\.\/\.\.?\/?resume\/templates\/(\w+Template)["'];?\n?/g,
    /import\s+\{?\s*(\w+Template)\s*\}?\s+from\s+["']\.\/templates\/(\w+Template)["'];?\n?/g,
    /import\s+\{?\s*(\w+Template)\s*\}?\s+from\s+["']@\/components\/resume\/templates\/(\w+Template)["'];?\n?/g,
  ];
  
  for (const importRegex of importPatterns) {
    content = content.replace(importRegex, (match, componentName, fileName) => {
      if (!existingTemplates.has(componentName)) {
        removedCount++;
        modified = true;
        return ''; // Remove the import
      }
      return match; // Keep the import
    });
  }
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed ${filePath} (removed ${removedCount} invalid imports)`);
  } else {
    console.log(`✓  ${filePath} (no changes needed)`);
  }
}

console.log('\n✅ Template imports fixed!');

