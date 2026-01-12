/**
 * Classic Minimal Template
 * 
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ClassicMinimalTemplate } from './component';
import { mockData } from './mockData';

export const classicMinimalTemplate: TemplateDefinition = {
  id: 'classic-minimal-v2',
  config,
  component: ClassicMinimalTemplate,
  mockData,
  meta: {
    name: 'Classic Minimal',
    description: 'Ultra-clean text-focused design for traditional industries',
    category: 'professional',
    tags: ['single-column', 'classic', 'minimal', 'traditional', 'serif'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { ClassicMinimalTemplate } from './component';
export { mockData } from './mockData';

export default classicMinimalTemplate;
