/**
 * Resume Builder V2 - Fresher Mock Data
 * 
 * Sample resume data for fresh graduates and entry-level candidates.
 * Focus on: Education, Projects, Internships, Skills, Achievements
 */

import type { V2ResumeData } from '../types';

// ============================================================================
// CS FRESHER - Computer Science Graduate
// ============================================================================

export const CS_FRESHER_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    phone: '+91-9876543210',
    location: 'Bangalore, Karnataka',
    title: 'Computer Science Graduate',
    summary: 'Motivated Computer Science graduate with strong foundation in software development and algorithms. Completed 6-month internship at tech startup. Passionate about building scalable web applications.',
    linkedin: 'linkedin.com/in/arjunsharma',
    github: 'github.com/arjunsharma',
    portfolio: 'arjunsharma.dev',
  },
  experience: [
    {
      id: 'intern-1',
      company: 'TechStart Solutions',
      position: 'Software Development Intern',
      startDate: '2023-06',
      endDate: '2023-12',
      current: false,
      employmentType: 'internship',
      bulletPoints: [
        'Developed RESTful APIs using Node.js and Express',
        'Built responsive UI components using React and Tailwind CSS',
        'Implemented unit tests achieving 80% code coverage',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'VIT University',
      degree: 'Bachelor of Technology',
      field: 'Computer Science and Engineering',
      startDate: '2020-07',
      endDate: '2024-05',
      location: 'Vellore, Tamil Nadu',
      gpa: '8.5/10',
      honors: ['Dean\'s List 2022-23'],
      coursework: ['Data Structures', 'Algorithms', 'Database Management', 'Machine Learning'],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'JavaScript' },
    { id: 'skill-2', name: 'Python' },
    { id: 'skill-3', name: 'React' },
    { id: 'skill-4', name: 'Node.js' },
    { id: 'skill-5', name: 'MongoDB' },
    { id: 'skill-6', name: 'SQL' },
    { id: 'skill-7', name: 'Git' },
    { id: 'skill-8', name: 'Docker' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce app with authentication and payment integration.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      highlights: ['Implemented JWT authentication', 'Integrated Stripe payments'],
    },
    {
      id: 'proj-2',
      name: 'AI Chatbot',
      description: 'NLP-based chatbot for customer support using Python and TensorFlow.',
      technologies: ['Python', 'TensorFlow', 'Flask'],
      highlights: ['90% intent classification accuracy', 'Reduced response time by 60%'],
    },
  ],
  certifications: [
    { id: 'cert-1', name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2023-09' },
    { id: 'cert-2', name: 'Meta Front-End Developer', issuer: 'Meta (Coursera)', date: '2023-06' },
  ],
  achievements: [
    { id: 'ach-1', title: 'Smart India Hackathon Finalist', description: 'Top 10 nationally for AI healthcare solution.' },
    { id: 'ach-2', title: 'CodeChef 4-Star Coder', description: '1800+ rating in competitive programming.' },
  ],
  strengths: [
    { id: 'str-1', title: 'Problem Solving', description: 'Strong analytical skills in algorithmic challenges.' },
    { id: 'str-2', title: 'Quick Learner', description: 'Rapidly adapts to new technologies.' },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', language: 'Hindi', proficiency: 'Native' },
  ],
};

// ============================================================================
// ECE FRESHER - Electronics Graduate
// ============================================================================

export const ECE_FRESHER_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91-9123456789',
    location: 'Hyderabad, Telangana',
    title: 'Electronics Engineering Graduate',
    summary: 'ECE graduate with hands-on experience in embedded systems and VLSI design. Completed internship at semiconductor company. Strong foundation in digital electronics and microcontrollers.',
    linkedin: 'linkedin.com/in/priyapatel',
    github: 'github.com/priyapatel',
  },
  experience: [
    {
      id: 'intern-1',
      company: 'Qualcomm India',
      position: 'VLSI Design Intern',
      startDate: '2023-06',
      endDate: '2023-12',
      current: false,
      employmentType: 'internship',
      bulletPoints: [
        'Developed SystemVerilog testbenches for SoC verification',
        'Performed functional verification using UVM methodology',
        'Identified 15+ design bugs during verification cycles',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'BITS Pilani',
      degree: 'Bachelor of Engineering',
      field: 'Electronics and Communication',
      startDate: '2020-08',
      endDate: '2024-05',
      location: 'Pilani, Rajasthan',
      gpa: '8.2/10',
      honors: ['Merit Scholarship Recipient'],
      coursework: ['Digital Electronics', 'VLSI Design', 'Embedded Systems', 'Signal Processing'],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Verilog' },
    { id: 'skill-2', name: 'SystemVerilog' },
    { id: 'skill-3', name: 'C/C++' },
    { id: 'skill-4', name: 'Python' },
    { id: 'skill-5', name: 'Arduino' },
    { id: 'skill-6', name: 'MATLAB' },
    { id: 'skill-7', name: 'Cadence' },
    { id: 'skill-8', name: 'Xilinx Vivado' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Smart Home Automation',
      description: 'IoT-based home automation using ESP32 with mobile app control.',
      technologies: ['ESP32', 'Arduino', 'MQTT', 'Flutter'],
      highlights: ['Designed PCB layout', 'Integrated Google Assistant'],
    },
    {
      id: 'proj-2',
      name: 'RISC-V Processor',
      description: '32-bit RISC-V processor implementation on FPGA.',
      technologies: ['Verilog', 'Xilinx Vivado', 'FPGA'],
      highlights: ['100MHz clock frequency', 'RV32I instruction set'],
    },
  ],
  certifications: [
    { id: 'cert-1', name: 'NPTEL - Digital VLSI Design', issuer: 'IIT Kharagpur', date: '2023-04' },
  ],
  achievements: [
    { id: 'ach-1', title: 'TI Innovation Challenge Winner', description: 'First place for IoT smart agriculture solution.' },
    { id: 'ach-2', title: 'IEEE Paper Publication', description: 'Published on Low Power VLSI Design.' },
  ],
  strengths: [
    { id: 'str-1', title: 'Hardware-Software Integration', description: 'Bridges hardware design with software.' },
    { id: 'str-2', title: 'Analytical Thinking', description: 'Excellent debugging skills.' },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', language: 'Hindi', proficiency: 'Native' },
  ],
};

// ============================================================================
// DATA SCIENCE FRESHER
// ============================================================================

export const DS_FRESHER_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Rahul Verma',
    email: 'rahul.verma@email.com',
    phone: '+91-8765432109',
    location: 'Pune, Maharashtra',
    title: 'Data Science Graduate',
    summary: 'Data Science graduate with strong foundation in ML and statistics. Research internship at IIT focusing on deep learning. Passionate about deriving insights from complex datasets.',
    linkedin: 'linkedin.com/in/rahulverma',
    github: 'github.com/rahulverma',
  },
  experience: [
    {
      id: 'intern-1',
      company: 'IIT Bombay - AI Research Lab',
      position: 'Research Intern',
      startDate: '2023-05',
      endDate: '2023-11',
      current: false,
      employmentType: 'internship',
      bulletPoints: [
        'Developed CNN models for tumor detection with 94% accuracy',
        'Implemented data augmentation techniques',
        'Co-authored research paper for international conference',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'IISER Pune',
      degree: 'BS-MS Dual Degree',
      field: 'Data Science and Analytics',
      startDate: '2019-08',
      endDate: '2024-05',
      location: 'Pune, Maharashtra',
      gpa: '8.8/10',
      honors: ['INSPIRE Scholarship', 'Best Thesis Award'],
      coursework: ['Statistical Learning', 'Deep Learning', 'NLP', 'Big Data Analytics'],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Python' },
    { id: 'skill-2', name: 'R' },
    { id: 'skill-3', name: 'TensorFlow' },
    { id: 'skill-4', name: 'PyTorch' },
    { id: 'skill-5', name: 'Scikit-learn' },
    { id: 'skill-6', name: 'Pandas' },
    { id: 'skill-7', name: 'Tableau' },
    { id: 'skill-8', name: 'SQL' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Sentiment Analysis Platform',
      description: 'End-to-end sentiment analysis using transformer models.',
      technologies: ['Python', 'BERT', 'FastAPI', 'Docker'],
      highlights: ['92% accuracy on Twitter data', '10,000+ daily predictions'],
    },
    {
      id: 'proj-2',
      name: 'Stock Price Prediction',
      description: 'LSTM-based model for stock price prediction.',
      technologies: ['Python', 'Keras', 'Streamlit'],
      highlights: ['2.3% RMSE', 'Interactive dashboard'],
    },
  ],
  certifications: [
    { id: 'cert-1', name: 'TensorFlow Developer Certificate', issuer: 'Google', date: '2023-07' },
    { id: 'cert-2', name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', date: '2022-12' },
  ],
  achievements: [
    { id: 'ach-1', title: 'Kaggle Silver Medal', description: 'Top 5% in Predict Future Sales competition.' },
    { id: 'ach-2', title: 'Best Thesis Award', description: 'Deep Learning for Medical Imaging research.' },
  ],
  strengths: [
    { id: 'str-1', title: 'Statistical Analysis', description: 'Strong foundation in statistical methods.' },
    { id: 'str-2', title: 'Data Storytelling', description: 'Communicates findings through visualizations.' },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', language: 'Hindi', proficiency: 'Native' },
  ],
};

// ============================================================================
// UI/UX DESIGN FRESHER
// ============================================================================

export const UIUX_FRESHER_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Kavya Nair',
    email: 'kavya.nair@email.com',
    phone: '+91-8899776655',
    location: 'Bangalore, Karnataka',
    title: 'UI/UX Designer',
    summary: 'Creative UI/UX Designer with strong foundation in user-centered design. Proficient in Figma and Adobe Creative Suite. Design internship at product-based startup. Passionate about intuitive digital experiences.',
    linkedin: 'linkedin.com/in/kavyanair',
    portfolio: 'kavyanair.design',
  },
  experience: [
    {
      id: 'intern-1',
      company: 'Swiggy',
      position: 'Product Design Intern',
      startDate: '2023-06',
      endDate: '2023-12',
      current: false,
      employmentType: 'internship',
      bulletPoints: [
        'Redesigned checkout flow, reducing cart abandonment by 15%',
        'Conducted user research with 50+ participants',
        'Created design system components for multiple features',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'National Institute of Design (NID)',
      degree: 'Bachelor of Design',
      field: 'Interaction Design',
      startDate: '2020-07',
      endDate: '2024-05',
      location: 'Ahmedabad, Gujarat',
      gpa: '8.6/10',
      honors: ['Design Excellence Award'],
      coursework: ['User Research', 'Information Architecture', 'Visual Design', 'Prototyping'],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Figma' },
    { id: 'skill-2', name: 'Adobe XD' },
    { id: 'skill-3', name: 'Sketch' },
    { id: 'skill-4', name: 'Photoshop' },
    { id: 'skill-5', name: 'Illustrator' },
    { id: 'skill-6', name: 'Prototyping' },
    { id: 'skill-7', name: 'User Research' },
    { id: 'skill-8', name: 'Design Systems' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Mental Health App',
      description: 'Mobile app for mental wellness with meditation and mood tracking.',
      technologies: ['Figma', 'Protopie', 'User Research'],
      url: 'behance.net/kavyanair/mentalhealth',
      highlights: ['40+ screens designed', '4.5/5 usability score'],
    },
    {
      id: 'proj-2',
      name: 'E-Learning Platform Redesign',
      description: 'Redesigned online learning platform for better engagement.',
      technologies: ['Figma', 'Maze', 'Analytics'],
      highlights: ['25% improved completion rate', '40% fewer clicks'],
    },
  ],
  certifications: [
    { id: 'cert-1', name: 'Google UX Design Certificate', issuer: 'Google (Coursera)', date: '2023-04' },
  ],
  achievements: [
    { id: 'ach-1', title: 'Adobe Design Achievement Award', description: 'Semi-finalist for mobile app design.' },
    { id: 'ach-2', title: 'Dribbble Featured', description: 'Featured on Dribbble homepage.' },
  ],
  strengths: [
    { id: 'str-1', title: 'User Empathy', description: 'Deep understanding of user needs.' },
    { id: 'str-2', title: 'Visual Design', description: 'Strong aesthetic sense.' },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', language: 'Malayalam', proficiency: 'Native' },
  ],
};

// ============================================================================
// MBA FRESHER - Business Graduate
// ============================================================================

export const MBA_FRESHER_DATA: V2ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    phone: '+91-9988776655',
    location: 'Mumbai, Maharashtra',
    title: 'MBA Graduate - Marketing',
    summary: 'MBA graduate specializing in Marketing from IIM Indore. Strong analytical and communication skills. Summer internship at leading FMCG company. Passionate about consumer behavior and digital marketing.',
    linkedin: 'linkedin.com/in/snehareddy',
  },
  experience: [
    {
      id: 'intern-1',
      company: 'Hindustan Unilever Limited',
      position: 'Marketing Intern',
      startDate: '2023-04',
      endDate: '2023-06',
      current: false,
      employmentType: 'internship',
      bulletPoints: [
        'Conducted market research surveying 500+ consumers',
        'Developed digital campaign reaching 2M+ users',
        'Created brand positioning for rural market expansion',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'IIM Indore',
      degree: 'Master of Business Administration',
      field: 'Marketing and Strategy',
      startDate: '2022-06',
      endDate: '2024-04',
      location: 'Indore, Madhya Pradesh',
      gpa: '3.7/4.0',
      honors: ['Director\'s Merit List'],
      coursework: ['Consumer Behavior', 'Brand Management', 'Digital Marketing', 'Marketing Analytics'],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Market Research' },
    { id: 'skill-2', name: 'Brand Management' },
    { id: 'skill-3', name: 'Digital Marketing' },
    { id: 'skill-4', name: 'Google Analytics' },
    { id: 'skill-5', name: 'Tableau' },
    { id: 'skill-6', name: 'Excel (Advanced)' },
    { id: 'skill-7', name: 'PowerPoint' },
    { id: 'skill-8', name: 'SEO/SEM' },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'D2C Brand GTM Strategy',
      description: 'Developed go-to-market strategy for skincare brand.',
      technologies: ['Market Research', 'Financial Modeling'],
      highlights: ['200+ respondent research', '3-year financial projections'],
    },
    {
      id: 'proj-2',
      name: 'Digital Campaign Optimization',
      description: 'Analyzed and optimized e-commerce marketing campaigns.',
      technologies: ['Google Analytics', 'A/B Testing'],
      highlights: ['35% improved ROAS', '20% reduced CAC'],
    },
  ],
  certifications: [
    { id: 'cert-1', name: 'Google Analytics Certification', issuer: 'Google', date: '2023-08' },
  ],
  achievements: [
    { id: 'ach-1', title: 'IIM Case Competition Winner', description: 'First place among 50+ teams.' },
    { id: 'ach-2', title: 'Best Summer Intern', description: 'Top intern among 30 at HUL.' },
  ],
  strengths: [
    { id: 'str-1', title: 'Strategic Thinking', description: 'Develops comprehensive strategies.' },
    { id: 'str-2', title: 'Data-Driven', description: 'Derives insights from market data.' },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', language: 'Hindi', proficiency: 'Native' },
  ],
};

// Export all fresher data
export const FRESHER_MOCK_DATA = {
  CS_FRESHER_DATA,
  ECE_FRESHER_DATA,
  DS_FRESHER_DATA,
  UIUX_FRESHER_DATA,
  MBA_FRESHER_DATA,
};

export default FRESHER_MOCK_DATA;
