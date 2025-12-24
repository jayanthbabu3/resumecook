import type { TemplateDefinition } from '../types';
import { fresherClassicConfig as config } from './config';
import { FresherClassicTemplate } from './component';
import { mockData } from './mockData';

export const fresherClassicTemplate: TemplateDefinition = {
  id: 'fresher-classic-v2',
  config,
  component: FresherClassicTemplate,
  mockData,
  meta: {
    name: 'Fresher Classic',
    description: 'Classic single-column layout with traditional styling',
    category: 'professional',
    tags: ['fresher', 'graduate', 'single-column', 'classic', 'traditional'],
    featured: false,
    version: '2.0.0',
  },
};

export { fresherClassicConfig as config } from './config';
export { FresherClassicTemplate } from './component';
export { mockData } from './mockData';
export default fresherClassicTemplate;
