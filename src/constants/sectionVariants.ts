export interface SectionVariant {
  id: string;
  name: string;
  description: string;
  type: 'summary' | 'skills' | 'experience' | 'education' | 'projects' | 'certifications' | 'languages' | 'interests' | 'references' | 'achievements' | 'publications' | 'volunteer' | 'awards' | 'courses' | 'speaking' | 'patents' | 'portfolio';
  previewData: any;
}

// ==================== SUMMARY VARIANTS (10) ====================
export const SUMMARY_VARIANTS: SectionVariant[] = [
  {
    id: 'executive-summary',
    name: 'Executive Summary',
    description: 'Bold, centered heading with professional paragraph format',
    type: 'summary',
    previewData: {
      title: 'EXECUTIVE SUMMARY',
      content: 'Results-driven professional with 5+ years of experience in software development. Proven track record of delivering high-impact solutions and leading cross-functional teams.',
      style: 'executive'
    }
  },
  {
    id: 'professional-profile',
    name: 'Professional Profile',
    description: 'Left-aligned with bullet points highlighting key strengths',
    type: 'summary',
    previewData: {
      title: 'Professional Profile',
      content: [
        'Strategic thinker with expertise in full-stack development',
        'Passionate about creating scalable and maintainable solutions',
        'Strong communicator with proven leadership abilities'
      ],
      style: 'profile'
    }
  },
  {
    id: 'career-objective',
    name: 'Career Objective',
    description: 'Focused objective statement with highlighted keywords',
    type: 'summary',
    previewData: {
      title: 'Career Objective',
      content: 'Seeking a challenging position in software engineering where I can leverage my expertise in React, Node.js, and cloud technologies to drive innovation and deliver exceptional user experiences.',
      style: 'objective'
    }
  },
  {
    id: 'about-me',
    name: 'About Me',
    description: 'Casual, first-person narrative style',
    type: 'summary',
    previewData: {
      title: 'About Me',
      content: 'I\'m a passionate software engineer who loves solving complex problems. With a strong foundation in computer science and hands-on experience in building scalable applications, I thrive in collaborative environments.',
      style: 'casual'
    }
  },
  {
    id: 'professional-summary',
    name: 'Professional Summary',
    description: 'Classic format with concise achievements',
    type: 'summary',
    previewData: {
      title: 'Professional Summary',
      content: 'Accomplished software engineer with comprehensive experience in designing and implementing enterprise-level applications. Skilled in agile methodologies, clean code practices, and continuous integration.',
      style: 'classic'
    }
  },
  {
    id: 'highlighted-summary',
    name: 'Highlighted Summary',
    description: 'Summary with visual border and accent styling',
    type: 'summary',
    previewData: {
      title: 'Profile Highlights',
      content: 'Dynamic technology leader specializing in cloud architecture and microservices. Successfully delivered 20+ enterprise projects with 99.9% uptime. Expertise in AWS, Azure, and DevOps practices.',
      style: 'highlighted'
    }
  },
  {
    id: 'two-column-summary',
    name: 'Two-Column Layout',
    description: 'Split layout with key stats and description',
    type: 'summary',
    previewData: {
      title: 'Professional Overview',
      stats: ['5+ Years', '20+ Projects', 'Cloud Expert'],
      content: 'Full-stack engineer with deep expertise in modern web technologies and cloud infrastructure. Passionate about building products that matter.',
      style: 'two-column'
    }
  },
  {
    id: 'minimal-summary',
    name: 'Minimal Summary',
    description: 'Clean, minimalist design with ample white space',
    type: 'summary',
    previewData: {
      title: 'Summary',
      content: 'Software engineer focused on creating elegant solutions to complex problems. Specialized in React, TypeScript, and modern web architecture.',
      style: 'minimal'
    }
  },
  {
    id: 'achievement-focused',
    name: 'Achievement-Focused',
    description: 'Emphasis on quantifiable achievements',
    type: 'summary',
    previewData: {
      title: 'Professional Achievements',
      content: [
        '↗ Increased system performance by 40% through optimization',
        '↗ Led team of 5 engineers to deliver critical features',
        '↗ Reduced deployment time from 2 hours to 15 minutes'
      ],
      style: 'achievement'
    }
  },
  {
    id: 'expertise-summary',
    name: 'Expertise Summary',
    description: 'Focused on core expertise areas with tags',
    type: 'summary',
    previewData: {
      title: 'Core Expertise',
      content: 'Senior engineer with proven track record in architecting and deploying scalable cloud solutions.',
      tags: ['Cloud Architecture', 'Team Leadership', 'Agile'],
      style: 'expertise'
    }
  }
];

