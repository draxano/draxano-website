
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 md:px-0">
      <div className="max-w-4xl mx-auto glass-nav rounded-full py-2 px-6 flex items-center">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 bg-brand-neon rounded-lg flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-300">
            <div className="w-4 h-4 bg-brand-dark rounded-sm -rotate-45 group-hover:-rotate-90 transition-transform duration-300"></div>
          </div>
          <span className="font-bold text-lg hidden sm:block">Murad Alaskar Draxano</span>
        </Link>

        {/* Desktop Nav - Pushed to the right using ml-auto */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-brand-neon ${
                location.pathname === item.path ? 'text-brand-neon' : 'text-brand-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle - Also aligned right on mobile */}
        <div className="flex items-center gap-4 md:hidden ml-auto">
          <button 
            className="text-white p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-brand-card border border-white/10 rounded-3xl p-6 md:hidden shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium py-2 border-b border-white/5 ${
                  location.pathname === item.path ? 'text-brand-neon' : 'text-brand-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
