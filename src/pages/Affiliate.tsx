import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUpIcon, 
  LinkIcon, 
  CopyIcon, 
  CheckIcon, 
  UsersIcon, 
  BarChartIcon,
  Link2Icon,
  PieChartIcon,
  DollarSignIcon,
  LineChartIcon,
  ArrowRightIcon,
  ExternalLinkIcon
} from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/layout/Navigation';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend as RechartLegend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b'];

const Affiliate = () => {
  const [session, setSession] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [referralLink, setReferralLink] = useState(`${window.location.origin}/?ref=your-unique-id`);
  const [copied, setCopied] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [progressValue, setProgressValue] = useState(75);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        // Generate referral link with user ID
        setReferralLink(`${window.location.origin}/?ref=${session.user.id}`);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
        setReferralLink(`${window.location.origin}/?ref=${session.user.id}`);
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
      setUsername(data.username || "");
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
    <div className="min-h-screen bg-white">
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
            <h1 className="text-4xl md:text-5xl font-montserrat font-extrabold text-blue-600 mb-4">
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
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/auth")}
                size="lg"
              >
                Sign In to Get Started
              </Button>
            </Card>
          ) : (
            <>
              <Card className="p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
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
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="stats">Detailed Stats</TabsTrigger>
                  <TabsTrigger value="materials">Promotional Material</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-6 shadow-lg">
                      <h3 className="text-xl font-bold mb-4 text-blue-600">Earnings Dashboard</h3>
                      <div className="h-[300px]">
                        <ChartContainer config={{
                          earnings: { label: "Monthly Earnings ($)" }
                        }}>
                          <ResponsiveContainer>
                            <LineChart
                              data={earningsData}
                              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Line 
                                type="monotone" 
                                dataKey="earnings" 
                                stroke="#3b82f6" 
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Next payout</p>
                          <p className="font-semibold">Aug 1, 2025</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Transactions <ExternalLinkIcon className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </Card>
                    
                    <Card className="p-6 shadow-lg">
                      <h3 className="text-xl font-bold mb-4 text-blue-600">Referral Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                              <stat.icon className="w-4 h-4" />
                              <span className="text-sm">{stat.label}</span>
                            </div>
                            <p className="text-xl font-bold">{stat.value}</p>
                            {stat.growth && (
                              <p className="text-xs text-green-600 mt-1">{stat.growth}</p>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Monthly target: $600</span>
                          <span className="text-sm font-medium">{progressValue}%</span>
                        </div>
                        <Progress value={progressValue} className="h-2" />
                        <p className="text-xs text-gray-500 mt-2">
                          You're on track to hit your monthly target! Just $161.25 more to go.
                        </p>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="stats">
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card className="p-6 shadow-lg">
                      <h3 className="text-xl font-bold mb-4 text-blue-600">Traffic Sources</h3>
                      <div className="h-[300px] flex justify-center">
                        <ChartContainer config={{
                          twitter: { label: "Twitter" },
                          linkedin: { label: "LinkedIn" },
                          facebook: { label: "Facebook" },
                          email: { label: "Email" }
                        }}>
                          <ResponsiveContainer>
                            <PieChart>
                              <Pie
                                data={referralSourceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {referralSourceData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {referralSourceData.map((source, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-sm" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="text-sm">{source.name}: {source.value}%</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                    
                    <Card className="p-6 shadow-lg">
                      <h3 className="text-xl font-bold mb-4 text-blue-600">Top Performing Posts</h3>
                      <div className="space-y-4">
                        <div className="border border-gray-100 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">LinkedIn Post about AI Content</h4>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">42 clicks</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Jun 15, 2025</span>
                            <span>12 conversions (28.5%)</span>
                          </div>
                        </div>
                        
                        <div className="border border-gray-100 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">Twitter Thread on Content Creation</h4>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">36 clicks</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Jun 10, 2025</span>
                            <span>8 conversions (22.2%)</span>
                          </div>
                        </div>
                        
                        <div className="border border-gray-100 rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">Email Campaign to Subscribers</h4>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">28 clicks</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>Jun 5, 2025</span>
                            <span>10 conversions (35.7%)</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        View All Referral Sources
                      </Button>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="materials">
                  <Card className="p-6 shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-blue-600">Promotional Materials</h3>
                    <p className="text-sm text-gray-600 mb-6">
                      Use these ready-made marketing materials to promote PostPro AI effectively. All materials automatically include your unique affiliate link.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {promotionalMaterials.map((material, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                          <h4 className="font-semibold text-lg mb-2">{material.title}</h4>
                          <p className="text-sm text-gray-600 mb-4">{material.description}</p>
                          <Button variant="outline" size="sm">
                            {material.cta} <ArrowRightIcon className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}

          <Separator className="my-12" />

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 shadow-lg border-t-4 border-blue-600">
                <div className="font-bold text-3xl text-blue-600 mb-4">1</div>
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
              
              <Card className="p-6 shadow-lg border-t-4 border-blue-600">
                <div className="font-bold text-3xl text-blue-600 mb-4">3</div>
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
                <div className="bg-blue-600/10 p-2 rounded-full">
                  <TrendingUpIcon className="w-5 h-5 text-blue-600" />
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
                <div className="bg-blue-600/10 p-2 rounded-full">
                  <UsersIcon className="w-5 h-5 text-blue-600" />
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
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate("/auth")}
              >
                Sign Up Now
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
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