// ==================== SKILLS VARIANTS (10) ====================
export const SKILLS_VARIANTS: SectionVariant[] = [
  {
    id: 'skill-pills',
    name: 'Skill Pills',
    description: 'Horizontal chips with modern pill design',
    type: 'skills',
    previewData: {
      title: 'Technical Skills',
      skills: [
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'AWS',
        'Docker',
        'PostgreSQL',
        'Git'
      ],
      style: 'pills'
    }
  },
  {
    id: 'skill-list',
    name: 'Vertical List',
    description: 'Clean vertical list with optional proficiency levels',
    type: 'skills',
    previewData: {
      title: 'Skills',
      skills: [
        { name: 'React & TypeScript', level: 'Expert' },
        { name: 'Node.js & Express', level: 'Advanced' },
        { name: 'Python & Django', level: 'Intermediate' },
        { name: 'AWS & Cloud Infrastructure', level: 'Advanced' }
      ],
      style: 'list'
    }
  },
  {
    id: 'skill-inline',
    name: 'Comma Separated',
    description: 'Space-efficient inline format with comma separation',
    type: 'skills',
    previewData: {
      title: 'Core Competencies',
      skills: 'JavaScript, React, TypeScript, Node.js, Python, AWS, Docker, Kubernetes, PostgreSQL, MongoDB, Git, CI/CD',
      style: 'inline'
    }
  },
  {
    id: 'skill-grouped',
    name: 'Grouped Categories',
    description: 'Skills organized by categories with subheadings',
    type: 'skills',
    previewData: {
      title: 'Technical Expertise',
      skillGroups: [
        {
          category: 'Frontend',
          skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js']
        },
        {
          category: 'Backend',
          skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis']
        },
        {
          category: 'DevOps',
          skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
        }
      ],
      style: 'grouped'
    }
  },
  {
    id: 'skill-bars',
    name: 'Skill Bars',
    description: 'Visual representation with proficiency bars',
    type: 'skills',
    previewData: {
      title: 'Skills & Proficiency',
      skills: [
        { name: 'React & Frontend', level: 90 },
        { name: 'Node.js & Backend', level: 85 },
        { name: 'Cloud & DevOps', level: 75 },
        { name: 'Database Design', level: 80 }
      ],
      style: 'bars'
    }
  },
  {
    id: 'skill-grid',
    name: 'Grid Layout',
    description: 'Multi-column grid for clean organization',
    type: 'skills',
    previewData: {
      title: 'Technical Skills',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'Git', 'Kubernetes', 'GraphQL', 'Redis', 'Jenkins'],
      style: 'grid'
    }
  },
  {
    id: 'skill-rating',
    name: 'Star Rating',
    description: 'Visual star ratings for skill proficiency',
    type: 'skills',
    previewData: {
      title: 'Core Skills',
      skills: [
        { name: 'JavaScript/TypeScript', rating: 5 },
        { name: 'React & Next.js', rating: 5 },
        { name: 'Node.js & APIs', rating: 4 },
        { name: 'Cloud & DevOps', rating: 4 }
      ],
      style: 'rating'
    }
  },
  {
    id: 'skill-two-column',
    name: 'Two-Column Split',
    description: 'Technical and soft skills in two columns',
    type: 'skills',
    previewData: {
      title: 'Skills Overview',
      technical: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
      soft: ['Leadership', 'Communication', 'Problem Solving', 'Agile'],
      style: 'two-column'
    }
  },
  {
    id: 'skill-minimal',
    name: 'Minimal List',
    description: 'Clean bullet list without extra styling',
    type: 'skills',
    previewData: {
      title: 'Skills',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'],
      style: 'minimal'
    }
  },
  {
    id: 'skill-badges',
    name: 'Skill Badges',
    description: 'Badge-style with icons and borders',
    type: 'skills',
    previewData: {
      title: 'Technical Proficiencies',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'],
      style: 'badges'
    }
  }
];

// ==================== EXPERIENCE VARIANTS (10) ====================
export const EXPERIENCE_VARIANTS: SectionVariant[] = [
  {
    id: 'experience-classic',
    name: 'Classic Timeline',
    description: 'Traditional format with company-first layout',
    type: 'experience',
    previewData: {
      title: 'Work Experience',
      items: [{
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2020',
        endDate: 'Present',
        description: ['Led development of cloud-based microservices', 'Mentored 3 junior developers']
      }],
      style: 'classic'
    }
  },
  {
    id: 'experience-modern',
    name: 'Modern Card',
    description: 'Card-based design with visual separation',
    type: 'experience',
    previewData: {
      title: 'Professional Experience',
      items: [{
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020',
        endDate: 'Present',
        description: ['Built scalable APIs serving 1M+ users', 'Reduced deployment time by 60%']
      }],
      style: 'modern'
    }
  },
  {
    id: 'experience-minimal',
    name: 'Minimal Clean',
    description: 'Minimalist design with essential information',
    type: 'experience',
    previewData: {
      title: 'Experience',
      items: [{
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020',
        endDate: 'Present',
        description: ['Cloud architecture', 'Team leadership']
      }],
      style: 'minimal'
    }
  },
  {
    id: 'experience-detailed',
    name: 'Detailed Format',
    description: 'Comprehensive format with location and achievements',
    type: 'experience',
    previewData: {
      title: 'Work History',
      items: [{
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2020',
        endDate: 'Present',
        description: ['Architected microservices platform', 'Improved system reliability to 99.9%', 'Led team of 5 engineers']
      }],
      style: 'detailed'
    }
  },
  {
    id: 'experience-timeline',
    name: 'Visual Timeline',
    description: 'Timeline with visual connectors and dots',
    type: 'experience',
    previewData: {
      title: 'Career Timeline',
      items: [{
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020',
        endDate: 'Present',
        description: ['Cloud infrastructure', 'Team leadership']
      }],
      style: 'timeline'
    }
  },
  {
    id: 'experience-compact',
    name: 'Compact View',
    description: 'Space-efficient single-line format',
    type: 'experience',
    previewData: {
      title: 'Experience',
      items: [{
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020',
        endDate: 'Present',
        description: ['Led cloud migration', 'Mentored developers']
      }],
      style: 'compact'
    }
  },
  {
    id: 'experience-boxed',
    name: 'Boxed Layout',
    description: 'Each position in a distinct box with border',
    type: 'experience',
    previewData: {
      title: 'Professional Background',
      items: [{
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020',
        endDate: 'Present',
        description: ['Full-stack development', 'Cloud architecture']
      }],
      style: 'boxed'
    }
  },
  {
    id: 'experience-achievement',
    name: 'Achievement-Focused',
    description: 'Emphasizes achievements with visual markers',
    type: 'experience',
    previewData: {
      title: 'Key Achievements',
      items: [{
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020',
        endDate: 'Present',
        description: ['★ Reduced costs by 40%', '★ Deployed 50+ features', '★ Led team of 5']
      }],
      style: 'achievement'
    }
  },
  {
    id: 'experience-sidebar',
    name: 'Sidebar Timeline',
    description: 'Dates in sidebar with colored accent line',
    type: 'experience',
    previewData: {
      title: 'Work Experience',
      items: [{
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020',
        endDate: 'Present',
        description: ['Cloud architecture', 'Team leadership']
      }],
      style: 'sidebar'
    }
  },
  {
    id: 'experience-executive',
    name: 'Executive Format',
    description: 'Premium format for senior positions',
    type: 'experience',
    previewData: {
      title: 'EXECUTIVE EXPERIENCE',
      items: [{
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        startDate: '2020',
        endDate: 'Present',
        description: ['Strategic leadership in cloud transformation', 'Managed $2M budget and 10-person team']
      }],
      style: 'executive'
    }
  }
];

