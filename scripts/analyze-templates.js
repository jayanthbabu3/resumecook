/**
 * Template Analysis Script
 * 
 * This script analyzes all templates and identifies:
 * 1. Which templates use shared components (good)
 * 2. Which templates have inline implementations (need migration)
 * 3. Which templates are missing key functionality
 * 
 * Run: node scripts/analyze-templates.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Patterns to check for
const PATTERNS = {
  // Good patterns (using shared components)
  usesInlineExperienceSection: /InlineExperienceSection/,
  usesInlineEducationSection: /InlineEducationSection/,
  usesInlineCustomSections: /InlineCustomSections/,
  usesExperienceSection: /ExperienceSection\s*(?:from|,)/,
  usesSkillsSection: /SkillsSection\s*(?:from|,)/,
  usesCustomSectionsWrapper: /CustomSectionsWrapper/,
  
  // Props that should be present
  hasEditableProp: /editable\s*[=:]/,
  hasOnAddBulletPoint: /onAddBulletPoint/,
  hasOnRemoveBulletPoint: /onRemoveBulletPoint/,
  
  // Inline implementations (need migration)
  hasInlineExperienceMap: /resumeData\.experience\.map/,
  hasInlineEducationMap: /resumeData\.education\.map/,
  hasInlineSectionsMap: /resumeData\.sections\.map/,
  hasInlineSkillsMap: /resumeData\.skills\.map/,
  
  // Uses InlineEditableText (good for editing)
  usesInlineEditableText: /InlineEditableText/,
  usesInlineEditableList: /InlineEditableList/,
  usesInlineEditableSkills: /InlineEditableSkills/,
  
  // Uses centralized styles
  usesSINGLE_COLUMN_CONFIG: /SINGLE_COLUMN_CONFIG/,
  usesTWO_COLUMN_CONFIG: /TWO_COLUMN_CONFIG/,
  usesPdfStyles: /from ['"]@\/lib\/pdfStyles/,
};

function analyzeTemplate(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  const analysis = {
    name: fileName.replace('.tsx', ''),
    path: filePath,
    
    // Shared component usage
    usesSharedComponents: {
      experience: PATTERNS.usesInlineExperienceSection.test(content) || PATTERNS.usesExperienceSection.test(content),
      education: PATTERNS.usesInlineEducationSection.test(content),
      customSections: PATTERNS.usesInlineCustomSections.test(content) || PATTERNS.usesCustomSectionsWrapper.test(content),
      skills: PATTERNS.usesSkillsSection.test(content),
    },
    
    // Has required props
    hasRequiredProps: {
      editable: PATTERNS.hasEditableProp.test(content),
      onAddBulletPoint: PATTERNS.hasOnAddBulletPoint.test(content),
      onRemoveBulletPoint: PATTERNS.hasOnRemoveBulletPoint.test(content),
    },
    
    // Inline implementations (need migration)
    hasInlineImplementations: {
      experience: PATTERNS.hasInlineExperienceMap.test(content) && !PATTERNS.usesInlineExperienceSection.test(content),
      education: PATTERNS.hasInlineEducationMap.test(content) && !PATTERNS.usesInlineEducationSection.test(content),
      sections: PATTERNS.hasInlineSectionsMap.test(content) && !PATTERNS.usesInlineCustomSections.test(content),
      skills: PATTERNS.hasInlineSkillsMap.test(content) && !PATTERNS.usesInlineEditableSkills.test(content),
    },
    
    // Uses editing components
    usesEditingComponents: {
      inlineEditableText: PATTERNS.usesInlineEditableText.test(content),
      inlineEditableList: PATTERNS.usesInlineEditableList.test(content),
      inlineEditableSkills: PATTERNS.usesInlineEditableSkills.test(content),
    },
    
    // Uses centralized styles
    usesCentralizedStyles: PATTERNS.usesPdfStyles.test(content),
  };
  
  // Calculate score
  let score = 0;
  let maxScore = 0;
  
  // Shared components (4 points each)
  Object.values(analysis.usesSharedComponents).forEach(v => {
    maxScore += 4;
    if (v) score += 4;
  });
  
  // Required props (2 points each)
  Object.values(analysis.hasRequiredProps).forEach(v => {
    maxScore += 2;
    if (v) score += 2;
  });
  
  // Editing components (1 point each)
  Object.values(analysis.usesEditingComponents).forEach(v => {
    maxScore += 1;
    if (v) score += 1;
  });
  
  // Centralized styles (2 points)
  maxScore += 2;
  if (analysis.usesCentralizedStyles) score += 2;
  
  // Penalty for inline implementations (-2 each)
  Object.values(analysis.hasInlineImplementations).forEach(v => {
    if (v) score -= 2;
  });
  
  analysis.score = score;
  analysis.maxScore = maxScore;
  analysis.percentage = Math.round((score / maxScore) * 100);
  
  // Determine status
  if (analysis.percentage >= 80) {
    analysis.status = '✅ GOOD';
  } else if (analysis.percentage >= 50) {
    analysis.status = '⚠️ NEEDS WORK';
  } else {
    analysis.status = '❌ NEEDS MIGRATION';
  }
  
  // Generate recommendations
  analysis.recommendations = [];
  
  if (!analysis.usesSharedComponents.experience) {
    analysis.recommendations.push('Use InlineExperienceSection or ExperienceSection for experience');
  }
  if (!analysis.usesSharedComponents.education) {
    analysis.recommendations.push('Use InlineEducationSection for education');
  }
  if (!analysis.usesSharedComponents.customSections) {
    analysis.recommendations.push('Use InlineCustomSections or CustomSectionsWrapper for custom sections');
  }
  if (!analysis.hasRequiredProps.editable) {
    analysis.recommendations.push('Add editable prop support');
  }
  if (!analysis.usesCentralizedStyles) {
    analysis.recommendations.push('Use SINGLE_COLUMN_CONFIG from pdfStyles for consistent sizing');
  }
  
  return analysis;
}

function main() {
  console.log('🔍 Analyzing templates...\n');
  
  const files = fs.readdirSync(TEMPLATES_DIR)
    .filter(f => f.endsWith('Template.tsx'));
  
  console.log(`Found ${files.length} templates\n`);
  
  const results = files.map(f => analyzeTemplate(path.join(TEMPLATES_DIR, f)));
  
  // Sort by score (lowest first)
  results.sort((a, b) => a.percentage - b.percentage);
  
  // Summary
  const good = results.filter(r => r.status === '✅ GOOD').length;
  const needsWork = results.filter(r => r.status === '⚠️ NEEDS WORK').length;
  const needsMigration = results.filter(r => r.status === '❌ NEEDS MIGRATION').length;
  
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Good: ${good} templates`);
  console.log(`⚠️ Needs Work: ${needsWork} templates`);
  console.log(`❌ Needs Migration: ${needsMigration} templates`);
  console.log('');
  
  // Show worst templates
  console.log('\n🔴 TEMPLATES NEEDING MIGRATION (Bottom 20):');
  console.log('='.repeat(50));
  results.slice(0, 20).forEach(r => {
    console.log(`\n${r.status} ${r.name} (${r.percentage}%)`);
    if (r.recommendations.length > 0) {
      r.recommendations.forEach(rec => console.log(`   → ${rec}`));
    }
  });
  
  // Show best templates
  console.log('\n\n🟢 BEST TEMPLATES (Top 10):');
  console.log('='.repeat(50));
  results.slice(-10).reverse().forEach(r => {
    console.log(`${r.status} ${r.name} (${r.percentage}%)`);
  });
  
  // Write detailed report
  const reportPath = path.join(__dirname, '../TEMPLATE_ANALYSIS_REPORT.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n\n📄 Detailed report saved to: ${reportPath}`);
  
  // Write migration list
  const migrationList = results
    .filter(r => r.status !== '✅ GOOD')
    .map(r => ({
      name: r.name,
      score: r.percentage,
      recommendations: r.recommendations,
    }));
  
  const migrationPath = path.join(__dirname, '../TEMPLATES_TO_MIGRATE.json');
  fs.writeFileSync(migrationPath, JSON.stringify(migrationList, null, 2));
  console.log(`📄 Migration list saved to: ${migrationPath}`);
}

main();
