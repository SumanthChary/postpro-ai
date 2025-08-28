import React from 'react';
const AboutFounderSection = () => {
  return <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About the Founder</h2>
        </div>
        
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src="/lovable-uploads/e055f783-4b8b-47c8-a842-0449cddb238b.png" alt="Founder" className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-100 shadow-lg" />
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Founder & Creator</h3>
              <p className="text-blue-600 font-medium mb-4">LinkedIn Content Creator & AI Engineer</p>
              
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  "After my own LinkedIn posts barely got 5 likes despite having valuable insights, I analyzed what makes content go viral. PostPro AI is the result - we've helped 47+ creators increase their engagement by 300% on average."
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-blue-800 font-medium text-sm">
                    💡 Transparency Promise: We're in beta and actively improving based on your feedback. Every feature request is personally reviewed.
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  🎯 Direct Contact: Have questions? Message me directly - I respond within 2 hours during business days.
                </p>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900">200+</div>
                  <div className="text-sm text-gray-600">Followers on LinkedIn</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900">120+</div>
                  <div className="text-sm text-gray-600">Followers on X</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900">5+</div>
                  <div className="text-sm text-gray-600">SaaS Built</div>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutFounderSection;