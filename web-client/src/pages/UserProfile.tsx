import React from 'react';
import { Card } from '../components/ui/Card';
import { users, expenses } from '../data/dummy';
import { useBalances } from '../hooks/useBalances';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

export default function UserProfile() {
  const currentUser = users[0];
  const balances = useBalances();
  
  const userExpenses = expenses.filter(expense => 
    expense.participants.includes(currentUser.id)
  );

  const totalOwed = Object.entries(balances).reduce((acc, [userId, balance]) => {
    if (userId !== currentUser.id && balance < 0) {
      acc += Math.abs(balance);
    }
    return acc;
  }, 0);

  const totalOwedToUser = Object.entries(balances).reduce((acc, [userId, balance]) => {
    if (userId !== currentUser.id && balance > 0) {
      acc += balance;
    }
    return acc;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="w-20 h-20 rounded-full ring-4 ring-purple-100"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentUser.name}
            </h1>
            <p className="text-gray-500">{currentUser.email}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900">You owe</h3>
            <ArrowUpRight className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-red-600">${totalOwed.toFixed(2)}</p>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900">Owed to you</h3>
            <ArrowDownRight className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">${totalOwedToUser.toFixed(2)}</p>
        </Card>

        <Card className="hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">{userExpenses.length} expenses</p>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Your Recent Expenses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userExpenses.map(expense => (
            <Card key={expense.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900 truncate">{expense.description}</h3>
                <span className="text-green-600 font-medium ml-2 whitespace-nowrap">
                  ${expense.amount.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}