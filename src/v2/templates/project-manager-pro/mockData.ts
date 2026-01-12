/**
 * Project Manager Pro Template Mock Data
 *
 * Comprehensive professional resume data for a Project Manager,
 * matching the Jane Rutherford design reference.
 */

import type { V2ResumeData } from '../../types/resumeData';

export const mockData: V2ResumeData = {
  personalInfo: {
    fullName: 'Jane Rutherford',
    title: 'Project Manager',
    email: 'your.name@email.com',
    phone: '123 456 7890',
    location: 'Seattle, WA 98039',
    linkedin: 'linkedin.com/in/your-name',
    summary: 'Strategic and detail-oriented project manager with a proven track record of leading cross-functional teams and delivering complex projects on time and within budget. Skilled in Agile methodologies, risk management, and stakeholder communication, with a strong ability to align project objectives with business goals.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'NimbusWorks Technologies',
      position: 'Project Manager',
      location: 'Seattle, WA',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: '',
      bulletPoints: [
        'Directed a portfolio of 10+ software projects valued at over $5 mil., ensuring timely delivery and resource optimization',
        'Led a team of 15 developers and designers using Agile Scrum, increasing sprint velocity by 20%',
        'Negotiated vendor contracts and managed budgets to reduce project costs by 12%',
        'Established KPIs and project dashboards to improve stakeholder visibility and decision-making',
      ],
    },
    {
      id: 'exp-2',
      company: 'Bluepeak Innovations',
      position: 'Associate Project Manager',
      location: 'Portland, OR',
      startDate: '2017-06',
      endDate: '2019-12',
      current: false,
      description: '',
      bulletPoints: [
        'Coordinated cross-functional teams to deliver product enhancements ahead of schedule',
        'Implemented project tracking systems to reduce scope creep by 18%',
        'Supported senior managers in resource allocation and budget forecasting',
        'Facilitated weekly progress meetings to improve team communication',
      ],
    },
    {
      id: 'exp-3',
      company: 'Everbright Consulting',
      position: 'Project Coordinator',
      location: 'Seattle, WA',
      startDate: '2015-03',
      endDate: '2017-05',
      current: false,
      description: '',
      bulletPoints: [
        'Assisted senior project managers in tracking timelines for 8+ client projects valued at $500K+ each',
        'Created weekly status reports and presentations for 10+ stakeholders, improving visibility into project risks and milestones',
        'Coordinated meeting logistics and documentation, reducing follow-up delays by 15%',
        'Managed vendor communication for small-scale deliverables, ensuring 98% on-time completion',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Oregon',
      degree: 'BS in Business Administration',
      field: '',
      location: 'Eugene, OR',
      startDate: '2011-09',
      endDate: '2015-05',
      gpa: '',
      honors: '',
      relevantCourses: [],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Agile & Scrum methodologies', category: 'Project Management', level: 5 },
    { id: 'skill-2', name: 'Budget and resource management', category: 'Project Management', level: 5 },
    { id: 'skill-3', name: 'Risk assessment', category: 'Analysis', level: 5 },
    { id: 'skill-4', name: 'Vendor negotiations', category: 'Business', level: 4 },
    { id: 'skill-5', name: 'Project lifecycle planning', category: 'Project Management', level: 5 },
    { id: 'skill-6', name: 'Stakeholder communication', category: 'Communication', level: 5 },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Project Management Professional (PMP)',
      issuer: 'Project Management Institute',
      date: '2019-06',
      expiryDate: '2025-06',
      credentialId: '',
    },
    {
      id: 'cert-2',
      name: 'Certified ScrumMaster (CSM)',
      issuer: 'Scrum Alliance',
      date: '2018-03',
      expiryDate: '',
      credentialId: '',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Enterprise Resource Planning Implementation',
      description: 'Led the implementation of a company-wide ERP system, coordinating with IT, finance, and operations departments',
      technologies: ['SAP', 'Project Management', 'Change Management'],
      highlights: [
        'Managed a $2.5M budget with 15% under-budget completion',
        'Trained 200+ employees across 5 departments',
        'Reduced manual data entry by 65%',
      ],
      link: '',
      startDate: '2021-01',
      endDate: '2022-06',
    },
    {
      id: 'proj-2',
      name: 'Digital Transformation Initiative',
      description: 'Spearheaded migration of legacy systems to cloud-based infrastructure',
      technologies: ['AWS', 'Azure', 'Jira', 'Confluence'],
      highlights: [
        'Migrated 50+ applications to cloud infrastructure',
        'Achieved 99.9% uptime during transition',
        'Reduced operational costs by 30%',
      ],
      link: '',
      startDate: '2020-06',
      endDate: '2021-12',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Professional Working' },
  ],
  achievements: [
    { id: 'ach-1', title: 'Top Performer Award', description: '2022 - Recognized for exceptional project delivery' },
    { id: 'ach-2', title: 'Process Improvement Champion', description: 'Implemented methodologies that saved 500+ hours annually' },
  ],
  strengths: [],
  settings: {
    dateFormat: 'MMM YYYY',
    showPhoto: false,
    colorScheme: 'professional',
    includeSocialLinks: true,
  },
};

export default mockData;
