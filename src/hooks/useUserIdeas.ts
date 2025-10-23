import { useState, useEffect } from 'react';
import { supabase, UserIdea } from '../lib/supabase';
import { useAuth } from './useAuth';

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
    pitchDeck: any[]
  ) => {
    if (!user) return null;

    try {
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
        })
        .select()
        .single();

      if (error) throw error;
      
      // Refresh ideas list
      await fetchIdeas();
      return data;
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