// ==================== EDUCATION VARIANTS (10) ====================
export const EDUCATION_VARIANTS: SectionVariant[] = [
  {
    id: 'education-classic',
    name: 'Classic Format',
    description: 'Traditional education listing',
    type: 'education',
    previewData: {
      title: 'Education',
      items: [{
        school: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2016',
        endDate: '2020',
        gpa: '3.8'
      }],
      style: 'classic'
    }
  },
  {
    id: 'education-modern',
    name: 'Modern Card',
    description: 'Card-based with visual emphasis',
    type: 'education',
    previewData: {
      title: 'Academic Background',
      items: [{
        school: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        endDate: '2020',
        gpa: '3.8'
      }],
      style: 'modern'
    }
  },
  {
    id: 'education-minimal',
    name: 'Minimal Clean',
    description: 'Essential information only',
    type: 'education',
    previewData: {
      title: 'Education',
      items: [{
        school: 'Stanford University',
        degree: 'BS Computer Science',
        endDate: '2020'
      }],
      style: 'minimal'
    }
  },
  {
    id: 'education-detailed',
    name: 'Detailed Format',
    description: 'Includes coursework and achievements',
    type: 'education',
    previewData: {
      title: 'Academic Credentials',
      items: [{
        school: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        endDate: '2020',
        gpa: '3.8',
        coursework: ['Algorithms', 'Distributed Systems', 'Machine Learning']
      }],
      style: 'detailed'
    }
  },
  {
    id: 'education-timeline',
    name: 'Timeline View',
    description: 'Visual timeline with dates',
    type: 'education',
    previewData: {
      title: 'Education Timeline',
      items: [{
        school: 'Stanford University',
        degree: 'BS Computer Science',
        startDate: '2016',
        endDate: '2020'
      }],
      style: 'timeline'
    }
  },
  {
    id: 'education-compact',
    name: 'Compact List',
    description: 'Space-efficient single-line',
    type: 'education',
    previewData: {
      title: 'Education',
      items: [{
        school: 'Stanford University',
        degree: 'BS Computer Science',
        endDate: '2020'
      }],
      style: 'compact'
    }
  },
  {
    id: 'education-honors',
    name: 'Honors Emphasis',
    description: 'Highlights GPA and honors',
    type: 'education',
    previewData: {
      title: 'Education & Honors',
      items: [{
        school: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        endDate: '2020',
        gpa: '3.8',
        honors: ['Magna Cum Laude', 'Dean\'s List']
      }],
      style: 'honors'
    }
  },
  {
    id: 'education-boxed',
    name: 'Boxed Layout',
    description: 'Each degree in bordered box',
    type: 'education',
    previewData: {
      title: 'Academic Qualifications',
      items: [{
        school: 'Stanford University',
        degree: 'BS Computer Science',
        endDate: '2020',
        gpa: '3.8'
      }],
      style: 'boxed'
    }
  },
  {
    id: 'education-two-column',
    name: 'Two-Column Layout',
    description: 'School and degree in columns',
    type: 'education',
    previewData: {
      title: 'Education',
      items: [{
        school: 'Stanford University',
        degree: 'BS Computer Science',
        endDate: '2020'
      }],
      style: 'two-column'
    }
  },
  {
    id: 'education-achievement',
    name: 'Achievement-Focused',
    description: 'Emphasizes academic achievements',
    type: 'education',
    previewData: {
      title: 'Academic Excellence',
      items: [{
        school: 'Stanford University',
        degree: 'BS Computer Science',
        endDate: '2020',
        achievements: ['GPA: 3.8/4.0', 'Dean\'s List all semesters', 'Published 2 research papers']
      }],
      style: 'achievement'
    }
  }
];

// ==================== PROJECTS VARIANTS (10) ====================
export const PROJECTS_VARIANTS: SectionVariant[] = [
  {
    id: 'projects-classic',
    name: 'Classic List',
    description: 'Traditional project listing',
    type: 'projects',
    previewData: {
      title: 'Projects',
      items: [{
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with React and Node.js',
        techStack: ['React', 'Node.js', 'PostgreSQL'],
        url: 'github.com/project'
      }],
      style: 'classic'
    }
  },
  {
    id: 'projects-card',
    name: 'Card Layout',
    description: 'Modern cards with tech stack badges',
    type: 'projects',
    previewData: {
      title: 'Featured Projects',
      items: [{
        name: 'E-Commerce Platform',
        description: 'Scalable platform serving 10K+ users',
        techStack: ['React', 'Node.js', 'AWS']
      }],
      style: 'card'
    }
  },
  {
    id: 'projects-minimal',
    name: 'Minimal List',
    description: 'Clean, concise project list',
    type: 'projects',
    previewData: {
      title: 'Projects',
      items: [{
        name: 'E-Commerce Platform',
        description: 'React & Node.js e-commerce solution',
        techStack: ['React', 'Node.js']
      }],
      style: 'minimal'
    }
  },
  {
    id: 'projects-detailed',
    name: 'Detailed View',
    description: 'Comprehensive with dates and links',
    type: 'projects',
    previewData: {
      title: 'Project Portfolio',
      items: [{
        name: 'E-Commerce Platform',
        description: 'Built full-stack platform with payment integration and real-time inventory',
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        startDate: '2022',
        endDate: '2023',
        url: 'demo.com',
        githubUrl: 'github.com/project'
      }],
      style: 'detailed'
    }
  },
  {
    id: 'projects-grid',
    name: 'Grid Layout',
    description: 'Two-column grid for multiple projects',
    type: 'projects',
    previewData: {
      title: 'Key Projects',
      items: [{
        name: 'E-Commerce Platform',
        description: 'Full-stack solution',
        techStack: ['React', 'Node.js']
      }],
      style: 'grid'
    }
  },
  {
    id: 'projects-timeline',
    name: 'Timeline View',
    description: 'Chronological timeline layout',
    type: 'projects',
    previewData: {
      title: 'Project Timeline',
      items: [{
        name: 'E-Commerce Platform',
        description: 'Scalable e-commerce solution',
        startDate: '2022',
        endDate: '2023',
        techStack: ['React', 'Node.js']
      }],
      style: 'timeline'
    }
  },
  {
    id: 'projects-impact',
    name: 'Impact-Focused',
    description: 'Emphasizes project impact and metrics',
    type: 'projects',
    previewData: {
      title: 'High-Impact Projects',
      items: [{
        name: 'E-Commerce Platform',
        description: 'Built platform serving 10K+ users with 99.9% uptime',
        impact: ['10K+ Users', '99.9% Uptime', '$500K Revenue'],
        techStack: ['React', 'Node.js', 'AWS']
      }],
      style: 'impact'
    }
  },
  {
    id: 'projects-boxed',
    name: 'Boxed Cards',
    description: 'Bordered boxes for each project',
    type: 'projects',
    previewData: {
      title: 'Portfolio',
      items: [{
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution',
        techStack: ['React', 'Node.js']
      }],
      style: 'boxed'
    }
  },
  {
    id: 'projects-compact',
    name: 'Compact List',
    description: 'Space-efficient format',
    type: 'projects',
    previewData: {
      title: 'Projects',
      items: [{
        name: 'E-Commerce Platform',
        description: 'React, Node.js, PostgreSQL'
      }],
      style: 'compact'
    }
  },
  {
    id: 'projects-showcase',
    name: 'Showcase Format',
    description: 'Premium showcase with links',
    type: 'projects',
    previewData: {
      title: 'PROJECT SHOWCASE',
      items: [{
        name: 'E-Commerce Platform',
        description: 'Award-winning platform with modern architecture',
        techStack: ['React', 'Node.js', 'AWS'],
        url: 'demo.com'
      }],
      style: 'showcase'
    }
  }
];

