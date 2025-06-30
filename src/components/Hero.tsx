import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onStartNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartNow }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-purple-200">
              <Sparkles className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">AI-Powered Development Planning</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Turn Your
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {' '}Ideas{' '}
            </span>
            Into Code
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI that transforms your app concepts into comprehensive development plans with tech stacks, 
            roadmaps, and deployment strategies. Perfect for developers, freelancers, and startup founders.
          </p>
          
          <button
            onClick={onStartNow}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Planning Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">10K+</div>
              <div className="text-sm text-gray-600">Plans Generated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-600">24/7</div>
              <div className="text-sm text-gray-600">AI Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">Free</div>
              <div className="text-sm text-gray-600">To Use</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;