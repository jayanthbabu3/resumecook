/**
 * Bold Headline Template
 */

import { BoldHeadlineTemplate } from './component';
import { config } from './config';
import { mockData } from './mockData';
import type { TemplateDefinition } from '../types';

export const boldHeadlineTemplate: TemplateDefinition = {
  id: 'bold-headline-v2',
  config,
  component: BoldHeadlineTemplate,
  mockData,
  meta: {
    name: 'Bold Headline',
    description: 'Modern template with bold typography and striking visual design.',
    category: 'modern',
    tags: ['modern', 'bold', 'typography', 'design'],
    featured: true,
    version: '1.0.0',
  },
};

export default boldHeadlineTemplate;
