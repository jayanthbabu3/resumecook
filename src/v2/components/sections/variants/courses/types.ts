/**
 * Courses Variant Types
 */

import type { TemplateConfig } from '../../../../types';

export interface CourseItem {
  id: string;
  name: string;
  provider: string;
  date: string;
  url?: string;
  certificate?: boolean;
  description?: string;
}

export interface CoursesVariantProps {
  items: CourseItem[];
  config: TemplateConfig;
  accentColor: string;
  editable?: boolean;
  onAddCourse?: () => void;
  onRemoveCourse?: (id: string) => void;
  formatDate?: (date: string) => string;
}

export type CoursesVariant = 'standard' | 'detailed' | 'compact' | 'cards';
