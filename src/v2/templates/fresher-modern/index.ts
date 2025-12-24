import type { TemplateDefinition } from '../types';
import { fresherModernConfig as config } from './config';
import { FresherModernTemplate } from './component';
import { mockData } from './mockData';

export const fresherModernTemplate: TemplateDefinition = {
  id: 'fresher-modern-v2',
  config,
  component: FresherModernTemplate,
  mockData,
  meta: {
    name: 'Fresher Modern',
    description: 'Modern two-column layout with sidebar for freshers',
    category: 'modern',
    tags: ['fresher', 'graduate', 'two-column', 'modern', 'sidebar'],
    featured: true,
    version: '2.0.0',
  },
};

export { fresherModernConfig as config } from './config';
export { FresherModernTemplate } from './component';
export { mockData } from './mockData';
export default fresherModernTemplate;
