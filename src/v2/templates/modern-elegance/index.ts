/**
 * Modern Elegance Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ModernEleganceTemplate } from './component';
import { mockData } from './mockData';

export const modernEleganceTemplate: TemplateDefinition = {
  id: 'modern-elegance-v2',
  config,
  component: ModernEleganceTemplate,
  mockData,
  meta: {
    name: 'Modern Elegance',
    description: 'Sophisticated modern layout with elegant typography and refined design elements',
    category: 'professional',
    tags: ['modern', 'elegant', 'professional', 'single-column', 'creative', 'marketing'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { ModernEleganceTemplate } from './component';
export { mockData } from './mockData';

export default modernEleganceTemplate;