// ==================== CERTIFICATIONS VARIANTS (10) ====================
export const CERTIFICATIONS_VARIANTS: SectionVariant[] = [
  {
    id: 'cert-classic',
    name: 'Classic List',
    description: 'Traditional certification listing',
    type: 'certifications',
    previewData: {
      title: 'Certifications',
      items: [{
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023',
        credentialId: 'ABC123'
      }],
      style: 'classic'
    }
  },
  {
    id: 'cert-modern',
    name: 'Modern Card',
    description: 'Card-based with issuer logos',
    type: 'certifications',
    previewData: {
      title: 'Professional Certifications',
      items: [{
        name: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023'
      }],
      style: 'modern'
    }
  },
  {
    id: 'cert-minimal',
    name: 'Minimal List',
    description: 'Clean, simple format',
    type: 'certifications',
    previewData: {
      title: 'Certifications',
      items: [{
        name: 'AWS Solutions Architect',
        issuer: 'AWS',
        date: '2023'
      }],
      style: 'minimal'
    }
  },
  {
    id: 'cert-detailed',
    name: 'Detailed Format',
    description: 'Includes credential ID and expiry',
    type: 'certifications',
    previewData: {
      title: 'Professional Credentials',
      items: [{
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023',
        credentialId: 'ABC123XYZ',
        expiryDate: '2026'
      }],
      style: 'detailed'
    }
  },
  {
    id: 'cert-timeline',
    name: 'Timeline View',
    description: 'Chronological timeline',
    type: 'certifications',
    previewData: {
      title: 'Certification Timeline',
      items: [{
        name: 'AWS Solutions Architect',
        issuer: 'AWS',
        date: '2023'
      }],
      style: 'timeline'
    }
  },
  {
    id: 'cert-grouped',
    name: 'Grouped by Provider',
    description: 'Organized by certification provider',
    type: 'certifications',
    previewData: {
      title: 'Certifications',
      groups: [{
        provider: 'Amazon Web Services',
        certs: ['Solutions Architect', 'Developer Associate']
      }],
      style: 'grouped'
    }
  },
  {
    id: 'cert-badges',
    name: 'Badge Style',
    description: 'Visual badges for each cert',
    type: 'certifications',
    previewData: {
      title: 'Professional Badges',
      items: [{
        name: 'AWS Solutions Architect',
        issuer: 'AWS',
        date: '2023'
      }],
      style: 'badges'
    }
  },
  {
    id: 'cert-compact',
    name: 'Compact List',
    description: 'Space-efficient format',
    type: 'certifications',
    previewData: {
      title: 'Certifications',
      items: [{
        name: 'AWS Solutions Architect',
        date: '2023'
      }],
      style: 'compact'
    }
  },
  {
    id: 'cert-two-column',
    name: 'Two-Column Layout',
    description: 'Cert and issuer in columns',
    type: 'certifications',
    previewData: {
      title: 'Credentials',
      items: [{
        name: 'AWS Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023'
      }],
      style: 'two-column'
    }
  },
  {
    id: 'cert-boxed',
    name: 'Boxed Format',
    description: 'Each cert in bordered box',
    type: 'certifications',
    previewData: {
      title: 'Certifications & Licenses',
      items: [{
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023'
      }],
      style: 'boxed'
    }
  }
];

// ==================== LANGUAGES VARIANTS (10) ====================
export const LANGUAGES_VARIANTS: SectionVariant[] = [
  {
    id: 'lang-classic',
    name: 'Classic List',
    description: 'Simple language and proficiency',
    type: 'languages',
    previewData: {
      title: 'Languages',
      items: [{
        language: 'English',
        proficiency: 'Native'
      }, {
        language: 'Spanish',
        proficiency: 'Professional'
      }],
      style: 'classic'
    }
  },
  {
    id: 'lang-bars',
    name: 'Proficiency Bars',
    description: 'Visual bars for proficiency',
    type: 'languages',
    previewData: {
      title: 'Language Proficiency',
      items: [{
        language: 'English',
        level: 100
      }, {
        language: 'Spanish',
        level: 75
      }],
      style: 'bars'
    }
  },
  {
    id: 'lang-minimal',
    name: 'Minimal List',
    description: 'Languages only, no levels',
    type: 'languages',
    previewData: {
      title: 'Languages',
      items: ['English', 'Spanish', 'French'],
      style: 'minimal'
    }
  },
  {
    id: 'lang-inline',
    name: 'Inline Format',
    description: 'Comma-separated inline',
    type: 'languages',
    previewData: {
      title: 'Languages',
      content: 'English (Native), Spanish (Professional), French (Intermediate)',
      style: 'inline'
    }
  },
  {
    id: 'lang-rating',
    name: 'Star Rating',
    description: 'Star-based proficiency',
    type: 'languages',
    previewData: {
      title: 'Language Skills',
      items: [{
        language: 'English',
        rating: 5
      }, {
        language: 'Spanish',
        rating: 4
      }],
      style: 'rating'
    }
  },
  {
    id: 'lang-detailed',
    name: 'Detailed Format',
    description: 'With CEFR levels',
    type: 'languages',
    previewData: {
      title: 'Languages',
      items: [{
        language: 'English',
        proficiency: 'Native',
        cefr: 'C2'
      }, {
        language: 'Spanish',
        proficiency: 'Professional',
        cefr: 'B2'
      }],
      style: 'detailed'
    }
  },
  {
    id: 'lang-pills',
    name: 'Language Pills',
    description: 'Pill-style badges',
    type: 'languages',
    previewData: {
      title: 'Languages',
      items: [{
        language: 'English',
        proficiency: 'Native'
      }, {
        language: 'Spanish',
        proficiency: 'Professional'
      }],
      style: 'pills'
    }
  },
  {
    id: 'lang-two-column',
    name: 'Two-Column Layout',
    description: 'Language and level in columns',
    type: 'languages',
    previewData: {
      title: 'Languages',
      items: [{
        language: 'English',
        proficiency: 'Native'
      }, {
        language: 'Spanish',
        proficiency: 'Professional'
      }],
      style: 'two-column'
    }
  },
  {
    id: 'lang-compact',
    name: 'Compact List',
    description: 'Space-efficient format',
    type: 'languages',
    previewData: {
      title: 'Languages',
      items: [{
        language: 'English',
        proficiency: 'Native'
      }],
      style: 'compact'
    }
  },
  {
    id: 'lang-flag',
    name: 'Flag Style',
    description: 'With flag emojis',
    type: 'languages',
    previewData: {
      title: 'Languages',
      items: [{
        language: 'English',
        proficiency: 'Native',
        flag: '🇺🇸'
      }, {
        language: 'Spanish',
        proficiency: 'Professional',
        flag: '🇪🇸'
      }],
      style: 'flag'
    }
  }
];

