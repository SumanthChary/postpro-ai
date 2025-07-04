
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      text: "PostPro AI transformed my social media game. My engagement rates have doubled and my followers love the enhanced content quality!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Digital Marketer",
      text: "The AI suggestions are spot-on. It's like having a professional editor by my side, helping me craft compelling posts every time.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      role: "Entrepreneur",
      text: "Worth every penny! My posts now get the attention they deserve. The ROI on my social media marketing has increased significantly.",
      rating: 5,
      avatar: "ED"
    },
    {
      name: "Alex Rodriguez",
      role: "Social Media Manager",
      text: "PostProAI has streamlined my workflow incredibly. I can now create high-quality content for multiple clients in half the time.",
      rating: 5,
      avatar: "AR"
    },
    {
      name: "Lisa Thompson",
      role: "Small Business Owner",
      text: "As a busy entrepreneur, PostProAI saves me hours every week. The content quality is consistently professional and engaging.",
      rating: 5,
      avatar: "LT"
    },
    {
      name: "David Kim",
      role: "Freelance Writer",
      text: "The virality score feature is genius! It helps me understand what makes content engaging before I even post it.",
      rating: 5,
      avatar: "DK"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 lg:mb-8 tracking-tight px-2">
            What Our <span className="text-purple-600 italic">Users</span> Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto px-2 font-medium leading-relaxed">
            Join thousands of satisfied users who have transformed their social media presence
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 sm:p-8 lg:p-10 bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden rounded-2xl group">
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 text-purple-600" />
              </div>
              
              <div className="flex items-center gap-1 mb-4 sm:mb-5 lg:mb-6 xl:mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed mb-4 sm:mb-5 lg:mb-6 xl:mb-8 relative z-10 font-medium">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg shadow-lg bg-gradient-to-br from-purple-500 to-purple-600"
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg xl:text-xl">{testimonial.name}</p>
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base xl:text-lg font-medium">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
