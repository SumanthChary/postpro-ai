
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUpIcon, 
  LinkIcon, 
  CopyIcon, 
  CheckIcon, 
  UsersIcon, 
  BarChartIcon,
  Link2Icon
} from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/layout/Navigation';
import { supabase } from '@/integrations/supabase/client';

const Affiliate = () => {
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [referralLink, setReferralLink] = useState("https://postpro.ai/?ref=your-unique-id");
  const [copied, setCopied] = useState(false);
  const [zapierWebhook, setZapierWebhook] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        // In a real app, you'd fetch the actual referral link from the database
        setReferralLink(`https://postpro.ai/?ref=${session.user.id.substring(0, 8)}`);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        setReferralLink(`https://postpro.ai/?ref=${session.user.id.substring(0, 8)}`);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setUsername(data.username || "User");
      setAvatarUrl(data.avatar_url || "");
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Your affiliate link is copied to clipboard",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmitWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zapierWebhook) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // For demonstration purposes - in a real app you'd save this to the user's profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Your Zapier integration has been set up successfully",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your webhook URL. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Statistics for the dashboard
  const stats = [
    { label: "Total Referrals", value: session ? "0" : "—", icon: UsersIcon },
    { label: "Conversion Rate", value: session ? "0%" : "—", icon: BarChartIcon },
    { label: "Earnings", value: session ? "$0.00" : "—", icon: TrendingUpIcon },
    { label: "Clicks", value: session ? "0" : "—", icon: LinkIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-light-lavender/30">
      <Navigation
        session={session}
        username={username}
        avatarUrl={avatarUrl}
        handleSignOut={handleSignOut}
        setShowPricing={setShowPricing}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />

      <main className="container mx-auto pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-montserrat font-extrabold bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent mb-4">
              PostPro AI Affiliate Program
            </h1>
            <p className="text-xl text-custom-text max-w-3xl mx-auto">
              Earn recurring commissions by sharing PostPro AI with your network. Get 25% on all referrals - for life!
            </p>
          </div>

          {!session ? (
            <Card className="p-8 text-center mb-12 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Join Our Affiliate Program</h3>
              <p className="mb-6">Sign in or create an account to get your unique referral link and start earning.</p>
              <Button 
                className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white"
                onClick={() => navigate("/auth")}
                size="lg"
              >
                Sign In to Get Started
              </Button>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-electric-purple flex items-center gap-2">
                    <Link2Icon className="w-5 h-5" /> Your Affiliate Link
                  </h3>
                  <p className="mb-4 text-sm text-custom-text">
                    Share this unique link to earn 25% commission on all purchases made by your referrals.
                  </p>
                  <div className="flex gap-2">
                    <Input 
                      value={referralLink} 
                      readOnly 
                      className="font-mono text-sm bg-gray-50"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={copyToClipboard}
                      className="shrink-0"
                    >
                      {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-electric-purple">Referral Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                          <stat.icon className="w-4 h-4" />
                          <span className="text-sm">{stat.label}</span>
                        </div>
                        <p className="text-xl font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card className="p-6 shadow-lg mb-12">
                <h3 className="text-xl font-bold mb-4 text-electric-purple">Zapier Integration</h3>
                <p className="mb-4 text-custom-text">
                  Connect your Zapier workflow to get notified instantly when you earn a commission.
                </p>
                <form onSubmit={handleSubmitWebhook}>
                  <div className="flex gap-3 mb-2">
                    <Input 
                      value={zapierWebhook}
                      onChange={(e) => setZapierWebhook(e.target.value)}
                      placeholder="Enter your Zapier webhook URL"
                      className="flex-1"
                    />
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !zapierWebhook}
                    >
                      Connect
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Set up a Zap with a Webhook trigger to receive commission notifications
                  </p>
                </form>
              </Card>
            </>
          )}

          <Separator className="my-12" />

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 shadow-lg border-t-4 border-electric-purple">
                <div className="font-bold text-3xl text-electric-purple mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Share Your Link</h3>
                <p className="text-custom-text">
                  Copy your unique referral link and share it on social media, email, or your website.
                </p>
              </Card>
              
              <Card className="p-6 shadow-lg border-t-4 border-bright-teal">
                <div className="font-bold text-3xl text-bright-teal mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Users Sign Up</h3>
                <p className="text-custom-text">
                  When someone clicks your link and signs up, they're tracked as your referral forever.
                </p>
              </Card>
              
              <Card className="p-6 shadow-lg border-t-4 border-electric-purple">
                <div className="font-bold text-3xl text-electric-purple mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Earn Commission</h3>
                <p className="text-custom-text">
                  You earn 25% commission every time your referral makes a payment - for life!
                </p>
              </Card>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Affiliate Program Benefits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-electric-purple/10 p-2 rounded-full">
                  <TrendingUpIcon className="w-5 h-5 text-electric-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">25% Lifetime Commission</h3>
                  <p className="text-custom-text">Earn recurring revenue from all payments made by your referrals, forever.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-bright-teal/10 p-2 rounded-full">
                  <LinkIcon className="w-5 h-5 text-bright-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Easy Tracking</h3>
                  <p className="text-custom-text">Simple dashboard to track clicks, referrals, and earnings in one place.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-electric-purple/10 p-2 rounded-full">
                  <UsersIcon className="w-5 h-5 text-electric-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Extended Cookie Period</h3>
                  <p className="text-custom-text">90-day cookie window ensures you get credit even if users sign up later.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-bright-teal/10 p-2 rounded-full">
                  <BarChartIcon className="w-5 h-5 text-bright-teal" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Monthly Payouts</h3>
                  <p className="text-custom-text">Get paid reliably every month via PayPal or bank transfer when you reach $50.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our affiliate program today and start earning passive income by sharing PostPro AI with your network.
            </p>
            {!session ? (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white"
                onClick={() => navigate("/auth")}
              >
                Sign Up Now
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-electric-purple to-bright-teal hover:opacity-90 text-white"
                onClick={copyToClipboard}
              >
                Copy Your Affiliate Link
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Affiliate;
