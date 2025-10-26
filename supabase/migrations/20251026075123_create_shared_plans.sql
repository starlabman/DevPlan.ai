/*
  # Create Shared Plans Table

  1. New Tables
    - `shared_plans`
      - `id` (uuid, primary key) - Unique share identifier
      - `idea_id` (uuid, foreign key) - References user_ideas
      - `owner_id` (uuid, foreign key) - References auth.users (plan owner)
      - `share_token` (text, unique) - Unique shareable token/slug
      - `permission` (text) - Either 'view' or 'edit'
      - `is_active` (boolean) - Whether the share link is active
      - `expires_at` (timestamptz, nullable) - Optional expiration date
      - `access_count` (integer) - Number of times accessed
      - `last_accessed_at` (timestamptz, nullable) - Last access timestamp
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `plan_collaborators`
      - `id` (uuid, primary key) - Unique identifier
      - `idea_id` (uuid, foreign key) - References user_ideas
      - `user_id` (uuid, foreign key) - References auth.users (optional for anonymous)
      - `session_id` (text) - Session identifier for anonymous users
      - `permission` (text) - Either 'view' or 'edit'
      - `last_seen_at` (timestamptz) - Last activity timestamp
      - `created_at` (timestamptz) - When they joined

  2. Security
    - Enable RLS on both tables
    - Plan owners can manage their shares
    - Anyone with share_token can view/edit based on permissions
    - Collaborators can view their own collaboration records

  3. Indexes
    - Index on share_token for fast lookups
    - Index on idea_id for filtering
    - Index on user_id for user-specific queries
*/

CREATE TABLE IF NOT EXISTS shared_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id uuid REFERENCES user_ideas(id) ON DELETE CASCADE NOT NULL,
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  share_token text UNIQUE NOT NULL,
  permission text CHECK (permission IN ('view', 'edit')) DEFAULT 'view' NOT NULL,
  is_active boolean DEFAULT true NOT NULL,
  expires_at timestamptz,
  access_count integer DEFAULT 0 NOT NULL,
  last_accessed_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS plan_collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id uuid REFERENCES user_ideas(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id text,
  permission text CHECK (permission IN ('view', 'edit')) DEFAULT 'view' NOT NULL,
  last_seen_at timestamptz DEFAULT now() NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE shared_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_collaborators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can manage their shared plans"
  ON shared_plans FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Anyone can view active shared plans by token"
  ON shared_plans FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Plan owners can view collaborators"
  ON plan_collaborators FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_ideas
      WHERE user_ideas.id = plan_collaborators.idea_id
      AND user_ideas.user_id = auth.uid()
    )
  );

CREATE POLICY "Collaborators can view their own records"
  ON plan_collaborators FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert collaborator records"
  ON plan_collaborators FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Collaborators can update their own last_seen"
  ON plan_collaborators FOR UPDATE
  TO anon, authenticated
  USING (
    user_id = auth.uid() OR
    (user_id IS NULL AND session_id IS NOT NULL)
  )
  WITH CHECK (
    user_id = auth.uid() OR
    (user_id IS NULL AND session_id IS NOT NULL)
  );

CREATE INDEX IF NOT EXISTS shared_plans_share_token_idx ON shared_plans(share_token);
CREATE INDEX IF NOT EXISTS shared_plans_idea_id_idx ON shared_plans(idea_id);
CREATE INDEX IF NOT EXISTS shared_plans_owner_id_idx ON shared_plans(owner_id);
CREATE INDEX IF NOT EXISTS plan_collaborators_idea_id_idx ON plan_collaborators(idea_id);
CREATE INDEX IF NOT EXISTS plan_collaborators_user_id_idx ON plan_collaborators(user_id);
CREATE INDEX IF NOT EXISTS plan_collaborators_session_id_idx ON plan_collaborators(session_id);