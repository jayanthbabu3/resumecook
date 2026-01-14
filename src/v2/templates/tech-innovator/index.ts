/**
 * Tech Innovator Template
 *
 * Modern template with icon-accent experience and category-lines skills.
 * Perfect for software engineers, product managers, and tech leaders.
 */

import type { TemplateDefinition } from '../types';
import { TechInnovatorTemplate } from './component';
import { techInnovatorConfig } from './config';
import { techInnovatorMockData } from './mockData';

export const techInnovatorTemplate: TemplateDefinition = {
  id: 'tech-innovator-v2',
  component: TechInnovatorTemplate,
  config: techInnovatorConfig,
  mockData: techInnovatorMockData,
  meta: {
    name: 'Tech Innovator',
    description: 'Modern template with icon cards and categorized skills for tech professionals',
    category: 'modern',
    tags: ['tech', 'modern', 'developer', 'engineer', 'clean'],
    preview: '/templates/tech-innovator-preview.png',
    featured: true,
  },
};

export { TechInnovatorTemplate } from './component';
export { techInnovatorConfig } from './config';
export { techInnovatorMockData } from './mockData';
