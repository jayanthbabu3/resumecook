/**
 * Swiss Minimal Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { SwissMinimalTemplate } from './component';
import { mockData } from './mockData';

export const swissMinimalTemplate: TemplateDefinition = {
  id: 'swiss-minimal-v2',
  config,
  component: SwissMinimalTemplate,
  mockData,
  meta: {
    name: 'Swiss Minimal',
    description: 'Swiss design with bold typography and geometric accents',
    category: 'minimal',
    tags: ['minimal', 'swiss', 'bold', 'geometric', 'modern', 'clean'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { SwissMinimalTemplate } from './component';
export { mockData } from './mockData';

export default swissMinimalTemplate;
