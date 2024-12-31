import React from 'react';
import ExpenseCard from '../components/ExpenseCard';
import BalanceSummary from '../components/BalanceSummary';
import { expenses } from '../data/dummy';

export default function Dashboard() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {/* On mobile, balance summary appears first */}
        <div className="lg:hidden">
          <BalanceSummary />
        </div>
        
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Expenses
          </h2>
          {expenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))}
        </div>
        
        {/* On desktop, balance summary appears on the right */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <BalanceSummary />
          </div>
        </div>
      </div>
    </main>
  );
}