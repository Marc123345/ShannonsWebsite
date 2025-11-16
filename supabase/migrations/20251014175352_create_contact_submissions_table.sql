/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Contact's full name
      - `email` (text) - Contact's email address
      - `company` (text, optional) - Contact's company name
      - `service` (text, optional) - Service they're interested in
      - `message` (text) - Their message/inquiry
      - `created_at` (timestamptz) - Timestamp of submission
      - `status` (text) - Status of inquiry (new, contacted, closed)
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for inserting new submissions (public access for form submissions)
    - Add policy for admins to read submissions (authenticated users only)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  service text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);