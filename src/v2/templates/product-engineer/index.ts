/**
 * Product Engineer Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ProductEngineerTemplate } from './component';
import { mockData } from './mockData';

export const productEngineerTemplate: TemplateDefinition = {
  id: 'product-engineer-v2',
  config,
  component: ProductEngineerTemplate,
  mockData,
  meta: {
    name: 'Product Engineer',
    description: 'Structured layout with product-focused clarity and warm accents.',
    category: 'professional',
    tags: ['single-column', 'product', 'classic', 'professional'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { ProductEngineerTemplate } from './component';
export { mockData } from './mockData';

export default productEngineerTemplate;
