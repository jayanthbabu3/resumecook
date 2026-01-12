/**
 * Senior Frontend Pro Template
 */

import { SeniorFrontendProTemplate } from './component';
import { config } from './config';
import { mockData } from './mockData';
import type { TemplateDefinition } from '../types';

export const seniorFrontendProTemplate: TemplateDefinition = {
  id: 'senior-frontend-pro-v2',
  config,
  component: SeniorFrontendProTemplate,
  mockData,
  meta: {
    name: 'Senior Frontend Pro',
    description: 'Professional template with dark header, initials box, and clean layout for senior developers.',
    category: 'professional',
    tags: ['frontend', 'react', 'typescript', 'professional'],
    featured: true,
    version: '1.0.0',
  },
};

export default seniorFrontendProTemplate;
