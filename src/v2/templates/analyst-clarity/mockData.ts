/**
 * Analyst Clarity Template Mock Data
 */

import type { V2ResumeData } from '@/v2/types';

export const mockData: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Sebastian Hurst',
    title: 'Business Data Analyst',
    phone: '+1 706-953-0782',
    email: 'sebastian.hurst@gmail.com',
    location: 'Atlanta, GA',
    linkedin: 'linkedin.com/in/sebastian-hurst',
    portfolio: 'www.enhancv.com',
    summary:
      'Motivated business data analyst with 5+ years of experience in data analysis, process optimization, and visualization. Skilled at turning complex datasets into actionable insights that increase efficiency, strengthen strategic decisions, and drive revenue growth.',
  },
  experience: [
    {
      id: 'exp-3',
      company: 'Infosys',
      position: 'Business Data Analyst',
      location: 'Atlanta, GA',
      startDate: '2022-01',
      endDate: '',
      current: true,
      bulletPoints: [
        'Translated stakeholder goals into reporting requirements and data stories that clarified revenue performance and adoption trends.',
        'Owned SQL, Excel, Power BI, and Tableau dashboards that monitored KPIs across conversion, retention, and pipeline health.',
        'Reduced client acquisition costs by analyzing sales cycle inefficiencies and improving lead scoring criteria.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Triplepoint',
      position: 'Junior Data Analyst',
      location: 'Atlanta, GA',
      startDate: '2020-11',
      endDate: '2021-12',
      bulletPoints: [
        'Built and maintained SQL data models that improved report reliability and simplified downstream analyses.',
        'Collaborated with business managers to design Tableau dashboards for executive reviews and monthly business updates.',
        'Automated monthly analytics workflows that saved senior analysts several hours per cycle.',
      ],
    },
    {
      id: 'exp-1',
      company: 'AT&T',
      position: 'Advanced Services Data Analyst Intern',
      location: 'Atlanta, GA',
      startDate: '2018-06',
      endDate: '2020-10',
      bulletPoints: [
        'Managed large datasets from Fortune 500 clients to analyze usage patterns and storage costs, identifying a 3% growth trend.',
        'Visualized operational data to explain system requests, project management updates, and strategic recommendations to business teams.',
        'Created repository documentation that standardized formats across project managers and analysts.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Marshall',
      degree: "Bachelor's in Business and Logistics",
      field: 'Business/Managerial Economics',
      location: 'Huntington, WV',
      startDate: '2011-09',
      endDate: '2015-06',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'SQL Server' },
    { id: 'skill-2', name: 'Tableau' },
    { id: 'skill-3', name: 'R' },
    { id: 'skill-4', name: 'Cognos' },
    { id: 'skill-5', name: 'SSRS' },
    { id: 'skill-6', name: 'Python' },
    { id: 'skill-7', name: 'PySpark' },
    { id: 'skill-8', name: 'Power BI' },
    { id: 'skill-9', name: 'Google Analytics' },
    { id: 'skill-10', name: 'Microsoft Excel' },
    { id: 'skill-11', name: 'SAP' },
    { id: 'skill-12', name: 'JIRA' },
  ],
  strengths: [
    {
      id: 'str-1',
      title: 'Stakeholder Engagement',
      description: 'Facilitates collaborative communication across technical and non-technical teams to translate needs into actionable data plans.',
    },
    {
      id: 'str-2',
      title: 'Strategic Focus',
      description: 'Prioritizes analytics around business objectives to keep projects aligned to measurable outcomes.',
    },
  ],
  settings: {
    includeSocialLinks: true,
    includePhoto: false,
    dateFormat: 'MMM YYYY',
  },
};

export default mockData;
