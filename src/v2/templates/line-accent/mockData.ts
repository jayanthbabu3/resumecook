/**
 * Line Accent Template Mock Data
 *
 * Sample data showcasing clean professional presentation
 * for a Data Analyst persona.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Sophie Martin',
    title: 'Data Analyst',
    email: 'sophie.martin@email.com',
    phone: '+1 (555) 234-5678',
    location: 'Austin, TX',
    linkedin: 'linkedin.com/in/sophiemartin',
    website: 'sophiemartin.io',
  },

  summary:
    'Data analyst with 5+ years of experience transforming complex datasets into actionable business insights. Proficient in SQL, Python, and data visualization tools. Strong background in statistical analysis and A/B testing. Passionate about using data to drive strategic decision-making and improve business outcomes.',

  experience: [
    {
      id: 'exp-1',
      position: 'Senior Data Analyst',
      company: 'Analytics Pro',
      location: 'Austin, TX',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      highlights: [
        'Lead analytics initiatives for product team, providing insights that drove 25% increase in user engagement',
        'Built automated reporting dashboards in Tableau serving 50+ stakeholders across the organization',
        'Developed predictive churn model with 85% accuracy, enabling proactive retention strategies',
        'Mentored 3 junior analysts on SQL best practices and data visualization techniques',
      ],
    },
    {
      id: 'exp-2',
      position: 'Data Analyst',
      company: 'RetailTech Solutions',
      location: 'Dallas, TX',
      startDate: '2019',
      endDate: '2022',
      current: false,
      highlights: [
        'Analyzed customer purchase patterns across 500K+ transactions monthly',
        'Designed and analyzed A/B tests that improved conversion rates by 18%',
        'Created ETL pipelines in Python to automate data processing workflows',
        'Collaborated with marketing team to optimize campaign targeting, reducing CAC by 30%',
      ],
    },
    {
      id: 'exp-3',
      position: 'Business Intelligence Intern',
      company: 'DataDriven Inc',
      location: 'Houston, TX',
      startDate: '2018',
      endDate: '2019',
      current: false,
      highlights: [
        'Assisted in building executive dashboards for C-suite reporting',
        'Cleaned and validated datasets for quarterly business reviews',
        'Documented data dictionary and analysis procedures',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      degree: 'Master of Science',
      field: 'Business Analytics',
      institution: 'University of Texas at Austin',
      location: 'Austin, TX',
      graduationDate: '2019',
      honors: 'GPA: 3.9/4.0',
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Science',
      field: 'Statistics',
      institution: 'Texas A&M University',
      location: 'College Station, TX',
      graduationDate: '2017',
    },
  ],

  skills: [
    'SQL',
    'Python',
    'Tableau',
    'Power BI',
    'R',
    'Excel',
    'Statistical Analysis',
    'A/B Testing',
    'Data Modeling',
    'ETL',
  ],

  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'French', proficiency: 'Intermediate' },
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'Google Data Analytics Certificate',
      issuer: 'Google',
      issueDate: '2023',
    },
  ],

  projects: [],
};

export default mockData;
