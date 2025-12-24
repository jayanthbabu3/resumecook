/**
 * Platform Core Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { PlatformCoreTemplate } from './component';
import { mockData } from './mockData';

export const platformCoreTemplate: TemplateDefinition = {
  id: 'platform-core-v2',
  config,
  component: PlatformCoreTemplate,
  mockData,
  meta: {
    name: 'Platform Core',
    description: 'Left sidebar layout for platform engineering roles.',
    category: 'professional',
    tags: ['two-column', 'left-sidebar', 'platform', 'structured'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { PlatformCoreTemplate } from './component';
export { mockData } from './mockData';

export default platformCoreTemplate;
