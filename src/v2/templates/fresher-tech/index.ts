import type { TemplateDefinition } from '../types';
import { fresherTechConfig as config } from './config';
import { FresherTechTemplate } from './component';
import { mockData } from './mockData';

export const fresherTechTemplate: TemplateDefinition = {
  id: 'fresher-tech-v2',
  config,
  component: FresherTechTemplate,
  mockData,
  meta: {
    name: 'Fresher Tech',
    description: 'Tech-focused layout with dark header for IT freshers',
    category: 'modern',
    tags: ['fresher', 'graduate', 'single-column', 'tech', 'developer'],
    featured: true,
    version: '2.0.0',
  },
};

export { fresherTechConfig as config } from './config';
export { FresherTechTemplate } from './component';
export { mockData } from './mockData';
export default fresherTechTemplate;