// ==================== AWARDS VARIANTS (10) ====================
export const AWARDS_VARIANTS: SectionVariant[] = [
  {
    id: 'awards-classic',
    name: 'Classic List',
    description: 'Traditional award listing',
    type: 'awards',
    previewData: {
      title: 'Awards & Honors',
      items: [{
        title: 'Employee of the Year',
        issuer: 'Tech Corp',
        date: '2023',
        description: 'Recognized for outstanding contributions'
      }],
      style: 'classic'
    }
  },
  {
    id: 'awards-modern',
    name: 'Modern Card',
    description: 'Card-based with visual emphasis',
    type: 'awards',
    previewData: {
      title: 'Achievements & Recognition',
      items: [{
        title: 'Employee of the Year',
        issuer: 'Tech Corp',
        date: '2023'
      }],
      style: 'modern'
    }
  },
  {
    id: 'awards-minimal',
    name: 'Minimal List',
    description: 'Clean, simple format',
    type: 'awards',
    previewData: {
      title: 'Awards',
      items: [{
        title: 'Employee of the Year',
        issuer: 'Tech Corp',
        date: '2023'
      }],
      style: 'minimal'
    }
  },
  {
    id: 'awards-timeline',
    name: 'Timeline View',
    description: 'Chronological timeline',
    type: 'awards',
    previewData: {
      title: 'Achievement Timeline',
      items: [{
        title: 'Employee of the Year',
        issuer: 'Tech Corp',
        date: '2023'
      }],
      style: 'timeline'
    }
  },
  {
    id: 'awards-detailed',
    name: 'Detailed Format',
    description: 'With full descriptions',
    type: 'awards',
    previewData: {
      title: 'Awards & Recognition',
      items: [{
        title: 'Employee of the Year',
        issuer: 'Tech Corp',
        date: '2023',
        description: 'Awarded for exceptional leadership and innovation in cloud architecture'
      }],
      style: 'detailed'
    }
  },
  {
    id: 'awards-icon',
    name: 'Icon Style',
    description: 'With trophy icons',
    type: 'awards',
    previewData: {
      title: 'Honors & Awards',
      items: [{
        title: 'Employee of the Year',
        issuer: 'Tech Corp',
        date: '2023'
      }],
      style: 'icon'
    }
  },
  {
    id: 'awards-compact',
    name: 'Compact List',
    description: 'Space-efficient format',
    type: 'awards',
    previewData: {
      title: 'Awards',
      items: [{
        title: 'Employee of the Year',
        date: '2023'
      }],
      style: 'compact'
    }
  },
  {
    id: 'awards-boxed',
    name: 'Boxed Format',
    description: 'Each award in bordered box',
    type: 'awards',
    previewData: {
      title: 'Recognition',
      items: [{
        title: 'Employee of the Year',
        issuer: 'Tech Corp',
        date: '2023'
      }],
      style: 'boxed'
    }
  },
  {
    id: 'awards-two-column',
    name: 'Two-Column Layout',
    description: 'Award and issuer in columns',
    type: 'awards',
    previewData: {
      title: 'Awards',
      items: [{
        title: 'Employee of the Year',
        issuer: 'Tech Corp',
        date: '2023'
      }],
      style: 'two-column'
    }
  },
  {
    id: 'awards-highlight',
    name: 'Highlighted Awards',
    description: 'Premium format with accents',
    type: 'awards',
    previewData: {
      title: 'NOTABLE ACHIEVEMENTS',
      items: [{
        title: 'Employee of the Year',
        issuer: 'Tech Corp',
        date: '2023',
        description: 'Top 1% of 500+ employees'
      }],
      style: 'highlight'
    }
  }
];

