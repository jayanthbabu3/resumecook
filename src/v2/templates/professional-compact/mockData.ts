/**
 * Professional Compact Template Mock Data
 *
 * Business professional resume data for a Marketing Director,
 * showcasing the clean compact design.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Michael Anderson',
    title: 'Marketing Director',
    email: 'michael.anderson@email.com',
    phone: '+1 (312) 555-0198',
    location: 'Chicago, IL',
    linkedin: 'linkedin.com/in/michaelanderson',
    website: 'michaelanderson.com',
    photo: '',
    summary: 'Strategic Marketing Director with 10+ years of experience driving brand growth and revenue through innovative digital marketing campaigns. Proven track record of leading cross-functional teams, managing multi-million dollar budgets, and delivering measurable ROI. Expert in brand strategy, demand generation, and marketing analytics with a passion for building high-performing teams.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Global Tech Solutions',
      position: 'Marketing Director',
      location: 'Chicago, IL',
      startDate: '2020-03',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Lead marketing strategy for $500M B2B technology company, overseeing team of 25 marketing professionals across brand, demand generation, and product marketing',
        'Drove 45% increase in qualified leads through implementation of account-based marketing program and marketing automation optimization',
        'Managed $8M annual marketing budget, achieving 12% improvement in cost-per-acquisition while scaling campaigns across 15 markets',
        'Spearheaded company rebrand initiative that increased brand awareness by 60% and contributed to 30% revenue growth',
      ],
    },
    {
      id: 'exp-2',
      company: 'Innovate Marketing Group',
      position: 'Senior Marketing Manager',
      location: 'Chicago, IL',
      startDate: '2016-06',
      endDate: '2020-02',
      current: false,
      description: '',
      bulletPoints: [
        'Built and scaled digital marketing function from ground up, growing team from 3 to 12 specialists',
        'Developed content marketing strategy that generated 200% increase in organic traffic and 150% growth in inbound leads',
        'Launched influencer marketing program that reached 5M+ consumers and drove 25% lift in brand consideration',
        'Established marketing analytics framework using Tableau and Google Analytics, enabling data-driven decision making',
      ],
    },
    {
      id: 'exp-3',
      company: 'Brand Forward Agency',
      position: 'Marketing Manager',
      location: 'Detroit, MI',
      startDate: '2013-01',
      endDate: '2016-05',
      current: false,
      description: '',
      bulletPoints: [
        'Managed integrated marketing campaigns for Fortune 500 clients across automotive, consumer goods, and financial services',
        'Led cross-functional teams of 8-15 professionals including creative, media, and analytics specialists',
        'Delivered campaigns that exceeded client KPIs by average of 25%, resulting in 95% client retention rate',
        'Pioneered social media marketing offering that became agency\'s fastest-growing revenue stream',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Northwestern University - Kellogg School of Management',
      degree: 'Master of Business Administration',
      field: 'Marketing & Strategy',
      location: 'Evanston, IL',
      startDate: '2011-09',
      endDate: '2013-06',
      gpa: '',
      honors: 'Dean\'s List, Marketing Club President',
      relevantCourses: [],
    },
    {
      id: 'edu-2',
      school: 'University of Michigan',
      degree: 'Bachelor of Arts',
      field: 'Communications',
      location: 'Ann Arbor, MI',
      startDate: '2005-09',
      endDate: '2009-05',
      gpa: '3.7',
      honors: 'Magna Cum Laude',
      relevantCourses: [],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Brand Strategy', category: 'Marketing', level: 5 },
    { id: 'skill-2', name: 'Digital Marketing', category: 'Marketing', level: 5 },
    { id: 'skill-3', name: 'Demand Generation', category: 'Marketing', level: 5 },
    { id: 'skill-4', name: 'Marketing Analytics', category: 'Analytics', level: 5 },
    { id: 'skill-5', name: 'Account-Based Marketing', category: 'Marketing', level: 5 },
    { id: 'skill-6', name: 'Marketing Automation', category: 'Tools', level: 4 },
    { id: 'skill-7', name: 'Content Strategy', category: 'Marketing', level: 4 },
    { id: 'skill-8', name: 'Team Leadership', category: 'Leadership', level: 5 },
    { id: 'skill-9', name: 'Budget Management', category: 'Operations', level: 5 },
    { id: 'skill-10', name: 'Salesforce Marketing Cloud', category: 'Tools', level: 4 },
    { id: 'skill-11', name: 'HubSpot', category: 'Tools', level: 5 },
    { id: 'skill-12', name: 'Google Analytics', category: 'Tools', level: 5 },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Google Analytics Certified',
      issuer: 'Google',
      date: '2023-01',
      expiryDate: '',
      credentialId: '',
    },
    {
      id: 'cert-2',
      name: 'HubSpot Inbound Marketing Certified',
      issuer: 'HubSpot',
      date: '2022-06',
      expiryDate: '',
      credentialId: '',
    },
  ],
  projects: [],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Professional' },
  ],
  achievements: [
    { id: 'ach-1', title: 'AMA Marketer of the Year', description: '2022 - Chicago Chapter' },
    { id: 'ach-2', title: 'B2B Marketing Award', description: 'Best ABM Campaign 2021' },
  ],
  strengths: [],
  settings: {
    dateFormat: 'MMM YYYY',
    showPhoto: false,
    colorScheme: 'professional',
    includeSocialLinks: true,
  },
};

export default mockData;
