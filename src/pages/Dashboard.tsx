import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, User, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your website content
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user?.email}</p>
              <p className="text-sm text-muted-foreground mt-4">User ID</p>
              <p className="font-mono text-sm">{user?.id}</p>
            </div>
          </CardContent>
        </Card>

        {/* Content Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Blog Posts
              </CardTitle>
              <CardDescription>
                Create, edit, and manage your blog articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your blog posts are managed through Supabase. You can create and manage posts directly from the database or through the API.
                </p>
                <div className="pt-4 space-y-2">
                  <Link to="/dashboard/blogs" className="block">
                    <Button className="w-full">
                      Manage Blog Posts
                    </Button>
                  </Link>
                  <Link to="/blog" className="block">
                    <Button variant="outline" className="w-full">
                      View Blog Posts
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your account is secured with Supabase authentication. Only
                  authorized users can access this dashboard.
                </p>
                <Button variant="outline" className="w-full" disabled>
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to="/" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    View Website
                  </Button>
                </Link>
                <Link to="/blog" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    View Blog
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">
                  Welcome to your dashboard!
                </strong>{" "}
                This is a protected area where you can manage your website
                content.
              </p>
              <div className="space-y-2">
                <p className="text-foreground font-medium">
                  To manage blog posts:
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>
                    Navigate to your Supabase dashboard
                  </li>
                  <li>Go to the Table Editor and select the <code className="bg-muted px-1 rounded">blog_posts</code> table</li>
                  <li>Create, edit, or delete blog posts there</li>
                  <li>
                    Changes will appear on your website immediately since it
                    fetches data client-side
                  </li>
                </ol>
              </div>
              <div className="space-y-2 mt-4">
                <p className="text-foreground font-medium">
                  Future enhancements:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Direct blog post creation from this dashboard</li>
                  <li>User management interface</li>
                  <li>Analytics and statistics</li>
                  <li>Content scheduling</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