// ==================== PUBLICATIONS VARIANTS (10) ====================
export const PUBLICATIONS_VARIANTS: SectionVariant[] = [
  {
    id: 'pub-classic',
    name: 'Classic Citation',
    description: 'Traditional academic citation style',
    type: 'publications',
    previewData: {
      title: 'Publications',
      items: [{
        title: 'Machine Learning in Cloud Computing',
        publisher: 'IEEE Transactions',
        date: '2023',
        url: 'doi.org/example'
      }],
      style: 'classic'
    }
  },
  {
    id: 'pub-modern',
    name: 'Modern Format',
    description: 'Clean modern layout',
    type: 'publications',
    previewData: {
      title: 'Research & Publications',
      items: [{
        title: 'Machine Learning in Cloud Computing',
        publisher: 'IEEE Transactions',
        date: '2023'
      }],
      style: 'modern'
    }
  },
  {
    id: 'pub-minimal',
    name: 'Minimal List',
    description: 'Concise format',
    type: 'publications',
    previewData: {
      title: 'Publications',
      items: [{
        title: 'Machine Learning in Cloud Computing',
        publisher: 'IEEE',
        date: '2023'
      }],
      style: 'minimal'
    }
  },
  {
    id: 'pub-detailed',
    name: 'Detailed Format',
    description: 'With abstracts',
    type: 'publications',
    previewData: {
      title: 'Published Works',
      items: [{
        title: 'Machine Learning in Cloud Computing',
        publisher: 'IEEE Transactions on Cloud Computing',
        date: '2023',
        description: 'Comprehensive analysis of ML algorithms in distributed systems'
      }],
      style: 'detailed'
    }
  },
  {
    id: 'pub-timeline',
    name: 'Timeline View',
    description: 'Chronological timeline',
    type: 'publications',
    previewData: {
      title: 'Publication Timeline',
      items: [{
        title: 'Machine Learning in Cloud Computing',
        publisher: 'IEEE',
        date: '2023'
      }],
      style: 'timeline'
    }
  },
  {
    id: 'pub-apa',
    name: 'APA Style',
    description: 'APA citation format',
    type: 'publications',
    previewData: {
      title: 'Publications',
      items: [{
        title: 'Machine Learning in Cloud Computing',
        publisher: 'IEEE Transactions',
        date: '2023',
        authors: ['Smith, J.', 'Doe, A.']
      }],
      style: 'apa'
    }
  },
  {
    id: 'pub-compact',
    name: 'Compact List',
    description: 'Space-efficient format',
    type: 'publications',
    previewData: {
      title: 'Publications',
      items: [{
        title: 'Machine Learning in Cloud Computing',
        date: '2023'
      }],
      style: 'compact'
    }
  },
  {
    id: 'pub-boxed',
    name: 'Boxed Format',
    description: 'Each publication in box',
    type: 'publications',
    previewData: {
      title: 'Research Publications',
      items: [{
        title: 'Machine Learning in Cloud Computing',
        publisher: 'IEEE',
        date: '2023'
      }],
      style: 'boxed'
    }
  },
  {
    id: 'pub-academic',
    name: 'Academic Format',
    description: 'Formal academic style',
    type: 'publications',
    previewData: {
      title: 'SCHOLARLY PUBLICATIONS',
      items: [{
        title: 'Machine Learning in Cloud Computing: A Comprehensive Analysis',
        publisher: 'IEEE Transactions on Cloud Computing',
        date: '2023',
        url: 'doi.org/10.1109/example'
      }],
      style: 'academic'
    }
  },
  {
    id: 'pub-link',
    name: 'Link-Focused',
    description: 'Emphasizes links and DOIs',
    type: 'publications',
    previewData: {
      title: 'Publications',
      items: [{
        title: 'Machine Learning in Cloud Computing',
        publisher: 'IEEE',
        date: '2023',
        url: 'doi.org/example'
      }],
      style: 'link'
    }
  }
];

// ==================== VOLUNTEER VARIANTS (10) ====================
export const VOLUNTEER_VARIANTS: SectionVariant[] = [
  {
    id: 'volunteer-classic',
    name: 'Classic Format',
    description: 'Traditional volunteer listing',
    type: 'volunteer',
    previewData: {
      title: 'Volunteer Experience',
      items: [{
        organization: 'Code for Good',
        role: 'Volunteer Developer',
        startDate: '2020',
        endDate: 'Present',
        description: 'Build websites for non-profits'
      }],
      style: 'classic'
    }
  },
  {
    id: 'volunteer-modern',
    name: 'Modern Card',
    description: 'Card-based layout',
    type: 'volunteer',
    previewData: {
      title: 'Community Service',
      items: [{
        organization: 'Code for Good',
        role: 'Volunteer Developer',
        startDate: '2020',
        endDate: 'Present',
        description: 'Web development for non-profits'
      }],
      style: 'modern'
    }
  },
  {
    id: 'volunteer-minimal',
    name: 'Minimal List',
    description: 'Clean, simple format',
    type: 'volunteer',
    previewData: {
      title: 'Volunteer Work',
      items: [{
        organization: 'Code for Good',
        role: 'Developer',
        startDate: '2020',
        endDate: 'Present'
      }],
      style: 'minimal'
    }
  },
  {
    id: 'volunteer-detailed',
    name: 'Detailed Format',
    description: 'With impact metrics',
    type: 'volunteer',
    previewData: {
      title: 'Community Involvement',
      items: [{
        organization: 'Code for Good',
        role: 'Volunteer Developer',
        startDate: '2020',
        endDate: 'Present',
        description: 'Built 5 websites for local non-profits, helping them reach 10K+ people'
      }],
      style: 'detailed'
    }
  },
  {
    id: 'volunteer-timeline',
    name: 'Timeline View',
    description: 'Chronological timeline',
    type: 'volunteer',
    previewData: {
      title: 'Volunteer Timeline',
      items: [{
        organization: 'Code for Good',
        role: 'Developer',
        startDate: '2020',
        endDate: 'Present'
      }],
      style: 'timeline'
    }
  },
  {
    id: 'volunteer-impact',
    name: 'Impact-Focused',
    description: 'Emphasizes impact',
    type: 'volunteer',
    previewData: {
      title: 'Community Impact',
      items: [{
        organization: 'Code for Good',
        role: 'Volunteer Developer',
        startDate: '2020',
        endDate: 'Present',
        impact: ['5 Websites Built', '10K+ People Reached', '200+ Hours']
      }],
      style: 'impact'
    }
  },
  {
    id: 'volunteer-compact',
    name: 'Compact List',
    description: 'Space-efficient format',
    type: 'volunteer',
    previewData: {
      title: 'Volunteer',
      items: [{
        organization: 'Code for Good',
        role: 'Developer',
        startDate: '2020'
      }],
      style: 'compact'
    }
  },
  {
    id: 'volunteer-boxed',
    name: 'Boxed Format',
    description: 'Each role in bordered box',
    type: 'volunteer',
    previewData: {
      title: 'Volunteer Experience',
      items: [{
        organization: 'Code for Good',
        role: 'Developer',
        startDate: '2020',
        endDate: 'Present'
      }],
      style: 'boxed'
    }
  },
  {
    id: 'volunteer-cause',
    name: 'Cause-Focused',
    description: 'Grouped by cause',
    type: 'volunteer',
    previewData: {
      title: 'Social Impact',
      items: [{
        organization: 'Code for Good',
        role: 'Volunteer Developer',
        cause: 'Education',
        startDate: '2020',
        endDate: 'Present'
      }],
      style: 'cause'
    }
  },
  {
    id: 'volunteer-achievement',
    name: 'Achievement Style',
    description: 'Highlights achievements',
    type: 'volunteer',
    previewData: {
      title: 'Community Contributions',
      items: [{
        organization: 'Code for Good',
        role: 'Lead Developer',
        startDate: '2020',
        endDate: 'Present',
        achievements: ['Built 5 websites', 'Mentored 10 volunteers', 'Raised $5K']
      }],
      style: 'achievement'
    }
  }
];

