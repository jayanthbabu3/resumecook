import type { TemplateDefinition } from '../types';
import { fresherCompactConfig as config } from './config';
import { FresherCompactTemplate } from './component';
import { mockData } from './mockData';

export const fresherCompactTemplate: TemplateDefinition = {
  id: 'fresher-compact-v2',
  config,
  component: FresherCompactTemplate,
  mockData,
  meta: {
    name: 'Fresher Compact',
    description: 'Compact two-column layout maximizing content density',
    category: 'professional',
    tags: ['fresher', 'graduate', 'two-column', 'compact', 'dense'],
    featured: false,
    version: '2.0.0',
  },
};

export { fresherCompactConfig as config } from './config';
export { FresherCompactTemplate } from './component';
export { mockData } from './mockData';
export default fresherCompactTemplate;
