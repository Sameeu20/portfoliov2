// Content sourced from https://www.abdulsameeu.com/

export const PROFILE = {
  name: 'Abdul Sameeu',
  firstName: 'Abdul',
  lastName: 'Sameeu',
  role: 'Full Stack Software Engineer',
  intro:
    'A passionate tech enthusiast specialized in building modern web applications, distributed systems, and scalable backend services.',
  email: 'abdulsameeu9@gmail.com',
  linkedin: 'https://www.linkedin.com/in/abdulsameeu/',
  github: 'https://github.com/Sameeu20',
  resume: 'https://drive.google.com/file/d/1P3xDdqJAfDbaeCFQGsYxZlUHsQYxAadD/view?usp=sharing',
};

export const ABOUT = [
  'I am a Full Stack Software Engineer with a strong foundation in Computer Science. My expertise lies in designing and building scalable web applications and distributed systems using modern technologies like Angular, React, and Spring Boot.',
  'I am a fast learner and a dedicated problem solver, always eager to explore new tools and methodologies to deliver robust and efficient software solutions.',
];

export interface Principle {
  no: string;
  title: string;
  body: string;
}

export const PRINCIPLES: Principle[] = [
  { no: '01', title: 'Clean Code', body: 'Writing maintainable, scalable, and self-documenting code.' },
  { no: '02', title: 'Distributed Systems', body: 'Building resilient microservices and scalable architectures.' },
  {
    no: '03',
    title: 'Performance Optimization',
    body: 'Optimizing APIs, caching strategies, and frontend performance for responsive, high-throughput applications.',
  },
  {
    no: '04',
    title: 'Secure Engineering',
    body: 'Building secure applications with OAuth2, JWT, OIDC, mTLS, and enterprise security best practices.',
  },
];

export interface SkillGroup {
  name: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  { name: 'Frontend', items: ['Angular', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { name: 'Backend', items: ['Java', 'Spring Boot', 'REST', 'gRPC', 'Microservices'] },
  { name: 'Database', items: ['MongoDB', 'MySQL', 'Redis'] },
  { name: 'Cloud & DevOps', items: ['Docker', 'Jenkins', 'Google Cloud'] },
];

export interface Project {
  no: string;
  title: string;
  kind: string;
  stack: string[];
  github: string;
  demo?: string;
  palette: [string, string, string];
}

export const PROJECTS: Project[] = [
  {
    no: '01',
    title: 'Travel Booking Website',
    kind: 'Web app',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    github: PROFILE.github,
    palette: ['#8e86c0', '#f2d39b', '#1e5141'],
  },
  {
    no: '02',
    title: 'Curtain & Upholstery Portfolio',
    kind: 'Business site',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Redux'],
    github: PROFILE.github,
    palette: ['#f3e7cf', '#d9998b', '#b4532a'],
  },
  {
    no: '03',
    title: 'WellNex Fitness E-Commerce',
    kind: 'E-commerce',
    stack: ['Next.js', 'Node', 'Express', 'MongoDB'],
    github: PROFILE.github,
    palette: ['#a6b96c', '#fbb927', '#113d2e'],
  },
];
