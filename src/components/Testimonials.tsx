import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director at TechFlow",
      text: "PostPro AI helped me increase my LinkedIn engagement by 340% in 30 days. I went from 12 average likes to 400+ per post. The AI suggestions are incredibly specific and actionable.",
      rating: 5,
      avatar: "SC",
      linkedinHandle: "sarahchen-marketing",
      beforeAfter: "12 → 400+ average likes"
    },
    {
      name: "Michael Rodriguez",
      role: "Sales Manager at StartupX",  
      text: "Finally landed my dream job at Google after building authority with PostPro AI. The interview team mentioned they'd been following my LinkedIn content. This tool literally changed my career.",
      rating: 5,
      avatar: "MR",
      linkedinHandle: "michael-sales-pro",
      beforeAfter: "Career breakthrough in 60 days"
    },
    {
      name: "Dr. Emily Watson",
      role: "Healthcare Innovation Consultant",
      text: "Went from invisible to industry thought leader. Now getting invited to speak at conferences and my consultancy revenue tripled. The content frameworks PostPro provides are game-changing.",
      rating: 5,
      avatar: "EW", 
      linkedinHandle: "dr-emily-watson",
      beforeAfter: "3x revenue increase"
    }
  ];
  return <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Real Results From Real People</h2>
          <p className="text-xl text-navy/70 max-w-3xl mx-auto">
            Join 2,400+ professionals who transformed their LinkedIn presence and career trajectory
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 bg-white border border-navy/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-navy/70 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center text-blue font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-navy">{testimonial.name}</p>
                  <p className="text-navy/60 text-sm">{testimonial.role}</p>
                  <p className="text-navy/50 text-xs">@{testimonial.linkedinHandle}</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue/5 rounded-lg">
                <p className="text-blue font-semibold text-sm">
                  🚀 {testimonial.beforeAfter}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>;
};
export default Testimonials;