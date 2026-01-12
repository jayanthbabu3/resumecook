import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read cleanup report
const reportPath = path.join(__dirname, '../generated/cleanup-report.json');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

const templatesToRemove = report.templatesToRemove;
const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Convert kebab-case ID to PascalCase component name
function idToComponentName(id) {
  // Handle special cases
  const specialCases = {
    'api': 'API',
    'aws': 'AWS',
    'ai': 'AI',
    'ui': 'UI',
    'ux': 'UX',
    'ceo': 'CEO',
    'cpa': 'CPA',
    'cfa': 'CFA',
    'cfo': 'CFO',
    'cto': 'CTO',
    'vp': 'VP',
    'hr': 'HR',
    'it': 'IT',
    'qa': 'QA',
    'pe': 'PE',
    'pmp': 'PMP',
    'esl': 'ESL',
    'faang': 'FAANG',
    'cicd': 'CICD',
    'ml': 'ML',
    'dba': 'DBA',
    'gcp': 'GCP',
    'xd': 'XD',
    'ios': 'iOS',
    '3d': '3D',
    'phd': 'PhD',
    'stem': 'STEM',
    'jamstack': 'JAMStack',
    'graphql': 'GraphQL',
    'mongodb': 'MongoDB',
    'postgresql': 'PostgreSQL',
    'nodejs': 'NodeJS',
    'nextjs': 'NextJS',
    'nestjs': 'NestJS',
    'vuejs': 'VueJS',
    'react-native': 'ReactNative',
    'dotnet': 'DotNet',
    'devops': 'DevOps',
    'devsecops': 'DevSecOps',
    'github': 'GitHub',
    'linkedin': 'LinkedIn',
    'tiktok': 'TikTok',
    'youtube': 'YouTube',
  };
  
  // Split by hyphens and convert each part
  const parts = id.split('-');
  const converted = parts.map((part, index) => {
    // Check if it's a special case
    if (specialCases[part.toLowerCase()]) {
      return specialCases[part.toLowerCase()];
    }
    // Capitalize first letter
    return part.charAt(0).toUpperCase() + part.slice(1);
  });
  
  return converted.join('') + 'Template';
}

// Get template file path
function getTemplateFilePath(templateId) {
  const componentName = idToComponentName(templateId);
  return path.join(TEMPLATES_DIR, `${componentName}.tsx`);
}

// Remove template files
console.log('🗑️  Removing template files...\n');
let removedCount = 0;
let notFoundCount = 0;

for (const templateId of templatesToRemove) {
  const filePath = getTemplateFilePath(templateId);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    removedCount++;
    console.log(`  ✅ Removed: ${path.basename(filePath)}`);
  } else {
    notFoundCount++;
    console.log(`  ⚠️  Not found: ${path.basename(filePath)} (ID: ${templateId})`);
  }
}

console.log(`\n📊 Summary:`);
console.log(`  Files removed: ${removedCount}`);
console.log(`  Files not found: ${notFoundCount}`);
console.log(`  Total templates to remove: ${templatesToRemove.length}`);

// Generate list of component names for reference
const componentNames = templatesToRemove.map(id => idToComponentName(id));
const componentNamesPath = path.join(__dirname, '../generated/removed-components.json');
fs.writeFileSync(componentNamesPath, JSON.stringify(componentNames, null, 2), 'utf8');
console.log(`\n📄 Component names saved to generated/removed-components.json`);

console.log(`\n✅ Template files removal complete!`);
console.log(`\n⚠️  Next steps:`);
console.log(`  1. Update TemplatePreview.tsx, ResumePreview.tsx, EditableResumePreview.tsx, LiveEditor.tsx`);
console.log(`  2. Update generated files (template-ids.ts, template-mapping.ts, template-meta.ts)`);


