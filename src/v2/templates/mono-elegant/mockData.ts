/**
 * Mono Elegant Template Mock Data
 *
 * Sample data showcasing tech-forward presentation
 * for a DevOps Engineer persona.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Alex Chen',
    title: 'DevOps Engineer',
    email: 'alex.chen@email.com',
    phone: '+1 (555) 987-6543',
    location: 'Seattle, WA',
    linkedin: 'linkedin.com/in/alexchen',
    website: 'alexchen.dev',
  },

  summary:
    'DevOps engineer with 6+ years building scalable infrastructure and CI/CD pipelines. Expert in Kubernetes, AWS, and infrastructure as code. Passionate about automation, observability, and reducing deployment friction. Track record of improving deployment frequency while maintaining reliability.',

  experience: [
    {
      id: 'exp-1',
      position: 'Senior DevOps Engineer',
      company: 'CloudScale Inc',
      location: 'Seattle, WA',
      startDate: '2021',
      endDate: 'Present',
      current: true,
      highlights: [
        'Architected multi-region Kubernetes infrastructure serving 10M+ requests/day',
        'Reduced deployment time from 45 minutes to 8 minutes through pipeline optimization',
        'Implemented GitOps workflow with ArgoCD, achieving 99.9% deployment success rate',
        'Led migration from monolith to microservices, improving scalability by 300%',
      ],
    },
    {
      id: 'exp-2',
      position: 'DevOps Engineer',
      company: 'TechStart Labs',
      location: 'Portland, OR',
      startDate: '2018',
      endDate: '2021',
      current: false,
      highlights: [
        'Built CI/CD pipelines with Jenkins and GitLab CI for 50+ microservices',
        'Implemented infrastructure as code using Terraform, managing 200+ AWS resources',
        'Designed monitoring stack with Prometheus, Grafana, and PagerDuty alerting',
        'Reduced infrastructure costs by 40% through resource optimization',
      ],
    },
    {
      id: 'exp-3',
      position: 'Systems Administrator',
      company: 'DataFlow Systems',
      location: 'San Francisco, CA',
      startDate: '2016',
      endDate: '2018',
      current: false,
      highlights: [
        'Managed hybrid cloud environment with 100+ Linux servers',
        'Automated routine tasks with Ansible, saving 20 hours/week',
        'Implemented backup and disaster recovery solutions',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      institution: 'University of Washington',
      location: 'Seattle, WA',
      graduationDate: '2016',
    },
  ],

  skills: [
    'Kubernetes',
    'AWS',
    'Terraform',
    'Docker',
    'CI/CD',
    'Python',
    'Go',
    'Prometheus',
    'ArgoCD',
    'Linux',
    'GitOps',
    'Helm',
  ],

  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'Mandarin', proficiency: 'Conversational' },
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      issueDate: '2023',
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator',
      issuer: 'CNCF',
      issueDate: '2022',
    },
  ],

  projects: [],
};

export default mockData;
