import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PlanGenerator from './components/PlanGenerator';
import Results from './components/Results';
import PitchDeck from './components/PitchDeck';
import Footer from './components/Footer';
import { generatePlan } from './utils/planGenerator';
import { generatePitchDeck } from './utils/pitchDeckGenerator';

interface Plan {
  techStack: Array<{
    name: string;
    description: string;
    icon: React.ReactNode;
    category: string;
  }>;
  roadmap: Array<{
    phase: string;
    duration: string;
    tasks: string[];
    milestone: string;
  }>;
  structure: string[];
  deployment: string[];
}

interface PitchSlide {
  title: string;
  content: string[];
  icon: React.ReactNode;
  color: string;
}

function App() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [pitchDeck, setPitchDeck] = useState<PitchSlide[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [currentIdea, setCurrentIdea] = useState('');
  const planGeneratorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleStartNow = () => {
    planGeneratorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGeneratePlan = async (idea: string) => {
    setIsGenerating(true);
    setIsGeneratingPitch(true);
    setCurrentIdea(idea);
    
    try {
      // Generate both plan and pitch deck simultaneously
      const [newPlan, newPitchDeck] = await Promise.all([
        generatePlan(idea),
        generatePitchDeck(idea)
      ]);
      
      setPlan(newPlan);
      setPitchDeck(newPitchDeck);
      
      // Scroll to results after a short delay
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setIsGenerating(false);
      setIsGeneratingPitch(false);
    }
  };

  const handleEditIdea = () => {
    planGeneratorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRegeneratePlan = async () => {
    if (currentIdea) {
      await handleGeneratePlan(currentIdea);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero onStartNow={handleStartNow} />
      
      <div ref={planGeneratorRef}>
        <PlanGenerator 
          onGeneratePlan={handleGeneratePlan} 
          isGenerating={isGenerating}
          currentIdea={currentIdea}
        />
      </div>
      
      {plan && (
        <div ref={resultsRef}>
          <Results 
            plan={plan} 
            originalIdea={currentIdea}
            onEditIdea={handleEditIdea}
            onRegeneratePlan={handleRegeneratePlan}
          />
        </div>
      )}
      
      {pitchDeck && (
        <PitchDeck 
          slides={pitchDeck}
          originalIdea={currentIdea}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;