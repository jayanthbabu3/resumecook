/**
 * Admin Assistant Pro Template Mock Data
 *
 * Sample data for an Administrative Assistant resume matching the template design.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'David Pérez',
    title: 'Administrative Assistant',
    email: 'davidperez@gmail.com',
    phone: '(123) 456-7895',
    location: 'Chicago, IL 60622',
    linkedin: 'linkedin.com/in/davidperez',
    summary: 'Administrative Assistant with 6+ years of experience organizing presentations, preparing facility reports, and maintaining the utmost confidentiality. Possess a B.A. in History and expertise in Microsoft Excel. Looking to leverage my knowledge and experience into a role as Project Manager.',
  },
  experience: [
    {
      id: 'exp-1',
      title: 'Administrative Assistant',
      company: 'Redford & Sons, Chicago, IL',
      location: 'Chicago, IL',
      startDate: 'Sep 20XX',
      endDate: 'Present',
      current: true,
      description: '',
      bulletPoints: [
        'Schedule and coordinate meetings, appointments, and travel arrangements for supervisors and managers',
        'Trained 2 administrative assistants during a period of company expansion to ensure attention to detail',
        'Developed new filing and organizational practices, saving the company $3,000 per year in contracted labor expenses',
        'Maintain utmost discretion when dealing with sensitive topics',
        'Coordinate travel arrangements, including booking travel itineraries and using travel management software',
      ],
    },
    {
      id: 'exp-2',
      title: 'Secretary',
      company: 'Bright Spot Ltd - Boston, MA',
      location: 'Boston, MA',
      startDate: 'Jun 20XX',
      endDate: 'Aug 20XX',
      current: false,
      description: '',
      bulletPoints: [
        'Typed documents such as correspondence, drafts, memos, and emails, and prepared 3 reports weekly for management',
        'Opened, sorted, and distributed incoming messages and correspondence',
        'Purchased and maintained office supply inventories, and always carefully adhered to budgeting practices',
        'Greeted visitors and helped them either find the appropriate person or schedule an appointment',
      ],
    },
    {
      id: 'exp-3',
      title: 'Secretary',
      company: 'Suntrust Financial - Chicago, II',
      location: 'Chicago, II',
      startDate: 'Jun 20XX',
      endDate: 'Aug 20XX',
      current: false,
      description: '',
      bulletPoints: [
        'Recorded, transcribed and distributed weekly meetings',
        'Answered upwards of 20 phone calls daily, taking detailed messages',
        'Arranged appointments and ensured executives arrived to meetings with clients on time',
        'Answered upwards of 20 phone calls daily, taking detailed messages',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor Of Arts in History',
      institution: 'River Brook University',
      location: 'Chicago, IL',
      startDate: '',
      endDate: 'May 20XX',
      gpa: '',
      honors: 'Graduated magna cum laude',
      field: 'History',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Microsoft Office', level: 5 },
    { id: 'skill-2', name: 'HubSpot', level: 4 },
    { id: 'skill-3', name: 'MailChimp', level: 4 },
    { id: 'skill-4', name: 'Google Workspace', level: 5 },
    { id: 'skill-5', name: 'Salesforce', level: 4 },
    { id: 'skill-6', name: 'AI Automation', level: 3 },
  ],
  languages: [
    { id: 'lang-1', name: 'Spanish', proficiency: 'Intermediate' },
  ],
  achievements: [
    { id: 'ach-1', title: 'Typing speed of 70 WPM', description: '' },
    { id: 'ach-2', title: 'Bookkeeping', description: '' },
    { id: 'ach-3', title: 'Calendar Management', description: '' },
    { id: 'ach-4', title: 'Meeting Coordination', description: '' },
  ],
  strengths: [],
  certifications: [],
  projects: [],
  awards: [],
  publications: [],
  volunteer: [],
  speaking: [],
  patents: [],
  interests: [],
  references: [],
  courses: [],
  customSections: [],
};

export default mockData;
