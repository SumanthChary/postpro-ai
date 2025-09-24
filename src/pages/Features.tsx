import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  BarChart, 
  Wrench, 
  Headphones, 
  Gift,
  Smartphone,
  Sun,
  Moon,
  MousePointer,
  Eye,
  ArrowRightLeft,
  CheckCircle,
  ArrowLeft,
  Zap,
  Target,
  Hash,
  MessageSquare,
  PenTool,
  TrendingUp,
  Users,
  Clock,
  Shield
} from "lucide-react";

const Features = () => {
  const navigate = useNavigate();

  const coreFeatures = [
    {
      title: "AI Post Enhancement",
      icon: Sparkles,
      description: "Transform your content with intelligent AI optimization",
      features: [
        "15+ professional tone options (Executive, Casual, Technical, etc.)",
        "LinkedIn, Twitter, Instagram, Facebook optimization",
        "AI-powered content rewriting and improvement",
        "Smart emoji and formatting suggestions",
        "Real-time content quality analysis",
        "Platform-specific character limit optimization"
      ],
      badge: "Core Feature"
    },
    {
      title: "Virality & Analytics",
      icon: TrendingUp,
      description: "Predict and track your content performance",
      features: [
        "AI virality score prediction (0-100%)",
        "Engagement potential analysis",
        "Content performance breakdown",
        "Best posting time recommendations",
        "Audience engagement insights",
        "Growth tracking over time"
      ],
      badge: "AI Powered"
    },
    {
      title: "Smart Hashtags & CTAs",
      icon: Hash,
      description: "Optimize reach and conversions automatically",
      features: [
        "AI hashtag suggestions for your niche",
        "Category-specific hashtag research",
        "Custom CTA generator with 20+ templates",
        "Conversion-optimized call-to-actions",
        "Industry-specific keyword integration",
        "Hashtag performance tracking"
      ],
      badge: "Growth Tools"
    },
    {
      title: "Templates & Automation",
      icon: PenTool,
      description: "Professional templates and time-saving tools",
      features: [
        "20+ proven post templates",
        "Business, tech, lifestyle, marketing themes",
        "Custom template creation and saving",
        "Bulk content processing",
        "Multi-platform export",
        "Content scheduling integration"
      ],
      badge: "Productivity"
    },
    {
      title: "AI Chat Assistant",
      icon: MessageSquare,
      description: "Strategic content planning and guidance",
      features: [
        "Content strategy consultation",
        "Post improvement suggestions",
        "Audience targeting advice",
        "Platform-specific best practices",
        "Real-time content optimization tips",
        "Growth strategy recommendations"
      ],
      badge: "AI Assistant"
    },
    {
      title: "Professional Support",
      icon: Shield,
      description: "Reliable support when you need it",
      features: [
        "Priority email support (4-hour response)",
        "Comprehensive help documentation",
        "Video tutorials and guides",
        "Regular feature updates",
        "Bug fixes and improvements",
        "Community best practices sharing"
      ],
      badge: "Support"
    }
  ];


  const userExperience = [
    { icon: Smartphone, text: "Mobile responsive" },
    { icon: MousePointer, text: "One-click enhancement" },
    { icon: Eye, text: "Real-time preview" },
    { icon: Clock, text: "Instant results" },
    { icon: Sun, text: "Light & dark mode" },
    { icon: Users, text: "Multi-platform support" },
  ];

  const truthfulClaims = [
    "✅ Actually enhance your posts with AI",
    "✅ Real virality score analysis (not just random numbers)",
    "✅ 20+ professional templates (not inflated counts)",
    "✅ Genuine hashtag suggestions for your niche",
    "✅ Working CTA generator with proven templates",
    "✅ Priority support with real response times",
    "❌ No fake '89% accuracy' claims",
    "❌ No false '50+ templates' promises",
    "❌ No imaginary 'expert strategy sessions'"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 hover:bg-muted/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            What PostPro AI{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Actually Does
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            No fake promises. No inflated claims. Just powerful AI tools that genuinely help you create better social media content.
          </p>
          
          {/* Honesty Badge */}
          <Card className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Our Promise: 100% Honest Features</h3>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              {truthfulClaims.map((claim, index) => (
                <div key={index} className={`text-left ${claim.startsWith('✅') ? 'text-green-700' : 'text-red-600'}`}>
                  {claim}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Core Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {coreFeatures.map((section, index) => (
            <Card key={section.title} className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                  <Badge variant="secondary" className="mt-1">{section.badge}</Badge>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">{section.description}</p>
              
              <ul className="space-y-3">
                {section.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* User Experience Section */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <h2 className="text-2xl font-bold text-center mb-8">Built for Efficiency</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {userExperience.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-lg mx-auto p-8 bg-gradient-to-r from-primary/10 to-secondary/10">
            <h3 className="text-2xl font-bold mb-4">Ready to Try Real AI Enhancement?</h3>
            <p className="text-muted-foreground mb-6">
              No inflated promises. Just effective tools that work.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/enhance')}
              className="w-full"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Enhancing Posts
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Features;
