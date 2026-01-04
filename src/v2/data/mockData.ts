/**
 * Resume Builder V2 - Mock Data
 * 
 * Sample resume data for testing and preview purposes.
 * Contains realistic data for different software roles.
 */

import type { V2ResumeData } from '../types';

// ============================================================================
// ROLE-SPECIFIC MOCK DATA
// ============================================================================

// Senior Frontend Developer - for senior-frontend-pro-v2
export const SENIOR_FRONTEND_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Alexandra Chen',
    email: 'alex.chen@techcorp.com',
    phone: '+1-555-0123',
    location: 'San Francisco, California',
    title: 'Senior Frontend Developer',
    summary: 'Senior Frontend Developer with 8+ years of experience building scalable, performant web applications. Expert in React, TypeScript, and modern frontend architectures. Led cross-functional teams to deliver enterprise-level solutions that serve millions of users. Passionate about creating exceptional user experiences and mentoring junior developers.',
    linkedin: 'linkedin.com/in/alexandrachen',
    portfolio: 'alexandrachen.dev',
    github: 'github.com/alexchen',
  },
    experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Solutions',
      position: 'Senior Frontend Developer',
      startDate: '2021-03',
      endDate: '',
      current: true,
      description: 'Lead frontend development for enterprise SaaS platform serving 10M+ users',
      bulletPoints: [
        'Architected and implemented micro-frontend architecture using React and TypeScript, improving team productivity by 40%',
        'Optimized application performance, reducing bundle size by 60% and improving Core Web Vitals scores',
        'Mentored 5 junior developers and established code review standards across the frontend team',
        'Led migration from legacy Angular to modern React stack, completed 6 months ahead of schedule',
      ],
    },
    {
      id: 'exp-2',
      company: 'Digital Innovations Inc',
      position: 'Frontend Developer',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: 'Developed responsive web applications for various clients in fintech and healthcare',
      bulletPoints: [
        'Built 15+ responsive web applications using React, Redux, and modern CSS frameworks',
        'Implemented comprehensive testing strategies with Jest and Cypress, achieving 95% code coverage',
        'Collaborated with UX team to implement design system used across 8 client projects',
        'Reduced page load times by 45% through performance optimization and lazy loading',
      ],
    },
    {
      id: 'exp-3',
      company: 'StartUp Labs',
      position: 'Junior Frontend Developer',
      startDate: '2016-01',
      endDate: '2018-05',
      current: false,
      description: 'Developed features for early-stage startup in the education technology space',
      bulletPoints: [
        'Contributed to MVP development using Vue.js and Node.js',
        'Implemented real-time features using WebSockets and Firebase',
        'Participated in agile development process and daily standups',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of California, Berkeley',
      degree: "Bachelor's Degree",
      field: 'Computer Science',
      startDate: '2012-09',
      endDate: '2016-05',
      location: 'Berkeley, California',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'React' },
    { id: 'skill-2', name: 'TypeScript' },
    { id: 'skill-3', name: 'JavaScript' },
    { id: 'skill-4', name: 'HTML5' },
    { id: 'skill-5', name: 'CSS3' },
    { id: 'skill-6', name: 'Redux' },
    { id: 'skill-7', name: 'Webpack' },
    { id: 'skill-8', name: 'Jest' },
    { id: 'skill-9', name: 'Cypress' },
    { id: 'skill-10', name: 'Git' },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Performance Optimization Award',
      description: 'Reduced application bundle size by 60% and improved Core Web Vitals scores across all products.',
    },
    {
      id: 'ach-2',
      title: 'Team Leadership Excellence',
      description: 'Successfully mentored 5 junior developers who all received promotions within 18 months.',
    },
  ],
  strengths: [
    {
      id: 'str-1',
      title: 'Frontend Architecture',
      description: 'Designed and implemented scalable frontend architectures that support millions of users.',
    },
    {
      id: 'str-2',
      title: 'Performance Optimization',
      description: 'Consistently delivered high-performance applications with industry-leading load times.',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' as const },
    { id: 'lang-2', language: 'Mandarin', proficiency: 'Fluent' as const },
    { id: 'lang-3', language: 'Spanish', proficiency: 'Intermediate' as const },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2022-06',
      credentialId: 'AWS-DEV-2022-1234',
    },
    {
      id: 'cert-2',
      name: 'Google Professional Cloud Developer',
      issuer: 'Google Cloud',
      date: '2021-11',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'E-commerce Platform Redesign',
      description: 'Led frontend redesign of major e-commerce platform serving 5M+ users',
      role: 'Lead Developer',
      technologies: ['React', 'TypeScript', 'GraphQL', 'Tailwind CSS'],
      techStack: ['React', 'TypeScript', 'GraphQL'],
      highlights: [
        'Improved conversion rate by 25%',
        'Reduced page load time by 60%',
        'Implemented new checkout flow',
      ],
    },
  ],
  volunteer: [
    {
      id: 'vol-1',
      organization: 'Code for America',
      role: 'Volunteer Developer',
      location: 'San Francisco, CA',
      startDate: '2021-01',
      endDate: '',
      current: true,
      description: 'Build civic technology applications for local government',
      highlights: [
        'Developed open-source tools for community engagement',
        'Mentored 10+ aspiring developers',
      ],
    },
  ],
  interests: [
    { id: 'int-1', name: 'Open Source' },
    { id: 'int-2', name: 'Web Performance' },
    { id: 'int-3', name: 'UI/UX Design' },
    { id: 'int-4', name: 'Tech Mentoring' },
    { id: 'int-5', name: 'Hiking' },
  ],
  awards: [
    {
      id: 'award-1',
      title: 'Employee of the Year',
      issuer: 'TechCorp Solutions',
      date: '2022-12',
      description: 'Recognized for outstanding contributions to the platform team.',
    },
    {
      id: 'award-2',
      title: 'Innovation Award',
      issuer: 'Digital Innovations Inc',
      date: '2020-06',
      description: 'Best technical implementation of the quarter.',
    },
  ],
};

