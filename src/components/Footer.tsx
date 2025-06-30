import React from 'react';
import { Code2, Heart, ExternalLink, Github, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code2 className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold">DevPlan.ai</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered development planning tool that transforms your ideas into comprehensive 
              roadmaps with tech stacks, milestones, deployment strategies, and pitch decks.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>using</span>
              <a 
                href="https://bolt.new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 inline-flex items-center transition-colors"
              >
                Bolt.new
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:feedback@devplan.ai" 
                className="text-gray-400 hover:text-white transition-colors"
                title="Send Feedback"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* About DevPlan */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About DevPlan</h3>
            <ul className="space-y-3 text-gray-400">
              <li>• AI-generated development roadmaps</li>
              <li>• Comprehensive tech stack recommendations</li>
              <li>• Project structure and architecture guidance</li>
              <li>• Sprint planning and milestone tracking</li>
              <li>• Professional pitch deck generation</li>
              <li>• Deployment and hosting strategies</li>
              <li>• Perfect for developers and founders</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3 text-gray-400">
              <li>• Instant AI-powered analysis</li>
              <li>• Production-ready recommendations</li>
              <li>• Modern tech stack suggestions</li>
              <li>• Scalable architecture patterns</li>
              <li>• Interactive pitch deck preview</li>
              <li>• Export plans as PDF or Markdown</li>
              <li>• IDE integration suggestions</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 DevPlan.ai. Empowering developers to build better software.
          </div>
          <div className="mt-4 md:mt-0 text-gray-400 text-sm">
            Made possible by AI and open source technologies
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;