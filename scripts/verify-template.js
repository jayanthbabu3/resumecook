#!/usr/bin/env node

/**
 * Template Verification Script
 * 
 * This script verifies that a template meets all production requirements
 * regardless of layout differences.
 * 
 * Usage:
 *   node scripts/verify-template.js <template-name>
 *   node scripts/verify-template.js professional
 *   node scripts/verify-template.js all  # Verify all templates
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
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

// Get template name from command line
const templateName = process.argv[2];

if (!templateName) {
  error('Template name is required');
  console.log('\nUsage: node scripts/verify-template.js <template-name>');
  console.log('Example: node scripts/verify-template.js professional');
  console.log('         node scripts/verify-template.js all');
  process.exit(1);
}

// Convert template name to PascalCase for file names
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Get all template files
function getAllTemplates() {
  const templatesDir = path.join(__dirname, '../src/components/resume/templates');
  const files = fs.readdirSync(templatesDir);
  return files
    .filter(file => file.endsWith('Template.tsx'))
    .map(file => file.replace('Template.tsx', ''))
    .map(name => {
      // Convert PascalCase to kebab-case
      return name
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '');
    });
}

// Verify a single template
function verifyTemplate(templateName) {
  const templatePascal = toPascalCase(templateName);
  const templateFile = path.join(__dirname, `../src/components/resume/templates/${templatePascal}Template.tsx`);
  const pdfFile = path.join(__dirname, `../src/components/resume/pdf/${templatePascal}PDF.tsx`);
  
  log(`\n${'='.repeat(60)}`, 'blue');
  log(`Verifying Template: ${templateName}`, 'blue');
  log(`${'='.repeat(60)}`, 'blue');
  
  const issues = [];
  const warnings = [];
  
  // 1. Check if files exist
  log('\n📁 File Structure:', 'cyan');
  if (!fs.existsSync(templateFile)) {
    error(`UI Template not found: ${templateFile}`);
    issues.push('UI Template file missing');
  } else {
    success(`UI Template exists: ${templatePascal}Template.tsx`);
  }
  
  if (!fs.existsSync(pdfFile)) {
    error(`PDF Template not found: ${pdfFile}`);
    issues.push('PDF Template file missing');
  } else {
    success(`PDF Template exists: ${templatePascal}PDF.tsx`);
  }
  
  if (issues.length > 0) {
    log('\n⚠️  Cannot continue verification - files are missing', 'yellow');
    return { templateName, issues, warnings };
  }
  
  // Read file contents
  const templateContent = fs.readFileSync(templateFile, 'utf8');
  const pdfContent = fs.existsSync(pdfFile) ? fs.readFileSync(pdfFile, 'utf8') : '';
  
  // 2. Check required imports
  log('\n📦 Required Imports:', 'cyan');
  const requiredImports = [
    { name: 'InlineEditableText', file: 'InlineEditableText' },
    { name: 'InlineEditableDate', file: 'InlineEditableDate' },
    { name: 'InlineEditableList', file: 'InlineEditableList' },
    { name: 'InlineEditableSkills', file: 'InlineEditableSkills' },
    { name: 'Plus', file: 'lucide-react' },
    { name: 'X', file: 'lucide-react' },
    { name: 'ResumeData', file: '@/types/resume' },
  ];
  
  // Check for Social Links icons
  const socialLinksIcons = ['Linkedin', 'Globe', 'Github'];
  socialLinksIcons.forEach(icon => {
    if (templateContent.includes(icon)) {
      success(`${icon} imported`);
    } else {
      warning(`${icon} not imported (Social Links section may be missing)`);
    }
  });
  
  requiredImports.forEach(imp => {
    if (templateContent.includes(imp.name)) {
      success(`${imp.name} imported`);
    } else {
      error(`${imp.name} not imported from ${imp.file}`);
      issues.push(`Missing import: ${imp.name}`);
    }
  });
  
  // Check for incorrect imports
  if (templateContent.includes('@/pages/Editor')) {
    warning('Importing from @/pages/Editor - should use @/types/resume instead');
    warnings.push('Using @/pages/Editor import instead of @/types/resume');
  }
  
  // 3. Check required props
  log('\n🔧 Required Props:', 'cyan');
  const requiredProps = [
    'resumeData',
    'editable',
    'onAddBulletPoint',
    'onRemoveBulletPoint',
  ];
  
  requiredProps.forEach(prop => {
    if (templateContent.includes(prop)) {
      success(`Prop ${prop} present`);
    } else {
      error(`Prop ${prop} missing`);
      issues.push(`Missing prop: ${prop}`);
    }
  });
  
  // 4. Check bullet points management
  log('\n📝 Bullet Points Management:', 'cyan');
  const bulletPointChecks = [
    { pattern: 'onAddBulletPoint', name: 'Add bullet point handler' },
    { pattern: 'onRemoveBulletPoint', name: 'Remove bullet point handler' },
    { pattern: 'Add Achievement', name: 'Add Achievement button text' },
    { pattern: 'bulletPoints', name: 'Bullet points array handling' },
    { pattern: 'exp.bulletPoints', name: 'Experience bullet points access' },
  ];
  
  bulletPointChecks.forEach(check => {
    if (templateContent.includes(check.pattern)) {
      success(`${check.name} implemented`);
    } else {
      error(`${check.name} missing`);
      issues.push(`Missing: ${check.name}`);
    }
  });
  
  // 5. Check dual mode rendering
  log('\n🔄 Dual Mode Rendering:', 'cyan');
  if (templateContent.includes('editable ?') || templateContent.includes('editable?')) {
    success('Editable mode conditional rendering found');
  } else {
    warning('Editable mode conditional rendering not found');
    warnings.push('May not support dual mode rendering');
  }
  
  // 6. Check InlineEditable components usage
  log('\n✏️  Inline Editing Components:', 'cyan');
  const inlineComponents = [
    'InlineEditableText',
    'InlineEditableDate',
    'InlineEditableList',
    'InlineEditableSkills',
  ];
  
  inlineComponents.forEach(component => {
    const count = (templateContent.match(new RegExp(component, 'g')) || []).length;
    if (count > 0) {
      success(`${component} used (${count} times)`);
    } else {
      warning(`${component} not used`);
      warnings.push(`${component} not found in template`);
    }
  });
  
  // 7. Check date formatting
  log('\n📅 Date Formatting:', 'cyan');
  if (templateContent.includes('formatDate') || templateContent.includes('format-date')) {
    success('Date formatting function found');
  } else {
    warning('Date formatting function not found');
    warnings.push('May not format dates correctly');
  }
  
  // 8. Check PDF template matching
  if (pdfContent) {
    log('\n📄 PDF Template Matching:', 'cyan');
    
    // Check if PDF handles bullet points
    if (pdfContent.includes('bulletPoints') || pdfContent.includes('bullet-points')) {
      success('PDF handles bullet points');
    } else {
      error('PDF does not handle bullet points');
      issues.push('PDF missing bullet points handling');
    }
    
    // Check if PDF uses hasContent helper
    if (pdfContent.includes('hasContent')) {
      success('PDF uses hasContent helper');
    } else {
      warning('PDF may not use hasContent helper for conditional rendering');
      warnings.push('PDF may not handle empty content correctly');
    }
    
    // Check if PDF has similar structure
    const uiSections = ['Experience', 'Education', 'Skills', 'Summary'];
    uiSections.forEach(section => {
      if (templateContent.includes(section) && pdfContent.includes(section)) {
        success(`PDF includes ${section} section`);
      } else if (templateContent.includes(section) && !pdfContent.includes(section)) {
        warning(`PDF missing ${section} section`);
        warnings.push(`PDF may not render ${section} section`);
      }
    });
  }
  
  // 9. Check registration files
  log('\n📋 Registration Files:', 'cyan');
  const registrationFiles = [
    { file: 'src/pages/LiveEditor.tsx', patterns: [`"${templateName}"`, `'${templateName}'`, `${templateName}:`] },
    { file: 'src/pages/Editor.tsx', patterns: [`"${templateName}"`, `'${templateName}'`, `${templateName}:`] },
    { file: 'src/components/TemplatePreview.tsx', patterns: [`"${templateName}"`, `'${templateName}'`, `${templateName}:`, templatePascal] },
    { file: 'src/components/resume/ResumePreview.tsx', patterns: [`"${templateName}"`, `'${templateName}'`, `${templateName}:`, templatePascal] },
    { file: 'src/components/resume/EditableResumePreview.tsx', patterns: [`"${templateName}"`, `'${templateName}'`, `${templateName}:`, templatePascal] },
    { file: 'src/constants/templateMeta.ts', patterns: [`"${templateName}"`, `'${templateName}'`, `${templateName}:`] },
    { file: 'src/constants/professionCategories.ts', patterns: [`"${templateName}"`, `'${templateName}'`] },
  ];
  
  registrationFiles.forEach(reg => {
    const filePath = path.join(__dirname, '..', reg.file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const found = reg.patterns.some(pattern => content.includes(pattern));
      if (found) {
        success(`Registered in ${reg.file}`);
      } else {
        error(`Not registered in ${reg.file}`);
        issues.push(`Missing registration in ${reg.file}`);
      }
    } else {
      warning(`Registration file not found: ${reg.file}`);
    }
  });
  
  // 10. Check for common issues
  log('\n🔍 Common Issues Check:', 'cyan');
  
  // Check for hardcoded values
  if (templateContent.includes('"Your Name"') || templateContent.includes("'Your Name'")) {
    success('Uses placeholder text for name');
  }
  
  // Check for page break handling
  if (templateContent.includes('pageBreakInside') || templateContent.includes('page-break')) {
    success('Page break handling found');
  } else {
    warning('Page break handling not found (may cause PDF issues)');
    warnings.push('May not handle page breaks correctly in PDF');
  }
  
  // 11. Check Social Links section
  log('\n🔗 Social Links Section:', 'cyan');
  if (templateContent.includes('includeSocialLinks') && 
      (templateContent.includes('linkedin') || templateContent.includes('portfolio') || templateContent.includes('github'))) {
    success('Social Links section found');
  } else {
    error('Social Links section missing');
    issues.push('Social Links section not implemented');
  }
  
  // Check if Social Links has icons
  if (templateContent.includes('Linkedin') || templateContent.includes('Globe') || templateContent.includes('Github')) {
    success('Social Links icons found');
  } else {
    warning('Social Links icons not found (may be missing icons)');
    warnings.push('Social Links section may not have icons');
  }
  
  // 12. Check Custom Sections (Certifications) editability
  log('\n📋 Custom Sections Editability:', 'cyan');
  if (templateContent.includes('resumeData.sections')) {
    // Check if sections use InlineEditableList in editable mode
    // Look for pattern: InlineEditableList with path="sections" or path='sections'
    const sectionsEditablePattern = /InlineEditableList[\s\S]*?path=["']sections["']|path=["']sections["'][\s\S]*?InlineEditableList/;
    if (sectionsEditablePattern.test(templateContent)) {
      success('Custom sections are editable (using InlineEditableList)');
    } else {
      // Check if it's using simple map without InlineEditableList in editable mode
      const hasSimpleMap = /resumeData\.sections\.map/.test(templateContent);
      const hasEditableCheck = /editable\s*\?/.test(templateContent);
      if (hasSimpleMap && hasEditableCheck) {
        // Check if there's an editable branch that uses InlineEditableList
        const editableBranch = templateContent.split('editable ?')[1] || templateContent.split('editable?')[1];
        if (editableBranch && editableBranch.includes('InlineEditableList') && editableBranch.includes('sections')) {
          success('Custom sections are editable (using InlineEditableList)');
        } else {
          error('Custom sections not editable in live editor');
          issues.push('Custom sections must use InlineEditableList for editability');
        }
      } else {
        error('Custom sections not editable in live editor');
        issues.push('Custom sections must use InlineEditableList for editability');
      }
    }
  } else {
    warning('Custom sections not found');
    warnings.push('Template may not support custom sections');
  }
  
  // Summary
  log('\n' + '='.repeat(60), 'blue');
  log('Verification Summary:', 'blue');
  log('='.repeat(60), 'blue');
  
  if (issues.length === 0 && warnings.length === 0) {
    success(`\n✅ Template "${templateName}" passes all checks!`);
  } else {
    if (issues.length > 0) {
      error(`\n❌ Found ${issues.length} issue(s):`);
      issues.forEach(issue => error(`   - ${issue}`));
    }
    if (warnings.length > 0) {
      warning(`\n⚠️  Found ${warnings.length} warning(s):`);
      warnings.forEach(w => warning(`   - ${w}`));
    }
  }
  
  return { templateName, issues, warnings };
}

// Main execution
if (templateName === 'all') {
  log('Verifying all templates...', 'blue');
  const templates = getAllTemplates();
  log(`Found ${templates.length} templates\n`, 'cyan');
  
  const results = [];
  templates.forEach(template => {
    const result = verifyTemplate(template);
    results.push(result);
  });
  
  // Overall summary
  log('\n' + '='.repeat(60), 'blue');
  log('Overall Summary:', 'blue');
  log('='.repeat(60), 'blue');
  
  const passed = results.filter(r => r.issues.length === 0);
  const failed = results.filter(r => r.issues.length > 0);
  
  success(`\n✅ ${passed.length} template(s) passed all checks`);
  if (failed.length > 0) {
    error(`❌ ${failed.length} template(s) have issues:`);
    failed.forEach(r => {
      error(`   - ${r.templateName} (${r.issues.length} issue(s))`);
    });
  }
  
  process.exit(failed.length > 0 ? 1 : 0);
} else {
  const result = verifyTemplate(templateName);
  process.exit(result.issues.length > 0 ? 1 : 0);
}

