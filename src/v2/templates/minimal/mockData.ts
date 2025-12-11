/**
 * Minimal Template Mock Data
 * 
 * Clean, focused resume data for the minimal template.
 */

import type { ResumeData } from '@/types/resume';

export const mockData: ResumeData = {
  personalInfo: {
    fullName: 'Alex Chen',
    title: 'Product Designer',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    summary: 'Creative product designer with 6 years of experience crafting intuitive digital experiences. Passionate about user-centered design and building products that make a difference.',
    linkedin: 'linkedin.com/in/alexchen',
    portfolio: 'alexchen.design',
  },
  
  experience: [
    {
      id: 'exp-1',
      company: 'Design Studio Co.',
      position: 'Senior Product Designer',
      startDate: 'Mar 2021',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Lead design for flagship mobile app with 2M+ users',
        'Established design system reducing development time by 30%',
        'Mentored team of 4 junior designers',
      ],
    },
    {
      id: 'exp-2',
      company: 'Creative Agency',
      position: 'Product Designer',
      startDate: 'Jun 2018',
      endDate: 'Feb 2021',
      current: false,
      description: '',
      bulletPoints: [
        'Designed e-commerce experiences for Fortune 500 clients',
        'Conducted user research and usability testing',
      ],
    },
  ],
  
  education: [
    {
      id: 'edu-1',
      school: 'Rhode Island School of Design',
      degree: 'BFA',
      field: 'Graphic Design',
      startDate: '2014',
      endDate: '2018',
    },
  ],
  
  skills: [
    { id: 'skill-1', name: 'Figma' },
    { id: 'skill-2', name: 'Sketch' },
    { id: 'skill-3', name: 'Prototyping' },
    { id: 'skill-4', name: 'User Research' },
    { id: 'skill-5', name: 'Design Systems' },
    { id: 'skill-6', name: 'HTML/CSS' },
  ],
  
  strengths: [],
  achievements: [],
  languages: [],
  sections: [],
};

export default mockData;
