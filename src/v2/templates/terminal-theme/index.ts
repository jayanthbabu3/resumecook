import type { TemplateDefinition } from '../types';
import component from './component';
import config from './config';
import mockData from './mockData';

export const terminalThemeTemplate: TemplateDefinition = {
  id: 'terminal-theme-v2',
  config,
  component,
  mockData,
  meta: {
    name: 'Terminal Theme',
    description: 'Terminal/CLI aesthetic with neon accents and monospaced typography.',
    category: 'professional',
    tags: ['developer', 'dark', 'terminal', 'modern'],
    version: '2.0.0',
    isNew: true,
  },
};

export default terminalThemeTemplate;
