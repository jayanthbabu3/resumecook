/**
 * Minimal Template
 * 
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { MinimalTemplate } from './component';
import { mockData } from './mockData';

export const minimalTemplate: TemplateDefinition = {
  id: 'minimal-v2',
  config,
  component: MinimalTemplate,
  mockData,
  meta: {
    name: 'Minimal',
    description: 'Clean single-column layout with minimal styling',
    category: 'minimal',
    tags: ['single-column', 'clean', 'simple', 'modern'],
    featured: false,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { MinimalTemplate } from './component';
export { mockData } from './mockData';

export default minimalTemplate;