// Data Scientist - for data-pro-v2
export const DATA_SCIENTIST_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Dr. Marcus Rodriguez',
    email: 'm.rodriguez@datatech.com',
    phone: '+1-555-0124',
    location: 'Seattle, Washington',
    title: 'Senior Data Scientist',
    summary: 'Data Scientist with 6+ years of experience in machine learning, statistical analysis, and big data technologies. PhD in Computer Science with specialization in deep learning. Proven track record of developing predictive models that drive business decisions and generate millions in revenue. Expert in Python, TensorFlow, and cloud-based ML platforms.',
    linkedin: 'linkedin.com/in/marcusrodriguez',
    portfolio: 'marcusdatascience.com',
    github: 'github.com/marcusr',
  },
    experience: [
    {
      id: 'exp-1',
      company: 'DataTech Analytics',
      position: 'Senior Data Scientist',
      startDate: '2020-07',
      endDate: '',
      current: true,
      description: 'Lead ML initiatives for enterprise clients in finance and healthcare sectors',
      bulletPoints: [
        'Developed predictive models that reduced customer churn by 35%, saving $5M annually',
        'Built real-time fraud detection system processing 1M+ transactions daily with 99.8% accuracy',
        'Led team of 4 data scientists in implementing MLOps pipeline using AWS SageMaker',
        'Published 3 research papers in peer-reviewed journals on deep learning applications',
      ],
    },
    {
      id: 'exp-2',
      company: 'AI Innovations Lab',
      position: 'Data Scientist',
      startDate: '2018-01',
      endDate: '2020-06',
      current: false,
      description: 'Developed ML solutions for various industries including retail and manufacturing',
      bulletPoints: [
        'Created recommendation engine that increased sales by 25% for major e-commerce client',
        'Implemented time series forecasting models reducing inventory costs by 30%',
        'Developed NLP models for sentiment analysis with 92% accuracy',
        'Optimized data processing pipelines, reducing computation time by 70%',
      ],
    },
    {
      id: 'exp-3',
      company: 'Research University',
      position: 'Graduate Research Assistant',
      startDate: '2015-09',
      endDate: '2017-12',
      current: false,
      description: 'Conducted research on deep learning and computer vision',
      bulletPoints: [
        'Published 5 papers in top-tier conferences (NeurIPS, ICML, CVPR)',
        'Developed novel neural network architecture for image recognition',
        'Taught undergraduate courses in machine learning and statistics',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      degree: 'PhD',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2018-06',
      location: 'Stanford, California',
    },
    {
      id: 'edu-2',
      school: 'MIT',
      degree: "Master's Degree",
      field: 'Data Science',
      startDate: '2013-09',
      endDate: '2015-05',
      location: 'Cambridge, Massachusetts',
    },
    {
      id: 'edu-3',
      school: 'University of Washington',
      degree: "Bachelor's Degree",
      field: 'Mathematics',
      startDate: '2009-09',
      endDate: '2013-05',
      location: 'Seattle, Washington',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Python' },
    { id: 'skill-2', name: 'TensorFlow' },
    { id: 'skill-3', name: 'PyTorch' },
    { id: 'skill-4', name: 'Scikit-learn' },
    { id: 'skill-5', name: 'Pandas' },
    { id: 'skill-6', name: 'NumPy' },
    { id: 'skill-7', name: 'SQL' },
    { id: 'skill-8', name: 'AWS' },
    { id: 'skill-9', name: 'Docker' },
    { id: 'skill-10', name: 'Kubernetes' },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Industry Innovation Award',
      description: 'Received industry recognition for developing fraud detection system with 99.8% accuracy.',
    },
    {
      id: 'ach-2',
      title: 'Research Excellence',
      description: 'Published 8 peer-reviewed papers in top-tier ML conferences and journals.',
    },
  ],
  strengths: [
    {
      id: 'str-1',
      title: 'Machine Learning',
      description: 'Expert in developing and deploying ML models at scale for real-world applications.',
    },
    {
      id: 'str-2',
      title: 'Statistical Analysis',
      description: 'Advanced knowledge of statistical methods and their practical business applications.',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' as const },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Fluent' as const },
  ],
};

