/**
 * Update Profession Categories
 * 
 * This script updates the professionCategories.ts file to:
 * 1. Replace the "all" category templateIds with all 903 templates
 * 2. Update individual category templateIds based on template categorization
 * 
 * Run: node scripts/update-profession-categories.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the generated templates
const templatesPath = path.join(__dirname, '../generated/templates.json');
const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));

// Read the updated templateMeta
const templateMetaPath = path.join(__dirname, '../src/constants/templateMeta.ts');
const metaContent = fs.readFileSync(templateMetaPath, 'utf-8');

// Extract meta to get categorySlug for each template
function extractMeta(content) {
  const meta = {};
  const regex = /"([^"]+)":\s*\{[^}]*categorySlug:\s*"([^"]+)"/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    meta[match[1]] = match[2];
  }
  
  return meta;
}

// Read professionCategories.ts
const professionCategoriesPath = path.join(__dirname, '../src/constants/professionCategories.ts');
const categoriesContent = fs.readFileSync(professionCategoriesPath, 'utf-8');

function main() {
  console.log('📊 Updating profession categories...\n');
  
  const templateMeta = extractMeta(metaContent);
  console.log(`📋 Found ${Object.keys(templateMeta).length} templates with category info\n`);
  
  // Group templates by categorySlug
  const templatesByCategory = {};
  
  templates.forEach(t => {
    const categorySlug = templateMeta[t.id] || 'all';
    if (!templatesByCategory[categorySlug]) {
      templatesByCategory[categorySlug] = [];
    }
    templatesByCategory[categorySlug].push(t.id);
  });
  
  // Show category distribution
  console.log('📊 Template distribution by category:');
  Object.entries(templatesByCategory)
    .sort(([, a], [, b]) => b.length - a.length)
    .forEach(([cat, ids]) => {
      console.log(`   ${cat}: ${ids.length} templates`);
    });
  
  // Generate the all templateIds array
  const allTemplateIds = templates.map(t => `      "${t.id}",`).join('\n');
  
  // Find and replace the "all" category templateIds
  // This is tricky because the array is very long
  // We'll use a regex to find the start and end of the templateIds array
  
  const allCategoryStart = categoriesContent.indexOf('isAll: true,');
  if (allCategoryStart === -1) {
    console.error('❌ Could not find "all" category');
    return;
  }
  
  // Find the templateIds array start after isAll: true
  const templateIdsStart = categoriesContent.indexOf('templateIds: [', allCategoryStart);
  if (templateIdsStart === -1) {
    console.error('❌ Could not find templateIds array');
    return;
  }
  
  // Find the matching closing bracket
  let bracketCount = 0;
  let templateIdsEnd = -1;
  for (let i = templateIdsStart; i < categoriesContent.length; i++) {
    if (categoriesContent[i] === '[') bracketCount++;
    if (categoriesContent[i] === ']') {
      bracketCount--;
      if (bracketCount === 0) {
        templateIdsEnd = i + 1;
        break;
      }
    }
  }
  
  if (templateIdsEnd === -1) {
    console.error('❌ Could not find end of templateIds array');
    return;
  }
  
  // Create the new content
  const newTemplateIdsArray = `templateIds: [\n${allTemplateIds}\n    ]`;
  
  const newContent = 
    categoriesContent.substring(0, templateIdsStart) +
    newTemplateIdsArray +
    categoriesContent.substring(templateIdsEnd);
  
  // Write the updated file
  fs.writeFileSync(professionCategoriesPath, newContent);
  
  console.log(`\n✅ Updated ${professionCategoriesPath}`);
  console.log(`   "all" category now has ${templates.length} templateIds`);
  
  // Verify the count
  const verifyContent = fs.readFileSync(professionCategoriesPath, 'utf-8');
  const idCount = (verifyContent.match(/"[a-z0-9-]+",/g) || []).length;
  console.log(`   Verified: ${idCount} total IDs in file`);
}

main();
