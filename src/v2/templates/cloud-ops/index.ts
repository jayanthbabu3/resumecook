/**
 * Cloud Ops Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { CloudOpsTemplate } from './component';
import { mockData } from './mockData';

export const cloudOpsTemplate: TemplateDefinition = {
  id: 'cloud-ops-v2',
  config,
  component: CloudOpsTemplate,
  mockData,
  meta: {
    name: 'Cloud Ops',
    description: 'Centered header with cloud-inspired palette for DevOps roles.',
    category: 'modern',
    tags: ['single-column', 'centered', 'devops', 'cloud'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { CloudOpsTemplate } from './component';
export { mockData } from './mockData';

export default cloudOpsTemplate;
