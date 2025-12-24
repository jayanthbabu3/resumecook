import type { TemplateDefinition } from '../types';
import { fresherMinimalConfig as config } from './config';
import { FresherMinimalTemplate } from './component';
import { mockData } from './mockData';

export const fresherMinimalTemplate: TemplateDefinition = {
  id: 'fresher-minimal-v2',
  config,
  component: FresherMinimalTemplate,
  mockData,
  meta: {
    name: 'Fresher Minimal',
    description: 'Ultra-clean minimal layout focused on content',
    category: 'minimal',
    tags: ['fresher', 'graduate', 'single-column', 'minimal', 'clean'],
    featured: false,
    version: '2.0.0',
  },
};

export { fresherMinimalConfig as config } from './config';
export { FresherMinimalTemplate } from './component';
export { mockData } from './mockData';
export default fresherMinimalTemplate;
