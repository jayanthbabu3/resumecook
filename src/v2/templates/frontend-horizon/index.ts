/**
 * Frontend Horizon Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { FrontendHorizonTemplate } from './component';
import { mockData } from './mockData';

export const frontendHorizonTemplate: TemplateDefinition = {
  id: 'frontend-horizon-v2',
  config,
  component: FrontendHorizonTemplate,
  mockData,
  meta: {
    name: 'Frontend Horizon',
    description: 'Banner-led layout with modern spacing for frontend engineers.',
    category: 'modern',
    tags: ['single-column', 'banner', 'frontend', 'modern'],
    featured: false,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { FrontendHorizonTemplate } from './component';
export { mockData } from './mockData';

export default frontendHorizonTemplate;
