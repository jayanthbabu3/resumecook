/**
 * Fresher Starter Template
 * 
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { fresherStarterConfig as config } from './config';
import { FresherStarterTemplate } from './component';
import { mockData } from './mockData';

export const fresherStarterTemplate: TemplateDefinition = {
  id: 'fresher-starter-v2',
  config,
  component: FresherStarterTemplate,
  mockData,
  meta: {
    name: 'Fresher Starter',
    description: 'Clean single-column layout perfect for fresh graduates',
    category: 'professional',
    tags: ['fresher', 'graduate', 'single-column', 'clean', 'entry-level'],
    featured: true,
    version: '2.0.0',
  },
};

export { fresherStarterConfig as config } from './config';
export { FresherStarterTemplate } from './component';
export { mockData } from './mockData';

export default fresherStarterTemplate;
