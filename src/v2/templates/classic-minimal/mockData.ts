/**
 * Classic Minimal Template Mock Data
 */

import type { ResumeData } from '@/types/resume';
import { FULL_STACK_DATA } from '@/v2/data/mockData';

export const mockData: ResumeData = {
  ...FULL_STACK_DATA,
  personalInfo: {
    ...FULL_STACK_DATA.personalInfo,
    fullName: 'Elizabeth Warren',
    title: 'Senior Attorney',
    email: 'ewarren@lawfirm.com',
    phone: '+1 (555) 456-7890',
    location: 'Boston, MA',
    linkedin: 'linkedin.com/in/elizabethwarren',
    portfolio: 'ewarren-law.com',
    summary: 'Experienced corporate attorney with 15+ years of practice in mergers and acquisitions, securities law, and regulatory compliance. Proven track record of successfully closing complex transactions exceeding $500M in value.',
  },
  skills: [
    { id: 'skill-1', name: 'Corporate Law' },
    { id: 'skill-2', name: 'M&A' },
    { id: 'skill-3', name: 'Securities' },
    { id: 'skill-4', name: 'Regulatory Compliance' },
    { id: 'skill-5', name: 'Contract Negotiation' },
    { id: 'skill-6', name: 'Due Diligence' },
    { id: 'skill-7', name: 'Risk Assessment' },
    { id: 'skill-8', name: 'Legal Strategy' },
  ],
};

export default mockData;
