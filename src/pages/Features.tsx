import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  Zap
} from "lucide-react";

const Features = () => {
  const featureSections = [
    {
      title: "Advanced Post Enhancement",
      icon: Sparkles,
      features: [
        "Unlimited LinkedIn posts",
        "All social media platforms support",
        "Advanced tone & sentiment analysis",
        "Premium hashtag research",
        "Custom CTA generator",
        "Bulk post scheduling (up to 30 posts)",
        "AI-powered content suggestions",
        "Industry-specific keyword optimization",
      ],
    },
    {
      title: "Analytics & Insights",
      icon: BarChart,
      features: [
        "Advanced performance tracking",
        "Competitor analysis",
        "Audience growth metrics",
        "Engagement rate predictions",
        "Custom reporting",
        "Export capabilities",
      ],
    },
    {
      title: "Advanced Tools",
      icon: Wrench,
      features: [
        "100+ premium templates",
        "Custom template creation",
        "Save unlimited templates",
        "Team collaboration (3 members)",
        "Content calendar",
        "Post scheduling",
        "A/B testing tools",
      ],
    },
    {
      title: "Premium Support",
      icon: Headphones,
      features: [
        "Priority email support",
        "Monthly strategy newsletter",
        "Access to exclusive webinars",
        "Early access to new features",
        "Regular platform updates",
      ],
    },
    {
      title: "Special Bonuses",
      icon: Gift,
      features: [
        "Quarterly performance review",
        "Free profile audit",
        "Access to premium guides",
        "Priority for new feature testing",
      ],
    },
  ];

  const comingSoonFeatures = {
    general: [
      "CTA Generator",
      "Personal branding tools",
      "Achievement highlighter",
      "Professional bio generator",
    ],
    linkedin: [
      "Professional tone adjustment",
      "Industry-specific keywords",
      "Connection engagement metrics",
      "Company tag suggestions",
      "Article formatting",
    ],
    twitter: [
      "Thread creator",
      "Viral tweet structure",
      "Trending topics integration",
    ],
    instagram: [
      "Caption enhancement",
      "Hashtag grouping",
      "Visual content suggestions",
    ],
  };

  const userExperience = [
    { icon: Smartphone, text: "Mobile responsive design" },
    { icon: Sun, text: "Light mode" },
    { icon: Moon, text: "Dark mode" },
    { icon: MousePointer, text: "One-click enhancement" },
    { icon: Eye, text: "Real-time preview" },
    { icon: ArrowRightLeft, text: "Easy platform switching" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-montserrat font-extrabold text-center mb-16">
        Unlock the Full Power of{" "}
        <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
          PostPro AI
        </span>
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {featureSections.map((section) => (
          <Card key={section.title} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <section.icon className="w-6 h-6 text-electric-purple" />
              <h2 className="text-xl font-bold">{section.title}</h2>
            </div>
            <ul className="space-y-3">
              {section.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-electric-purple mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card className="p-8 mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Zap className="w-8 h-8 text-coral-red" />
          <h2 className="text-2xl font-bold">Coming Soon Features</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">General</h3>
            <ul className="space-y-3">
              {comingSoonFeatures.general.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Sparkles className="w-5 h-5 text-coral-red mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">LinkedIn</h3>
            <ul className="space-y-3">
              {comingSoonFeatures.linkedin.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Sparkles className="w-5 h-5 text-coral-red mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Twitter</h3>
            <ul className="space-y-3">
              {comingSoonFeatures.twitter.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Sparkles className="w-5 h-5 text-coral-red mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Instagram</h3>
            <ul className="space-y-3">
              {comingSoonFeatures.instagram.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Sparkles className="w-5 h-5 text-coral-red mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-8 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">User Experience</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {userExperience.map((item) => (
            <div key={item.text} className="flex flex-col items-center text-center">
              <item.icon className="w-8 h-8 text-electric-purple mb-2" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Features;