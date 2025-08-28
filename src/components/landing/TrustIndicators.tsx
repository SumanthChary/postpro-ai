import React from 'react';
import { Shield, Users, Award, Clock } from 'lucide-react';

const TrustIndicators = () => {
  const indicators = [
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      label: "500+ Active Users",
      description: "Growing community of professionals"
    },
    {
      icon: <Award className="w-5 h-5 text-green-600" />,
      label: "50K+ Posts Enhanced",
      description: "Proven track record"
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-600" />,
      label: "Enterprise Security",
      description: "Your data is safe with us"
    },
    {
      icon: <Clock className="w-5 h-5 text-orange-600" />,
      label: "24/7 Support",
      description: "We're here when you need us"
    }
  ];

  return (
    <section className="py-6 sm:py-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {indicators.map((indicator, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {indicator.icon}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                {indicator.label}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;