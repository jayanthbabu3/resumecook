/**
 * Obstacle Solver Mock Data
 */

import type { V2ResumeData } from '../types';

export const mockData: V2ResumeData = {
  templateId: 'obstacle-solver-v2',
  personalInfo: {
    fullName: 'Isabelle Todd',
    title: 'I solve problems and help people overcome obstacles.',
    email: 'isabelle@enhancv.com',
    phone: '(555) 010-7750',
    location: 'New York, NY',
    linkedin: 'linkedin.com/isabelle',
    portfolio: 'enhancv.com/isabelle',
    summary:
      'Result-oriented project manager with over 5 years of experience covering project and product management including knowledge in agile methodologies and process improvement. Comfortable with ambiguity and thriving in fast paced environments.',
  },

  experience: [
    {
      id: 'exp-1',
      position: 'Unit Director',
      company: 'Rover Games',
      location: 'Berlin, Germany',
      startDate: '2014-01',
      endDate: '2015-02',
      bulletPoints: [
        'Led teams in creation of a core SaaS product that is revolutionizing the manufacturing optimization in the plastic industry.',
      ],
    },
    {
      id: 'exp-2',
      position: 'Product Manager',
      company: 'SA',
      location: 'Cologne, Germany',
      startDate: '2015-03',
      endDate: '2016-12',
      bulletPoints: [
        'Product manager for a proprietary CRM system used by over 50 distributors and partners, optimizing sales processes and ensuring satisfaction across the channel.',
        'Initiated and managed new digital sales channels which increased revenue by 16%.',
      ],
    },
    {
      id: 'exp-3',
      position: 'Product Owner',
      company: 'Rapid Delivery',
      location: 'Munich, Germany',
      startDate: '2016-10',
      current: true,
      bulletPoints: [
        'Worked with founders on developing a proprietary CRM system that employs sales engineers and field technicians while integrating CRM, field operations, and inventory management.',
        'Conducted and led successful sprints that resulted in a shipped product after 3 months of development.',
      ],
    },
    {
      id: 'exp-4',
      position: 'Internal Project Manager',
      company: 'Telekom',
      location: 'Berlin, Germany',
      startDate: '2012-08',
      endDate: '2014-10',
      bulletPoints: [
        'As part of onboarding of 2k+ internal users, responsible for extensive training with video tutorials and practical exercises and ongoing customer support by chat and email.',
        'Worked in an agile framework and iterated quickly to incorporate feedback from users.',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      school: 'University of Barcelona',
      degree: 'Master of Science',
      fieldOfStudy: 'Industrial Engineering',
      startDate: '2006-09',
      endDate: '2011-06',
      location: 'Barcelona, Spain',
    },
    {
      id: 'edu-2',
      school: 'University of Barcelona',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Industrial Engineering',
      startDate: '2001-09',
      endDate: '2006-06',
      location: 'Barcelona, Spain',
    },
  ],

  skills: [
    { id: 'skill-1', name: 'Java', category: 'Programming' },
    { id: 'skill-2', name: 'Python', category: 'Programming' },
    { id: 'skill-3', name: 'SQL', category: 'Programming' },
    { id: 'skill-4', name: 'C++', category: 'Programming' },
    { id: 'skill-5', name: 'JavaScript', category: 'Programming' },
    { id: 'skill-6', name: 'SQL Server', category: 'Tech & Tools' },
    { id: 'skill-7', name: 'R', category: 'Tech & Tools' },
    { id: 'skill-8', name: 'Hadoop', category: 'Tech & Tools' },
    { id: 'skill-9', name: 'Spark', category: 'Tech & Tools' },
    { id: 'skill-10', name: 'Hive', category: 'Tech & Tools' },
    { id: 'skill-11', name: 'PL/SQL', category: 'Tech & Tools' },
    { id: 'skill-12', name: 'MS Office', category: 'Tools & Platforms' },
    { id: 'skill-13', name: 'SharePoint', category: 'Tools & Platforms' },
    { id: 'skill-14', name: 'JIRA', category: 'Tools & Platforms' },
  ],

  languages: [
    { id: 'lang-1', language: 'Spanish', proficiency: 'Basic' },
  ],

  strengths: [
    {
      id: 'str-1',
      title: 'Solution oriented',
      description: 'Able to break down complex problems, identify the root cause, and propose effective solutions.',
      icon: 'Target',
    },
    {
      id: 'str-2',
      title: 'Let it go',
      description: "Refuse to let the past hold me back, always focusing on the next play to keep delivering results.",
      icon: 'Wind',
    },
    {
      id: 'str-3',
      title: 'Leadership',
      description: 'Motivated and managed teams of 10+ to achieve productivity targets and project milestones.',
      icon: 'Users',
    },
    {
      id: 'str-4',
      title: 'Attention to detail',
      description: 'Analytical and detail-oriented approach ensures quality and accuracy across deliverables.',
      icon: 'Eye',
    },
    {
      id: 'str-5',
      title: 'Sincere & Professional',
      description: 'Encourage open feedback and transparency to build long-term trust with teams and stakeholders.',
      icon: 'Handshake',
    },
  ],

  settings: {
    dateFormat: 'MMM YYYY',
  },
};

export default mockData;
