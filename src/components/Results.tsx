import React, { useState } from 'react';
import { 
  Code, 
  Database, 
  Smartphone, 
  Server, 
  CreditCard, 
  Cloud, 
  CheckCircle,
  FolderTree,
  Rocket,
  Target,
  Calendar,
  Star,
  Copy,
  Download,
  FileText,
  ExternalLink,
  Check,
  RefreshCw,
  Edit3,
  Save,
  Heart
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useUserIdeas } from '../hooks/useUserIdeas';

interface TechStackItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

interface RoadmapPhase {
  phase: string;
  duration: string;
  tasks: string[];
  milestone: string;
}

interface ResultsProps {
  plan: {
    techStack: TechStackItem[];
    roadmap: RoadmapPhase[];
    structure: string[];
    deployment: string[];
  };
  originalIdea: string;
  onEditIdea: () => void;
  onRegeneratePlan: () => void;
  onAuthClick?: () => void;
}

const Results: React.FC<ResultsProps> = ({ 
  plan, 
  originalIdea, 
  onEditIdea, 
  onRegeneratePlan,
  onAuthClick 
}) => {
  const { user } = useAuth();
  const { saveIdea } = useUserIdeas();
  const [copySuccess, setCopySuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const formatPlanAsText = () => {
    let text = `# Development Plan for: ${originalIdea}\n\n`;
    
    text += `## Tech Stack\n`;
    plan.techStack.forEach(tech => {
      text += `- **${tech.name}** (${tech.category}): ${tech.description}\n`;
    });
    
    text += `\n## Development Roadmap\n`;
    plan.roadmap.forEach(phase => {
      text += `\n### ${phase.phase} (${phase.duration})\n`;
      text += `**Milestone:** ${phase.milestone}\n`;
      text += `**Tasks:**\n`;
      phase.tasks.forEach(task => {
        text += `- ${task}\n`;
      });
    });
    
    text += `\n## Project Structure\n\`\`\`\n`;
    plan.structure.forEach(item => {
      text += `${item}\n`;
    });
    text += `\`\`\`\n`;
    
    text += `\n## Deployment & Hosting\n`;
    plan.deployment.forEach(option => {
      text += `- ${option}\n`;
    });
    
    return text;
  };

  const handleCopyPlan = async () => {
    try {
      const planText = formatPlanAsText();
      await navigator.clipboard.writeText(planText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy plan:', err);
    }
  };

  const handleDownloadMarkdown = () => {
    const planText = formatPlanAsText();
    const blob = new Blob([planText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'development-plan.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // Title
      doc.setFontSize(20);
      doc.text('Development Plan', 20, 30);
      
      // Original idea
      doc.setFontSize(12);
      doc.text(`Project: ${originalIdea}`, 20, 50);
      
      let yPosition = 70;
      
      // Tech Stack
      doc.setFontSize(16);
      doc.text('Tech Stack', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      plan.techStack.forEach(tech => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(`• ${tech.name} (${tech.category}): ${tech.description}`, 25, yPosition);
        yPosition += 8;
      });
      
      yPosition += 10;
      
      // Roadmap
      doc.setFontSize(16);
      doc.text('Development Roadmap', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      plan.roadmap.forEach(phase => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(12);
        doc.text(`${phase.phase} (${phase.duration})`, 25, yPosition);
        yPosition += 8;
        
        doc.setFontSize(10);
        doc.text(`Milestone: ${phase.milestone}`, 25, yPosition);
        yPosition += 6;
        
        phase.tasks.forEach(task => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(`  - ${task}`, 30, yPosition);
          yPosition += 6;
        });
        yPosition += 5;
      });
      
      doc.save('development-plan.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveIdea = async () => {
    if (!user) {
      onAuthClick?.();
      return;
    }

    setIsSaving(true);
    try {
      const title = originalIdea.length > 50 
        ? originalIdea.substring(0, 50) + '...' 
        : originalIdea;
      
      await saveIdea(
        title,
        originalIdea,
        plan.techStack,
        plan.roadmap,
        plan.structure,
        plan.deployment,
        [] // pitch deck will be added separately
      );
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving idea:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Development Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Here's your comprehensive roadmap to turn your idea into reality
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={handleSaveIdea}
              disabled={isSaving}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg shadow-sm hover:shadow-md hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {saveSuccess ? (
                <>
                  <Heart className="h-5 w-5 mr-2 text-white fill-current" />
                  Saved!
                </>
              ) : isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  {user ? 'Save Idea' : 'Sign In to Save'}
                </>
              )}
            </button>
            
            <button
              onClick={handleCopyPlan}
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md text-gray-700 hover:text-gray-900 transition-all duration-200"
            >
              {copySuccess ? (
                <>
                  <Check className="h-5 w-5 mr-2 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5 mr-2" />
                  Copy Plan
                </>
              )}
            </button>
            
            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md text-gray-700 hover:text-gray-900 transition-all duration-200"
            >
              <FileText className="h-5 w-5 mr-2" />
              Export Markdown
            </button>
            
            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Download className="h-5 w-5 mr-2" />
              {isExporting ? 'Generating PDF...' : 'Download PDF'}
            </button>
            
            <button
              onClick={onEditIdea}
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg shadow-sm hover:shadow-md hover:bg-purple-700 transition-all duration-200"
            >
              <Edit3 className="h-5 w-5 mr-2" />
              Edit Idea
            </button>
            
            <button
              onClick={onRegeneratePlan}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:shadow-md hover:bg-blue-700 transition-all duration-200"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Regenerate Plan
            </button>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Code className="h-6 w-6 mr-3 text-purple-600" />
            Recommended Tech Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.techStack.map((tech, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-purple-100 rounded-lg">
                    {tech.icon}
                  </div>
                  <div>
                    <div className="text-xs text-purple-600 font-medium mb-1">{tech.category}</div>
                    <h4 className="font-semibold text-gray-900 mb-2">{tech.name}</h4>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Roadmap */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Target className="h-6 w-6 mr-3 text-blue-600" />
            Development Roadmap
          </h3>
          <div className="space-y-6">
            {plan.roadmap.map((phase, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-gray-900">{phase.phase}</h4>
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      <Calendar className="h-4 w-4 mr-1" />
                      {phase.duration}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      <Star className="h-4 w-4 mr-1" />
                      {phase.milestone}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Structure */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <FolderTree className="h-6 w-6 mr-3 text-indigo-600" />
            Suggested Project Structure
          </h3>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              {plan.structure.map((item, index) => (
                <div key={index} className="whitespace-nowrap">{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Deployment Options */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Rocket className="h-6 w-6 mr-3 text-orange-600" />
            Deployment & Hosting
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plan.deployment.map((option, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-orange-100 rounded-lg">
                    <Cloud className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-gray-700">{option}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IDE Integration */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-xl border border-purple-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Code className="h-6 w-6 mr-3 text-purple-600" />
            Start Coding Now
          </h3>
          <p className="text-gray-700 mb-6">
            Ready to bring your plan to life? Here are the best ways to get started with your development environment:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <ExternalLink className="h-5 w-5 mr-2 text-blue-600" />
                Online Development
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>StackBlitz:</strong> Instant online IDE with full Node.js support</li>
                <li>• <strong>CodeSandbox:</strong> Perfect for React and frontend development</li>
                <li>• <strong>Replit:</strong> Full-stack development with database support</li>
                <li>• <strong>Gitpod:</strong> Cloud-based VS Code with GitHub integration</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Code className="h-5 w-5 mr-2 text-green-600" />
                Local Development
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• <strong>VS Code:</strong> Install recommended extensions for your tech stack</li>
                <li>• <strong>Node.js:</strong> Download latest LTS version from nodejs.org</li>
                <li>• <strong>Git:</strong> Version control for your project</li>
                <li>• <strong>Package Manager:</strong> npm, yarn, or pnpm for dependencies</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Pro Tip:</strong> Start with an online IDE like StackBlitz to prototype quickly, 
              then move to local development when you're ready to scale and deploy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;