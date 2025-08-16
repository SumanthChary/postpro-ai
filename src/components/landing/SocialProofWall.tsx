import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, PlayIcon } from "lucide-react";

const SocialProofWall = () => {
  const testimonials = [
    {
      name: "Alex Rodriguez",
      role: "Tech Influencer",
      company: "TechCorp",
      followers: "47K",
      avatar: "/lovable-uploads/e055f783-4b8b-47c8-a842-0449cddb238b.png",
      quote: "PostPro AI didn't just improve my content - it transformed my entire LinkedIn strategy. My engagement rate went from 2% to 18% in just one month.",
      rating: 5,
      result: "900% engagement increase"
    },
    {
      name: "Maria Santos",
      role: "Marketing Director",
      company: "GrowthCo",
      followers: "23K", 
      avatar: "/lovable-uploads/fda8da79-8fb0-49e8-b96d-a822f5f49818.png",
      quote: "I was spending 3 hours every day on content creation. Now it takes me 30 minutes to create a week's worth of high-performing posts.",
      rating: 5,
      result: "5 hours saved daily"
    },
    {
      name: "David Chen",
      role: "Startup Founder", 
      company: "InnovateTech",
      followers: "89K",
      avatar: "/lovable-uploads/bccc4ccd-bed4-403a-a48f-fb618350c0e6.png",
      quote: "Three of my posts went viral in the first month using PostPro AI. The ROI on my social media efforts has been incredible.",
      rating: 5,
      result: "3 viral posts, 500K+ reach"
    },
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "Personal Brand",
      followers: "156K",
      avatar: "/lovable-uploads/e61dd1bc-bee6-4f84-9cb2-8425f25f6a25.png",
      quote: "My follower growth rate doubled after using PostPro AI. The quality and consistency of my content has never been better.",
      rating: 5,
      result: "2x follower growth rate"
    },
    {
      name: "Michael Brown",
      role: "Agency Owner",
      company: "DigitalFirst Agency", 
      followers: "34K",
      avatar: "/lovable-uploads/fdd496bb-ba93-4b3e-934f-c21a3a306935.png",
      quote: "We've scaled our content production for 50+ clients using PostPro AI. It's become an essential part of our service offering.",
      rating: 5,
      result: "50+ clients, 300% productivity"
    },
    {
      name: "Lisa Wang",
      role: "Business Coach",
      company: "Success Strategies",
      followers: "67K",
      avatar: "/lovable-uploads/ee9548c4-72d9-4354-adff-ef4509dfb8e3.png",
      quote: "The AI understands my brand voice perfectly. Every post feels authentic while being optimized for maximum engagement.",
      rating: 5,
      result: "Authentic brand voice + 400% reach"
    }
  ];

  const stats = [
    { number: "12,000+", label: "Active Creators" },
    { number: "2.3M+", label: "Posts Created" },
    { number: "89%", label: "See Engagement Increase" },
    { number: "4.9/5", label: "Average Rating" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <StarIcon className="w-4 h-4 mr-2 fill-current" />
            Trusted by Thousands
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join Thousands of Creators Already Winning
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See why content creators, marketers, and business owners choose PostPro AI to grow their social media presence
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-accent fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Result Badge */}
                <Badge variant="secondary" className="mb-4 w-full justify-center">
                  📈 {testimonial.result}
                </Badge>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-accent font-medium">{testimonial.followers} followers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Testimonial Placeholder */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-muted/50 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-accent/90 transition-colors">
                    <PlayIcon className="w-8 h-8 text-accent-foreground ml-1" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Watch Success Stories
                  </h3>
                  <p className="text-muted-foreground">
                    See how creators transformed their social media presence
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center bg-card rounded-2xl p-8 border">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">30-Day Money Back</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofWall;