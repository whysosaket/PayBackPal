import { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 bg-white border-b border-gray-100 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold text-gray-900">
              PayBackPal
            </h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              className={`nav-link ${location.pathname === '/profile' ? 'nav-link-active' : ''}`}
            >
              <User className="w-5 h-5" />
            </Link>
          </nav>

          <button 
            className="md:hidden btn-secondary p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <Link 
              to="/" 
              className={`nav-link block ${location.pathname === '/' ? 'nav-link-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/profile" 
              className={`nav-link block ${location.pathname === '/profile' ? 'nav-link-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}