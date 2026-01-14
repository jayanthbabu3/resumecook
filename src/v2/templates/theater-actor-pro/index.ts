/**
 * Theater Actor Pro Template
 *
 * Professional template for actors and performers with portfolio-style layout.
 * Features photo header, gray contact bar, and teal accent color scheme.
 */

import type { TemplateDefinition } from '../types';
import { TheaterActorProTemplate } from './component';
import { theaterActorProConfig } from './config';
import { theaterActorProMockData } from './mockData';

export const theaterActorProTemplate: TemplateDefinition = {
  id: 'theater-actor-pro-v2',
  component: TheaterActorProTemplate,
  config: theaterActorProConfig,
  mockData: theaterActorProMockData,
  meta: {
    name: 'Theater Actor Pro',
    description: 'Professional template for actors and performers with portfolio-style layout',
    category: 'creative',
    tags: ['actor', 'theater', 'creative', 'performer', 'artist', 'portfolio'],
    preview: '/templates/theater-actor-pro-preview.png',
    featured: true,
  },
};

export { TheaterActorProTemplate } from './component';
export { theaterActorProConfig } from './config';
export { theaterActorProMockData } from './mockData';
