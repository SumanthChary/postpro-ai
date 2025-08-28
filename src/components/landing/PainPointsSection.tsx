import { AlertCircle, ThumbsDown, TrendingDown, Clock, Target, Zap } from "lucide-react";

const PainPointsSection = () => {
  const painPoints = [
    {
      icon: ThumbsDown,
      problem: "Posts Getting Zero Engagement",
      description: "Hours spent crafting content, only to get 2-3 likes from your closest connections.",
      solution: "AI analyzes what works and transforms boring posts into engaging stories.",
      impact: "3-5x more likes, comments, and shares"
    },
    {
      icon: TrendingDown,
      problem: "LinkedIn Algorithm Working Against You", 
      description: "Great insights buried while generic motivational quotes go viral.",
      solution: "Optimized formatting, hooks, and timing based on viral post patterns.",
      impact: "Better visibility and reach"
    },
    {
      icon: Clock,
      problem: "Takes Forever to Write One Post",
      description: "Staring at blank screen for 30+ minutes, writing and rewriting the same post.",
      solution: "Generate multiple variations in seconds, choose the best one.",
      impact: "10x faster content creation"
    }
  ];

  const solutions = [
    {
      icon: Target,
      title: "Proven Templates",
      description: "Based on 1000+ viral LinkedIn posts"
    },
    {
      icon: Zap,
      title: "AI Enhancement",
      description: "Optimizes hooks, structure, and calls-to-action"
    },
    {
      icon: AlertCircle,
      title: "Engagement Prediction",
      description: "Scores your content before posting"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-red-50/30 to-orange-50/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Pain Points */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Stop Wasting Hours on Posts Nobody Reads
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We've analyzed why 90% of LinkedIn posts fail and built AI to fix every common mistake.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {painPoints.map((point, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <point.icon className="w-6 h-6 text-red-600" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {point.problem}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {point.description}
              </p>
              
              <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-3 rounded-r-lg">
                <div className="font-semibold text-green-800 text-sm mb-1">Our Solution:</div>
                <div className="text-green-700 text-sm mb-2">{point.solution}</div>
                <div className="text-green-600 text-sm font-medium">{point.impact}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Solutions Preview */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              How We Solve This
            </h3>
            <p className="text-gray-600">
              Backed by data from analyzing thousands of viral LinkedIn posts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{solution.title}</h4>
                <p className="text-gray-600 text-sm">{solution.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-6 py-4 inline-block">
              <div className="font-bold text-lg">Join 47+ creators already seeing results</div>
              <div className="text-blue-100 text-sm">Average improvement: 300% more engagement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;