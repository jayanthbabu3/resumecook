/**
 * Mono Elegant Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { MonoElegantTemplate } from './component';
import { mockData } from './mockData';

export const monoElegantTemplate: TemplateDefinition = {
  id: 'mono-elegant-v2',
  config,
  component: MonoElegantTemplate,
  mockData,
  meta: {
    name: 'Mono Elegant',
    description: 'Monospace typography with elegant spacing and tech-forward aesthetic',
    category: 'minimal',
    tags: ['minimal', 'monospace', 'tech', 'developer', 'elegant', 'modern'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { MonoElegantTemplate } from './component';
export { mockData } from './mockData';

export default monoElegantTemplate;
