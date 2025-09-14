import { Shield, X, Check, AlertTriangle } from "lucide-react";

const ExpectationsSection = () => {
  const promises = [
    {
      icon: Check,
      title: "AI-Enhanced Content Quality",
      description: "Professional tone, improved readability, and strategic hashtag placement"
    },
    {
      icon: Check,
      title: "Instant Results",
      description: "Get enhanced posts within seconds, not hours of manual editing"
    },
    {
      icon: Check,
      title: "Data-Driven Optimization",
      description: "Content optimized using proven engagement patterns and best practices"
    },
    {
      icon: Check,
      title: "Multiple Platform Formats",
      description: "Tailored content for LinkedIn, Twitter, and other professional platforms"
    }
  ];

  const limitations = [
    {
      icon: X,
      title: "No Guaranteed Viral Success",
      description: "We enhance content quality, but virality depends on timing, audience, and market factors"
    },
    {
      icon: AlertTriangle,
      title: "Consistency Required",
      description: "Growth comes from regular posting. We don't guarantee results without consistent effort"
    },
    {
      icon: X,
      title: "No Magic Solutions",
      description: "Our AI improves your content, but building an audience takes time and strategy"
    },
    {
      icon: AlertTriangle,
      title: "Platform Algorithm Changes",
      description: "Social media algorithms evolve constantly. We adapt, but can't control platform changes"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mr-3" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Setting Clear Expectations
            </h2>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transparency builds trust. Here's exactly what we deliver and what we don't promise.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* What We Promise */}
          <div className="bg-green-50 rounded-2xl p-6 sm:p-8 border border-green-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-green-900">
                What We Deliver
              </h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {promises.map((promise, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-green-900 mb-1">
                      {promise.title}
                    </h4>
                    <p className="text-sm sm:text-base text-green-700 leading-relaxed">
                      {promise.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What We Don't Promise */}
          <div className="bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-900">
                What We Don't Promise
              </h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {limitations.map((limitation, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mt-1">
                    <limitation.icon className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-amber-900 mb-1">
                      {limitation.title}
                    </h4>
                    <p className="text-sm sm:text-base text-amber-700 leading-relaxed">
                      {limitation.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 border border-blue-100 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
              Ready for Honest, Quality Enhancement?
            </h3>
            <p className="text-base sm:text-lg text-blue-700 mb-6 leading-relaxed">
              We're committed to improving your content quality and helping you communicate more effectively. 
              Success comes from combining our AI enhancement with your consistency and strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-sm sm:text-base text-blue-600">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-medium">No overpromises, just results</span>
              </div>
              <div className="flex items-center text-sm sm:text-base text-blue-600">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Transparent pricing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpectationsSection;