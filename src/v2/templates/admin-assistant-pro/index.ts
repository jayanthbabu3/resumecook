/**
 * Admin Assistant Pro Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { AdminAssistantProTemplate } from './component';
import { mockData } from './mockData';

export const adminAssistantProTemplate: TemplateDefinition = {
  id: 'admin-assistant-pro-v2',
  config,
  component: AdminAssistantProTemplate,
  mockData,
  meta: {
    name: 'Admin Assistant Pro',
    description: 'Professional two-column layout with golden accent, perfect for administrative roles',
    category: 'professional',
    tags: ['administrative', 'professional', 'two-column', 'ats-friendly'],
    featured: false,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { AdminAssistantProTemplate } from './component';
export { mockData } from './mockData';

export default adminAssistantProTemplate;
