
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
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6 px-2">
            What Our Users Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Join thousands of satisfied users who have transformed their social media presence
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 sm:p-8 bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 sm:w-16 h-12 sm:h-16 text-blue-600" />
              </div>
              
              <div className="flex items-center gap-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-base sm:text-lg">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm sm:text-base">{testimonial.role}</p>
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
