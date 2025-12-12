import { TemplateDefinition } from '../types';
import { ProfessionalStandardTemplate } from './component';
import { professionalStandardConfig } from './config';
import { mockData } from './mockData';

/**
 * Professional Standard Template - Industry Standard Resume
 *
 * A clean, ATS-friendly professional template suitable for all industries.
 * Features two-column layout with comprehensive section support.
 *
 * Key Features:
 * - Professional dark blue color scheme
 * - Two-column layout (65% main, 32% sidebar)
 * - Left-aligned header with prominent name
 * - ATS-friendly structure
 * - Comprehensive section support (experience, education, skills, certifications, projects, etc.)
 * - All v2 features: form editor, live editor, PDF generation, style options, section rearranging
 *
 * Ideal for: All professionals, job seekers, career changers
 */
export const professionalStandardTemplate: TemplateDefinition = {
  id: 'professional-standard-v2',
  name: 'Professional Standard',
  component: ProfessionalStandardTemplate,
  config: professionalStandardConfig,
  mockData,
  meta: {
    version: '2.0',
    category: 'professional',
    description: 'Industry-standard professional resume template, ATS-friendly and suitable for all industries',
    author: 'Claude',
    createdAt: '2025-12-12',
    tags: [
      'professional',
      'two-column',
      'modern',
      'ats-friendly',
      'clean',
      'standard',
      'industry-standard',
      'versatile',
    ],
    isPremium: false,
    industries: [
      'technology',
      'finance',
      'healthcare',
      'education',
      'marketing',
      'sales',
      'consulting',
      'engineering',
      'product',
      'general',
    ],
    roles: [
      'product-manager',
      'software-engineer',
      'data-analyst',
      'marketing-manager',
      'sales-executive',
      'consultant',
      'project-manager',
      'business-analyst',
      'general',
    ],
    features: [
      'two-column-layout',
      'ats-friendly',
      'sidebar',
      'professional-header',
      'comprehensive-sections',
      'customizable-colors',
      'pdf-optimized',
      'form-editor',
      'live-editor',
      'style-options',
      'section-rearranging',
    ],
    difficulty: 'beginner',
    previewImage: '/assets/templates/professional-standard-preview.png',
    thumbnailImage: '/assets/templates/professional-standard-thumb.png',
  },
};

export default professionalStandardTemplate;
