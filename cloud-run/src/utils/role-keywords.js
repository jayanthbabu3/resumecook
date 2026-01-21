/**
 * Role-Specific Keywords Database
 *
 * Contains industry-specific keywords, action verbs, metrics templates,
 * and enhancement hints for various professional roles.
 */

export const ROLE_KEYWORDS = {
  'Developer Advocate': {
    keywords: [
      'developer relations', 'community', 'technical content', 'documentation',
      'tutorials', 'demos', 'workshops', 'conferences', 'speaking', 'evangelism',
      'developer experience', 'DX', 'onboarding', 'adoption', 'engagement',
      'feedback', 'advocacy', 'outreach', 'partnerships', 'ecosystem',
      'SDK', 'API', 'integration', 'developer tools'
    ],
    actionVerbs: [
      'Championed', 'Evangelized', 'Presented', 'Educated', 'Engaged',
      'Built', 'Cultivated', 'Created', 'Launched', 'Grew',
      'Developed', 'Produced', 'Delivered', 'Collaborated', 'Partnered'
    ],
    metricsTemplates: [
      'grew community to X members',
      'reached X developers through content',
      'delivered X talks/workshops',
      'increased adoption by X%',
      'produced X tutorials/guides',
      'engaged X developers at conferences',
      'built community of X+ members'
    ],
    summaryHints: [
      'passionate about developer education and community building',
      'experience creating technical content that drives product adoption',
      'track record of building and engaging developer communities',
      'strong public speaking and technical communication skills'
    ]
  },

  'Content Creator': {
    keywords: [
      'content', 'video', 'tutorial', 'audience', 'engagement', 'reach',
      'social media', 'YouTube', 'community', 'subscribers', 'followers',
      'brand', 'partnerships', 'collaboration', 'editing', 'production'
    ],
    actionVerbs: [
      'Created', 'Produced', 'Grew', 'Launched', 'Built',
      'Engaged', 'Collaborated', 'Partnered', 'Developed', 'Cultivated'
    ],
    metricsTemplates: [
      'grew audience to X followers',
      'reached X views',
      'produced X pieces of content',
      'achieved X engagement rate',
      'partnered with X brands'
    ],
    summaryHints: [
      'passionate content creator with engaged audience',
      'expertise in video production and audience growth',
      'track record of successful brand partnerships'
    ]
  },

  'Technical Writer': {
    keywords: [
      'documentation', 'technical writing', 'API docs', 'guides', 'tutorials',
      'user guides', 'developer docs', 'content strategy', 'information architecture',
      'style guide', 'editing', 'clarity', 'accessibility'
    ],
    actionVerbs: [
      'Authored', 'Documented', 'Created', 'Developed', 'Wrote',
      'Edited', 'Streamlined', 'Simplified', 'Structured', 'Maintained'
    ],
    metricsTemplates: [
      'documented X APIs/features',
      'reduced support tickets by X%',
      'created X pages of documentation',
      'improved docs satisfaction score to X'
    ],
    summaryHints: [
      'skilled at translating complex technical concepts into clear documentation',
      'experience with developer documentation and API references',
      'focus on user experience and accessibility in technical content'
    ]
  },

  'Software Engineer': {
    keywords: [
      'scalable', 'microservices', 'API', 'REST', 'GraphQL', 'CI/CD',
      'agile', 'scrum', 'system design', 'architecture', 'performance',
      'optimization', 'debugging', 'code review', 'technical debt',
      'refactoring', 'testing', 'unit tests', 'integration tests',
      'deployment', 'monitoring', 'logging', 'documentation'
    ],
    actionVerbs: [
      'Architected', 'Engineered', 'Developed', 'Implemented', 'Optimized',
      'Scaled', 'Refactored', 'Debugged', 'Automated', 'Integrated',
      'Deployed', 'Designed', 'Built', 'Migrated', 'Modernized'
    ],
    metricsTemplates: [
      'reduced latency by X%',
      'improved performance by X%',
      'handled X requests per second',
      'decreased load time by X%',
      'increased test coverage to X%',
      'reduced bug count by X%',
      'served X daily active users',
      'processed X transactions daily',
      'reduced deployment time by X%',
      'cut infrastructure costs by X%'
    ],
    summaryHints: [
      'years of experience building scalable applications',
      'expertise in [specific technologies]',
      'track record of delivering high-impact features',
      'passion for clean code and best practices'
    ]
  },

  'Mobile Developer': {
    keywords: [
      'React Native', 'iOS', 'Android', 'Swift', 'Kotlin', 'Flutter',
      'mobile architecture', 'cross-platform', 'native development', 'app store',
      'push notifications', 'offline-first', 'mobile performance', 'deep linking',
      'mobile security', 'mobile testing', 'CI/CD', 'app deployment', 'user experience',
      'mobile UI', 'responsive design', 'mobile optimization', 'crash reporting'
    ],
    actionVerbs: [
      'Architected', 'Developed', 'Built', 'Launched', 'Optimized',
      'Migrated', 'Modernized', 'Implemented', 'Designed', 'Delivered',
      'Led', 'Mentored', 'Scaled', 'Integrated', 'Published'
    ],
    metricsTemplates: [
      'launched app with X downloads',
      'achieved X star rating on app store',
      'improved app performance by X%',
      'reduced crash rate by X%',
      'increased user retention by X%',
      'reduced app size by X%',
      'served X monthly active users',
      'decreased load time by X%',
      'improved battery efficiency by X%'
    ],
    summaryHints: [
      'experienced in native and cross-platform mobile development',
      'track record of delivering high-quality mobile applications',
      'expertise in mobile architecture and performance optimization',
      'passionate about creating seamless mobile user experiences'
    ]
  },

  'Frontend Developer': {
    keywords: [
      'React', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'CSS',
      'responsive design', 'accessibility', 'a11y', 'WCAG', 'performance',
      'SEO', 'SSR', 'SSG', 'state management', 'Redux', 'component library',
      'design system', 'UI/UX', 'cross-browser', 'mobile-first', 'PWA',
      'webpack', 'vite', 'testing', 'Jest', 'Cypress', 'Storybook'
    ],
    actionVerbs: [
      'Crafted', 'Designed', 'Built', 'Implemented', 'Optimized',
      'Modernized', 'Created', 'Developed', 'Enhanced', 'Streamlined',
      'Architected', 'Refactored', 'Transformed', 'Delivered', 'Launched'
    ],
    metricsTemplates: [
      'improved Core Web Vitals by X%',
      'reduced bundle size by X%',
      'increased Lighthouse score to X',
      'decreased page load time by X%',
      'achieved X% accessibility compliance',
      'served X monthly active users',
      'increased conversion rate by X%',
      'reduced bounce rate by X%',
      'improved mobile engagement by X%'
    ],
    summaryHints: [
      'passionate about creating exceptional user experiences',
      'expertise in modern frontend frameworks',
      'focus on performance and accessibility',
      'experience building design systems'
    ]
  },

  'Backend Developer': {
    keywords: [
      'API', 'REST', 'GraphQL', 'microservices', 'database', 'SQL',
      'NoSQL', 'PostgreSQL', 'MongoDB', 'Redis', 'caching', 'queue',
      'message broker', 'Kafka', 'RabbitMQ', 'authentication', 'OAuth',
      'security', 'scalability', 'distributed systems', 'Docker',
      'Kubernetes', 'AWS', 'cloud', 'serverless', 'performance tuning'
    ],
    actionVerbs: [
      'Architected', 'Engineered', 'Designed', 'Implemented', 'Optimized',
      'Scaled', 'Secured', 'Migrated', 'Integrated', 'Automated',
      'Built', 'Developed', 'Refactored', 'Deployed', 'Maintained'
    ],
    metricsTemplates: [
      'reduced API response time by X%',
      'scaled system to handle X requests/sec',
      'improved database query performance by X%',
      'reduced server costs by X%',
      'achieved X% uptime SLA',
      'processed X million transactions daily',
      'reduced memory usage by X%',
      'handled X concurrent connections'
    ],
    summaryHints: [
      'expertise in building robust and scalable backend systems',
      'experience with high-traffic distributed systems',
      'focus on security and performance',
      'track record of designing reliable APIs'
    ]
  },

  'Full Stack Developer': {
    keywords: [
      'full stack', 'end-to-end', 'frontend', 'backend', 'API', 'database',
      'React', 'Node.js', 'TypeScript', 'responsive', 'scalable',
      'deployment', 'CI/CD', 'AWS', 'cloud', 'agile', 'REST', 'GraphQL',
      'authentication', 'testing', 'performance', 'architecture'
    ],
    actionVerbs: [
      'Developed', 'Architected', 'Built', 'Delivered', 'Implemented',
      'Designed', 'Deployed', 'Integrated', 'Optimized', 'Launched',
      'Created', 'Engineered', 'Maintained', 'Scaled', 'Led'
    ],
    metricsTemplates: [
      'delivered X features end-to-end',
      'reduced development time by X%',
      'served X active users',
      'improved application performance by X%',
      'maintained X% code coverage',
      'reduced time-to-market by X%',
      'handled X daily transactions'
    ],
    summaryHints: [
      'versatile developer with expertise across the full stack',
      'ability to deliver complete features independently',
      'experience with modern web technologies',
      'passion for building user-centric products'
    ]
  },

  'DevOps Engineer': {
    keywords: [
      'CI/CD', 'automation', 'infrastructure', 'cloud', 'AWS', 'Azure',
      'GCP', 'Kubernetes', 'Docker', 'Terraform', 'IaC', 'monitoring',
      'observability', 'logging', 'alerting', 'SRE', 'reliability',
      'deployment', 'pipelines', 'GitOps', 'security', 'compliance',
      'cost optimization', 'disaster recovery', 'high availability'
    ],
    actionVerbs: [
      'Automated', 'Implemented', 'Architected', 'Deployed', 'Optimized',
      'Secured', 'Monitored', 'Scaled', 'Migrated', 'Established',
      'Configured', 'Streamlined', 'Maintained', 'Built', 'Designed'
    ],
    metricsTemplates: [
      'reduced deployment time from X to Y',
      'achieved X% uptime SLA',
      'cut infrastructure costs by X%',
      'automated X% of deployment processes',
      'reduced MTTR by X%',
      'managed X servers/containers',
      'improved release frequency by X%',
      'reduced security incidents by X%'
    ],
    summaryHints: [
      'expertise in cloud infrastructure and automation',
      'track record of improving deployment reliability',
      'focus on security and cost optimization',
      'experience with modern DevOps practices'
    ]
  },

  'Data Scientist': {
    keywords: [
      'machine learning', 'ML', 'AI', 'deep learning', 'neural networks',
      'Python', 'TensorFlow', 'PyTorch', 'statistics', 'data analysis',
      'predictive modeling', 'NLP', 'computer vision', 'feature engineering',
      'model deployment', 'MLOps', 'A/B testing', 'experimentation',
      'SQL', 'big data', 'Spark', 'data pipeline', 'visualization'
    ],
    actionVerbs: [
      'Developed', 'Built', 'Trained', 'Deployed', 'Optimized',
      'Analyzed', 'Designed', 'Implemented', 'Created', 'Automated',
      'Discovered', 'Predicted', 'Modeled', 'Engineered', 'Led'
    ],
    metricsTemplates: [
      'improved model accuracy by X%',
      'increased prediction precision to X%',
      'reduced model inference time by X%',
      'generated $X in revenue through ML solutions',
      'processed X GB of data daily',
      'achieved X% lift in conversion',
      'reduced false positives by X%',
      'automated X hours of manual analysis weekly'
    ],
    summaryHints: [
      'expertise in building production ML systems',
      'track record of delivering business impact through data science',
      'experience with end-to-end ML pipelines',
      'passion for turning data into actionable insights'
    ]
  },

  'Data Analyst': {
    keywords: [
      'SQL', 'data analysis', 'visualization', 'Tableau', 'Power BI',
      'Excel', 'Python', 'R', 'statistics', 'reporting', 'dashboards',
      'KPIs', 'metrics', 'insights', 'business intelligence', 'BI',
      'ETL', 'data modeling', 'forecasting', 'trend analysis', 'A/B testing'
    ],
    actionVerbs: [
      'Analyzed', 'Identified', 'Created', 'Built', 'Developed',
      'Delivered', 'Presented', 'Automated', 'Optimized', 'Discovered',
      'Reported', 'Visualized', 'Tracked', 'Forecasted', 'Recommended'
    ],
    metricsTemplates: [
      'analyzed X+ data points',
      'identified insights that saved $X',
      'created dashboards tracking X KPIs',
      'automated X hours of reporting weekly',
      'improved forecast accuracy by X%',
      'supported X stakeholders with data insights',
      'reduced reporting time by X%'
    ],
    summaryHints: [
      'skilled at translating data into business insights',
      'experience building impactful dashboards and reports',
      'strong foundation in statistics and analysis',
      'track record of influencing business decisions with data'
    ]
  },

  'Product Manager': {
    keywords: [
      'product strategy', 'roadmap', 'stakeholder management', 'agile',
      'scrum', 'user research', 'market analysis', 'competitive analysis',
      'PRD', 'user stories', 'prioritization', 'OKRs', 'KPIs', 'metrics',
      'A/B testing', 'experimentation', 'GTM', 'go-to-market', 'launch',
      'customer development', 'MVP', 'feature', 'backlog', 'sprint'
    ],
    actionVerbs: [
      'Led', 'Launched', 'Defined', 'Drove', 'Prioritized',
      'Delivered', 'Managed', 'Collaborated', 'Aligned', 'Owned',
      'Spearheaded', 'Orchestrated', 'Championed', 'Influenced', 'Scaled'
    ],
    metricsTemplates: [
      'launched X features to Y users',
      'increased revenue by $X',
      'grew DAU/MAU by X%',
      'improved retention by X%',
      'reduced churn by X%',
      'managed product with $X ARR',
      'led team of X engineers/designers',
      'achieved X% user satisfaction score'
    ],
    summaryHints: [
      'track record of launching successful products',
      'expertise in user research and data-driven decisions',
      'experience managing cross-functional teams',
      'passion for solving customer problems'
    ]
  },

  'Designer': {
    keywords: [
      'UI', 'UX', 'user experience', 'user interface', 'design system',
      'Figma', 'Sketch', 'Adobe', 'prototyping', 'wireframing',
      'user research', 'usability testing', 'accessibility', 'responsive',
      'visual design', 'interaction design', 'information architecture',
      'design thinking', 'user-centered', 'mobile', 'web', 'brand'
    ],
    actionVerbs: [
      'Designed', 'Created', 'Led', 'Developed', 'Conducted',
      'Improved', 'Established', 'Collaborated', 'Delivered', 'Crafted',
      'Prototyped', 'Tested', 'Iterated', 'Launched', 'Transformed'
    ],
    metricsTemplates: [
      'improved user satisfaction by X%',
      'increased conversion rate by X%',
      'reduced user errors by X%',
      'designed for X million users',
      'decreased task completion time by X%',
      'created design system with X components',
      'conducted X user research sessions',
      'improved NPS score by X points'
    ],
    summaryHints: [
      'passionate about creating intuitive user experiences',
      'expertise in user research and design systems',
      'track record of improving key UX metrics',
      'experience collaborating with cross-functional teams'
    ]
  },

  'Marketing': {
    keywords: [
      'digital marketing', 'content marketing', 'SEO', 'SEM', 'PPC',
      'social media', 'email marketing', 'campaigns', 'analytics',
      'Google Analytics', 'conversion', 'lead generation', 'brand',
      'content strategy', 'copywriting', 'growth', 'acquisition',
      'retention', 'funnel', 'CRM', 'marketing automation', 'ROI'
    ],
    actionVerbs: [
      'Launched', 'Grew', 'Increased', 'Developed', 'Managed',
      'Optimized', 'Created', 'Executed', 'Drove', 'Led',
      'Analyzed', 'Scaled', 'Generated', 'Achieved', 'Delivered'
    ],
    metricsTemplates: [
      'increased leads by X%',
      'grew social following by X%',
      'achieved X% email open rate',
      'generated $X in pipeline',
      'improved conversion rate by X%',
      'reduced CAC by X%',
      'managed $X marketing budget',
      'increased organic traffic by X%'
    ],
    summaryHints: [
      'data-driven marketer with growth mindset',
      'expertise in digital marketing and analytics',
      'track record of driving measurable results',
      'experience across multiple marketing channels'
    ]
  },

  'Sales': {
    keywords: [
      'sales', 'revenue', 'pipeline', 'quota', 'closing', 'negotiation',
      'prospecting', 'lead generation', 'account management', 'enterprise',
      'SaaS', 'B2B', 'B2C', 'CRM', 'Salesforce', 'cold calling',
      'relationship building', 'consultative selling', 'solution selling',
      'territory', 'forecast', 'deal', 'contract', 'renewal', 'upsell'
    ],
    actionVerbs: [
      'Closed', 'Generated', 'Exceeded', 'Grew', 'Developed',
      'Managed', 'Built', 'Negotiated', 'Drove', 'Achieved',
      'Led', 'Expanded', 'Delivered', 'Won', 'Secured'
    ],
    metricsTemplates: [
      'exceeded quota by X%',
      'generated $X in revenue',
      'closed X deals worth $Y',
      'grew territory by X%',
      'achieved X% win rate',
      'managed pipeline of $X',
      'increased average deal size by X%',
      'expanded accounts by X%'
    ],
    summaryHints: [
      'consistent top performer with track record of exceeding targets',
      'expertise in consultative/solution selling',
      'strong relationship building skills',
      'experience in [industry] sales'
    ]
  },

  'Human Resources': {
    keywords: [
      'recruiting', 'talent acquisition', 'HR', 'human resources',
      'employee relations', 'onboarding', 'performance management',
      'compensation', 'benefits', 'HRIS', 'compliance', 'training',
      'development', 'culture', 'engagement', 'retention', 'diversity',
      'inclusion', 'DEI', 'policy', 'workforce planning'
    ],
    actionVerbs: [
      'Recruited', 'Hired', 'Developed', 'Implemented', 'Led',
      'Managed', 'Created', 'Improved', 'Established', 'Streamlined',
      'Coached', 'Trained', 'Facilitated', 'Designed', 'Built'
    ],
    metricsTemplates: [
      'hired X employees annually',
      'reduced time-to-hire by X%',
      'improved retention by X%',
      'decreased turnover by X%',
      'achieved X% employee satisfaction',
      'managed X employee relations cases',
      'reduced cost-per-hire by X%',
      'trained X employees'
    ],
    summaryHints: [
      'experienced HR professional with strong people skills',
      'track record of building high-performing teams',
      'expertise in [specialty: recruiting/employee relations/etc]',
      'passion for creating positive workplace culture'
    ]
  },

  'Finance': {
    keywords: [
      'financial analysis', 'budgeting', 'forecasting', 'reporting',
      'accounting', 'GAAP', 'financial modeling', 'Excel', 'ERP',
      'audit', 'compliance', 'variance analysis', 'P&L', 'balance sheet',
      'cash flow', 'FP&A', 'month-end close', 'consolidation', 'tax'
    ],
    actionVerbs: [
      'Analyzed', 'Managed', 'Developed', 'Created', 'Led',
      'Prepared', 'Reconciled', 'Forecasted', 'Optimized', 'Implemented',
      'Streamlined', 'Audited', 'Reported', 'Consolidated', 'Identified'
    ],
    metricsTemplates: [
      'managed budget of $X',
      'identified cost savings of $X',
      'improved forecast accuracy by X%',
      'reduced close time by X days',
      'processed X transactions monthly',
      'managed X accounts',
      'achieved X% audit accuracy',
      'reduced expenses by X%'
    ],
    summaryHints: [
      'detail-oriented finance professional with strong analytical skills',
      'experience in [specialty: FP&A/accounting/audit]',
      'track record of improving financial processes',
      'expertise in financial analysis and reporting'
    ]
  },

  'Project Manager': {
    keywords: [
      'project management', 'PMO', 'PMP', 'agile', 'scrum', 'waterfall',
      'stakeholder', 'timeline', 'budget', 'scope', 'risk management',
      'resource allocation', 'cross-functional', 'deliverables', 'milestone',
      'Jira', 'MS Project', 'planning', 'execution', 'monitoring'
    ],
    actionVerbs: [
      'Managed', 'Led', 'Delivered', 'Coordinated', 'Planned',
      'Executed', 'Oversaw', 'Drove', 'Facilitated', 'Implemented',
      'Tracked', 'Aligned', 'Streamlined', 'Controlled', 'Completed'
    ],
    metricsTemplates: [
      'delivered X projects on time and budget',
      'managed budgets totaling $X',
      'led teams of X members',
      'reduced project delivery time by X%',
      'achieved X% stakeholder satisfaction',
      'managed X concurrent projects',
      'saved $X through process improvements',
      'improved on-time delivery to X%'
    ],
    summaryHints: [
      'results-driven project manager with proven delivery track record',
      'expertise in [methodology: agile/waterfall/hybrid]',
      'strong stakeholder management and communication skills',
      'experience managing complex, cross-functional projects'
    ]
  },

  'Consultant': {
    keywords: [
      'consulting', 'strategy', 'analysis', 'client', 'stakeholder',
      'recommendations', 'implementation', 'transformation', 'advisory',
      'problem-solving', 'frameworks', 'presentation', 'deliverables',
      'engagement', 'workstream', 'scope', 'requirements', 'assessment'
    ],
    actionVerbs: [
      'Advised', 'Delivered', 'Led', 'Developed', 'Analyzed',
      'Recommended', 'Implemented', 'Transformed', 'Presented', 'Managed',
      'Designed', 'Facilitated', 'Drove', 'Identified', 'Created'
    ],
    metricsTemplates: [
      'delivered $X in client value',
      'led engagements with X+ clients',
      'identified savings of $X',
      'managed team of X consultants',
      'achieved X% client satisfaction',
      'completed X engagements',
      'improved client processes by X%',
      'generated $X in follow-on work'
    ],
    summaryHints: [
      'strategic consultant with expertise in [domain]',
      'track record of delivering measurable client impact',
      'strong analytical and communication skills',
      'experience across [industries/functions]'
    ]
  },

  'Management': {
    keywords: [
      'leadership', 'team management', 'strategy', 'P&L', 'budget',
      'hiring', 'performance management', 'mentoring', 'cross-functional',
      'stakeholder', 'executive', 'roadmap', 'vision', 'culture',
      'transformation', 'growth', 'scaling', 'operations', 'KPIs'
    ],
    actionVerbs: [
      'Led', 'Built', 'Grew', 'Managed', 'Drove',
      'Established', 'Transformed', 'Scaled', 'Hired', 'Mentored',
      'Championed', 'Directed', 'Oversaw', 'Spearheaded', 'Delivered'
    ],
    metricsTemplates: [
      'led team of X members',
      'grew team from X to Y',
      'managed P&L of $X',
      'achieved X% YoY growth',
      'reduced costs by X%',
      'improved team performance by X%',
      'delivered X key initiatives',
      'increased revenue by X%'
    ],
    summaryHints: [
      'experienced leader with track record of building high-performing teams',
      'expertise in [function/industry]',
      'passion for developing people and driving results',
      'strategic thinker with hands-on execution ability'
    ]
  },

  // Default/fallback
  'Professional': {
    keywords: [
      'collaboration', 'communication', 'problem-solving', 'leadership',
      'teamwork', 'project', 'deadline', 'stakeholder', 'results',
      'efficiency', 'process improvement', 'quality', 'achievement'
    ],
    actionVerbs: [
      'Led', 'Managed', 'Developed', 'Created', 'Improved',
      'Delivered', 'Achieved', 'Implemented', 'Coordinated', 'Built',
      'Designed', 'Executed', 'Drove', 'Established', 'Optimized'
    ],
    metricsTemplates: [
      'improved efficiency by X%',
      'delivered X projects',
      'managed team of X',
      'reduced costs by X%',
      'increased productivity by X%',
      'achieved X% satisfaction rate',
      'saved X hours weekly'
    ],
    summaryHints: [
      'results-oriented professional with proven track record',
      'strong communication and collaboration skills',
      'experience in [your specialty]',
      'commitment to excellence and continuous improvement'
    ]
  }
};

