/**
 * Resume Builder V2 - Section Registry
 * 
 * Central registry of all section types with their:
 * - Data structure
 * - Form field definitions
 * - Available variants
 * - Default configuration
 * 
 * This registry enables:
 * 1. Dynamic form generation
 * 2. Config-driven section rendering
 * 3. AI template generation
 * 4. Future extensibility
 */

import type { V2SectionType } from '../types/resumeData';

// ============================================================================
// FORM FIELD TYPES
// ============================================================================

export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'phone'
  | 'url'
  | 'date'
  | 'month'        // For MM/YYYY format
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'number'
  | 'array'        // Array of strings (bullet points)
  | 'tags'         // Tag input (skills, technologies)
  | 'rating';      // 1-5 rating

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormFieldDefinition {
  key: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  options?: SelectOption[];  // For select/multiselect
  min?: number;              // For number/rating
  max?: number;              // For number/rating
  rows?: number;             // For textarea
  helperText?: string;
  defaultValue?: any;
  showIf?: {                 // Conditional visibility
    field: string;
    value: any;
  };
  /** Group fields together in the form (e.g., 'dates' for startDate/endDate) */
  group?: string;
  /** Should this field span full width in a grid */
  fullWidth?: boolean;
  /** 
   * Config key that determines if this field should be shown.
   * Maps to template config properties like 'skills.showRatings', 'education.showGPA'.
   * If not set, field is always shown.
   */
  showWhenConfig?: string;
  /**
   * Variants that require this field.
   * If set, field only shows when the section uses one of these variants.
   */
  showForVariants?: string[];
  /**
   * Make this field compact (smaller input, inline layout)
   */
  compact?: boolean;
}

// ============================================================================
// SECTION VARIANT TYPES
// ============================================================================

export interface VariantDefinition {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
}

// ============================================================================
// SECTION DEFINITION
// ============================================================================

export interface SectionDefinition {
  /** Section type identifier */
  type: V2SectionType;
  
  /** Default display title */
  defaultTitle: string;
  
  /** Section description */
  description: string;
  
  /** Icon name (from lucide-react) */
  icon: string;
  
  /** Data key in ResumeData */
  dataKey: string;
  
  /** Is this a list section (multiple items) or single content */
  isList: boolean;
  
  /** Singular name for an item (e.g., "role", "degree") */
  itemName?: string;
  
  /** Plural name for items (e.g., "roles", "degrees") */
  itemNamePlural?: string;
  
  /** Form fields for each item (or the section itself if not a list) */
  formFields: FormFieldDefinition[];
  
  /** Available display variants */
  variants: VariantDefinition[];
  
  /** Default variant ID */
  defaultVariant: string;
  
  /** Can user add multiple items */
  allowMultiple: boolean;
  
  /** Minimum items required */
  minItems?: number;
  
  /** Maximum items allowed */
  maxItems?: number;
  
  /** Is this section available by default in new templates */
  isDefault: boolean;
  
  /** Category for grouping in UI */
  category: 'core' | 'professional' | 'academic' | 'personal' | 'custom';
  
  /** Order in the section picker */
  order: number;
}

// ============================================================================
// PROFICIENCY OPTIONS (Reusable)
// ============================================================================

const LANGUAGE_PROFICIENCY_OPTIONS: SelectOption[] = [
  { value: 'Native', label: 'Native' },
  { value: 'Fluent', label: 'Fluent' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Basic', label: 'Basic' },
  { value: 'Elementary', label: 'Elementary' },
];

const EMPLOYMENT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'internship', label: 'Internship' },
];

const PATENT_STATUS_OPTIONS: SelectOption[] = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Granted', label: 'Granted' },
  { value: 'Published', label: 'Published' },
];

// ============================================================================
// SECTION REGISTRY
// ============================================================================

