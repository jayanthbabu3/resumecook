/**
 * Geometric Bold Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { GeometricBoldTemplate } from './component';
import { mockData } from './mockData';

export const geometricBoldTemplate: TemplateDefinition = {
  id: 'geometric-bold-v2',
  config,
  component: GeometricBoldTemplate,
  mockData,
  meta: {
    name: 'Geometric Bold',
    description: 'Bold geometric design with angular shapes and striking visual hierarchy',
    category: 'creative',
    tags: ['creative', 'bold', 'geometric', 'angular', 'modern', 'photo'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { GeometricBoldTemplate } from './component';
export { mockData } from './mockData';

export default geometricBoldTemplate;
