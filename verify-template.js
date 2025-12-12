/**
 * Verification script for Professional Standard Template
 * Checks that the template is properly registered and configured
 */

// Import the registry
const { V2_TEMPLATE_REGISTRY } = require('./dist/v2/templates/index.js');

console.log('🔍 Verifying Professional Standard Template...\n');

const templateId = 'professional-standard-v2';
const template = V2_TEMPLATE_REGISTRY[templateId];

if (!template) {
  console.error('❌ ERROR: Template not found in registry!');
  process.exit(1);
}

console.log('✅ Template found in registry');
console.log(`   ID: ${template.id}`);
console.log(`   Name: ${template.name || template.config.name}`);
console.log(`   Description: ${template.config.description}`);
console.log('');

// Check config
if (!template.config) {
  console.error('❌ ERROR: Template config missing!');
  process.exit(1);
}
console.log('✅ Template config exists');
console.log(`   Layout: ${template.config.layout.type}`);
console.log(`   Primary Color: ${template.config.colors.primary}`);
console.log(`   Sections: ${template.config.sections.length}`);
console.log('');

// Check component
if (!template.component) {
  console.error('❌ ERROR: Template component missing!');
  process.exit(1);
}
console.log('✅ Template component exists');
console.log('');

// Check mock data
if (!template.mockData) {
  console.error('❌ ERROR: Template mock data missing!');
  process.exit(1);
}
console.log('✅ Template mock data exists');
console.log(`   Name: ${template.mockData.personalInfo.name}`);
console.log(`   Title: ${template.mockData.personalInfo.title}`);
console.log(`   Experience Items: ${template.mockData.experience.length}`);
console.log(`   Skills: ${template.mockData.skills.length}`);
console.log('');

// Check meta
if (!template.meta) {
  console.error('⚠️  WARNING: Template meta missing (optional)');
} else {
  console.log('✅ Template metadata exists');
  console.log(`   Category: ${template.meta.category}`);
  console.log(`   Tags: ${template.meta.tags.join(', ')}`);
  console.log(`   Features: ${template.meta.features.length}`);
}
console.log('');

console.log('🎉 All checks passed! Professional Standard Template is ready to use.');
console.log('');
console.log('📍 Access the template at:');
console.log('   http://localhost:8081/v2/builder?template=professional-standard-v2');
console.log('');
