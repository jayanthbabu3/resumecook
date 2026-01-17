/**
 * Creative Starter Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { CreativeStarterTemplate } from './component';
import { mockData } from './mockData';

export const creativeStarterTemplate: TemplateDefinition = {
  id: 'creative-starter-v2',
  config,
  component: CreativeStarterTemplate,
  mockData,
  meta: {
    name: 'Creative Starter',
    description: 'Modern creative layout with vibrant gradient header and decorative elements',
    category: 'creative',
    tags: ['creative', 'modern', 'gradient', 'colorful', 'designer', 'photo'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { CreativeStarterTemplate } from './component';
export { mockData } from './mockData';

export default creativeStarterTemplate;
