import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserIdea {
  id: string;
  user_id: string;
  title: string;
  description: string;
  tech_stack: any[];
  roadmap: any[];
  structure: string[];
  deployment: string[];
  pitch_deck: any[];
  created_at: string;
  updated_at: string;
}