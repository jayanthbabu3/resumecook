/**
 * Volunteer Variant Types
 */

import type { TemplateConfig } from '../../../../types';

export interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description?: string;
  highlights?: string[];
}

export interface VolunteerVariantProps {
  items: VolunteerItem[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
  onAddVolunteer?: () => void;
  onRemoveVolunteer?: (id: string) => void;
  formatDate?: (date: string) => string;
}

export type VolunteerVariant =
  | 'standard'
  | 'compact'
  | 'timeline'
  | 'cards';
