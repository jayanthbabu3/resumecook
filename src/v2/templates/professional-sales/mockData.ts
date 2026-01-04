/**
 * Professional Sales Template Mock Data
 * 
 * Python Developer Resume
 */

import type { V2ResumeData } from '../../types';

export const PYTHON_DEVELOPER_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Arjun Krishnamurthy',
    email: 'arjun.krishnamurthy@gmail.com',
    phone: '+1 (415) 892-3047',
    location: 'San Francisco, CA',
    title: 'Senior Python Developer',
    summary: 'Senior Python Developer with 7+ years of experience building scalable backend systems, RESTful APIs, and data pipelines. Expert in Django, FastAPI, and Flask frameworks with deep knowledge of PostgreSQL, Redis, and cloud infrastructure (AWS, GCP). Led development of microservices architecture serving 2M+ daily active users. Passionate about clean code, test-driven development, and mentoring junior developers.',
    linkedin: 'linkedin.com/in/arjunkrishnamurthy',
    portfolio: 'arjundev.io',
    github: 'github.com/arjunkdev',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Stripe',
      position: 'Senior Python Developer',
      startDate: '2021-03',
      endDate: '',
      current: true,
      location: 'San Francisco, CA',
      description: '',
      bulletPoints: [
        'Architected and developed high-throughput payment processing microservices handling 50,000+ transactions per minute using Python, FastAPI, and Celery.',
        'Reduced API response latency by 40% through implementing Redis caching strategies and optimizing PostgreSQL queries with proper indexing.',
        'Led migration of legacy monolithic application to microservices architecture, improving deployment frequency from monthly to daily releases.',
        'Mentored team of 5 junior developers through code reviews, pair programming sessions, and technical documentation.',
        'Implemented comprehensive CI/CD pipelines using GitHub Actions, reducing deployment time by 60% and catching 95% of bugs before production.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Airbnb',
      position: 'Python Developer',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      location: 'San Francisco, CA',
      description: '',
      bulletPoints: [
        'Built and maintained Django-based booking management system serving 2M+ daily active users across 190+ countries.',
        'Developed real-time pricing engine using Python and Apache Kafka, processing 10M+ price updates daily with 99.9% uptime.',
        'Created automated data pipelines using Apache Airflow for ETL processes, reducing manual data processing time by 80%.',
        'Collaborated with data science team to deploy machine learning models for fraud detection, preventing $2M+ in fraudulent transactions annually.',
      ],
    },
    {
      id: 'exp-3',
      company: 'Dropbox',
      position: 'Junior Python Developer',
      startDate: '2016-08',
      endDate: '2018-05',
      current: false,
      location: 'San Francisco, CA',
      description: '',
      bulletPoints: [
        'Developed RESTful APIs using Flask framework for file synchronization services, handling 500K+ API calls daily.',
        'Implemented unit and integration tests achieving 90% code coverage using pytest and mock libraries.',
        'Optimized file upload/download processes, improving throughput by 35% through async programming with asyncio.',
        'Contributed to open-source Python libraries used by the broader developer community.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2014-08',
      endDate: '2016-05',
      location: 'Berkeley, CA',
      gpa: '3.9',
      coursework: [
        'Advanced Algorithms',
        'Distributed Systems',
        'Machine Learning',
        'Database Systems',
      ],
    },
    {
      id: 'edu-2',
      school: 'Indian Institute of Technology, Bombay',
      degree: 'Bachelor of Technology',
      field: 'Computer Science & Engineering',
      startDate: '2010-07',
      endDate: '2014-05',
      location: 'Mumbai, India',
      gpa: '8.7/10',
      coursework: [
        'Data Structures',
        'Operating Systems',
        'Computer Networks',
        'Software Engineering',
      ],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Python', level: 5 },
    { id: 'skill-2', name: 'Django & FastAPI', level: 5 },
    { id: 'skill-3', name: 'PostgreSQL & Redis', level: 4 },
    { id: 'skill-4', name: 'AWS (EC2, Lambda, S3)', level: 4 },
    { id: 'skill-5', name: 'Docker & Kubernetes', level: 4 },
    { id: 'skill-6', name: 'Apache Kafka & Airflow', level: 3 },
    { id: 'skill-7', name: 'Git & CI/CD', level: 5 },
    { id: 'skill-8', name: 'REST APIs & GraphQL', level: 4 },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-01',
      credentialId: 'AWS-SAA-2023-AK',
    },
    {
      id: 'cert-2',
      name: 'Professional Python Developer',
      issuer: 'Python Institute',
      date: '2022-06',
      credentialId: 'PCPP-32-2022',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'PyDataFlow',
      description: 'Open-source Python library for building data pipelines with 2,500+ GitHub stars',
      technologies: ['Python', 'Apache Beam', 'PostgreSQL'],
      techStack: ['Python', 'Apache Beam', 'PostgreSQL'],
      githubUrl: 'github.com/arjunkdev/pydataflow',
    },
    {
      id: 'proj-2',
      name: 'FastAPI Boilerplate',
      description: 'Production-ready FastAPI template with authentication, rate limiting, and monitoring',
      technologies: ['FastAPI', 'SQLAlchemy', 'Docker', 'Redis'],
      techStack: ['FastAPI', 'SQLAlchemy', 'Docker', 'Redis'],
      githubUrl: 'github.com/arjunkdev/fastapi-boilerplate',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' as const },
    { id: 'lang-2', language: 'Hindi', proficiency: 'Native' as const },
    { id: 'lang-3', language: 'Tamil', proficiency: 'Professional' as const },
  ],
};

export const mockData = PYTHON_DEVELOPER_DATA;

export default mockData;

