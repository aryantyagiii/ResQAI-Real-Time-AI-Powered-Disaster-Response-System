/*
  # Initial Schema Setup

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text)
      - full_name (text)
      - role (text)
      - created_at (timestamp)
    
    - disaster_predictions
      - id (uuid, primary key)
      - type (text)
      - location (text)
      - probability (float)
      - created_at (timestamp)
      - metadata (jsonb)
    
    - chat_messages
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - message (text)
      - response (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Disaster predictions table
CREATE TABLE IF NOT EXISTS disaster_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  location text NOT NULL,
  probability float NOT NULL,
  created_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE disaster_predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read predictions"
  ON disaster_predictions
  FOR SELECT
  TO authenticated
  USING (true);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  message text NOT NULL,
  response text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);