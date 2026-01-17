/**
 * Accent Stripe Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { AccentStripeTemplate } from './component';
import { mockData } from './mockData';

export const accentStripeTemplate: TemplateDefinition = {
  id: 'accent-stripe-v2',
  config,
  component: AccentStripeTemplate,
  mockData,
  meta: {
    name: 'Accent Stripe',
    description: 'Modern minimal with vertical accent stripe and bold typography',
    category: 'minimal',
    tags: ['minimal', 'modern', 'bold', 'professional', 'developer', 'tech'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { AccentStripeTemplate } from './component';
export { mockData } from './mockData';

export default accentStripeTemplate;
