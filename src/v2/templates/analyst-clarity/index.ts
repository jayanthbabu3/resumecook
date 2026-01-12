/**
 * Analyst Clarity Template
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { AnalystClarityTemplate } from './component';
import { mockData } from './mockData';

export const analystClarityTemplate: TemplateDefinition = {
  id: 'analyst-clarity-v2',
  config,
  component: AnalystClarityTemplate,
  mockData,
  meta: {
    name: 'Analyst Clarity',
    description: 'Blue-accented, ATS-friendly analyst layout with crisp lines and balanced spacing',
    category: 'professional',
    tags: ['analyst', 'ats-friendly', 'single-column', 'professional'],
    featured: true,
    isNew: true,
    version: '2.0.0',
  },
};

export { config } from './config';
export { AnalystClarityTemplate } from './component';
export { mockData } from './mockData';

export default analystClarityTemplate;
