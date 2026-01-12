/**
 * Professional Blue Template
 * 
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ProfessionalBlueTemplate } from './component';
import { mockData } from './mockData';

export const professionalBlueTemplate: TemplateDefinition = {
  id: 'professional-blue-v2',
  config,
  component: ProfessionalBlueTemplate,
  mockData,
  meta: {
    name: 'Professional Blue',
    description: 'Clean professional design with blue accent and centered headers',
    category: 'professional',
    tags: ['single-column', 'professional', 'blue', 'corporate', 'clean'],
    featured: true,
    version: '2.0.0',
  },
};

export { config } from './config';
export { ProfessionalBlueTemplate } from './component';
export { mockData } from './mockData';

export default professionalBlueTemplate;
