import type {
  SectionType,
  SectionData,
  ExperienceItem,
  EducationItem,
  SkillItem,
  CertificationItem,
  LanguageItem,
  ProjectItem,
  AwardItem,
  PublicationItem,
  VolunteerItem,
  SpeakingItem,
  PatentItem,
  PortfolioItem,
} from '@/types/resume';

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

/**
 * Get mock data for a section type
 * This provides realistic placeholder data for each section
 */
export function getMockSectionData(type: SectionType): SectionData {
  switch (type) {
    case 'summary':
      return {
        type: 'summary',
        content: 'Results-driven professional with proven expertise in driving organizational success. Demonstrated ability to leverage technical skills and strategic thinking to deliver impactful solutions.',
      };

    case 'experience':
      return {
        type: 'experience',
        items: [
          {
            id: generateId(),
            company: 'Tech Company Inc.',
            position: 'Senior Software Engineer',
            startDate: '2020-01',
            endDate: '2024-01',
            current: true,
            description: '• Led development of scalable microservices architecture\n• Collaborated with cross-functional teams to deliver high-quality products\n• Mentored junior developers and conducted code reviews',
          },
          {
            id: generateId(),
            company: 'Previous Company LLC',
            position: 'Software Engineer',
            startDate: '2018-06',
            endDate: '2020-01',
            current: false,
            description: '• Developed and maintained web applications using modern frameworks\n• Improved application performance by 40%\n• Implemented automated testing procedures',
          },
        ] as ExperienceItem[],
      };

    case 'education':
      return {
        type: 'education',
        items: [
          {
            id: generateId(),
            school: 'University Name',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            startDate: '2014-09',
            endDate: '2018-05',
          },
        ] as EducationItem[],
      };

    case 'skills':
      return {
        type: 'skills',
        items: [
          { id: generateId(), name: 'JavaScript', level: 90, category: 'core' },
          { id: generateId(), name: 'React', level: 85, category: 'core' },
          { id: generateId(), name: 'TypeScript', level: 80, category: 'core' },
          { id: generateId(), name: 'Node.js', level: 75, category: 'toolbox' },
          { id: generateId(), name: 'Python', level: 70, category: 'toolbox' },
          { id: generateId(), name: 'SQL', level: 65, category: 'toolbox' },
        ] as SkillItem[],
      };

    case 'certifications':
      return {
        type: 'certifications',
        items: [
          {
            id: generateId(),
            name: 'AWS Certified Solutions Architect',
            issuer: 'Amazon Web Services',
            date: '2023-06',
            credentialId: 'ABC123XYZ',
            url: 'https://aws.amazon.com/certification',
          },
        ] as CertificationItem[],
      };

    case 'languages':
      return {
        type: 'languages',
        items: [
          { id: generateId(), language: 'English', proficiency: 'Native' },
          { id: generateId(), language: 'Spanish', proficiency: 'Professional' },
        ] as LanguageItem[],
      };

    case 'projects':
      return {
        type: 'projects',
        items: [
          {
            id: generateId(),
            name: 'E-Commerce Platform',
            description: 'Built a full-stack e-commerce platform with real-time inventory management',
            techStack: ['React', 'Node.js', 'MongoDB', 'Redis'],
            startDate: '2023-01',
            endDate: '2023-06',
            url: 'https://example.com',
            githubUrl: 'https://github.com/username/project',
          },
        ] as ProjectItem[],
      };

    case 'awards':
      return {
        type: 'awards',
        items: [
          {
            id: generateId(),
            title: 'Employee of the Year',
            issuer: 'Tech Company Inc.',
            date: '2023-12',
            description: 'Recognized for outstanding contributions to company growth',
          },
        ] as AwardItem[],
      };

    case 'publications':
      return {
        type: 'publications',
        items: [
          {
            id: generateId(),
            title: 'Best Practices in Modern Web Development',
            publisher: 'Tech Journal',
            date: '2023-08',
            url: 'https://techjournal.com/article',
            description: 'Comprehensive guide to building scalable web applications',
          },
        ] as PublicationItem[],
      };

    case 'volunteer':
      return {
        type: 'volunteer',
        items: [
          {
            id: generateId(),
            organization: 'Code for Good',
            role: 'Volunteer Developer',
            startDate: '2022-01',
            endDate: '2023-12',
            current: false,
            description: 'Developed web applications for non-profit organizations to help them better serve their communities',
          },
        ] as VolunteerItem[],
      };

    case 'speaking':
      return {
        type: 'speaking',
        items: [
          {
            id: generateId(),
            event: 'Tech Conference 2023',
            topic: 'Building Scalable Microservices',
            date: '2023-10',
            location: 'San Francisco, CA',
            url: 'https://conference.com/speakers',
          },
        ] as SpeakingItem[],
      };

    case 'patents':
      return {
        type: 'patents',
        items: [
          {
            id: generateId(),
            title: 'Method for Optimizing Database Queries',
            patentNumber: 'US10123456',
            date: '2023-05',
            status: 'Granted',
            description: 'Novel approach to query optimization in distributed databases',
          },
        ] as PatentItem[],
      };

    case 'portfolio':
      return {
        type: 'portfolio',
        items: [
          {
            id: generateId(),
            platform: 'GitHub',
            url: 'https://github.com/username',
            description: 'Open source contributions and personal projects',
          },
          {
            id: generateId(),
            platform: 'LinkedIn',
            url: 'https://linkedin.com/in/username',
          },
        ] as PortfolioItem[],
      };

    case 'custom':
      return {
        type: 'custom',
        content: 'Add your custom section content here. You can include any information that doesn\'t fit into the standard categories.',
      };

    default:
      return {
        type: 'custom',
        content: '',
      };
  }
}

/**
 * Get a blank resume data structure
 */
export function getBlankResumeData() {
  return {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    sections: [],
  };
}
