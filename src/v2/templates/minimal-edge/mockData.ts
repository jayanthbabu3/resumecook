/**
 * Minimal Edge Template Mock Data
 *
 * Sample data for a Product Manager persona,
 * showcasing the sharp minimal design.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Elena Kowalski',
    title: 'Senior Product Manager',
    email: 'elena.kowalski@email.com',
    phone: '+1 (555) 456-7890',
    location: 'New York, NY',
    linkedin: 'linkedin.com/in/elenakowalski',
    website: 'elenakowalski.com',
    summary: 'Strategic product manager with 8+ years of experience launching successful B2B and B2C products. Proven track record of driving product vision from concept to market, resulting in $50M+ revenue growth. Expert in agile methodologies, data-driven decision making, and cross-functional leadership.',
  },

  experience: [
    {
      id: 'exp-1',
      position: 'Senior Product Manager',
      company: 'FinTech Innovations',
      location: 'New York, NY',
      startDate: '2021-01',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Own product roadmap for payment processing platform serving 500K+ merchants, driving 40% YoY growth',
        'Led cross-functional team of 15 engineers, designers, and analysts to deliver 8 major features',
        'Implemented data-driven prioritization framework reducing time-to-market by 35%',
        'Established product analytics practice, improving feature adoption rates by 50%',
      ],
    },
    {
      id: 'exp-2',
      position: 'Product Manager',
      company: 'CloudScale Solutions',
      location: 'Boston, MA',
      startDate: '2018-06',
      endDate: '2020-12',
      current: false,
      description: '',
      bulletPoints: [
        'Launched enterprise SaaS product from 0 to $10M ARR within 18 months',
        'Conducted 100+ customer discovery interviews to validate product-market fit',
        'Defined and executed go-to-market strategy for 3 product lines',
        'Reduced customer churn by 25% through improved onboarding experience',
      ],
    },
    {
      id: 'exp-3',
      position: 'Associate Product Manager',
      company: 'TechStart Inc',
      location: 'San Francisco, CA',
      startDate: '2015-08',
      endDate: '2018-05',
      current: false,
      description: '',
      bulletPoints: [
        'Managed product lifecycle for mobile application with 1M+ downloads',
        'Collaborated with UX team to redesign core user flows',
        'Analyzed user behavior data to inform feature prioritization',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      degree: 'Master of Business Administration',
      field: 'Technology Management',
      school: 'MIT Sloan School of Management',
      location: 'Cambridge, MA',
      startDate: '2013-09',
      endDate: '2015-05',
      gpa: '3.8',
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      school: 'Cornell University',
      location: 'Ithaca, NY',
      startDate: '2009-09',
      endDate: '2013-05',
    },
  ],

  skills: [
    { id: 'skill-1', name: 'Product Strategy', category: 'Product', level: 5 },
    { id: 'skill-2', name: 'Roadmap Planning', category: 'Product', level: 5 },
    { id: 'skill-3', name: 'Agile/Scrum', category: 'Methodology', level: 5 },
    { id: 'skill-4', name: 'User Research', category: 'Research', level: 4 },
    { id: 'skill-5', name: 'Data Analysis', category: 'Analytics', level: 5 },
    { id: 'skill-6', name: 'SQL', category: 'Technical', level: 4 },
    { id: 'skill-7', name: 'Jira', category: 'Tools', level: 5 },
    { id: 'skill-8', name: 'Amplitude', category: 'Tools', level: 4 },
  ],

  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'Polish', proficiency: 'Native' },
    { id: 'lang-3', language: 'German', proficiency: 'Intermediate' },
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'Certified Scrum Product Owner',
      issuer: 'Scrum Alliance',
      date: '2022-06',
    },
    {
      id: 'cert-2',
      name: 'Product Management Certificate',
      issuer: 'Product School',
      date: '2021-03',
    },
  ],

  projects: [],
};

export default mockData;
