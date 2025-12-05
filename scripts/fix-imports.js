/**
 * Fix Missing Imports
 * 
 * This script adds missing ExperienceBulletPoints import to templates that use it.
 * 
 * Run: node scripts/fix-imports.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../src/components/resume/templates');

// Get all template files
const templateFiles = fs.readdirSync(TEMPLATES_DIR)
  .filter(f => f.endsWith('Template.tsx'));

let fixed = 0;
let skipped = 0;

templateFiles.forEach(filename => {
  const filePath = path.join(TEMPLATES_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if file uses ExperienceBulletPoints but doesn't import it
  const usesComponent = content.includes('ExperienceBulletPoints') && 
                        !content.includes('<ExperienceBulletPoints') === false;
  const hasImport = content.includes('import { ExperienceBulletPoints }') ||
                    content.includes('import {ExperienceBulletPoints}');
  
  if (content.includes('ExperienceBulletPoints') && !hasImport) {
    // Find the last import statement and add the import after it
    const importLine = 'import { ExperienceBulletPoints } from "@/components/resume/ExperienceBulletPoints";';
    
    // Find InlineEditableSkills import and add after it
    const skillsImportRegex = /import \{ InlineEditableSkills \} from [^;]+;/;
    const match = content.match(skillsImportRegex);
    
    if (match) {
      const insertPos = match.index + match[0].length;
      content = content.slice(0, insertPos) + '\n' + importLine + content.slice(insertPos);
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${filename}: Added import`);
      fixed++;
    } else {
      // Try to find InlineEditableList import
      const listImportRegex = /import \{ InlineEditableList \} from [^;]+;/;
      const listMatch = content.match(listImportRegex);
      
      if (listMatch) {
        const insertPos = listMatch.index + listMatch[0].length;
        content = content.slice(0, insertPos) + '\n' + importLine + content.slice(insertPos);
        fs.writeFileSync(filePath, content);
        console.log(`✅ ${filename}: Added import`);
        fixed++;
      } else {
        console.log(`⚠️  ${filename}: Could not find insertion point`);
        skipped++;
      }
    }
  } else if (hasImport) {
    console.log(`⏭️  ${filename}: Already has import`);
    skipped++;
  }
});

console.log(`\n✅ Fixed: ${fixed}`);
console.log(`⏭️  Skipped: ${skipped}`);
