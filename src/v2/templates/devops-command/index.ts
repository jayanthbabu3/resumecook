/**
 * DevOps Command Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { DevopsCommandTemplate } from './component';
import { mockData } from './mockData';

export const devopsCommandTemplate: TemplateDefinition = {
  id: 'devops-command-v2',
  config,
  component: DevopsCommandTemplate,
  mockData,
  meta: {
    name: 'DevOps Command',
    description: 'Contrast-heavy two-column layout for DevOps leadership.',
    category: 'modern',
    tags: ['two-column', 'devops', 'dark-sidebar', 'modern'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { DevopsCommandTemplate } from './component';
export { mockData } from './mockData';

export default devopsCommandTemplate;
