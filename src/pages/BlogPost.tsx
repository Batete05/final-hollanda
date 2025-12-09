import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { getBlogPostBySlug, type BlogPost } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarDays, User, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>()

    const { data: post, isLoading, error } = useQuery({
        queryKey: ['blog-post', slug],
        queryFn: async () => {
            if (!slug) throw new Error('Slug is required');
            try {
                const fetchedPost = await getBlogPostBySlug(slug);
                console.log('✅ Fetched post from Supabase:', fetchedPost?.title);
                return fetchedPost;
            } catch (err) {
                console.error('❌ Error fetching post from Supabase:', err);
                throw err;
            }
        },
        enabled: !!slug,
        staleTime: 0,
        gcTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    })

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">Loading blog post...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !post) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">Blog post not found.</p>
                        <Link to="/blog">
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Blog
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-16">
                {/* Back Button */}
                <div className="mb-8">
                    <Link to="/blog">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Button>
                    </Link>
                </div>

                {/* Article Header */}
                <article className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        {/* Categories */}
                        {post.category && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary">
                                    {post.category}
                                </Badge>
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            {post.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex items-center gap-6 text-muted-foreground mb-8">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                {format(new Date(post.created_at), 'MMMM dd, yyyy')}
                            </div>
                            {post.author_name && (
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    {post.author_name}
                                </div>
                            )}
                        </div>

                        {/* Featured Image */}
                        {post.image_cover && (
                            <div className="aspect-video overflow-hidden rounded-lg mb-8">
                                <img
                                    src={post.image_cover}
                                    alt={post.title || 'Blog post'}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Excerpt */}
                        {(post.excerpt || post.description) && (
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary pl-6">
                                {post.excerpt || post.description}
                            </p>
                        )}
                    </header>

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {post.content ? (
                            <div 
                                className="text-foreground"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        ) : (
                            <div className="text-muted-foreground">
                                <p>No content available for this post.</p>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </div>
    )
}

export default BlogPost