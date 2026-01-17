/**
 * Refined Serif Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { RefinedSerifTemplate } from './component';
import { mockData } from './mockData';

export const refinedSerifTemplate: TemplateDefinition = {
  id: 'refined-serif-v2',
  config,
  component: RefinedSerifTemplate,
  mockData,
  meta: {
    name: 'Refined Serif',
    description: 'Elegant serif typography with thin line separators and classic aesthetic',
    category: 'minimal',
    tags: ['minimal', 'elegant', 'serif', 'classic', 'sophisticated', 'timeless'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { RefinedSerifTemplate } from './component';
export { mockData } from './mockData';

export default refinedSerifTemplate;
