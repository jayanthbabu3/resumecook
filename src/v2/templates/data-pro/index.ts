/**
 * Data Pro Template
 */

import { DataProTemplate } from './component';
import { config } from './config';
import { mockData } from './mockData';
import type { TemplateDefinition } from '../types';

export const dataProTemplate: TemplateDefinition = {
  id: 'data-pro-v2',
  config,
  component: DataProTemplate,
  mockData,
  meta: {
    name: 'Data Pro',
    description: 'Professional template optimized for data scientists and analysts with clean layout.',
    category: 'professional',
    tags: ['data', 'science', 'python', 'analytics'],
    featured: true,
    version: '1.0.0',
  },
};

export default dataProTemplate;
