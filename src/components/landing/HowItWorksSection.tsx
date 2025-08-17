import React from 'react';

const HowItWorksSection = () => {
  const steps = [{
    step: "1",
    title: "Paste Your Content",
    description: "Simply paste your social media post or idea into our platform",
    icon: "/lovable-uploads/32bedd15-f159-47ba-85c4-fe92cec4cd1b.png"
  }, {
    step: "2",
    title: "AI Enhancement",
    description: "Our advanced AI analyzes and enhances your content for maximum engagement",
    icon: "/lovable-uploads/93cc4b2a-0055-4c6f-bba3-3f8c3cc8ccdf.png"
  }, {
    step: "3",
    title: "Share & Grow",
    description: "Get optimized posts ready to share across all your social platforms",
    icon: "/lovable-uploads/e943d2f0-cf46-4b77-a36c-ac93f5b5bd87.png"
  }];
  return <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works 🚀?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your social media presence in three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, index) => <div key={index} className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 flex items-center justify-center">
                <img 
                  src={item.icon} 
                  alt={`Step ${item.step}: ${item.title}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;