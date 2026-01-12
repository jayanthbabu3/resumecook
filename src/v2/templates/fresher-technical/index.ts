import type { TemplateDefinition } from '../types';
import { fresherTechnicalConfig as config } from './config';
import { FresherTechnicalTemplate } from './component';
import { mockData } from './mockData';

export const fresherTechnicalTemplate: TemplateDefinition = {
  id: 'fresher-technical-v2',
  config,
  component: FresherTechnicalTemplate,
  mockData,
  meta: {
    name: 'Fresher Technical',
    description: 'Professional technical resume with skills table, grid projects, and dark section headers',
    category: 'modern',
    tags: ['fresher', 'graduate', 'technical', 'developer', 'engineer', 'cs', 'it', 'single-column'],
    featured: false,
    version: '2.0.0',
  },
};

export { fresherTechnicalConfig as config } from './config';
export { FresherTechnicalTemplate } from './component';
export { mockData } from './mockData';
export default fresherTechnicalTemplate;
