import React, { useState, useEffect } from 'react';
import { Users, Wifi, WifiOff, Eye, Edit, AlertCircle } from 'lucide-react';
import { collaborationService, SharedPlan } from '../services/collaborationService';
import { supabase, UserIdea } from '../lib/supabase';
import { useRealtimeSync } from '../hooks/useRealtimeSync';
import Results from './Results';

interface SharedPlanViewProps {
  shareToken: string;
}

export default function SharedPlanView({ shareToken }: SharedPlanViewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [share, setShare] = useState<SharedPlan | null>(null);
  const [idea, setIdea] = useState<UserIdea | null>(null);
  const [plan, setPlan] = useState<any>(null);
  const [pitchDeck, setPitchDeck] = useState<any>(null);

  const { collaborators, isConnected, sessionId } = useRealtimeSync({
    ideaId: idea?.id || null,
    enabled: !!idea,
    onUpdate: (updatedIdea) => {
      setIdea(updatedIdea);
      updatePlanFromIdea(updatedIdea);
    },
  });

  useEffect(() => {
    loadSharedPlan();
  }, [shareToken]);

  useEffect(() => {
    if (share && idea && sessionId) {
      collaborationService.joinAsCollaborator(
        idea.id,
        share.permission,
        sessionId
      );
    }
  }, [share, idea, sessionId]);

  const loadSharedPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const shareData = await collaborationService.getShareByToken(shareToken);

      if (!shareData) {
        setError('This share link is invalid, expired, or has been revoked.');
        setLoading(false);
        return;
      }

      setShare(shareData);

      const { data: ideaData, error: ideaError } = await supabase
        .from('user_ideas')
        .select('*')
        .eq('id', shareData.idea_id)
        .single();

      if (ideaError) throw ideaError;

      setIdea(ideaData);
      updatePlanFromIdea(ideaData);
    } catch (err) {
      console.error('Error loading shared plan:', err);
      setError('Failed to load shared plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updatePlanFromIdea = (ideaData: UserIdea) => {
    const loadedPlan = {
      techStack: ideaData.tech_stack || [],
      roadmap: ideaData.roadmap || [],
      structure: ideaData.structure || [],
      deployment: ideaData.deployment || [],
    };
    setPlan(loadedPlan);

    if (ideaData.pitch_deck && ideaData.pitch_deck.length > 0) {
      setPitchDeck(ideaData.pitch_deck);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shared plan...</p>
        </div>
      </div>
    );
  }

  if (error || !share || !idea || !plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            {error || 'Unable to access this shared plan.'}
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{idea.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      share.permission === 'edit'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {share.permission === 'edit' ? (
                      <>
                        <Edit className="w-3 h-3" />
                        Edit Access
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3" />
                        View Only
                      </>
                    )}
                  </span>
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      isConnected
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Wifi className="w-3 h-3" />
                        Live
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3 h-3" />
                        Offline
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {collaborators.length} {collaborators.length === 1 ? 'viewer' : 'viewers'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <Results
          plan={plan}
          originalIdea={idea.description}
          onEditIdea={() => {}}
          onRegeneratePlan={() => {}}
          currentIdeaId={idea.id}
          currentVersion={idea.current_version}
          totalVersions={idea.total_versions}
        />
      </div>
    </div>
  );
}
