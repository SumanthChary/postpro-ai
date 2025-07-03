
import { useState } from "react";
import { ArrowRight, CheckCircle, Star, Users, Zap } from "lucide-react";
import PostEnhancer from "@/components/post-enhancer/PostEnhancer";

interface TrustSignal {
  icon: React.ReactNode;
  text: string;
  highlight: string;
}

const ProfessionalHeroSection = () => {
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("business");
  const [styleTone, setStyleTone] = useState("professional");

  const trustSignals: TrustSignal[] = [
    {
      icon: <Users className="w-4 h-4" />,
      text: "Trusted by",
      highlight: "15,000+ professionals"
    },
    {
      icon: <Star className="w-4 h-4" />,
      text: "Rated",
      highlight: "4.9/5 stars"
    },
    {
      icon: <Zap className="w-4 h-4" />,
      text: "Enhanced",
      highlight: "500K+ posts"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 pt-32 pb-12">
        <div className="container-max">
          {/* Trust signals bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12 opacity-0 animate-fade-in-up">
            {trustSignals.map((signal, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="text-blue-500">{signal.icon}</div>
                <span>{signal.text}</span>
                <span className="font-semibold text-slate-800">{signal.highlight}</span>
              </div>
            ))}
          </div>

          {/* Main headline */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-display text-6xl text-slate-900 mb-6 opacity-0 animate-fade-in-up stagger-1">
              Transform Your Social Media
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
                Into Revenue-Driving Content
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-in-up stagger-2">
              AI-powered content enhancement that converts followers into customers. 
              Used by leading brands to increase engagement by <strong>340%</strong> and 
              drive <strong>$2.3M+</strong> in attributed revenue.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up stagger-3">
              <button className="btn-primary group px-8 py-4 text-lg">
                Start Creating Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary px-8 py-4 text-lg">
                Watch Demo (2 min)
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-2 mt-8 opacity-0 animate-fade-in-up stagger-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white" />
                ))}
              </div>
              <div className="ml-3 text-sm text-slate-600">
                <span className="font-semibold">1,247</span> professionals enhanced their content this week
              </div>
            </div>
          </div>

          {/* Interactive demo */}
          <div className="max-w-5xl mx-auto opacity-0 animate-fade-in-up stagger-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-200/50 relative">
              {/* Premium badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Live AI Enhancement
                </div>
              </div>

              <div className="relative z-10">
                <PostEnhancer 
                  post={post} 
                  setPost={setPost} 
                  category={category} 
                  setCategory={setCategory} 
                  styleTone={styleTone} 
                  setStyleTone={setStyleTone} 
                />
              </div>
            </div>
          </div>

          {/* Results preview */}
          <div className="mt-16 text-center opacity-0 animate-fade-in-up stagger-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="card-professional text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">340%</div>
                <div className="text-sm text-slate-600">Engagement Increase</div>
              </div>
              <div className="card-professional text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">2.3M+</div>
                <div className="text-sm text-slate-600">Revenue Attributed</div>
              </div>
              <div className="card-professional text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
                <div className="text-sm text-slate-600">Time Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalHeroSection;
