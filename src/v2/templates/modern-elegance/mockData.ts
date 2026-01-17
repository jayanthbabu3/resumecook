/**
 * Modern Elegance Template Mock Data
 *
 * Professional resume data for a Marketing Manager,
 * showcasing the elegant design with comprehensive content.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Alexandra Chen',
    title: 'Senior Marketing Manager',
    email: 'alexandra.chen@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexandrachen',
    website: 'alexandrachen.com',
    summary: 'Results-driven marketing professional with 8+ years of experience developing and executing integrated marketing strategies that drive brand awareness, customer acquisition, and revenue growth. Expertise in digital marketing, brand management, and cross-functional team leadership. Proven track record of launching successful campaigns that exceed KPIs and deliver measurable business impact.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'TechVenture Solutions',
      position: 'Senior Marketing Manager',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Led a team of 8 marketing professionals to develop and execute comprehensive B2B marketing strategies, resulting in 45% increase in qualified leads',
        'Managed annual marketing budget of $2.5M, optimizing spend across channels to achieve 32% improvement in ROI',
        'Spearheaded rebranding initiative that increased brand awareness by 60% and improved customer perception scores by 25 points',
        'Developed data-driven content strategy that grew organic traffic by 180% and doubled email subscriber base within 18 months',
      ],
    },
    {
      id: 'exp-2',
      company: 'Digital Dynamics Agency',
      position: 'Marketing Manager',
      location: 'Los Angeles, CA',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: '',
      bulletPoints: [
        'Orchestrated multi-channel marketing campaigns for Fortune 500 clients with combined budgets exceeding $5M annually',
        'Implemented marketing automation workflows that improved lead nurturing efficiency by 65% and shortened sales cycle by 3 weeks',
        'Built strategic partnerships with industry influencers, generating 40% increase in social media engagement',
        'Created and launched thought leadership program that positioned clients as industry experts, securing 20+ media placements',
      ],
    },
    {
      id: 'exp-3',
      company: 'Brandscape Marketing',
      position: 'Digital Marketing Specialist',
      location: 'San Diego, CA',
      startDate: '2015-08',
      endDate: '2018-05',
      current: false,
      description: '',
      bulletPoints: [
        'Managed SEO and SEM campaigns for 15+ clients, achieving average 200% improvement in search visibility',
        'Developed and executed social media strategies that grew client followings by an average of 150%',
        'Created compelling content across multiple formats including blogs, videos, and infographics that drove 3M+ impressions annually',
        'Analyzed campaign performance using Google Analytics and Tableau, providing actionable insights that improved conversion rates by 35%',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: 'Master of Business Administration',
      field: 'Marketing Concentration',
      location: 'Berkeley, CA',
      startDate: '2013-08',
      endDate: '2015-05',
      gpa: '3.8',
      honors: 'Beta Gamma Sigma Honor Society',
      relevantCourses: [],
    },
    {
      id: 'edu-2',
      school: 'University of Southern California',
      degree: 'Bachelor of Arts',
      field: 'Communications',
      location: 'Los Angeles, CA',
      startDate: '2009-08',
      endDate: '2013-05',
      gpa: '3.7',
      honors: 'Magna Cum Laude',
      relevantCourses: [],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Marketing Strategy', category: 'Marketing', level: 5 },
    { id: 'skill-2', name: 'Brand Management', category: 'Marketing', level: 5 },
    { id: 'skill-3', name: 'Digital Marketing', category: 'Marketing', level: 5 },
    { id: 'skill-4', name: 'Content Marketing', category: 'Marketing', level: 5 },
    { id: 'skill-5', name: 'Marketing Automation', category: 'Technology', level: 4 },
    { id: 'skill-6', name: 'Data Analytics', category: 'Technology', level: 4 },
    { id: 'skill-7', name: 'Team Leadership', category: 'Leadership', level: 5 },
    { id: 'skill-8', name: 'Budget Management', category: 'Business', level: 4 },
    { id: 'skill-9', name: 'HubSpot', category: 'Tools', level: 5 },
    { id: 'skill-10', name: 'Salesforce', category: 'Tools', level: 4 },
    { id: 'skill-11', name: 'Google Analytics', category: 'Tools', level: 5 },
    { id: 'skill-12', name: 'Adobe Creative Suite', category: 'Tools', level: 3 },
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
      name: 'HubSpot Inbound Marketing',
      issuer: 'HubSpot Academy',
      date: '2022-06',
      expiryDate: '',
      credentialId: '',
    },
    {
      id: 'cert-3',
      name: 'Meta Blueprint Certification',
      issuer: 'Meta',
      date: '2022-03',
      expiryDate: '',
      credentialId: '',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Global Product Launch Campaign',
      description: 'Led cross-functional team to launch new SaaS product in 12 international markets',
      technologies: ['Marketing Automation', 'Localization', 'Multi-channel Marketing'],
      highlights: [
        'Generated $4.2M in pipeline within first quarter',
        'Achieved 280% of lead generation target',
        'Coordinated with teams across 4 time zones',
      ],
      link: '',
      startDate: '2022-06',
      endDate: '2023-01',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-2', name: 'Mandarin', proficiency: 'Professional Working' },
    { id: 'lang-3', name: 'Spanish', proficiency: 'Conversational' },
  ],
  achievements: [
    { id: 'ach-1', title: 'Marketing Excellence Award', description: '2023 - Recognized for outstanding campaign performance' },
    { id: 'ach-2', title: 'Top 40 Under 40', description: 'Marketing professionals in Bay Area' },
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
