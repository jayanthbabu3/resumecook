/**
 * Elegant Portfolio Template Mock Data
 *
 * Creative professional resume data for a Product Designer,
 * showcasing the elegant portfolio design.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Elena Rodriguez',
    title: 'Senior Product Designer',
    email: 'elena.rodriguez@email.com',
    phone: '+1 (415) 555-0147',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/elenarodriguez',
    website: 'elenarodriguez.design',
    photo: '',
    summary: 'Award-winning Product Designer with 7+ years of experience creating user-centered digital products for web and mobile. Passionate about combining beautiful aesthetics with intuitive functionality. Skilled in design thinking, prototyping, and leading cross-functional design teams. Track record of shipping products used by millions.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'TechVenture Inc.',
      position: 'Senior Product Designer',
      location: 'San Francisco, CA',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Lead design for flagship B2B SaaS platform serving 500K+ enterprise users, improving task completion rates by 35%',
        'Established design system with 200+ components, reducing design-to-development time by 45%',
        'Mentor team of 5 designers, conducting weekly design critiques and career development sessions',
        'Collaborate with Product and Engineering to define product roadmap and prioritize features',
      ],
    },
    {
      id: 'exp-2',
      company: 'Creative Digital Agency',
      position: 'Product Designer',
      location: 'Los Angeles, CA',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: '',
      bulletPoints: [
        'Designed end-to-end experiences for 25+ client projects across fintech, healthcare, and e-commerce',
        'Conducted user research with 300+ participants, translating insights into actionable design improvements',
        'Created interactive prototypes that reduced stakeholder revision cycles by 40%',
        'Won 2 Webby Awards for outstanding user experience design',
      ],
    },
    {
      id: 'exp-3',
      company: 'StartupHub',
      position: 'UI/UX Designer',
      location: 'San Diego, CA',
      startDate: '2016-01',
      endDate: '2018-05',
      current: false,
      description: '',
      bulletPoints: [
        'Redesigned mobile app onboarding flow, improving user activation by 50%',
        'Created brand identity and design guidelines for 3 early-stage startups',
        'Built and maintained component libraries in Figma for consistent design implementation',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'California College of the Arts',
      degree: 'Bachelor of Fine Arts',
      field: 'Graphic Design',
      location: 'San Francisco, CA',
      startDate: '2012-08',
      endDate: '2016-05',
      gpa: '3.8',
      honors: 'Summa Cum Laude',
      relevantCourses: [],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Product Design', category: 'Design', level: 5 },
    { id: 'skill-2', name: 'User Research', category: 'Research', level: 5 },
    { id: 'skill-3', name: 'Design Systems', category: 'Design', level: 5 },
    { id: 'skill-4', name: 'Figma', category: 'Tools', level: 5 },
    { id: 'skill-5', name: 'Prototyping', category: 'Design', level: 5 },
    { id: 'skill-6', name: 'Framer', category: 'Tools', level: 4 },
    { id: 'skill-7', name: 'Design Thinking', category: 'Process', level: 5 },
    { id: 'skill-8', name: 'Accessibility', category: 'Design', level: 4 },
    { id: 'skill-9', name: 'HTML/CSS', category: 'Development', level: 3 },
    { id: 'skill-10', name: 'Motion Design', category: 'Design', level: 4 },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Google UX Design Professional Certificate',
      issuer: 'Google',
      date: '2022-05',
      expiryDate: '',
      credentialId: '',
    },
  ],
  projects: [],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Fluent' },
  ],
  achievements: [
    { id: 'ach-1', title: 'Webby Award Winner', description: 'Best Mobile UX 2020' },
    { id: 'ach-2', title: 'Dribbble Featured', description: 'Top 50 Designers 2021' },
  ],
  strengths: [],
  settings: {
    dateFormat: 'MMM YYYY',
    showPhoto: true,
    colorScheme: 'creative',
    includeSocialLinks: true,
  },
};

export default mockData;
