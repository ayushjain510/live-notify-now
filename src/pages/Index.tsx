import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@/components/Auth";
import { NotificationBell } from "@/components/NotificationBell";
import { Button } from "@/components/ui/button";
import { LogOut, Bell, Zap } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  const createTestNotification = async () => {
    if (!user) return;

    const notificationTypes = ["info", "success", "warning", "error"];
    const titles = [
      "New Message",
      "Task Completed",
      "Warning Alert",
      "System Update",
      "Achievement Unlocked",
      "Payment Received",
    ];
    const messages = [
      "You have a new message from the team",
      "Your task has been completed successfully",
      "Please review the security settings",
      "System will be updated in 5 minutes",
      "You've earned a new badge!",
      "Payment of $99.99 has been processed",
    ];

    const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const { error } = await supabase.from("notifications").insert({
      user_id: user.id,
      title: randomTitle,
      message: randomMessage,
      type: randomType,
    });

    if (error) {
      console.error("Error creating notification:", error);
      toast.error("Failed to create notification");
    } else {
      toast.success("Test notification created!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Bell className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NotifyHub
              </h1>
              <p className="text-xs text-muted-foreground">Real-time notifications</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NotificationBell />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="hover:bg-secondary"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Live & Real-time</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real-Time Notification System
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience instant notifications with live updates. No page refresh needed - 
              powered by Lovable Cloud's real-time database.
            </p>
          </div>

          {/* Demo Card */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Bell className="h-8 w-8 text-primary" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">Test the System</h3>
                <p className="text-muted-foreground">
                  Click the button below to create a test notification and see the real-time magic in action
                </p>
              </div>

              <Button
                onClick={createTestNotification}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                <Bell className="mr-2 h-5 w-5" />
                Create Test Notification
              </Button>

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Watch the notification bell in the header for instant updates
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">Real-time Updates</h4>
              <p className="text-sm text-muted-foreground">
                Notifications appear instantly without page refresh using websockets
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Smart Badges</h4>
              <p className="text-sm text-muted-foreground">
                Animated badge shows unread count with pulse and shake effects
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Mark as Read</h4>
              <p className="text-sm text-muted-foreground">
                One-click to mark notifications as read or clear all at once
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
