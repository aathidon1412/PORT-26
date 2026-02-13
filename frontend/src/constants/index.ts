import { Event, Workshop, Coordinator } from '../types';
import ws1Img from '../assets/workshops/workshop_1.png';
import ws2Img from '../assets/workshops/workshop_2.png';
import ws3Img from '../assets/workshops/workshop_3.png';
import ws4Img from '../assets/workshops/workshop_4.png';

export const EVENTS: Event[] = [
  {
    id: 'evt-1',
    title: 'Think it. Link it',
    category: 'technical',
    type: 'Technical Event',
    description: 'Transform traditional research presentations into an interactive challenge with creativity-driven constraints like "One-Slide Madness" and emoji summaries.',
    detailedDescription: 'This event reinvents the paper presentation by blending research explanation with unexpected challenges.\n\n• The Challenge: Presenters must not only explain their work but also adapt to constraints such as explaining concepts to a 10-year-old in 30 seconds, using only one analogy, or summarizing the paper in a single sentence.\n\n• Evaluation: Judging focuses on technical merit, clarity, impact, and the ability to communicate complex ideas simply under pressure.',
    teamCount: '1',
    date: '06-03-2026',
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
    description: 'A team-based AI challenge testing creativity and logic through automation tasks and agent building.',
    detailedDescription: 'Teams compete in a time-bound environment to test their practical problem-solving skills in Artificial Intelligence.\n\n• Round 1: Teams must automate a specific task using AI tools within a fixed time limit.\n\n• Round 2: Participants are challenged to design and build an AI agent based on a problem statement revealed on the spot.\n\n• Note: Teams are free to use any AI tools or frameworks.',
    teamCount: '2',
    date: '06-03-2026',
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
    description: 'A blind coding challenge where one partner sees the code but can\'t type, and the other types but can\'t see the screen.',
    detailedDescription: 'This event tests communication and trust between the Navigator and the Coder.\n\n• The Roles: The Navigator views the screen but has no keyboard access; the Coder controls the input but is blind to the monitor.\n\n• Round 1: Teams work on creating a proper flowchart for the problem.\n\n• Round 2: The Navigator guides the Coder step-by-step to implement the solution and generate the correct output.',
    teamCount: '2',
    date: '06-03-2026',
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
    description: 'A fast-paced contest combining crossword-style math puzzles with a rapid-fire arithmetic rush.',
    detailedDescription: 'A test of mathematical thinking, speed, and logical reasoning.\n\n• Round 1 (CrossMath Puzzle): Participants solve a number-based crossword where arithmetic clues must be placed logically into a grid.\n\n• Round 2 (Speed Math Rush): Qualified teams solve 30 quick arithmetic questions and must arrange the answers in ascending order to win.',
    teamCount: '2',
    date: '06-03-2026',
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
    description: 'An intense PS4 FIFA knockout tournament designed for football gaming enthusiasts in Solo or Duo modes.',
    detailedDescription: 'Fast-paced football gaming action where winners advance through knockout rounds.\n\n• Format: Matches feature 3-minute halves with penalties deciding any draws.\n\n• Categories: Participants can compete as individuals to become the Solo Champion or team up for the Duo Championship.',
    teamCount: '1 or 2',
    date: '06-03-2026',
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
    description: 'An interactive scavenger hunt where teams race against time to capture real-world objects matching specific assigned colors.',
    detailedDescription: 'An engaging activity enhancing observation and teamwork skills.\n\n• The Mission: Teams have 45 minutes to find and photograph unique objects matching their assigned color (Red, Yellow, Green, or Blue).\n\n• Rules: Only live photos taken during the event count; no gallery uploads or edits allowed. The team with the most valid, unique photos wins.',
    teamCount: '4',
    date: '06-03-2026',
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
    description: 'A race against the clock where duos must complete six mini-games in under five minutes.',
    detailedDescription: 'A high-energy event testing coordination and speed.\n\n• The Challenge: Teams must successfully clear six different fun games within a strict 5-minute total time limit.\n\n• Scoring: Success depends on the total points scored and the speed of completion; the game stops immediately if time runs out.',
    teamCount: '2',
    date: '06-03-2026',
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
    description: 'A creative challenge where participants use text prompts to generate unique AI visuals and digital art.',
    detailedDescription: 'This event highlights the power of prompt engineering and imagination.\n\n• The Goal: Participants craft descriptive prompts to guide generative AI models, transforming ideas into expressive visual art.\n\n• Evaluation: Entries are judged on prompt clarity, visual impact, originality, and creativity.',
    teamCount: '1',
    date: '06-03-2026',
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
    title: 'HACKPROOFING THE FUTURE',
    domain: 'Post-Quantum Cryptography',
    instructor: {
      name: 'Dr. V. Jayakumar',
      role: 'Workshop Organizer',
      image: 'https://picsum.photos/seed/jayakumar/200/200'
    },
    date: '05-03-2026',
    duration: 'Full Day',
    description: 'As quantum computing advances, this workshop explores the unprecedented risks to today\'s encryption methods. Participants will discover how Post-Quantum Cryptography is shaping the future of secure communication against these threats.',
    learnings: ['Post-quantum cryptography in practice', 'Quantum-resistant algorithms and their real-world implications', 'Understanding the next era of cybersecurity'],
    price: 0,
    spotsTotal: 50,
    spotsFilled: 0,
    image: ws1Img
  },
  {
    id: 'ws-2',
    title: 'PROMPT TO PRODUCT',
    domain: 'Artificial Intelligence',
    instructor: {
      name: 'Vishal',
      role: 'Workshop Organizer',
      image: 'https://picsum.photos/seed/vishal/200/200'
    },
    date: '05-03-2026',
    duration: 'Full Day',
    description: 'Master the art of Prompt Engineering and explore the cutting-edge world of Agentic AI — including powerful concepts like Retrieval-Augmented Generation (RAG) and Model Context Protocol (MCP). This hands-on workshop takes you from crafting effective prompts to building a fully functional AI-powered product.',
    learnings: ['Prompt Engineering techniques for precise, high-quality AI outputs', 'Agentic AI concepts — RAG (Retrieval-Augmented Generation) & MCP (Model Context Protocol)', 'Build a complete product using prompts — from idea to working prototype'],
    price: 0,
    spotsTotal: 50,
    spotsFilled: 0,
    image: ws2Img
  },
  {
    id: 'ws-3',
    title: 'FULL STACK FUSION',
    domain: 'Web Development',
    instructor: {
      name: 'Thiganth Kannadasan',
      role: 'Workshop Organizer',
      image: 'https://picsum.photos/seed/thiganth/200/200'
    },
    date: '05-03-2026',
    duration: 'Full Day',
    description: 'A hands-on introduction to Full Stack Web Development using the MERN stack (MongoDB, Express.js, React.js, and Node.js). Participants will learn to design scalable backend systems, build responsive frontend interfaces, and deploy complete applications.',
    learnings: ['Integrating modern UI frameworks like Tailwind CSS and daisyUI with robust backend practices', 'CORS management, file optimization, and cloud deployment using Render', 'Practical experience in building secure, scalable, and high-performance web applications'],
    price: 0,
    spotsTotal: 50,
    spotsFilled: 0,
    image: ws3Img
  },
  {
    id: 'ws-4',
    title: 'LEARN HOW TO THINK, NOT TO CODE',
    domain: 'Problem Solving',
    instructor: {
      name: 'Gows Maithine A',
      role: 'Workshop Organizer',
      image: 'https://picsum.photos/seed/gows/200/200'
    },
    date: '05-03-2026',
    duration: 'Full Day',
    description: 'A guide from Programming Styles to Dynamic Programming that encourages students to stop memorizing solutions and start thinking like problem solvers. We break down how to analyze problems and craft efficient solutions step-by-step instead of jumping straight into syntax.',
    learnings: ['The confidence to face unseen problems without panic', 'Going beyond syntax to understand how great programmers think', 'Analyzing problems, exploring different approaches, and crafting efficient solutions'],
    price: 0,
    spotsTotal: 50,
    spotsFilled: 0,
    image: ws4Img
  }
];

