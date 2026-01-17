/**
 * Ink Blot Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { InkBlotTemplate } from './component';
import { mockData } from './mockData';

export const inkBlotTemplate: TemplateDefinition = {
  id: 'ink-blot-v2',
  config,
  component: InkBlotTemplate,
  mockData,
  meta: {
    name: 'Ink Blot',
    description: 'Modern minimal with circular accent blob and clean typography',
    category: 'minimal',
    tags: ['minimal', 'modern', 'creative', 'clean', 'developer', 'tech'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { InkBlotTemplate } from './component';
export { mockData } from './mockData';

export default inkBlotTemplate;
