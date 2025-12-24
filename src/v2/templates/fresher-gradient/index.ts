import type { TemplateDefinition } from '../types';
import { fresherGradientConfig as config } from './config';
import { FresherGradientTemplate } from './component';
import { mockData } from './mockData';

export const fresherGradientTemplate: TemplateDefinition = {
  id: 'fresher-gradient-v2',
  config,
  component: FresherGradientTemplate,
  mockData,
  meta: {
    name: 'Fresher Gradient',
    description: 'Modern layout with gradient header for freshers',
    category: 'modern',
    tags: ['fresher', 'graduate', 'two-column', 'gradient', 'colorful'],
    featured: false,
    version: '2.0.0',
  },
};

export { fresherGradientConfig as config } from './config';
export { FresherGradientTemplate } from './component';
export { mockData } from './mockData';
export default fresherGradientTemplate;
