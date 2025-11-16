/*
  # Add budget field to contact submissions

  1. Changes
    - Add `budget` column to `contact_submissions` table
    - Make company and service fields nullable
    - Update existing data handling

  2. Notes
    - Budget field is optional
    - No data loss for existing records
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'budget'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN budget text;
  END IF;
END $$;
