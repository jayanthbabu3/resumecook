/**
 * Executive Split Template Mock Data
 * 
 * Sample resume data optimized for the executive split layout.
 * Features an experienced professional with strong achievements.
 */

import type { ResumeData } from '@/types/resume';

export const mockData: ResumeData = {
  personalInfo: {
    fullName: 'JORDAN SMITH',
    title: 'Senior Technology Executive',
    email: 'jordan.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Results-driven technology executive with 15+ years of experience leading digital transformation initiatives. Proven track record of building high-performing teams and delivering innovative solutions that drive business growth. Expert in cloud architecture, agile methodologies, and strategic planning.',
    linkedin: 'linkedin.com/in/jordansmith',
    github: 'github.com/jordansmith',
    portfolio: 'jordansmith.dev',
  },
  
  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Global',
      position: 'VP of Engineering',
      startDate: 'Jan 2020',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Led organization of 150+ engineers across 12 teams, achieving 40% improvement in delivery velocity',
        'Spearheaded cloud migration initiative saving $2.5M annually in infrastructure costs',
        'Established engineering excellence program reducing production incidents by 65%',
        'Drove adoption of microservices architecture supporting 10x scale growth',
      ],
    },
    {
      id: 'exp-2',
      company: 'Innovation Labs Inc.',
      position: 'Director of Engineering',
      startDate: 'Mar 2016',
      endDate: 'Dec 2019',
      current: false,
      description: '',
      bulletPoints: [
        'Built and scaled engineering team from 20 to 80 engineers',
        'Launched flagship product generating $15M ARR within first year',
        'Implemented CI/CD pipelines reducing deployment time from days to hours',
      ],
    },
    {
      id: 'exp-3',
      company: 'StartupXYZ',
      position: 'Senior Software Engineer',
      startDate: 'Jun 2012',
      endDate: 'Feb 2016',
      current: false,
      description: '',
      bulletPoints: [
        'Architected real-time data processing system handling 1M+ events/second',
        'Mentored junior developers and established code review best practices',
      ],
    },
  ],
  
  education: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2010',
      endDate: '2012',
    },
    {
      id: 'edu-2',
      school: 'UC Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Engineering',
      startDate: '2006',
      endDate: '2010',
    },
  ],
  
  skills: [
    { id: 'skill-1', name: 'Cloud Architecture' },
    { id: 'skill-2', name: 'Team Leadership' },
    { id: 'skill-3', name: 'Strategic Planning' },
    { id: 'skill-4', name: 'Agile/Scrum' },
    { id: 'skill-5', name: 'System Design' },
    { id: 'skill-6', name: 'Python' },
    { id: 'skill-7', name: 'AWS/GCP' },
    { id: 'skill-8', name: 'Kubernetes' },
  ],
  
  strengths: [
    {
      id: 'str-1',
      title: 'Strategic Vision',
      description: 'Translating business goals into technical roadmaps',
    },
    {
      id: 'str-2',
      title: 'Team Building',
      description: 'Recruiting and developing high-performing teams',
    },
    {
      id: 'str-3',
      title: 'Innovation',
      description: 'Driving adoption of cutting-edge technologies',
    },
    {
      id: 'str-4',
      title: 'Execution',
      description: 'Delivering complex projects on time and budget',
    },
  ],
  
  achievements: [
    {
      id: 'ach-1',
      title: 'CTO of the Year',
      description: 'Tech Leadership Awards 2023',
    },
    {
      id: 'ach-2',
      title: 'Patent Holder',
      description: '3 patents in distributed systems',
    },
    {
      id: 'ach-3',
      title: 'Speaker',
      description: 'AWS re:Invent, Google I/O',
    },
  ],
  
  languages: [],
  sections: [],
};

export default mockData;
