import type { TemplateDefinition } from '../types';
import { fresherBoldConfig as config } from './config';
import { FresherBoldTemplate } from './component';
import { mockData } from './mockData';

export const fresherBoldTemplate: TemplateDefinition = {
  id: 'fresher-bold-v2',
  config,
  component: FresherBoldTemplate,
  mockData,
  meta: {
    name: 'Fresher Bold',
    description: 'Bold two-column layout with strong visual hierarchy',
    category: 'modern',
    tags: ['fresher', 'graduate', 'two-column', 'bold', 'impactful'],
    featured: false,
    version: '2.0.0',
  },
};

export { fresherBoldConfig as config } from './config';
export { FresherBoldTemplate } from './component';
export { mockData } from './mockData';
export default fresherBoldTemplate;
