import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Copy, 
  Check, 
  FileText,
  Presentation,
  Eye,
  EyeOff
} from 'lucide-react';

interface PitchSlide {
  title: string;
  content: string[];
  icon: React.ReactNode;
  color: string;
}

interface PitchDeckProps {
  slides: PitchSlide[];
  originalIdea: string;
}

const PitchDeck: React.FC<PitchDeckProps> = ({ slides, originalIdea }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const colorClasses = {
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    indigo: 'from-indigo-500 to-indigo-600',
    yellow: 'from-yellow-500 to-yellow-600',
    orange: 'from-orange-500 to-orange-600',
    emerald: 'from-emerald-500 to-emerald-600'
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const formatPitchAsMarkdown = () => {
    let markdown = `# Pitch Deck: ${originalIdea}\n\n`;
    
    slides.forEach((slide, index) => {
      markdown += `## ${index + 1}. ${slide.title}\n\n`;
      slide.content.forEach(point => {
        markdown += `- ${point}\n`;
      });
      markdown += '\n';
    });
    
    return markdown;
  };

  const handleCopyPitch = async () => {
    try {
      const pitchText = formatPitchAsMarkdown();
      await navigator.clipboard.writeText(pitchText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy pitch:', err);
    }
  };

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      // Title page
      doc.setFontSize(24);
      doc.text('Pitch Deck', 20, 30);
      doc.setFontSize(16);
      doc.text(originalIdea, 20, 50);
      
      // Add slides
      slides.forEach((slide, index) => {
        doc.addPage();
        
        // Slide title
        doc.setFontSize(20);
        doc.text(`${index + 1}. ${slide.title}`, 20, 30);
        
        // Slide content
        doc.setFontSize(12);
        let yPosition = 50;
        
        slide.content.forEach(point => {
          const lines = doc.splitTextToSize(point, 170);
          lines.forEach((line: string) => {
            if (yPosition > 270) {
              doc.addPage();
              yPosition = 30;
            }
            doc.text(`• ${line}`, 25, yPosition);
            yPosition += 8;
          });
          yPosition += 3;
        });
      });
      
      doc.save('pitch-deck.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadMarkdown = () => {
    const pitchText = formatPitchAsMarkdown();
    const blob = new Blob([pitchText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pitch-deck.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return (
      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <button
              onClick={() => setIsVisible(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Eye className="h-5 w-5 mr-2" />
              Show Pitch Deck Preview
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Presentation className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Pitch Deck Preview
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Present your idea with confidence using this AI-generated pitch deck
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={handleCopyPitch}
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
                  Copy Pitch
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
              onClick={() => setIsVisible(false)}
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg shadow-sm hover:shadow-md hover:bg-gray-700 transition-all duration-200"
            >
              <EyeOff className="h-5 w-5 mr-2" />
              Hide Pitch Deck
            </button>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="flex justify-center items-center mb-8">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow mr-4"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-purple-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow ml-4"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Current Slide */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className={`bg-gradient-to-r ${colorClasses[slides[currentSlide].color as keyof typeof colorClasses]} p-8 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {slides[currentSlide].icon}
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {slides[currentSlide].title}
                  </h3>
                </div>
                <div className="text-white/80 font-medium">
                  {currentSlide + 1} / {slides.length}
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-4">
                {slides[currentSlide].content.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClasses[slides[currentSlide].color as keyof typeof colorClasses]} mt-2 flex-shrink-0`}></div>
                    <p className="text-gray-700 text-lg leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Slide Overview */}
        <div className="mt-16">
          <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">All Slides Overview</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  index === currentSlide
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`p-1 rounded bg-gradient-to-r ${colorClasses[slide.color as keyof typeof colorClasses]}`}>
                    {React.cloneElement(slide.icon as React.ReactElement, { 
                      className: "h-4 w-4 text-white" 
                    })}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                </div>
                <h5 className="text-sm font-semibold text-gray-800 truncate">{slide.title}</h5>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PitchDeck;