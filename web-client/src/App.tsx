import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import NewExpense from './pages/NewExpense';
import NewExpenseButton from './components/NewExpenseButton';

export default function App() {
  // In a real app, this would be managed by an auth context
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/new-expense" element={<NewExpense />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <NewExpenseButton />
      </div>
    </BrowserRouter>
  );
}