// Executive CTO - for executive-split-v2
export const EXECUTIVE_CTO_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Robert Thompson',
    email: 'r.thompson@techexec.com',
    phone: '+1-555-0125',
    location: 'New York, New York',
    title: 'Chief Technology Officer',
    summary: 'Visionary technology executive with 15+ years of experience leading engineering organizations and driving digital transformation. Proven track record of scaling engineering teams from 10 to 500+ engineers while delivering innovative products that generate billions in revenue. Expert in cloud architecture, AI/ML strategy, and building high-performance engineering cultures.',
    linkedin: 'linkedin.com/in/robertthompson',
    portfolio: '',
    github: '',
  },
    experience: [
    {
      id: 'exp-1',
      company: 'GlobalTech Enterprises',
      position: 'Chief Technology Officer',
      startDate: '2019-01',
      endDate: '',
      current: true,
      description: 'Lead technology strategy and engineering organization for $10B enterprise software company',
      bulletPoints: [
        'Scaled engineering team from 50 to 500+ engineers across 8 global offices while maintaining quality',
        'Led digital transformation initiative that migrated 100+ legacy applications to cloud infrastructure',
        'Established AI/ML center of excellence, developing products that generated $500M in new revenue',
        'Reduced infrastructure costs by 40% through cloud optimization and DevOps practices',
        'Improved engineering productivity by 60% through implementation of modern development practices',
      ],
    },
    {
      id: 'exp-2',
      company: 'Innovation Systems Inc',
      position: 'VP of Engineering',
      startDate: '2015-06',
      endDate: '2018-12',
      current: false,
      description: 'Led engineering organization for high-growth SaaS company',
      bulletPoints: [
        'Built and scaled engineering team from 10 to 150 engineers across product, platform, and DevOps',
        'Delivered 5 major product releases on time and under budget, serving enterprise clients',
        'Implemented microservices architecture that improved system reliability to 99.99%',
        'Established engineering processes that reduced bug density by 75%',
      ],
    },
    {
      id: 'exp-3',
      company: 'CloudScale Technologies',
      position: 'Director of Engineering',
      startDate: '2012-03',
      endDate: '2015-05',
      current: false,
      description: 'Managed cloud platform engineering team',
      bulletPoints: [
        'Led development of cloud platform serving 10M+ users with 99.9% uptime',
        'Managed team of 25 engineers across multiple time zones',
        'Reduced infrastructure costs by 35% through optimization and automation',
      ],
    },
    {
      id: 'exp-4',
      company: 'StartUp Ventures',
      position: 'Founding Engineer',
      startDate: '2008-09',
      endDate: '2012-02',
      current: false,
      description: 'Early employee at successful startup',
      bulletPoints: [
        'Built core platform architecture from scratch',
        'Contributed to company growth from 5 to 50 employees',
        'Led technical due diligence for successful acquisition',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Harvard Business School',
      degree: 'MBA',
      field: 'Business Administration',
      startDate: '2010-09',
      endDate: '2012-05',
      location: 'Cambridge, Massachusetts',
    },
    {
      id: 'edu-2',
      school: 'Carnegie Mellon University',
      degree: "Master's Degree",
      field: 'Computer Science',
      startDate: '2006-09',
      endDate: '2008-05',
      location: 'Pittsburgh, Pennsylvania',
    },
    {
      id: 'edu-3',
      school: 'University of Michigan',
      degree: "Bachelor's Degree",
      field: 'Computer Engineering',
      startDate: '2002-09',
      endDate: '2006-05',
      location: 'Ann Arbor, Michigan',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Technology Strategy' },
    { id: 'skill-2', name: 'Team Leadership' },
    { id: 'skill-3', name: 'Cloud Architecture' },
    { id: 'skill-4', name: 'Digital Transformation' },
    { id: 'skill-5', name: 'DevOps' },
    { id: 'skill-6', name: 'AI/ML Strategy' },
    { id: 'skill-7', name: 'Budget Management' },
    { id: 'skill-8', name: 'Product Management' },
    { id: 'skill-9', name: 'Agile/Scrum' },
    { id: 'skill-10', name: 'Stakeholder Management' },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Digital Transformation Leader',
      description: 'Successfully led company-wide digital transformation, generating $2B in operational efficiencies.',
    },
    {
      id: 'ach-2',
      title: 'Team Scaling Excellence',
      description: 'Built and scaled high-performing engineering organization from 50 to 500+ engineers globally.',
    },
    {
      id: 'ach-3',
      title: 'Innovation Driver',
      description: 'Established AI/ML center of excellence that created $500M in new revenue streams.',
    },
  ],
  strengths: [
    {
      id: 'str-1',
      title: 'Strategic Vision',
      description: 'Developed and executed technology strategies that aligned with business goals and drove growth.',
    },
    {
      id: 'str-2',
      title: 'Organizational Leadership',
      description: 'Built high-performance engineering cultures that attract and retain top talent.',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' as const },
    { id: 'lang-2', language: 'French', proficiency: 'Professional' as const },
  ],
};

// Full Stack Developer - for minimal-v2
export const FULL_STACK_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Sarah Kim',
    email: 'sarah.kim@devstudio.com',
    phone: '+1-555-0126',
    location: 'Austin, Texas',
    title: 'Full Stack Developer',
    summary: 'Full Stack Developer with 5+ years of experience building end-to-end web applications. Proficient in React, Node.js, Python, and cloud technologies. Passionate about clean code, test-driven development, and creating seamless user experiences. Experienced in agile environments and cross-functional collaboration.',
    linkedin: 'linkedin.com/in/sarahkimdev',
    portfolio: 'sarahkim.dev',
    github: 'github.com/sarahkim',
  },
    experience: [
    {
      id: 'exp-1',
      company: 'DevStudio Solutions',
      position: 'Full Stack Developer',
      startDate: '2020-08',
      endDate: '',
      current: true,
      description: 'Develop full-stack applications for various clients in different industries',
      bulletPoints: [
        'Built 10+ full-stack applications using React, Node.js, and PostgreSQL',
        'Implemented RESTful APIs and GraphQL endpoints serving 100K+ daily requests',
        'Developed automated testing suite with 90% code coverage using Jest and Cypress',
        'Optimized database queries reducing response times by 60%',
        'Deployed applications to AWS using Docker and CI/CD pipelines',
      ],
    },
    {
      id: 'exp-2',
      company: 'TechStart Inc',
      position: 'Frontend Developer',
      startDate: '2018-06',
      endDate: '2020-07',
      current: false,
      description: 'Focused on frontend development for SaaS platform',
      bulletPoints: [
        'Developed responsive user interfaces using React and TypeScript',
        'Implemented state management with Redux and Context API',
        'Collaborated with backend team to integrate APIs and optimize performance',
        'Participated in code reviews and mentored junior developers',
      ],
    },
    {
      id: 'exp-3',
      company: 'Digital Agency Co',
      position: 'Junior Web Developer',
      startDate: '2016-09',
      endDate: '2018-05',
      current: false,
      description: 'Developed websites and web applications for various clients',
      bulletPoints: [
        'Built responsive websites using HTML, CSS, JavaScript, and WordPress',
        'Created custom themes and plugins for client websites',
        'Provided technical support and maintenance for existing applications',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Texas at Austin',
      degree: "Bachelor's Degree",
      field: 'Computer Science',
      startDate: '2012-09',
      endDate: '2016-05',
      location: 'Austin, Texas',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'JavaScript' },
    { id: 'skill-2', name: 'React' },
    { id: 'skill-3', name: 'Node.js' },
    { id: 'skill-4', name: 'Python' },
    { id: 'skill-5', name: 'TypeScript' },
    { id: 'skill-6', name: 'Express.js' },
    { id: 'skill-7', name: 'PostgreSQL' },
    { id: 'skill-8', name: 'MongoDB' },
    { id: 'skill-9', name: 'AWS' },
    { id: 'skill-10', name: 'Docker' },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Full-Stack Excellence',
      description: 'Successfully delivered 10+ full-stack projects on time and within budget.',
    },
    {
      id: 'ach-2',
      title: 'Performance Optimization',
      description: 'Improved application performance by 60% through database and frontend optimization.',
    },
  ],
  strengths: [
    {
      id: 'str-1',
      title: 'Full-Stack Development',
      description: 'Comfortable working across the entire technology stack from frontend to backend.',
    },
    {
      id: 'str-2',
      title: 'Problem Solving',
      description: 'Excellent analytical skills and ability to troubleshoot complex technical issues.',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' as const },
    { id: 'lang-2', language: 'Korean', proficiency: 'Fluent' as const },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2021-08',
      credentialId: 'AWS-SA-2021-5678',
    },
    {
      id: 'cert-2',
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2020-03',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Open Source Task Manager',
      description: 'Built a full-stack task management app with React, Node.js, and PostgreSQL',
      role: 'Creator & Maintainer',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      techStack: ['React', 'Node.js', 'PostgreSQL'],
      highlights: [
        'Over 500 GitHub stars',
        'Featured in JavaScript Weekly',
        'Used by 1000+ developers',
      ],
      githubUrl: 'github.com/sarahkim/taskmanager',
    },
  ],
  volunteer: [
    {
      id: 'vol-1',
      organization: 'Women Who Code',
      role: 'Workshop Instructor',
      location: 'Austin, TX',
      startDate: '2020-06',
      endDate: '',
      current: true,
      description: 'Teach web development workshops to underrepresented groups in tech',
      highlights: [
        'Conducted 15+ workshops on React and Node.js',
        'Mentored 30+ aspiring developers',
      ],
    },
  ],
  interests: [
    { id: 'int-1', name: 'Open Source' },
    { id: 'int-2', name: 'Tech Blogging' },
    { id: 'int-3', name: 'Hackathons' },
    { id: 'int-4', name: 'Rock Climbing' },
    { id: 'int-5', name: 'Coffee Brewing' },
  ],
  awards: [
    {
      id: 'award-1',
      title: 'Best Developer Award',
      issuer: 'DevStudio Solutions',
      date: '2022-12',
      description: 'Recognized for exceptional code quality and team collaboration.',
    },
    {
      id: 'award-2',
      title: 'Hackathon Winner',
      issuer: 'Austin Tech Week',
      date: '2021-09',
      description: 'First place for building an accessibility-focused web app in 48 hours.',
    },
  ],
};

