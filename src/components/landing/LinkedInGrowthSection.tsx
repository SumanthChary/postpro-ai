import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LinkedinIcon, 
  TrendingUpIcon, 
  UsersIcon, 
  MessageCircleIcon,
  ShareIcon,
  HeartIcon 
} from "lucide-react";

const LinkedInGrowthSection = () => {
  const linkedinFeatures = [
    {
      icon: TrendingUpIcon,
      title: "Optimize for LinkedIn Algorithm",
      description: "Our AI understands LinkedIn's engagement patterns and creates posts that the algorithm loves to promote.",
      result: "3x more visibility in feeds"
    },
    {
      icon: UsersIcon,
      title: "Build Professional Network",
      description: "Craft thought leadership content that attracts industry leaders, potential clients, and collaborators.",
      result: "Grow high-quality connections"
    },
    {
      icon: MessageCircleIcon,
      title: "Drive Meaningful Conversations",
      description: "Generate discussion-worthy posts that encourage comments, shares, and meaningful professional dialogue.",
      result: "5x more meaningful interactions"
    }
  ];

  const linkedinStats = [
    { number: "847%", label: "Average Reach Increase" },
    { number: "23K+", label: "Professionals Using PostPro" },
    { number: "67%", label: "Report New Opportunities" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <LinkedinIcon className="w-4 h-4 mr-2" />
            LinkedIn Growth Specialist
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Grow on LinkedIn?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your LinkedIn presence from invisible to influential with AI-powered content that drives real business results
          </p>
        </div>

        {/* LinkedIn Focus Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {linkedinFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                  ✅ {feature.result}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* LinkedIn Success Stats */}
        <div className="bg-card/60 backdrop-blur-sm rounded-2xl border p-8 mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            LinkedIn Success Stories
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {linkedinStats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* LinkedIn Post Example */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="overflow-hidden border-2 border-primary/20">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <LinkedinIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Your Professional Brand</h4>
                    <p className="text-sm text-muted-foreground">Industry Leader • 1st</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-foreground leading-relaxed mb-4">
                  🚀 Just closed our biggest quarter yet, and I wanted to share the 3 key strategies that made the difference:
                  <br/><br/>
                  1️⃣ Customer feedback became our North Star
                  2️⃣ We prioritized speed over perfection  
                  3️⃣ Cross-functional collaboration increased 10x
                  <br/><br/>
                  The biggest lesson? Sometimes the best strategy is listening more and talking less.
                  <br/><br/>
                  What's been your game-changing insight this quarter? 👇
                  <br/><br/>
                  #Leadership #Growth #Strategy #QuarterlyReflection
                </p>
                <div className="flex items-center space-x-8 pt-4 border-t text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <HeartIcon className="w-4 h-4" />
                    <span>1,247 likes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircleIcon className="w-4 h-4" />
                    <span>89 comments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShareIcon className="w-4 h-4" />
                    <span>34 shares</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-card/60 backdrop-blur-sm rounded-2xl p-12 border">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Become a LinkedIn Thought Leader?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their LinkedIn presence and unlocked new career opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-4">
              Start Your LinkedIn Growth
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              See LinkedIn Examples
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkedInGrowthSection;