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

// Files to check
const filesToCheck = [
  'src/pages/LiveEditor.tsx',
  'src/components/resume/ResumePreview.tsx',
  'src/components/resume/EditableResumePreview.tsx',
  'src/components/TemplatePreview.tsx',
];

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

console.log('🔍 Checking for invalid template mappings...\n');

let hasErrors = false;

for (const filePath of filesToCheck) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) {
    continue;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  
  // Find template mappings like: "template-id": TemplateName,
  const mappingRegex = /"([^"]+)":\s*(\w+Template),?\n?/g;
  const errors = [];
  
  let match;
  while ((match = mappingRegex.exec(content)) !== null) {
    const templateId = match[1];
    const componentName = match[2];
    
    if (!existingTemplates.has(componentName)) {
      errors.push({ templateId, componentName, line: content.substring(0, match.index).split('\n').length });
    }
  }
  
  if (errors.length > 0) {
    hasErrors = true;
    console.log(`❌ ${filePath}:`);
    errors.forEach(({ templateId, componentName, line }) => {
      console.log(`   Line ${line}: "${templateId}": ${componentName} (component not found)`);
    });
    console.log('');
  }
}

if (!hasErrors) {
  console.log('✅ All template mappings are valid!');
} else {
  console.log('⚠️  Found invalid template mappings. Please fix them.');
  process.exit(1);
}


