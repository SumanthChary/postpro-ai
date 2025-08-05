import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote, Star, TrendingUp, Users, Zap } from "lucide-react";

const TestimonialsEnhanced = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow Inc",
      avatar: "/lovable-uploads/01519854-3b9c-4c6b-99bc-bbb2f1e7aa5a.png",
      text: "Our LinkedIn engagement increased by 340% in just 30 days. The AI suggestions are incredibly smart and save us 5+ hours weekly.",
      rating: 5,
      metric: "+340% engagement",
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      name: "Marcus Rodriguez",
      role: "Content Creator",
      company: "Verified Influencer",
      avatar: "/lovable-uploads/19a764a3-891b-42c4-a3b0-893290d0fff5.png",
      text: "From 2K to 50K followers in 6 months. This tool doesn't just enhance posts - it creates viral content that actually converts.",
      rating: 5,
      metric: "2K → 50K followers",
      icon: <Users className="w-4 h-4" />
    },
    {
      name: "Elena Vasquez",
      role: "Startup Founder",
      company: "GrowthHack Pro",
      avatar: "/lovable-uploads/76f00aba-ea4e-40ad-af9f-0bf66d3ee4d5.png",
      text: "The ROI is insane. We've generated $127K in revenue directly from AI-enhanced posts. Best investment we've made this year.",
      rating: 5,
      metric: "$127K revenue",
      icon: <Zap className="w-4 h-4" />
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Results from Real Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join 2,847+ creators who transformed their social media presence and achieved measurable business growth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50">
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-blue-500/20 absolute -top-2 -left-2" />
                <p className="text-gray-700 leading-relaxed pl-4">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Metric Badge */}
              <div className="mb-4">
                <Badge className="bg-green-100 text-green-800 border-green-200 font-semibold px-3 py-1">
                  <div className="flex items-center gap-2">
                    {testimonial.icon}
                    {testimonial.metric}
                  </div>
                </Badge>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-blue-100">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="text-center mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2,847+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">340%</div>
              <div className="text-sm text-gray-600">Avg. Engagement Boost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2.3M+</div>
              <div className="text-sm text-gray-600">Posts Enhanced</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">89%</div>
              <div className="text-sm text-gray-600">See Results Week 1</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsEnhanced;