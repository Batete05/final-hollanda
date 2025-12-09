# Supabase Blog Database Setup

This guide will help you set up Row Level Security (RLS) for your existing `Blogs` table.

## Your Current Schema

Your `Blogs` table has the following structure:
- `id` (UUID, primary key)
- `created_at` (timestamp)
- `title` (text)
- `content` (text)
- `image_cover` (text)

## Step 1: Set Up Row Level Security (RLS)

**IMPORTANT:** You're getting the error "new row violates row-level security policy" because RLS is enabled but no policies are set up.

1. Go to your Supabase project dashboard
2. Click on **"SQL Editor"** in the left sidebar
3. Click **"New query"**
4. Copy and paste the SQL from `SUPABASE_RLS_SETUP.sql`:

```sql
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
```

5. Click **"Run"** or press `Ctrl+Enter` (or `Cmd+Enter` on Mac)

## Step 2: Verify RLS Policies

1. Go to **"Authentication"** → **"Policies"** in the left sidebar
2. Find your `Blogs` table
3. You should see 4 policies listed:
   - Anyone can read blog posts
   - Authenticated users can create blog posts
   - Authenticated users can update blog posts
   - Authenticated users can delete blog posts

## Step 3: Test It

1. Make sure you're logged in to your dashboard
2. Try creating a new blog post
3. It should work now! ✅

## Troubleshooting

### "new row violates row-level security policy"
- **Solution:** Run the RLS setup SQL above
- Make sure you're logged in when trying to create/edit posts
- Verify the policies were created successfully

### "permission denied for table Blogs"
- Check that RLS policies are set up correctly
- Verify you're authenticated (logged in)
- Check that the policy names match exactly (case-sensitive)

### Can't create posts even after setting up RLS
- Make sure you're logged in to the dashboard
- Check the browser console for detailed error messages
- Verify your Supabase authentication is working

## Step 4: Set Up Storage Bucket for Images

To enable image uploads from your device (computer or phone), you need to create a storage bucket in Supabase:

1. Go to your Supabase project dashboard
2. Click on **"Storage"** in the left sidebar
3. Click **"Create a new bucket"**
4. Enter:
   - **Name:** `blog-images` (must match exactly)
   - **Public bucket:** ✅ Check this box (so images can be accessed publicly)
5. Click **"Create bucket"**

### Set Up Storage Policies

After creating the bucket, you need to set up policies so authenticated users can upload images:

1. Click on the `blog-images` bucket
2. Go to the **"Policies"** tab
3. Click **"New Policy"** → **"Create policy from scratch"**

**Policy 1: Allow public read access**
- **Policy name:** `Public can view images`
- **Allowed operation:** SELECT
- **Policy definition:** 
  ```sql
  (bucket_id = 'blog-images')
  ```
- Click **"Save policy"**

**Policy 2: Allow authenticated users to upload**
- **Policy name:** `Authenticated users can upload images`
- **Allowed operation:** INSERT
- **Policy definition:**
  ```sql
  (bucket_id = 'blog-images' AND auth.role() = 'authenticated')
  ```
- Click **"Save policy"**

**Policy 3: Allow authenticated users to update**
- **Policy name:** `Authenticated users can update images`
- **Allowed operation:** UPDATE
- **Policy definition:**
  ```sql
  (bucket_id = 'blog-images' AND auth.role() = 'authenticated')
  ```
- Click **"Save policy"**

**Policy 4: Allow authenticated users to delete**
- **Policy name:** `Authenticated users can delete images`
- **Allowed operation:** DELETE
- **Policy definition:**
  ```sql
  (bucket_id = 'blog-images' AND auth.role() = 'authenticated')
  ```
- Click **"Save policy"**

## Optional: Add More Fields

If you want to add additional fields like `slug`, `description`, `author_name`, etc., you can run the SQL from `SUPABASE_SCHEMA_ENHANCEMENTS.sql`.

---

## Quick Reference

- **Table Name:** `Blogs` (case-sensitive, with quotes)
- **Required Fields:** `title`, `content`
- **Optional Fields:** `image_cover`
- **RLS:** Must be enabled with proper policies for CRUD operations
- **Storage Bucket:** `blog-images` (must be public with proper policies)
