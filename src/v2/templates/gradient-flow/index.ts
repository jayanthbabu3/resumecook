/**
 * Gradient Flow Template
 *
 * Modern asymmetric design with gradient accents.
 */

import type { TemplateDefinition } from '../types';
import { GradientFlowTemplate } from './component';
import { gradientFlowConfig } from '../../config/templates/gradient-flow';
import { mockData } from './mockData';

export const gradientFlowTemplate: TemplateDefinition = {
  id: 'gradient-flow-v2',
  component: GradientFlowTemplate,
  config: gradientFlowConfig,
  mockData,
  meta: {
    name: 'Gradient Flow',
    description: 'Modern asymmetric design with gradient accents and bold typography',
    category: 'modern',
    tags: ['modern', 'gradient', 'creative', 'tech', 'designer'],
    featured: true,
    isNew: true,
  },
};

export { GradientFlowTemplate } from './component';
export { gradientFlowConfig } from '../../config/templates/gradient-flow';
export { mockData } from './mockData';
export default gradientFlowTemplate;
