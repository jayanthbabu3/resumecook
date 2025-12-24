/**
 * Mobile Craft Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { MobileCraftTemplate } from './component';
import { mockData } from './mockData';

export const mobileCraftTemplate: TemplateDefinition = {
  id: 'mobile-craft-v2',
  config,
  component: MobileCraftTemplate,
  mockData,
  meta: {
    name: 'Mobile Craft',
    description: 'Minimal layout with lively accents for mobile engineers.',
    category: 'minimal',
    tags: ['single-column', 'minimal', 'mobile', 'clean'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { MobileCraftTemplate } from './component';
export { mockData } from './mockData';

export default mobileCraftTemplate;
