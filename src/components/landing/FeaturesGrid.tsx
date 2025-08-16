import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ZapIcon, 
  SmartphoneIcon, 
  TargetIcon, 
  BarChartIcon, 
  UsersIcon, 
  CalendarIcon 
} from "lucide-react";

const FeaturesGrid = () => {
  const features = [
    {
      icon: ZapIcon,
      title: "60-Second Post Generation",
      description: "Transform any rough idea into a professional, engaging post instantly. No more staring at blank screens or struggling with writer's block.",
      outcome: "Save 5+ hours weekly on content creation"
    },
    {
      icon: SmartphoneIcon,
      title: "Multi-Platform Publishing", 
      description: "Optimize your content for LinkedIn, Instagram, Twitter, and Facebook simultaneously. Each platform gets perfectly formatted content.",
      outcome: "Reach 4x more audience with one post"
    },
    {
      icon: TargetIcon,
      title: "Engagement Optimization",
      description: "AI analyzes millions of high-performing posts to predict and optimize your content for maximum engagement before you publish.",
      outcome: "Increase engagement by 89% on average"
    },
    {
      icon: BarChartIcon,
      title: "Performance Analytics",
      description: "Track what works, identify your best-performing content types, and get actionable insights to improve your social media strategy.",
      outcome: "Make data-driven decisions that boost ROI"
    },
    {
      icon: UsersIcon,
      title: "Team Collaboration",
      description: "Perfect for agencies and marketing teams. Share brand voices, collaborate on content, and maintain consistency across all accounts.",
      outcome: "Scale content creation across entire teams"
    },
    {
      icon: CalendarIcon,
      title: "Smart Scheduling",
      description: "Automatically post at optimal times for each platform. Our AI learns when your audience is most active and engaged.",
      outcome: "Boost visibility by posting at peak times"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Dominate Social Media
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to transform your social media presence and drive real business results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="bg-accent/10 rounded-lg p-3 border-l-4 border-accent">
                  <p className="text-sm font-medium text-accent">
                    ✅ {feature.outcome}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-muted/30 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Transform Your Content Strategy?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already saving time and increasing engagement with PostPro AI
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-4">
            Start Creating Amazing Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;