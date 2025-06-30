import React, { useState, useEffect } from 'react';
import { Send, Lightbulb, Loader } from 'lucide-react';

interface PlanGeneratorProps {
  onGeneratePlan: (idea: string) => void;
  isGenerating: boolean;
  currentIdea: string;
}

const PlanGenerator: React.FC<PlanGeneratorProps> = ({ onGeneratePlan, isGenerating, currentIdea }) => {
  const [idea, setIdea] = useState('');

  // Update the input when currentIdea changes (for editing)
  useEffect(() => {
    setIdea(currentIdea);
  }, [currentIdea]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim() && !isGenerating) {
      onGeneratePlan(idea.trim());
    }
  };

  const exampleIdeas = [
    "A mobile app to book local fitness trainers",
    "A SaaS platform for small business inventory management",
    "A social platform for sharing cooking recipes",
    "An e-learning platform for coding bootcamps"
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Describe Your App Idea
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simply describe what you want to build, and our AI will create a comprehensive 
            development plan tailored to your project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <div className="absolute top-4 left-4">
              <Lightbulb className="h-6 w-6 text-purple-400" />
            </div>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your app idea in detail... (e.g., 'A mobile app that helps users find and book local fitness trainers, with real-time scheduling, payment processing, and review system')"
              className="w-full h-40 pl-14 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 resize-none outline-none transition-all"
              disabled={isGenerating}
            />
          </div>
          
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={!idea.trim() || isGenerating}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            >
              {isGenerating ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Generate Plan
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">Try these example ideas:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {exampleIdeas.map((example, index) => (
              <button
                key={index}
                onClick={() => setIdea(example)}
                disabled={isGenerating}
                className="text-sm px-4 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanGenerator;