import React, { useState, useRef, useEffect } from 'react';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import ChatAssistant from './components/ChatAssistant';
import SharedPlanView from './components/SharedPlanView';
import Header from './components/Header';
import Hero from './components/Hero';
import PlanGenerator from './components/PlanGenerator';
import Results from './components/Results';
import PitchDeck from './components/PitchDeck';
import Footer from './components/Footer';
import { generatePlan } from './utils/planGenerator';
import { generatePitchDeck } from './utils/pitchDeckGenerator';
import { useAuth } from './hooks/useAuth';
import { UserIdea } from './lib/supabase';
import { IdeaVersion } from './services/versionService';

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
  const [currentIdeaId, setCurrentIdeaId] = useState<string | undefined>(undefined);
  const [currentVersion, setCurrentVersion] = useState(1);
  const [totalVersions, setTotalVersions] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showChatAssistant, setShowChatAssistant] = useState(false);
  const [shareToken, setShareToken] = useState<string | null>(null);
  const planGeneratorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/^\/shared\/([a-zA-Z0-9]+)$/);
    if (match) {
      setShareToken(match[1]);
    }
  }, []);

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

  const handleLoadIdea = (idea: UserIdea) => {
    setCurrentIdea(idea.description);
    setCurrentIdeaId(idea.id);
    setCurrentVersion(idea.current_version || 1);
    setTotalVersions(idea.total_versions || 1);

    const loadedPlan: Plan = {
      techStack: idea.tech_stack || [],
      roadmap: idea.roadmap || [],
      structure: idea.structure || [],
      deployment: idea.deployment || []
    };

    setPlan(loadedPlan);

    if (idea.pitch_deck && idea.pitch_deck.length > 0) {
      setPitchDeck(idea.pitch_deck);
    }

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNewIdea = () => {
    setPlan(null);
    setPitchDeck(null);
    setCurrentIdea('');
    setCurrentIdeaId(undefined);
    setCurrentVersion(1);
    setTotalVersions(1);
    planGeneratorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoadVersion = (version: IdeaVersion) => {
    setCurrentIdea(version.description);
    setCurrentVersion(version.version_number);

    const versionPlan: Plan = {
      techStack: version.tech_stack || [],
      roadmap: version.roadmap || [],
      structure: version.structure || [],
      deployment: version.deployment || []
    };

    setPlan(versionPlan);

    if (version.pitch_deck && version.pitch_deck.length > 0) {
      setPitchDeck(version.pitch_deck);
    }

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleRefineWithAI = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setShowChatAssistant(true);
  };

  const handleIdeaRefined = (refinedIdea: string) => {
    setCurrentIdea(refinedIdea);
    setShowChatAssistant(false);
    handleGeneratePlan(refinedIdea);
  };

  if (shareToken) {
    return <SharedPlanView shareToken={shareToken} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onDashboardClick={() => setShowDashboard(true)}
      />
      <Hero onStartNow={handleStartNow} />
      
      <div ref={planGeneratorRef}>
        <PlanGenerator
          onGeneratePlan={handleGeneratePlan}
          isGenerating={isGenerating}
          currentIdea={currentIdea}
          onRefineWithAI={handleRefineWithAI}
        />
      </div>
      
      {plan && (
        <div ref={resultsRef}>
          <Results
            plan={plan}
            originalIdea={currentIdea}
            onEditIdea={handleEditIdea}
            onRegeneratePlan={handleRegeneratePlan}
            onAuthClick={() => setShowAuthModal(true)}
            currentIdeaId={currentIdeaId}
            currentVersion={currentVersion}
            totalVersions={totalVersions}
            onLoadVersion={handleLoadVersion}
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
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      {user && (
        <UserDashboard
          isOpen={showDashboard}
          onClose={() => setShowDashboard(false)}
          onLoadIdea={handleLoadIdea}
          onNewIdea={handleNewIdea}
        />
      )}

      <ChatAssistant
        isOpen={showChatAssistant}
        onClose={() => setShowChatAssistant(false)}
        onIdeaRefined={handleIdeaRefined}
        initialIdea={currentIdea}
      />
    </div>
  );
}

export default App;