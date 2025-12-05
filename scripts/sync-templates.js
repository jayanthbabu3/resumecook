/**
 * Template Sync Script
 * 
 * This script:
 * 1. Scans all template files in the templates directory
 * 2. Generates the correct template ID from the filename
 * 3. Shows which templates are missing from mappings
 * 4. Can generate the code needed to add missing templates
 * 
 * Run: node scripts/sync-templates.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Convert PascalCase template name to kebab-case ID
// e.g., "VentureFresherTemplate" -> "venture-fresher"
// Special handling for acronyms like AI, API, AWS, etc.
function toTemplateId(filename) {
  // Remove "Template.tsx" suffix
  let name = filename.replace('Template.tsx', '');
  
  // Handle common acronyms - replace them with lowercase versions first
  const acronyms = ['API', 'AWS', 'AI', 'UI', 'UX', 'CEO', 'CPA', 'CFA', 'CFO', 'CTO', 'VP', 'HR', 'IT', 'QA', 'PE', 'PMP', 'ESL', 'FAANG', 'CICD', 'ML', 'DBA', 'GCP', 'XD', 'iOS', '3D'];
  acronyms.forEach(acronym => {
    // Replace acronym with a placeholder that won't be split
    const regex = new RegExp(acronym, 'g');
    name = name.replace(regex, `_${acronym.toLowerCase()}_`);
  });
  
  // Convert PascalCase to kebab-case
  let result = name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '') // Remove leading dash
    .replace(/--+/g, '-') // Remove multiple dashes
    .replace(/_-/g, '-') // Clean up placeholder artifacts
    .replace(/-_/g, '-')
    .replace(/_/g, ''); // Remove remaining underscores
  
  return result;
}

// Convert kebab-case ID to PascalCase component name
// e.g., "venture-fresher" -> "VentureFresherTemplate"
function toComponentName(id) {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Template';
}

function getAllTemplateFiles() {
  const files = fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('Template.tsx'));
  
  return files.map(filename => ({
    filename,
    componentName: filename.replace('.tsx', ''),
    templateId: toTemplateId(filename),
  }));
}

function getExistingMappings(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const mappings = new Set();
  
  // Match patterns like "template-id": or 'template-id':
  const regex = /["']([a-z0-9-]+)["']\s*:/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    mappings.add(match[1]);
  }
  
  return mappings;
}

function main() {
  console.log('🔍 Scanning template files...\n');
  
  const allTemplates = getAllTemplateFiles();
  console.log(`📁 Found ${allTemplates.length} template files\n`);
  
  // Check TemplatePreview.tsx
  const templatePreviewPath = path.join(__dirname, '../src/components/TemplatePreview.tsx');
  const templatePreviewMappings = getExistingMappings(templatePreviewPath);
  console.log(`📋 TemplatePreview.tsx has ${templatePreviewMappings.size} mappings`);
  
  // Check LiveEditor.tsx
  const liveEditorPath = path.join(__dirname, '../src/pages/LiveEditor.tsx');
  const liveEditorMappings = getExistingMappings(liveEditorPath);
  console.log(`📋 LiveEditor.tsx has ${liveEditorMappings.size} mappings`);
  
  // Check templateMeta.ts
  const templateMetaPath = path.join(__dirname, '../src/constants/templateMeta.ts');
  const templateMetaMappings = getExistingMappings(templateMetaPath);
  console.log(`📋 templateMeta.ts has ${templateMetaMappings.size} mappings`);
  
  // Check professionCategories.ts (count templateIds in "all" category)
  const professionCategoriesPath = path.join(__dirname, '../src/constants/professionCategories.ts');
  const professionContent = fs.readFileSync(professionCategoriesPath, 'utf-8');
  const allCategoryMatch = professionContent.match(/isAll:\s*true,[\s\S]*?templateIds:\s*\[([\s\S]*?)\]/);
  let professionCategoryCount = 0;
  if (allCategoryMatch) {
    const templateIdsStr = allCategoryMatch[1];
    professionCategoryCount = (templateIdsStr.match(/["'][^"']+["']/g) || []).length;
  }
  console.log(`📋 professionCategories.ts "all" category has ${professionCategoryCount} templateIds\n`);
  
  // Find missing templates
  const missingFromPreview = [];
  const missingFromLiveEditor = [];
  const missingFromMeta = [];
  const missingFromCategories = [];
  
  allTemplates.forEach(t => {
    if (!templatePreviewMappings.has(t.templateId)) {
      missingFromPreview.push(t);
    }
    if (!liveEditorMappings.has(t.templateId)) {
      missingFromLiveEditor.push(t);
    }
    if (!templateMetaMappings.has(t.templateId)) {
      missingFromMeta.push(t);
    }
  });
  
  console.log('='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total template files: ${allTemplates.length}`);
  console.log(`Missing from TemplatePreview.tsx: ${missingFromPreview.length}`);
  console.log(`Missing from LiveEditor.tsx: ${missingFromLiveEditor.length}`);
  console.log(`Missing from templateMeta.ts: ${missingFromMeta.length}`);
  console.log('');
  
  if (missingFromPreview.length > 0) {
    console.log('\n❌ MISSING FROM TemplatePreview.tsx (first 20):');
    console.log('-'.repeat(60));
    missingFromPreview.slice(0, 20).forEach(t => {
      console.log(`  "${t.templateId}": ${t.componentName},`);
    });
    if (missingFromPreview.length > 20) {
      console.log(`  ... and ${missingFromPreview.length - 20} more`);
    }
  }
  
  if (missingFromLiveEditor.length > 0) {
    console.log('\n❌ MISSING FROM LiveEditor.tsx (first 20):');
    console.log('-'.repeat(60));
    missingFromLiveEditor.slice(0, 20).forEach(t => {
      console.log(`  "${t.templateId}": ${t.componentName},`);
    });
    if (missingFromLiveEditor.length > 20) {
      console.log(`  ... and ${missingFromLiveEditor.length - 20} more`);
    }
  }
  
  // Generate import statements for missing templates
  if (missingFromPreview.length > 0) {
    console.log('\n\n📝 IMPORT STATEMENTS NEEDED FOR TemplatePreview.tsx:');
    console.log('-'.repeat(60));
    missingFromPreview.slice(0, 10).forEach(t => {
      console.log(`import { ${t.componentName} } from "./resume/templates/${t.componentName}";`);
    });
    if (missingFromPreview.length > 10) {
      console.log(`// ... and ${missingFromPreview.length - 10} more imports`);
    }
  }
  
  // Write full report to file
  const report = {
    totalTemplates: allTemplates.length,
    templatePreviewCount: templatePreviewMappings.size,
    liveEditorCount: liveEditorMappings.size,
    templateMetaCount: templateMetaMappings.size,
    professionCategoryCount,
    missingFromPreview: missingFromPreview.map(t => t.templateId),
    missingFromLiveEditor: missingFromLiveEditor.map(t => t.templateId),
    missingFromMeta: missingFromMeta.map(t => t.templateId),
    allTemplateIds: allTemplates.map(t => t.templateId),
  };
  
  const reportPath = path.join(__dirname, '../TEMPLATE_SYNC_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n\n📄 Full report saved to: ${reportPath}`);
  
  // Generate the correct count for dashboard
  console.log('\n\n✅ CORRECT TEMPLATE COUNT FOR DASHBOARD:');
  console.log(`   Total: ${allTemplates.length} templates`);
}

main();
