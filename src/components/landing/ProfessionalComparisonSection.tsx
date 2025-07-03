
import React from 'react';
import { CheckCircle, X, ArrowRight } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  before: string | boolean;
  after: string | boolean;
  highlight?: boolean;
}

const ProfessionalComparisonSection = () => {
  const comparisons: ComparisonRow[] = [
    {
      feature: "Content Quality",
      before: "Generic, template-like posts",
      after: "Professional, engaging content",
      highlight: true
    },
    {
      feature: "Engagement Rate",
      before: "2-3% average engagement",
      after: "8-12% consistent engagement"
    },
    {
      feature: "Time Investment",
      before: "2-3 hours per post",
      after: "< 30 seconds per post",
      highlight: true
    },
    {
      feature: "Platform Optimization",
      before: false,
      after: true
    },
    {
      feature: "Hashtag Strategy",
      before: "Random or no hashtags",
      after: "AI-optimized hashtag research"
    },
    {
      feature: "A/B Testing",
      before: false,
      after: true,
      highlight: true
    },
    {
      feature: "Performance Analytics",
      before: "Basic platform metrics",
      after: "Advanced conversion tracking"
    },
    {
      feature: "ROI Tracking",
      before: false,
      after: true
    }
  ];

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="w-5 h-5 text-green-500" />
      ) : (
        <X className="w-5 h-5 text-red-500" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <ArrowRight className="w-4 h-4" />
            Transformation Guaranteed
          </div>
          
          <h2 className="text-display text-5xl text-slate-900 mb-6">
            Before vs After
            <span className="block text-blue-600 mt-2">
              PostProAI
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            See the dramatic transformation that happens when you switch from manual content creation 
            to our AI-powered platform. Real results from real businesses.
          </p>
        </div>

        {/* Comparison table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-slate-900 text-white">
              <div className="p-6">
                <h3 className="text-lg font-semibold">Feature</h3>
              </div>
              <div className="p-6 border-l border-slate-700">
                <h3 className="text-lg font-semibold text-red-300">Without PostProAI</h3>
                <p className="text-sm text-slate-300 mt-1">Manual approach</p>
              </div>
              <div className="p-6 border-l border-slate-700">
                <h3 className="text-lg font-semibold text-green-300">With PostProAI</h3>
                <p className="text-sm text-slate-300 mt-1">AI-powered results</p>
              </div>
            </div>

            {/* Table rows */}
            {comparisons.map((row, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 border-b border-slate-100 ${
                  row.highlight ? 'bg-blue-50' : 'bg-white'
                } hover:bg-slate-50 transition-colors`}
              >
                <div className="p-6">
                  <div className="font-semibold text-slate-900">{row.feature}</div>
                  {row.highlight && (
                    <div className="inline-flex items-center gap-1 mt-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Key differentiator
                    </div>
                  )}
                </div>
                
                <div className="p-6 border-l border-slate-100 flex items-center">
                  <div className="flex items-center gap-3">
                    {typeof row.before === 'string' && (
                      <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                    )}
                    {renderValue(row.before)}
                  </div>
                </div>
                
                <div className="p-6 border-l border-slate-100 flex items-center">
                  <div className="flex items-center gap-3">
                    {typeof row.after === 'string' && (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    )}
                    {renderValue(row.after)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Transform Your Content Strategy?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join 15,000+ professionals who've already made the switch and are seeing 
                3-5x better engagement rates and measurable ROI.
              </p>
              
              <button className="btn-primary bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 text-lg group">
                Start Your Transformation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center justify-center gap-6 mt-6 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  14-day free trial
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  No setup fees
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalComparisonSection;