/**
 * Get keywords for a specific role, with fallback to general
 */
export function getRoleKeywords(role) {
  return ROLE_KEYWORDS[role] || ROLE_KEYWORDS['Professional'];
}

/**
 * Get a list of all supported roles
 */
export function getSupportedRoles() {
  return Object.keys(ROLE_KEYWORDS).filter(r => r !== 'Professional');
}

/**
 * Find the best matching role from a job title
 */
export function matchRoleFromTitle(title) {
  if (!title) return 'Professional';

  const titleLower = title.toLowerCase();

  const roleMatchers = [
    { pattern: /frontend|front-end|react|vue|angular|ui engineer/i, role: 'Frontend Developer' },
    { pattern: /backend|back-end|server|api developer/i, role: 'Backend Developer' },
    { pattern: /full.?stack/i, role: 'Full Stack Developer' },
    { pattern: /devops|sre|platform|infrastructure|cloud engineer/i, role: 'DevOps Engineer' },
    { pattern: /data scientist|machine learning|ml engineer|ai engineer/i, role: 'Data Scientist' },
    { pattern: /data analyst|business analyst|bi analyst/i, role: 'Data Analyst' },
    { pattern: /software|developer|engineer|programmer|sde|swe/i, role: 'Software Engineer' },
    { pattern: /product manager|product owner/i, role: 'Product Manager' },
    { pattern: /project manager|program manager/i, role: 'Project Manager' },
    { pattern: /designer|ux|ui designer|graphic/i, role: 'Designer' },
    { pattern: /marketing|growth|seo|content manager/i, role: 'Marketing' },
    { pattern: /sales|account executive|business development/i, role: 'Sales' },
    { pattern: /hr|human resources|recruiter|talent/i, role: 'Human Resources' },
    { pattern: /finance|accountant|financial analyst/i, role: 'Finance' },
    { pattern: /consultant/i, role: 'Consultant' },
    { pattern: /manager|director|vp|head|chief|cto|ceo|coo/i, role: 'Management' },
  ];

  for (const { pattern, role } of roleMatchers) {
    if (pattern.test(titleLower)) {
      return role;
    }
  }

  return 'Professional';
}
