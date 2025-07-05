
import React from 'react';

const AboutFounderSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About the Founder</h2>
        </div>
        
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">John Doe</h3>
              <p className="text-blue-600 font-medium mb-4">Founder & CEO</p>
              
              <div className="space-y-3 text-gray-600">
                <p>
                  After years of struggling with social media growth and seeing countless creators 
                  face the same challenges, I decided to build PostPro AI.
                </p>
                <p>
                  My journey started when I got suspended multiple times on various platforms, 
                  just like many others. Through trial and error, I learned what works.
                </p>
                <p>
                  Today, I've built an audience of thousands across platforms by understanding 
                  what each platform wants. PostPro AI is my way of helping others achieve 
                  the same success without the painful learning curve.
                </p>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">LinkedIn Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900">5K+</div>
                  <div className="text-sm text-gray-600">Twitter Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900">50M+</div>
                  <div className="text-sm text-gray-600">Content Views</div>
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
