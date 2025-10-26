import { useEffect, useState } from 'react';
import { collaborationService, Collaborator } from '../services/collaborationService';
import { supabase, UserIdea } from '../lib/supabase';

interface UseRealtimeSyncProps {
  ideaId: string | null;
  enabled: boolean;
  onUpdate?: (idea: UserIdea) => void;
}

export const useRealtimeSync = ({ ideaId, enabled, onUpdate }: UseRealtimeSyncProps) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [sessionId] = useState(() => collaborationService.generateSessionId());
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!ideaId || !enabled) {
      setIsConnected(false);
      return;
    }

    setIsConnected(true);

    const loadCollaborators = async () => {
      try {
        const data = await collaborationService.getActiveCollaborators(ideaId);
        setCollaborators(data);
      } catch (error) {
        console.error('Error loading collaborators:', error);
      }
    };

    loadCollaborators();

    const heartbeatInterval = setInterval(() => {
      if (ideaId) {
        collaborationService.getActiveCollaborators(ideaId).then(setCollaborators);
      }
    }, 30000);

    const unsubscribe = collaborationService.subscribeToIdea(
      ideaId,
      async (payload) => {
        if (payload.new) {
          const { data, error } = await supabase
            .from('user_ideas')
            .select('*')
            .eq('id', ideaId)
            .single();

          if (!error && data && onUpdate) {
            onUpdate(data);
          }
        }
      },
      () => {
        loadCollaborators();
      }
    );

    return () => {
      clearInterval(heartbeatInterval);
      unsubscribe();
      setIsConnected(false);
    };
  }, [ideaId, enabled, onUpdate]);

  const updateIdea = async (updates: Partial<UserIdea>) => {
    if (!ideaId) return;

    try {
      const { error } = await supabase
        .from('user_ideas')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ideaId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating idea:', error);
      throw error;
    }
  };

  return {
    collaborators,
    sessionId,
    isConnected,
    updateIdea,
  };
};
