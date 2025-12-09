import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, generateSlug, uploadBlogImage, BlogPost } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Plus, Edit, Trash2, Eye, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

const BlogManagement = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_cover: "",
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch all blog posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts-management"],
    queryFn: getBlogPosts,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts-section"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts-management"] });
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create blog post",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<BlogPost> }) =>
      updateBlogPost(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts-section"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts-management"] });
      toast({
        title: "Success",
        description: "Blog post updated successfully!",
      });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update blog post",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts-section"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts-management"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully!",
      });
      setIsDeleteDialogOpen(false);
      setSelectedPost(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      image_cover: "",
    });
    setSelectedImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (editFileInputRef.current) editFileInputRef.current.value = "";
    setFormData((prev) => ({ ...prev, image_cover: "" }));
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    let imageUrl = formData.image_cover;

    // Upload image if a new file is selected
    if (selectedImageFile) {
      setIsUploadingImage(true);
      try {
        imageUrl = await uploadBlogImage(selectedImageFile);
      } catch (error: any) {
        toast({
          title: "Upload Error",
          description: error.message || "Failed to upload image",
          variant: "destructive",
        });
        setIsUploadingImage(false);
        return;
      }
      setIsUploadingImage(false);
    }

    createMutation.mutate({
      title: formData.title,
      content: formData.content,
      image_cover: imageUrl || undefined,
    });
  };

  const handleEdit = async () => {
    if (!selectedPost || !formData.title || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    let imageUrl = formData.image_cover;

    // Upload image if a new file is selected
    if (selectedImageFile) {
      setIsUploadingImage(true);
      try {
        imageUrl = await uploadBlogImage(selectedImageFile);
      } catch (error: any) {
        toast({
          title: "Upload Error",
          description: error.message || "Failed to upload image",
          variant: "destructive",
        });
        setIsUploadingImage(false);
        return;
      }
      setIsUploadingImage(false);
    }

    updateMutation.mutate({
      id: selectedPost.id,
      updates: {
        title: formData.title,
        content: formData.content,
        image_cover: imageUrl || null,
      },
    });
  };

  const handleDelete = () => {
    if (selectedPost) {
      deleteMutation.mutate(selectedPost.id);
    }
  };

  const openEditDialog = (post: BlogPost) => {
    setSelectedPost(post);
    setFormData({
      title: post.title || "",
      content: post.content || "",
      image_cover: post.image_cover || "",
    });
    setSelectedImageFile(null);
    setImagePreview(post.image_cover || null);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (post: BlogPost) => {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/dashboard">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Blog Management
            </h1>
            <p className="text-muted-foreground mt-2">
              Create, edit, and manage your blog posts
            </p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setIsCreateDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title || 'Untitled'}</TableCell>
                    <TableCell>
                      {post.category ? (
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                          {post.category}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{post.author_name || "-"}</TableCell>
                    <TableCell>
                      {format(new Date(post.created_at), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/blog/${post.slug || post.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(post)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <p className="text-muted-foreground">
                      No blog posts found. Create your first post!
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Create Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new blog post.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter blog post title"
                />
              </div>
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Main content of the blog post (supports HTML)"
                  rows={10}
                />
              </div>
              <div>
                <Label htmlFor="image_cover">Image Cover</Label>
                <div className="space-y-2">
                  <Input
                    ref={fileInputRef}
                    id="image_cover"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="cursor-pointer"
                  />
                  {(imagePreview || formData.image_cover) && (
                    <div className="relative mt-2">
                      <img
                        src={imagePreview || formData.image_cover || ""}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-md border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Upload an image from your device (max 5MB)
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={createMutation.isPending || isUploadingImage}
              >
                {isUploadingImage ? "Uploading Image..." : createMutation.isPending ? "Creating..." : "Create Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Blog Post</DialogTitle>
              <DialogDescription>
                Update the blog post details.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter blog post title"
                />
              </div>
              <div>
                <Label htmlFor="edit-content">Content *</Label>
                <Textarea
                  id="edit-content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, content: e.target.value }))
                  }
                  placeholder="Main content of the blog post (supports HTML)"
                  rows={10}
                />
              </div>
              <div>
                <Label htmlFor="edit-image_cover">Image Cover</Label>
                <div className="space-y-2">
                  <Input
                    ref={editFileInputRef}
                    id="edit-image_cover"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="cursor-pointer"
                  />
                  {(imagePreview || formData.image_cover) && (
                    <div className="relative mt-2">
                      <img
                        src={imagePreview || formData.image_cover || ""}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-md border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Upload a new image from your device (max 5MB) or keep the existing one
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEdit}
                disabled={updateMutation.isPending || isUploadingImage}
              >
                {isUploadingImage ? "Uploading Image..." : updateMutation.isPending ? "Updating..." : "Update Post"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                blog post "{selectedPost?.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default BlogManagement;

