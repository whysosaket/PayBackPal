import React from 'react';
import { Card } from './ui/Card';
import { Expense } from '../types';
import { users } from '../data/dummy';
import { Calendar, DollarSign, Users } from 'lucide-react';

interface ExpenseCardProps {
  expense: Expense;
}

export default function ExpenseCard({ expense }: ExpenseCardProps) {
  const paidByUser = users.find(user => user.id === expense.paidBy);

  return (
    <Card className="hover:shadow-xl transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{expense.description}</h3>
        <div className="flex items-center text-purple-600 font-medium whitespace-nowrap">
          <DollarSign className="w-4 h-4 mr-1" />
          <span>{expense.amount.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(expense.date).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm">
          <Users className="w-4 h-4 mr-2" />
          <span>{expense.participants.length} people</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <img
            src={paidByUser?.avatar}
            alt={paidByUser?.name}
            className="w-8 h-8 rounded-full ring-2 ring-purple-100"
          />
          <span className="ml-2 text-sm text-gray-600">
            Paid by <span className="font-medium text-gray-900">{paidByUser?.name}</span>
          </span>
        </div>

        <div className="flex -space-x-2 overflow-hidden">
          {expense.participants.map(participantId => {
            const participant = users.find(u => u.id === participantId);
            return (
              <img
                key={participantId}
                src={participant?.avatar}
                alt={participant?.name}
                title={participant?.name}
                className="w-6 h-6 rounded-full ring-2 ring-white"
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
}