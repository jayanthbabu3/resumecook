/**
 * Retail Manager Pro Template
 *
 * Clean two-column layout with summary header, perfect for retail and management professionals.
 * Features horizontal contact icons bar and teal accent color scheme.
 */

import type { TemplateDefinition } from '../types';
import { RetailManagerProTemplate } from './component';
import { retailManagerProConfig } from './config';
import { retailManagerProMockData } from './mockData';

export const retailManagerProTemplate: TemplateDefinition = {
  id: 'retail-manager-pro-v2',
  component: RetailManagerProTemplate,
  config: retailManagerProConfig,
  mockData: retailManagerProMockData,
  meta: {
    name: 'Retail Manager Pro',
    description: 'Clean two-column layout with summary header for retail and management professionals',
    category: 'professional',
    tags: ['retail', 'management', 'professional', 'two-column', 'clean'],
    preview: '/templates/retail-manager-pro-preview.png',
    featured: true,
  },
};

export { RetailManagerProTemplate } from './component';
export { retailManagerProConfig } from './config';
export { retailManagerProMockData } from './mockData';
