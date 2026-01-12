import type { TemplateDefinition } from '../types';
import { fresherCreativeCardConfig as config } from './config';
import { FresherCreativeCardTemplate } from './component';
import { mockData } from './mockData';

export const fresherCreativeCardTemplate: TemplateDefinition = {
  id: 'fresher-creative-card-v2',
  config,
  component: FresherCreativeCardTemplate,
  mockData,
  meta: {
    name: 'Fresher Creative Card',
    description: 'Modern creative resume with card-based header, bordered skills, and accent styling',
    category: 'creative',
    tags: ['fresher', 'graduate', 'creative', 'modern', 'card', 'designer', 'tech', 'single-column'],
    featured: true,
    version: '2.0.0',
  },
};

export { fresherCreativeCardConfig as config } from './config';
export { FresherCreativeCardTemplate } from './component';
export { mockData } from './mockData';
export default fresherCreativeCardTemplate;
