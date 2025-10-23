/*
  # Create Chat Conversations Table

  1. New Tables
    - `chat_conversations`
      - `id` (uuid, primary key) - Unique conversation identifier
      - `user_id` (uuid, foreign key) - References auth.users
      - `idea_id` (uuid, nullable, foreign key) - Links to user_ideas if saved
      - `messages` (jsonb) - Array of message objects with role and content
      - `refined_idea` (text, nullable) - Final refined idea text
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `chat_conversations` table
    - Add policy for authenticated users to read their own conversations
    - Add policy for authenticated users to insert their own conversations
    - Add policy for authenticated users to update their own conversations
    - Add policy for authenticated users to delete their own conversations

  3. Indexes
    - Index on user_id for faster lookups
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  idea_id uuid REFERENCES user_ideas(id) ON DELETE SET NULL,
  messages jsonb DEFAULT '[]'::jsonb NOT NULL,
  refined_idea text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON chat_conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
  ON chat_conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
  ON chat_conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations"
  ON chat_conversations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS chat_conversations_user_id_idx ON chat_conversations(user_id);
CREATE INDEX IF NOT EXISTS chat_conversations_created_at_idx ON chat_conversations(created_at DESC);