/**
 * Theater Actor Pro Template Mock Data
 *
 * Uses Jayanth Babu Somineni's data for a real resume feel.
 */

import type { ResumeData } from '../../types/resumeData';

export const theaterActorProMockData: ResumeData = {
  personalInfo: {
    fullName: 'Jayanth babu Somineni',
    title: 'Lead Mobile Software Engineer',
    email: 'jsomineni@gmail.com',
    phone: '+918074325415',
    location: 'Hyderabad, Telangana, India',
    linkedin: 'linkedin.com/in/jayanth-babu-somineni',
    portfolio: 'programwithjayanth.com',
    photo: 'https://media.licdn.com/dms/image/v2/C5103AQE_spKjw4XomQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1585635440546?e=1769644800&v=beta&t=B2V4Al0r91MXWzL1tbA-0KOWtocn4aYsfOYCvIxRYrc',
    summary: 'Lead Mobile Software Engineer with 8+ years of experience in native and cross-platform mobile development, leveraging expertise in React, Angular, and NodeJs to deliver scalable and robust solutions. Proven track record of driving technical initiatives, collaborating with cross-functional teams, and mentoring junior engineers. Passionate about adopting modern software engineering practices, including Agile methodologies and DevSecOps, to drive continuous improvement and innovation.',
  },
  experience: [
    {
      id: 'exp-1',
      company: 'ServiceNow',
      position: 'Senior Software Engineer',
      location: 'Hyderabad, Telangana, India',
      startDate: '2024-05',
      endDate: '',
      current: true,
      bulletPoints: [
        'Architected and implemented scalable mobile applications using React and Angular, resulting in improved user engagement and customer satisfaction.',
        'Collaborated with cross-functional teams to design, develop, and deploy mobile solutions, ensuring alignment with business and customer goals.',
        'Mentored junior engineers in modern software engineering practices, including Agile methodologies and DevSecOps, to drive continuous improvement and innovation.',
        'Utilized expertise in NodeJs to develop and deploy server-side applications, integrating with mobile frontends to provide seamless user experiences.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Morgan Stanley',
      position: 'Full Stack Developer',
      location: 'Greater Bengaluru Area',
      startDate: '2019-09',
      endDate: '2024-05',
      current: false,
      bulletPoints: [
        'Developed and deployed multiple web applications using React and Angular, resulting in improved user engagement and customer satisfaction.',
        'Collaborated with cross-functional teams to design, develop, and deploy web solutions, ensuring alignment with business and customer goals.',
        'Utilized expertise in NodeJs to develop and deploy server-side applications, integrating with web frontends to provide seamless user experiences.',
        'Participated in code reviews and ensured adherence to coding standards, driving continuous improvement and innovation.',
      ],
    },
    {
      id: 'exp-3',
      company: 'Capgemini',
      position: 'Frontend Web Developer',
      location: 'Bengaluru, Karnataka, India',
      startDate: '2018-10',
      endDate: '2019-09',
      current: false,
      bulletPoints: [
        'Developed and maintained multiple web applications using React and Angular, collaborating with cross-functional teams.',
        'Utilized expertise in HTML5, CSS, and JavaScript to develop and deploy web applications.',
        'Worked closely with product teams to gather requirements, design, and develop web applications.',
      ],
    },
    {
      id: 'exp-4',
      company: 'InnovaPath, INC.',
      position: 'Web Developer',
      location: 'Hyderabad, Telangana, India',
      startDate: '2015-12',
      endDate: '2018-09',
      current: false,
      bulletPoints: [
        'Developed and maintained multiple web applications using React and Angular.',
        'Collaborated with backend teams to integrate web frontends with server-side applications.',
        'Participated in code reviews and ensured adherence to coding standards.',
      ],
    },
  ],
  skills: [
    { id: 'skill-1', name: 'TypeScript' },
    { id: 'skill-2', name: 'React.js' },
    { id: 'skill-3', name: 'Node.js' },
    { id: 'skill-4', name: 'JavaScript' },
    { id: 'skill-5', name: 'Angular' },
    { id: 'skill-6', name: 'MongoDB' },
    { id: 'skill-7', name: 'GraphQL' },
    { id: 'skill-8', name: 'Next.js' },
    { id: 'skill-9', name: 'Redux.js' },
    { id: 'skill-10', name: 'HTML5' },
    { id: 'skill-11', name: 'CSS' },
    { id: 'skill-12', name: 'Git' },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'QIS College of Engineering & Technology',
      degree: 'BTech - Bachelor of Technology',
      field: 'Mechanical Engineering',
      location: 'India',
      startDate: '2011',
      endDate: '2015',
    },
    {
      id: 'edu-2',
      institution: 'Vikas Public Residential School',
      degree: 'Intermediate',
      field: 'MPC',
      location: 'India',
      startDate: '2009',
      endDate: '2011',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'React & Angular Advanced Patterns',
      description: 'Self-directed learning on advanced frontend patterns',
      technologies: ['React', 'Angular', 'TypeScript'],
      startDate: '2023-01',
    },
    {
      id: 'proj-2',
      name: 'Full Stack Development Bootcamp',
      description: 'Comprehensive training on modern web technologies',
      technologies: ['Node.js', 'MongoDB', 'GraphQL'],
      startDate: '2020-06',
    },
    {
      id: 'proj-3',
      name: 'Mobile Development Workshop',
      description: 'Cross-platform mobile app development training',
      technologies: ['React Native', 'Flutter'],
      startDate: '2019-03',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Professional' },
    { id: 'lang-2', language: 'Telugu', proficiency: 'Native' },
    { id: 'lang-3', language: 'Hindi', proficiency: 'Fluent' },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Angular Certificate',
      issuer: 'HackerRank',
      date: '2021-04',
    },
    {
      id: 'cert-2',
      name: 'JavaScript Certification',
      issuer: 'TestDome',
      date: '2019-11',
    },
  ],
  awards: [
    {
      id: 'award-1',
      title: 'Innovation Award',
      issuer: 'Morgan Stanley',
      date: '2022-12',
      description: 'Recognized for developing an innovative solution that automated manual reporting processes.',
    },
    {
      id: 'award-2',
      title: 'Best Team Collaboration',
      issuer: 'ServiceNow',
      date: '2024-06',
      description: 'Awarded for exceptional cross-team collaboration in delivering a critical mobile platform.',
    },
  ],
};

export default theaterActorProMockData;
