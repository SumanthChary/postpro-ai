
import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      step: "1",
      title: "Paste Your Content",
      description: "Simply paste your social media post or idea into our platform"
    },
    {
      step: "2", 
      title: "AI Enhancement",
      description: "Our advanced AI analyzes and enhances your content for maximum engagement"
    },
    {
      step: "3",
      title: "Share & Grow",
      description: "Get optimized posts ready to share across all your social platforms"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your social media presence in three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
