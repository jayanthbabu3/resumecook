/**
 * Terminal Theme Mock Data
 */

import type { V2ResumeData } from '../types';

export const mockData: V2ResumeData = {
  templateId: 'terminal-theme-v2',
  personalInfo: {
    fullName: 'Rowan Mercer',
    title: 'Backend Engineer / Terminal Enthusiast',
    email: 'rowan.mercer@enhancv.com',
    phone: '(415) 555-0144',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/rowanmercer',
    portfolio: 'github.com/rowanmercer',
    summary:
      'Backend engineer who loves building dependable systems, squeezing performance out of APIs, and shipping tooling that makes other engineers faster.',
  },

  experience: [
    {
      id: 'exp-1',
      position: 'Senior Backend Engineer',
      company: 'Synthwave Systems',
      location: 'Remote',
      startDate: '2020-05',
      current: true,
      bulletPoints: [
        'Designed and rolled out a gRPC service mesh that cut p95 latency from 420ms to 180ms across 14 microservices.',
        'Built a feature-flagged migration from a monolithic worker to event-driven pipelines using Kafka and Debezium.',
        'Partnered with SRE to implement SLO dashboards and burn-rate alerts, reducing on-call noise by 32%.',
      ],
    },
    {
      id: 'exp-2',
      position: 'Software Engineer',
      company: 'ClusterForge',
      location: 'Seattle, WA',
      startDate: '2017-08',
      endDate: '2020-04',
      bulletPoints: [
        'Implemented a zero-downtime deployment flow with blue/green cutovers on Kubernetes for 40+ services.',
        'Optimized a PostgreSQL-heavy reporting pipeline by introducing materialized views and partial indexes, halving compute costs.',
        'Authored internal CLI tools (Node + Go) to templatize service scaffolding and secret management.',
      ],
    },
    {
      id: 'exp-3',
      position: 'Junior Developer',
      company: 'Terminal Labs',
      location: 'Portland, OR',
      startDate: '2015-06',
      endDate: '2017-07',
      bulletPoints: [
        'Built RESTful APIs in Node/Express backed by PostgreSQL and Redis for real-time analytics dashboards.',
        'Introduced linting, pre-commit hooks, and CI pipelines that cut PR cycle time by 20%.',
      ],
    },
  ],

  projects: [
    {
      id: 'proj-1',
      name: 'InfraPulse',
      role: 'Creator',
      description: 'Terminal-first dashboard that streams service health, deploy events, and SLO burn rates in real time.',
      technologies: ['TypeScript', 'React', 'Go', 'Kafka', 'PostgreSQL'],
      highlights: [
        'Implements tailing logs with WebSockets and server-sent events for zero-refresh updates.',
        'Configurable command palette with fuzzy search for incidents and runbooks.',
      ],
      githubUrl: 'github.com/rowanmercer/InfraPulse',
    },
    {
      id: 'proj-2',
      name: 'dotfiles',
      role: 'Maintainer',
      description: 'Opinionated dotfiles with tmux, zsh, and Neovim tuned for cloud-native development.',
      technologies: ['Bash', 'Lua', 'Tmux', 'Neovim', 'Zsh'],
      highlights: ['Automated bootstrap scripts for macOS and Linux', 'Session-aware prompts with git status and k8s context'],
      url: 'https://github.com/rowanmercer/dotfiles',
    },
  ],

  courses: [
    {
      id: 'course-1',
      name: 'Distributed Systems',
      provider: 'Stanford | CS244',
      date: '2022-03',
      description: 'Consensus, replication, and consistent hashing fundamentals applied to service design.',
    },
    {
      id: 'course-2',
      name: 'Designing Data-Intensive Applications',
      provider: 'Martin Kleppmann',
      date: '2021-11',
      description: 'Storage engines, streaming pipelines, and reliability patterns translated into backend playbooks.',
    },
  ],

  skills: [
    { id: 'skill-1', name: 'TypeScript', category: 'Languages & Runtime' },
    { id: 'skill-2', name: 'Go', category: 'Languages & Runtime' },
    { id: 'skill-3', name: 'Node.js', category: 'Languages & Runtime' },
    { id: 'skill-4', name: 'PostgreSQL', category: 'Datastores' },
    { id: 'skill-5', name: 'Redis', category: 'Datastores' },
    { id: 'skill-6', name: 'Kafka', category: 'Streaming' },
    { id: 'skill-7', name: 'Debezium', category: 'Streaming' },
    { id: 'skill-8', name: 'Docker', category: 'Platform' },
    { id: 'skill-9', name: 'Kubernetes', category: 'Platform' },
    { id: 'skill-10', name: 'Grafana', category: 'Observability' },
    { id: 'skill-11', name: 'Prometheus', category: 'Observability' },
    { id: 'skill-12', name: 'GitHub Actions', category: 'Tooling' },
    { id: 'skill-13', name: 'Nx', category: 'Tooling' },
    { id: 'skill-14', name: 'gRPC', category: 'APIs' },
  ],

  achievements: [
    {
      id: 'ach-1',
      title: 'Latency Slayer',
      description: 'Reduced checkout p95 latency by 57% through schema redesign, caching, and asynchronous workflows.',
    },
    {
      id: 'ach-2',
      title: 'Incident Wrangler',
      description: 'Led postmortems for 8 high-priority incidents with action plans that drove MTTR down to under 20 minutes.',
    },
    {
      id: 'ach-3',
      title: 'Community Builder',
      description: 'Created an internal backend guild with weekly deep dives that boosted cross-team contribution rate by 18%.',
    },
  ],

  education: [
    {
      id: 'edu-1',
      school: 'Oregon State University',
      degree: 'B.S. Computer Science',
      fieldOfStudy: 'Systems Programming',
      startDate: '2011-09',
      endDate: '2015-06',
      location: 'Corvallis, OR',
    },
  ],

  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Professional' },
  ],

  settings: {
    dateFormat: 'MMM YYYY',
  },
};

export default mockData;
