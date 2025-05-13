
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      text: "PostPro AI transformed my social media game. My engagement rates have doubled since I started using it for my daily posts!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah"
    },
    {
      name: "Michael Chen",
      role: "Digital Marketer",
      text: "The AI suggestions are spot-on. It's like having a professional editor by my side. My content performs 3x better now.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Michael"
    },
    {
      name: "Emma Davis",
      role: "Entrepreneur",
      text: "Worth every penny! I was skeptical at first, but my posts now get the attention they deserve. This is my creator cheat code.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/adventurer/svg?seed=Emma"
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-light-lavender/50 to-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <p className="text-center mb-12 max-w-xl mx-auto">
          Join thousands of creators who have already transformed their social media presence
        </p>
        
        {/* Trust Indicator */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-medium">4.9/5</span>
            <span className="text-gray-600 text-xs">based on 233 verified reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <Quote className="w-8 h-8 text-electric-purple mb-4 opacity-50" />
              <p className="text-custom-text mb-6">{testimonial.text}</p>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-bright-teal text-bright-teal" />
                ))}
              </div>
              
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
