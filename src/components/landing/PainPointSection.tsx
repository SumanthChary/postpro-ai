import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FrownIcon, BrainIcon, TrendingDownIcon } from "lucide-react";

const PainPointSection = () => {
  const painPoints = [
    {
      icon: FrownIcon,
      title: "Spending Hours Creating Posts That Get 3 Likes",
      description: "You put your heart into content creation, researching topics, crafting the perfect message... only to see it disappear into the void with minimal engagement.",
      emoji: "😫"
    },
    {
      icon: BrainIcon, 
      title: "Running Out of Content Ideas Constantly",
      description: "The dreaded blank page. You know you need to post consistently, but coming up with fresh, engaging ideas every day feels impossible.",
      emoji: "🤔"
    },
    {
      icon: TrendingDownIcon,
      title: "Watching Competitors Get All the Engagement", 
      description: "Your competitors with similar content are getting thousands of likes and comments while your posts barely move the needle. It's frustrating and demoralizing.",
      emoji: "📉"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Stop Posting Content That Gets Ignored
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            You're not alone. Here's what's killing your social media growth:
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {painPoints.map((point, index) => (
            <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-destructive/20">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-6xl mb-4">{point.emoji}</div>
                  <point.icon className="w-12 h-12 text-destructive mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 leading-tight">
                  {point.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Statement */}
        <div className="text-center bg-muted/50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            The Result? Your Brand Stays Invisible While Competitors Dominate
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every day you wait is another day your ideal customers are following someone else. 
            Your expertise deserves to be seen, heard, and valued.
          </p>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-4">
            Fix This Problem Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PainPointSection;