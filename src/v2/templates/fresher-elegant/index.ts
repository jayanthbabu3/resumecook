import type { TemplateDefinition } from '../types';
import { fresherElegantConfig as config } from './config';
import { FresherElegantTemplate } from './component';
import { mockData } from './mockData';

export const fresherElegantTemplate: TemplateDefinition = {
  id: 'fresher-elegant-v2',
  config,
  component: FresherElegantTemplate,
  mockData,
  meta: {
    name: 'Fresher Elegant',
    description: 'Elegant single-column layout with classic typography',
    category: 'professional',
    tags: ['fresher', 'graduate', 'single-column', 'elegant', 'serif'],
    featured: false,
    version: '2.0.0',
  },
};

export { fresherElegantConfig as config } from './config';
export { FresherElegantTemplate } from './component';
export { mockData } from './mockData';
export default fresherElegantTemplate;
