
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      avatar: "SJ",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      text: "PostPro AI transformed my social media presence. My engagement rates have more than doubled since I started using it for my daily LinkedIn posts.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Digital Marketer",
      avatar: "MC",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      text: "The AI suggestions are spot-on and save me hours of editing time. It's like having a professional editor by my side 24/7.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Entrepreneur",
      avatar: "ED",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      text: "Worth every penny! I've seen a 300% increase in profile visits and connection requests since using PostPro AI for my content.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="px-4 py-2 bg-bright-teal/10 rounded-full text-sm font-medium text-bright-teal inline-block mb-3">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-center mb-10 max-w-2xl mx-auto text-custom-text">
            Join thousands of professionals who've transformed their social media presence
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
              <div className="flex gap-1 mb-6 text-bright-teal">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-bright-teal text-bright-teal" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-electric-purple/20 mb-4" />
              <p className="text-custom-text mb-6">{testimonial.text}</p>
              
              <div className="flex items-center gap-3 mt-6">
                <Avatar className="h-12 w-12 border-2 border-light-lavender">
                  <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                  <AvatarFallback className="bg-electric-purple text-white">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
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