// DevOps Engineer - for bold-headline-v2
export const DEVOPS_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Michael Foster',
    email: 'm.foster@cloudops.com',
    phone: '+1-555-0127',
    location: 'Denver, Colorado',
    title: 'Senior DevOps Engineer',
    summary: 'Senior DevOps Engineer with 7+ years of experience designing and implementing scalable infrastructure solutions. Expert in cloud architecture, containerization, and automation. Reduced infrastructure costs by 50% while improving system reliability and deployment frequency. Passionate about DevOps culture and mentoring teams on best practices.',
    linkedin: 'linkedin.com/in/michaelfoster',
    portfolio: 'michaelfoster.dev',
    github: 'github.com/mfoster',
  },
    experience: [
    {
      id: 'exp-1',
      company: 'CloudOps Solutions',
      position: 'Senior DevOps Engineer',
      startDate: '2020-02',
      endDate: '',
      current: true,
      description: 'Lead DevOps initiatives for enterprise clients across various industries',
      bulletPoints: [
        'Designed and implemented Kubernetes clusters serving 50M+ requests daily with 99.99% uptime',
        'Built CI/CD pipelines using GitLab CI and Jenkins, reducing deployment time by 80%',
        'Automated infrastructure provisioning using Terraform and Ansible, reducing manual work by 90%',
        'Implemented monitoring and alerting solutions using Prometheus and Grafana',
        'Reduced infrastructure costs by 50% through optimization and cloud-native technologies',
      ],
    },
    {
      id: 'exp-2',
      company: 'TechScale Platform',
      position: 'DevOps Engineer',
      startDate: '2017-08',
      endDate: '2020-01',
      current: false,
      description: 'Managed cloud infrastructure and DevOps processes',
      bulletPoints: [
        'Migrated monolithic applications to microservices architecture using Docker and Kubernetes',
        'Implemented infrastructure as code across AWS, Azure, and GCP environments',
        'Established DevOps best practices and mentored development teams',
        'Reduced deployment failures by 75% through improved testing and automation',
      ],
    },
    {
      id: 'exp-3',
      company: 'Startup Hub',
      position: 'Junior DevOps Engineer',
      startDate: '2016-01',
      endDate: '2017-07',
      current: false,
      description: 'Supported DevOps operations for fast-growing startup',
      bulletPoints: [
        'Managed AWS infrastructure and implemented monitoring solutions',
        'Automated deployment processes using shell scripts and Jenkins',
        'Provided 24/7 on-call support and incident response',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Colorado State University',
      degree: "Bachelor's Degree",
      field: 'Computer Information Systems',
      startDate: '2011-09',
      endDate: '2015-05',
      location: 'Fort Collins, Colorado',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'AWS' },
    { id: 'skill-2', name: 'Kubernetes' },
    { id: 'skill-3', name: 'Docker' },
    { id: 'skill-4', name: 'Terraform' },
    { id: 'skill-5', name: 'Ansible' },
    { id: 'skill-6', name: 'Jenkins' },
    { id: 'skill-7', name: 'GitLab CI' },
    { id: 'skill-8', name: 'Prometheus' },
    { id: 'skill-9', name: 'Grafana' },
    { id: 'skill-10', name: 'Linux' },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Infrastructure Optimization',
      description: 'Reduced infrastructure costs by 50% while improving performance and reliability.',
    },
    {
      id: 'ach-2',
      title: 'Automation Excellence',
      description: 'Automated 90% of manual infrastructure tasks, improving team efficiency significantly.',
    },
  ],
  strengths: [
    {
      id: 'str-1',
      title: 'Cloud Architecture',
      description: 'Expert in designing scalable and secure cloud infrastructure solutions.',
    },
    {
      id: 'str-2',
      title: 'Automation',
      description: 'Skilled in automating complex workflows and infrastructure management tasks.',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' as const },
  ],
};

