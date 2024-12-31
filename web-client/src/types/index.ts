export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  participants: string[];
  split: Record<string, number>;
}

export interface Balance {
  userId: string;
  amount: number;
}