export const SECTION_REGISTRY: Record<V2SectionType, SectionDefinition> = {
  // -------------------------------------------------------------------------
  // HEADER (Special - not a typical section)
  // -------------------------------------------------------------------------
  header: {
    type: 'header',
    defaultTitle: 'Header',
    description: 'Personal information and contact details',
    icon: 'User',
    dataKey: 'personalInfo',
    isList: false,
    formFields: [
      { key: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'John Doe' },
      { key: 'title', label: 'Professional Title', type: 'text', required: true, placeholder: 'Senior Software Engineer' },
      { key: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@example.com' },
      { key: 'phone', label: 'Phone', type: 'phone', placeholder: '+1 (555) 123-4567' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'San Francisco, CA' },
      { key: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'linkedin.com/in/johndoe' },
      { key: 'github', label: 'GitHub', type: 'url', placeholder: 'github.com/johndoe' },
      { key: 'portfolio', label: 'Portfolio', type: 'url', placeholder: 'johndoe.com' },
      { key: 'twitter', label: 'Twitter/X', type: 'url', placeholder: 'twitter.com/johndoe' },
    ],
    variants: [
      { id: 'left-aligned', name: 'Left Aligned', description: 'Name on left, contact on right' },
      { id: 'centered', name: 'Centered', description: 'All content centered' },
      { id: 'split', name: 'Split', description: 'Name left, contact in columns' },
      { id: 'banner', name: 'Banner', description: 'Full-width colored header' },
      { id: 'minimal', name: 'Minimal', description: 'Just name and title' },
      { id: 'photo-left', name: 'Photo Left', description: 'Photo on left side' },
      { id: 'photo-right', name: 'Photo Right', description: 'Photo on right side' },
    ],
    defaultVariant: 'left-aligned',
    allowMultiple: false,
    isDefault: true,
    category: 'core',
    order: 0,
  },

  // -------------------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------------------
  summary: {
    type: 'summary',
    defaultTitle: 'Summary',
    description: 'Professional summary or objective statement',
    icon: 'FileText',
    dataKey: 'personalInfo.summary',
    isList: false,
    formFields: [
      { 
        key: 'summary', 
        label: 'Professional Summary', 
        type: 'textarea', 
        rows: 4,
        placeholder: 'A brief overview of your professional background, key skills, and career objectives...',
        helperText: 'Keep it concise - 3-4 sentences highlighting your value proposition',
      },
    ],
    variants: [
      { id: 'standard', name: 'Standard', description: 'Simple paragraph' },
      { id: 'highlighted', name: 'Highlighted', description: 'With accent background' },
      { id: 'quote', name: 'Quote Style', description: 'With quotation marks' },
      { id: 'boxed', name: 'Boxed', description: 'In a bordered box' },
    ],
    defaultVariant: 'standard',
    allowMultiple: false,
    isDefault: true,
    category: 'core',
    order: 1,
  },

  // -------------------------------------------------------------------------
  // EXPERIENCE
  // -------------------------------------------------------------------------
  experience: {
    type: 'experience',
    defaultTitle: 'Experience',
    description: 'Work experience and employment history',
    icon: 'Briefcase',
    dataKey: 'experience',
    isList: true,
    itemName: 'role',
    itemNamePlural: 'roles',
    formFields: [
      { key: 'position', label: 'Title', type: 'text', required: true, placeholder: 'Senior Software Engineer', group: 'main', compact: true },
      { key: 'company', label: 'Company', type: 'text', required: true, placeholder: 'Google', group: 'main', compact: true },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'Mountain View, CA', compact: true, showWhenConfig: 'experience.showLocation' },
      { key: 'startDate', label: 'Start', type: 'month', required: true, group: 'dates', compact: true },
      { key: 'endDate', label: 'End', type: 'month', group: 'dates', compact: true },
      { key: 'current', label: 'Current', type: 'checkbox', compact: true },
      { key: 'employmentType', label: 'Type', type: 'select', options: EMPLOYMENT_TYPE_OPTIONS, compact: true, showWhenConfig: 'experience.showEmploymentType' },
      { key: 'description', label: 'Summary', type: 'textarea', rows: 2, placeholder: 'Brief description...', showWhenConfig: 'experience.showDescription' },
      { key: 'bulletPoints', label: 'Key Achievements', type: 'array', placeholder: 'Add achievement...' },
    ],
    variants: [
      { id: 'standard', name: 'Standard', description: 'Title, company, dates, bullets' },
      { id: 'compact', name: 'Compact', description: 'Condensed single-line header' },
      { id: 'timeline', name: 'Timeline', description: 'Visual timeline on left' },
      { id: 'card', name: 'Card', description: 'Card-style with border' },
      { id: 'minimal', name: 'Minimal', description: 'Just essentials' },
      { id: 'two-column-dates', name: 'Two Column', description: 'Dates on left, content on right' },
    ],
    defaultVariant: 'standard',
    allowMultiple: false, // Only one experience section allowed in scratch builder
    minItems: 0,
    isDefault: true,
    category: 'core',
    order: 2,
  },

  // -------------------------------------------------------------------------
  // EDUCATION
  // -------------------------------------------------------------------------
  education: {
    type: 'education',
    defaultTitle: 'Education',
    description: 'Academic background and qualifications',
    icon: 'GraduationCap',
    dataKey: 'education',
    isList: true,
    itemName: 'degree',
    itemNamePlural: 'degrees',
    formFields: [
      { key: 'degree', label: 'Degree', type: 'text', required: true, placeholder: "Bachelor's", group: 'main', compact: true },
      { key: 'field', label: 'Field', type: 'text', required: true, placeholder: 'Computer Science', group: 'main', compact: true },
      { key: 'school', label: 'School', type: 'text', required: true, placeholder: 'Stanford University', compact: true },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'Stanford, CA', compact: true },
      { key: 'startDate', label: 'Start', type: 'month', group: 'dates', compact: true },
      { key: 'endDate', label: 'End', type: 'month', group: 'dates', compact: true },
      { key: 'current', label: 'Current', type: 'checkbox', compact: true },
      { key: 'gpa', label: 'GPA', type: 'text', placeholder: '3.8', compact: true, showWhenConfig: 'education.showGPA' },
      { key: 'honors', label: 'Honors', type: 'tags', placeholder: 'Add honor...', showWhenConfig: 'education.showHonors' },
      { key: 'coursework', label: 'Coursework', type: 'tags', placeholder: 'Add course...', showWhenConfig: 'education.showCoursework' },
    ],
    variants: [
      { id: 'standard', name: 'Standard', description: 'Full details' },
      { id: 'compact', name: 'Compact', description: 'Single line per entry' },
      { id: 'detailed', name: 'Detailed', description: 'With description' },
      { id: 'timeline', name: 'Timeline', description: 'Visual timeline' },
      { id: 'card', name: 'Card', description: 'Card style' },
      { id: 'minimal', name: 'Minimal', description: 'Degree and school only' },
    ],
    defaultVariant: 'standard',
    allowMultiple: true,
    minItems: 0,
    isDefault: true,
    category: 'core',
    order: 3,
  },

  // -------------------------------------------------------------------------
  // SKILLS
  // -------------------------------------------------------------------------
  skills: {
    type: 'skills',
    defaultTitle: 'Skills',
    description: 'Technical and professional skills',
    icon: 'Wrench',
    dataKey: 'skills',
    isList: true,
    itemName: 'skill',
    itemNamePlural: 'skills',
    formFields: [
      { key: 'name', label: 'Skill', type: 'text', required: true, placeholder: 'JavaScript', compact: true },
      { 
        key: 'level', 
        label: 'Level', 
        type: 'rating', 
        min: 1, 
        max: 5, 
        compact: true,
        showWhenConfig: 'skills.showRatings',
        showForVariants: ['bars', 'dots'],
      },
      { 
        key: 'category', 
        label: 'Category', 
        type: 'text', 
        placeholder: 'e.g., Frontend', 
        compact: true,
        showForVariants: ['grouped'],
      },
      { 
        key: 'yearsOfExperience', 
        label: 'Years', 
        type: 'number', 
        min: 0, 
        compact: true,
        showWhenConfig: 'skills.showYears',
      },
    ],
    variants: [
      { id: 'pills', name: 'Pills', description: 'Rounded pill badges' },
      { id: 'tags', name: 'Tags', description: 'Square/rounded tags' },
      { id: 'list', name: 'List', description: 'Comma-separated list' },
      { id: 'grouped', name: 'Grouped', description: 'Grouped by category' },
      { id: 'bars', name: 'Progress Bars', description: 'With proficiency bars' },
      { id: 'dots', name: 'Dot Rating', description: 'Dot rating system' },
      { id: 'columns', name: 'Columns', description: 'Multi-column list' },
      { id: 'inline', name: 'Inline', description: 'Inline text with separator' },
    ],
    defaultVariant: 'pills',
    allowMultiple: false, // Only one skills section allowed in scratch builder
    minItems: 0,
    isDefault: true,
    category: 'core',
    order: 4,
  },

  // -------------------------------------------------------------------------
  // LANGUAGES
  // -------------------------------------------------------------------------
  languages: {
    type: 'languages',
    defaultTitle: 'Languages',
    description: 'Language proficiencies',
    icon: 'Languages',
    dataKey: 'languages',
    isList: true,
    itemName: 'language',
    itemNamePlural: 'languages',
    formFields: [
      { key: 'language', label: 'Language', type: 'text', required: true, placeholder: 'English', compact: true },
      { key: 'proficiency', label: 'Level', type: 'select', required: true, options: LANGUAGE_PROFICIENCY_OPTIONS, compact: true },
      { key: 'certification', label: 'Cert', type: 'text', placeholder: 'TOEFL', compact: true, showWhenConfig: 'languages.showCertification' },
    ],
    variants: [
      { id: 'list', name: 'List', description: 'Simple list with proficiency' },
      { id: 'pills', name: 'Pills', description: 'Pill badges' },
      { id: 'bars', name: 'Progress Bars', description: 'With proficiency bars' },
      { id: 'grid', name: 'Grid', description: 'Grid layout' },
      { id: 'inline', name: 'Inline', description: 'Comma-separated' },
    ],
    defaultVariant: 'list',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'personal',
    order: 10,
  },

  // -------------------------------------------------------------------------
  // ACHIEVEMENTS
  // -------------------------------------------------------------------------
  achievements: {
    type: 'achievements',
    defaultTitle: 'Achievements',
    description: 'Key accomplishments and milestones',
    icon: 'Trophy',
    dataKey: 'achievements',
    isList: true,
    itemName: 'achievement',
    itemNamePlural: 'achievements',
    formFields: [
      { key: 'title', label: 'Achievement', type: 'text', required: true, placeholder: 'Increased Revenue by 150%', compact: true },
      { key: 'description', label: 'Details', type: 'text', placeholder: 'Brief description...', compact: true },
    ],
    variants: [
      { id: 'list', name: 'List', description: 'Title - description format' },
      { id: 'bullets', name: 'Bullets', description: 'Bulleted list' },
      { id: 'cards', name: 'Cards', description: 'Card style with background' },
      { id: 'numbered', name: 'Numbered', description: 'Numbered list' },
      { id: 'timeline', name: 'Timeline', description: 'Timeline style' },
      { id: 'minimal', name: 'Minimal', description: 'Clean minimal text' },
    ],
    defaultVariant: 'list',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'professional',
    order: 5,
  },

  // -------------------------------------------------------------------------
  // STRENGTHS
  // -------------------------------------------------------------------------
  strengths: {
    type: 'strengths',
    defaultTitle: 'Strengths',
    description: 'Core competencies and strengths',
    icon: 'Target',
    dataKey: 'strengths',
    isList: true,
    itemName: 'strength',
    itemNamePlural: 'strengths',
    formFields: [
      { key: 'title', label: 'Strength', type: 'text', required: true, placeholder: 'Leadership', compact: true },
      { key: 'description', label: 'Details', type: 'text', placeholder: 'Brief description...', compact: true, showForVariants: ['cards', 'grid', 'accent-border'] },
    ],
    variants: [
      { id: 'cards', name: 'Cards', description: 'Cards with icon and description' },
      { id: 'list', name: 'List', description: 'Simple bulleted list' },
      { id: 'pills', name: 'Pills', description: 'Pill badges (title only)' },
      { id: 'grid', name: 'Grid', description: '2-column grid cards' },
      { id: 'minimal', name: 'Minimal', description: 'Clean inline text' },
      { id: 'accent-border', name: 'Accent Border', description: 'Left accent border cards' },
    ],
    defaultVariant: 'cards',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'professional',
    order: 6,
  },

  // -------------------------------------------------------------------------
  // CERTIFICATIONS
  // -------------------------------------------------------------------------
  certifications: {
    type: 'certifications',
    defaultTitle: 'Certifications',
    description: 'Professional certifications and licenses',
    icon: 'Award',
    dataKey: 'certifications',
    isList: true,
    formFields: [
      { key: 'name', label: 'Certification Name', type: 'text', required: true, placeholder: 'AWS Solutions Architect' },
      { key: 'issuer', label: 'Issuing Organization', type: 'text', required: true, placeholder: 'Amazon Web Services' },
      { key: 'date', label: 'Date Obtained', type: 'month', required: true },
      { key: 'expiryDate', label: 'Expiry Date', type: 'month' },
      { key: 'credentialId', label: 'Credential ID', type: 'text', placeholder: 'ABC123XYZ' },
      { key: 'url', label: 'Verification URL', type: 'url', placeholder: 'https://verify.cert.com/...' },
    ],
    variants: [
      { id: 'list', name: 'List', description: 'Simple list' },
      { id: 'cards', name: 'Cards', description: 'Card style' },
      { id: 'compact', name: 'Compact', description: 'Single line per cert' },
      { id: 'badges', name: 'Badges', description: 'Badge style' },
    ],
    defaultVariant: 'list',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'professional',
    order: 7,
  },

  // -------------------------------------------------------------------------
  // PROJECTS
  // -------------------------------------------------------------------------
  projects: {
    type: 'projects',
    defaultTitle: 'Projects',
    description: 'Personal or professional projects',
    icon: 'FolderKanban',
    dataKey: 'projects',
    isList: true,
    formFields: [
      { key: 'name', label: 'Project Name', type: 'text', required: true, placeholder: 'E-commerce Platform' },
      { key: 'role', label: 'Your Role', type: 'text', placeholder: 'Lead Developer' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 3, required: true, placeholder: 'What the project does...' },
      { key: 'technologies', label: 'Technologies Used', type: 'tags', placeholder: 'Add technology...' },
      { key: 'startDate', label: 'Start Date', type: 'month' },
      { key: 'endDate', label: 'End Date', type: 'month' },
      { key: 'current', label: 'Ongoing project', type: 'checkbox' },
      { key: 'url', label: 'Project URL', type: 'url', placeholder: 'https://project.com' },
      { key: 'githubUrl', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/...' },
      { key: 'highlights', label: 'Key Highlights', type: 'array', placeholder: 'Add highlight...' },
    ],
    variants: [
      { id: 'standard', name: 'Standard', description: 'Full details' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
      { id: 'compact', name: 'Compact', description: 'Condensed view' },
      { id: 'grid', name: 'Grid', description: 'Grid layout' },
    ],
    defaultVariant: 'standard',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'professional',
    order: 8,
  },

  // -------------------------------------------------------------------------
  // AWARDS
  // -------------------------------------------------------------------------
  awards: {
    type: 'awards',
    defaultTitle: 'Awards',
    description: 'Awards and recognitions',
    icon: 'Medal',
    dataKey: 'awards',
    isList: true,
    formFields: [
      { key: 'title', label: 'Award Title', type: 'text', required: true, placeholder: 'Employee of the Year' },
      { key: 'issuer', label: 'Issuing Organization', type: 'text', required: true, placeholder: 'Company Name' },
      { key: 'date', label: 'Date Received', type: 'month', required: true },
      { key: 'description', label: 'Description', type: 'textarea', rows: 2, placeholder: 'Details about the award...' },
    ],
    variants: [
      { id: 'list', name: 'List', description: 'Simple list' },
      { id: 'cards', name: 'Cards', description: 'Card style' },
      { id: 'timeline', name: 'Timeline', description: 'Timeline view' },
    ],
    defaultVariant: 'list',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'professional',
    order: 9,
  },

  // -------------------------------------------------------------------------
  // PUBLICATIONS
  // -------------------------------------------------------------------------
  publications: {
    type: 'publications',
    defaultTitle: 'Publications',
    description: 'Published papers, articles, or books',
    icon: 'BookOpen',
    dataKey: 'publications',
    isList: true,
    formFields: [
      { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Research Paper Title' },
      { key: 'publisher', label: 'Publisher/Journal', type: 'text', required: true, placeholder: 'IEEE' },
      { key: 'date', label: 'Publication Date', type: 'month', required: true },
      { key: 'authors', label: 'Co-Authors', type: 'tags', placeholder: 'Add author...' },
      { key: 'url', label: 'URL', type: 'url', placeholder: 'https://doi.org/...' },
      { key: 'doi', label: 'DOI', type: 'text', placeholder: '10.1000/xyz123' },
      { key: 'description', label: 'Abstract/Description', type: 'textarea', rows: 2 },
    ],
    variants: [
      { id: 'list', name: 'List', description: 'Academic citation style' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
      { id: 'compact', name: 'Compact', description: 'Condensed view' },
    ],
    defaultVariant: 'list',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'academic',
    order: 11,
  },

  // -------------------------------------------------------------------------
  // VOLUNTEER
  // -------------------------------------------------------------------------
  volunteer: {
    type: 'volunteer',
    defaultTitle: 'Volunteer Experience',
    description: 'Volunteer work and community service',
    icon: 'Heart',
    dataKey: 'volunteer',
    isList: true,
    formFields: [
      { key: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Volunteer Coordinator' },
      { key: 'organization', label: 'Organization', type: 'text', required: true, placeholder: 'Red Cross' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'San Francisco, CA' },
      { key: 'startDate', label: 'Start Date', type: 'month', required: true },
      { key: 'endDate', label: 'End Date', type: 'month' },
      { key: 'current', label: 'Currently volunteering', type: 'checkbox' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
      { key: 'highlights', label: 'Key Contributions', type: 'array', placeholder: 'Add contribution...' },
    ],
    variants: [
      { id: 'standard', name: 'Standard', description: 'Like experience section' },
      { id: 'compact', name: 'Compact', description: 'Condensed view' },
      { id: 'list', name: 'List', description: 'Simple list' },
    ],
    defaultVariant: 'standard',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'personal',
    order: 12,
  },

  // -------------------------------------------------------------------------
  // SPEAKING
  // -------------------------------------------------------------------------
  speaking: {
    type: 'speaking',
    defaultTitle: 'Speaking Engagements',
    description: 'Conferences, talks, and presentations',
    icon: 'Mic',
    dataKey: 'speaking',
    isList: true,
    formFields: [
      { key: 'topic', label: 'Topic/Title', type: 'text', required: true, placeholder: 'Building Scalable Systems' },
      { key: 'event', label: 'Event/Conference', type: 'text', required: true, placeholder: 'AWS re:Invent' },
      { key: 'date', label: 'Date', type: 'month', required: true },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'Las Vegas, NV' },
      { key: 'url', label: 'Recording/Slides URL', type: 'url' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
    ],
    variants: [
      { id: 'list', name: 'List', description: 'Simple list' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
      { id: 'timeline', name: 'Timeline', description: 'Timeline view' },
    ],
    defaultVariant: 'list',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'professional',
    order: 13,
  },

  // -------------------------------------------------------------------------
  // PATENTS
  // -------------------------------------------------------------------------
  patents: {
    type: 'patents',
    defaultTitle: 'Patents',
    description: 'Patents and intellectual property',
    icon: 'Lightbulb',
    dataKey: 'patents',
    isList: true,
    formFields: [
      { key: 'title', label: 'Patent Title', type: 'text', required: true, placeholder: 'Method for...' },
      { key: 'patentNumber', label: 'Patent Number', type: 'text', required: true, placeholder: 'US1234567' },
      { key: 'date', label: 'Filing/Grant Date', type: 'month', required: true },
      { key: 'status', label: 'Status', type: 'select', required: true, options: PATENT_STATUS_OPTIONS },
      { key: 'inventors', label: 'Co-Inventors', type: 'tags', placeholder: 'Add inventor...' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
      { key: 'url', label: 'Patent URL', type: 'url' },
    ],
    variants: [
      { id: 'list', name: 'List', description: 'Simple list' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
    ],
    defaultVariant: 'list',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'academic',
    order: 14,
  },

  // -------------------------------------------------------------------------
  // INTERESTS
  // -------------------------------------------------------------------------
  interests: {
    type: 'interests',
    defaultTitle: 'Interests',
    description: 'Hobbies and personal interests',
    icon: 'Sparkles',
    dataKey: 'interests',
    isList: true,
    formFields: [
      { key: 'name', label: 'Interest', type: 'text', required: true, placeholder: 'Photography' },
      { key: 'description', label: 'Description', type: 'text', placeholder: 'Brief description (optional)' },
    ],
    variants: [
      { id: 'pills', name: 'Pills', description: 'Pill badges' },
      { id: 'list', name: 'List', description: 'Simple list' },
      { id: 'inline', name: 'Inline', description: 'Comma-separated' },
    ],
    defaultVariant: 'pills',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'personal',
    order: 15,
  },

  // -------------------------------------------------------------------------
  // REFERENCES
  // -------------------------------------------------------------------------
  references: {
    type: 'references',
    defaultTitle: 'References',
    description: 'Professional references',
    icon: 'Users',
    dataKey: 'references',
    isList: true,
    formFields: [
      { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Jane Smith' },
      { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'Engineering Manager' },
      { key: 'company', label: 'Company', type: 'text', required: true, placeholder: 'Google' },
      { key: 'relationship', label: 'Relationship', type: 'text', required: true, placeholder: 'Former Manager' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com' },
      { key: 'phone', label: 'Phone', type: 'phone', placeholder: '+1 (555) 123-4567' },
    ],
    variants: [
      { id: 'standard', name: 'Standard', description: 'Full contact details' },
      { id: 'compact', name: 'Compact', description: 'Name and relationship only' },
      { id: 'available', name: 'Available on Request', description: 'Just shows "Available upon request"' },
    ],
    defaultVariant: 'standard',
    allowMultiple: true,
    minItems: 0,
    maxItems: 3,
    isDefault: false,
    category: 'professional',
    order: 16,
  },

  // -------------------------------------------------------------------------
  // COURSES
  // -------------------------------------------------------------------------
  courses: {
    type: 'courses',
    defaultTitle: 'Courses & Training',
    description: 'Online courses and professional training',
    icon: 'BookMarked',
    dataKey: 'courses',
    isList: true,
    formFields: [
      { key: 'name', label: 'Course Name', type: 'text', required: true, placeholder: 'Machine Learning Specialization' },
      { key: 'provider', label: 'Provider', type: 'text', required: true, placeholder: 'Coursera' },
      { key: 'date', label: 'Completion Date', type: 'month' },
      { key: 'certificate', label: 'Certificate Earned', type: 'checkbox' },
      { key: 'url', label: 'Certificate URL', type: 'url' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 2 },
    ],
    variants: [
      { id: 'list', name: 'List', description: 'Simple list' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
      { id: 'compact', name: 'Compact', description: 'Condensed view' },
    ],
    defaultVariant: 'list',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'academic',
    order: 17,
  },

  // -------------------------------------------------------------------------
  // CUSTOM
  // -------------------------------------------------------------------------
  custom: {
    type: 'custom',
    defaultTitle: 'Custom Section',
    description: 'User-defined custom section',
    icon: 'Plus',
    dataKey: 'customSections',
    isList: true,
    formFields: [
      { key: 'title', label: 'Item Title', type: 'text', placeholder: 'Title (optional)' },
      { key: 'content', label: 'Content', type: 'textarea', rows: 3, required: true, placeholder: 'Enter content...' },
      { key: 'date', label: 'Date', type: 'month' },
      { key: 'url', label: 'URL', type: 'url' },
    ],
    variants: [
      { id: 'list', name: 'List', description: 'Bulleted list' },
      { id: 'paragraphs', name: 'Paragraphs', description: 'Paragraph text' },
      { id: 'cards', name: 'Cards', description: 'Card layout' },
    ],
    defaultVariant: 'list',
    allowMultiple: true,
    minItems: 0,
    isDefault: false,
    category: 'custom',
    order: 99,
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get section definition by type
 */
export function getSectionDefinition(type: V2SectionType): SectionDefinition {
  return SECTION_REGISTRY[type];
}

/**
 * Get all sections by category
 */
export function getSectionsByCategory(category: SectionDefinition['category']): SectionDefinition[] {
  return Object.values(SECTION_REGISTRY).filter(s => s.category === category);
}

/**
 * Get default sections (for new templates)
 */
export function getDefaultSections(): SectionDefinition[] {
  return Object.values(SECTION_REGISTRY).filter(s => s.isDefault);
}

/**
 * Get all available sections sorted by order
 */
export function getAllSections(): SectionDefinition[] {
  return Object.values(SECTION_REGISTRY).sort((a, b) => a.order - b.order);
}

/**
 * Get form fields for a section type
 */
export function getSectionFormFields(type: V2SectionType): FormFieldDefinition[] {
  return SECTION_REGISTRY[type]?.formFields || [];
}

/**
 * Get variants for a section type
 */
export function getSectionVariants(type: V2SectionType): VariantDefinition[] {
  return SECTION_REGISTRY[type]?.variants || [];
}

/**
 * Check if a section type is valid
 */
export function isValidSectionType(type: string): type is V2SectionType {
  return type in SECTION_REGISTRY;
}
