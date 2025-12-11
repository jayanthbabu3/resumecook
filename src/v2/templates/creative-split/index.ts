/**
 * Creative Split Template
 * 
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { CreativeSplitTemplate } from './component';
import { mockData } from './mockData';

export const creativeSplitTemplate: TemplateDefinition = {
  id: 'creative-split-v2',
  config,
  component: CreativeSplitTemplate,
  mockData,
  meta: {
    name: 'Creative Split',
    description: 'Bold two-column layout for creative professionals',
    category: 'creative',
    tags: ['two-column', 'creative', 'bold', 'modern'],
    featured: true,
    version: '2.0.0',
  },
};

export { config } from './config';
export { CreativeSplitTemplate } from './component';
export { mockData } from './mockData';

export default creativeSplitTemplate;
