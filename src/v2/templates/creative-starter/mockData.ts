/**
 * Creative Starter Template Mock Data
 *
 * Creative professional resume data for a UX Designer,
 * showcasing the vibrant creative design.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Sophie Martinez',
    title: 'Senior UX Designer',
    email: 'sophie.martinez@email.com',
    phone: '+1 (415) 555-0123',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sophiemartinez',
    website: 'sophiemartinez.design',
    photo: '',
    summary: 'Creative and user-focused UX Designer with 6+ years of experience crafting intuitive digital experiences for web and mobile platforms. Passionate about combining beautiful aesthetics with seamless functionality. Skilled in user research, prototyping, and design systems. Track record of increasing user engagement and satisfaction through data-driven design decisions.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Innovate Labs',
      position: 'Senior UX Designer',
      location: 'San Francisco, CA',
      startDate: '2021-06',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Lead design for flagship mobile app serving 2M+ active users, achieving 4.8-star rating on App Store',
        'Established company-wide design system with 150+ reusable components, reducing design-to-dev handoff time by 40%',
        'Conducted user research studies with 500+ participants, translating insights into product improvements that increased retention by 25%',
        'Mentor team of 4 junior designers, fostering growth through design critiques and skill-building workshops',
      ],
    },
    {
      id: 'exp-2',
      company: 'PixelPerfect Agency',
      position: 'UX Designer',
      location: 'Los Angeles, CA',
      startDate: '2018-09',
      endDate: '2021-05',
      current: false,
      description: '',
      bulletPoints: [
        'Designed end-to-end experiences for 30+ client projects across e-commerce, healthcare, and fintech industries',
        'Created interactive prototypes in Figma that reduced stakeholder revision cycles by 50%',
        'Collaborated with development teams to ensure pixel-perfect implementation of designs',
        'Won 3 industry design awards for outstanding user experience innovation',
      ],
    },
    {
      id: 'exp-3',
      company: 'StartupXYZ',
      position: 'Junior UX Designer',
      location: 'San Diego, CA',
      startDate: '2017-01',
      endDate: '2018-08',
      current: false,
      description: '',
      bulletPoints: [
        'Redesigned onboarding flow that improved new user activation rate by 35%',
        'Conducted competitive analysis and usability testing to inform design decisions',
        'Created wireframes, user flows, and high-fidelity mockups for web and mobile applications',
        'Worked closely with product managers to prioritize features based on user feedback',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'California College of the Arts',
      degree: 'Bachelor of Fine Arts',
      field: 'Interaction Design',
      location: 'San Francisco, CA',
      startDate: '2013-08',
      endDate: '2017-05',
      gpa: '3.9',
      honors: 'Summa Cum Laude, Dean\'s List',
      relevantCourses: [],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'User Research', category: 'UX', level: 5 },
    { id: 'skill-2', name: 'Wireframing', category: 'UX', level: 5 },
    { id: 'skill-3', name: 'Prototyping', category: 'UX', level: 5 },
    { id: 'skill-4', name: 'Design Systems', category: 'Design', level: 5 },
    { id: 'skill-5', name: 'Figma', category: 'Tools', level: 5 },
    { id: 'skill-6', name: 'Sketch', category: 'Tools', level: 4 },
    { id: 'skill-7', name: 'Adobe XD', category: 'Tools', level: 4 },
    { id: 'skill-8', name: 'Framer', category: 'Tools', level: 4 },
    { id: 'skill-9', name: 'HTML/CSS', category: 'Development', level: 3 },
    { id: 'skill-10', name: 'Accessibility (WCAG)', category: 'UX', level: 4 },
    { id: 'skill-11', name: 'Motion Design', category: 'Design', level: 4 },
    { id: 'skill-12', name: 'Design Thinking', category: 'UX', level: 5 },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Google UX Design Professional Certificate',
      issuer: 'Google',
      date: '2022-03',
      expiryDate: '',
      credentialId: '',
    },
    {
      id: 'cert-2',
      name: 'Certified Usability Analyst (CUA)',
      issuer: 'Human Factors International',
      date: '2021-08',
      expiryDate: '',
      credentialId: '',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'HealthTrack Mobile App',
      description: 'Complete redesign of health tracking app focused on accessibility and user engagement',
      technologies: ['Figma', 'Protopie', 'User Testing'],
      highlights: [
        'Increased daily active users by 45%',
        'Improved accessibility score to AA compliance',
        'Featured in App Store "Apps We Love"',
      ],
      link: 'behance.net/sophiemartinez/healthtrack',
      startDate: '2022-01',
      endDate: '2022-06',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Fluent' },
    { id: 'lang-3', name: 'French', proficiency: 'Conversational' },
  ],
  achievements: [
    { id: 'ach-1', title: 'Awwwards Honorable Mention', description: '2023 - For HealthTrack App Design' },
    { id: 'ach-2', title: 'UX Design Award', description: 'Best Mobile Experience 2022' },
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
