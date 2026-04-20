import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            {/* Changed gradient to white text for contrast */}
            <span className="text-2xl font-bold text-white">
              LearnHub
            </span>
            <p className="mt-4 text-gray-400 max-w-md">
              Empowering learners worldwide with cutting-edge courses and intuitive learning experiences.
              Join our community today and upgrade your skills.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {/* Changed hover to emerald-400 */}
              <li><Link to="/" className="text-gray-400 hover:text-emerald-400 transition-colors hover:underline">Home</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-emerald-400 transition-colors hover:underline">Courses</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-emerald-400 transition-colors hover:underline">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors hover:underline">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors hover:underline">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
