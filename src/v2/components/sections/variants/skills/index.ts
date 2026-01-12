/**
 * Skills Section Variant Renderers
 * 
 * Exports all skill variant renderers and the main dispatcher.
 */

// Legacy exports (for backward compatibility)
export { SkillsPills } from './SkillsPills';
export { SkillsTags } from './SkillsTags';
export { SkillsBars } from './SkillsBars';
export { SkillsGrouped } from './SkillsGrouped';
export { SkillsInline } from './SkillsInline';

// Main renderer
export { SkillsVariantRenderer } from './SkillsVariantRenderer';
export type { SkillsVariantProps, SkillsVariant } from './types';
