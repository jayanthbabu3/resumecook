/**
 * Backend Precision Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { BackendPrecisionTemplate } from './component';
import { mockData } from './mockData';

export const backendPrecisionTemplate: TemplateDefinition = {
  id: 'backend-precision-v2',
  config,
  component: BackendPrecisionTemplate,
  mockData,
  meta: {
    name: 'Backend Precision',
    description: 'Two-column layout tuned for backend engineering roles.',
    category: 'professional',
    tags: ['two-column', 'backend', 'technical', 'structured'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { BackendPrecisionTemplate } from './component';
export { mockData } from './mockData';

export default backendPrecisionTemplate;
