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
  
  // 7.5. Check Education section completeness
  log('\n🎓 Education Section Completeness:', 'cyan');
  if (templateContent.includes('education') || templateContent.includes('Education')) {
    // Check for all required fields
    const educationChecks = [
      { pattern: 'edu.degree|education.*degree', name: 'Degree field' },
      { pattern: 'edu.field|education.*field', name: 'Field of Study field' },
      { pattern: 'edu.school|education.*school', name: 'School field' },
      { pattern: 'edu.gpa|education.*gpa', name: 'GPA field' },
      { pattern: 'edu.startDate|education.*startDate', name: 'Start Date field' },
      { pattern: 'edu.endDate|education.*endDate', name: 'End Date field' },
    ];
    
    educationChecks.forEach(check => {
      const regex = new RegExp(check.pattern, 'i');
      if (regex.test(templateContent)) {
        success(`${check.name} found`);
      } else {
        if (check.name === 'GPA field' || check.name === 'Field of Study field') {
          warning(`${check.name} not found (optional but should render if exists)`);
          warnings.push(`Education section may not display ${check.name}`);
        } else {
          error(`${check.name} missing`);
          issues.push(`Education section missing: ${check.name}`);
        }
      }
    });
    
    // Check if education uses InlineEditableDate for dates (not raw dates)
    if (templateContent.includes('education') && templateContent.includes('InlineEditableDate')) {
      success('Education dates use InlineEditableDate');
    } else if (templateContent.includes('education') && !templateContent.includes('InlineEditableDate')) {
      // Check if dates are formatted (not raw)
      if (templateContent.includes('formatDate') && templateContent.includes('edu.startDate') && templateContent.includes('edu.endDate')) {
        warning('Education dates may not be editable (check if using InlineEditableDate)');
        warnings.push('Education dates should use InlineEditableDate for editability');
      } else {
        error('Education dates not using InlineEditableDate or formatDate');
        issues.push('Education dates must use InlineEditableDate with formatDate');
      }
    }
    
    // Check if education uses InlineEditableList
    if (templateContent.includes('InlineEditableList') && templateContent.includes('path="education"') || templateContent.includes("path='education'")) {
      success('Education uses InlineEditableList for editability');
    } else {
      warning('Education may not use InlineEditableList (check editable mode)');
      warnings.push('Education section should use InlineEditableList for editability');
    }
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
    
    // Check if PDF education section has all fields
    if (pdfContent.includes('education') || pdfContent.includes('Education')) {
      const pdfEducationChecks = [
        { pattern: 'edu\\.degree|education.*degree', name: 'Degree in PDF' },
        { pattern: 'edu\\.field|education.*field', name: 'Field in PDF' },
        { pattern: 'edu\\.gpa|education.*gpa', name: 'GPA in PDF' },
        { pattern: 'formatDate.*startDate|startDate.*formatDate', name: 'Start Date formatting in PDF' },
        { pattern: 'formatDate.*endDate|endDate.*formatDate', name: 'End Date formatting in PDF' },
      ];
      
      pdfEducationChecks.forEach(check => {
        const regex = new RegExp(check.pattern, 'i');
        if (regex.test(pdfContent)) {
          success(`${check.name} found`);
        } else {
          if (check.name === 'GPA in PDF' || check.name === 'Field in PDF') {
            warning(`${check.name} not found (optional but should render if exists)`);
            warnings.push(`PDF education section may not display ${check.name}`);
          } else {
            error(`${check.name} missing`);
            issues.push(`PDF education section missing: ${check.name}`);
          }
        }
      });
    }
  }
  
  // 8.5. Check Font Sizes & Spacing Standards
  log('\n📏 Font Sizes & Spacing Standards:', 'cyan');
  
  // UI Template Font Size Checks
  const uiFontSizeChecks = [
    { pattern: 'text-4xl|text-\\[36px\\]', name: 'Full Name (text-4xl / 36px)', element: 'name' },
    { pattern: 'text-base|text-\\[16px\\]', name: 'Title/Position/Degree (text-base / 16px)', element: 'title/position/degree' },
    { pattern: 'text-sm|text-\\[14px\\]', name: 'Body Text/Company (text-sm / 14px)', element: 'body/company' },
    { pattern: 'text-xs|text-\\[12px\\]', name: 'Section Heading/Dates/Skills (text-xs / 12px)', element: 'section/dates/skills' },
  ];
  
  uiFontSizeChecks.forEach(check => {
    const regex = new RegExp(check.pattern, 'g');
    const matches = templateContent.match(regex);
    if (matches && matches.length > 0) {
      success(`${check.name} found (${matches.length} occurrences)`);
    } else {
      warning(`${check.name} not found - may not follow standard`);
      warnings.push(`Font size standard not met: ${check.name}`);
    }
  });
  
  // UI Template Spacing Checks
  const uiSpacingChecks = [
    { pattern: 'mb-8|marginBottom.*32', name: 'Section spacing (mb-8 / 32px)', element: 'section' },
    { pattern: 'mb-5|marginBottom.*20', name: 'Section heading spacing (mb-5 / 20px)', element: 'heading' },
  ];
  
  uiSpacingChecks.forEach(check => {
    const regex = new RegExp(check.pattern, 'g');
    const matches = templateContent.match(regex);
    if (matches && matches.length > 0) {
      success(`${check.name} found (${matches.length} occurrences)`);
    } else {
      warning(`${check.name} not found - may not follow standard`);
      warnings.push(`Spacing standard not met: ${check.name}`);
    }
  });
  
  // PDF Template Font Size Checks
  if (pdfContent) {
    log('\n📏 PDF Font Sizes & Spacing:', 'cyan');
    
    const pdfFontSizeChecks = [
      { pattern: 'fontSize:\\s*26|fontSize:\\s*"26"|fontSize:\\s*\'26\'', name: 'Full Name (26px)', element: 'name' },
      { pattern: 'fontSize:\\s*11|fontSize:\\s*"11"|fontSize:\\s*\'11\'', name: 'Title/Position/Degree (11px)', element: 'title/position/degree' },
      { pattern: 'fontSize:\\s*10|fontSize:\\s*"10"|fontSize:\\s*\'10\'', name: 'Body Text/Company (10px)', element: 'body/company' },
      { pattern: 'fontSize:\\s*9|fontSize:\\s*"9"|fontSize:\\s*\'9\'', name: 'Dates/Skills (9px)', element: 'dates/skills' },
    ];
    
    pdfFontSizeChecks.forEach(check => {
      const regex = new RegExp(check.pattern, 'g');
      const matches = pdfContent.match(regex);
      if (matches && matches.length > 0) {
        success(`${check.name} found (${matches.length} occurrences)`);
      } else {
        warning(`${check.name} not found - may not follow standard`);
        warnings.push(`PDF font size standard not met: ${check.name}`);
      }
    });
    
    // PDF Template Spacing Checks
    const pdfSpacingChecks = [
      { pattern: 'marginBottom:\\s*20|marginBottom:\\s*"20"|marginBottom:\\s*\'20\'', name: 'Section spacing (20px)', element: 'section' },
      { pattern: 'marginBottom:\\s*15|marginBottom:\\s*"15"|marginBottom:\\s*\'15\'', name: 'Section heading spacing (15px)', element: 'heading' },
    ];
    
    pdfSpacingChecks.forEach(check => {
      const regex = new RegExp(check.pattern, 'g');
      const matches = pdfContent.match(regex);
      if (matches && matches.length > 0) {
        success(`${check.name} found (${matches.length} occurrences)`);
      } else {
        warning(`${check.name} not found - may not follow standard`);
        warnings.push(`PDF spacing standard not met: ${check.name}`);
      }
    });
    
    // Check for section heading font size consistency
    if (pdfContent.includes('sectionTitle') || pdfContent.includes('section_title')) {
      const sectionTitleMatch = pdfContent.match(/sectionTitle[^}]*fontSize:\s*(\d+)/);
      if (sectionTitleMatch) {
        const fontSize = parseInt(sectionTitleMatch[1]);
        if (fontSize === 10) {
          success('Section heading font size is standard (10px)');
        } else {
          warning(`Section heading font size is ${fontSize}px (expected 10px)`);
          warnings.push(`PDF section heading font size should be 10px, found ${fontSize}px`);
        }
      }
    }
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
  
  // Check Contact Information icons (prohibit emoji, require SVG)
  log('\n📞 Contact Information Icons:', 'cyan');
  const hasContactInfo = templateContent.includes('personalInfo.email') || 
                        templateContent.includes('personalInfo.phone') || 
                        templateContent.includes('personalInfo.location');
  
  if (hasContactInfo) {
    if (templateContent.includes('✉') || templateContent.includes('☎') || templateContent.includes('📍')) {
      error('Contact icons using emoji characters - must use SVG icons');
      issues.push('Contact information must use SVG icons instead of emoji characters');
    } else if (templateContent.includes('<svg')) {
      success('Contact information uses SVG icons');
    } else {
      info('Contact information displayed without icons (minimal design)');
    }
  } else {
    info('Contact information not displayed in template header');
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

