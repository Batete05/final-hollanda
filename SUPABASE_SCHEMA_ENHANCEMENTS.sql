-- Optional enhancements for your Blogs table
-- Run these in your Supabase SQL Editor if you want additional features

-- Add slug column for better URLs (recommended)
ALTER TABLE public."Blogs" 
ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create unique index on slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_blogs_slug ON public."Blogs"(slug) WHERE slug IS NOT NULL;

-- Add description/excerpt field
ALTER TABLE public."Blogs" 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Add excerpt field for short summaries
ALTER TABLE public."Blogs" 
ADD COLUMN IF NOT EXISTS excerpt TEXT;

-- Add author information
ALTER TABLE public."Blogs" 
ADD COLUMN IF NOT EXISTS author_name TEXT;
ALTER TABLE public."Blogs" 
ADD COLUMN IF NOT EXISTS author_email TEXT;

-- Add category field
ALTER TABLE public."Blogs" 
ADD COLUMN IF NOT EXISTS category TEXT;

-- Add updated_at timestamp
ALTER TABLE public."Blogs" 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_blogs_updated_at ON public."Blogs";
CREATE TRIGGER update_blogs_updated_at
    BEFORE UPDATE ON public."Blogs"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Note: The current code works with your existing schema (id, created_at, title, content, image_cover)
-- These enhancements are optional but recommended for better functionality

