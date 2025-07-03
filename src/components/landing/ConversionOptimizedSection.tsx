
import React from 'react';
import { ArrowRight, CheckCircle, Clock, Shield, TrendingUp, Users } from 'lucide-react';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  stat: string;
}

const ConversionOptimizedSection = () => {
  const features: FeatureCard[] = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "AI-Powered Enhancement",
      description: "Advanced algorithms analyze 50+ engagement factors to optimize your content for maximum reach and conversion.",
      stat: "340% avg. engagement boost"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Instant Results",
      description: "Transform any post in under 3 seconds. No waiting, no complexity - just professional content that converts.",
      stat: "< 3 sec processing time"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Platform Ready",
      description: "Optimized for LinkedIn, Twitter, Instagram, and Facebook. One tool for all your social media needs.",
      stat: "4 platforms supported"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and data protection. Your content and ideas remain completely private and secure.",
      stat: "SOC 2 Type II certified"
    }
  ];

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,_rgba(59,130,246,0.5)_1px,_transparent_0)] bg-[size:20px_20px]" />
      </div>

      <div className="container-max relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <CheckCircle className="w-4 h-4" />
            Trusted by 15,000+ professionals
          </div>
          
          <h2 className="text-display text-5xl text-slate-900 mb-6">
            Why Leading Brands Choose
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2">
              PostProAI
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join industry leaders who've transformed their social media strategy and 
            generated over <strong>$2.3M in attributed revenue</strong> using our platform.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-professional group hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                  {feature.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-headline text-xl text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-body text-slate-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {feature.stat}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-l from-blue-500/10 to-transparent rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h3 className="text-display text-3xl mb-4">
              Ready to Transform Your Content?
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who've increased their engagement by 340% 
              and generated millions in revenue through better content.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary bg-white text-slate-900 hover:bg-slate-50 px-8 py-4 text-lg group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg">
                Book a Demo
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-8 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionOptimizedSection;
