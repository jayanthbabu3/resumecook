/**
 * Creative Split Template Mock Data
 */

import type { ResumeData } from '@/types/resume';
import { FULL_STACK_DATA } from '@/v2/data/mockData';

export const mockData: ResumeData = {
  ...FULL_STACK_DATA,
  personalInfo: {
    ...FULL_STACK_DATA.personalInfo,
    fullName: 'Marcus Rivera',
    title: 'Creative Director',
    email: 'marcus@creative.studio',
    phone: '+1 (555) 987-6543',
    location: 'Los Angeles, CA',
    linkedin: 'linkedin.com/in/marcusrivera',
    github: 'github.com/mrivera',
    portfolio: 'marcusrivera.studio',
    summary: 'Award-winning creative director with 10+ years of experience leading high-impact campaigns for Fortune 500 brands. Expert in visual storytelling, brand strategy, and building world-class creative teams.',
  },
  skills: [
    { id: 'skill-1', name: 'Brand Strategy' },
    { id: 'skill-2', name: 'Art Direction' },
    { id: 'skill-3', name: 'Team Leadership' },
    { id: 'skill-4', name: 'Adobe Creative Suite' },
    { id: 'skill-5', name: 'Motion Design' },
    { id: 'skill-6', name: 'UX Design' },
    { id: 'skill-7', name: 'Photography' },
    { id: 'skill-8', name: 'Video Production' },
  ],
};

export default mockData;
