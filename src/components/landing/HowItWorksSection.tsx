import React from 'react';

const HowItWorksSection = () => {
  const steps = [{
    step: "1",
    title: "📝 Paste Your Post",
    description: "Simply paste your LinkedIn post or content idea. No complex setup - just paste and go!",
    icon: "/lovable-uploads/6b601f7d-a896-4f03-af5c-a86655b878d7.png"
  }, {
    step: "2", 
    title: "🚀 AI Optimizes Everything",
    description: "Our AI instantly enhances your content with perfect hashtags, tone optimization, CTAs, and engagement scoring",
    icon: "/lovable-uploads/52581685-79a3-491e-a790-5cd5c5d29c78.png"
  }, {
    step: "3",
    title: "📈 Copy & Post for Results",
    description: "Copy your optimized post and watch your engagement soar with measurable results and growth",
    icon: "/lovable-uploads/10cb38eb-fa56-4c45-96e8-dcc0b98d9cd3.png"
  }];
  return <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your LinkedIn presence with our simple 3-step AI enhancement process
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
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