/**
 * Refined Serif Template Mock Data
 *
 * Sample data showcasing elegant, classical presentation
 * for a Marketing Director persona.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Victoria Ashworth',
    title: 'Marketing Director',
    email: 'victoria.ashworth@email.com',
    phone: '(415) 555-0192',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/vashworth',
    website: 'victoriaashworth.com',
  },

  summary:
    'Strategic marketing executive with 12+ years of experience building global brands and driving revenue growth. Expert in brand positioning, integrated campaigns, and digital transformation. Proven track record of leading high-performing teams and delivering measurable business impact across B2B and B2C markets.',

  experience: [
    {
      id: 'exp-1',
      position: 'Marketing Director',
      company: 'Luxe Brands Inc.',
      location: 'San Francisco, CA',
      startDate: '2020',
      endDate: 'Present',
      current: true,
      highlights: [
        'Lead global marketing strategy for portfolio of premium lifestyle brands with $200M+ annual revenue',
        'Increased brand awareness by 45% and market share by 12% through integrated omnichannel campaigns',
        'Built and mentored team of 18 marketing professionals across brand, digital, and analytics functions',
        'Pioneered data-driven personalization initiative resulting in 35% improvement in customer lifetime value',
      ],
    },
    {
      id: 'exp-2',
      position: 'Senior Brand Manager',
      company: 'Global Consumer Co.',
      location: 'New York, NY',
      startDate: '2016',
      endDate: '2020',
      current: false,
      highlights: [
        'Managed $50M annual marketing budget for flagship consumer brand across North American markets',
        'Launched award-winning brand refresh campaign that increased purchase intent by 28%',
        'Developed strategic partnerships with key retailers driving 40% growth in distribution',
        'Led cross-functional teams of 12 in executing go-to-market strategies for new product launches',
      ],
    },
    {
      id: 'exp-3',
      position: 'Marketing Manager',
      company: 'Sterling & Associates',
      location: 'Boston, MA',
      startDate: '2012',
      endDate: '2016',
      current: false,
      highlights: [
        'Developed integrated marketing campaigns for Fortune 500 clients across multiple industries',
        'Managed client relationships and $15M in annual campaign budgets',
        'Created data analytics framework that improved campaign ROI by 25%',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      degree: 'Master of Business Administration',
      field: 'Marketing Strategy',
      institution: 'Harvard Business School',
      location: 'Boston, MA',
      graduationDate: '2012',
      honors: 'Baker Scholar',
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Arts',
      field: 'Communications',
      institution: 'Northwestern University',
      location: 'Evanston, IL',
      graduationDate: '2008',
      honors: 'Summa Cum Laude',
    },
  ],

  skills: [
    'Brand Strategy',
    'Digital Marketing',
    'Consumer Insights',
    'Team Leadership',
    'Campaign Management',
    'Marketing Analytics',
    'Budget Management',
    'Cross-functional Collaboration',
    'Strategic Planning',
    'Market Research',
  ],

  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'French', proficiency: 'Professional' },
    { language: 'Spanish', proficiency: 'Conversational' },
  ],

  certifications: [],

  projects: [],
};

export default mockData;
