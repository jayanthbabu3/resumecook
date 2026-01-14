/**
 * CIO Executive Template
 *
 * Professional executive template for C-level and senior technology leaders.
 * Features photo header, gray contact bar, and professional black/gray color scheme.
 */

import type { TemplateDefinition } from '../types';
import { CIOExecutiveTemplate } from './component';
import { cioExecutiveConfig } from './config';
import { cioExecutiveMockData } from './mockData';

export const cioExecutiveTemplate: TemplateDefinition = {
  id: 'cio-executive-v2',
  component: CIOExecutiveTemplate,
  config: cioExecutiveConfig,
  mockData: cioExecutiveMockData,
  meta: {
    name: 'CIO Executive',
    description: 'Professional executive template for C-level and senior technology leaders',
    category: 'executive',
    tags: ['executive', 'cio', 'cto', 'c-level', 'technology', 'leadership', 'professional'],
    preview: '/templates/cio-executive-preview.png',
    featured: true,
  },
};

export { CIOExecutiveTemplate } from './component';
export { cioExecutiveConfig } from './config';
export { cioExecutiveMockData } from './mockData';
