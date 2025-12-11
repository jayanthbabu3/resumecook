/**
 * Executive Split Template
 * 
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ExecutiveSplitTemplate } from './component';
import { mockData } from './mockData';

export const executiveSplitTemplate: TemplateDefinition = {
  id: 'executive-split-v2',
  config,
  component: ExecutiveSplitTemplate,
  mockData,
  meta: {
    name: 'Executive Split',
    description: 'Professional two-column layout ideal for experienced professionals',
    category: 'professional',
    tags: ['two-column', 'executive', 'professional', 'sidebar'],
    featured: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { ExecutiveSplitTemplate } from './component';
export { mockData } from './mockData';

export default executiveSplitTemplate;
