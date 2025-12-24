/**
 * API Ledger Template
 *
 * Complete template definition with config, component, and mock data.
 */

import type { TemplateDefinition } from '../types';
import { config } from './config';
import { ApiLedgerTemplate } from './component';
import { mockData } from './mockData';

export const apiLedgerTemplate: TemplateDefinition = {
  id: 'api-ledger-v2',
  config,
  component: ApiLedgerTemplate,
  mockData,
  meta: {
    name: 'API Ledger',
    description: 'Left sidebar layout with purple accents for API engineers.',
    category: 'professional',
    tags: ['two-column', 'left-sidebar', 'api', 'structured'],
    featured: false,
    version: '2.0.0',
  },
};

export { config } from './config';
export { ApiLedgerTemplate } from './component';
export { mockData } from './mockData';

export default apiLedgerTemplate;
