/**
 * Minimal Edge Template
 *
 * Ultra-clean design with sharp geometric accents.
 */

import type { TemplateDefinition } from '../types';
import { MinimalEdgeTemplate } from './component';
import { minimalEdgeConfig } from '../../config/templates/minimal-edge';
import { mockData } from './mockData';

export const minimalEdgeTemplate: TemplateDefinition = {
  id: 'minimal-edge-v2',
  component: MinimalEdgeTemplate,
  config: minimalEdgeConfig,
  mockData,
  meta: {
    name: 'Minimal Edge',
    description: 'Ultra-clean design with sharp geometric accents and modern typography',
    category: 'minimal',
    tags: ['minimal', 'geometric', 'modern', 'clean', 'professional'],
    featured: true,
    isNew: true,
  },
};

export { MinimalEdgeTemplate } from './component';
export { minimalEdgeConfig } from '../../config/templates/minimal-edge';
export { mockData } from './mockData';
export default minimalEdgeTemplate;
