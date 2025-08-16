import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, SparklesIcon, TrendingUpIcon } from "lucide-react";

const SolutionDemo = () => {
  const [demoInput, setDemoInput] = useState("Had a productive meeting today");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleDemoTry = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 2000);
  };

  const demoResult = `🚀 3 Key Insights from Today's Game-Changing Strategy Meeting

Just wrapped up one of the most productive strategy sessions of the year. Here's what we discovered:

1️⃣ **Customer-First Approach Wins**: When we shifted our entire roadmap to prioritize user pain points over feature complexity, everything clicked. The data doesn't lie - customer satisfaction is the ultimate growth driver.

2️⃣ **Speed Beats Perfection**: We've been over-engineering solutions. The teams that ship fast and iterate based on real feedback are consistently outperforming our "perfect" releases.

3️⃣ **Cross-Team Collaboration is Our Secret Weapon**: Breaking down silos between product, engineering, and marketing has accelerated our timeline by 40%.

The biggest takeaway? Sometimes the most "productive" meeting is the one that challenges everything you thought you knew.

What's been your biggest insight from recent team collaborations? 👇

#Strategy #Leadership #TeamWork #Growth #Productivity`;

  return (
    <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-primary">
            <SparklesIcon className="w-4 h-4 mr-2" />
            AI-Powered Transformation
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            From Rough Idea to Viral Post in 60 Seconds
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Watch your simple thoughts transform into engagement-driving content
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Step 1 */}
            <Card className="bg-card/10 backdrop-blur-sm border-primary-foreground/20">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-xl mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4">Type Your Rough Idea</h3>
                </div>
                <div className="space-y-4">
                  <Input 
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    className="bg-background/20 border-primary-foreground/30 text-primary-foreground"
                    placeholder="Enter your post idea..."
                  />
                  <p className="text-sm text-primary-foreground/60 text-center">
                    Just a simple thought or experience
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Arrow */}
            <div className="flex justify-center lg:justify-between items-center">
              <ArrowRightIcon className="w-8 h-8 text-accent hidden lg:block" />
              <div className="lg:hidden text-center">
                <ArrowRightIcon className="w-8 h-8 text-accent rotate-90 mx-auto" />
              </div>
            </div>

            {/* Step 2 */}
            <Card className="bg-card/10 backdrop-blur-sm border-primary-foreground/20">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-xl mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4">AI Enhancement Process</h3>
                </div>
                <div className="space-y-4">
                  {isProcessing ? (
                    <div className="space-y-2">
                      <div className="h-2 bg-accent/30 rounded animate-pulse"></div>
                      <div className="h-2 bg-accent/30 rounded animate-pulse"></div>
                      <div className="h-2 bg-accent/30 rounded animate-pulse"></div>
                      <p className="text-sm text-accent font-medium text-center">Processing...</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                        <SparklesIcon className="w-4 h-4 text-accent" />
                        <span>Analyzing engagement patterns</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                        <SparklesIcon className="w-4 h-4 text-accent" />
                        <span>Optimizing for virality</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
                        <SparklesIcon className="w-4 h-4 text-accent" />
                        <span>Adding persuasive elements</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step 3 - Result */}
          {showResult && (
            <Card className="mt-12 bg-card/10 backdrop-blur-sm border-accent/50">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-xl mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">Professional Result</h3>
                  <Badge variant="secondary" className="text-accent">
                    <TrendingUpIcon className="w-4 h-4 mr-2" />
                    Predicted: 2.5K+ engagements
                  </Badge>
                </div>
                <div className="bg-background/20 rounded-lg p-6 text-sm text-primary-foreground/90 leading-relaxed max-h-64 overflow-y-auto">
                  {demoResult}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Interactive CTA */}
          <div className="text-center mt-12">
            {!showResult ? (
              <Button 
                size="lg" 
                onClick={handleDemoTry}
                disabled={isProcessing}
                className="bg-accent hover:bg-accent/90 text-lg px-8 py-4"
              >
                {isProcessing ? "Processing..." : "Try It Yourself"}
              </Button>
            ) : (
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-lg px-8 py-4">
                Create Your Account Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionDemo;