/**
 * Generate Template Registry
 * 
 * This script generates the complete template registry by:
 * 1. Reading all template files
 * 2. Extracting the exported component name
 * 3. Generating consistent IDs
 * 4. Creating the necessary code for all mapping files
 * 
 * Run: node scripts/generate-template-registry.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');
const OUTPUT_DIR = path.join(__dirname, '../generated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Convert component name to kebab-case ID
function componentToId(componentName) {
  // Remove "Template" suffix
  let name = componentName.replace(/Template$/, '');
  
  // Handle special cases first
  const specialCases = {
    'API': 'api',
    'AWS': 'aws',
    'AI': 'ai',
    'UI': 'ui',
    'UX': 'ux',
    'CEO': 'ceo',
    'CPA': 'cpa',
    'CFA': 'cfa',
    'CFO': 'cfo',
    'CTO': 'cto',
    'VP': 'vp',
    'HR': 'hr',
    'IT': 'it',
    'QA': 'qa',
    'PE': 'pe',
    'PMP': 'pmp',
    'ESL': 'esl',
    'FAANG': 'faang',
    'CICD': 'cicd',
    'ML': 'ml',
    'DBA': 'dba',
    'GCP': 'gcp',
    'XD': 'xd',
    'iOS': 'ios',
    '3D': '3d',
    'PhD': 'phd',
    'STEM': 'stem',
    'JAMStack': 'jamstack',
    'GraphQL': 'graphql',
    'MongoDB': 'mongodb',
    'PostgreSQL': 'postgresql',
    'NodeJS': 'nodejs',
    'NextJS': 'nextjs',
    'NestJS': 'nestjs',
    'VueJS': 'vuejs',
    'ReactNative': 'react-native',
    'DotNet': 'dotnet',
    'DevOps': 'devops',
    'DevSecOps': 'devsecops',
    'GitHub': 'github',
    'LinkedIn': 'linkedin',
    'TikTok': 'tiktok',
    'YouTube': 'youtube',
  };
  
  // Replace special cases
  Object.entries(specialCases).forEach(([from, to]) => {
    name = name.replace(new RegExp(from, 'g'), `_${to}_`);
  });
  
  // Convert PascalCase to kebab-case
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

// Extract component name from file
function extractComponentName(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Match export const ComponentName or export function ComponentName
  const exportMatch = content.match(/export\s+(?:const|function)\s+(\w+Template)/);
  if (exportMatch) {
    return exportMatch[1];
  }
  
  // Fallback to filename
  return path.basename(filePath, '.tsx');
}

// Get all template files with their info
function getAllTemplates() {
  const files = fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('Template.tsx'))
    .sort();
  
  return files.map(filename => {
    const filePath = path.join(TEMPLATES_DIR, filename);
    const componentName = extractComponentName(filePath);
    const id = componentToId(componentName);
    
    return {
      filename,
      componentName,
      id,
      importPath: `./resume/templates/${componentName}`,
    };
  });
}

// Generate import statements
function generateImports(templates, importPrefix = './resume/templates/') {
  return templates.map(t => 
    `import { ${t.componentName} } from "${importPrefix}${t.componentName}";`
  ).join('\n');
}

// Generate template mapping object
function generateMapping(templates) {
  return templates.map(t => 
    `  "${t.id}": ${t.componentName},`
  ).join('\n');
}

// Generate templateMeta entries
function generateTemplateMeta(templates) {
  return templates.map(t => {
    // Generate a readable name from the component name
    const name = t.componentName
      .replace(/Template$/, '')
      .replace(/([A-Z])/g, ' $1')
      .trim();
    
    return `  "${t.id}": {
    name: "${name}",
    description: "Professional resume template",
    category: "Universal",
    categorySlug: "all",
  },`;
  }).join('\n');
}

// Generate templateIds array for professionCategories
function generateTemplateIds(templates) {
  return templates.map(t => `      "${t.id}",`).join('\n');
}

function main() {
  console.log('🔍 Scanning template files...\n');
  
  const templates = getAllTemplates();
  console.log(`📁 Found ${templates.length} templates\n`);
  
  // Generate all the code
  const imports = generateImports(templates);
  const mapping = generateMapping(templates);
  const meta = generateTemplateMeta(templates);
  const ids = generateTemplateIds(templates);
  
  // Write to files
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'template-imports.ts'),
    `// Auto-generated template imports\n// Total: ${templates.length} templates\n\n${imports}`
  );
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'template-mapping.ts'),
    `// Auto-generated template mapping\n// Total: ${templates.length} templates\n\nconst templates = {\n${mapping}\n};`
  );
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'template-meta.ts'),
    `// Auto-generated template meta\n// Total: ${templates.length} templates\n\nexport const templateMetaMap = {\n${meta}\n};`
  );
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'template-ids.ts'),
    `// Auto-generated template IDs for professionCategories\n// Total: ${templates.length} templates\n\nconst templateIds = [\n${ids}\n];`
  );
  
  // Write JSON for reference
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'templates.json'),
    JSON.stringify(templates, null, 2)
  );
  
  console.log('✅ Generated files in /generated folder:');
  console.log('   - template-imports.ts');
  console.log('   - template-mapping.ts');
  console.log('   - template-meta.ts');
  console.log('   - template-ids.ts');
  console.log('   - templates.json');
  
  // Show sample
  console.log('\n📋 Sample entries:');
  templates.slice(0, 5).forEach(t => {
    console.log(`   ${t.componentName} -> "${t.id}"`);
  });
  
  console.log(`\n✅ Total templates: ${templates.length}`);
}

main();
