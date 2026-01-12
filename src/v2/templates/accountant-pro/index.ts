/**
 * Accountant Pro Template
 */

import { AccountantProTemplate } from './component';
import { config } from './config';
import { mockData } from './mockData';
import type { TemplateDefinition } from '../types';

export const accountantProTemplate: TemplateDefinition = {
  id: 'accountant-pro-v2',
  config,
  component: AccountantProTemplate,
  mockData,
  meta: {
    name: 'Accountant Pro',
    description: 'Professional template with clean layout suitable for technical roles.',
    category: 'professional',
    tags: ['professional', 'clean', 'technical', 'software'],
    featured: true,
    version: '1.0.0',
  },
};

export default accountantProTemplate;
