/**
 * System Architect Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { SystemArchitectTemplate } from './component';
import { mockData } from './mockData';

export const systemArchitectTemplate: TemplateDefinition = {
  id: 'system-architect-v2',
  config,
  component: SystemArchitectTemplate,
  mockData,
  meta: {
    name: 'System Architect',
    description: 'Banner-led two-column layout for senior system architects.',
    category: 'professional',
    tags: ['two-column', 'architecture', 'executive', 'banner'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { SystemArchitectTemplate } from './component';
export { mockData } from './mockData';

export default systemArchitectTemplate;
