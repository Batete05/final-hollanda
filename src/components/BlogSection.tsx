import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getBlogPosts, BlogPost } from "@/lib/blog";
import { format } from "date-fns";
import { useState } from "react";
import BlogModal from "./BlogModal";
import blogImage from "../assets/Rectangle 4.png";


// Type for the processed blog posts used in the component
interface ProcessedBlogPost {
  date: string;
  title: string;
  image: string;
  description?: string; // Plain text or HTML
  body?: string; // Plain text or HTML
  slug: string | null;
}

const BlogSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedPost, setSelectedPost] = useState<ProcessedBlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { data: supabasePosts, isLoading, error } = useQuery({
    queryKey: ['blog-posts-section'],
    queryFn: async () => {
      try {
        const posts = await getBlogPosts();
        console.log('✅ Fetched posts from Supabase:', posts?.length || 0);
        return posts;
      } catch (err) {
        console.error('❌ Error fetching from Supabase:', err);
        throw err;
      }
    },
    // Prevent stale data - refetch on mount and window focus
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache data (formerly cacheTime)
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // Debug logging
  console.log('🔍 Supabase Posts:', supabasePosts);
  console.log('📊 Posts Length:', supabasePosts?.length);
  console.log('⏳ Loading:', isLoading);
  console.log('❌ Error:', error);

  // Use Supabase data - no fallback data, show empty state if no posts
  const allPosts: ProcessedBlogPost[] = (() => {
    // If we have Supabase posts, use them (even if empty array - means no posts published)
    if (supabasePosts !== undefined) {
      if (supabasePosts.length === 0) {
        console.log('ℹ️ No blog posts found in Supabase. Showing empty state.');
        return [];
      }
      return supabasePosts.map(post => ({
        date: format(new Date(post.created_at), "do MMMM yyyy"),
        title: post.title || 'Untitled',
        image: post.image_cover || blogImage,
        description: post.description || post.excerpt || '',
        body: post.content || '',
        slug: post.slug || post.id, // Use id if no slug
      }));
    }
    
    // Show empty state while loading or if there's an error
    if (isLoading) {
      return []; // Show loading state
    }
    
    if (error) {
      console.error('⚠️ Error loading blog posts:', error);
      return []; // Show empty state on error instead of fallback
    }
    
    return []; // Default to empty if no data and not loading
  })();

  // Pagination logic
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  const handleReadMore = (post: ProcessedBlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section id="blogs" className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-primary font-semibold mb-2 font-barlow">Our Blog</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-barlow">Latest News</h2>
        </motion.div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Error loading blog posts. Please try again later.</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        )}

        {!isLoading && !error && allPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No blog posts available yet.</p>
            <p className="text-muted-foreground">Check back later for new content!</p>
          </div>
        )}

        {!isLoading && !error && allPosts.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8"
            key={currentPage} // This triggers re-animation on page change
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {currentPosts.map((post, index) => (
            <motion.article
              key={`${currentPage}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-4 aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-2 font-barlow">{post.date}</p>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors font-barlow">
                {post.title}
              </h3>
              <button
                onClick={() => handleReadMore(post)}
                className="text-primary font-semibold flex items-center group-hover:gap-2 transition-all font-barlow"
              >
                Read More...
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.article>
            ))}
          </motion.div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-end gap-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={currentPage === page ? "bg-primary text-primary-foreground" : ""}
              >
                {page}
              </Button>
            ))}

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Blog Modal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={selectedPost}
      />
    </section>
  );
};

export default BlogSection;
