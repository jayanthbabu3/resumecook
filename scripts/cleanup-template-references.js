import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read cleanup report to get templates to keep
const reportPath = path.join(__dirname, '../generated/cleanup-report.json');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

const templatesToKeep = new Set(report.templatesToKeep);
const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Convert component name to kebab-case ID
function componentToId(componentName) {
  let name = componentName.replace(/Template$/, '');
  
  const specialCases = {
    'API': 'api', 'AWS': 'aws', 'AI': 'ai', 'UI': 'ui', 'UX': 'ux',
    'CEO': 'ceo', 'CPA': 'cpa', 'CFA': 'cfa', 'CFO': 'cfo', 'CTO': 'cto',
    'VP': 'vp', 'HR': 'hr', 'IT': 'it', 'QA': 'qa', 'PE': 'pe', 'PMP': 'pmp',
    'ESL': 'esl', 'FAANG': 'faang', 'CICD': 'cicd', 'ML': 'ml', 'DBA': 'dba',
    'GCP': 'gcp', 'XD': 'xd', 'iOS': 'ios', '3D': '3d', 'PhD': 'phd',
    'STEM': 'stem', 'JAMStack': 'jamstack', 'GraphQL': 'graphql',
    'MongoDB': 'mongodb', 'PostgreSQL': 'postgresql', 'NodeJS': 'nodejs',
    'NextJS': 'nextjs', 'NestJS': 'nestjs', 'VueJS': 'vuejs',
    'ReactNative': 'react-native', 'DotNet': 'dotnet', 'DevOps': 'devops',
    'DevSecOps': 'devsecops', 'GitHub': 'github', 'LinkedIn': 'linkedin',
    'TikTok': 'tiktok', 'YouTube': 'youtube',
  };
  
  Object.entries(specialCases).forEach(([from, to]) => {
    name = name.replace(new RegExp(from, 'g'), `_${to}_`);
  });
  
  let result = name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
    .replace(/--+/g, '-')
    .replace(/_-/g, '-')
    .replace(/-_/g, '-')
    .replace(/_/g, '');
  
  return result;
}

// Get all existing template files
const existingTemplates = new Set();
const templateFiles = fs.readdirSync(TEMPLATES_DIR)
  .filter(f => f.endsWith('Template.tsx'));

templateFiles.forEach(filename => {
  const componentName = filename.replace('.tsx', '');
  const templateId = componentToId(componentName);
  existingTemplates.add(componentName);
  templatesToKeep.add(templateId);
});

// Files to clean up
const filesToClean = [
  'src/components/TemplatePreview.tsx',
  'src/components/resume/ResumePreview.tsx',
  'src/components/resume/EditableResumePreview.tsx',
  'src/pages/LiveEditor.tsx',
];

console.log('🧹 Cleaning up template references...\n');

for (const filePath of filesToClean) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  
  // Remove imports for non-existent templates
  const importRegex = /import\s+\{?\s*(\w+Template)\s*\}?\s+from\s+["']\.\/resume\/templates\/(\w+Template)["'];?\n?/g;
  const removedImports = [];
  
  content = content.replace(importRegex, (match, componentName, fileName) => {
    if (!existingTemplates.has(componentName)) {
      removedImports.push(componentName);
      modified = true;
      return ''; // Remove the import
    }
    return match; // Keep the import
  });
  
  // Remove template mappings for non-existent templates
  // Look for patterns like: "template-id": TemplateName,
  const mappingRegex = /"([^"]+)":\s*(\w+Template),?\n?/g;
  const removedMappings = [];
  
  content = content.replace(mappingRegex, (match, templateId, componentName) => {
    if (!templatesToKeep.has(templateId) || !existingTemplates.has(componentName)) {
      removedMappings.push({ templateId, componentName });
      modified = true;
      return ''; // Remove the mapping
    }
    return match; // Keep the mapping
  });
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Cleaned ${filePath}`);
    if (removedImports.length > 0) {
      console.log(`   Removed ${removedImports.length} imports`);
    }
    if (removedMappings.length > 0) {
      console.log(`   Removed ${removedMappings.length} mappings`);
    }
  } else {
    console.log(`✓  ${filePath} (no changes needed)`);
  }
}

console.log('\n✅ Template references cleanup complete!');


