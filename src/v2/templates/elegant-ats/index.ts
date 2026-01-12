/**
 * Elegant ATS Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ElegantAtsTemplate } from './component';
import { mockData } from './mockData';

export const elegantAtsTemplate: TemplateDefinition = {
  id: 'elegant-ats-v2',
  config,
  component: ElegantAtsTemplate,
  mockData,
  meta: {
    name: 'Elegant ATS',
    description: 'ATS-friendly two-column design with a refined sidebar and clear hierarchy',
    category: 'professional',
    tags: ['ats', 'two-column', 'professional', 'modern'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { ElegantAtsTemplate } from './component';
export { mockData } from './mockData';

export default elegantAtsTemplate;
