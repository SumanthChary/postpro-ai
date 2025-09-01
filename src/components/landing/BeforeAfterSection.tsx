import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, MessageCircle, Repeat2 } from "lucide-react";

const BeforeAfterSection = () => {
  const examples = [
    {
      before: {
        title: "❌ Before: Generic Post",
        content: "Just finished a great project at work. Learned a lot and excited for what's next!",
        stats: { likes: 5, comments: 1, shares: 0 }
      },
      after: {
        title: "✅ After: Authority-Building Post", 
        content: "3 critical mistakes I made leading my first $2M project (and how I'd do it differently):\n\n→ Mistake #1: Assuming stakeholders understood the vision\n→ Mistake #2: Not building feedback loops early\n→ Mistake #3: Underestimating change management\n\nThe result? 6-month delays and team burnout.\n\nWhat I learned: Leadership isn't about having all the answers—it's about asking better questions and creating systems that surface problems early.\n\nP.S. These 3 frameworks now guide every project I lead. What's your biggest project management lesson?",
        stats: { likes: 847, comments: 93, shares: 156 }
      }
    }
  ];

  return (
    <section className="py-16 bg-navy/5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Transform Your Content From Invisible to Viral
          </h2>
          <p className="text-xl text-navy/70 max-w-3xl mx-auto">
            See how PostPro AI turns generic posts into authority-building content that gets real engagement
          </p>
        </div>

        {examples.map((example, index) => (
          <div key={index} className="mb-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Before */}
              <Card className="p-6 border border-red-200 bg-red-50/30">
                <h3 className="font-semibold text-red-700 mb-4">{example.before.title}</h3>
                <p className="text-navy/70 mb-4 bg-white p-4 rounded-lg border">
                  "{example.before.content}"
                </p>
                <div className="flex gap-4 text-sm text-navy/60">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {example.before.stats.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {example.before.stats.comments} comments
                  </span>
                  <span className="flex items-center gap-1">
                    <Repeat2 className="w-4 h-4" />
                    {example.before.stats.shares} shares
                  </span>
                </div>
              </Card>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="w-8 h-8 text-blue" />
              </div>

              {/* After */}
              <Card className="p-6 border border-green-200 bg-green-50/30">
                <h3 className="font-semibold text-green-700 mb-4">{example.after.title}</h3>
                <p className="text-navy/70 mb-4 bg-white p-4 rounded-lg border whitespace-pre-line">
                  "{example.after.content}"
                </p>
                <div className="flex gap-4 text-sm text-navy/60">
                  <span className="flex items-center gap-1 font-semibold text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    {example.after.stats.likes} likes
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-green-600">
                    <MessageCircle className="w-4 h-4" />
                    {example.after.stats.comments} comments
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-green-600">
                    <Repeat2 className="w-4 h-4" />
                    {example.after.stats.shares} shares
                  </span>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-green-700 font-semibold text-sm">
                    🚀 340% increase in engagement • Built authority as a project management expert
                  </p>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BeforeAfterSection;