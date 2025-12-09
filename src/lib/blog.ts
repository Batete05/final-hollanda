import { supabase } from "./supabase";

// Blog post types for Supabase - matches your Blogs table schema
export interface BlogPost {
  id: string;
  created_at: string;
  title: string | null;
  content: string | null;
  image_cover: string | null;
  // Optional fields that can be added later
  slug?: string;
  description?: string;
  excerpt?: string;
  author_name?: string;
  author_email?: string;
  category?: string;
}

// Create a new blog post
export async function createBlogPost(post: {
  title: string;
  content: string;
  image_cover?: string;
  slug?: string;
  description?: string;
  excerpt?: string;
  author_name?: string;
  author_email?: string;
  category?: string;
}) {
  const { data, error } = await supabase
    .from("Blogs")
    .insert([
      {
        title: post.title,
        content: post.content,
        image_cover: post.image_cover || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }

  return data;
}

// Get all blog posts
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from("Blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }

  return data as BlogPost[];
}

// Get a single blog post by slug (or by id if slug doesn't exist)
export async function getBlogPostBySlug(slugOrId: string) {
  // Try to find by slug first, then by id
  let query = supabase.from("Blogs").select("*");
  
  // Check if it's a UUID (id) or a slug
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);
  
  if (isUUID) {
    query = query.eq("id", slugOrId);
  } else {
    // If slug column exists, use it; otherwise fall back to id
    query = query.eq("slug", slugOrId);
  }
  
  const { data, error } = await query.single();

  if (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }

  return data as BlogPost;
}

// Get a single blog post by ID
export async function getBlogPostById(id: string) {
  const { data, error } = await supabase
    .from("Blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }

  return data as BlogPost;
}

// Update a blog post
export async function updateBlogPost(
  id: string,
  updates: Partial<Omit<BlogPost, "id" | "created_at">>
) {
  // Only update fields that exist in the Blogs table
  const updateData: any = {};
  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.content !== undefined) updateData.content = updates.content;
  if (updates.image_cover !== undefined) updateData.image_cover = updates.image_cover;

  const { data, error } = await supabase
    .from("Blogs")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }

  return data;
}

// Delete a blog post
export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from("Blogs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }

  return true;
}

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Upload image to Supabase Storage
export async function uploadBlogImage(file: File): Promise<string> {
  // Generate a unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `blog-images/${fileName}`;

  // Upload the file
  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error("Error uploading image:", error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);

  return publicUrl;
}

// Delete image from Supabase Storage
export async function deleteBlogImage(imageUrl: string): Promise<void> {
  try {
    // Extract the file path from the URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const filePath = pathParts.slice(pathParts.indexOf('blog-images')).join('/');
    
    const { error } = await supabase.storage
      .from('blog-images')
      .remove([filePath]);

    if (error) {
      console.error("Error deleting image:", error);
      // Don't throw - image deletion is not critical
    }
  } catch (error) {
    console.error("Error parsing image URL for deletion:", error);
    // Don't throw - image deletion is not critical
  }
}

