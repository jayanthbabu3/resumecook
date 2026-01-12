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

// Read professionCategories to get all kept template IDs
const categoriesPath = path.join(__dirname, '../src/constants/professionCategories.ts');
const categoriesContent = fs.readFileSync(categoriesPath, 'utf8');

// Extract all template IDs from the "all" category (which should have all kept templates)
const allCategoryMatch = categoriesContent.match(/id:\s*"all"[\s\S]*?templateIds:\s*\[([\s\S]*?)\]/);
if (allCategoryMatch) {
  const allIdsSection = allCategoryMatch[1];
  const idRegex = /"([^"]+)"/g;
  let match;
  while ((match = idRegex.exec(allIdsSection)) !== null) {
    templatesToKeep.add(match[1]);
  }
}

// Convert kebab-case ID to PascalCase component name
function idToComponentName(id) {
  const specialCases = {
    'api': 'API', 'aws': 'AWS', 'ai': 'AI', 'ui': 'UI', 'ux': 'UX',
    'ceo': 'CEO', 'cpa': 'CPA', 'cfa': 'CFA', 'cfo': 'CFO', 'cto': 'CTO',
    'vp': 'VP', 'hr': 'HR', 'it': 'IT', 'qa': 'QA', 'pe': 'PE', 'pmp': 'PMP',
    'esl': 'ESL', 'faang': 'FAANG', 'cicd': 'CICD', 'ml': 'ML', 'dba': 'DBA',
    'gcp': 'GCP', 'xd': 'XD', 'ios': 'iOS', '3d': '3D', 'phd': 'PhD',
    'stem': 'STEM', 'jamstack': 'JAMStack', 'graphql': 'GraphQL',
    'mongodb': 'MongoDB', 'postgresql': 'PostgreSQL', 'nodejs': 'NodeJS',
    'nextjs': 'NextJS', 'nestjs': 'NestJS', 'vuejs': 'VueJS',
    'react-native': 'ReactNative', 'dotnet': 'DotNet', 'devops': 'DevOps',
    'devsecops': 'DevSecOps', 'github': 'GitHub', 'linkedin': 'LinkedIn',
    'tiktok': 'TikTok', 'youtube': 'YouTube',
  };
  
  const parts = id.split('-');
  const converted = parts.map(part => {
    if (specialCases[part.toLowerCase()]) {
      return specialCases[part.toLowerCase()];
    }
    return part.charAt(0).toUpperCase() + part.slice(1);
  });
  
  return converted.join('') + 'Template';
}

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

// Get all template files
const templateFiles = fs.readdirSync(TEMPLATES_DIR)
  .filter(f => f.endsWith('Template.tsx'))
  .sort();

console.log(`📁 Found ${templateFiles.length} template files\n`);
console.log(`📋 Templates to keep: ${templatesToKeep.size}\n`);

// Find templates to remove
const templatesToRemove = [];
for (const filename of templateFiles) {
  const componentName = filename.replace('.tsx', '');
  const templateId = componentToId(componentName);
  
  if (!templatesToKeep.has(templateId)) {
    templatesToRemove.push({ filename, componentName, templateId });
  }
}

console.log(`🗑️  Removing ${templatesToRemove.length} extra template files...\n`);

let removedCount = 0;
for (const { filename, templateId } of templatesToRemove) {
  const filePath = path.join(TEMPLATES_DIR, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    removedCount++;
    if (removedCount % 50 === 0) {
      console.log(`  Removed ${removedCount} files...`);
    }
  }
}

console.log(`\n✅ Removed ${removedCount} extra template files`);
console.log(`\n📊 Summary:`);
console.log(`  Templates to keep: ${templatesToKeep.size}`);
console.log(`  Extra files removed: ${removedCount}`);
console.log(`  Remaining files: ${templateFiles.length - removedCount}`);


