import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from 'lucide-react';

const MobileTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechCorp",
      avatar: "SC",
      content: "PostPro AI transformed my LinkedIn engagement by 340%. My posts now consistently get 2K+ likes.",
      rating: 5
    },
    {
      name: "Marcus Rivera",
      role: "Business Coach",
      company: "Growth Partners",
      avatar: "MR", 
      content: "From 50 to 800 followers in 3 months. The AI suggestions are spot-on and save me hours weekly.",
      rating: 5
    },
    {
      name: "Amanda Foster",
      role: "Sales Manager",
      company: "SaaS Solutions",
      avatar: "AF",
      content: "My lead generation increased 250% after using PostPro AI consistently. Worth every penny.",
      rating: 5
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-br from-blue-50/30 to-purple-50/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Real results from professionals who transformed their LinkedIn presence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-4 sm:p-5 bg-white/90 shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 mr-3">
                  <AvatarImage src="" alt={testimonial.name} />
                  <AvatarFallback className="bg-blue-600 text-white font-semibold">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                "{testimonial.content}"
              </p>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-green-600">4.9/5</span> average rating from 500+ users
          </p>
        </div>
      </div>
    </section>
  );
};

export default MobileTestimonials;