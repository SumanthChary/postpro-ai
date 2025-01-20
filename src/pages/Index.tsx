import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LinkedinIcon, TwitterIcon, ImageIcon, UserIcon } from "lucide-react";
import PricingSection from "@/components/PricingSection";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-linkedin">ProfilePerfect AI</div>
          <div className="space-x-4">
            <Link to="/enhance">
              <Button variant="ghost">Enhance Post</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline">Pricing</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-linkedin to-twitter bg-clip-text text-transparent">
          Perfect Your Social Media Presence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Enhance your LinkedIn & Twitter posts with AI-powered suggestions. Create engaging content that resonates with your audience.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/enhance">
            <Button size="lg" className="bg-linkedin hover:bg-linkedin/90">
              Try Free Enhancement
            </Button>
          </Link>
          <Link to="/pricing">
            <Button size="lg" variant="outline">
              View Plans
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Supported Platforms</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <LinkedinIcon className="w-12 h-12 text-linkedin mb-4" />
            <h3 className="text-xl font-semibold mb-2">LinkedIn Optimization</h3>
            <p className="text-gray-600">
              Perfect your professional presence with AI-enhanced LinkedIn posts
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <TwitterIcon className="w-12 h-12 text-twitter mb-4" />
            <h3 className="text-xl font-semibold mb-2">Twitter Enhancement</h3>
            <p className="text-gray-600">
              Craft engaging tweets that capture attention and drive engagement
            </p>
          </Card>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Coming Soon</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow animate-float">
              <UserIcon className="w-12 h-12 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Profile Enhancer</h3>
              <p className="text-gray-600">
                Automatically optimize your social media profiles for maximum impact
              </p>
              <Button variant="ghost" className="mt-4" disabled>
                Coming Soon
              </Button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow animate-float">
              <ImageIcon className="w-12 h-12 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Image Generator</h3>
              <p className="text-gray-600">
                Create stunning visuals for your social media posts
              </p>
              <Button variant="ghost" className="mt-4" disabled>
                Coming Soon
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />
    </div>
  );
};

export default Index;