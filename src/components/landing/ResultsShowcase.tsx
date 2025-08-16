import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon, TrendingUpIcon, UsersIcon } from "lucide-react";

const ResultsShowcase = () => {
  const results = [
    {
      name: "Sarah Chen",
      role: "Tech Founder",
      followers: "47K",
      avatar: "/lovable-uploads/e055f783-4b8b-47c8-a842-0449cddb238b.png",
      before: "23 likes, 2 comments",
      after: "2.3K likes, 189 comments, 67 shares",
      improvement: "10x engagement increase",
      quote: "PostPro AI doubled my engagement in two weeks!"
    },
    {
      name: "Mike Rodriguez",
      role: "Marketing Director", 
      followers: "23K",
      avatar: "/lovable-uploads/fda8da79-8fb0-49e8-b96d-a822f5f49818.png",
      before: "45 likes, 5 comments",
      after: "1.8K likes, 142 comments, 34 shares", 
      improvement: "4000% reach increase",
      quote: "My posts are now consistently hitting 10K+ views"
    },
    {
      name: "Jessica Park",
      role: "Content Creator",
      followers: "89K", 
      avatar: "/lovable-uploads/bccc4ccd-bed4-403a-a48f-fb618350c0e6.png",
      before: "78 likes, 12 comments",
      after: "5.2K likes, 301 comments, 89 shares",
      improvement: "Went viral 3 times",
      quote: "PostPro AI transformed my LinkedIn presence completely"
    }
  ];

  const stats = [
    { number: "2.3M+", label: "Posts Created" },
    { number: "89%", label: "Engagement Increase" },
    { number: "15K+", label: "Happy Creators" }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <StarIcon className="w-4 h-4 mr-2" />
            Real Results from Real Creators
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            See What Our Creators Achieve
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of creators who've transformed their social media presence
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {results.map((result, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src={result.avatar} 
                    alt={result.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{result.name}</h3>
                    <p className="text-sm text-muted-foreground">{result.role}</p>
                    <p className="text-xs text-accent font-medium">{result.followers} followers</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-destructive">BEFORE</span>
                    <span className="text-sm text-muted-foreground">{result.before}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-primary">AFTER</span>
                    <span className="text-sm text-primary font-medium">{result.after}</span>
                  </div>
                  <Badge variant="secondary" className="w-full justify-center">
                    <TrendingUpIcon className="w-4 h-4 mr-2" />
                    {result.improvement}
                  </Badge>
                </div>

                <blockquote className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4">
                  "{result.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-4">
            Create Your First Viral Post
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResultsShowcase;