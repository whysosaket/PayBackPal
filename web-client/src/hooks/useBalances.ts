import { useMemo } from 'react';
import { users, expenses } from '../data/dummy';

export function useBalances() {
  return useMemo(() => {
    const balances: Record<string, number> = {};
    
    users.forEach(user => {
      balances[user.id] = 0;
    });

    expenses.forEach(expense => {
      balances[expense.paidBy] += expense.amount;
      Object.entries(expense.split).forEach(([userId, amount]) => {
        balances[userId] -= amount;
      });
    });

    return balances;
  }, []);
}