/*
  # Create user ideas table

  1. New Tables
    - `user_ideas`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text)
      - `description` (text)
      - `tech_stack` (jsonb)
      - `roadmap` (jsonb)
      - `structure` (jsonb)
      - `deployment` (jsonb)
      - `pitch_deck` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_ideas` table
    - Add policy for users to manage their own ideas
*/

CREATE TABLE IF NOT EXISTS user_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  tech_stack jsonb DEFAULT '[]'::jsonb,
  roadmap jsonb DEFAULT '[]'::jsonb,
  structure jsonb DEFAULT '[]'::jsonb,
  deployment jsonb DEFAULT '[]'::jsonb,
  pitch_deck jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own ideas"
  ON user_ideas
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create an index for better performance
CREATE INDEX IF NOT EXISTS user_ideas_user_id_idx ON user_ideas(user_id);
CREATE INDEX IF NOT EXISTS user_ideas_created_at_idx ON user_ideas(created_at DESC);