/**
 * Backend Precision Template Mock Data
 *
 * Data Scientist resume data for a complete, professional look.
 */

import type { ResumeData } from '@/types/resume';

export const mockData: ResumeData = {
  version: '2.0',
  personalInfo: {
    fullName: 'Dr. Elena Rodriguez',
    email: 'e.rodriguez@datatech.com',
    phone: '+1-555-0134',
    location: 'San Francisco, CA',
    title: 'Senior Data Scientist',
    summary: 'Data Scientist with 7+ years of experience in machine learning, statistical modeling, and big data analytics. PhD in Computer Science with specialization in deep learning. Proven track record of developing predictive models that drive business decisions and generate millions in revenue. Expert in Python, TensorFlow, and cloud-based ML platforms.',
    linkedin: 'linkedin.com/in/elenarodriguez',
    portfolio: 'elenarodriguez.ai',
    github: 'github.com/elenards',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'DataTech Analytics',
      position: 'Senior Data Scientist',
      startDate: '2021-03',
      endDate: '',
      current: true,
      location: 'San Francisco, CA',
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
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      location: 'Seattle, WA',
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
      company: 'Stanford Research Lab',
      position: 'Graduate Research Assistant',
      startDate: '2015-09',
      endDate: '2018-05',
      current: false,
      location: 'Stanford, CA',
      description: 'Conducted research on deep learning and computer vision',
      bulletPoints: [
        'Published 5 papers in top-tier conferences (NeurIPS, ICML, CVPR)',
        'Developed novel neural network architecture for medical image analysis',
        'Mentored undergraduate students in machine learning research',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      degree: 'PhD',
      field: 'Computer Science (Machine Learning)',
      startDate: '2015-09',
      endDate: '2018-05',
      location: 'Stanford, CA',
    },
    {
      id: 'edu-2',
      school: 'MIT',
      degree: "Master's Degree",
      field: 'Data Science',
      startDate: '2013-09',
      endDate: '2015-05',
      location: 'Cambridge, MA',
    },
  ],
  skills: [
    { id: 'skill-1', name: 'Python', rating: 5 },
    { id: 'skill-2', name: 'TensorFlow', rating: 5 },
    { id: 'skill-3', name: 'PyTorch', rating: 4 },
    { id: 'skill-4', name: 'Scikit-learn', rating: 5 },
    { id: 'skill-5', name: 'SQL', rating: 4 },
    { id: 'skill-6', name: 'Pandas', rating: 5 },
    { id: 'skill-7', name: 'AWS SageMaker', rating: 4 },
    { id: 'skill-8', name: 'Spark', rating: 4 },
    { id: 'skill-9', name: 'Docker', rating: 3 },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Machine Learning Specialty',
      issuer: 'Amazon Web Services',
      date: '2023-06',
    },
    {
      id: 'cert-2',
      name: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      date: '2022-03',
    },
    {
      id: 'cert-3',
      name: 'Professional Data Scientist',
      issuer: 'DataCamp',
      date: '2021-11',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' as const },
    { id: 'lang-2', language: 'Spanish', proficiency: 'Fluent' as const },
    { id: 'lang-3', language: 'Portuguese', proficiency: 'Conversational' as const },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Best Paper Award',
      description: 'NeurIPS 2017 for novel deep learning architecture',
    },
    {
      id: 'ach-2',
      title: 'Innovation Award',
      description: 'Fraud detection system with 99.8% accuracy',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Real-time Fraud Detection',
      description: 'ML system processing 1M+ daily transactions',
      technologies: ['Python', 'TensorFlow', 'Kafka', 'AWS'],
      bulletPoints: [
        'Achieved 99.8% accuracy with <100ms latency',
        'Reduced false positives by 40%',
      ],
    },
    {
      id: 'proj-2',
      name: 'Customer Churn Predictor',
      description: 'Predictive model for subscription businesses',
      technologies: ['Python', 'XGBoost', 'Spark'],
      bulletPoints: [
        'Reduced churn by 35%, saving $5M annually',
        'Automated feature engineering pipeline',
      ],
    },
  ],
};

export default mockData;
