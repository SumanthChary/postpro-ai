import React from 'react';

const HowItWorksSection = () => {
  const steps = [{
    step: "1",
    title: "Input Your Content",
    description: "Enter your original LinkedIn post or content idea into our professional platform",
    icon: "/lovable-uploads/step1-input-content.png"
  }, {
    step: "2", 
    title: "AI Enhancement Engine",
    description: "Our advanced AI analyzes and transforms your content using proven engagement strategies",
    icon: "/lovable-uploads/step2-ai-enhancement.png"
  }, {
    step: "3",
    title: "Optimized Post Preview", 
    description: "Review your enhanced content with before-and-after comparison to see the improvements",
    icon: "/lovable-uploads/step3-preview-comparison.png"
  }, {
    step: "4",
    title: "Engagement Results",
    description: "Share your optimized post and watch your engagement metrics soar with measurable results",
    icon: "/lovable-uploads/step4-engagement-results.png"
  }];
  return <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your LinkedIn presence with our professional 4-step enhancement process
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="text-center group">
              <div className="w-full aspect-video mx-auto mb-6 bg-white rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group-hover:border-indigo-500 group-hover:border-2">
                <img 
                  src={item.icon} 
                  alt={`Step ${item.step}: ${item.title}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="space-y-3">
                <div className="inline-flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full font-semibold text-sm mb-2">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;