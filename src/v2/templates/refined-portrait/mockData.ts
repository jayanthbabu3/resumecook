/**
 * Refined Portrait Template Mock Data
 */

import type { V2ResumeData } from '@/v2/types';

export const mockData: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Ellie Thompson',
    title: 'Full Stack Developer',
    email: 'ellie.thompson@example.com',
    phone: '+1 555-555-5555',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/elliethompson',
    github: 'github.com/elliethompson',
    portfolio: 'www.elliethompson.dev',
    summary:
      'Full Stack Developer with over 8 years of experience in Java/JS, Angular, Spring MVC, Node.js, MySQL, Python, Node.js, Selenium, HTML5, and CSS3. Led development of $500K+ web and mobile apps and designed Java/J2EE solutions that improved internal system performance and reduced support tickets by 30%.',
    photo:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Boyle',
      position: 'Senior Full Stack Developer',
      location: 'Austin, TX',
      startDate: '2018',
      endDate: 'Present',
      description:
        'Boyle is an IT/industrial technology and Management Consulting Group, powering the next generation of global healthcare organizations. Built with exclusive members to monitor and achieve results efficiently.',
      bulletPoints: [
        'Automated data extraction, visualization, and inferencing to generate client-facing reports 30% faster.',
        'Enhanced iOS and Android performance across 20+ mobile apps by analyzing code and optimizing API usage.',
        'Solved critical bugs and shipped production-ready features while maintaining 98% sprint predictability.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Lauzon',
      position: 'Full Stack Developer',
      location: 'San Francisco, CA',
      startDate: '2013',
      endDate: '2018',
      description:
        'Lauzon is a professional digital platform that offers unique and relevant places to explore wherever users go.',
      bulletPoints: [
        'Worked directly with a team of six members to maintain and enhance the core product.',
        'Developed features for 50+ members globally, delivering analytics and marketing pages in React and Spring.',
        'Analyzed and optimized existing codebases to reduce support tickets by 30% across multiple teams.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      degree: 'MS in Computer Science',
      field: 'Computer Science',
      location: 'Stanford, CA',
      startDate: '2008',
      endDate: '2009',
      gpa: '',
    },
    {
      id: 'edu-2',
      school: 'University of California',
      degree: 'BS in Computer Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2003',
      endDate: '2007',
    },
  ],
  projects: [
    {
      id: 'project-1',
      name: 'Java: Designed Farewell',
      role: 'Lead Developer',
      description:
        'Open source marketplace platform with integrated messaging and order tracking.',
      technologies: ['Java', 'Spring MVC', 'MySQL', 'AngularJS'],
      highlights: [
        'Built the workflow engine to process 10k+ monthly orders with SLA tracking.',
        'Designed modular AngularJS components for messaging, invoicing, and status tracking.',
        'Coordinated community contributors and code reviews to keep releases stable.',
      ],
      link: 'https://github.com/elliethompson/farewell-platform',
    },
    {
      id: 'project-2',
      name: 'Open Source: Service API Toolkit',
      role: 'Maintainer',
      description: 'Library of reusable service connectors and monitoring utilities.',
      technologies: ['Java', 'Spring Boot', 'JUnit', 'Gradle'],
      highlights: [
        'Published reusable auth middleware adopted by 15+ client teams.',
        'Improved CI reliability by adding contract tests and staging smoke checks.',
      ],
      link: 'https://github.com/elliethompson/service-api-toolkit',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'French', proficiency: 'Fluent' },
    { id: 'lang-3', language: 'Spanish', proficiency: 'Intermediate' },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Scaled Java microservices platform to 1.2M monthly requests',
      description: 'Refactored legacy monolith into Spring Boot services with Kafka events, improving response times by 28%.',
    },
    {
      id: 'ach-2',
      title: 'Reduced production defects by 35%',
      description: 'Introduced contract testing with JUnit and Pact, pairing with CI gates to catch regressions early.',
    },
    {
      id: 'ach-3',
      title: 'Mentored 6 junior Java developers',
      description: 'Built onboarding guides and code review checklists that cut ramp-up time from 10 to 6 weeks.',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Java' },
    { id: 'skill-2', name: 'Spring Boot' },
    { id: 'skill-3', name: 'Spring MVC' },
    { id: 'skill-4', name: 'Hibernate/JPA' },
    { id: 'skill-5', name: 'REST APIs' },
    { id: 'skill-6', name: 'Microservices' },
    { id: 'skill-7', name: 'JUnit' },
    { id: 'skill-8', name: 'Mockito' },
    { id: 'skill-9', name: 'SQL' },
    { id: 'skill-10', name: 'MySQL' },
    { id: 'skill-11', name: 'PostgreSQL' },
    { id: 'skill-12', name: 'Kafka' },
    { id: 'skill-13', name: 'Docker' },
    { id: 'skill-14', name: 'Kubernetes' },
    { id: 'skill-15', name: 'Angular' },
    { id: 'skill-16', name: 'TypeScript' },
    { id: 'skill-17', name: 'JavaScript' },
    { id: 'skill-18', name: 'HTML5 & CSS3' },
    { id: 'skill-19', name: 'Node.js' },
    { id: 'skill-20', name: 'Selenium' },
  ],
  strengths: [],
  certifications: [],
  awards: [],
  publications: [],
  volunteer: [],
  speaking: [],
  patents: [],
  interests: [],
  references: [],
  courses: [],
  settings: {
    includeSocialLinks: true,
  },
};

export default mockData;