// ==================== SPEAKING VARIANTS (10) ====================
export const SPEAKING_VARIANTS: SectionVariant[] = [
  {
    id: 'speaking-classic',
    name: 'Classic List',
    description: 'Traditional speaking engagement listing',
    type: 'speaking',
    previewData: {
      title: 'Speaking Engagements',
      items: [{
        event: 'TechConf 2023',
        topic: 'Scaling Microservices',
        date: '2023',
        location: 'San Francisco, CA'
      }],
      style: 'classic'
    }
  },
  {
    id: 'speaking-modern',
    name: 'Modern Card',
    description: 'Card-based layout',
    type: 'speaking',
    previewData: {
      title: 'Conference Talks',
      items: [{
        event: 'TechConf 2023',
        topic: 'Scaling Microservices',
        date: '2023',
        location: 'San Francisco'
      }],
      style: 'modern'
    }
  },
  {
    id: 'speaking-minimal',
    name: 'Minimal List',
    description: 'Clean, simple format',
    type: 'speaking',
    previewData: {
      title: 'Speaking',
      items: [{
        event: 'TechConf 2023',
        topic: 'Scaling Microservices',
        date: '2023'
      }],
      style: 'minimal'
    }
  },
  {
    id: 'speaking-detailed',
    name: 'Detailed Format',
    description: 'With audience size and links',
    type: 'speaking',
    previewData: {
      title: 'Public Speaking',
      items: [{
        event: 'TechConf 2023',
        topic: 'Scaling Microservices in Production',
        date: '2023',
        location: 'San Francisco, CA',
        audience: '500+ attendees',
        url: 'video.com/talk'
      }],
      style: 'detailed'
    }
  },
  {
    id: 'speaking-timeline',
    name: 'Timeline View',
    description: 'Chronological timeline',
    type: 'speaking',
    previewData: {
      title: 'Speaking Timeline',
      items: [{
        event: 'TechConf 2023',
        topic: 'Scaling Microservices',
        date: '2023'
      }],
      style: 'timeline'
    }
  },
  {
    id: 'speaking-featured',
    name: 'Featured Talks',
    description: 'Highlights keynotes',
    type: 'speaking',
    previewData: {
      title: 'Featured Speaking',
      items: [{
        event: 'TechConf 2023',
        topic: 'Scaling Microservices',
        type: 'Keynote',
        date: '2023',
        location: 'San Francisco'
      }],
      style: 'featured'
    }
  },
  {
    id: 'speaking-compact',
    name: 'Compact List',
    description: 'Space-efficient format',
    type: 'speaking',
    previewData: {
      title: 'Speaking',
      items: [{
        event: 'TechConf 2023',
        topic: 'Scaling Microservices'
      }],
      style: 'compact'
    }
  },
  {
    id: 'speaking-boxed',
    name: 'Boxed Format',
    description: 'Each talk in bordered box',
    type: 'speaking',
    previewData: {
      title: 'Conference Presentations',
      items: [{
        event: 'TechConf 2023',
        topic: 'Scaling Microservices',
        date: '2023'
      }],
      style: 'boxed'
    }
  },
  {
    id: 'speaking-impact',
    name: 'Impact-Focused',
    description: 'Shows reach and impact',
    type: 'speaking',
    previewData: {
      title: 'Public Speaking Impact',
      items: [{
        event: 'TechConf 2023',
        topic: 'Scaling Microservices',
        date: '2023',
        impact: ['500+ Attendees', '10K+ Video Views', 'Trending #1']
      }],
      style: 'impact'
    }
  },
  {
    id: 'speaking-professional',
    name: 'Professional Format',
    description: 'Premium executive style',
    type: 'speaking',
    previewData: {
      title: 'KEYNOTES & PRESENTATIONS',
      items: [{
        event: 'TechConf 2023',
        topic: 'Scaling Microservices in the Cloud Era',
        date: '2023',
        location: 'San Francisco, CA',
        type: 'Keynote Speaker'
      }],
      style: 'professional'
    }
  }
];

// ==================== PATENTS VARIANTS (10) ====================
export const PATENTS_VARIANTS: SectionVariant[] = [
  {
    id: 'patent-classic',
    name: 'Classic Citation',
    description: 'Traditional patent citation',
    type: 'patents',
    previewData: {
      title: 'Patents',
      items: [{
        title: 'Distributed Caching System',
        patentNumber: 'US-1234567',
        date: '2023',
        status: 'Granted'
      }],
      style: 'classic'
    }
  },
  {
    id: 'patent-modern',
    name: 'Modern Format',
    description: 'Clean modern layout',
    type: 'patents',
    previewData: {
      title: 'Intellectual Property',
      items: [{
        title: 'Distributed Caching System',
        patentNumber: 'US-1234567',
        date: '2023',
        status: 'Granted'
      }],
      style: 'modern'
    }
  },
  {
    id: 'patent-minimal',
    name: 'Minimal List',
    description: 'Concise format',
    type: 'patents',
    previewData: {
      title: 'Patents',
      items: [{
        title: 'Distributed Caching System',
        patentNumber: 'US-1234567',
        status: 'Granted'
      }],
      style: 'minimal'
    }
  },
  {
    id: 'patent-detailed',
    name: 'Detailed Format',
    description: 'With descriptions',
    type: 'patents',
    previewData: {
      title: 'Patents & IP',
      items: [{
        title: 'Distributed Caching System',
        patentNumber: 'US-1234567',
        date: '2023',
        status: 'Granted',
        description: 'Novel approach to distributed data caching with automatic failover'
      }],
      style: 'detailed'
    }
  },
  {
    id: 'patent-timeline',
    name: 'Timeline View',
    description: 'Chronological timeline',
    type: 'patents',
    previewData: {
      title: 'Patent Timeline',
      items: [{
        title: 'Distributed Caching System',
        patentNumber: 'US-1234567',
        date: '2023',
        status: 'Granted'
      }],
      style: 'timeline'
    }
  },
  {
    id: 'patent-status',
    name: 'Status-Focused',
    description: 'Grouped by status',
    type: 'patents',
    previewData: {
      title: 'Patents',
      granted: [{
        title: 'Distributed Caching System',
        patentNumber: 'US-1234567'
      }],
      pending: [],
      style: 'status'
    }
  },
  {
    id: 'patent-compact',
    name: 'Compact List',
    description: 'Space-efficient format',
    type: 'patents',
    previewData: {
      title: 'Patents',
      items: [{
        title: 'Distributed Caching System',
        patentNumber: 'US-1234567'
      }],
      style: 'compact'
    }
  },
  {
    id: 'patent-boxed',
    name: 'Boxed Format',
    description: 'Each patent in box',
    type: 'patents',
    previewData: {
      title: 'Patent Portfolio',
      items: [{
        title: 'Distributed Caching System',
        patentNumber: 'US-1234567',
        status: 'Granted'
      }],
      style: 'boxed'
    }
  },
  {
    id: 'patent-formal',
    name: 'Formal Citation',
    description: 'Legal-style citation',
    type: 'patents',
    previewData: {
      title: 'PATENTS',
      items: [{
        title: 'Distributed Caching System',
        patentNumber: 'US 1,234,567 B2',
        date: 'Issued: Jan 2023',
        status: 'Granted',
        url: 'uspto.gov/patent'
      }],
      style: 'formal'
    }
  },
  {
    id: 'patent-inventor',
    name: 'Inventor-Focused',
    description: 'Highlights inventor role',
    type: 'patents',
    previewData: {
      title: 'Patent Inventions',
      items: [{
        title: 'Distributed Caching System',
        patentNumber: 'US-1234567',
        role: 'Lead Inventor',
        date: '2023',
        status: 'Granted'
      }],
      style: 'inventor'
    }
  }
];

