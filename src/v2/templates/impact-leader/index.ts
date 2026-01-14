/**
 * Impact Leader Template
 *
 * Complete template definition with config, component, and mock data.
 * A modern, ATS-friendly design for executives and senior professionals.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ImpactLeaderTemplate } from './component';
import { mockData } from './mockData';

export const impactLeaderTemplate: TemplateDefinition = {
  id: 'impact-leader-v2',
  config,
  component: ImpactLeaderTemplate,
  mockData,
  meta: {
    name: 'Impact Leader',
    description: 'Modern ATS-friendly template for executives and senior professionals',
    category: 'professional',
    tags: ['ats-friendly', 'executive', 'professional', 'modern', 'single-column', 'leadership'],
    featured: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { ImpactLeaderTemplate } from './component';
export { mockData } from './mockData';

export default impactLeaderTemplate;
