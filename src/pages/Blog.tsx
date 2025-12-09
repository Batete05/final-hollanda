import { useQuery } from '@tanstack/react-query'
import { getBlogPosts, BlogPost } from '@/lib/blog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CalendarDays, User } from 'lucide-react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Blog = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['blog-posts'],
        queryFn: async () => {
            try {
                const fetchedPosts = await getBlogPosts();
                console.log('✅ Fetched posts from Supabase:', fetchedPosts?.length || 0);
                return fetchedPosts;
            } catch (err) {
                console.error('❌ Error fetching from Supabase:', err);
                throw err;
            }
        },
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
                        <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <p className="text-red-500">Error loading blog posts. Please try again later.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                <Link to="/dashboard">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
                        Blog
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Insights, tutorials, and thoughts on development, design, and technology
                    </p>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts?.map((post) => (
                        <Link key={post.id} to={`/blog/${post.slug || post.id}`}>
                            <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                                {post.image_cover && (
                                    <div className="aspect-video overflow-hidden rounded-t-lg">
                                        <img
                                            src={post.image_cover}
                                            alt={post.title || 'Blog post'}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    {post.category && (
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <Badge variant="secondary">
                                                {post.category}
                                            </Badge>
                                        </div>
                                    )}
                                    <CardTitle className="group-hover:text-primary transition-colors">
                                        {post.title || 'Untitled'}
                                    </CardTitle>
                                    {(post.excerpt || post.description) && (
                                        <CardDescription className="line-clamp-3">
                                            {post.excerpt || post.description}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <CalendarDays className="h-4 w-4" />
                                            {format(new Date(post.created_at), 'MMM dd, yyyy')}
                                        </div>
                                        {post.author_name && (
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                {post.author_name}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {posts && posts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-muted-foreground text-lg">No blog posts found.</p>
                        <p className="text-muted-foreground">Check back later for new content!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Blog