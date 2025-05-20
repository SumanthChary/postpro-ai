import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      text: "PostPro AI transformed my social media game. My engagement rates have doubled!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Digital Marketer",
      text: "The AI suggestions are spot-on. It's like having a professional editor by my side.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Entrepreneur",
      text: "Worth every penny! My posts now get the attention they deserve.",
      rating: 5,
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-light-lavender/50 to-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-montserrat font-extrabold text-center mb-12 bg-gradient-to-r from-electric-purple to-bright-teal bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <Quote className="w-8 h-8 text-electric-purple mb-4" />
              <p className="text-custom-text font-opensans mb-4">{testimonial.text}</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-bright-teal text-bright-teal" />
                ))}
              </div>
              <div>
                <p className="font-montserrat font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;