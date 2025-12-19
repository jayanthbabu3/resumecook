/**
 * Refined Portrait Template
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { RefinedPortraitTemplate } from './component';
import { mockData } from './mockData';

export const refinedPortraitTemplate: TemplateDefinition = {
  id: 'refined-portrait-v2',
  config,
  component: RefinedPortraitTemplate,
  mockData,
  meta: {
    name: 'Refined Portrait',
    description: 'Warm, centered portrait layout with clean single-column flow',
    category: 'professional',
    tags: ['photo', 'single-column', 'ats-friendly', 'professional'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

export { config } from './config';
export { RefinedPortraitTemplate } from './component';
export { mockData } from './mockData';

export default refinedPortraitTemplate;
