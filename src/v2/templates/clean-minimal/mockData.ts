/**
 * Clean Minimal Template Mock Data
 *
 * Professional resume data for a Backend Engineer,
 * showcasing the ultra-clean minimal design.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'David Chen',
    title: 'Senior Backend Engineer',
    email: 'david.chen@email.com',
    phone: '+1 (650) 555-0123',
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/davidchen',
    website: 'davidchen.dev',
    photo: '',
    summary: 'Backend Engineer with 8 years of experience building scalable distributed systems and APIs. Expertise in Go, Python, and cloud infrastructure. Passionate about clean architecture, performance optimization, and mentoring engineering teams.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'CloudScale Technologies',
      position: 'Senior Backend Engineer',
      location: 'Seattle, WA',
      startDate: '2020-06',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Architected microservices platform handling 10M+ daily requests with 99.99% uptime',
        'Led migration from monolithic architecture to event-driven microservices, reducing latency by 60%',
        'Designed and implemented real-time data pipeline processing 50TB+ daily using Kafka and Flink',
        'Mentored 6 junior engineers through code reviews and pair programming sessions',
      ],
    },
    {
      id: 'exp-2',
      company: 'DataFlow Inc.',
      position: 'Backend Engineer',
      location: 'San Francisco, CA',
      startDate: '2017-03',
      endDate: '2020-05',
      current: false,
      description: '',
      bulletPoints: [
        'Built REST and GraphQL APIs serving 2M+ users across web and mobile platforms',
        'Optimized database queries reducing average response time from 800ms to 120ms',
        'Implemented CI/CD pipelines with automated testing, achieving 95% code coverage',
        'Contributed to open-source projects including PostgreSQL extensions and Go libraries',
      ],
    },
    {
      id: 'exp-3',
      company: 'StartupXYZ',
      position: 'Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2015-01',
      endDate: '2017-02',
      current: false,
      description: '',
      bulletPoints: [
        'Developed core backend services for fintech startup from 0 to 100K users',
        'Built payment processing system handling $5M+ monthly transactions',
        'Implemented automated fraud detection reducing chargebacks by 40%',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Washington',
      degree: 'Master of Science',
      field: 'Computer Science',
      location: 'Seattle, WA',
      startDate: '2013-09',
      endDate: '2015-06',
      gpa: '3.9',
      honors: '',
      relevantCourses: [],
    },
    {
      id: 'edu-2',
      school: 'UC Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2009-09',
      endDate: '2013-05',
      gpa: '3.7',
      honors: 'Dean\'s List',
      relevantCourses: [],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Go', category: 'Languages', level: 5 },
    { id: 'skill-2', name: 'Python', category: 'Languages', level: 5 },
    { id: 'skill-3', name: 'PostgreSQL', category: 'Databases', level: 5 },
    { id: 'skill-4', name: 'Redis', category: 'Databases', level: 4 },
    { id: 'skill-5', name: 'Kubernetes', category: 'Infrastructure', level: 5 },
    { id: 'skill-6', name: 'AWS', category: 'Cloud', level: 5 },
    { id: 'skill-7', name: 'Kafka', category: 'Messaging', level: 4 },
    { id: 'skill-8', name: 'Docker', category: 'Infrastructure', level: 5 },
    { id: 'skill-9', name: 'gRPC', category: 'Protocols', level: 4 },
    { id: 'skill-10', name: 'Terraform', category: 'Infrastructure', level: 4 },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      date: '2022-03',
      expiryDate: '',
      credentialId: '',
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator',
      issuer: 'CNCF',
      date: '2021-08',
      expiryDate: '',
      credentialId: '',
    },
  ],
  projects: [],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-2', name: 'Mandarin', proficiency: 'Native' },
  ],
  achievements: [],
  strengths: [],
  settings: {
    dateFormat: 'MMM YYYY',
    showPhoto: false,
    colorScheme: 'minimal',
    includeSocialLinks: true,
  },
};

export default mockData;
