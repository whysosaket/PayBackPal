import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewExpenseButton() {
  return (
    <Link
      to="/new-expense"
      className="fixed bottom-6 right-6 btn rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl"
    >
      <Plus className="w-6 h-6" />
    </Link>
  );
}