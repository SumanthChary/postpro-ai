
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUpIcon, 
  LinkIcon, 
  UsersIcon, 
  BarChartIcon,
  Link2Icon,
  DollarSignIcon
} from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/layout/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { BackButton } from '@/components/ui/back-button';

// Component imports
import AffiliateHero from '@/components/affiliate/AffiliateHero';
import AffiliateTabContent from '@/components/affiliate/AffiliateTabContent';
import AffiliateHowItWorks from '@/components/affiliate/AffiliateHowItWorks';
import AffiliateBenefits from '@/components/affiliate/AffiliateBenefits';
import AffiliateCTA from '@/components/affiliate/AffiliateCTA';

// Mock earnings data for the line chart
const earningsData = [
  { month: 'Jan', earnings: 0 },
  { month: 'Feb', earnings: 0 },
  { month: 'Mar', earnings: 10 },
  { month: 'Apr', earnings: 25 },
  { month: 'May', earnings: 48 },
  { month: 'Jun', earnings: 120 },
  { month: 'Jul', earnings: 230 },
];

// Mock referral source data for pie chart
const referralSourceData = [
  { name: 'Twitter', value: 45 },
  { name: 'LinkedIn', value: 30 },
  { name: 'Facebook', value: 15 },
  { name: 'Email', value: 10 },
];

const COLORS = ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981'];

// Chart configuration for the charts
const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "#8b5cf6"
  },
  referrals: {
    label: "Referrals",
    color: "#3b82f6"
  },
  twitter: {
    label: "Twitter",
    color: "#8b5cf6"
  },
  linkedin: {
    label: "LinkedIn",
    color: "#3b82f6"
  },
  facebook: {
    label: "Facebook",
    color: "#06b6d4"
  },
  email: {
    label: "Email",
    color: "#10b981"
  }
};

const Affiliate = () => {
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [referralLink, setReferralLink] = useState("https://postpro.ai/?ref=your-unique-id");
  const [showPricing, setShowPricing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [progressValue, setProgressValue] = useState(75);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
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
    toast({
      title: "Link copied!",
      description: "Your affiliate link is copied to clipboard",
    });
  };

  // Statistics for the dashboard - with more impressive numbers for logged-in users
  const stats = [
    { 
      label: "Total Referrals", 
      value: session ? "24" : "—", 
      icon: UsersIcon,
      growth: "+8 this month" 
    },
    { 
      label: "Conversion Rate", 
      value: session ? "32%" : "—", 
      icon: BarChartIcon,
      growth: "+5.2% from last month" 
    },
    { 
      label: "Earnings", 
      value: session ? "$438.75" : "—", 
      icon: DollarSignIcon,
      growth: "+$230 this month" 
    },
    { 
      label: "Clicks", 
      value: session ? "872" : "—", 
      icon: LinkIcon,
      growth: "+156 this week" 
    },
  ];

  // Promotional materials
  const promotionalMaterials = [
    {
      title: "LinkedIn Post Template",
      description: "Ready-to-use LinkedIn post with key selling points and your affiliate link.",
      cta: "Copy Template"
    },
    {
      title: "Email Swipe Copy",
      description: "High-converting email template to send to your subscribers or colleagues.",
      cta: "Copy Email"
    },
    {
      title: "Banner Images",
      description: "Social media banners optimized for different platforms with your branding.",
      cta: "Download Images"
    },
    {
      title: "Video Script",
      description: "Script for creating a high-converting promotional video about PostPro AI.",
      cta: "Get Script"
    }
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
          <BackButton to="/" label="Back to Home" />
        
          <AffiliateHero session={session} copyToClipboard={copyToClipboard} />

          <AffiliateTabContent 
            session={session}
            referralLink={referralLink}
            stats={stats}
            earningsData={earningsData}
            progressValue={progressValue}
            chartConfig={chartConfig}
            referralSourceData={referralSourceData}
            colors={COLORS}
            promotionalMaterials={promotionalMaterials}
          />

          <Separator className="my-12" />

          <AffiliateHowItWorks />
          
          <AffiliateBenefits />

          <AffiliateCTA session={session} copyToClipboard={copyToClipboard} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Affiliate;
