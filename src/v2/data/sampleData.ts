/**
 * Resume Builder V2 - Sample Data
 * 
 * Sample resume data using the new V2ResumeData structure.
 * This data is template-agnostic and can be used with any template.
 */

import type { V2ResumeData } from '../types/resumeData';

// ============================================================================
// SAMPLE RESUME DATA
// ============================================================================

export const SAMPLE_V2_RESUME_DATA: V2ResumeData = {
  version: '2.0',
  
  personalInfo: {
    fullName: 'Jordan Smith',
    email: 'jordan.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, California',
    title: 'Experienced Technology Executive',
    summary: 'With over a decade of experience in strategic planning and media relations in the technology sector, I bring a proven track record of driving brand visibility and client satisfaction. My expertise in leading diverse teams and managing key accounts, combined with my ability to secure coverage in top-tier outlets, positions me to make a significant impact. My biggest career achievement has been maintaining a client retention rate of over 90%, demonstrating my commitment to delivering exceptional results.',
    linkedin: 'linkedin.com/in/jordansmith',
    github: 'github.com/jordansmith',
    portfolio: 'jordansmith.dev',
  },
  
  experience: [
    {
      id: 'exp-1',
      company: 'Edelman',
      position: 'Account Director',
      location: 'San Francisco, CA',
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
      location: 'New York, NY',
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
      location: 'Chicago, IL',
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
      location: 'Stanford, California',
      startDate: '2011-09',
      endDate: '2013-05',
      gpa: '3.9',
      honors: ['Dean\'s List', 'Beta Gamma Sigma'],
    },
    {
      id: 'edu-2',
      school: 'University of California',
      degree: "Bachelor's Degree",
      field: 'Communications',
      location: 'Berkeley, California',
      startDate: '2007-09',
      endDate: '2011-05',
      honors: ['Magna Cum Laude'],
    },
  ],
  
  skills: [
    { id: 'skill-1', name: 'Strategic Planning', level: 5, category: 'Leadership' },
    { id: 'skill-2', name: 'Media Relations', level: 5, category: 'Communication' },
    { id: 'skill-3', name: 'Team Leadership', level: 5, category: 'Leadership' },
    { id: 'skill-4', name: 'Project Management', level: 4, category: 'Management' },
    { id: 'skill-5', name: 'Corporate Communications', level: 5, category: 'Communication' },
    { id: 'skill-6', name: 'Content Development', level: 4, category: 'Creative' },
    { id: 'skill-7', name: 'Event Planning', level: 4, category: 'Management' },
    { id: 'skill-8', name: 'Cybersecurity', level: 3, category: 'Technical' },
    { id: 'skill-9', name: 'IoT', level: 3, category: 'Technical' },
    { id: 'skill-10', name: '5G', level: 3, category: 'Technical' },
    { id: 'skill-11', name: 'Cloud Computing', level: 3, category: 'Technical' },
  ],
  
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Professional' },
    { id: 'lang-3', language: 'French', proficiency: 'Intermediate' },
  ],
  
  achievements: [
    {
      id: 'ach-1',
      title: 'Client Retention Rate',
      description: 'Achieved a client retention rate of over 90% throughout my career, demonstrating my commitment to client satisfaction.',
      metric: '90%+',
    },
    {
      id: 'ach-2',
      title: 'Team Leadership',
      description: 'Successfully led diverse teams in high-pressure environments, fostering collaboration and boosting productivity.',
      metric: '40% productivity increase',
    },
    {
      id: 'ach-3',
      title: 'Brand Visibility',
      description: 'Increased brand visibility for clients by securing coverage in top-tier media outlets.',
      metric: '50% exposure increase',
    },
  ],
  
  strengths: [
    {
      id: 'str-1',
      title: 'Strategic Planning',
      description: 'Led a team of 20+ in developing and executing strategic plans, resulting in a 35% increase in efficiency.',
      icon: 'Target',
    },
    {
      id: 'str-2',
      title: 'Collaboration',
      description: 'Worked closely with cross-functional teams to drive project success, leading to a 45% increase in team productivity.',
      icon: 'Users',
    },
    {
      id: 'str-3',
      title: 'Media Relations',
      description: 'Established strong relationships with top-tier technology and business outlets, increasing brand visibility by 50%.',
      icon: 'Newspaper',
    },
  ],
  
  certifications: [
    {
      id: 'cert-1',
      name: 'Certified Public Relations Professional',
      issuer: 'PRSA',
      date: '2018-06',
      credentialId: 'CPRP-12345',
    },
    {
      id: 'cert-2',
      name: 'Digital Marketing Certification',
      issuer: 'Google',
      date: '2020-03',
    },
  ],
  
  projects: [
    {
      id: 'proj-1',
      name: 'Tech Industry Report 2023',
      description: 'Led the development of a comprehensive industry report analyzing trends in technology communications.',
      role: 'Project Lead',
      technologies: ['Research', 'Data Analysis', 'Content Strategy'],
      highlights: [
        'Surveyed 500+ industry professionals',
        'Report downloaded 10,000+ times',
        'Featured in 5 industry publications',
      ],
    },
  ],
  
  volunteer: [
    {
      id: 'vol-1',
      organization: 'Tech for Good',
      role: 'Communications Advisor',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Provide pro-bono communications consulting to non-profit technology organizations.',
      highlights: [
        'Helped 3 organizations improve their media presence',
        'Trained 20+ volunteers in communications best practices',
      ],
    },
  ],

  interests: [
    { id: 'int-1', name: 'Technology Trends' },
    { id: 'int-2', name: 'Public Speaking' },
    { id: 'int-3', name: 'Podcasting' },
    { id: 'int-4', name: 'Travel' },
    { id: 'int-5', name: 'Photography' },
    { id: 'int-6', name: 'Startup Mentoring' },
  ],

  awards: [
    {
      id: 'award-1',
      title: 'PR Excellence Award',
      issuer: 'PRSA',
      date: '2022-11',
      description: 'Recognized for outstanding PR campaign execution in the technology sector.',
    },
    {
      id: 'award-2',
      title: 'Top 40 Under 40',
      issuer: 'PR Week',
      date: '2021-06',
      description: 'Named among the top 40 PR professionals under 40 years of age.',
    },
  ],

  references: [
    {
      id: 'ref-1',
      name: 'Sarah Johnson',
      title: 'VP of Communications',
      company: 'TechCorp Inc.',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 987-6543',
      relationship: 'Former Manager',
    },
  ],

  settings: {
    includeSocialLinks: true,
    includePhoto: false,
    dateFormat: 'MMM YYYY',
  },
};

// ============================================================================
// EMPTY V2 RESUME DATA
// ============================================================================

export const EMPTY_V2_RESUME_DATA: V2ResumeData = {
  version: '2.0',
  
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
  },
  
  experience: [],
  education: [],
  skills: [],
  
  settings: {
    includeSocialLinks: true,
    includePhoto: false,
    dateFormat: 'MMM YYYY',
  },
};

// ============================================================================
// MINIMAL V2 RESUME DATA (Quick Start)
// ============================================================================

export const MINIMAL_V2_RESUME_DATA: V2ResumeData = {
  version: '2.0',
  
  personalInfo: {
    fullName: 'Your Name',
    email: 'email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'City, State',
    title: 'Professional Title',
    summary: 'A brief summary of your professional background and key achievements. Highlight your unique value proposition and what makes you stand out.',
  },
  
  experience: [
    {
      id: 'exp-1',
      company: 'Company Name',
      position: 'Job Title',
      startDate: '2020-01',
      endDate: '',
      current: true,
      bulletPoints: [
        'Key achievement or responsibility that demonstrates your impact',
        'Another important accomplishment with measurable results',
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
  
  settings: {
    includeSocialLinks: false,
    includePhoto: false,
    dateFormat: 'MMM YYYY',
  },
};
