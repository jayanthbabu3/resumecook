/**
 * Dot Grid Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { DotGridTemplate } from './component';
import { mockData } from './mockData';

export const dotGridTemplate: TemplateDefinition = {
  id: 'dot-grid-v2',
  config,
  component: DotGridTemplate,
  mockData,
  meta: {
    name: 'Dot Grid',
    description: 'Modern minimal with subtle dot grid pattern accent and clean typography',
    category: 'minimal',
    tags: ['minimal', 'modern', 'clean', 'professional', 'developer', 'tech'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { DotGridTemplate } from './component';
export { mockData } from './mockData';

export default dotGridTemplate;
