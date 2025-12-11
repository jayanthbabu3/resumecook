/**
 * Centered Photo Template
 * 
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { CenteredPhotoTemplate } from './component';
import { mockData } from './mockData';

export const centeredPhotoTemplate: TemplateDefinition = {
  id: 'centered-photo-v2',
  config,
  component: CenteredPhotoTemplate,
  mockData,
  meta: {
    name: 'Centered Photo',
    description: 'Elegant layout with centered photo header',
    category: 'professional',
    tags: ['single-column', 'photo', 'centered', 'elegant'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { CenteredPhotoTemplate } from './component';
export { mockData } from './mockData';

export default centeredPhotoTemplate;
