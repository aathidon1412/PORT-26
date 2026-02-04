import { Event, Workshop, Coordinator } from '../types';

export const EVENTS: Event[] = [
  {
    id: 'evt-1',
    title: 'Quantum Leap Hackathon',
    category: 'technical',
    type: 'Hackathon',
    description: 'A 24-hour coding marathon challenging the brightest minds to solve complex algorithmic problems.',
    date: 'March 15, 2026',
    time: '09:00 AM',
    venue: 'Innovation Hub',
    image: 'https://picsum.photos/seed/tech1/800/600',
    status: 'open',
    difficulty: 'Advanced',
    price: 0
  },
  {
    id: 'evt-2',
    title: 'RoboWars Championship',
    category: 'technical',
    type: 'Robotics',
    description: 'Witness the ultimate battle of machines. Build, battle, and conquer in this adrenaline-pumping arena.',
    date: 'March 16, 2026',
    time: '02:00 PM',
    venue: 'Main Arena',
    image: 'https://picsum.photos/seed/tech2/800/600',
    status: 'filling-fast',
    difficulty: 'Intermediate',
    price: 500
  },
  {
    id: 'evt-3',
    title: 'Neon Nights Dance Off',
    category: 'non-technical',
    type: 'Cultural',
    description: 'Showcase your moves under the neon lights. A group dance competition celebrating rhythm and grace.',
    date: 'March 16, 2026',
    time: '06:00 PM',
    venue: 'Grand Auditorium',
    image: 'https://picsum.photos/seed/dance/800/600',
    status: 'open',
    price: 200,
    teamSize: '4-8 members'
  },
  {
    id: 'evt-4',
    title: 'Debate League',
    category: 'non-technical',
    type: 'Literary',
    description: 'Voices that matter. A parliamentary debate competition for the articulate and the bold.',
    date: 'March 17, 2026',
    time: '10:00 AM',
    venue: 'Lecture Hall A',
    image: 'https://picsum.photos/seed/debate/800/600',
    status: 'closed',
    price: 100
  },
  {
    id: 'evt-5',
    title: 'AI Innovation Summit',
    category: 'technical',
    type: 'Symposium',
    description: 'Present your research and ideas on the future of Artificial Intelligence and Machine Learning.',
    date: 'March 15, 2026',
    time: '11:00 AM',
    venue: 'Seminar Hall',
    image: 'https://picsum.photos/seed/ai/800/600',
    status: 'open',
    difficulty: 'Intermediate',
    price: 0
  },
   {
    id: 'evt-6',
    title: 'Capture The Flag',
    category: 'technical',
    type: 'Cybersecurity',
    description: 'Test your ethical hacking skills in this intense CTF challenge designed by industry experts.',
    date: 'March 16, 2026',
    time: '08:00 PM',
    venue: 'Cyber Lab',
    image: 'https://picsum.photos/seed/security/800/600',
    status: 'filling-fast',
    difficulty: 'Advanced',
    price: 150
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    id: 'ws-1',
    title: 'Generative AI Masterclass',
    domain: 'Artificial Intelligence',
    instructor: {
      name: 'Dr. Sarah Chen',
      role: 'Lead AI Researcher, Google',
      image: 'https://picsum.photos/seed/person1/200/200'
    },
    date: 'March 14, 2026',
    duration: '6 Hours',
    description: 'Dive deep into LLMs and Stable Diffusion. Build your own generative agents from scratch.',
    learnings: ['Prompt Engineering', 'RAG Architectures', 'Fine-tuning Models'],
    price: 1500,
    spotsTotal: 50,
    spotsFilled: 42,
    image: 'https://picsum.photos/seed/workshop1/800/600'
  },
  {
    id: 'ws-2',
    title: 'Cloud Native Architecture',
    domain: 'DevOps',
    instructor: {
      name: 'James Wilson',
      role: 'Senior Architect, AWS',
      image: 'https://picsum.photos/seed/person2/200/200'
    },
    date: 'March 14, 2026',
    duration: '4 Hours',
    description: 'Master Kubernetes, Docker, and Microservices patterns for scalable applications.',
    learnings: ['Containerization', 'Orchestration', 'CI/CD Pipelines'],
    price: 1200,
    spotsTotal: 40,
    spotsFilled: 15,
    image: 'https://picsum.photos/seed/workshop2/800/600'
  },
  {
    id: 'ws-3',
    title: 'UI/UX Design Systems',
    domain: 'Design',
    instructor: {
      name: 'Elena Rodriguez',
      role: 'Design Lead, Airbnb',
      image: 'https://picsum.photos/seed/person3/200/200'
    },
    date: 'March 15, 2026',
    duration: '5 Hours',
    description: 'Learn to create scalable design systems using Figma and modern design principles.',
    learnings: ['Component Libraries', 'Auto Layout', 'Prototyping'],
    price: 1000,
    spotsTotal: 30,
    spotsFilled: 28,
    image: 'https://picsum.photos/seed/workshop3/800/600'
  }
];

export const COORDINATORS: Coordinator[] = [
  {
    id: 'c-1',
    name: 'Prof. Alan Grant',
    role: 'Faculty Advisor',
    type: 'faculty',
    contact: '+1 (555) 123-4567',
    email: 'alan.grant@university.edu'
  },
  {
    id: 'c-2',
    name: 'Maya Patel',
    role: 'Student President',
    type: 'student',
    contact: '+1 (555) 987-6543',
    email: 'maya.p@student.university.edu'
  },
  {
    id: 'c-3',
    name: 'Event Office',
    role: 'Administration',
    type: 'college',
    contact: '+1 (555) 000-1111',
    email: 'events@university.edu'
  }
];
