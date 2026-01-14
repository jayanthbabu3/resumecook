/**
 * HR Professional Template
 *
 * Professional template for HR and people operations specialists.
 * Features gradient banner header, skills pills, and teal/blue accent color scheme.
 */

import type { TemplateDefinition } from '../types';
import { HRProfessionalTemplate } from './component';
import { hrProfessionalConfig } from './config';
import { hrProfessionalMockData } from './mockData';

export const hrProfessionalTemplate: TemplateDefinition = {
  id: 'hr-professional-v2',
  component: HRProfessionalTemplate,
  config: hrProfessionalConfig,
  mockData: hrProfessionalMockData,
  meta: {
    name: 'HR Professional',
    description: 'Professional template for HR and people operations specialists',
    category: 'professional',
    tags: ['hr', 'human-resources', 'recruiting', 'professional', 'people-ops'],
    preview: '/templates/hr-professional-preview.png',
    featured: true,
  },
};

export { HRProfessionalTemplate } from './component';
export { hrProfessionalConfig } from './config';
export { hrProfessionalMockData } from './mockData';
