/**
 * Centered Photo Template Mock Data
 */

import type { ResumeData } from '@/types/resume';
import { FULL_STACK_DATA } from '@/v2/data/mockData';

export const mockData: ResumeData = {
  ...FULL_STACK_DATA,
  personalInfo: {
    ...FULL_STACK_DATA.personalInfo,
    fullName: 'Alexandra Chen',
    title: 'Product Designer',
    email: 'alexandra@design.io',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    photo: '',
    linkedin: 'linkedin.com/in/alexandrachen',
    portfolio: 'alexandrachen.design',
    summary: 'Creative product designer with 6+ years of experience crafting intuitive digital experiences. Passionate about user-centered design and building products that delight users while driving business results.',
  },
  skills: [
    { id: 'skill-1', name: 'UI/UX Design' },
    { id: 'skill-2', name: 'Figma' },
    { id: 'skill-3', name: 'Prototyping' },
    { id: 'skill-4', name: 'User Research' },
    { id: 'skill-5', name: 'Design Systems' },
    { id: 'skill-6', name: 'Wireframing' },
    { id: 'skill-7', name: 'Adobe XD' },
    { id: 'skill-8', name: 'Sketch' },
  ],
};

export default mockData;
