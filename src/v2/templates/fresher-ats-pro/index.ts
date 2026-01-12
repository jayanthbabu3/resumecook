import type { TemplateDefinition } from '../types';
import { fresherAtsProConfig as config } from './config';
import { FresherAtsProTemplate } from './component';
import { mockData } from './mockData';

export const fresherAtsProTemplate: TemplateDefinition = {
  id: 'fresher-ats-pro-v2',
  config,
  component: FresherAtsProTemplate,
  mockData,
  meta: {
    name: 'Fresher ATS Pro',
    description: 'Highly ATS-optimized resume with category skills, thick underlines, and grid projects',
    category: 'professional',
    tags: ['fresher', 'graduate', 'ats', 'professional', 'single-column', 'optimized'],
    featured: false,
    version: '2.0.0',
  },
};

export { fresherAtsProConfig as config } from './config';
export { FresherAtsProTemplate } from './component';
export { mockData } from './mockData';
export default fresherAtsProTemplate;
