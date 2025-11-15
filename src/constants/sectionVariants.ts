export interface SectionVariant {
  id: string;
  name: string;
  description: string;
  type: 'summary' | 'skills' | 'experience' | 'education' | 'projects' | 'certifications' | 'languages' | 'interests' | 'references' | 'achievements' | 'publications' | 'volunteer' | 'awards' | 'courses';
  previewData: any;
}

// Summary Variants
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
  }
];

// Skills Variants
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
  }
];

export const SECTION_VARIANTS_MAP = {
  summary: SUMMARY_VARIANTS,
  skills: SKILLS_VARIANTS,
  // We'll add more section types later
};

export function getSectionVariants(sectionType: string): SectionVariant[] {
  return SECTION_VARIANTS_MAP[sectionType as keyof typeof SECTION_VARIANTS_MAP] || [];
}
