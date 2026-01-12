/**
 * Project Manager Pro Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ProjectManagerProTemplate } from './component';
import { mockData } from './mockData';

export const projectManagerProTemplate: TemplateDefinition = {
  id: 'project-manager-pro-v2',
  config,
  component: ProjectManagerProTemplate,
  mockData,
  meta: {
    name: 'Project Manager Pro',
    description: 'Clean professional layout with accent bar, perfect for project managers and corporate roles',
    category: 'professional',
    tags: ['project-manager', 'corporate', 'professional', 'single-column', 'ats-friendly'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { ProjectManagerProTemplate } from './component';
export { mockData } from './mockData';

export default projectManagerProTemplate;
