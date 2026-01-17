/**
 * Clean Minimal Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { CleanMinimalTemplate } from './component';
import { mockData } from './mockData';

export const cleanMinimalTemplate: TemplateDefinition = {
  id: 'clean-minimal-v2',
  config,
  component: CleanMinimalTemplate,
  mockData,
  meta: {
    name: 'Clean Minimal',
    description: 'Ultra-clean minimal resume with maximum whitespace and readability',
    category: 'minimal',
    tags: ['minimal', 'clean', 'simple', 'modern', 'professional', 'ats-friendly'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { CleanMinimalTemplate } from './component';
export { mockData } from './mockData';

export default cleanMinimalTemplate;
