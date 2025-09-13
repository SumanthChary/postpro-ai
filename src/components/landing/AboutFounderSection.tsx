import React from 'react';
import { Quote, Users, Zap } from 'lucide-react';

const AboutFounderSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet the Founder
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Building solutions from real challenges, helping creators worldwide enhance their content
          </p>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img 
                src="/lovable-uploads/e055f783-4b8b-47c8-a842-0449cddb238b.png" 
                alt="Founder" 
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-blue-100 shadow-lg" 
              />
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="mb-6">
                <Quote className="w-8 h-8 text-blue-500 mx-auto sm:mx-0 mb-4" />
                <blockquote className="text-lg sm:text-xl text-gray-700 leading-relaxed italic">
                  "I built PostPro AI to solve my own LinkedIn engagement challenges. What started as a personal need became a mission to help creators worldwide grow their professional presence with AI-powered content enhancement."
                </blockquote>
              </div>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span>5+ SaaS Products Built</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Content Creator & Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutFounderSection;