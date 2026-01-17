/**
 * Paper Fold Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { PaperFoldTemplate } from './component';
import { mockData } from './mockData';

export const paperFoldTemplate: TemplateDefinition = {
  id: 'paper-fold-v2',
  config,
  component: PaperFoldTemplate,
  mockData,
  meta: {
    name: 'Paper Fold',
    description: 'Elegant asymmetric design with corner fold decoration',
    category: 'minimal',
    tags: ['minimal', 'elegant', 'asymmetric', 'clean', 'professional', 'creative'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { PaperFoldTemplate } from './component';
export { mockData } from './mockData';

export default paperFoldTemplate;
