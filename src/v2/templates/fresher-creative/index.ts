import type { TemplateDefinition } from '../types';
import { fresherCreativeConfig as config } from './config';
import { FresherCreativeTemplate } from './component';
import { mockData } from './mockData';

export const fresherCreativeTemplate: TemplateDefinition = {
  id: 'fresher-creative-v2',
  config,
  component: FresherCreativeTemplate,
  mockData,
  meta: {
    name: 'Fresher Creative',
    description: 'Creative layout with colorful accents for design-oriented freshers',
    category: 'creative',
    tags: ['fresher', 'graduate', 'two-column', 'creative', 'colorful'],
    featured: true,
    version: '2.0.0',
  },
};

export { fresherCreativeConfig as config } from './config';
export { FresherCreativeTemplate } from './component';
export { mockData } from './mockData';
export default fresherCreativeTemplate;
