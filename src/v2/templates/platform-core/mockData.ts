/**
 * Platform Core Template Mock Data
 *
 * Python Full Stack Developer resume data.
 */

import type { ResumeData } from '@/types/resume';

export const mockData: ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@techdev.com',
    phone: '+1-555-0189',
    location: 'Austin, TX',
    title: 'Python Full Stack Developer',
    summary: 'Full Stack Developer with 6+ years of experience specializing in Python, Django, and React. Proven expertise in building scalable web applications, RESTful APIs, and microservices architectures. Passionate about clean code, test-driven development, and DevOps practices. Successfully delivered enterprise solutions serving millions of users.',
    linkedin: 'linkedin.com/in/rahulsharmadev',
    portfolio: 'rahulsharma.dev',
    github: 'github.com/rahulsharma',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'TechScale Solutions',
      position: 'Senior Python Full Stack Developer',
      startDate: '2021-04',
      endDate: '',
      current: true,
      location: 'Austin, TX',
      description: 'Lead full-stack development for enterprise SaaS platform',
      bulletPoints: [
        'Architected and developed microservices using Python, Django REST Framework, and FastAPI serving 2M+ daily requests',
        'Built responsive frontend applications using React, TypeScript, and Redux with 99.5% uptime',
        'Implemented CI/CD pipelines with GitHub Actions and Docker, reducing deployment time by 70%',
        'Led migration from monolithic to microservices architecture, improving scalability by 300%',
        'Mentored team of 4 junior developers and conducted code reviews',
      ],
    },
    {
      id: 'exp-2',
      company: 'DataFlow Systems',
      position: 'Python Developer',
      startDate: '2018-08',
      endDate: '2021-03',
      current: false,
      location: 'San Francisco, CA',
      description: 'Developed backend services and data pipelines',
      bulletPoints: [
        'Built RESTful APIs using Django and Flask serving 500K+ daily users',
        'Developed data processing pipelines using Celery and Redis, processing 1M+ records daily',
        'Implemented automated testing achieving 90% code coverage with pytest',
        'Optimized PostgreSQL queries reducing response times by 60%',
      ],
    },
    {
      id: 'exp-3',
      company: 'WebStart Inc',
      position: 'Junior Full Stack Developer',
      startDate: '2016-06',
      endDate: '2018-07',
      current: false,
      location: 'Seattle, WA',
      description: 'Full stack web development for various clients',
      bulletPoints: [
        'Developed web applications using Python, Django, and JavaScript',
        'Built frontend interfaces using React and Vue.js',
        'Maintained and optimized MySQL and PostgreSQL databases',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Texas at Austin',
      degree: "Master's Degree",
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2016-05',
      location: 'Austin, TX',
    },
    {
      id: 'edu-2',
      school: 'Georgia Institute of Technology',
      degree: "Bachelor's Degree",
      field: 'Software Engineering',
      startDate: '2010-09',
      endDate: '2014-05',
      location: 'Atlanta, GA',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Python', rating: 5 },
    { id: 'skill-2', name: 'Django', rating: 5 },
    { id: 'skill-3', name: 'FastAPI', rating: 4 },
    { id: 'skill-4', name: 'React', rating: 4 },
    { id: 'skill-5', name: 'TypeScript', rating: 4 },
    { id: 'skill-6', name: 'PostgreSQL', rating: 5 },
    { id: 'skill-7', name: 'Redis', rating: 4 },
    { id: 'skill-8', name: 'Docker', rating: 4 },
    { id: 'skill-9', name: 'AWS', rating: 4 },
    { id: 'skill-10', name: 'GraphQL', rating: 3 },
    { id: 'skill-11', name: 'Celery', rating: 4 },
    { id: 'skill-12', name: 'Git', rating: 5 },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-02',
    },
    {
      id: 'cert-2',
      name: 'Professional Python Developer',
      issuer: 'Python Institute',
      date: '2022-08',
    },
    {
      id: 'cert-3',
      name: 'Docker Certified Associate',
      issuer: 'Docker Inc',
      date: '2021-11',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' as const },
    { id: 'lang-2', language: 'Hindi', proficiency: 'Native' as const },
    { id: 'lang-3', language: 'Spanish', proficiency: 'Conversational' as const },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Performance Excellence',
      description: 'Optimized API response times by 60%, improving user experience',
    },
    {
      id: 'ach-2',
      title: 'Architecture Award',
      description: 'Led successful migration to microservices serving 2M+ users',
    },
    {
      id: 'ach-3',
      title: 'Team Leadership',
      description: 'Mentored 4 junior developers to senior positions',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'E-Commerce Platform',
      description: 'Scalable multi-tenant e-commerce solution',
      technologies: ['Python', 'Django', 'React', 'PostgreSQL', 'Redis'],
      bulletPoints: [
        'Built backend APIs handling 100K+ daily transactions',
        'Implemented real-time inventory tracking with WebSockets',
        'Integrated multiple payment gateways (Stripe, PayPal)',
      ],
    },
    {
      id: 'proj-2',
      name: 'Real-time Analytics Dashboard',
      description: 'Business intelligence platform with live data visualization',
      technologies: ['FastAPI', 'React', 'D3.js', 'ClickHouse'],
      bulletPoints: [
        'Developed streaming data pipeline processing 50K events/sec',
        'Built interactive dashboards with D3.js visualizations',
        'Reduced query times by 80% using ClickHouse',
      ],
    },
  ],
  interests: [
    { id: 'int-1', name: 'Open Source Contributing' },
    { id: 'int-2', name: 'Technical Blogging' },
    { id: 'int-3', name: 'Cloud Architecture' },
    { id: 'int-4', name: 'Machine Learning' },
  ],
};

export default mockData;
