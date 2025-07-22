export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  stats: {
    level: number;
    totalPoints: number;
    currentPoints: number;
    streak: number;
    completedChallenges: number;
    location: string;
  };
  inventory: string[];
  createdAt: Date;
}

export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  points: number;
  description: string;
  problemStatement: string;
  testCases: TestCase[];
  category: string;
  createdBy: string;
  createdAt: Date;
  isActive: boolean;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: 'food' | 'housing' | 'transport' | 'tech' | 'lifestyle';
  description: string;
  image: string;
}

// Mock authentication functions
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@devlife.com',
    name: 'Admin User',
    role: 'admin',
    stats: {
      level: 10,
      totalPoints: 10000,
      currentPoints: 5000,
      streak: 30,
      completedChallenges: 200,
      location: 'Tech City HQ',
    },
    inventory: [],
    createdAt: new Date(),
  },
  {
    id: '2',
    email: 'user@devlife.com',
    name: 'Nishant Sinha',
    role: 'user',
    stats: {
      level: 3,
      totalPoints: 2450,
      currentPoints: 850,
      streak: 7,
      completedChallenges: 45,
      location: 'Moving to Tech City',
    },
    inventory: ['coffee-snacks'],
    createdAt: new Date(),
  },
];

export const authenticate = async (
  email: string,
  _password: string
): Promise<User | null> => {
  // Mock authentication
  const user = mockUsers.find((u) => u.email === email);
  return user || null;
};

export const register = async (
  email: string,
  _password: string,
  name: string
): Promise<User> => {
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    role: 'user',
    stats: {
      level: 1,
      totalPoints: 0,
      currentPoints: 100, // Starting bonus
      streak: 0,
      completedChallenges: 0,
      location: 'Hometown',
    },
    inventory: [],
    createdAt: new Date(),
  };
  mockUsers.push(newUser);
  return newUser;
};
