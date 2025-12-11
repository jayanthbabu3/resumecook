/**
 * Resume Builder V2 - Mock Data
 * 
 * Sample resume data for testing and preview purposes.
 * Based on the EnhanceCV example template.
 */

import type { ResumeData } from '@/types/resume';

export const MOCK_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Jordan Smith',
    email: 'help@enhancv.com',
    phone: '+1-541-754-3010',
    location: 'San Francisco, California',
    title: 'Experienced Technology Executive',
    summary: 'With over a decade of experience in strategic planning and media relations in the technology sector, I bring a proven track record of driving brand visibility and client satisfaction. My expertise in leading diverse teams and managing key accounts, combined with my ability to secure coverage in top-tier outlets, positions me to make a significant impact. My biggest career achievement has been maintaining a client retention rate of over 90%, demonstrating my commitment to delivering exceptional results.',
    linkedin: 'linkedin.com',
    portfolio: '',
    github: '',
  },
  includeSocialLinks: true,
  experience: [
    {
      id: 'exp-1',
      company: 'Edelman',
      position: 'Account Director',
      startDate: '2019-01',
      endDate: '2023-12',
      current: false,
      description: 'Managed key accounts in the technology sector, focusing on strategic planning and media relations.',
      bulletPoints: [
        'Developed and executed strategic communication plans for 10+ major tech clients, resulting in a 30% increase in brand visibility.',
        'Managed a team of 15+ account executives, fostering a collaborative environment that boosted team productivity by 40%.',
        'Secured media coverage in top-tier technology and business outlets, increasing client exposure by 50%.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Weber Shandwick',
      position: 'Senior Account Manager',
      startDate: '2016-01',
      endDate: '2019-01',
      current: false,
      description: 'Oversaw account management for technology clients, with a focus on media relations and strategic planning.',
      bulletPoints: [
        'Managed 8+ key tech accounts, leading to a 25% increase in client retention.',
        'Coordinated with cross-functional teams to execute strategic plans, resulting in a 35% increase in project success rate.',
        'Secured speaking opportunities for clients at major industry events, boosting brand recognition by 30%.',
      ],
    },
    {
      id: 'exp-3',
      company: 'Ketchum',
      position: 'Account Manager',
      startDate: '2013-01',
      endDate: '2016-01',
      current: false,
      description: 'Managed client accounts in the technology sector, focusing on media relations and strategic planning.',
      bulletPoints: [
        'Handled 5+ major tech accounts, leading to a 20% increase in client satisfaction.',
        'Worked closely with teams to execute strategic plans, boosting project success rate by 30%.',
        'Secured media coverage for clients in top-tier outlets, increasing brand visibility by 40%.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      degree: "Master's Degree",
      field: 'Business Administration',
      startDate: '2011-09',
      endDate: '2013-05',
      location: 'Stanford, California',
    },
    {
      id: 'edu-2',
      school: 'University of California',
      degree: "Bachelor's Degree",
      field: 'Communications',
      startDate: '2007-09',
      endDate: '2011-05',
      location: 'Berkeley, California',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Strategic Planning' },
    { id: 'skill-2', name: 'Media Relations' },
    { id: 'skill-3', name: 'Team Leadership' },
    { id: 'skill-4', name: 'Project Management' },
    { id: 'skill-5', name: 'Corporate Communications' },
    { id: 'skill-6', name: 'Content Development' },
    { id: 'skill-7', name: 'Event Planning' },
    { id: 'skill-8', name: 'Cybersecurity' },
    { id: 'skill-9', name: 'IoT' },
    { id: 'skill-10', name: '5G' },
    { id: 'skill-11', name: 'Cloud' },
  ],
  // Built-in sections with proper data structure
  achievements: [
    {
      id: 'ach-1',
      title: 'Client Retention Rate',
      description: 'Achieved a client retention rate of over 90% throughout my career, demonstrating my commitment to client satisfaction.',
    },
    {
      id: 'ach-2',
      title: 'Team Leadership',
      description: 'Successfully led diverse teams in high-pressure environments, fostering collaboration and boosting productivity.',
    },
    {
      id: 'ach-3',
      title: 'Brand Visibility',
      description: 'Increased brand visibility for clients by securing coverage in top-tier media outlets.',
    },
  ],
  strengths: [
    {
      id: 'str-1',
      title: 'Strategic Planning',
      description: 'Led a team of 20+ in developing and executing strategic plans, resulting in a 35% increase in efficiency.',
    },
    {
      id: 'str-2',
      title: 'Collaboration',
      description: 'Worked closely with cross-functional teams to drive project success, leading to a 45% increase in team productivity.',
    },
    {
      id: 'str-3',
      title: 'Media Relations',
      description: 'Established strong relationships with top-tier technology and business outlets, increasing brand visibility by 50%.',
    },
  ],
  // Languages - direct access for simpler handling
  languages: [
    { id: 'lang-1', language: 'Hindi', proficiency: 'Native' as const },
    { id: 'lang-2', language: 'English', proficiency: 'Fluent' as const },
    { id: 'lang-3', language: 'Bengali', proficiency: 'Intermediate' as const },
  ],
  // Custom sections - empty by default (user adds them)
  sections: [],
};

// Empty resume data for new resumes
export const EMPTY_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    linkedin: '',
    portfolio: '',
    github: '',
  },
  includeSocialLinks: true,
  experience: [],
  education: [],
  skills: [],
  sections: [],
};

// Minimal resume data for quick start
export const MINIMAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Your Name',
    email: 'email@example.com',
    phone: '+1-234-567-8900',
    location: 'City, State',
    title: 'Professional Title',
    summary: 'A brief summary of your professional background and key achievements.',
    linkedin: '',
    portfolio: '',
    github: '',
  },
  includeSocialLinks: false,
  experience: [
    {
      id: 'exp-1',
      company: 'Company Name',
      position: 'Job Title',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Key achievement or responsibility',
        'Another important accomplishment',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University Name',
      degree: 'Degree',
      field: 'Field of Study',
      startDate: '2016-09',
      endDate: '2020-05',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Skill 1' },
    { id: 'skill-2', name: 'Skill 2' },
    { id: 'skill-3', name: 'Skill 3' },
  ],
  sections: [],
};
