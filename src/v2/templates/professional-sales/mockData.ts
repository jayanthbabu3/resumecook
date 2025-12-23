/**
 * Professional Sales Template Mock Data
 * 
 * Sample resume data matching the Jill Morgan resume from the image.
 */

import type { V2ResumeData } from '../../types';

export const SALES_REPRESENTATIVE_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Jill Morgan',
    email: 'jill.morgan@zety.com',
    phone: '212-555-0104',
    location: '',
    title: 'Sales Representative',
    summary: 'Results-oriented sales representative for over 5 years with 2 years of experience as a sales manager for industrial supplies and products. Skilled at maintaining profitable client relationships and developing ambitious sales targets. Achieved over $500,000 in sales in each fiscal quarter from 2019 until the present. Seeking to join Acme Corp to help deliver all your key sales metrics and boost ROI.',
    linkedin: 'linkedin.com/in/jillmorganzety',
    portfolio: '',
    github: '',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'McKinsey Industrial Supplies',
      position: 'Senior Sales Representative',
      startDate: '2018-09',
      endDate: '',
      current: true,
      location: 'Brooklyn, NY',
      description: '',
      bulletPoints: [
        'Managed organizational sales and group of sales representatives in selling industrial equipment and maintaining large construction and contractor business relationships.',
        'Worked with the data analysis team to develop sales targets based on extensive market research and analysis.',
        'Tracked individual sales rep sales goals and individually mentored any representative deemed to be falling behind.',
        'Managed largest 5 corporate construction and industrial client accounts.',
      ],
    },
    {
      id: 'exp-2',
      company: 'XYZ Inc.',
      position: 'Customer Relationship Officer',
      startDate: '2016-09',
      endDate: '2018-08',
      current: false,
      location: 'Philadelphia, PA',
      description: '',
      bulletPoints: [
        'Acted as liaison between XYZ Inc. and corporate clients to facilitate and maintain healthy business relationships.',
        'Checked in on clients on a weekly basis to ensure needs are being met and supplies are being filled.',
        'Managed database of clients and potential leads in a customer relationship manager (CRM) program.',
      ],
    },
    {
      id: 'exp-3',
      company: 'ABC Shopping',
      position: 'Part-time Retail Associate',
      startDate: '2014-07',
      endDate: '2016-06',
      current: false,
      location: 'Philadelphia, PA',
      description: '',
      bulletPoints: [
        'Assisted customers on the sales floor with questions, advice, and physical issues when requested or upon initiative.',
        'Operated the POS and credit card machine when front lines call for additional assistance to the checkout lanes.',
        'Organized shelves, end caps, and bargain bins out on the sales floor.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Penn State University',
      degree: 'BSc',
      field: 'Marketing, Major in Professional Sales',
      startDate: '2012-09',
      endDate: '2016-05',
      location: 'Philadelphia, PA',
      coursework: [
        'Professional Selling',
        'Sales Management',
        'Advanced Sales & Selling Techniques',
        'Cloud-Based CRM Systems',
      ],
      minor: 'Leadership & Communication',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Lead Qualification & Prospecting', level: 5 },
    { id: 'skill-2', name: 'Salesforce & Hubspot CRM', level: 4 },
    { id: 'skill-3', name: 'Optimizing MRR', level: 3 },
    { id: 'skill-4', name: 'Contract Negotiation', level: 4 },
  ],
  languages: [
    { id: 'lang-1', language: 'Spanish', proficiency: 'Professional' as const, certification: 'C1 Certified' },
    { id: 'lang-2', language: 'Italian', proficiency: 'Basic' as const },
  ],
};

export const mockData = SALES_REPRESENTATIVE_DATA;

export default mockData;

