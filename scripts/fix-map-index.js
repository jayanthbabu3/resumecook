/**
 * Fix Map Index Issues
 * 
 * This script fixes templates where .map((exp) => ...) is used but index is referenced.
 * Changes .map((exp) => to .map((exp, index) =>
 * 
 * Run: node scripts/fix-map-index.js
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

templateFiles.forEach(filename => {
  const filePath = path.join(TEMPLATES_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  
  // Pattern 1: .map((exp) => where index is used later
  // Fix: .map((exp) => to .map((exp, index) =>
  
  // Check if file uses experienceIndex={index} but has .map((exp) =>
  if (content.includes('experienceIndex={index}')) {
    // Fix experience.map((exp) => to experience.map((exp, index) =>
    content = content.replace(
      /\.experience\.map\(\(exp\)\s*=>/g,
      '.experience.map((exp, index) =>'
    );
    
    // Also fix education.map((edu) => if needed
    content = content.replace(
      /\.education\.map\(\(edu\)\s*=>/g,
      '.education.map((edu, index) =>'
    );
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${filename}: Fixed`);
    fixed++;
  }
});

console.log(`\n✅ Fixed: ${fixed} templates`);
