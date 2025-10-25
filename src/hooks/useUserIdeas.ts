import { useState, useEffect } from 'react';
import { supabase, UserIdea } from '../lib/supabase';
import { useAuth } from './useAuth';
import { versionService } from '../services/versionService';

export const useUserIdeas = () => {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<UserIdea[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchIdeas = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_ideas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIdeas(data || []);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveIdea = async (
    title: string,
    description: string,
    techStack: any[],
    roadmap: any[],
    structure: string[],
    deployment: string[],
    pitchDeck: any[],
    existingIdeaId?: string
  ) => {
    if (!user) return null;

    try {
      let ideaData: UserIdea;
      let versionNumber = 1;

      if (existingIdeaId) {
        const { data: existingIdea, error: fetchError } = await supabase
          .from('user_ideas')
          .select('*')
          .eq('id', existingIdeaId)
          .single();

        if (fetchError) throw fetchError;

        versionNumber = (existingIdea.total_versions || 0) + 1;

        const previousVersion = await versionService.getVersion(
          existingIdeaId,
          existingIdea.current_version || 1
        );

        const { data: updatedIdea, error: updateError } = await supabase
          .from('user_ideas')
          .update({
            description,
            tech_stack: techStack,
            roadmap,
            structure,
            deployment,
            pitch_deck: pitchDeck,
            current_version: versionNumber,
            total_versions: versionNumber,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingIdeaId)
          .select()
          .single();

        if (updateError) throw updateError;

        let changesSummary = '';
        if (previousVersion) {
          const currentVersionData = {
            ...previousVersion,
            description,
            tech_stack: techStack,
            roadmap,
            structure,
            deployment,
            pitch_deck: pitchDeck,
          };
          const diffs = versionService.compareVersions(previousVersion, currentVersionData as any);
          changesSummary = versionService.generateChangesSummary(diffs);
        }

        await versionService.createVersion(
          existingIdeaId,
          versionNumber,
          {
            description,
            tech_stack: techStack,
            roadmap,
            structure,
            deployment,
            pitch_deck: pitchDeck,
          },
          changesSummary
        );

        ideaData = updatedIdea;
      } else {
        const { data, error } = await supabase
          .from('user_ideas')
          .insert({
            user_id: user.id,
            title,
            description,
            tech_stack: techStack,
            roadmap,
            structure,
            deployment,
            pitch_deck: pitchDeck,
            current_version: 1,
            total_versions: 1,
          })
          .select()
          .single();

        if (error) throw error;

        await versionService.createVersion(
          data.id,
          1,
          {
            description,
            tech_stack: techStack,
            roadmap,
            structure,
            deployment,
            pitch_deck: pitchDeck,
          },
          'Initial version'
        );

        ideaData = data;
      }

      await fetchIdeas();
      return ideaData;
    } catch (error) {
      console.error('Error saving idea:', error);
      return null;
    }
  };

  const deleteIdea = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_ideas')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Refresh ideas list
      await fetchIdeas();
      return true;
    } catch (error) {
      console.error('Error deleting idea:', error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchIdeas();
    } else {
      setIdeas([]);
    }
  }, [user]);

  return {
    ideas,
    loading,
    saveIdea,
    deleteIdea,
    refetch: fetchIdeas,
  };
};