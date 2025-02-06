/*
  # Create leads qualification table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `company_name` (text)
      - `contact_name` (text)
      - `email` (text)
      - `phone` (text)
      - `company_size` (text)
      - `service_interests` (text[])
      - `budget_range` (text)
      - `project_timeline` (text)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `leads` table
    - Add policy for inserting new leads
    - Add policy for authenticated users to read leads
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company_size text NOT NULL,
  service_interests text[] NOT NULL,
  budget_range text NOT NULL,
  project_timeline text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);