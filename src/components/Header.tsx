import React from 'react';
import { Code2, Github, Twitter } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">DevPlan.ai</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">
              About
            </a>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/starlabman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/0xWeb3DevRel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
                title="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;