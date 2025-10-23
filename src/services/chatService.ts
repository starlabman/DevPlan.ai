import { supabase } from '../lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  message: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class ChatService {
  private apiUrl: string;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    this.apiUrl = `${supabaseUrl}/functions/v1/chat-assistant`;
  }

  async sendMessage(messages: Message[]): Promise<ChatResponse> {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new Error('User must be authenticated to use chat assistant');
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get response from chat assistant');
    }

    return await response.json();
  }

  async saveConversation(messages: Message[], refinedIdea?: string): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User must be authenticated to save conversation');
    }

    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({
        user_id: user.id,
        messages: messages,
        refined_idea: refinedIdea,
      })
      .select()
      .single();

    if (error) throw error;

    return data.id;
  }

  async getConversations(): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User must be authenticated');
    }

    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  }

  async deleteConversation(conversationId: string): Promise<void> {
    const { error } = await supabase
      .from('chat_conversations')
      .delete()
      .eq('id', conversationId);

    if (error) throw error;
  }
}

export const chatService = new ChatService();
