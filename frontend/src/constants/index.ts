import { Event, Workshop, Coordinator } from '../types';

export const EVENTS: Event[] = [
  {
    id: 'evt-1',
    title: 'Think it. Link it',
    category: 'technical',
    type: 'Technical Event',
    description: 'This Technical Event transforms the traditional paper presentation into an interactive, creativity-driven challenge. Along with explaining their research work, participants must complete innovative tasks such as "One-Slide Madness," simplify their concept for a 10-year-old, summarize their paper in a single sentence, or represent their work using six emojis. Evaluation focuses on technical depth, clarity, originality, impact, communication skills, time management, and academic integrity.',
    date: 'TBA',
    time: 'TBA',
    venue: 'TBA',
    image: 'https://picsum.photos/seed/thinklink/800/600',
    status: 'open',
    difficulty: 'Intermediate',
    price: 0
  },
  {
    id: 'evt-2',
    title: 'AI FORGE',
    category: 'technical',
    type: 'Technical Event',
    description: 'AI FORGE is a team-based technical challenge designed to test creativity, logical thinking, and practical problem-solving skills in Artificial Intelligence. Teams of two compete in two time-bound rounds: automating a task using AI tools, and designing an AI agent based on a spot problem statement. Teams are free to use any AI tools or frameworks. Evaluation is based on innovation, logical approach, implementation quality, and real-world relevance.',
    date: 'TBA',
    time: 'TBA',
    venue: 'TBA',
    image: 'https://picsum.photos/seed/aiforge/800/600',
    status: 'open',
    difficulty: 'Advanced',
    teamSize: '2 members',
    price: 0
  },
  {
    id: 'evt-3',
    title: 'Two Minds, One Code',
    category: 'technical',
    type: 'Technical Event',
    description: 'Two Minds, One Code is an exciting team-based coding challenge that tests communication, teamwork, and logical thinking. The Navigator can see the problem but has no keyboard access, while the Coder controls the keyboard but cannot view the screen. Round 1 focuses on designing a flowchart, and Round 2 involves coding the solution. Teams are evaluated on clarity of communication, teamwork, problem-solving logic, and correct output.',
    date: 'TBA',
    time: 'TBA',
    venue: 'TBA',
    image: 'https://picsum.photos/seed/twominds/800/600',
    status: 'open',
    difficulty: 'Intermediate',
    teamSize: '2 members',
    price: 0
  },
  {
    id: 'evt-4',
    title: 'MINDSPRINT – CrossMath & Speed Logic Challenge',
    category: 'technical',
    type: 'Technical Event',
    description: 'MindSprint is a fast-paced technical event testing mathematical thinking, logical reasoning, speed, and teamwork. In Round 1 – CrossMath Puzzle, participants solve number-based crossword puzzles with arithmetic clues under time pressure. In Round 2 – Speed Math Rush, qualified teams face 30 rapid-fire arithmetic questions and must arrange answers in ascending order. Teams are evaluated on accuracy, total score, and completion time with bonus points for correct ordering.',
    date: 'TBA',
    time: 'TBA',
    venue: 'TBA',
    image: 'https://picsum.photos/seed/mindsprint/800/600',
    status: 'open',
    difficulty: 'Intermediate',
    teamSize: '2 members',
    price: 0
  },
  {
    id: 'evt-5',
    title: 'GAME ON: FIFA SHOWDOWN',
    category: 'non-technical',
    type: 'Non-Technical Event',
    description: 'GAME ON: FIFA SHOWDOWN is a fast-paced PS4 FIFA knockout tournament designed for gaming enthusiasts. The event features both Solo and Duo categories, allowing participants to compete individually or in teams of two. Matches will be conducted in knockout format, with each game consisting of 3-minute halves. In case of a draw, the winner will be decided through penalties. The competition continues until one Solo Champion and one Duo Champion are crowned.',
    date: 'TBA',
    time: 'TBA',
    venue: 'TBA',
    image: 'https://picsum.photos/seed/fifashowdown/800/600',
    status: 'open',
    price: 0,
    teamSize: '1-2 members'
  },
  {
    id: 'evt-6',
    title: 'Search for Shades',
    category: 'non-technical',
    type: 'Non-Technical Event',
    description: 'Search for Shades is an engaging team-based activity designed to enhance observation skills, creativity, and teamwork. Each team of four is assigned a specific color: Red, Yellow, Green, or Blue. Teams have 45 minutes to find real-world objects matching their color and capture photographs. Teams are evaluated on accuracy of color match, uniqueness of objects, and the total number of valid photographs.',
    date: 'TBA',
    time: 'TBA',
    venue: 'TBA',
    image: 'https://picsum.photos/seed/searchshades/800/600',
    status: 'open',
    price: 0,
    teamSize: '4 members'
  },
  {
    id: 'evt-7',
    title: 'Fun Fiesta',
    category: 'non-technical',
    type: 'Non-Technical Event',
    description: 'Fun Fiesta is an exciting non-technical team event designed to test coordination, speed, and teamwork in a fun and competitive environment. Each team of two must complete six different mini-games within a total time limit of five minutes. Points are awarded for every game successfully completed. Final results are based on total points scored and overall time taken. The team with the highest score and best time wins.',
    date: 'TBA',
    time: 'TBA',
    venue: 'TBA',
    image: 'https://picsum.photos/seed/funfiesta/800/600',
    status: 'open',
    price: 0,
    teamSize: '2 members'
  },
  {
    id: 'evt-8',
    title: 'Gen-Aurora',
    category: 'non-technical',
    type: 'Non-Technical Event',
    description: 'Gen-Aurora is a creative non-technical event where participants transform their imagination into visuals using text prompts. By crafting effective and descriptive prompts, participants guide generative AI tools to produce unique and expressive images. The event focuses on creativity, imagination, and storytelling rather than technical coding skills. Participants are evaluated on originality, clarity of prompts, visual impact, and overall creativity.',
    date: 'TBA',
    time: 'TBA',
    venue: 'TBA',
    image: 'https://picsum.photos/seed/genaurora/800/600',
    status: 'open',
    price: 0
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

// External booking links (Townscript)
export const EVENTS_TOWNSCRIPT_URL = 'https://www.townscript.com/v2/widget/port-2026/booking/team';
export const WORKSHOPS_TOWNSCRIPT_URL = 'https://www.townscript.com/v2/widget/workshop-of-port-2026/booking/tickets';
