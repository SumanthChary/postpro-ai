
import { Sparkles } from "lucide-react";

const ComingSoonSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-electric-purple to-bright-teal rounded-2xl shadow-lg my-16">
      <div className="max-w-4xl mx-auto px-6 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-8">
          Coming Soon
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Cross-Platform Sharing</h3>
            <p className="text-sm opacity-90">
              Share your enhanced posts seamlessly across multiple social media platforms with a single click.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Daily Streaks</h3>
            <p className="text-sm opacity-90">
              Build a consistent posting habit and earn rewards by maintaining your daily content creation streaks.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
            <p className="text-sm opacity-90">
              Work together with your team to create and manage content efficiently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;

