import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Template limits per category
const TEMPLATE_LIMITS = {
  'universal-professional': 30, // Keep 30 (currently 29, so keep as is)
  'software-technology': 50,    // Keep first 50
  'creative-design': 20,        // Keep first 20
  'fresh-graduates': 30,        // Keep first 30
  // All other categories: 0 (remove all)
};

// Read the professionCategories.ts file
const categoriesPath = path.join(__dirname, '../src/constants/professionCategories.ts');
const categoriesContent = fs.readFileSync(categoriesPath, 'utf8');

// Extract template IDs for each category
function extractTemplateIds(categoryId, content) {
  const categoryRegex = new RegExp(`id:\\s*"${categoryId}"[\\s\\S]*?templateIds:\\s*\\[([\\s\\S]*?)\\]`, 'm');
  const match = content.match(categoryRegex);
  if (!match) return [];
  
  const templateIdsSection = match[1];
  // Extract template IDs (strings in quotes)
  const idRegex = /"([^"]+)"/g;
  const ids = [];
  let idMatch;
  while ((idMatch = idRegex.exec(templateIdsSection)) !== null) {
    ids.push(idMatch[1]);
  }
  return ids;
}

// Get all categories from the file
function getAllCategories(content) {
  const categoryRegex = /id:\s*"([^"]+)"/g;
  const categories = [];
  let match;
  while ((match = categoryRegex.exec(content)) !== null) {
    if (match[1] !== 'all') {
      categories.push(match[1]);
    }
  }
  return categories;
}

// Main cleanup logic
const allCategories = getAllCategories(categoriesContent);
const templatesToKeep = new Set();
const templatesToRemove = new Set();
const categoryTemplates = {};

console.log('📊 Analyzing templates...\n');

// Process each category
for (const categoryId of allCategories) {
  const templateIds = extractTemplateIds(categoryId, categoriesContent);
  categoryTemplates[categoryId] = templateIds;
  
  const limit = TEMPLATE_LIMITS[categoryId] || 0;
  const keepCount = Math.min(limit, templateIds.length);
  const keepIds = templateIds.slice(0, keepCount);
  const removeIds = templateIds.slice(keepCount);
  
  console.log(`${categoryId}:`);
  console.log(`  Total: ${templateIds.length}`);
  console.log(`  Keeping: ${keepCount} (first ${keepCount})`);
  console.log(`  Removing: ${removeIds.length}\n`);
  
  keepIds.forEach(id => templatesToKeep.add(id));
  removeIds.forEach(id => templatesToRemove.add(id));
}

// Update categoryTemplates with kept templates only
const updatedCategoryTemplates = {};
for (const categoryId of allCategories) {
  const limit = TEMPLATE_LIMITS[categoryId] || 0;
  const templateIds = categoryTemplates[categoryId];
  updatedCategoryTemplates[categoryId] = templateIds.slice(0, limit);
}

// Generate updated professionCategories.ts content
function generateUpdatedCategories(originalContent, updatedTemplates) {
  let updated = originalContent;
  
  // Update each category's templateIds array
  for (const categoryId of allCategories) {
    const templateIds = updatedTemplates[categoryId] || [];
    const templateIdsString = templateIds.map(id => `      "${id}"`).join(',\n');
    
    // Find and replace the templateIds array for this category
    const categoryRegex = new RegExp(
      `(id:\\s*"${categoryId}"[\\s\\S]*?templateIds:\\s*\\[)([\\s\\S]*?)(\\])`,
      'm'
    );
    
    updated = updated.replace(categoryRegex, (match, before, oldIds, after) => {
      if (templateIds.length === 0) {
        return `${before}${after}`;
      }
      return `${before}\n${templateIdsString}\n    ${after}`;
    });
  }
  
  // Update the "all" category to include only kept templates
  const allTemplates = Array.from(templatesToKeep).sort();
  const allTemplatesString = allTemplates.map(id => `      "${id}"`).join(',\n');
  const allCategoryRegex = /(id:\s*"all"[\s\S]*?templateIds:\s*\[)([\s\S]*?)(\])/m;
  updated = updated.replace(allCategoryRegex, (match, before, oldIds, after) => {
    return `${before}\n${allTemplatesString}\n    ${after}`;
  });
  
  return updated;
}

// Write updated categories file
const updatedContent = generateUpdatedCategories(categoriesContent, updatedCategoryTemplates);
fs.writeFileSync(categoriesPath, updatedContent, 'utf8');
console.log('✅ Updated professionCategories.ts\n');

// Generate report
const report = {
  summary: {
    totalCategories: allCategories.length,
    templatesKept: templatesToKeep.size,
    templatesRemoved: templatesToRemove.size,
  },
  categories: {},
  templatesToRemove: Array.from(templatesToRemove).sort(),
  templatesToKeep: Array.from(templatesToKeep).sort(),
};

for (const categoryId of allCategories) {
  const limit = TEMPLATE_LIMITS[categoryId] || 0;
  const original = categoryTemplates[categoryId].length;
  const kept = updatedCategoryTemplates[categoryId].length;
  report.categories[categoryId] = {
    original,
    limit,
    kept,
    removed: original - kept,
  };
}

// Write cleanup report
const reportPath = path.join(__dirname, '../generated/cleanup-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log('📄 Cleanup report saved to generated/cleanup-report.json\n');

console.log('📋 Summary:');
console.log(`  Templates to keep: ${templatesToKeep.size}`);
console.log(`  Templates to remove: ${templatesToRemove.size}`);
console.log(`\n✅ Category files updated!`);
console.log(`\n⚠️  Next steps:`);
console.log(`  1. Review generated/cleanup-report.json`);
console.log(`  2. Run script to remove template component files`);
console.log(`  3. Update generated files (template-ids.ts, template-mapping.ts, template-meta.ts)`);

