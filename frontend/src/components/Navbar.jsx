import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Dashboard', path: '/dashboard' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    // Changed bg-white to bg-slate-900
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              {/* Changed gradient to white text */}
              <span className="text-2xl font-bold text-white">
                LearnHub
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors duration-300 font-medium py-2 ${
                  isActive(link.path)
                    // Changed indigo to emerald-400
                    ? 'text-emerald-400 border-b-2 border-emerald-400'
                    // Changed text-gray-600 to text-gray-300, hover to emerald-300
                    : 'text-gray-300 hover:text-emerald-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="relative">
              {/* Changed bg-gray-100 to bg-slate-800, text to gray-200 */}
              <button className="flex items-center space-x-2 bg-slate-800 rounded-full py-2 px-4 hover:bg-slate-700 transition-colors focus:ring-4 focus:ring-slate-200">
                {/* Changed indigo-600 to emerald-600 */}
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span className="text-sm font-medium text-gray-200">Profile</span>
              </button>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            {/* Changed gray-600 to gray-300 */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          {/* Changed bg-white to bg-slate-800 */}
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800 shadow-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    // Changed indigo to emerald-400
                    ? 'text-emerald-400 bg-slate-700'
                    : 'text-gray-300 hover:text-emerald-300 hover:bg-slate-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
