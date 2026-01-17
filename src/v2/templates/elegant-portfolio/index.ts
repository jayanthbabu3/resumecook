/**
 * Elegant Portfolio Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ElegantPortfolioTemplate } from './component';
import { mockData } from './mockData';

export const elegantPortfolioTemplate: TemplateDefinition = {
  id: 'elegant-portfolio-v2',
  config,
  component: ElegantPortfolioTemplate,
  mockData,
  meta: {
    name: 'Elegant Portfolio',
    description: 'Beautiful portfolio-style resume with centered photo and elegant design',
    category: 'creative',
    tags: ['creative', 'portfolio', 'photo', 'elegant', 'designer', 'modern'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

// Export individual parts for flexibility
export { config } from './config';
export { ElegantPortfolioTemplate } from './component';
export { mockData } from './mockData';

export default elegantPortfolioTemplate;
