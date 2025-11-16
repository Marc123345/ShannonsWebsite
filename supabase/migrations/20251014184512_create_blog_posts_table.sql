/*
  # Create blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key) - Unique identifier for each blog post
      - `title` (text, not null) - Blog post title
      - `slug` (text, unique, not null) - URL-friendly version of title
      - `excerpt` (text) - Short summary of the post
      - `content` (text, not null) - Full blog post content (markdown)
      - `author` (text, not null) - Author name
      - `category` (text, not null) - Post category
      - `image_url` (text) - Featured image URL
      - `published` (boolean, default false) - Whether post is published
      - `created_at` (timestamptz) - When post was created
      - `updated_at` (timestamptz) - When post was last updated
      - `published_at` (timestamptz) - When post was published

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access to published posts
    - Add policy for authenticated users to manage posts (for future admin functionality)
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  author text NOT NULL,
  category text NOT NULL,
  image_url text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts(published);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts(category);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at DESC);
