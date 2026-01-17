/**
 * Gradient Flow Template Mock Data
 *
 * Sample data for a UX Designer persona,
 * showcasing the modern gradient design.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Marcus Rivera',
    title: 'Senior UX Designer',
    email: 'marcus.rivera@email.com',
    phone: '+1 (555) 789-0123',
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/marcusrivera',
    website: 'marcusrivera.design',
    summary: 'Creative UX designer with 7+ years of experience crafting intuitive digital experiences for Fortune 500 companies. Expertise in user research, interaction design, and design systems. Passionate about bridging the gap between user needs and business objectives through data-driven design decisions.',
  },

  experience: [
    {
      id: 'exp-1',
      position: 'Senior UX Designer',
      company: 'TechWave Studios',
      location: 'Seattle, WA',
      startDate: '2021-06',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Led design for flagship SaaS product serving 2M+ users, improving user satisfaction scores by 35%',
        'Established and maintained comprehensive design system used across 12 product teams',
        'Conducted 50+ user research sessions to inform product strategy and feature prioritization',
        'Mentored 4 junior designers, developing their skills in user research and prototyping',
      ],
    },
    {
      id: 'exp-2',
      position: 'UX Designer',
      company: 'Digital Horizons',
      location: 'Portland, OR',
      startDate: '2018-03',
      endDate: '2021-05',
      current: false,
      description: '',
      bulletPoints: [
        'Redesigned e-commerce checkout flow, reducing cart abandonment by 28%',
        'Created interactive prototypes in Figma for stakeholder presentations and user testing',
        'Collaborated with engineering teams to ensure design feasibility and quality implementation',
        'Developed accessibility guidelines achieving WCAG 2.1 AA compliance across all products',
      ],
    },
    {
      id: 'exp-3',
      position: 'UI/UX Designer',
      company: 'Creative Labs',
      location: 'San Francisco, CA',
      startDate: '2016-01',
      endDate: '2018-02',
      current: false,
      description: '',
      bulletPoints: [
        'Designed mobile applications for iOS and Android platforms',
        'Created wireframes, user flows, and high-fidelity mockups',
        'Worked closely with product managers to define feature requirements',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      degree: 'Master of Human-Computer Interaction',
      field: '',
      school: 'University of Washington',
      location: 'Seattle, WA',
      startDate: '2014-09',
      endDate: '2016-06',
      gpa: '3.9',
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Fine Arts',
      field: 'Graphic Design',
      school: 'California College of the Arts',
      location: 'Oakland, CA',
      startDate: '2010-09',
      endDate: '2014-05',
    },
  ],

  skills: [
    { id: 'skill-1', name: 'Figma', category: 'Design Tools', level: 5 },
    { id: 'skill-2', name: 'Sketch', category: 'Design Tools', level: 5 },
    { id: 'skill-3', name: 'Adobe XD', category: 'Design Tools', level: 4 },
    { id: 'skill-4', name: 'User Research', category: 'UX Methods', level: 5 },
    { id: 'skill-5', name: 'Prototyping', category: 'UX Methods', level: 5 },
    { id: 'skill-6', name: 'Design Systems', category: 'UX Methods', level: 5 },
    { id: 'skill-7', name: 'Usability Testing', category: 'UX Methods', level: 4 },
    { id: 'skill-8', name: 'HTML/CSS', category: 'Technical', level: 4 },
  ],

  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Professional' },
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'Google UX Design Certificate',
      issuer: 'Google',
      date: '2023-02',
    },
    {
      id: 'cert-2',
      name: 'Certified Usability Analyst',
      issuer: 'Human Factors International',
      date: '2022-08',
    },
  ],

  projects: [],
};

export default mockData;
