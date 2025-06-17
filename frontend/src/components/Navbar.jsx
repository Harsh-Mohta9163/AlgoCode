import React from 'react';
import { Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer"
          >
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Algo <span className="text-red-600">University</span>
            </span>
          </div>
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => navigate('/practice')}
              className={`font-medium transition-colors text-gray-700 hover:text-red-600`}
            >
              Practice
            </button>
            <button 
                onClick={() => navigate('/interview-prep')}
                className={`font-medium transition-colors text-gray-700 hover:text-red-600`}
                >
                Interview Prep
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;