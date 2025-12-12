import { V2ResumeData } from '../../types/resumeData';

/**
 * Mock data for Professional Standard Template
 * Demonstrates all features and sections of the template
 */
export const mockData: V2ResumeData = {
  version: '2.0',

  // Personal Information
  personalInfo: {
    name: 'Sarah Johnson',
    title: 'Senior Product Manager',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'linkedin.com/in/sarahjohnson',
    linkedin: 'linkedin.com/in/sarahjohnson',
    github: '',
    portfolio: '',
    summary: 'Results-driven Product Manager with 8+ years of experience leading cross-functional teams to deliver innovative software products. Proven track record of driving user growth, improving engagement metrics, and launching successful features. Expertise in product strategy, roadmap planning, user research, and agile development methodologies.',
  },

  // Professional Experience
  experience: [
    {
      id: 'exp1',
      position: 'Senior Product Manager',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: null,
      current: true,
      bulletPoints: [
        'Led product strategy and roadmap for B2B SaaS platform serving 500+ enterprise clients, resulting in 45% revenue growth',
        'Managed cross-functional team of 12 engineers, designers, and analysts to deliver 15+ major features',
        'Improved user engagement by 60% through data-driven A/B testing and user research initiatives',
        'Established OKR framework and product metrics dashboard, enabling data-informed decision making',
        'Collaborated with sales and customer success teams to reduce churn by 25% and increase NPS score to 72',
      ],
      description: '',
    },
    {
      id: 'exp2',
      position: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Palo Alto, CA',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      bulletPoints: [
        'Owned product lifecycle for mobile app with 2M+ monthly active users, increasing retention by 35%',
        'Conducted extensive user research including 50+ interviews and surveys to inform product decisions',
        'Launched subscription model generating $1.5M ARR within first year',
        'Coordinated go-to-market strategy with marketing team, achieving 120% of user acquisition targets',
        'Implemented agile workflows and sprint planning processes, improving delivery velocity by 40%',
      ],
      description: '',
    },
    {
      id: 'exp3',
      position: 'Associate Product Manager',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      startDate: '2016-01',
      endDate: '2018-05',
      current: false,
      bulletPoints: [
        'Supported product team in defining requirements and user stories for e-commerce platform',
        'Analyzed user behavior data and created reports to identify optimization opportunities',
        'Facilitated sprint planning, retrospectives, and stakeholder demos for 2-week development cycles',
        'Collaborated with UX designers to create wireframes and prototypes for new features',
        'Managed product backlog and prioritized features based on business value and technical feasibility',
      ],
      description: '',
    },
  ],

  // Education
  education: [
    {
      id: 'edu1',
      degree: 'Master of Business Administration (MBA)',
      school: 'Stanford Graduate School of Business',
      location: 'Stanford, CA',
      startDate: '2014-09',
      endDate: '2016-06',
      gpa: '3.8',
      fieldOfStudy: 'Product Management & Strategy',
      description: 'Focus on Technology Product Management and Entrepreneurship',
    },
    {
      id: 'edu2',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2010-09',
      endDate: '2014-05',
      gpa: '3.7',
      fieldOfStudy: 'Computer Science',
      description: 'Dean\'s List, Graduated Magna Cum Laude',
    },
  ],

  // Skills
  skills: [
    {
      id: 'skill1',
      name: 'Product Strategy',
      level: 5,
      category: 'Product Management',
    },
    {
      id: 'skill2',
      name: 'Roadmap Planning',
      level: 5,
      category: 'Product Management',
    },
    {
      id: 'skill3',
      name: 'User Research',
      level: 5,
      category: 'Research',
    },
    {
      id: 'skill4',
      name: 'Data Analysis',
      level: 4,
      category: 'Analytics',
    },
    {
      id: 'skill5',
      name: 'Agile/Scrum',
      level: 5,
      category: 'Methodologies',
    },
    {
      id: 'skill6',
      name: 'SQL',
      level: 4,
      category: 'Technical',
    },
    {
      id: 'skill7',
      name: 'Jira',
      level: 5,
      category: 'Tools',
    },
    {
      id: 'skill8',
      name: 'Figma',
      level: 4,
      category: 'Tools',
    },
    {
      id: 'skill9',
      name: 'Google Analytics',
      level: 5,
      category: 'Analytics',
    },
    {
      id: 'skill10',
      name: 'A/B Testing',
      level: 5,
      category: 'Optimization',
    },
    {
      id: 'skill11',
      name: 'Wireframing',
      level: 4,
      category: 'Design',
    },
    {
      id: 'skill12',
      name: 'Stakeholder Management',
      level: 5,
      category: 'Leadership',
    },
  ],

  // Languages
  languages: [
    {
      id: 'lang1',
      name: 'English',
      proficiency: 'Native',
      level: 5,
    },
    {
      id: 'lang2',
      name: 'Spanish',
      proficiency: 'Professional',
      level: 4,
    },
    {
      id: 'lang3',
      name: 'French',
      proficiency: 'Conversational',
      level: 3,
    },
  ],

  // Certifications
  certifications: [
    {
      id: 'cert1',
      name: 'Certified Scrum Product Owner (CSPO)',
      issuer: 'Scrum Alliance',
      date: '2020-08',
      expiryDate: null,
      credentialId: 'CSPO-12345',
      url: '',
    },
    {
      id: 'cert2',
      name: 'Product Management Certificate',
      issuer: 'Product School',
      date: '2019-05',
      expiryDate: null,
      credentialId: '',
      url: '',
    },
    {
      id: 'cert3',
      name: 'Google Analytics Individual Qualification',
      issuer: 'Google',
      date: '2021-11',
      expiryDate: '2023-11',
      credentialId: 'GAIQ-67890',
      url: '',
    },
  ],

  // Projects
  projects: [
    {
      id: 'proj1',
      name: 'AI-Powered Recommendation Engine',
      description: 'Led development of machine learning recommendation system that increased user engagement by 55% and average session time by 3 minutes. Coordinated with ML team to define requirements and success metrics.',
      role: 'Product Lead',
      startDate: '2022-01',
      endDate: '2022-08',
      current: false,
      technologies: ['Machine Learning', 'Python', 'AWS SageMaker'],
      url: '',
      bulletPoints: [],
    },
    {
      id: 'proj2',
      name: 'Mobile App Redesign',
      description: 'Spearheaded complete redesign of mobile app based on extensive user research and usability testing. New design improved app store rating from 3.8 to 4.6 stars and increased daily active users by 40%.',
      role: 'Product Manager',
      startDate: '2020-03',
      endDate: '2020-12',
      current: false,
      technologies: ['React Native', 'Figma', 'User Research'],
      url: '',
      bulletPoints: [],
    },
  ],

  // Achievements
  achievements: [
    {
      id: 'ach1',
      title: 'Product Excellence Award',
      description: 'Recognized for outstanding product leadership and driving 45% revenue growth in 2022',
      date: '2023-01',
    },
    {
      id: 'ach2',
      title: 'Innovation Award',
      description: 'Led cross-functional team to launch AI recommendation feature, resulting in highest user engagement',
      date: '2022-06',
    },
    {
      id: 'ach3',
      title: 'Customer Success Champion',
      description: 'Reduced customer churn by 25% and improved NPS score by 15 points through product improvements',
      date: '2021-12',
    },
  ],

  // Core Strengths
  strengths: [
    {
      id: 'str1',
      name: 'Strategic Thinking',
      description: '',
    },
    {
      id: 'str2',
      name: 'Leadership',
      description: '',
    },
    {
      id: 'str3',
      name: 'Data-Driven',
      description: '',
    },
    {
      id: 'str4',
      name: 'User-Centric',
      description: '',
    },
    {
      id: 'str5',
      name: 'Cross-Functional',
      description: '',
    },
    {
      id: 'str6',
      name: 'Problem Solving',
      description: '',
    },
  ],

  // Optional sections (empty arrays for sections not used in default view)
  awards: [],
  publications: [],
  volunteer: [],
  interests: [],
  courses: [],
  patents: [],
  speaking: [],
  customSections: [],

  // Settings
  settings: {
    includeSocialLinks: true,
    includePhoto: false,
    dateFormat: 'MMM YYYY',
  },
};

export default mockData;
