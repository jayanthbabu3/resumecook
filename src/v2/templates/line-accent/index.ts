/**
 * Line Accent Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { LineAccentTemplate } from './component';
import { mockData } from './mockData';

export const lineAccentTemplate: TemplateDefinition = {
  id: 'line-accent-v2',
  config,
  component: LineAccentTemplate,
  mockData,
  meta: {
    name: 'Line Accent',
    description: 'Clean design with full-width accent lines and asymmetric layout',
    category: 'minimal',
    tags: ['minimal', 'clean', 'lines', 'asymmetric', 'modern', 'professional'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { LineAccentTemplate } from './component';
export { mockData } from './mockData';

export default lineAccentTemplate;
