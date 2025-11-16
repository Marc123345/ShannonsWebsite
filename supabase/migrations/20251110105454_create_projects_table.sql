/*
  # Create projects table for portfolio

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, project name)
      - `slug` (text, URL-friendly identifier)
      - `category` (text, project category)
      - `description` (text, short description)
      - `full_description` (text, detailed content)
      - `thumbnail_url` (text, preview image)
      - `hero_image_url` (text, main project image)
      - `client` (text, client name)
      - `year` (integer, project year)
      - `tags` (text array, project tags)
      - `color_primary` (text, hex color)
      - `color_secondary` (text, hex color)
      - `featured` (boolean, is featured project)
      - `order_index` (integer, display order)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access
    - Add policy for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  full_description text,
  thumbnail_url text,
  hero_image_url text,
  client text,
  year integer DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  tags text[] DEFAULT '{}',
  color_primary text DEFAULT '#8b5cf6',
  color_secondary text DEFAULT '#ec4899',
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);

INSERT INTO projects (title, slug, category, description, full_description, client, year, tags, color_primary, color_secondary, featured, order_index, thumbnail_url, hero_image_url) VALUES
('Brand Evolution', 'brand-evolution', 'Branding', 'Complete brand transformation for a tech startup', 'A comprehensive rebranding project that transformed a growing tech startup into an industry leader. We developed a complete visual identity system, brand guidelines, and digital presence.', 'TechCorp', 2024, ARRAY['Branding', 'Identity', 'Strategy'], '#8b5cf6', '#ec4899', true, 1, 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg', 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg'),
('Digital Experience', 'digital-experience', 'Web Design', 'Immersive web experience for luxury retail', 'Created an award-winning e-commerce platform that combines stunning visuals with seamless functionality. Features 3D product views and AR try-on capabilities.', 'LuxBrand', 2024, ARRAY['Web', 'UX/UI', '3D'], '#3b82f6', '#06b6d4', true, 2, 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg', 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'),
('Motion Campaign', 'motion-campaign', 'Motion Design', 'Animated brand campaign across all channels', 'A bold motion design campaign that brought the brand to life across social media, web, and broadcast. Over 50 unique animations created.', 'CreativeCo', 2023, ARRAY['Animation', 'Video', 'Campaign'], '#f59e0b', '#ef4444', true, 3, 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'),
('Product Launch', 'product-launch', 'Marketing', 'Strategic launch for innovative product', 'End-to-end launch strategy including brand positioning, marketing campaigns, and experiential activations that exceeded targets by 250%.', 'InnovateLabs', 2023, ARRAY['Strategy', 'Marketing', 'Launch'], '#10b981', '#8b5cf6', false, 4, 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg', 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'),
('Editorial Design', 'editorial-design', 'Print Design', 'Magazine redesign for modern audience', 'Reimagined a legacy publication for digital-first readers while maintaining print excellence. Won multiple design awards.', 'ModernMag', 2023, ARRAY['Editorial', 'Print', 'Digital'], '#ec4899', '#8b5cf6', false, 5, 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg', 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg'),
('Spatial Experience', 'spatial-experience', 'Experiential', 'Immersive installation for brand activation', 'Created a multi-sensory brand experience combining physical and digital elements. Featured at major industry events.', 'EventCorp', 2024, ARRAY['Installation', 'Experiential', 'Interactive'], '#06b6d4', '#3b82f6', false, 6, 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg', 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg');
