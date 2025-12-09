-- Row Level Security (RLS) Setup for Blogs table
-- Run this in your Supabase SQL Editor to fix the "row-level security policy" error

-- Enable RLS on the Blogs table
ALTER TABLE public."Blogs" ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can read (SELECT) blog posts (public access)
CREATE POLICY "Anyone can read blog posts"
  ON public."Blogs"
  FOR SELECT
  USING (true);

-- Policy 2: Authenticated users can insert (CREATE) blog posts
CREATE POLICY "Authenticated users can create blog posts"
  ON public."Blogs"
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 3: Authenticated users can update blog posts
CREATE POLICY "Authenticated users can update blog posts"
  ON public."Blogs"
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Policy 4: Authenticated users can delete blog posts
CREATE POLICY "Authenticated users can delete blog posts"
  ON public."Blogs"
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- If you want to restrict to only the post creator, use this instead:
-- (Uncomment and modify if needed)

-- CREATE POLICY "Users can only update their own posts"
--   ON public."Blogs"
--   FOR UPDATE
--   USING (auth.uid()::text = author_id)
--   WITH CHECK (auth.uid()::text = author_id);

-- CREATE POLICY "Users can only delete their own posts"
--   ON public."Blogs"
--   FOR DELETE
--   USING (auth.uid()::text = author_id);

