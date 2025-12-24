/**
 * Frontend Horizon Template Mock Data
 *
 * Senior frontend-focused resume data.
 */

import type { ResumeData } from '@/types/resume';
import { SENIOR_FRONTEND_DATA } from '@/v2/data/mockData';

export const mockData: ResumeData = {
  ...SENIOR_FRONTEND_DATA,
  projects: [
    {
      id: 'proj-1',
      name: 'Design System Revamp',
      description: 'Led the rebuild of a multi-brand design system with accessible React components and tokenized theming.',
      techStack: ['React', 'TypeScript', 'Storybook', 'Tailwind'],
      url: 'https://design.techcorp.com',
    },
    {
      id: 'proj-2',
      name: 'Real-Time Analytics Console',
      description: 'Built a low-latency analytics dashboard with streaming updates and dynamic data visualizations.',
      techStack: ['Next.js', 'WebSockets', 'D3.js', 'GraphQL'],
      url: 'https://analytics.techcorp.com',
    },
    {
      id: 'proj-3',
      name: 'Customer Onboarding Portal',
      description: 'Created a guided onboarding experience that improved activation rates by 28% across enterprise accounts.',
      techStack: ['React', 'Redux', 'Node.js', 'PostgreSQL'],
      url: 'https://onboarding.techcorp.com',
    },
  ],
};

export default mockData;
