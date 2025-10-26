import { supabase } from '../lib/supabase';

export interface SharedPlan {
  id: string;
  idea_id: string;
  owner_id: string;
  share_token: string;
  permission: 'view' | 'edit';
  is_active: boolean;
  expires_at: string | null;
  access_count: number;
  last_accessed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Collaborator {
  id: string;
  idea_id: string;
  user_id: string | null;
  session_id: string | null;
  permission: 'view' | 'edit';
  last_seen_at: string;
  created_at: string;
}

class CollaborationService {
  private generateShareToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 12; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  async createShareLink(
    ideaId: string,
    permission: 'view' | 'edit',
    expiresInDays?: number
  ): Promise<SharedPlan> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User must be authenticated to share plans');
    }

    const shareToken = this.generateShareToken();
    const expiresAt = expiresInDays
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString()
      : null;

    const { data, error } = await supabase
      .from('shared_plans')
      .insert({
        idea_id: ideaId,
        owner_id: user.id,
        share_token: shareToken,
        permission,
        expires_at: expiresAt,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async getShareLinks(ideaId: string): Promise<SharedPlan[]> {
    const { data, error } = await supabase
      .from('shared_plans')
      .select('*')
      .eq('idea_id', ideaId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  }

  async getShareByToken(shareToken: string): Promise<SharedPlan | null> {
    const { data, error } = await supabase
      .from('shared_plans')
      .select('*')
      .eq('share_token', shareToken)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;

    if (data && data.expires_at && new Date(data.expires_at) < new Date()) {
      return null;
    }

    if (data) {
      await this.incrementAccessCount(data.id);
    }

    return data;
  }

  async revokeShareLink(shareId: string): Promise<void> {
    const { error } = await supabase
      .from('shared_plans')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', shareId);

    if (error) throw error;
  }

  async updateSharePermission(shareId: string, permission: 'view' | 'edit'): Promise<void> {
    const { error } = await supabase
      .from('shared_plans')
      .update({ permission, updated_at: new Date().toISOString() })
      .eq('id', shareId);

    if (error) throw error;
  }

  private async incrementAccessCount(shareId: string): Promise<void> {
    const { error } = await supabase.rpc('increment_share_access', {
      share_id: shareId,
    });

    if (error) {
      await supabase
        .from('shared_plans')
        .update({
          access_count: supabase.sql`access_count + 1`,
          last_accessed_at: new Date().toISOString(),
        })
        .eq('id', shareId);
    }
  }

  async joinAsCollaborator(
    ideaId: string,
    permission: 'view' | 'edit',
    sessionId: string
  ): Promise<Collaborator> {
    const { data: { user } } = await supabase.auth.getUser();

    const existing = await this.getCollaboratorBySession(ideaId, sessionId);
    if (existing) {
      await this.updateLastSeen(existing.id);
      return existing;
    }

    const { data, error } = await supabase
      .from('plan_collaborators')
      .insert({
        idea_id: ideaId,
        user_id: user?.id || null,
        session_id: sessionId,
        permission,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  private async getCollaboratorBySession(
    ideaId: string,
    sessionId: string
  ): Promise<Collaborator | null> {
    const { data, error } = await supabase
      .from('plan_collaborators')
      .select('*')
      .eq('idea_id', ideaId)
      .eq('session_id', sessionId)
      .maybeSingle();

    if (error) return null;

    return data;
  }

  async updateLastSeen(collaboratorId: string): Promise<void> {
    const { error } = await supabase
      .from('plan_collaborators')
      .update({ last_seen_at: new Date().toISOString() })
      .eq('id', collaboratorId);

    if (error) console.error('Error updating last seen:', error);
  }

  async getActiveCollaborators(ideaId: string): Promise<Collaborator[]> {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('plan_collaborators')
      .select('*')
      .eq('idea_id', ideaId)
      .gte('last_seen_at', fiveMinutesAgo)
      .order('last_seen_at', { ascending: false });

    if (error) throw error;

    return data || [];
  }

  subscribeToIdea(
    ideaId: string,
    onUpdate: (payload: any) => void,
    onCollaboratorChange: (payload: any) => void
  ) {
    const ideaChannel = supabase
      .channel(`idea:${ideaId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_ideas',
          filter: `id=eq.${ideaId}`,
        },
        onUpdate
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'plan_collaborators',
          filter: `idea_id=eq.${ideaId}`,
        },
        onCollaboratorChange
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ideaChannel);
    };
  }

  generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const collaborationService = new CollaborationService();
