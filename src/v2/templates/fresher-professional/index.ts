import type { TemplateDefinition } from '../types';
import { fresherProfessionalConfig as config } from './config';
import { FresherProfessionalTemplate } from './component';
import { mockData } from './mockData';

export const fresherProfessionalTemplate: TemplateDefinition = {
  id: 'fresher-professional-v2',
  config,
  component: FresherProfessionalTemplate,
  mockData,
  meta: {
    name: 'Fresher Professional',
    description: 'Professional single-column layout with clean structure',
    category: 'professional',
    tags: ['fresher', 'graduate', 'single-column', 'professional', 'clean'],
    featured: true,
    version: '2.0.0',
  },
};

export { fresherProfessionalConfig as config } from './config';
export { FresherProfessionalTemplate } from './component';
export { mockData } from './mockData';
export default fresherProfessionalTemplate;
