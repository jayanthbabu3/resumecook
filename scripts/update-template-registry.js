/**
 * Update Template Registry
 * 
 * This script updates the template registry files to include all templates.
 * It preserves existing metadata where available and adds new entries.
 * 
 * Run: node scripts/update-template-registry.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the generated templates
const templatesPath = path.join(__dirname, '../generated/templates.json');
const templates = JSON.parse(fs.readFileSync(templatesPath, 'utf-8'));

// Read existing templateMeta
const templateMetaPath = path.join(__dirname, '../src/constants/templateMeta.ts');
const existingMetaContent = fs.readFileSync(templateMetaPath, 'utf-8');

// Extract existing meta entries
function extractExistingMeta(content) {
  const meta = {};
  const regex = /"([^"]+)":\s*\{([^}]+)\}/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    const id = match[1];
    const body = match[2];
    
    // Extract fields
    const nameMatch = body.match(/name:\s*"([^"]+)"/);
    const descMatch = body.match(/description:\s*"([^"]+)"/);
    const catMatch = body.match(/category:\s*"([^"]+)"/);
    const slugMatch = body.match(/categorySlug:\s*"([^"]+)"/);
    
    if (nameMatch) {
      meta[id] = {
        name: nameMatch[1],
        description: descMatch ? descMatch[1] : 'Professional resume template',
        category: catMatch ? catMatch[1] : 'Universal',
        categorySlug: slugMatch ? slugMatch[1] : 'all',
      };
    }
  }
  
  return meta;
}

// Generate a readable name from component name
function generateName(componentName) {
  return componentName
    .replace(/Template$/, '')
    .replace(/([A-Z])/g, ' $1')
    .trim();
}

// Categorize template based on name
function categorizeTemplate(name, id) {
  const lowerName = name.toLowerCase();
  const lowerId = id.toLowerCase();
  
  // Software & Technology
  if (lowerName.includes('developer') || lowerName.includes('engineer') || 
      lowerName.includes('devops') || lowerName.includes('cloud') ||
      lowerName.includes('frontend') || lowerName.includes('backend') ||
      lowerName.includes('fullstack') || lowerName.includes('software') ||
      lowerName.includes('tech') || lowerName.includes('code') ||
      lowerName.includes('data') || lowerName.includes('ml') ||
      lowerName.includes('ai') || lowerName.includes('api')) {
    return { category: 'Software & Technology', categorySlug: 'software' };
  }
  
  // Fresh Graduates
  if (lowerName.includes('fresher') || lowerName.includes('graduate') ||
      lowerName.includes('student') || lowerName.includes('entry') ||
      lowerName.includes('starter') || lowerName.includes('campus')) {
    return { category: 'Fresh Graduates', categorySlug: 'fresh-graduates' };
  }
  
  // Creative & Design
  if (lowerName.includes('creative') || lowerName.includes('design') ||
      lowerName.includes('artist') || lowerName.includes('portfolio') ||
      lowerName.includes('ux') || lowerName.includes('ui') ||
      lowerName.includes('graphic') || lowerName.includes('visual')) {
    return { category: 'Creative & Design', categorySlug: 'creative' };
  }
  
  // Healthcare
  if (lowerName.includes('medical') || lowerName.includes('health') ||
      lowerName.includes('nurse') || lowerName.includes('clinical') ||
      lowerName.includes('doctor') || lowerName.includes('pharma')) {
    return { category: 'Healthcare & Medical', categorySlug: 'healthcare' };
  }
  
  // Education
  if (lowerName.includes('teacher') || lowerName.includes('educator') ||
      lowerName.includes('academic') || lowerName.includes('professor')) {
    return { category: 'Education & Teaching', categorySlug: 'education' };
  }
  
  // Finance
  if (lowerName.includes('finance') || lowerName.includes('accounting') ||
      lowerName.includes('cpa') || lowerName.includes('auditor') ||
      lowerName.includes('investment') || lowerName.includes('banking')) {
    return { category: 'Finance & Accounting', categorySlug: 'finance' };
  }
  
  // Business & Leadership
  if (lowerName.includes('executive') || lowerName.includes('leadership') ||
      lowerName.includes('corporate') || lowerName.includes('business') ||
      lowerName.includes('ceo') || lowerName.includes('director')) {
    return { category: 'Business & Leadership', categorySlug: 'business' };
  }
  
  // Sales & Marketing
  if (lowerName.includes('sales') || lowerName.includes('marketing') ||
      lowerName.includes('brand') || lowerName.includes('digital')) {
    return { category: 'Sales & Marketing', categorySlug: 'sales-marketing' };
  }
  
  // Legal
  if (lowerName.includes('legal') || lowerName.includes('attorney') ||
      lowerName.includes('lawyer') || lowerName.includes('paralegal')) {
    return { category: 'Legal & Consulting', categorySlug: 'legal' };
  }
  
  // Operations
  if (lowerName.includes('operations') || lowerName.includes('project') ||
      lowerName.includes('manager') || lowerName.includes('agile')) {
    return { category: 'Operations & Management', categorySlug: 'operations' };
  }
  
  // Default to Universal
  return { category: 'Universal Professional', categorySlug: 'universal-professional' };
}

function main() {
  console.log('📊 Updating template registry...\n');
  
  // Extract existing metadata
  const existingMeta = extractExistingMeta(existingMetaContent);
  console.log(`📋 Found ${Object.keys(existingMeta).length} existing meta entries`);
  console.log(`📁 Found ${templates.length} template files\n`);
  
  // Generate complete meta
  const completeMeta = {};
  let newCount = 0;
  let updatedCount = 0;
  
  templates.forEach(t => {
    if (existingMeta[t.id]) {
      // Use existing meta
      completeMeta[t.id] = existingMeta[t.id];
      updatedCount++;
    } else {
      // Generate new meta
      const name = generateName(t.componentName);
      const { category, categorySlug } = categorizeTemplate(name, t.id);
      
      completeMeta[t.id] = {
        name,
        description: `Professional ${name.toLowerCase()} resume template`,
        category,
        categorySlug,
      };
      newCount++;
    }
  });
  
  console.log(`✅ Preserved ${updatedCount} existing entries`);
  console.log(`➕ Added ${newCount} new entries`);
  console.log(`📊 Total: ${Object.keys(completeMeta).length} entries\n`);
  
  // Generate the new templateMeta.ts content
  const metaEntries = Object.entries(completeMeta)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, meta]) => `  "${id}": {
    name: "${meta.name}",
    description: "${meta.description}",
    category: "${meta.category}",
    categorySlug: "${meta.categorySlug}",
  }`)
    .join(',\n');
  
  // Extract existing categoryLabelMap if it exists
  const categoryLabelMapMatch = existingMetaContent.match(/export const categoryLabelMap[^}]+};/s);
  const categoryLabelMapSection = categoryLabelMapMatch ? categoryLabelMapMatch[0] : `export const categoryLabelMap: Record<string, string> = {
  software: "Software Development",
  freshers: "Freshers & Entry Level",
  accountants: "Accounting & Finance",
  teaching: "Teaching & Education",
  all: "All Professions",
};`;

  const newMetaContent = `export interface TemplateMeta {
  name: string;
  description: string;
  category: string;
  categorySlug: string;
}

${categoryLabelMapSection}

// Auto-generated template metadata
// Total: ${Object.keys(completeMeta).length} templates
// Generated: ${new Date().toISOString()}

export const templateMetaMap: Record<string, TemplateMeta> = {
${metaEntries},
};
`;
  
  // Write the new templateMeta.ts
  fs.writeFileSync(templateMetaPath, newMetaContent);
  console.log(`✅ Updated ${templateMetaPath}`);
  
  // Generate templateIds for professionCategories
  const allTemplateIds = templates.map(t => `      "${t.id}",`).join('\n');
  
  const templateIdsPath = path.join(__dirname, '../generated/all-template-ids.txt');
  fs.writeFileSync(templateIdsPath, allTemplateIds);
  console.log(`✅ Generated template IDs list at ${templateIdsPath}`);
  
  // Show summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total templates: ${templates.length}`);
  console.log(`\nNext steps:`);
  console.log(`1. The templateMeta.ts has been updated with all ${templates.length} templates`);
  console.log(`2. Update professionCategories.ts "all" category with the IDs from:`);
  console.log(`   ${templateIdsPath}`);
  console.log(`3. Run the app to verify the counts are correct`);
}

main();
