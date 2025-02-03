import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RocketIcon, SparklesIcon, StarIcon, ShieldIcon, GlobeIcon } from "lucide-react";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-montserrat font-extrabold mb-6">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
                Social Media Presence
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Enhance your LinkedIn, Twitter & Instagram posts with AI magic. Create content that
              captivates and converts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-electric-purple to-bright-teal text-white"
                onClick={() => navigate("/auth")}
              >
                Get Started Free
                <RocketIcon className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/features")}
              >
                See Features
                <SparklesIcon className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose PostPro AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <StarIcon className="w-12 h-12 text-electric-purple mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Enhancement</h3>
              <p className="text-gray-600">
                Smart suggestions and optimizations for maximum engagement
              </p>
            </div>
            <div className="text-center p-6">
              <ShieldIcon className="w-12 h-12 text-bright-teal mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
              <p className="text-gray-600">
                Access curated templates for various content types
              </p>
            </div>
            <div className="text-center p-6">
              <GlobeIcon className="w-12 h-12 text-coral-red mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-Platform Support</h3>
              <p className="text-gray-600">
                Optimize for LinkedIn, Twitter, and Instagram
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Perfect Plan
          </h2>
          <PricingSection />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <Testimonials />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;