/**
 * Fullstack Atlas Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { FullstackAtlasTemplate } from './component';
import { mockData } from './mockData';

export const fullstackAtlasTemplate: TemplateDefinition = {
  id: 'fullstack-atlas-v2',
  config,
  component: FullstackAtlasTemplate,
  mockData,
  meta: {
    name: 'Fullstack Atlas',
    description: 'Split header layout with balanced styling for full-stack engineers.',
    category: 'modern',
    tags: ['single-column', 'split-header', 'full-stack', 'modern'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { FullstackAtlasTemplate } from './component';
export { mockData } from './mockData';

export default fullstackAtlasTemplate;