export const COORDINATORS: Coordinator[] = [
  // Faculty Coordinators
  {
    id: 'f-1',
    name: 'Mr. B. Mohanraj',
    role: 'Faculty Coordinator',
    type: 'faculty',
  },
  {
    id: 'f-2',
    name: 'Mr. P. Dineshkumar',
    role: 'Faculty Coordinator',
    type: 'faculty',
  },
  {
    id: 'f-3',
    name: 'Dr. P. Sakthivel',
    role: 'Faculty Coordinator',
    type: 'faculty',
  },
  {
    id: 'f-4',
    name: 'Mr. R. Krishna Prakash',
    role: 'Faculty Coordinator',
    type: 'faculty',
  },
  {
    id: 'f-5',
    name: 'Ms. P. Kruthika',
    role: 'Faculty Coordinator',
    type: 'faculty',
  },
  {
    id: 'f-6',
    name: 'Ms. L. Sindhu',
    role: 'Faculty Coordinator',
    type: 'faculty',
  },
  // Student Coordinators

  {
    id: 's-1',
    name: 'Rahul N',
    role: 'Student Coordinator',
    type: 'student',
    contact: '+91 81489 61455',
  },
  {
    id: 's-2',
    name: 'Viswath Kumar A',
    role: 'Student Coordinator',
    type: 'student',
    contact: '+91 93614 28711',
  },
  {
    id: 's-3',
    name: 'Deepak Kumar V',
    role: 'Student Coordinator',
    type: 'student',
    contact: '+91 82481 59309',
  },
  {
    id: 's-4',
    name: 'Thirumalai R',
    role: 'Student Coordinator',
    type: 'student',
    contact: '+91 90421 70454',
  }
];

// External booking links (Townscript)
export const EVENTS_TOWNSCRIPT_URL = 'https://www.townscript.com/v2/widget/port-2026/booking/team';
export const WORKSHOPS_TOWNSCRIPT_URL = 'https://www.townscript.com/v2/widget/workshop-of-port-2026/booking/tickets';
