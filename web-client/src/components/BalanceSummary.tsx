import React from 'react';
import { Card } from './ui/Card';
import { users } from '../data/dummy';
import { useBalances } from '../hooks/useBalances';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function BalanceSummary() {
  const balances = useBalances();

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Balance Summary
      </h2>
      <div className="space-y-4">
        {users.map(user => {
          const balance = balances[user.id];
          const isPositive = balance >= 0;
          
          return (
            <div key={user.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center min-w-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full ring-2 ring-white flex-shrink-0"
                  />
                  <span className="ml-3 font-medium text-gray-900 truncate">{user.name}</span>
                </div>
                <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <TrendingUp className="w-4 h-4 mr-2" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-2" />
                  )}
                  <span className="font-medium whitespace-nowrap">${Math.abs(balance).toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}