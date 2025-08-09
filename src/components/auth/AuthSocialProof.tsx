import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Star, Users, Award, TrendingUp, ChevronRight } from 'lucide-react';

export const AuthSocialProof = () => {
  const stats = [
    { label: 'Active Users', value: '10K+' },
    { label: 'Posts Enhanced', value: '1M+' },
    { label: 'Avg. Engagement Boost', value: '147%' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Social Media Manager',
      company: 'TechCorp',
      avatar: '/testimonials/sarah.jpg',
      quote: 'PostPro AI has transformed how we create content. Our engagement rates have doubled!'
    },
    {
      name: 'David Chen',
      role: 'Content Creator',
      company: 'Influencer',
      avatar: '/testimonials/david.jpg',
      quote: 'The AI enhancements are incredible. It\'s like having a professional copywriter on demand.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 text-center bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-gray-600 mt-2">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Enterprise-Grade Security</h3>
            <p className="text-gray-600">Your data is protected with bank-level encryption</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Star className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">AI-Powered Excellence</h3>
            <p className="text-gray-600">Advanced algorithms for perfect content every time</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-center">Trusted by Content Creators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-gray-200/50 shadow-lg">
              <div className="flex items-start space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div className="mt-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role} • {testimonial.company}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex justify-center space-x-8">
        <img src="/badges/gdpr.svg" alt="GDPR Compliant" className="h-12 opacity-75" />
        <img src="/badges/ssl.svg" alt="SSL Secure" className="h-12 opacity-75" />
        <img src="/badges/iso.svg" alt="ISO Certified" className="h-12 opacity-75" />
      </div>
    </div>
  );
};
