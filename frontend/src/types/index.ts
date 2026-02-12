export interface Event {
  id: string;
  title: string;
  category: 'technical' | 'non-technical';
  type: string; // e.g., 'Hackathon', 'Cultural', 'Sports'
  description: string;
  detailedDescription?: string;
  teamCount?: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  status: 'open' | 'filling-fast' | 'closed';
  price?: number;
  teamSize?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Workshop {
  id: string;
  title: string;
  domain: string;
  instructor: {
    name: string;
    role: string;
    image: string;
  };
  date: string;
  duration: string;
  description: string;
  learnings: string[];
  price: number;
  spotsTotal: number;
  spotsFilled: number;
  image: string;
}

export interface Coordinator {
  id: string;
  name: string;
  role: string;
  type: 'faculty' | 'student' | 'college';
  contact?: string;
  email?: string;
}
