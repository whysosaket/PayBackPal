import { User, Expense } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
  },
];

export const expenses: Expense[] = [
  {
    id: '1',
    description: 'Dinner at Italian Restaurant',
    amount: 120,
    paidBy: '1',
    date: '2024-03-10',
    participants: ['1', '2', '3'],
    split: {
      '1': 40,
      '2': 40,
      '3': 40,
    },
  },
  {
    id: '2',
    description: 'Monthly Groceries',
    amount: 200,
    paidBy: '2',
    date: '2024-03-08',
    participants: ['1', '2'],
    split: {
      '1': 100,
      '2': 100,
    },
  },
  {
    id: '3',
    description: 'Movie Night',
    amount: 60,
    paidBy: '3',
    date: '2024-03-05',
    participants: ['2', '3'],
    split: {
      '2': 30,
      '3': 30,
    },
  },
];