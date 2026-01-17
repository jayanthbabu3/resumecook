/**
 * Swiss Minimal Template Mock Data
 *
 * Sample data showcasing bold, structured presentation
 * for a UX Designer persona.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Max Weber',
    title: 'UX Designer',
    email: 'max.weber@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Berlin, Germany',
    linkedin: 'linkedin.com/in/maxweber',
    website: 'maxweber.design',
  },

  summary:
    'User experience designer with 8 years of expertise creating intuitive digital products. Specialized in design systems, user research, and prototyping. Strong advocate for accessibility and inclusive design. Track record of improving user satisfaction and business metrics through data-informed design decisions.',

  experience: [
    {
      id: 'exp-1',
      position: 'Senior UX Designer',
      company: 'Bauhaus Digital',
      location: 'Berlin, Germany',
      startDate: '2021',
      endDate: 'Present',
      current: true,
      highlights: [
        'Lead design for enterprise SaaS platform serving 500K+ daily active users',
        'Built and maintained comprehensive design system with 200+ reusable components',
        'Improved task completion rate by 40% through user research-driven redesign',
        'Mentor team of 4 junior designers on UX best practices and design thinking',
      ],
    },
    {
      id: 'exp-2',
      position: 'UX Designer',
      company: 'Tech Collective',
      location: 'Munich, Germany',
      startDate: '2018',
      endDate: '2021',
      current: false,
      highlights: [
        'Designed end-to-end user experiences for mobile banking application',
        'Conducted 100+ user interviews and usability testing sessions',
        'Reduced customer support tickets by 35% through improved information architecture',
        'Collaborated with engineering to implement WCAG 2.1 AA accessibility standards',
      ],
    },
    {
      id: 'exp-3',
      position: 'Product Designer',
      company: 'Startup Labs',
      location: 'Hamburg, Germany',
      startDate: '2016',
      endDate: '2018',
      current: false,
      highlights: [
        'Designed MVP for health-tech startup from concept to launch',
        'Created wireframes, prototypes, and final UI designs in Figma',
        'Established brand identity and visual design language',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      degree: 'Master of Arts',
      field: 'Interaction Design',
      institution: 'Hochschule für Gestaltung',
      location: 'Offenbach, Germany',
      graduationDate: '2016',
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Arts',
      field: 'Visual Communication',
      institution: 'University of Applied Sciences',
      location: 'Düsseldorf, Germany',
      graduationDate: '2014',
    },
  ],

  skills: [
    'Figma',
    'Design Systems',
    'User Research',
    'Prototyping',
    'Usability Testing',
    'Information Architecture',
    'Accessibility',
    'Design Thinking',
    'HTML/CSS',
    'Framer',
  ],

  languages: [
    { language: 'German', proficiency: 'Native' },
    { language: 'English', proficiency: 'Fluent' },
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'Google UX Design Certificate',
      issuer: 'Google',
      issueDate: '2022',
    },
  ],

  projects: [],
};

export default mockData;
