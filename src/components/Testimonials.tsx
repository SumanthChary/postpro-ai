
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
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 lg:mb-8 tracking-tight px-2">
            What Our Users Say
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto px-4 font-medium leading-relaxed">
            Join thousands of satisfied users who have transformed their social media presence
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 lg:p-10 bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden rounded-2xl">
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-16 lg:w-20 h-16 lg:h-20" style={{ color: 'rgba(57,107,255,1)' }} />
              </div>
              
              <div className="flex items-center gap-1 mb-6 lg:mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 lg:w-6 h-5 lg:h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-6 lg:mb-8 relative z-10 font-medium">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 lg:w-14 h-12 lg:h-14 rounded-full flex items-center justify-center text-white font-bold text-base lg:text-lg shadow-lg"
                  style={{ backgroundColor: 'rgba(57,107,255,1)' }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg lg:text-xl">{testimonial.name}</p>
                  <p className="text-gray-600 text-base lg:text-lg font-medium">{testimonial.role}</p>
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
