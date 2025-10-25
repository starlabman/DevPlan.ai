/*
  # Create Idea Versions Table

  1. New Tables
    - `idea_versions`
      - `id` (uuid, primary key) - Unique version identifier
      - `idea_id` (uuid, foreign key) - References user_ideas
      - `user_id` (uuid, foreign key) - References auth.users
      - `version_number` (integer) - Sequential version number for this idea
      - `description` (text) - The idea description for this version
      - `tech_stack` (jsonb) - Technology stack array
      - `roadmap` (jsonb) - Roadmap array
      - `structure` (jsonb) - Project structure array
      - `deployment` (jsonb) - Deployment steps array
      - `pitch_deck` (jsonb) - Pitch deck slides array
      - `changes_summary` (text, nullable) - Summary of changes from previous version
      - `created_at` (timestamptz) - Creation timestamp

  2. Changes to Existing Tables
    - Add `current_version` column to user_ideas
    - Add `total_versions` column to user_ideas

  3. Security
    - Enable RLS on `idea_versions` table
    - Add policy for authenticated users to read their own versions
    - Add policy for authenticated users to insert their own versions
    - Add policy for authenticated users to delete their own versions

  4. Indexes
    - Index on idea_id for faster lookups
    - Index on user_id for faster lookups
    - Composite index on idea_id and version_number for unique constraint
*/

CREATE TABLE IF NOT EXISTS idea_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id uuid REFERENCES user_ideas(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  version_number integer NOT NULL,
  description text NOT NULL,
  tech_stack jsonb DEFAULT '[]'::jsonb NOT NULL,
  roadmap jsonb DEFAULT '[]'::jsonb NOT NULL,
  structure jsonb DEFAULT '[]'::jsonb NOT NULL,
  deployment jsonb DEFAULT '[]'::jsonb NOT NULL,
  pitch_deck jsonb DEFAULT '[]'::jsonb NOT NULL,
  changes_summary text,
  created_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT unique_idea_version UNIQUE (idea_id, version_number)
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_ideas' AND column_name = 'current_version'
  ) THEN
    ALTER TABLE user_ideas ADD COLUMN current_version integer DEFAULT 1 NOT NULL;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_ideas' AND column_name = 'total_versions'
  ) THEN
    ALTER TABLE user_ideas ADD COLUMN total_versions integer DEFAULT 1 NOT NULL;
  END IF;
END $$;

ALTER TABLE idea_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own idea versions"
  ON idea_versions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own idea versions"
  ON idea_versions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own idea versions"
  ON idea_versions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idea_versions_idea_id_idx ON idea_versions(idea_id);
CREATE INDEX IF NOT EXISTS idea_versions_user_id_idx ON idea_versions(user_id);
CREATE INDEX IF NOT EXISTS idea_versions_created_at_idx ON idea_versions(created_at DESC);