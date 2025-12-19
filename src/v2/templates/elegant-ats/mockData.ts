/**
 * Elegant ATS Template Mock Data
 *
 * Java-focused default resume data to showcase each section.
 */

import type { V2ResumeData } from '@/v2/types';

export const mockData: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Ananya Rao',
    email: 'ananya.rao@example.com',
    phone: '+1 (415) 555-1298',
    location: 'San Francisco, CA',
    title: 'Senior Java Developer',
    summary:
      'Senior Java developer with 8+ years of experience building resilient APIs and cloud-native services. Passionate about clean code, mentoring engineers, and delivering measurable reliability and performance improvements.',
    linkedin: 'linkedin.com/in/ananyarao',
    github: 'github.com/ananyarao',
    portfolio: 'ananyarao.dev',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'Nimbus Systems',
      position: 'Senior Java Developer',
      location: 'San Francisco, CA',
      startDate: '2020-04',
      endDate: '',
      current: true,
      description: 'Lead engineer for JVM-based services supporting high-volume SaaS billing.',
      bulletPoints: [
        'Re-architected a Spring Boot billing service into modular microservices, reducing deployment times by 40% and cutting incident volume by 22%.',
        'Introduced Kotlin coroutines for I/O-heavy paths, lowering P95 latency from 480ms to 210ms across payment workflows.',
        'Designed resilience patterns (bulkheads, retries, circuit breakers) with Resilience4j, improving checkout success rate by 4.8%.',
      ],
    },
    {
      id: 'exp-2',
      company: 'BrightRail',
      position: 'Backend Engineer (Java)',
      location: 'Austin, TX',
      startDate: '2017-01',
      endDate: '2020-03',
      current: false,
      description: 'Built and maintained Java services for real-time logistics insights.',
      bulletPoints: [
        'Implemented event-driven ingestion with Kafka Streams, processing 25k+ messages/sec with exactly-once semantics.',
        'Optimized Hibernate batch operations and connection pooling, reducing database contention and saving ~18% in RDS costs.',
        'Partnered with SRE to add distributed tracing (OpenTelemetry) and dashboards that cut MTTR by 30%.',
      ],
    },
    {
      id: 'exp-3',
      company: 'Northwind Labs',
      position: 'Java Developer',
      location: 'Remote',
      startDate: '2014-06',
      endDate: '2016-12',
      current: false,
      description: 'Delivered feature work and stability improvements for B2B commerce APIs.',
      bulletPoints: [
        'Built RESTful endpoints with Spring MVC and integrated Swagger/OpenAPI for partner onboarding.',
        'Improved test coverage to 82% by introducing JUnit 5 parameterized tests and WireMock contract tests.',
        'Refactored legacy XML parsers to Jackson-based pipelines, shrinking maintenance effort and cutting parsing time by 35%.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OrderFlow Platform',
      role: 'Lead Engineer',
      description: 'Microservice platform for managing omnichannel orders with SLA-aware routing.',
      technologies: ['Java 17', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Redis', 'Docker'],
      highlights: [
        'Delivered multi-tenant routing with feature flags using Unleash and Spring Cloud Config.',
        'Built idempotent command handlers with outbox patterns, preventing duplicate fulfillment events.',
        'Achieved 99.95% uptime over the past 12 months with proactive SLO dashboards.',
      ],
    },
    {
      id: 'proj-2',
      name: 'Developer Productivity Toolkit',
      role: 'Contributor',
      description: 'Internal CLI and Gradle plugin suite to standardize service scaffolding.',
      technologies: ['Kotlin', 'Gradle', 'Picocli', 'JUnit 5'],
      highlights: [
        'Cut bootstrap time for new JVM services from hours to under 20 minutes.',
        'Added golden-path templates for observability, security headers, and automated QA checks.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Washington',
      degree: "Bachelor's Degree",
      field: 'Computer Science',
      location: 'Seattle, WA',
      startDate: '2010-09',
      endDate: '2014-06',
      honors: ['Dean\'s List (6x)', 'ACM Chapter Lead'],
      coursework: ['Distributed Systems', 'Database Systems', 'Programming Languages', 'Operating Systems'],
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Checkout Latency Reduction',
      description: 'Lowered P95 checkout latency by 56% through async processing and caching.',
      metric: '56% faster',
    },
    {
      id: 'ach-2',
      title: 'On-call Stabilization',
      description: 'Drove incident runbooks and alert tuning that reduced Sev-1 pages from 11 to 3 per quarter.',
      metric: '-73% Sev-1s',
    },
    {
      id: 'ach-3',
      title: 'Mentorship',
      description: 'Mentored four junior engineers to mid-level promotions within 18 months.',
      metric: '4 promotions',
    },
  ],
  strengths: [
    {
      id: 'str-1',
      title: 'API Design',
      description: 'Clear contracts, backward compatibility, and strong observability baked into every endpoint.',
      icon: 'Brackets',
    },
    {
      id: 'str-2',
      title: 'Performance Tuning',
      description: 'Profiling JVM services with Flight Recorder, async strategies, and efficient data access.',
      icon: 'Gauge',
    },
    {
      id: 'str-3',
      title: 'Technical Leadership',
      description: 'Driving RFCs, code reviews, and pairing sessions that raise team quality and confidence.',
      icon: 'Users',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Oracle Certified Professional, Java SE 11 Developer',
      issuer: 'Oracle',
      date: '2021-02',
      credentialId: 'OCP11-78421',
    },
    {
      id: 'cert-2',
      name: 'AWS Certified Developer – Associate',
      issuer: 'Amazon Web Services',
      date: '2020-09',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Java', level: 5, category: 'Languages' },
    { id: 'skill-2', name: 'Kotlin', level: 4, category: 'Languages' },
    { id: 'skill-3', name: 'Spring Boot', level: 5, category: 'Frameworks' },
    { id: 'skill-4', name: 'Kafka', level: 4, category: 'Messaging' },
    { id: 'skill-5', name: 'PostgreSQL', level: 4, category: 'Datastores' },
    { id: 'skill-6', name: 'Docker', level: 4, category: 'DevOps' },
    { id: 'skill-7', name: 'Kubernetes', level: 3, category: 'DevOps' },
    { id: 'skill-8', name: 'REST & gRPC', level: 5, category: 'APIs' },
    { id: 'skill-9', name: 'JUnit 5', level: 4, category: 'Testing' },
    { id: 'skill-10', name: 'Grafana & Prometheus', level: 4, category: 'Observability' },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'Hindi', proficiency: 'Professional' },
  ],
  interests: [
    { id: 'int-1', name: 'Trail Running', description: 'Weekend long runs to reset and think through system designs.' },
    { id: 'int-2', name: 'Tech Blogging', description: 'Writing about JVM performance tips and architectural patterns.' },
  ],
  settings: {
    includeSocialLinks: true,
    includePhoto: false,
    dateFormat: 'MMM YYYY',
  },
};

export default mockData;
