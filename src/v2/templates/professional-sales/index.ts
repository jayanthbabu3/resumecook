/**
 * Professional Sales Template
 * 
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ProfessionalSalesTemplate } from './component';
import { mockData } from './mockData';

export const professionalSalesTemplate: TemplateDefinition = {
  id: 'professional-sales-v2',
  config,
  component: ProfessionalSalesTemplate,
  mockData,
  meta: {
    name: 'Professional Sales',
    description: 'Clean single-column layout with progress bars for skills and languages',
    category: 'professional',
    tags: ['single-column', 'sales', 'professional', 'progress-bars'],
    featured: false,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { ProfessionalSalesTemplate } from './component';
export { mockData } from './mockData';

export default professionalSalesTemplate;

