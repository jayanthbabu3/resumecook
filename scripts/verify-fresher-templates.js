#!/usr/bin/env node

/**
 * Enhanced Fresher Templates Verification Script
 * 
 * This script verifies all 87 fresher templates for common issues:
 * 1. Font sizes not following PDF standards
 * 2. Font colors not following PDF standards
 * 3. Missing custom sections add button
 * 4. Experience content not binding
 * 5. Custom sections content not binding
 * 6. Form editor and live editor sync issues
 * 7. Spacing standards not followed
 * 
 * Usage:
 *   node scripts/verify-fresher-templates.js [template-name]
 *   node scripts/verify-fresher-templates.js all  # Check all 87 templates
 *   node scripts/verify-fresher-templates.js achiever-fresher  # Check specific template
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 87 fresher templates from fresh-graduates category
const FRESHER_TEMPLATES = [
  "graduate", "starter", "fresher", "premium-fresher", "fresher-elite",
  "fresher-minimal-grid", "fresher-dark-professional", "fresher-color-accent",
  "fresher-timeline", "fresher-skills-first", "fresher-card-based",
  "fresher-two-tone", "fresher-centered-elegant", "fresher-geometric",
  "fresher-achievement", "fresher-modern-two-column", "fresher-professional-sidebar",
  "fresher-clean-modern", "fresher-tech-split", "fresher-executive-style",
  "fresher-bold-header", "fresher-minimalist-two-column", "fresher-creative-edge",
  "fresher-professional-grid", "fresher-modern-classic", "fresher-split-layout",
  "fresher-compact-pro", "fresher-elegant-sidebar", "fresher-tech-modern",
  "fresher-professional-minimal", "academic-achiever", "graduate-innovator",
  "campus-leader", "scholarship-graduate", "honors-student", "stem-graduate",
  "internship-ready", "research-graduate", "entrepreneurial-graduate",
  "volunteer-leader", "coding-bootcamp-grad", "liberal-arts-graduate",
  "business-graduate", "engineering-fresher", "design-school-grad",
  "masters-graduate", "phd-candidate", "student-athlete",
  "study-abroad-graduate", "dual-degree-graduate", "digital-native-graduate",
  "tech-savvy-fresher", "linkedin-ready-graduate", "github-student-developer",
  "portfolio-first-graduate", "connected-graduate", "social-media-savvy-grad",
  "open-source-contributor", "hackathon-winner", "coding-challenge-champion",
  "capstone-showcase", "research-publication-grad", "conference-presenter",
  "startup-intern", "faang-aspirant", "bootcamp-success-story",
  "remote-work-ready", "community-builder", "tech-blogger-graduate",
  "youtube-educator", "academic-scholar", "student-educator",
  "github-style", "github-developer", "linkedin-tech-pro",
  "social-media-creative", "artistic-horizon", "artistic-momentum",
  "academic-advisor", "design-systems-architect", "equity-research-analyst",
  "executive-ascendancy", "online-course-instructor", "portfolio-artist",
  "portfolio-manager", "rust-systems-engineer", "ux-researcher"
];

// Color codes for terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ${message}`, 'red');
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

// Convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Convert PascalCase to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

// Get template file path
function getTemplateFilePath(templateName) {
  const templatePascal = toPascalCase(templateName);
  return path.join(__dirname, `../src/components/resume/templates/${templatePascal}Template.tsx`);
}

// Verify a single fresher template
function verifyFresherTemplate(templateName) {
  const templateFile = getTemplateFilePath(templateName);
  
  log(`\n${'='.repeat(70)}`, 'blue');
  log(`Verifying Fresher Template: ${templateName}`, 'blue');
  log(`${'='.repeat(70)}`, 'blue');
  
  const issues = [];
  const warnings = [];
  
  // Check if file exists
  if (!fs.existsSync(templateFile)) {
    error(`Template file not found: ${templateFile}`);
    const templatePascal = toPascalCase(templateName);
    issues.push(`Template file missing: ${templatePascal}Template.tsx`);
    return { templateName, issues, warnings, score: 0 };
  }
  
  const content = fs.readFileSync(templateFile, 'utf8');
  
  // 1. CHECK FONT SIZES (PDF Standards)
  log('\n📏 Font Sizes (PDF Standards):', 'cyan');
  
  // Check for standard font sizes
  const fontSizeChecks = [
    { 
      name: 'Name size should be 27px (20pt) or close',
      patterns: [/text-\[27px\]|text-4xl|text-3xl|fontSize.*27|fontSize.*20/, /text-\[32px\]|text-5xl/],
      good: true,
      bad: false
    },
    { 
      name: 'Section headings should be 15px (11pt)',
      patterns: [/text-\[15px\]|text-base|fontSize.*15/, /text-\[18px\]|text-xl/],
      good: true,
      bad: false
    },
    { 
      name: 'Body text should be 13px (10pt)',
      patterns: [/text-\[13px\]|text-sm|fontSize.*13/, /text-\[16px\]|text-base/],
      good: true,
      bad: false
    },
    { 
      name: 'Dates should be 13px (10pt)',
      patterns: [/text-\[13px\]|text-xs|fontSize.*13/, /text-\[14px\]|text-sm/],
      good: true,
      bad: false
    }
  ];
  
  fontSizeChecks.forEach(check => {
    const hasGood = check.patterns[0].test(content);
    const hasBad = check.patterns[1] && check.patterns[1].test(content);
    
    if (hasGood && !hasBad) {
      success(check.name);
    } else if (hasBad) {
      error(`${check.name} - Found non-standard sizes`);
      issues.push(`Font size issue: ${check.name}`);
    } else {
      warning(`${check.name} - Not clearly using standard`);
      warnings.push(`Font size warning: ${check.name}`);
    }
  });
  
  // 2. CHECK FONT COLORS (PDF Standards)
  log('\n🎨 Font Colors (PDF Standards):', 'cyan');
  
  const colorChecks = [
    {
      name: 'Uses standard text colors (#1a1a1a, #525252, #737373)',
      pattern: /#1a1a1a|#525252|#737373|text-gray-900|text-gray-700/,
      required: false
    },
    {
      name: 'Avoids non-standard text colors',
      pattern: /text-gray-800|text-gray-600|#[0-9a-fA-F]{6}(?![0-9a-fA-F])/,
      required: false,
      invert: true // This is bad if found
    }
  ];
  
  // Check if using standard colors
  if (colorChecks[0].pattern.test(content)) {
    success('Uses standard text colors');
  } else {
    warning('May not be using standard text colors');
    warnings.push('Font colors may not follow PDF standards');
  }
  
  // 3. CHECK CUSTOM SECTIONS ADD BUTTON
  log('\n➕ Custom Sections Add Button:', 'cyan');
  
  const hasAddSectionButton = /Add Section|Add.*Section|handleAddSection|onClick.*addArrayItem.*sections/.test(content);
  const hasCustomSections = /resumeData\.sections|sections\.map|InlineCustomSections/.test(content);
  const hasAddButtonInEditable = /editable.*Add Section|Add Section.*editable/.test(content) || 
                                  (hasAddSectionButton && /editable.*\?/.test(content));
  
  if (hasAddSectionButton && hasCustomSections) {
    success('Has "Add Section" button for custom sections');
  } else if (hasCustomSections && !hasAddSectionButton) {
    error('Missing "Add Section" button for custom sections');
    issues.push('Missing "Add Section" button at end of resume in live editor');
  } else if (!hasCustomSections) {
    warning('Custom sections not found in template');
    warnings.push('Template may not support custom sections');
  }
  
  if (hasAddButtonInEditable) {
    success('Add button only shows when editable={true}');
  } else if (hasAddSectionButton) {
    warning('Add button may show in non-editable mode');
  }
  
  // 4. CHECK EXPERIENCE CONTENT BINDING
  log('\n💼 Experience Content Binding:', 'cyan');
  
  const hasExperienceSection = /resumeData\.experience|experience\.map/.test(content);
  const usesInlineExperience = /InlineExperienceSection/.test(content);
  const usesInlineEditableListForExperience = /InlineEditableList.*experience|path.*experience/.test(content);
  const checksBulletPoints = /bulletPoints|exp\.bulletPoints/.test(content);
  const hasAddBulletButton = /Add Achievement|Add Bullet|onAddBulletPoint/.test(content);
  
  if (hasExperienceSection) {
    if (usesInlineExperience || usesInlineEditableListForExperience) {
      success('Experience uses inline editable components');
    } else {
      error('Experience section not using InlineExperienceSection or InlineEditableList');
      issues.push('Experience content may not bind properly');
    }
    
    if (checksBulletPoints) {
      success('Checks bulletPoints array');
    } else {
      error('Does not check bulletPoints array - may miss bullet points');
      issues.push('Experience section may not display bullet points');
    }
    
    if (hasAddBulletButton) {
      success('Has add bullet point functionality');
    } else {
      warning('Missing add bullet point button');
      warnings.push('Cannot add bullet points in experience');
    }
  } else {
    warning('Experience section not found');
  }
  
  // 5. CHECK CUSTOM SECTIONS CONTENT BINDING
  log('\n📋 Custom Sections Content Binding:', 'cyan');
  
  const usesInlineCustomSections = /InlineCustomSections/.test(content);
  const usesInlineEditableSectionItems = /InlineEditableSectionItems/.test(content);
  const usesInlineEditHook = /useInlineEdit|inlineEditContext/.test(content);
  const mapsSectionsCorrectly = /sections\.map.*section|resumeData\.sections\.map/.test(content);
  
  if (hasCustomSections) {
    if (usesInlineCustomSections) {
      success('Uses InlineCustomSections component');
    } else if (usesInlineEditableSectionItems || usesInlineEditHook) {
      success('Uses inline edit hooks/components');
    } else {
      error('Custom sections not using InlineCustomSections or inline edit hooks');
      issues.push('Custom sections content may not bind properly');
    }
    
    if (mapsSectionsCorrectly) {
      success('Maps sections array correctly');
    } else {
      error('Does not map sections array correctly');
      issues.push('Custom sections may not render');
    }
  }
  
  // 6. CHECK EDITOR SYNC
  log('\n🔄 Editor Sync (Form <-> Live):', 'cyan');
  
  const usesInlineEditableText = /InlineEditableText/.test(content);
  const usesInlineEditableDate = /InlineEditableDate/.test(content);
  const usesInlineEditableList = /InlineEditableList/.test(content);
  const usesInlineEditableSkills = /InlineEditableSkills/.test(content);
  const hasDualMode = /editable\s*\?|editable\?/.test(content);
  
  if (usesInlineEditableText) {
    success('Uses InlineEditableText for text fields');
  } else {
    error('Not using InlineEditableText - text fields may not sync');
    issues.push('Text fields may not sync between form and live editor');
  }
  
  if (usesInlineEditableDate) {
    success('Uses InlineEditableDate for date fields');
  } else {
    warning('Not using InlineEditableDate - dates may not be editable');
  }
  
  if (hasDualMode) {
    success('Has dual mode (editable/non-editable) rendering');
  } else {
    warning('May not support dual mode rendering');
  }
  
  // 7. CHECK SPACING STANDARDS
  log('\n📐 Spacing Standards:', 'cyan');
  
  const hasStandardSectionGap = /mb-8|marginBottom.*32|gap.*32/.test(content);
  const hasStandardItemGap = /mb-5|marginBottom.*20|gap.*20/.test(content);
  
  if (hasStandardSectionGap) {
    success('Uses standard section gap (mb-8 / 32px)');
  } else {
    warning('May not use standard section spacing');
    warnings.push('Section spacing may not follow standards');
  }
  
  // 8. CHECK REQUIRED IMPORTS
  log('\n📦 Required Imports:', 'cyan');
  
  const requiredImports = [
    { name: 'InlineEditableText', pattern: /InlineEditableText/ },
    { name: 'InlineEditableDate', pattern: /InlineEditableDate/ },
    { name: 'InlineEditableList', pattern: /InlineEditableList/ },
    { name: 'Plus icon', pattern: /Plus.*lucide-react|from.*lucide-react.*Plus/ },
    { name: 'X icon', pattern: /X.*lucide-react|from.*lucide-react.*X/ },
  ];
  
  requiredImports.forEach(imp => {
    if (imp.pattern.test(content)) {
      success(`${imp.name} imported`);
    } else {
      error(`${imp.name} not imported`);
      issues.push(`Missing import: ${imp.name}`);
    }
  });
  
  // Calculate score
  const totalChecks = issues.length + warnings.length;
  const passedChecks = totalChecks - issues.length - warnings.length;
  const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;
  
  // Summary
  log('\n' + '='.repeat(70), 'blue');
  log('Verification Summary:', 'blue');
  log('='.repeat(70), 'blue');
  
  if (issues.length === 0 && warnings.length === 0) {
    success(`\n✅ Template "${templateName}" passes all checks! (Score: 100%)`);
  } else {
    if (issues.length > 0) {
      error(`\n❌ Found ${issues.length} critical issue(s):`);
      issues.forEach(issue => error(`   - ${issue}`));
    }
    if (warnings.length > 0) {
      warning(`\n⚠️  Found ${warnings.length} warning(s):`);
      warnings.forEach(w => warning(`   - ${w}`));
    }
    log(`\n📊 Score: ${score}%`, 'cyan');
  }
  
  return { templateName, issues, warnings, score };
}

// Main execution
const templateName = process.argv[2];

if (!templateName) {
  error('Template name is required');
  console.log('\nUsage: node scripts/verify-fresher-templates.js <template-name>');
  console.log('Example: node scripts/verify-fresher-templates.js achiever-fresher');
  console.log('         node scripts/verify-fresher-templates.js all');
  process.exit(1);
}

if (templateName === 'all') {
  log('Verifying all 87 fresher templates...', 'blue');
  log(`Total templates to verify: ${FRESHER_TEMPLATES.length}\n`, 'cyan');
  
  const results = [];
  let totalIssues = 0;
  let totalWarnings = 0;
  
  FRESHER_TEMPLATES.forEach(template => {
    try {
      const result = verifyFresherTemplate(template);
      results.push(result);
      totalIssues += result.issues.length;
      totalWarnings += result.warnings.length;
    } catch (err) {
      error(`Error verifying ${template}: ${err.message}`);
      results.push({ templateName: template, issues: [`Error: ${err.message}`], warnings: [], score: 0 });
    }
  });
  
  // Overall summary
  log('\n' + '='.repeat(70), 'blue');
  log('Overall Summary:', 'blue');
  log('='.repeat(70), 'blue');
  
  const passed = results.filter(r => r.issues.length === 0 && r.warnings.length === 0);
  const withIssues = results.filter(r => r.issues.length > 0);
  const withWarnings = results.filter(r => r.warnings.length > 0 && r.issues.length === 0);
  
  log(`\n📊 Statistics:`, 'cyan');
  log(`   Total templates: ${FRESHER_TEMPLATES.length}`, 'cyan');
  success(`   ✅ Passed: ${passed.length}`);
  error(`   ❌ With issues: ${withIssues.length}`);
  warning(`   ⚠️  With warnings only: ${withWarnings.length}`);
  log(`   Total issues: ${totalIssues}`, 'cyan');
  log(`   Total warnings: ${totalWarnings}`, 'cyan');
  
  if (withIssues.length > 0) {
    log(`\n❌ Templates with critical issues (${withIssues.length}):`, 'red');
    withIssues
      .sort((a, b) => b.issues.length - a.issues.length)
      .forEach(r => {
        error(`   - ${r.templateName} (${r.issues.length} issues, ${r.warnings.length} warnings)`);
      });
  }
  
  // Generate report file
  const reportPath = path.join(__dirname, '../FRESHER_TEMPLATES_VERIFICATION_REPORT.json');
  const report = {
    generatedAt: new Date().toISOString(),
    totalTemplates: FRESHER_TEMPLATES.length,
    statistics: {
      passed: passed.length,
      withIssues: withIssues.length,
      withWarnings: withWarnings.length,
      totalIssues,
      totalWarnings
    },
    templates: results.map(r => ({
      name: r.templateName,
      issues: r.issues,
      warnings: r.warnings,
      score: r.score
    }))
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n📄 Detailed report saved to: ${reportPath}`, 'cyan');
  
  process.exit(withIssues.length > 0 ? 1 : 0);
} else if (!FRESHER_TEMPLATES.includes(templateName)) {
  error(`Template "${templateName}" is not in the fresher templates list`);
  log(`\nAvailable templates: ${FRESHER_TEMPLATES.slice(0, 10).join(', ')}, ...`, 'cyan');
  process.exit(1);
} else {
  const result = verifyFresherTemplate(templateName);
  process.exit(result.issues.length > 0 ? 1 : 0);
}







