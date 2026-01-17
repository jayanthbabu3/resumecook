/**
 * Professional Compact Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ProfessionalCompactTemplate } from './component';
import { mockData } from './mockData';

export const professionalCompactTemplate: TemplateDefinition = {
  id: 'professional-compact-v2',
  config,
  component: ProfessionalCompactTemplate,
  mockData,
  meta: {
    name: 'Professional Compact',
    description: 'Clean professional layout with integrated header summary and accent contact bar',
    category: 'professional',
    tags: ['professional', 'compact', 'clean', 'minimal', 'business', 'executive'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { ProfessionalCompactTemplate } from './component';
export { mockData } from './mockData';

export default professionalCompactTemplate;
