import { XCircle, Clock, TrendingDown } from "lucide-react";

const ProblemStatement = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            You're Not Bad at LinkedIn. You're Just <span className="text-destructive">Wasting Time</span>.
          </h2>
          <p className="text-lg text-muted-foreground">
            Sound familiar? You're not alone. Here's what's actually holding you back:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-destructive/10 rounded-full mb-4">
              <Clock className="w-7 h-7 text-destructive" />
            </div>
            <h3 className="text-xl font-bold mb-3">Hours Wasted</h3>
            <p className="text-muted-foreground">
              You spend 30-45 minutes per post, staring at a blank screen, rewriting the same sentence 5 times.
            </p>
            <p className="mt-4 text-sm font-semibold text-destructive">
              That's 4+ hours per week. Gone.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-destructive/10 rounded-full mb-4">
              <TrendingDown className="w-7 h-7 text-destructive" />
            </div>
            <h3 className="text-xl font-bold mb-3">Zero Engagement</h3>
            <p className="text-muted-foreground">
              Your posts get 10-20 views max. Your network scrolls past like you don't exist.
            </p>
            <p className="mt-4 text-sm font-semibold text-destructive">
              Embarrassing. Demotivating.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-destructive/10 rounded-full mb-4">
              <XCircle className="w-7 h-7 text-destructive" />
            </div>
            <h3 className="text-xl font-bold mb-3">Missed Opportunities</h3>
            <p className="text-muted-foreground">
              While you procrastinate, your competitors are landing clients, building authority, and growing.
            </p>
            <p className="mt-4 text-sm font-semibold text-destructive">
              You're falling behind. Daily.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-lg px-6 py-4">
            <p className="text-lg font-semibold text-foreground">
              The Solution? Stop writing from scratch. Start with AI that <span className="text-primary">actually understands LinkedIn</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
