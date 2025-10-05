import { XCircle, Clock, TrendingDown } from "lucide-react";

const ProblemStatement = () => {
  const problems = [
    {
      icon: Clock,
      title: "Hours Wasted on Content",
      description: "Spending 30-60 minutes crafting each LinkedIn post, only to get minimal engagement"
    },
    {
      icon: TrendingDown,
      title: "Low Engagement Rates",
      description: "Your expertise deserves attention, but generic posts get lost in the feed"
    },
    {
      icon: XCircle,
      title: "Inconsistent Posting",
      description: "Busy schedule means irregular posts, hurting your LinkedIn visibility and growth"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            The LinkedIn Content Struggle is Real
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You know you should post consistently on LinkedIn, but...
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
                <problem.icon className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
