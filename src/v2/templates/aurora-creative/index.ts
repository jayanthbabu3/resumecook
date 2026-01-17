/**
 * Aurora Creative Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { AuroraCreativeTemplate } from './component';
import { mockData } from './mockData';

export const auroraCreativeTemplate: TemplateDefinition = {
  id: 'aurora-creative-v2',
  config,
  component: AuroraCreativeTemplate,
  mockData,
  meta: {
    name: 'Aurora Creative',
    description: 'Stunning aurora-inspired design with glass morphism effects',
    category: 'creative',
    tags: ['creative', 'modern', 'gradient', 'glass', 'aurora', 'designer', 'photo'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { AuroraCreativeTemplate } from './component';
export { mockData } from './mockData';

export default auroraCreativeTemplate;
