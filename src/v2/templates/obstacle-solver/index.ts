/**
 * Obstacle Solver Template Definition
 */

import type { TemplateDefinition } from '../types';
import { obstacleSolverConfig } from './config';
import { ObstacleSolverTemplate } from './component';
import { mockData } from './mockData';

export const obstacleSolverTemplate: TemplateDefinition = {
  id: 'obstacle-solver-v2',
  config: obstacleSolverConfig,
  component: ObstacleSolverTemplate,
  mockData,
  meta: {
    name: 'Obstacle Solver',
    description: 'Centered teal header with crisp section lines and grouped skills.',
    category: 'professional',
    tags: ['single-column', 'teal', 'ats', 'grouped-skills'],
    featured: false,
    isNew: true,
    version: '2.0.0',
  },
};

export { obstacleSolverConfig as config } from './config';
export { ObstacleSolverTemplate } from './component';
export { mockData } from './mockData';

export default obstacleSolverTemplate;