// Software Engineer - for accountant-pro-v2 (adapted for tech)
export const SOFTWARE_ENGINEER_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Jennifer Martinez',
    email: 'j.martinez@softdev.com',
    phone: '+1-555-0128',
    location: 'Chicago, Illinois',
    title: 'Software Engineer',
    summary: 'Software Engineer with 4+ years of experience developing robust applications and systems. Strong foundation in computer science fundamentals and software engineering principles. Experienced in Java, Python, and modern web technologies. Committed to writing clean, maintainable code and collaborating effectively in team environments.',
    linkedin: 'linkedin.com/in/jennifermartinez',
    portfolio: 'jennifermartinez.dev',
    github: 'github.com/jennmartinez',
  },
    experience: [
    {
      id: 'exp-1',
      company: 'Software Development Co',
      position: 'Software Engineer',
      startDate: '2020-06',
      endDate: '',
      current: true,
      description: 'Develop software applications for enterprise clients',
      bulletPoints: [
        'Developed and maintained Java-based enterprise applications serving 100K+ users',
        'Built RESTful APIs using Spring Boot and integrated with various databases',
        'Implemented automated testing using JUnit and Mockito, achieving 85% code coverage',
        'Participated in agile development process including daily standups and sprint planning',
        'Collaborated with cross-functional teams to deliver features on schedule',
      ],
    },
    {
      id: 'exp-2',
      company: 'Tech Solutions Inc',
      position: 'Junior Software Engineer',
      startDate: '2018-07',
      endDate: '2020-05',
      current: false,
      description: 'Developed web applications and backend services',
      bulletPoints: [
        'Built web applications using Python, Django, and PostgreSQL',
        'Developed frontend components using React and JavaScript',
        'Wrote unit tests and integration tests for backend services',
        'Participated in code reviews and contributed to technical documentation',
      ],
    },
    {
      id: 'exp-3',
      company: 'Code Academy',
      position: 'Teaching Assistant',
      startDate: '2017-09',
      endDate: '2018-06',
      current: false,
      description: 'Assisted in teaching programming courses',
      bulletPoints: [
        'Taught Java and Python fundamentals to undergraduate students',
        'Graded assignments and provided feedback on code quality',
        'Conducted tutoring sessions for students needing extra help',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'University of Illinois Urbana-Champaign',
      degree: "Bachelor's Degree",
      field: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      location: 'Urbana-Champaign, Illinois',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Java' },
    { id: 'skill-2', name: 'Python' },
    { id: 'skill-3', name: 'JavaScript' },
    { id: 'skill-4', name: 'Spring Boot' },
    { id: 'skill-5', name: 'React' },
    { id: 'skill-6', name: 'SQL' },
    { id: 'skill-7', name: 'Git' },
    { id: 'skill-8', name: 'Maven' },
    { id: 'skill-9', name: 'Docker' },
    { id: 'skill-10', name: 'Linux' },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Code Quality Champion',
      description: 'Achieved 85% code coverage through comprehensive testing practices.',
    },
    {
      id: 'ach-2',
      title: 'Team Collaboration',
      description: 'Recognized for excellent teamwork and mentoring junior developers.',
    },
  ],
  strengths: [
    {
      id: 'str-1',
      title: 'Software Development',
      description: 'Strong foundation in software engineering principles and best practices.',
    },
    {
      id: 'str-2',
      title: 'Problem Solving',
      description: 'Excellent analytical skills for debugging and optimizing complex systems.',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' as const },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Fluent' as const },
  ],
};

// ============================================================================
// LEGACY MOCK DATA (for backward compatibility)
// ============================================================================

export const MOCK_RESUME_DATA: V2ResumeData = SENIOR_FRONTEND_DATA;

// Empty resume data for new resumes
export const EMPTY_RESUME_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    linkedin: '',
    portfolio: '',
    github: '',
  },
  experience: [],
  education: [],
  skills: [],
};

// Minimal resume data for quick start
export const MINIMAL_RESUME_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Your Name',
    email: 'email@example.com',
    phone: '+1-234-567-8900',
    location: 'City, State',
    title: 'Professional Title',
    summary: 'A brief summary of your professional background and key achievements.',
    linkedin: '',
    portfolio: '',
    github: '',
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
        'Key achievement or responsibility',
        'Another important accomplishment',
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
};