// ==================== PORTFOLIO VARIANTS (10) ====================
export const PORTFOLIO_VARIANTS: SectionVariant[] = [
  {
    id: 'portfolio-classic',
    name: 'Classic List',
    description: 'Traditional link listing',
    type: 'portfolio',
    previewData: {
      title: 'Portfolio & Links',
      items: [{
        platform: 'GitHub',
        url: 'github.com/username'
      }, {
        platform: 'LinkedIn',
        url: 'linkedin.com/in/username'
      }],
      style: 'classic'
    }
  },
  {
    id: 'portfolio-modern',
    name: 'Modern Icons',
    description: 'Icon-based layout',
    type: 'portfolio',
    previewData: {
      title: 'Online Presence',
      items: [{
        platform: 'GitHub',
        url: 'github.com/username'
      }, {
        platform: 'LinkedIn',
        url: 'linkedin.com/in/username'
      }],
      style: 'modern'
    }
  },
  {
    id: 'portfolio-minimal',
    name: 'Minimal Links',
    description: 'Clean link format',
    type: 'portfolio',
    previewData: {
      title: 'Links',
      items: [{
        platform: 'GitHub',
        url: 'github.com/username'
      }],
      style: 'minimal'
    }
  },
  {
    id: 'portfolio-inline',
    name: 'Inline Format',
    description: 'Horizontal inline links',
    type: 'portfolio',
    previewData: {
      title: 'Portfolio',
      items: ['github.com/user', 'linkedin.com/in/user', 'portfolio.com'],
      style: 'inline'
    }
  },
  {
    id: 'portfolio-cards',
    name: 'Card Layout',
    description: 'Each link in a card',
    type: 'portfolio',
    previewData: {
      title: 'Portfolio Links',
      items: [{
        platform: 'GitHub',
        url: 'github.com/username',
        description: 'Open source projects'
      }],
      style: 'cards'
    }
  },
  {
    id: 'portfolio-badges',
    name: 'Badge Style',
    description: 'Badge-style with icons',
    type: 'portfolio',
    previewData: {
      title: 'Connect With Me',
      items: [{
        platform: 'GitHub',
        url: 'github.com/username'
      }, {
        platform: 'LinkedIn',
        url: 'linkedin.com/in/username'
      }],
      style: 'badges'
    }
  },
  {
    id: 'portfolio-grouped',
    name: 'Grouped Links',
    description: 'Grouped by type',
    type: 'portfolio',
    previewData: {
      title: 'Online Portfolio',
      groups: [{
        category: 'Professional',
        links: ['LinkedIn', 'GitHub']
      }, {
        category: 'Personal',
        links: ['Portfolio', 'Blog']
      }],
      style: 'grouped'
    }
  },
  {
    id: 'portfolio-compact',
    name: 'Compact List',
    description: 'Space-efficient format',
    type: 'portfolio',
    previewData: {
      title: 'Links',
      items: [{
        platform: 'GitHub',
        url: 'github.com/user'
      }],
      style: 'compact'
    }
  },
  {
    id: 'portfolio-detailed',
    name: 'Detailed Links',
    description: 'With descriptions',
    type: 'portfolio',
    previewData: {
      title: 'Online Profiles',
      items: [{
        platform: 'GitHub',
        url: 'github.com/username',
        description: '50+ open source repositories'
      }, {
        platform: 'LinkedIn',
        url: 'linkedin.com/in/username',
        description: '2K+ connections'
      }],
      style: 'detailed'
    }
  },
  {
    id: 'portfolio-social',
    name: 'Social Media',
    description: 'Social media focused',
    type: 'portfolio',
    previewData: {
      title: 'Find Me Online',
      items: [{
        platform: 'GitHub',
        url: 'github.com/username',
        icon: '💻'
      }, {
        platform: 'LinkedIn',
        url: 'linkedin.com/in/username',
        icon: '💼'
      }, {
        platform: 'Twitter',
        url: 'twitter.com/username',
        icon: '🐦'
      }],
      style: 'social'
    }
  }
];

export const SECTION_VARIANTS_MAP = {
  summary: SUMMARY_VARIANTS,
  skills: SKILLS_VARIANTS,
  experience: EXPERIENCE_VARIANTS,
  education: EDUCATION_VARIANTS,
  projects: PROJECTS_VARIANTS,
  certifications: CERTIFICATIONS_VARIANTS,
  languages: LANGUAGES_VARIANTS,
  awards: AWARDS_VARIANTS,
  publications: PUBLICATIONS_VARIANTS,
  volunteer: VOLUNTEER_VARIANTS,
  speaking: SPEAKING_VARIANTS,
  patents: PATENTS_VARIANTS,
  portfolio: PORTFOLIO_VARIANTS,
};

export function getSectionVariants(sectionType: string): SectionVariant[] {
  return SECTION_VARIANTS_MAP[sectionType as keyof typeof SECTION_VARIANTS_MAP] || [];
}
